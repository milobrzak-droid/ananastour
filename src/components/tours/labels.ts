import { t, type Locale } from "@/i18n/config";
import { formatDateRange } from "@/lib/format";
import type { Board, SearchParams, Transport } from "@/lib/tours/types";

/** Display labels for normalised domain codes (uk + cs). Pure — safe in server and client components. */

type L = Record<Locale, string>;

export const BOARD_ORDER: Board[] = ["UAI", "AI", "FB", "HB", "BB", "RO"];

export const boardLabels: Record<Board, L> = {
  RO: { uk: "Без харчування", cs: "Bez stravy" },
  BB: { uk: "Сніданки", cs: "Snídaně" },
  HB: { uk: "Напівпансіон", cs: "Polopenze" },
  FB: { uk: "Повний пансіон", cs: "Plná penze" },
  AI: { uk: "Все включено", cs: "All inclusive" },
  UAI: { uk: "Ультра все включено", cs: "Ultra all inclusive" },
};

export const transportLabels: Record<Transport, L> = {
  flight: { uk: "Літаком", cs: "Letecky" },
  bus: { uk: "Автобусом", cs: "Autobusem" },
  own: { uk: "Власним транспортом", cs: "Vlastní doprava" },
};

export const AIRPORTS = ["PRG", "BRQ", "OSR", "PED"] as const;

export const airportLabels: Record<string, L> = {
  PRG: { uk: "Прага", cs: "Praha" },
  BRQ: { uk: "Брно", cs: "Brno" },
  OSR: { uk: "Острава", cs: "Ostrava" },
  PED: { uk: "Пардубиці", cs: "Pardubice" },
};

export const sortLabels: Record<NonNullable<SearchParams["sort"]>, L> = {
  price_asc: { uk: "Спочатку дешевші", cs: "Od nejlevnějších" },
  price_desc: { uk: "Спочатку дорожчі", cs: "Od nejdražších" },
  date_asc: { uk: "Найближчі вильоти", cs: "Nejbližší odlety" },
  rating_desc: { uk: "Найвищий рейтинг", cs: "Nejlépe hodnocené" },
};

/** Our 12 destinations, keyed by `Hotel.countrySlug`. */
export const countryLabels: Record<string, L> = {
  turkey: { uk: "Туреччина", cs: "Turecko" },
  egypt: { uk: "Єгипет", cs: "Egypt" },
  greece: { uk: "Греція", cs: "Řecko" },
  bulgaria: { uk: "Болгарія", cs: "Bulharsko" },
  uae: { uk: "ОАЕ", cs: "SAE" },
  maldives: { uk: "Мальдіви", cs: "Maledivy" },
  vietnam: { uk: "В’єтнам", cs: "Vietnam" },
  spain: { uk: "Іспанія", cs: "Španělsko" },
  dominicana: { uk: "Домінікана", cs: "Dominikána" },
  italy: { uk: "Італія", cs: "Itálie" },
  indonesia: { uk: "Балі", cs: "Bali" },
  zanzibar: { uk: "Занзібар", cs: "Zanzibar" },
};

export const boardLabel = (b: Board, locale: Locale) => t(boardLabels[b], locale);
export const transportLabel = (tr: Transport, locale: Locale) => t(transportLabels[tr], locale);
export const airportLabel = (code: string, locale: Locale) =>
  airportLabels[code] ? `${t(airportLabels[code], locale)} (${code})` : code;
export const countryName = (slug: string, locale: Locale, fallback?: string) =>
  countryLabels[slug] ? t(countryLabels[slug], locale) : (fallback ?? slug);

/** 300 → "300 m", 25000 → "25 km". */
export function formatDistance(metres: number, locale: Locale): string {
  if (metres < 1000) return `${metres} ${locale === "uk" ? "м" : "m"}`;
  const km = Math.round(metres / 100) / 10;
  return `${km.toLocaleString(locale === "uk" ? "uk-UA" : "cs-CZ")} ${locale === "uk" ? "км" : "km"}`;
}

/** "2 dospělí + 1 dítě (7)" — written out in full, same word forms as the search box. */
export function travellersLabel(adults: number, childrenAges: number[], locale: Locale): string {
  const adultWord = t(
    adults === 1 ? { uk: "дорослий", cs: "dospělý" } : adults <= 4 ? { uk: "дорослих", cs: "dospělí" } : { uk: "дорослих", cs: "dospělých" },
    locale,
  );
  const a = `${adults} ${adultWord}`;
  if (!childrenAges.length) return a;
  const n = childrenAges.length;
  const k = t(n === 1 ? { uk: "дитина", cs: "dítě" } : n <= 4 ? { uk: "дитини", cs: "děti" } : { uk: "дітей", cs: "dětí" }, locale);
  return `${a} + ${n} ${k} (${childrenAges.join(", ")})`;
}

/**
 * Date range for visible text that wraps only after the dash, never inside a date:
 * "1 трав. – 13 трав. 2027 р." keeps "13 трав." and "2027 р." whole, "18. 11. – 28. 11. 2026"
 * keeps each date whole. Not for Telegram prefills.
 */
export function dateRangeLabel(from: string, to: string, locale: Locale): string {
  return formatDateRange(from, to, locale)
    .replace(/(\d\.?) (?=[\p{L}\d])/gu, "$1 ")
    .replace(/ ([–—]) /g, " $1 ");
}
