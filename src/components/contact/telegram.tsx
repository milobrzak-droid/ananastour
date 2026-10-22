"use client";

import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { phoneLink, telegramLink } from "@/lib/contact/telegram";
import { trackContact } from "@/lib/analytics";
import { site } from "@/config/site";

export function TelegramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden fill="currentColor">
      <path d="M9.04 15.47 8.7 20.2c.48 0 .69-.21.94-.46l2.26-2.16 4.68 3.43c.86.47 1.47.22 1.7-.79l3.08-14.43c.28-1.27-.46-1.77-1.3-1.46L1.9 10.9c-1.24.48-1.22 1.17-.21 1.48l4.63 1.44 10.75-6.77c.5-.33.97-.15.59.18z" />
    </svg>
  );
}

function PhoneIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  );
}

/**
 * Primary contact button. `message` pre-fills the Telegram chat so the agent
 * sees context (tour, dates, price, URL) in the very first message.
 */
export function TelegramButton({
  locale,
  message,
  label,
  source,
  className = "",
  size = "md",
}: {
  locale: Locale;
  message?: string;
  label?: string;
  /** Where on the site the click happened — for analytics. */
  source: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const dict = getDictionary(locale);
  const sizes = { sm: "px-4 py-2 text-sm", md: "px-6 py-3", lg: "px-8 py-4 text-lg" };
  return (
    <a
      href={telegramLink(message ?? dict.contact.prefillGeneral)}
      target="_blank"
      rel="noopener"
      onClick={() => trackContact("telegram", source)}
      className={`inline-flex items-center justify-center gap-2 shape-pill bg-telegram font-semibold text-white transition hover:brightness-110 ${sizes[size]} ${className}`}
    >
      <TelegramIcon />
      {label ?? dict.contact.telegramCta}
    </a>
  );
}

/** Top strip above the header — Telegram is the very first thing visitors see. */
export function ContactStrip({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 text-sm sm:px-6 lg:px-8">
        <p className="flex min-w-0 items-center gap-2">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
          </span>
          <span className="truncate">{dict.contact.telegramLead}</span>
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <a
            href={phoneLink()}
            onClick={() => trackContact("phone", "strip")}
            className="hidden items-center gap-1 opacity-80 hover:opacity-100 md:inline-flex"
          >
            <PhoneIcon size={14} /> {site.contact.phone}
          </a>
          <TelegramButton locale={locale} source="strip" size="sm" label={`@${site.contact.telegramUsername}`} />
        </div>
      </div>
    </div>
  );
}

/**
 * Always-visible contact: a bottom bar on mobile (Telegram + call), a chat
 * bubble with a short pitch on desktop that appears after a few seconds.
 */
export function FloatingContact({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setOpen(true), 6000);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      {/* Mobile bottom bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-[1fr_auto] gap-2 border-t border-ink/10 bg-paper/95 p-2 backdrop-blur md:hidden">
        <TelegramButton locale={locale} source="mobile-bar" className="w-full" />
        <a
          href={phoneLink()}
          onClick={() => trackContact("phone", "mobile-bar")}
          aria-label={dict.contact.call}
          className="grid w-12 place-items-center shape-pill bg-ink text-paper"
        >
          <PhoneIcon />
        </a>
      </div>

      {/* Desktop bubble */}
      <div className="fixed bottom-6 right-6 z-50 hidden flex-col items-end gap-3 md:flex">
        {open && !dismissed && (
          <div className="relative w-72 shape-card-r bg-white p-5 shadow-xl ring-1 ring-ink/5">
            <button
              onClick={() => setDismissed(true)}
              className="absolute right-3 top-2 text-xl leading-none text-ink/40 hover:text-ink"
              aria-label="Close"
            >
              ×
            </button>
            <p className="font-display text-lg font-bold">{dict.contact.floatingTitle}</p>
            <p className="mt-1 text-sm text-ink/70">{dict.contact.floatingText}</p>
            <TelegramButton locale={locale} source="bubble" size="sm" className="mt-4 w-full" />
          </div>
        )}
        <a
          href={telegramLink(dict.contact.prefillGeneral)}
          target="_blank"
          rel="noopener"
          onClick={() => trackContact("telegram", "fab")}
          className="grid h-16 w-16 place-items-center rounded-full bg-telegram text-white shadow-xl transition hover:scale-105"
          aria-label={dict.contact.telegramCta}
        >
          <TelegramIcon size={30} />
        </a>
      </div>
    </>
  );
}
