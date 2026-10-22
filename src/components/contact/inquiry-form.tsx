"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { trackContact } from "@/lib/analytics";
import { PineappleSpinner } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";

/**
 * Inquiry form used across the site. Submits to POST /api/inquiry, which
 * forwards the inquiry to Aljona's Telegram via bot instantly.
 * The props below are the stable contract other pages rely on.
 */
export type InquiryKind = "pick-tour" | "offer" | "service" | "contact" | "callback";

export type InquiryFormProps = {
  locale: Locale;
  kind: InquiryKind;
  /** Offer id when asking about a concrete departure. */
  offerId?: string;
  /** Human-readable context (hotel + dates, service name…) included in the Telegram message. */
  context?: string;
  /** Which fields to show beyond name + phone. */
  fields?: Array<"email" | "destination" | "dates" | "nights" | "travellers" | "message">;
  /** Where on the site the form is placed — for analytics. */
  source: string;
  variant?: "light" | "dark" | "ice";
  title?: string;
  submitLabel?: string;
};

type Status = "idle" | "sending" | "success" | "error";
type ErrorKind = "validation" | "rate" | "other";

// TODO: switch to src/content/destinations.ts once it exists, so names stay in one place.
const DESTINATIONS: Array<{ slug: string; uk: string; cs: string }> = [
  { slug: "turkey", uk: "Туреччина", cs: "Turecko" },
  { slug: "egypt", uk: "Єгипет", cs: "Egypt" },
  { slug: "greece", uk: "Греція", cs: "Řecko" },
  { slug: "bulgaria", uk: "Болгарія", cs: "Bulharsko" },
  { slug: "uae", uk: "ОАЕ", cs: "SAE" },
  { slug: "maldives", uk: "Мальдіви", cs: "Maledivy" },
  { slug: "vietnam", uk: "В'єтнам", cs: "Vietnam" },
  { slug: "spain", uk: "Іспанія", cs: "Španělsko" },
  { slug: "dominicana", uk: "Домінікана", cs: "Dominikánská republika" },
  { slug: "italy", uk: "Італія", cs: "Itálie" },
  { slug: "indonesia", uk: "Індонезія", cs: "Indonésie" },
  { slug: "zanzibar", uk: "Занзібар", cs: "Zanzibar" },
];

