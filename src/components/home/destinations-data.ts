import type { Locale } from "@/i18n/config";
import { destinationPhoto as sharedDestinationPhoto } from "@/content/ananas-photos";

/**
 * The 12 destinations Ananas Tour sells. Plain data (no "use client"), so both
 * server sections and the client SearchBox can import it.
 */
export type HomeDestination = {
  slug: string;
  name: Record<Locale, string>;
  tagline: Record<Locale, string>;
};

export const DESTINATIONS: HomeDestination[] = [
  { slug: "turkey", name: { uk: "Туреччина", cs: "Turecko" }, tagline: { uk: "All inclusive біля моря", cs: "All inclusive u moře" } },
  { slug: "egypt", name: { uk: "Єгипет", cs: "Egypt" }, tagline: { uk: "Сонце навіть узимку", cs: "Slunce i v zimě" } },
  { slug: "greece", name: { uk: "Греція", cs: "Řecko" }, tagline: { uk: "Острови та оливки", cs: "Ostrovy a olivy" } },
  { slug: "bulgaria", name: { uk: "Болгарія", cs: "Bulharsko" }, tagline: { uk: "Близько і для всієї родини", cs: "Blízko a pro celou rodinu" } },
  { slug: "uae", name: { uk: "ОАЕ", cs: "SAE" }, tagline: { uk: "Дубай, пляжі та шопінг", cs: "Dubaj, pláže a nákupy" } },
  { slug: "maldives", name: { uk: "Мальдіви", cs: "Maledivy" }, tagline: { uk: "Вілли над водою", cs: "Vily nad vodou" } },
  { slug: "vietnam", name: { uk: "В'єтнам", cs: "Vietnam" }, tagline: { uk: "Екзотика без поспіху", cs: "Exotika bez spěchu" } },
  { slug: "spain", name: { uk: "Іспанія", cs: "Španělsko" }, tagline: { uk: "Канари та Майорка", cs: "Kanáry a Mallorca" } },
  { slug: "dominicana", name: { uk: "Домінікана", cs: "Dominikána" }, tagline: { uk: "Карибські пляжі", cs: "Karibské pláže" } },
  { slug: "italy", name: { uk: "Італія", cs: "Itálie" }, tagline: { uk: "Море, паста, Сардинія", cs: "Moře, pasta, Sardinie" } },
  { slug: "indonesia", name: { uk: "Індонезія", cs: "Indonésie" }, tagline: { uk: "Балі та джунглі", cs: "Bali a džungle" } },
  { slug: "zanzibar", name: { uk: "Занзібар", cs: "Zanzibar" }, tagline: { uk: "Білий пісок Танзанії", cs: "Bílý písek Tanzanie" } },
];

// Client's own destination photos (from ananastour.com).
export const destinationPhoto = (slug: string) => sharedDestinationPhoto(slug);
