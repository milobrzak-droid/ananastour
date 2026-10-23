"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { TelegramButton } from "@/components/contact/telegram";
import { Button, Pill } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { track } from "@/lib/analytics";
import type { BookingResult } from "@/lib/tours/types";

const tx = {
  title: { uk: "Хочу цей тур", cs: "Chci tenhle zájezd" },
  lead: {
    uk: "На сайті ви нічого не платите. Я перевірю місця й ціну в туроператора і напишу вам для підтвердження.",
    cs: "Na webu nic neplatíte. Ověřím volná místa i cenu u CK a ozvu se vám kvůli potvrzení.",
  },
  name: { uk: "Ім’я та прізвище", cs: "Jméno a příjmení" },
  phone: { uk: "Телефон", cs: "Telefon" },
  email: { uk: "E-mail", cs: "E-mail" },
  telegram: { uk: "Telegram — необов’язково, але так швидше", cs: "Telegram – nepovinné, ale bude to rychlejší" },
  adults: { uk: "Дорослі", cs: "Dospělí" },
  children: { uk: "Діти", cs: "Děti" },
  childAge: { uk: "Вік дитини", cs: "Věk dítěte" },
  addChild: { uk: "+ Додати дитину", cs: "+ Přidat dítě" },
  remove: { uk: "Прибрати дитину", cs: "Odebrat dítě" },
  note: {
    uk: "Побажання (тихий номер, дитяче ліжечко, трансфер…)",
    cs: "Přání (tichý pokoj, dětská postýlka, transfer…)",
  },
  consentA: { uk: "Погоджуюся з ", cs: "Souhlasím se " },
  consentLink: { uk: "обробкою персональних даних", cs: "zpracováním osobních údajů" },
  consentB: {
    uk: " для розгляду запиту на бронювання.",
    cs: " pro vyřízení žádosti o rezervaci.",
  },
  submit: { uk: "Надіслати запит", cs: "Odeslat žádost" },
  sending: { uk: "Надсилаємо запит…", cs: "Odesíláme žádost…" },
  invalid: {
    uk: "Перевірте, будь ласка, ім’я, телефон, e-mail і згоду — десь закралася помилка.",
    cs: "Zkontrolujte prosím jméno, telefon, e-mail a souhlas – něco z toho nesedí.",
  },
  failed: {
    uk: "Запит не вдалося надіслати. Спробуйте ще раз або напишіть Альоні в Telegram — вона оформить усе вручну.",
    cs: "Žádost se nepodařilo odeslat. Zkuste to znovu, nebo napište Aljoně na Telegram – vyřídí to ručně.",
  },
  booked: { uk: "Бронювання підтверджено", cs: "Rezervace je potvrzená" },
  bookedText: {
    uk: "Туроператор підтвердив місця. Альона надішле вам договір і пояснить, як і коли платити.",
    cs: "CK místa potvrdila. Aljona vám pošle smlouvu o zájezdu a vysvětlí, jak a kdy platit.",
  },
  inquiry: { uk: "Запит на бронювання надіслано", cs: "Žádost o rezervaci odeslána" },
  inquiryText: {
    uk: "Альона перевірить місця й ціну в туроператора і напише вам. Платите лише після підтвердження — не на сайті.",
    cs: "Aljona ověří volná místa i cenu u CK a ozve se vám. Platí se až po potvrzení, ne na webu.",
  },
  ref: { uk: "Номер запиту", cs: "Číslo žádosti" },
  continue: { uk: "Продовжити в Telegram", cs: "Pokračovat na Telegramu" },
  continueMsg: {
    uk: "Добрий день, Альоно! Пишу щодо запиту на бронювання з сайту, номер:",
    cs: "Dobrý den, Aljono! Píšu kvůli žádosti o rezervaci z webu, číslo:",
  },
  prefer: { uk: "Не любите форми?", cs: "Formuláře nemusíte?" },
  preferText: {
    uk: "Напишіть Альоні в Telegram: з 9:00 до 21:00 вона зазвичай відповідає за 15 хвилин.",
    cs: "Napište Aljoně na Telegram: od 9 do 21 h odpovídá obvykle do 15 minut.",
  },
  ask: { uk: "Запитати Альону", cs: "Zeptat se Aljony" },
};

