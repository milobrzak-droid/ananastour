"use client";

import Link from "next/link";
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { trackContact } from "@/lib/analytics";
import { PineappleSpinner } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { fitLongestWord, glue } from "@/components/home/typo";

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
  { slug: "vietnam", uk: "В’єтнам", cs: "Vietnam" },
  { slug: "spain", uk: "Іспанія", cs: "Španělsko" },
  { slug: "dominicana", uk: "Домінікана", cs: "Dominikána" },
  { slug: "italy", uk: "Італія", cs: "Itálie" },
  { slug: "indonesia", uk: "Балі (Індонезія)", cs: "Bali (Indonésie)" },
  { slug: "zanzibar", uk: "Занзібар (Танзанія)", cs: "Zanzibar (Tanzanie)" },
];

const tx = {
  title: { uk: "Куди вас тягне?", cs: "Kam vás to táhne?" },
  name: { uk: "Ім’я", cs: "Jméno" },
  phone: { uk: "Телефон", cs: "Telefon" },
  phonePh: { uk: "+420 …", cs: "+420 …" },
  email: { uk: "E-mail", cs: "E-mail" },
  telegram: { uk: "Telegram", cs: "Telegram" },
  telegramHint: { uk: "необов’язково, але так швидше", cs: "nepovinné, ale bude to rychlejší" },
  destination: { uk: "Куди", cs: "Kam" },
  anyDestination: { uk: "Ще не знаю — порадьте", cs: "Ještě nevím – poraďte" },
  dates: { uk: "Коли", cs: "Kdy" },
  // Placeholders sit in fields as narrow as ~175px (tours sidebar): a short, loose example says "roughly is fine".
  datesPh: { uk: "Скажімо, у серпні", cs: "Třeba v srpnu" },
  nights: { uk: "Ночей", cs: "Nocí" },
  nightsPh: { uk: "Наприклад, 7–10", cs: "Třeba 7–10" },
  travellers: { uk: "Скільки вас", cs: "Kolik vás je" },
  travellersPh: { uk: "2 дорослих, дитині 6", cs: "2 dospělí + dítě 6 let" },
  message: { uk: "Побажання", cs: "Přání" },
  messagePh: { uk: "Бюджет, харчування, басейн із гіркою, тиша чи вечірки…", cs: "Rozpočet, strava, tobogány, klid, nebo party…" },
  optional: { uk: "необов’язково", cs: "nepovinné" },
  submit: { uk: "Надіслати Альоні", cs: "Poslat Aljoně" },
  sending: { uk: "Летить до Альони…", cs: "Letí za Aljonou…" },
  consentA: {
    uk: "Надсилаючи форму, ви погоджуєтеся з ",
    cs: "Odesláním souhlasíte se ",
  },
  consentLink: { uk: "обробкою персональних даних", cs: "zpracováním osobních údajů" },
  consentB: {
    uk: " — лише для відповіді на ваш запит.",
    cs: " – použiju je jen k odpovědi na vaši poptávku.",
  },
  successTitle: { uk: "Є! Запит уже в Альони", cs: "Je to tam! Aljona má vaši poptávku" },
  // The reference number is rendered right after this text.
  successText: {
    uk: "З 9:00 до 21:00 вона зазвичай відповідає за 15 хвилин, пізніше — зранку. А поки можна діставати валізу з шафи. Номер запиту:",
    cs: "Od 9 do 21 h odpovídá obvykle do 15 minut, na pozdější zprávy ráno. Mezitím můžete začít hledat plavky. Číslo poptávky:",
  },
  successTelegram: { uk: "Продовжити в Telegram", cs: "Pokračovat na Telegramu" },
  // Followed by " (reference)." in the pre-filled message — gender-neutral on purpose.
  successPrefill: {
    uk: "Добрий день, Альоно! Пишу щодо запиту з сайту",
    cs: "Dobrý den, Aljono! Píšu kvůli poptávce z webu",
  },
  again: { uk: "Ще один запит", cs: "Další poptávka" },
  errorTitle: { uk: "Запит поки не долетів", cs: "Poptávka zatím nedoletěla" },
  errorValidation: {
    uk: "Майже готово — перевірте виділені поля.",
    cs: "Skoro hotovo – zkontrolujte zvýrazněná pole.",
  },
  errorRate: {
    uk: "Забагато спроб поспіль. Зачекайте хвилинку — або пишіть одразу в Telegram.",
    cs: "Příliš mnoho pokusů za sebou. Chvilku počkejte, nebo pište rovnou na Telegram.",
  },
  errorOther: {
    uk: "Щось застрягло в дорозі. Напишіть Альоні в Telegram — так навіть швидше.",
    cs: "Něco se cestou zaseklo. Napište Aljoně na Telegram, bude to i rychlejší.",
  },
  retry: { uk: "Спробувати ще раз", cs: "Zkusit znovu" },
  fieldErrors: {
    name: { uk: "Як до вас звертатися?", cs: "Jak vám mám říkat?" },
    phone: { uk: "Перевірте номер, наприклад: +420 123 456 789", cs: "Zkontrolujte číslo, třeba: +420 123 456 789" },
    email: { uk: "Схоже, в e-mail закралася помилка.", cs: "V e-mailu je asi překlep." },
    telegram: { uk: "Нік у Telegram: латиниця, цифри та _", cs: "Uživatelské jméno: jen písmena bez diakritiky, číslice a _" },
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
  // Glued (no line starting with "—", no lone "з"/"k"), sized to the form (@container) so the longest
  // word — ПОВІДОМЛЕННЯ, ПЕРЕДЗВОНЮ — never splits in a narrow card.
  const heading = glue(title ?? t(tx.title, locale));

  return (
    <form onSubmit={onSubmit} className={`@container relative rounded-[2rem] p-6 sm:rounded-[2.5rem] sm:p-9 ${s.card}`} aria-busy={sending}>
      <h3
        className="font-display text-[clamp(1rem,var(--fit),1.5rem)] font-extrabold uppercase leading-tight text-balance"
        style={fitLongestWord(heading)}
      >
        {heading}
      </h3>
      {context && <p className={`mt-2 text-sm ${s.muted}`}>{context}</p>}

      {/* grid-cols-1 = minmax(0,1fr): an implicit auto track would grow to the inputs' intrinsic ~210px and push
          fields past the padding of a narrow (≈190px) form. */}
      <div className="mt-6 grid grid-cols-1 gap-4 @lg:grid-cols-2">
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
            <select
              id={`${uid}-destination`}
              name="destination"
              defaultValue=""
              // Chevron as an inline style: a data: URI inside a Tailwind arbitrary
              // background-url class breaks the CSS build (webpack resolves it as a module).
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6' fill='none' stroke='%231e2235' stroke-width='2.4' stroke-linecap='round'/%3E%3C/svg%3E\")",
              }}
              className={`${inputCls("destination")} appearance-none bg-[length:1.1rem] bg-[position:right_1rem_center] bg-no-repeat pr-10`}
            >
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
        {/* Padding and size follow the form's width (@container), not the viewport, so «Передзвоніть мені» /
            «Надіслати Альоні» stay on one line even in a doubly padded card on a 320px phone. */}
        <button
          type="submit"
          disabled={sending}
          className="inline-flex min-h-13 items-center justify-center gap-2 text-balance shape-pill bg-red px-4 py-3 text-[0.9375rem] font-bold text-white shadow-[0_12px_28px_-14px_rgba(217,50,25,0.9)] transition hover:bg-red-dark disabled:opacity-70 @[14rem]:px-6 @[14rem]:text-base @[18rem]:px-9 @[18rem]:text-lg"
        >
          {sending ? t(tx.sending, locale) : status === "error" && errorKind !== "validation" ? t(tx.retry, locale) : submitLabel ?? t(tx.submit, locale)}
        </button>
        {sending && <PineappleSpinner size={36} />}
      </div>

      <p className={`mt-4 text-xs ${s.muted}`}>
        {glue(t(tx.consentA, locale))}
        <Link href={routes.privacy(locale)} className={`${s.link} underline-offset-2`}>
          {t(tx.consentLink, locale)}
        </Link>
        {glue(t(tx.consentB, locale))}
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
        {/* A real space (plus ml-1 ≈ the old ml-2) gives a break opportunity: "Побажання(необов’язково)" glued by a
            bare margin ran ~20px past a narrow form. */}
        {hint && " "}
        {hint && <span className={`ml-1 font-normal ${mutedCls}`}>({hint})</span>}
      </label>
      {children}
      {error && <span className="text-sm font-medium text-red">{error}</span>}
    </div>
  );
}
