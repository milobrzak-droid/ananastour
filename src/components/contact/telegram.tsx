"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ALJONA_AVATAR } from "@/components/brand/photos";
import { glue } from "@/components/home/typo";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { phoneLink, telegramLink } from "@/lib/contact/telegram";
import { trackContact } from "@/lib/analytics";
import { site } from "@/config/site";

const tx = {
  newTab: { uk: "(відкриється в новій вкладці)", cs: "(otevře se v nové záložce)" },
  offHoursLead: {
    uk: "Напишіть зараз — Альона відповість зранку, з 9:00",
    cs: "Napište klidně teď – Aljona se ozve ráno od 9:00",
  },
  // Top strip below lg: the same promise in a few words, so phones never get half a sentence.
  stripShort: { uk: "Альона зазвичай відповідає за 15 хв", cs: "Aljona obvykle odpoví do 15 min" },
  stripShortOff: { uk: "Альона відповість зранку, з 9:00", cs: "Aljona se ozve ráno od 9:00" },
  // Off-hours bubble title; the shared bubble text (dict.contact.floatingText) explains the hours.
  offHoursTitle: { uk: "Пізно? Морю байдуже.", cs: "Pozdě? Moři je to jedno." },
  close: { uk: "Закрити", cs: "Zavřít" },
  region: { uk: "Написати Альоні", cs: "Napsat Aljoně" },
  stripRegion: { uk: "Швидкий зв’язок з Альоною", cs: "Rychlý kontakt na Aljonu" },
};

/**
 * glue() plus a short word before a number ("Od 9", "до 21:00", "do 21 h"), so an hour range
 * («З 9:00 до 21:00», „Od 9 do 21 h“) never splits across lines or leaves "Od" dangling.
 */
function glueHours(text: string): string {
  // glue() has already turned some spaces into no-break ones ("9:00 до"), hence \s.
  return glue(text).replace(/(^|\s)([A-Za-zÀ-ɏЀ-ӿ]{1,2}) (?=\d)/g, "$1$2 ");
}

/** Aljona's working hours (site.contact.hours): 9:00–21:00 Europe/Prague, every day. */
const OPEN_HOUR = 9;
const CLOSE_HOUR = 21;

function pragueHour(): number {
  const h = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Prague", hour: "2-digit", hourCycle: "h23" }).format(new Date());
  return Number(h);
}

/**
 * true while Aljona is at work. Renders the in-hours variant on the server and
 * on first client render (no hydration mismatch), then checks the clock.
 */
export function useInHours(): boolean {
  const [inHours, setInHours] = useState(true);
  useEffect(() => {
    const check = () => {
      const h = pragueHour();
      setInHours(h >= OPEN_HOUR && h < CLOSE_HOUR);
    };
    check();
    const id = setInterval(check, 60_000);
    return () => clearInterval(id);
  }, []);
  return inHours;
}

export function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false" fill="currentColor">
      <path d="M9.04 15.47 8.7 20.2c.48 0 .69-.21.94-.46l2.26-2.16 4.68 3.43c.86.47 1.47.22 1.7-.79l3.08-14.43c.28-1.27-.46-1.77-1.3-1.46L1.9 10.9c-1.24.48-1.22 1.17-.21 1.48l4.63 1.44 10.75-6.77c.5-.33.97-.15.59.18z" />
    </svg>
  );
}

export function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden focusable="false" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

/**
 * Aljona's face next to Telegram CTAs — a real person behind "Write to Aljona".
 * Optional green "online" dot (server renders it on; pass `online` from useInHours on the client).
 */
export function AljonaAvatar({
  size = 56,
  online,
  ring = "white",
  className = "",
}: {
  size?: number;
  online?: boolean;
  ring?: "white" | "paper" | "telegram" | "none";
  className?: string;
}) {
  const rings = { white: "ring-4 ring-white", paper: "ring-4 ring-paper", telegram: "ring-4 ring-telegram", none: "" };
  return (
    <span className={`relative inline-block shrink-0 ${className}`} style={{ width: size, height: size }}>
      <span className={`relative block h-full w-full overflow-hidden rounded-full bg-grey ${rings[ring]}`}>
        <Image src={ALJONA_AVATAR} alt="" fill sizes={`${size * 2}px`} className="object-cover object-[50%_18%]" />
      </span>
      {online !== undefined && (
        <span
          aria-hidden
          className={`absolute bottom-0 right-0 rounded-full border-[3px] border-white ${online ? "bg-green-500" : "bg-grey-dark"}`}
          style={{ width: Math.max(12, size * 0.26), height: Math.max(12, size * 0.26) }}
        />
      )}
    </span>
  );
}