const input =
  "w-full rounded-full border-2 border-transparent bg-white px-5 py-3 text-ink placeholder:text-ink/65 focus:border-ink focus:outline-none";

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`flex flex-col gap-1.5 text-sm font-semibold ${className}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "error"; message: string } | { kind: "done"; result: BookingResult };

export function BookingForm({
  locale,
  offerId,
  offerSummary,
  telegramMessage,
  defaultAdults = 2,
}: {
  locale: Locale;
  offerId: string;
  /** Short human description of the offer, included in the "continue in Telegram" message. */
  offerSummary: string;
  /** Pre-filled message for the "prefer to write" button. */
  telegramMessage: string;
  defaultAdults?: number;
}) {
  const uid = useId();
  const [adults, setAdults] = useState(defaultAdults);
  const [kids, setKids] = useState<number[]>([]);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const str = (k: string) => String(fd.get(k) ?? "").trim() || undefined;
    const body = {
      offerId,
      locale,
      customer: { name: str("name") ?? "", phone: str("phone") ?? "", email: str("email"), telegram: str("telegram") },
      travellers: [...Array.from({ length: adults }, () => ({ age: 30 })), ...kids.map((age) => ({ age }))],
      note: str("note"),
      consent: fd.get("consent") === "on",
      website: str("website"),
    };
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = (await res.json().catch(() => null)) as (BookingResult & { reason?: string }) | null;
      if (res.status === 400) return setStatus({ kind: "error", message: t(tx.invalid, locale) });
      if (!data || data.status === "failed") return setStatus({ kind: "error", message: t(tx.failed, locale) });
      track("booking_submit", { status: data.status, offerId });
      setStatus({ kind: "done", result: data });
    } catch {
      setStatus({ kind: "error", message: t(tx.failed, locale) });
    }
  }

  if (status.kind === "done" && status.result.status !== "failed") {
    const r = status.result;
    const ref = r.status === "booked" ? r.reservationNumber : r.reference;
    return (
      <div className="rounded-[2.5rem] bg-ice p-6 sm:p-10" role="status">
        <Pill tone="yellow">{t(tx.ref, locale)}: {ref}</Pill>
        <h2 className="mt-4 font-display text-3xl font-extrabold">{t(r.status === "booked" ? tx.booked : tx.inquiry, locale)}</h2>
        <p className="mt-3 max-w-xl text-ink/80">{t(r.status === "booked" ? tx.bookedText : tx.inquiryText, locale)}</p>
        <TelegramButton
          locale={locale}
          source="booking-success"
          size="lg"
          className="mt-6"
          label={t(tx.continue, locale)}
          message={`${t(tx.continueMsg, locale)} ${ref}.\n${offerSummary}`}
        />
      </div>
    );
  }

  const sending = status.kind === "sending";

  return (
    <div>
      <form onSubmit={onSubmit} className="rounded-[2rem] bg-grey p-6 sm:rounded-[2.5rem] sm:p-10">
        <h2 className="font-display text-2xl font-black uppercase sm:text-4xl">{t(tx.title, locale)}</h2>
        <p className="mt-2 text-sm text-ink/70">{t(tx.lead, locale)}</p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Field label={t(tx.name, locale)} className="sm:col-span-2">
            <input name="name" required minLength={2} maxLength={100} autoComplete="name" className={input} />
          </Field>
          <Field label={t(tx.phone, locale)}>
            <input
              name="phone"
              type="tel"
              required
              minLength={6}
              maxLength={30}
              pattern="\+?[\d\s\(\)\-]{6,}"
              autoComplete="tel"
              placeholder="+420 …"
              className={input}
            />
          </Field>
          <Field label={t(tx.email, locale)}>
            <input name="email" type="email" maxLength={200} autoComplete="email" className={input} />
          </Field>
          <Field label={t(tx.telegram, locale)} className="sm:col-span-2">
            <input name="telegram" maxLength={64} placeholder="@username" className={input} />
          </Field>
        </div>

        <fieldset className="mt-6 grid gap-4 sm:grid-cols-2">
          <legend className="sr-only">
            {t(tx.adults, locale)} / {t(tx.children, locale)}
          </legend>
          <Field label={t(tx.adults, locale)}>
            <select value={adults} onChange={(e) => setAdults(Number(e.target.value))} className={input}>
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </Field>
          <div className="flex flex-col gap-1.5 text-sm font-semibold">
            <span>{t(tx.children, locale)}</span>
            <div className="flex flex-wrap items-center gap-2">
              {kids.map((age, i) => (
                <span key={i} className="inline-flex items-center gap-1 shape-pill bg-white py-1 pl-3 pr-1">
                  <label htmlFor={`${uid}-kid-${i}`} className="sr-only">
                    {t(tx.childAge, locale)} {i + 1}
                  </label>
                  <select
                    id={`${uid}-kid-${i}`}
                    value={age}
                    onChange={(e) => setKids(kids.map((k, j) => (j === i ? Number(e.target.value) : k)))}
                    className="bg-transparent py-1 font-semibold focus:outline-none"
                  >
                    {Array.from({ length: 18 }, (_, n) => (
                      <option key={n} value={n}>
                        {n} {locale === "uk" ? "р." : "let"}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setKids(kids.filter((_, j) => j !== i))}
                    className="grid h-7 w-7 place-items-center rounded-full hover:bg-white"
                    aria-label={t(tx.remove, locale)}
                  >
                    ×
                  </button>
                </span>
              ))}
              {kids.length < 4 && (
                <button
                  type="button"
                  onClick={() => setKids([...kids, 7])}
                  className="shape-pill border-2 border-dashed border-ink/25 px-4 py-2 text-sm font-semibold hover:border-ink"
                >
                  {t(tx.addChild, locale)}
                </button>
              )}
            </div>
          </div>
        </fieldset>

        <Field label={t(tx.note, locale)} className="mt-4">
          <textarea name="note" rows={3} maxLength={2000} className={`${input} rounded-3xl!`} />
        </Field>

        {/* Honeypot */}
        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

        <label className="mt-5 flex items-start gap-3 text-sm">
          <input name="consent" type="checkbox" required className="mt-0.5 h-5 w-5 shrink-0 accent-red" />
          <span>
            {t(tx.consentA, locale)}
            <Link href={routes.privacy(locale)} className="underline underline-offset-2" target="_blank">
              {t(tx.consentLink, locale)}
            </Link>
            {t(tx.consentB, locale)}
          </span>
        </label>

        {status.kind === "error" && (
          <p className="mt-4 rounded-2xl bg-red/10 p-4 text-sm font-semibold text-red-dark" role="alert">
            {status.message}
          </p>
        )}

        <Button type="submit" disabled={sending} className="mt-6 w-full text-lg sm:w-auto">
          {sending ? t(tx.sending, locale) : t(tx.submit, locale)}
        </Button>
      </form>

      <div className="mt-4 flex flex-col items-start gap-3 rounded-[2rem] bg-ice p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-display text-lg font-extrabold">{t(tx.prefer, locale)} →</p>
          <p className="text-sm text-ink/70">{t(tx.preferText, locale)}</p>
        </div>
        <TelegramButton locale={locale} source="booking-prefer" message={telegramMessage} label={t(tx.ask, locale)} />
      </div>
    </div>
  );
}