const tx = {
  title: { uk: "Залиште заявку — Альона підбере тур", cs: "Nechte poptávku — Aljona vybere zájezd" },
  name: { uk: "Ваше ім'я", cs: "Vaše jméno" },
  phone: { uk: "Телефон", cs: "Telefon" },
  phonePh: { uk: "+420 …", cs: "+420 …" },
  email: { uk: "E-mail", cs: "E-mail" },
  telegram: { uk: "Ваш Telegram", cs: "Váš Telegram" },
  telegramHint: { uk: "необов'язково — відповімо прямо в Telegram", cs: "nepovinné — odpovíme rovnou na Telegramu" },
  destination: { uk: "Країна", cs: "Země" },
  anyDestination: { uk: "Ще не знаю — порадьте", cs: "Ještě nevím — poraďte" },
  dates: { uk: "Коли хочете летіти", cs: "Kdy chcete letět" },
  datesPh: { uk: "напр. 10–20 липня", cs: "např. 10.–20. července" },
  nights: { uk: "Ночей", cs: "Nocí" },
  nightsPh: { uk: "напр. 7–10", cs: "např. 7–10" },
  travellers: { uk: "Хто їде", cs: "Kdo cestuje" },
  travellersPh: { uk: "2 дорослих + дитина 5 р.", cs: "2 dospělí + dítě 5 let" },
  message: { uk: "Побажання", cs: "Přání a dotazy" },
  messagePh: { uk: "Бюджет, готель, харчування, виліт з Праги чи Брно…", cs: "Rozpočet, hotel, strava, odlet z Prahy nebo Brna…" },
  optional: { uk: "необов'язково", cs: "nepovinné" },
  submit: { uk: "Надіслати заявку", cs: "Odeslat poptávku" },
  sending: { uk: "Надсилаємо Альоні…", cs: "Posíláme Aljoně…" },
  consentA: {
    uk: "Надсилаючи форму, ви погоджуєтесь з ",
    cs: "Odesláním formuláře souhlasíte se ",
  },
  consentLink: { uk: "обробкою персональних даних", cs: "zpracováním osobních údajů" },
  consentB: {
    uk: " — лише для відповіді на ваш запит.",
    cs: " — jen pro odpověď na váš dotaz.",
  },
  successTitle: { uk: "Альона вже отримала вашу заявку!", cs: "Aljona už má vaši poptávku!" },
  successText: {
    uk: "Вона відповість найближчим часом — зазвичай протягом 15 хвилин. Номер заявки:",
    cs: "Ozve se co nejdříve — obvykle do 15 minut. Číslo poptávky:",
  },
  successTelegram: { uk: "Написати в Telegram прямо зараз", cs: "Napsat na Telegram hned teď" },
  successPrefill: {
    uk: "Добрий день, Альоно! Я щойно залишив(ла) заявку на сайті",
    cs: "Dobrý den, Aljono! Právě jsem poslal(a) poptávku z webu",
  },
  again: { uk: "Надіслати ще одну заявку", cs: "Poslat další poptávku" },
  errorTitle: { uk: "Не вдалося надіслати заявку", cs: "Poptávku se nepodařilo odeslat" },
  errorValidation: {
    uk: "Перевірте, будь ласка, виділені поля.",
    cs: "Zkontrolujte prosím zvýrazněná pole.",
  },
  errorRate: {
    uk: "Забагато спроб. Напишіть Альоні напряму в Telegram — вона відповість швидше.",
    cs: "Příliš mnoho pokusů. Napište Aljoně přímo na Telegram — odpoví rychleji.",
  },
  errorOther: {
    uk: "Щось пішло не так. Напишіть Альоні напряму в Telegram — це найшвидше.",
    cs: "Něco se pokazilo. Napište Aljoně přímo na Telegram — je to nejrychlejší.",
  },
  retry: { uk: "Спробувати ще раз", cs: "Zkusit znovu" },
  fieldErrors: {
    name: { uk: "Вкажіть ім'я", cs: "Vyplňte jméno" },
    phone: { uk: "Вкажіть коректний телефон", cs: "Zadejte platný telefon" },
    email: { uk: "Некоректний e-mail", cs: "Neplatný e-mail" },
    telegram: { uk: "Ім'я користувача: латиниця, цифри, _", cs: "Uživatelské jméno: písmena, číslice, _" },
  },
} satisfies Record<string, unknown>;

const styles = {
  // Reference 1 form card: light grey card, white pill inputs.
  light: {
    card: "bg-grey text-ink",
    input: "bg-white border-transparent text-ink placeholder:text-ink/65 focus:border-ink",
    muted: "text-ink/75",
    link: "text-ink underline",
  },
  ice: {
    card: "bg-ice text-ink",
    input: "bg-white border-transparent text-ink placeholder:text-ink/65 focus:border-ink",
    muted: "text-ink/80",
    link: "text-ink underline",
  },
  dark: {
    card: "bg-ink text-paper",
    input: "bg-white/10 border-white/25 text-paper placeholder:text-paper/70 focus:border-yellow",
    muted: "text-paper/75",
    link: "text-yellow underline",
  },
} as const;

