import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { escapeHtml, sendTelegramMessage, type InlineButton } from "@/lib/contact/telegram-bot";
import { formatDateRange, formatMoney } from "@/lib/format";
import { clientIp, createRateLimiter, decoyDelay, readJsonBody } from "@/lib/request-guard";
import { tours, type BookingRequest, type BookingResult } from "@/lib/tours";

/**
 * POST /api/booking — order of one offer. Calls the provider's Booking API;
 * when the operator does not support direct booking the provider returns
 * "inquiry" and Aljona finishes it manually. Either way Aljona gets the order
 * in Telegram immediately.
 *
 * Response: BookingResult ({ status: "booked" | "inquiry" | "failed", … }).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const schema = z.object({
  offerId: z.string().trim().min(1).max(200),
  locale: z.enum(locales).default("uk"),
  customer: z.object({
    name: z.string().trim().min(2).max(100),
    phone: z
      .string()
      .trim()
      .min(6)
      .max(30)
      .regex(/^\+?[\d\s()-]{6,}$/),
    email: z
      .string()
      .trim()
      .max(200)
      .optional()
      .transform((v) => (v ? v : undefined))
      .pipe(z.email().optional()),
    telegram: optionalText(64)
      .transform((v) => (v ? v.replace(/^(https?:\/\/)?(t\.me\/|telegram\.me\/)?@?/i, "") : undefined))
      .refine((v) => v === undefined || /^[A-Za-z0-9_]{4,32}$/.test(v)),
  }),
  travellers: z
    .array(
      z.object({
        age: z.number().int().min(0).max(120),
        firstName: optionalText(60),
        lastName: optionalText(60),
        birthDate: z.iso.date().optional(),
      }),
    )
    .min(1)
    .max(12),
  note: optionalText(2000),
  consent: z.literal(true),
  /** Honeypot — must stay empty. */
  website: z.string().max(0).optional(),
});

// Bookings are rare and valuable — 5 per 10 minutes per IP is plenty for a human.
const rateLimited = createRateLimiter(5, 10 * 60 * 1000);

export async function POST(req: NextRequest) {
  const body = await readJsonBody(req);
  if (!body.ok && body.error === "too-large") {
    return NextResponse.json({ status: "failed", reason: "payload-too-large" } satisfies BookingResult, { status: 413 });
  }
  const json = body.ok ? body.json : null;

  // Bots fill the honeypot: pretend success (after a realistic delay), book nothing, notify nobody.
  const honeypot = (json as { website?: unknown } | null)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    const n = crypto.getRandomValues(new Uint32Array(1))[0] % 900000;
    await decoyDelay();
    return NextResponse.json({ status: "inquiry", reference: `AT-XX${String(100000 + n)}` } satisfies BookingResult);
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { status: "failed", reason: "invalid", issues: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }
  const { locale, consent: _consent, website: _website, ...data } = parsed.data;
  void _consent;
  void _website;

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ status: "failed", reason: "rate-limited" } satisfies BookingResult, { status: 429 });
  }

  const offer = await tours().getOffer(data.offerId);
  if (!offer) {
    return NextResponse.json({ status: "failed", reason: "offer-not-found" } satisfies BookingResult, { status: 404 });
  }

  const request: BookingRequest = data;
  let result: BookingResult;
  try {
    result = await tours().book(request);
  } catch (err) {
    console.error("[booking]", data.offerId, err);
    result = { status: "failed", reason: "provider-error" };
  }

  // Aljona sees every order instantly, including failed ones (she can still sell the tour).
  const ref = result.status === "booked" ? result.reservationNumber : result.status === "inquiry" ? result.reference : "—";
  const head = {
    booked: "✅ Нове бронювання (підтверджено туроператором)",
    inquiry: "🟡 Нове замовлення — потрібно оформити вручну",
    failed: "🔴 Замовлення не пройшло — зв’яжіться з клієнтом",
  }[result.status];
  const c = data.customer;
  const lines = [
    `<b>${head}</b>`,
    `Ref: <code>${escapeHtml(ref)}</code>`,
    "",
    `🏨 ${escapeHtml(`${offer.hotel.name} ${offer.hotel.stars}*, ${offer.hotel.region}`)}`,
    `📅 ${escapeHtml(formatDateRange(offer.departureDate, offer.returnDate, "uk"))} · ${offer.nights} н. · ${offer.board} · ${escapeHtml(offer.roomType)}`,
    `✈️ ${escapeHtml(offer.departureAirport ?? offer.transport)} · ${escapeHtml(offer.touroperator)}`,
    `💰 ${escapeHtml(formatMoney(offer.pricePerPerson, "uk"))} / особа`,
    "",
    `👤 ${escapeHtml(c.name)}`,
    `📞 ${escapeHtml(c.phone)}`,
    c.email ? `✉️ ${escapeHtml(c.email)}` : "",
    c.telegram ? `💬 @${escapeHtml(c.telegram)}` : "",
    `👨‍👩‍👧 ${data.travellers.map((tr) => tr.age).join(", ")} (вік)`,
    data.note ? `📝 ${escapeHtml(data.note)}` : "",
    result.status === "failed" ? `⚠️ ${escapeHtml(result.reason)}` : "",
    `🌐 ${locale}`,
  ].filter(Boolean);
  const offerUrl = `${site.url}${routes.offer(locale, encodeURIComponent(offer.id))}`;
  // Telegram rejects non-public button URLs (localhost), so only add buttons that will work.
  const row: InlineButton[] = [
    ...(offerUrl.startsWith("https://") ? [{ text: "Тур на сайті", url: offerUrl }] : []),
    ...(c.telegram ? [{ text: `@${c.telegram}`, url: `https://t.me/${encodeURIComponent(c.telegram)}` }] : []),
  ];
  const sent = await sendTelegramMessage(lines.join("\n"), { buttons: row.length ? [row] : [] });
  if (!sent.ok) console.error("[booking] telegram notify failed", sent.error, ref);

  return NextResponse.json(result, { status: result.status === "failed" ? 502 : 200 });
}
