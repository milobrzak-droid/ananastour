import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { site } from "@/config/site";
import { locales } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { escapeHtml, sendTelegramMessage, telegramBotConfigured, type InlineButton } from "@/lib/contact/telegram-bot";
import { decoyDelay, readJsonBody } from "@/lib/request-guard";

/**
 * POST /api/inquiry — every form on the site lands here and is forwarded to
 * Aljona's Telegram within seconds. Response: { ok: true, reference }.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const KIND_LABELS = {
  "pick-tour": "🌴 Підбір туру",
  offer: "🏨 Питання про конкретний тур",
  service: "🛎 Послуга",
  contact: "✉️ Контактна форма",
  callback: "📞 Передзвонити",
} as const;

const DESTINATION_LABELS = {
  turkey: "Туреччина",
  egypt: "Єгипет",
  greece: "Греція",
  bulgaria: "Болгарія",
  uae: "ОАЕ",
  maldives: "Мальдіви",
  vietnam: "В’єтнам",
  spain: "Іспанія",
  dominicana: "Домінікана",
  italy: "Італія",
  indonesia: "Індонезія",
  zanzibar: "Занзібар",
} as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const schema = z.object({
  kind: z.enum(Object.keys(KIND_LABELS) as [keyof typeof KIND_LABELS, ...(keyof typeof KIND_LABELS)[]]),
  locale: z.enum(locales),
  name: z.string().trim().min(2).max(80),
  phone: z
    .string()
    .trim()
    .max(32)
    .regex(/^\+?[\d\s()./-]+$/)
    .refine((v) => v.replace(/\D/g, "").length >= 6),
  email: z
    .union([z.literal(""), z.email().max(120)])
    .optional()
    .transform((v) => (v ? v : undefined)),
  telegram: z
    .string()
    .trim()
    .max(64)
    .optional()
    .transform((v) => (v ? v.replace(/^(https?:\/\/)?(t\.me\/|telegram\.me\/)?@?/i, "") : undefined))
    .refine((v) => v === undefined || /^[A-Za-z0-9_]{4,32}$/.test(v)),
  destination: z
    .union([z.literal(""), z.enum(Object.keys(DESTINATION_LABELS) as [keyof typeof DESTINATION_LABELS])])
    .optional()
    .transform((v) => (v ? v : undefined)),
  dates: optionalText(80),
  nights: optionalText(20),
  travellers: optionalText(80),
  message: optionalText(2000),
  context: optionalText(500),
  offerId: optionalText(120),
  source: optionalText(60),
  pageUrl: optionalText(500),
  /** Honeypot — real users never see or fill it. */
  website: z.string().optional(),
});

type Inquiry = z.infer<typeof schema>;

// --- rate limit (in-memory, per instance; good enough against form spam) ---
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_LIMIT) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
  }
  return false;
}

function clientIp(req: NextRequest): string {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

// --- helpers ---
const REF_ALPHABET = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // no 0/O/1/I

function makeReference(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(4));
  return `AT-${Array.from(bytes, (b) => REF_ALPHABET[b % REF_ALPHABET.length]).join("")}`;
}

function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}

function safeHttpUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    // Only links back to our own site. Anything else would let a bot plant a
    // clickable phishing link in the Telegram message Aljona reads.
    return url.origin === new URL(site.url).origin ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function pragueTime(date = new Date()): string {
  return new Intl.DateTimeFormat("uk-UA", {
    timeZone: "Europe/Prague",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function buildMessage(q: Inquiry, reference: string): { text: string; buttons: InlineButton[][] } {
  const e = escapeHtml;
  const lines: string[] = [];
  const offerUrl = q.offerId ? absoluteUrl(routes.offer(q.locale, encodeURIComponent(q.offerId))) : undefined;
  const pageUrl = safeHttpUrl(q.pageUrl);
  const tel = q.phone.replace(/[^\d+]/g, "");

  lines.push(`🍍 <b>Нова заявка ${e(reference)}</b>`);
  lines.push(`<b>${e(KIND_LABELS[q.kind])}</b>`);
  lines.push("");
  lines.push(`👤 <b>${e(q.name)}</b>`);
  lines.push(`📞 <a href="tel:${e(tel)}">${e(q.phone)}</a>`);
  if (q.email) lines.push(`✉️ <a href="mailto:${e(q.email)}">${e(q.email)}</a>`);
  if (q.telegram) lines.push(`💬 Telegram: <a href="https://t.me/${e(q.telegram)}">@${e(q.telegram)}</a>`);

  const details: string[] = [];
  if (q.context) details.push(`📌 ${e(q.context)}`);
  if (q.offerId)
    details.push(`🏨 Пропозиція: <code>${e(q.offerId)}</code>${offerUrl ? ` — <a href="${e(offerUrl)}">відкрити</a>` : ""}`);
  if (q.destination) details.push(`🌍 Країна: ${e(DESTINATION_LABELS[q.destination])}`);
  if (q.dates) details.push(`📅 Дати: ${e(q.dates)}`);
  if (q.nights) details.push(`🌙 Ночей: ${e(q.nights)}`);
  if (q.travellers) details.push(`👨‍👩‍👧 Хто їде: ${e(q.travellers)}`);
  if (details.length) lines.push("", ...details);
  if (q.message) lines.push("", `📝 <i>${e(q.message)}</i>`);

  lines.push("");
  if (pageUrl) lines.push(`🔗 Сторінка: <a href="${e(pageUrl)}">${e(pageUrl)}</a>`);
  lines.push(
    `🌐 ${q.locale.toUpperCase()}${q.source ? ` · ${e(q.source)}` : ""} · 🕒 ${e(pragueTime())}`,
  );

  // Telegram rejects non-public button URLs (localhost), so only add buttons that will work.
  const buttons: InlineButton[][] = [];
  const row: InlineButton[] = [];
  if (q.telegram) row.push({ text: "💬 Написати клієнту", url: `https://t.me/${q.telegram}` });
  if (offerUrl?.startsWith("https://")) row.push({ text: "🏨 Тур на сайті", url: offerUrl });
  if (row.length) buttons.push(row);

  return { text: lines.join("\n"), buttons };
}

export async function POST(req: NextRequest) {
  const body = await readJsonBody(req);
  if (!body.ok) {
    return body.error === "too-large"
      ? NextResponse.json({ ok: false, error: "payload-too-large" }, { status: 413 })
      : NextResponse.json({ ok: false, error: "invalid-json" }, { status: 400 });
  }
  const json = body.json;

  // Bots fill the honeypot: pretend success (after a realistic delay), send nothing.
  const honeypot = (json as { website?: unknown } | null)?.website;
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    await decoyDelay();
    return NextResponse.json({ ok: true, reference: makeReference() });
  }

  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((i) => String(i.path[0] ?? "")))].filter(Boolean);
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 400 });
  }
  const inquiry = parsed.data;
  const reference = makeReference();

  if (rateLimited(clientIp(req))) {
    return NextResponse.json({ ok: false, error: "rate-limited" }, { status: 429 });
  }

  const { text, buttons } = buildMessage(inquiry, reference);

  if (!telegramBotConfigured()) {
    console.warn(`[inquiry ${reference}] TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID not set. Inquiry:\n${text}`);
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: "not-configured" }, { status: 503 });
    }
    return NextResponse.json({ ok: true, reference });
  }

  const result = await sendTelegramMessage(text, { buttons });
  if (!result.ok) {
    // Keep the inquiry in server logs so it is never lost.
    console.error(`[inquiry ${reference}] Telegram send failed: ${result.error}. Inquiry:\n${text}`);
    return NextResponse.json({ ok: false, error: "delivery-failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, reference });
}