export function InquiryForm({
  locale,
  kind,
  offerId,
  context,
  fields = [],
  source,
  variant = "light",
  title,
  submitLabel,
}: InquiryFormProps) {
  const dict = getDictionary(locale);
  const uid = useId();
  const s = styles[variant];
  const [status, setStatus] = useState<Status>("idle");
  const [errorKind, setErrorKind] = useState<ErrorKind>("other");
  const [invalid, setInvalid] = useState<string[]>([]);
  const [reference, setReference] = useState<string>("");

  const show = (f: NonNullable<InquiryFormProps["fields"]>[number]) => fields.includes(f);
  const inputCls = (name: string) =>
    `w-full shape-pill border-2 px-4 py-3 outline-none transition ${s.input} ${
      invalid.includes(name) ? "border-red!" : ""
    }`;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    setStatus("sending");
    setInvalid([]);
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          ...data,
          kind,
          locale,
          offerId,
          context,
          source,
          pageUrl: window.location.href,
        }),
      });
      const body = (await res.json().catch(() => null)) as
        | { ok: true; reference: string }
        | { ok: false; error?: string; fields?: string[] }
        | null;
      if (res.ok && body?.ok) {
        setReference(body.reference);
        setStatus("success");
        trackContact("form", source);
        return;
      }
      if (body && !body.ok && body.error === "validation") {
        setInvalid(body.fields ?? []);
        setErrorKind("validation");
      } else {
        setErrorKind(res.status === 429 ? "rate" : "other");
      }
      setStatus("error");
    } catch {
      setErrorKind("other");
      setStatus("error");
    }
  }

  const fallbackPrefill = [dict.contact.prefillGeneral, context].filter(Boolean).join("\n");

  if (status === "success") {
    const prefill = `${t(tx.successPrefill, locale)} (${reference}).${context ? `\n${context}` : ""}`;
    return (
      <div className={`rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-9 ${s.card}`} role="status" aria-live="polite">
        <div className="grid h-14 w-14 place-items-center rounded-full bg-yellow text-2xl" aria-hidden>
          🍍
        </div>
        <h3 className="mt-4 font-display text-2xl font-extrabold">{t(tx.successTitle, locale)}</h3>
        <p className={`mt-2 ${s.muted}`}>
          {t(tx.successText, locale)}{" "}
          <strong className={variant === "dark" ? "text-paper" : "text-ink"}>{reference}</strong>
        </p>
        <TelegramButton
          locale={locale}
          source={`${source}-success`}
          message={prefill}
          label={t(tx.successTelegram, locale)}
          className="mt-6 w-full sm:w-auto"
        />
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className={`mt-4 block text-sm ${s.link} underline-offset-4`}
        >
          {t(tx.again, locale)}
        </button>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className={`@container relative rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-9 ${s.card}`} aria-busy={sending}>
      <h3 className="font-display text-2xl font-extrabold uppercase leading-tight">{title ?? t(tx.title, locale)}</h3>
      {context && <p className={`mt-2 text-sm ${s.muted}`}>{context}</p>}

      <div className="mt-6 grid gap-4 @lg:grid-cols-2">
        <Field id={`${uid}-name`} label={t(tx.name, locale)} error={invalid.includes("name") ? t(tx.fieldErrors.name, locale) : undefined}>
          <input id={`${uid}-name`} name="name" required minLength={2} maxLength={80} autoComplete="name" className={inputCls("name")} />
        </Field>
        <Field id={`${uid}-phone`} label={t(tx.phone, locale)} error={invalid.includes("phone") ? t(tx.fieldErrors.phone, locale) : undefined}>
          <input
            id={`${uid}-phone`}
            name="phone"
            type="tel"
            required
            maxLength={32}
            autoComplete="tel"
            inputMode="tel"
            placeholder={t(tx.phonePh, locale)}
            className={inputCls("phone")}
          />
        </Field>

        {show("email") && (
          <Field
            id={`${uid}-email`}
            label={t(tx.email, locale)}
            hint={t(tx.optional, locale)}
            mutedCls={s.muted}
            error={invalid.includes("email") ? t(tx.fieldErrors.email, locale) : undefined}
          >
            <input id={`${uid}-email`} name="email" type="email" maxLength={120} autoComplete="email" className={inputCls("email")} />
          </Field>
        )}

        <Field
          id={`${uid}-telegram`}
          label={t(tx.telegram, locale)}
          hint={t(tx.telegramHint, locale)}
          mutedCls={s.muted}
          error={invalid.includes("telegram") ? t(tx.fieldErrors.telegram, locale) : undefined}
        >
          <input
            id={`${uid}-telegram`}
            name="telegram"
            maxLength={64}
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            placeholder="@username"
            className={inputCls("telegram")}
          />
        </Field>

        {show("destination") && (
          <Field id={`${uid}-destination`} label={t(tx.destination, locale)} hint={t(tx.optional, locale)} mutedCls={s.muted}>
            <select id={`${uid}-destination`} name="destination" defaultValue="" className={`${inputCls("destination")} appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27%20fill%3D%27none%27%20stroke%3D%27%231e2235%27%20stroke-width%3D%272.4%27%20stroke-linecap%3D%27round%27/%3E%3C/svg%3E")] bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-10`}>
              <option value="">{t(tx.anyDestination, locale)}</option>
              {DESTINATIONS.map((d) => (
                <option key={d.slug} value={d.slug}>
                  {t(d, locale)}
                </option>
              ))}
            </select>
          </Field>
        )}
        {show("dates") && (
          <Field id={`${uid}-dates`} label={t(tx.dates, locale)} hint={t(tx.optional, locale)} mutedCls={s.muted}>
            <input id={`${uid}-dates`} name="dates" maxLength={80} placeholder={t(tx.datesPh, locale)} className={inputCls("dates")} />
          </Field>
        )}
        {show("nights") && (
          <Field id={`${uid}-nights`} label={t(tx.nights, locale)} hint={t(tx.optional, locale)} mutedCls={s.muted}>
            <input id={`${uid}-nights`} name="nights" maxLength={20} inputMode="numeric" placeholder={t(tx.nightsPh, locale)} className={inputCls("nights")} />
          </Field>
        )}
        {show("travellers") && (
          <Field id={`${uid}-travellers`} label={t(tx.travellers, locale)} hint={t(tx.optional, locale)} mutedCls={s.muted}>
            <input
              id={`${uid}-travellers`}
              name="travellers"
              maxLength={80}
              placeholder={t(tx.travellersPh, locale)}
              className={inputCls("travellers")}
            />
          </Field>
        )}
        {show("message") && (
          <div className="@lg:col-span-2">
            <Field id={`${uid}-message`} label={t(tx.message, locale)} hint={t(tx.optional, locale)} mutedCls={s.muted}>
              <textarea
                id={`${uid}-message`}
                name="message"
                rows={4}
                maxLength={2000}
                placeholder={t(tx.messagePh, locale)}
                className={`${inputCls("message")} rounded-3xl!`}
              />
            </Field>
          </div>
        )}
      </div>

      {/* Honeypot: hidden from people and assistive tech; bots fill it. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
        </label>
      </div>

      {status === "error" && (
        <div role="alert" className="mt-6 shape-card-r bg-red/10 p-4">
          <p className="font-semibold">{t(tx.errorTitle, locale)}</p>
          <p className={`mt-1 text-sm ${s.muted}`}>
            {t(errorKind === "validation" ? tx.errorValidation : errorKind === "rate" ? tx.errorRate : tx.errorOther, locale)}
          </p>
          {errorKind !== "validation" && (
            <TelegramButton locale={locale} source={`${source}-error`} message={fallbackPrefill} size="sm" className="mt-3" />
          )}
        </div>
      )}

      <div className="mt-6 flex flex-col gap-4 @md:flex-row @md:items-center">
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-13 items-center justify-center gap-2 shape-pill bg-red px-9 py-3 text-lg font-bold text-white shadow-[0_12px_28px_-14px_rgba(217,50,25,0.9)] transition hover:bg-red-dark disabled:opacity-70"
        >
          {sending ? t(tx.sending, locale) : status === "error" && errorKind !== "validation" ? t(tx.retry, locale) : submitLabel ?? t(tx.submit, locale)}
        </button>
        {sending && <PineappleSpinner size={36} />}
      </div>

      <p className={`mt-4 text-xs ${s.muted}`}>
        {t(tx.consentA, locale)}
        <Link href={routes.privacy(locale)} className={`${s.link} underline-offset-2`}>
          {t(tx.consentLink, locale)}
        </Link>
        {t(tx.consentB, locale)}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  error,
  mutedCls = "",
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  mutedCls?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
        {hint && <span className={`ml-2 font-normal ${mutedCls}`}>({hint})</span>}
      </label>
      {children}
      {error && <span className="text-sm font-medium text-red">{error}</span>}
    </div>
  );
}
