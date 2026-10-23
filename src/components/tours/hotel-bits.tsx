import Image from "next/image";
import { t, type Locale } from "@/i18n/config";
import type { Hotel } from "@/lib/tours/types";
import { countryName, formatDistance } from "./labels";

/** Photo mosaic: one big rounded photo + up to 4 smaller ones. */
export function HotelGallery({ hotel, max = 5 }: { hotel: Hotel; max?: number }) {
  const [first, ...rest] = hotel.images.slice(0, max);
  if (!first) return null;
  const shapes = ["shape-card-tl", "rounded-[var(--radius-lg)]", "shape-card-r", "rounded-[var(--radius-lg)]"];
  return (
    <div className="grid gap-3 sm:grid-cols-4 sm:grid-rows-2">
      <div className="relative aspect-[4/3] overflow-hidden shape-card sm:col-span-2 sm:row-span-2 sm:aspect-auto sm:min-h-[26rem]">
        <Image src={first} alt={hotel.name} fill priority sizes="(min-width: 640px) 50vw, 100vw" className="object-cover" />
      </div>
      {rest.map((src, i) => (
        <div
          key={src}
          className={`relative hidden aspect-[4/3] overflow-hidden sm:block ${shapes[i % shapes.length]} ${
            rest.length < 4 && i === rest.length - 1 ? "sm:col-span-2" : ""
          }`}
        >
          <Image src={src} alt={`${hotel.name} — ${i + 2}`} fill sizes="25vw" className="object-cover" />
        </div>
      ))}
    </div>
  );
}

/** Hotel category. Stars are decorative; the accessible name is spelled out. */
export function Stars({ n, locale, tone = "light" }: { n: number; locale?: Locale; tone?: "light" | "dark" }) {
  const word = locale === "cs" ? (n === 1 ? "hvězdička" : n < 5 ? "hvězdičky" : "hvězdiček") : n === 1 ? "зірка" : n < 5 ? "зірки" : "зірок";
  return (
    <span className="relative whitespace-nowrap">
      <span aria-hidden className={`text-[0.8em] tracking-[0.08em] ${tone === "dark" ? "text-yellow" : "text-yellow-ink"}`}>
        {"★".repeat(n)}
      </span>
      <span className="sr-only">
        {n} {word}
      </span>
    </span>
  );
}

export function HotelRating({ hotel, locale }: { hotel: Hotel; locale: Locale }) {
  if (!hotel.rating) return null;
  const { score, reviews, source } = hotel.rating;
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className="grid h-9 min-w-9 place-items-center shape-pill bg-ink px-2 font-display font-extrabold text-paper">
        {score.toFixed(1)}
      </span>
      <span className="text-ink/70">
        / 5 · {reviews.toLocaleString(locale === "uk" ? "uk-UA" : "cs-CZ")} {t({ uk: "відгуків", cs: "recenzí" }, locale)}
        {source === "tripadvisor" ? " (TripAdvisor)" : ""}
      </span>
    </span>
  );
}

export function HotelLocation({ hotel, locale }: { hotel: Hotel; locale: Locale }) {
  return (
    <span>
      {hotel.region}, {countryName(hotel.countrySlug, locale, hotel.country)}
    </span>
  );
}

export function HotelDistances({ hotel, locale }: { hotel: Hotel; locale: Locale }) {
  const d = hotel.distances;
  if (!d) return null;
  const firstLine = t({ uk: "перша лінія", cs: "první linie" }, locale);
  const rows: Array<[string, string | undefined]> = [
    [
      t({ uk: "До пляжу", cs: "Pláž" }, locale),
      d.beach === undefined ? undefined : d.beach === 0 ? firstLine : formatDistance(d.beach, locale),
    ],
    [t({ uk: "До центру", cs: "Centrum" }, locale), d.centre === undefined ? undefined : formatDistance(d.centre, locale)],
    [t({ uk: "До аеропорту", cs: "Letiště" }, locale), d.airport === undefined ? undefined : formatDistance(d.airport, locale)],
  ];
  return (
    <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
      {rows
        .filter((r): r is [string, string] => r[1] !== undefined)
        .map(([label, value]) => (
          <div key={label} className="contents">
            <dt className="text-ink/75">{label}</dt>
            <dd className="font-semibold">{value}</dd>
          </div>
        ))}
    </dl>
  );
}
