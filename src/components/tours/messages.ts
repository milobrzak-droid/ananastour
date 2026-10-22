import { site } from "@/config/site";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatDate } from "@/lib/format";
import { toQueryString } from "@/lib/tours/query";
import type { Hotel, SearchParams } from "@/lib/tours/types";
import { countryName, travellersLabel } from "./labels";

/** One-line human summary of a search: "Єгипет · 1 лист. – 30 лист. · 7–10 ночей · 2 дорос." */
export function searchSummary(p: SearchParams, locale: Locale): string {
  const dict = getDictionary(locale);
  const parts: string[] = [];
  if (p.destination) parts.push(countryName(p.destination, locale));
  if (p.dateFrom || p.dateTo) {
    parts.push(
      [p.dateFrom && formatDate(p.dateFrom, locale), p.dateTo && formatDate(p.dateTo, locale)].filter(Boolean).join(" – "),
    );
  }
  if (p.nightsMin || p.nightsMax) {
    const n = p.nightsMin && p.nightsMax ? `${p.nightsMin}–${p.nightsMax}` : String(p.nightsMin ?? p.nightsMax);
    parts.push(`${n} ${dict.common.nights}`);
  }
  parts.push(travellersLabel(p.adults, p.childrenAges, locale));
  return parts.join(" · ");
}

/** Pre-filled Telegram message for a search (results page, empty state). */
export function searchTelegramMessage(p: SearchParams, locale: Locale): string {
  return [
    t({ uk: "Добрий день, Альоно! Шукаю тур:", cs: "Dobrý den, Aljono! Hledám zájezd:" }, locale),
    searchSummary(p, locale),
    `${site.url}${routes.tours(locale, toQueryString({ ...p, page: undefined }))}`,
  ].join("\n");
}

/** Pre-filled Telegram message for a hotel detail. */
export function hotelTelegramMessage(hotel: Hotel, locale: Locale): string {
  return [
    t({ uk: "Добрий день, Альоно! Цікавить готель:", cs: "Dobrý den, Aljono! Mám zájem o hotel:" }, locale),
    `${hotel.name} ${"★".repeat(hotel.stars)}, ${hotel.region}, ${countryName(hotel.countrySlug, locale, hotel.country)}`,
    `${site.url}${routes.hotel(locale, hotel.id)}`,
  ].join("\n");
}
