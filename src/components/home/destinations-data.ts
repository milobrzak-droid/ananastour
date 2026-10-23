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
  { slug: "turkey", name: { uk: "Туреччина", cs: "Turecko" }, tagline: { uk: "Батьківщина all inclusive", cs: "Domovina all inclusive" } },
  { slug: "egypt", name: { uk: "Єгипет", cs: "Egypt" }, tagline: { uk: "Літо, яке працює взимку", cs: "Léto, které maká i v zimě" } },
  { slug: "greece", name: { uk: "Греція", cs: "Řecko" }, tagline: { uk: "Острови, оливки, тиша", cs: "Ostrovy, olivy, klid" } },
  { slug: "bulgaria", name: { uk: "Болгарія", cs: "Bulharsko" }, tagline: { uk: "Близько. Навіть автобусом", cs: "Blízko. I autobusem" } },
  { slug: "uae", name: { uk: "ОАЕ", cs: "SAE" }, tagline: { uk: "Пляж зранку, Дубай увечері", cs: "Ráno pláž, večer mrakodrapy" } },
  { slug: "maldives", name: { uk: "Мальдіви", cs: "Maledivy" }, tagline: { uk: "Вілла над водою — і все", cs: "Vila nad vodou. Víc netřeba" } },
  { slug: "vietnam", name: { uk: "В’єтнам", cs: "Vietnam" }, tagline: { uk: "Екзотика без поспіху", cs: "Exotika bez spěchu" } },
  { slug: "spain", name: { uk: "Іспанія", cs: "Španělsko" }, tagline: { uk: "Тапас, Гауді й Канари", cs: "Tapas, Gaudí a Kanáry" } },
  { slug: "dominicana", name: { uk: "Домінікана", cs: "Dominikána" }, tagline: { uk: "Карибське море наживо", cs: "Karibik naživo" } },
  { slug: "italy", name: { uk: "Італія", cs: "Itálie" }, tagline: { uk: "Сардинія, Сицилія й паста", cs: "Sardinie, Sicílie a pasta" } },
  { slug: "indonesia", name: { uk: "Балі (Індонезія)", cs: "Bali (Indonésie)" }, tagline: { uk: "Джунглі, серф, рисові тераси", cs: "Džungle, surf a rýžová pole" } },
  { slug: "zanzibar", name: { uk: "Занзібар (Танзанія)", cs: "Zanzibar (Tanzanie)" }, tagline: { uk: "Білий пісок і спеції", cs: "Bílý písek a koření" } },
];

// Client's own destination photos (from ananastour.com).
export const destinationPhoto = (slug: string) => sharedDestinationPhoto(slug);
