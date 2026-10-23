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

/**
 * The word for "nights" after a number: `${n} ${nightsLabel(n, locale)}`. For a range ("7–10") pass the last number.
 * cs: 1 noc · 2–4 noci · 0, 5+ nocí (21 and 22 too: Czech ignores the tens).
 * uk: …1 ніч (not 11) · …2–4 ночі (not 12–14) · otherwise ночей (0, 5–20, 25…).
 */
export function nightsLabel(n: number, locale: Locale): string {
  const abs = Math.abs(Math.trunc(n));
  if (locale === "cs") return abs === 1 ? "noc" : abs >= 2 && abs <= 4 ? "noci" : "nocí";
  const last = abs % 10;
  const tens = abs % 100;
  if (last === 1 && tens !== 11) return "ніч";
  if (last >= 2 && last <= 4 && (tens < 12 || tens > 14)) return "ночі";
  return "ночей";
}

export function formatDateRange(from: string, to: string, locale: Locale): string {
  return `${formatDate(from, locale)} – ${formatDate(to, locale, { day: "numeric", month: "short", year: "numeric" })}`;
}
