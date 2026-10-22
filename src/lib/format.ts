import type { Locale } from "@/i18n/config";
import type { Money } from "@/lib/tours/types";

const intl: Record<Locale, string> = { uk: "uk-UA", cs: "cs-CZ" };

export function formatMoney(m: Money, locale: Locale): string {
  return new Intl.NumberFormat(intl[locale], {
    style: "currency",
    currency: m.currency,
    maximumFractionDigits: 0,
  }).format(m.amount);
}

export function formatDate(isoDate: string, locale: Locale, opts?: Intl.DateTimeFormatOptions): string {
  return new Intl.DateTimeFormat(intl[locale], opts ?? { day: "numeric", month: "short" }).format(
    new Date(`${isoDate}T00:00:00Z`),
  );
}

export function formatDateRange(from: string, to: string, locale: Locale): string {
  return `${formatDate(from, locale)} – ${formatDate(to, locale, { day: "numeric", month: "short", year: "numeric" })}`;
}