/** Live dot: green + pulsing inside working hours, grey and static outside. */
function StatusDot({ on, tone = "green" }: { on: boolean; tone?: "green" | "light" }) {
  const c = tone === "green" ? "bg-green-400" : "bg-green-300";
  return (
    <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
      {on && <span className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${c}`} />}
      <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${on ? c : "bg-white/60"}`} />
    </span>
  );
}

/**
 * Primary contact button. `message` pre-fills the Telegram chat so the agent
 * sees context (tour, dates, price, URL) in the very first message.
 * tone="white" is for coloured backgrounds (Telegram-blue cards, photos).
 */
export function TelegramButton({
  locale,
  message,
  label,
  source,
  className = "",
  size = "md",
  tone = "blue",
}: {
  locale: Locale;
  message?: string;
  label?: string;
  /** Where on the site the click happened — for analytics. */
  source: string;
  className?: string;
  size?: "sm" | "md" | "lg";
  tone?: "blue" | "white";
}) {
  const dict = getDictionary(locale);
  // Below 400px the pills tighten (padding and gap; md/lg also icon and a fluid font), so a canonical label
  // such as «Написати Альоні» / «Запитати Альону» stays on one line in a ~170–210px column (320px phone,
  // padded card) instead of wrapping.
  const sizes = {
    sm: "min-h-10 py-1.5 pl-1.5 pr-3 gap-1.5 text-sm min-[25rem]:pr-4 min-[25rem]:gap-2",
    md: "min-h-12 py-2 pl-1.5 pr-4 gap-2 max-[25rem]:text-[clamp(0.875rem,4.2vw,1rem)] min-[25rem]:pl-2 min-[25rem]:pr-6 min-[25rem]:gap-2.5",
    lg: "min-h-14 py-2.5 pl-1.5 pr-4 gap-2 text-[clamp(0.9375rem,4.6vw,1.125rem)] min-[25rem]:pl-2.5 min-[25rem]:pr-7 min-[25rem]:gap-3",
  };
  const iconBox = { sm: "size-7", md: "size-[30px] min-[25rem]:size-[34px]", lg: "size-[34px] min-[25rem]:size-10" }[size];
  const icon = { sm: 28, md: 34, lg: 40 }[size];
  const tones = {
    blue: "bg-telegram text-white hover:bg-telegram-dark shadow-[0_12px_28px_-14px_rgba(26,120,173,0.9)]",
    white: "bg-white text-telegram hover:bg-ice-light",
  };
  return (
    <a
      href={telegramLink(message ?? dict.contact.prefillGeneral)}
      target="_blank"
      rel="noopener"
      onClick={() => trackContact("telegram", source)}
      className={`relative inline-flex items-center justify-center shape-pill font-bold transition ${tones[tone]} ${sizes[size]} ${className}`}
    >
      <span
        className={`grid shrink-0 place-items-center rounded-full ${iconBox} ${tone === "blue" ? "bg-white text-telegram" : "bg-telegram text-white"}`}
      >
        <span style={{ marginLeft: -icon * 0.06 }} className="grid place-items-center">
          <TelegramIcon size={Math.round(icon * 0.55)} />
        </span>
      </span>
      {/* Wraps only as a last resort (long custom label in a tight card) — then into two even lines. */}
      <span className="text-balance">{label ?? dict.contact.telegramCta}</span>
      <span className="sr-only"> {t(tx.newTab, locale)}</span>
    </a>
  );
}

/** Top strip on the teal frame — Telegram is the very first thing visitors see. */
export function ContactStrip({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const inHours = useInHours();
  return (
    <aside aria-label={t(tx.stripRegion, locale)} className="text-white">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <p className="flex min-w-0 items-center gap-2.5 font-medium">
          <StatusDot on={inHours} />
          <span className="min-w-0 text-balance max-sm:text-xs max-sm:leading-tight lg:hidden">
            {glueHours(t(inHours ? tx.stripShort : tx.stripShortOff, locale))}
          </span>
          <span className="hidden min-w-0 text-pretty lg:inline">{glueHours(inHours ? dict.contact.telegramLead : t(tx.offHoursLead, locale))}</span>
        </p>
        <div className="flex shrink-0 items-center gap-1 sm:gap-3">
          <a
            href={phoneLink()}
            onClick={() => trackContact("phone", "strip")}
            className="hidden min-h-11 items-center gap-1.5 px-2 font-medium text-white hover:underline md:inline-flex"
          >
            <PhoneIcon size={14} /> {site.contact.phone}
          </a>
          {/* Below 360px the pill goes icon-only (the @handle stays as its accessible name), so the
              status line keeps ~210px and fits in two lines instead of four. */}
          <TelegramButton
            locale={locale}
            source="strip"
            size="sm"
            label={`@${site.contact.telegramUsername}`}
            tone="white"
            className="max-[22.5rem]:pr-1.5 max-[22.5rem]:[&>span:nth-of-type(2)]:sr-only"
          />
        </div>
      </div>
    </aside>
  );
}

/**
 * Always-visible contact: a bottom bar on mobile (Telegram + call), a chat
 * bubble with a short pitch on desktop that appears after a few seconds.
 */
export function FloatingContact({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const inHours = useInHours();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const fabRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(id);
  }, []);

  // Keyboard users can close the bubble with Escape; focus moves to the FAB
  // instead of dropping to <body>.
  const dismiss = () => {
    setDismissed(true);
    fabRef.current?.focus();
  };
  useEffect(() => {
    if (!open || dismissed) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, dismissed]);

  return (
    <aside aria-label={t(tx.region, locale)}>
      {/* Mobile bottom bar */}
      {/* Below 380px the avatar (40px), call button (44px) and gaps shrink so «Написати Альоні» keeps one line
          and the bar keeps its height; the label never wraps here (it would grow the fixed bar over content). */}
      <div className="fixed inset-x-2 bottom-2 z-50 grid grid-cols-[auto_1fr_auto] items-center gap-1.5 rounded-full bg-ink/95 p-1.5 shadow-2xl backdrop-blur min-[23.75rem]:gap-2 md:hidden">
        <AljonaAvatar size={48} online={inHours} ring="none" className="max-[23.75rem]:size-10!" />
        <TelegramButton locale={locale} source="mobile-bar" className="w-full whitespace-nowrap" />
        <a
          href={phoneLink()}
          onClick={() => trackContact("phone", "mobile-bar")}
          aria-label={dict.contact.call}
          className="grid size-11 place-items-center rounded-full bg-yellow text-ink min-[23.75rem]:size-12"
        >
          <PhoneIcon />
        </a>
      </div>

      {/* Desktop bubble */}
      <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 md:flex">
        {open && !dismissed && (
          <div className="relative w-76 rounded-[1.75rem] rounded-br-md bg-white p-5 shadow-2xl ring-1 ring-ink/5">
            <button
              onClick={dismiss}
              className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full text-xl leading-none text-ink/70 hover:bg-grey hover:text-ink"
              aria-label={t(tx.close, locale)}
            >
              ×
            </button>
            <div className="flex items-center gap-3">
              <AljonaAvatar size={52} online={inHours} ring="none" />
              <p className="text-xs font-bold uppercase tracking-widest text-ink/75">
                {site.owner.name[locale]} · Telegram
              </p>
            </div>
            <p className="mt-2 pr-8 font-display text-lg font-bold leading-snug">
              {inHours ? dict.contact.floatingTitle : t(tx.offHoursTitle, locale)}
            </p>
            <p className="mt-1 text-pretty text-sm text-ink/75">{glueHours(dict.contact.floatingText)}</p>
            <TelegramButton locale={locale} source="bubble" size="sm" className="mt-4 w-full" />
          </div>
        )}
        <a
          ref={fabRef}
          href={telegramLink(dict.contact.prefillGeneral)}
          target="_blank"
          rel="noopener"
          onClick={() => trackContact("telegram", "fab")}
          className="grid h-16 w-16 place-items-center rounded-full bg-telegram text-white shadow-xl ring-4 ring-white transition hover:scale-105"
          aria-label={`${dict.contact.telegramCta} ${t(tx.newTab, locale)}`}
        >
          <TelegramIcon size={30} />
        </a>
      </div>
    </aside>
  );
}
