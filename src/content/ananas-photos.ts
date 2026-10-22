import { DESTINATIONS, PHOTOS as STOCK, photo } from "@/lib/tours/mock-data";

/**
 * Photos taken over from the client's original site (ananastour.com),
 * optimised into /public/img/ananas. Gaps (Zanzibar, region tiles) are filled
 * with the verified Unsplash pool from the mock catalogue.
 */
const local = (name: string) => `/img/ananas/${name}.jpg`;

export const ananasPhotos = {
  aljona: {
    portrait: local("aljona-portrait"), // selfie at a Join UP! event, pink feather boa
    event: local("aljona-event"), // full figure in front of a Join UP! press wall
  },
  hero: {
    overwaterSunset: local("hero-overwater-sunset"),
    tropicalBeach: local("hero-tropical-beach"),
  },
  banner: {
    beachUmbrella: local("banner-beach-umbrella"), // top-down beach with umbrella — hot tours
    maldivesAerial: local("banner-maldives-aerial"),
    palmBeach: local("banner-palm-beach"),
    resortPool: local("banner-resort-pool"),
  },
  services: {
    insurance: local("service-insurance"),
    flights: local("service-flights"),
    hotels: local("service-hotels"),
    transfer: local("service-transfer"),
    visa: local("service-visa"),
    excursions: local("service-excursions"),
  },
  blog: {
    "tax-free": local("blog-tax-free"),
    insurance: local("blog-insurance"),
    visas: local("blog-visas"),
    "hotel-signs": local("blog-hotel-signs"),
  } as Record<string, string>,
};

const DEST_LOCAL = new Set([
  "turkey",
  "egypt",
  "greece",
  "bulgaria",
  "uae",
  "maldives",
  "vietnam",
  "spain",
  "dominicana",
  "italy",
  "indonesia",
]);

/** Main photo of a destination: the client's own where it exists. */
export function destinationPhoto(slug: string): string {
  if (DEST_LOCAL.has(slug)) return local(`dest-${slug}`);
  return photo(STOCK.beachTropical[2] ?? STOCK.beachTropical[0]);
}

/** Three extra photos for region tiles / galleries of a destination. */
export function destinationGallery(slug: string): string[] {
  const scenery = STOCK.scenery[slug] ?? [];
  const style = DESTINATIONS[slug]?.style ?? "med";
  const pool = style === "maldives" ? STOCK.maldives : style === "tropical" ? STOCK.beachTropical : STOCK.poolMed;
  // Offset by slug so neighbouring destinations don't share the same tiles.
  const offset = [...slug].reduce((a, c) => a + c.charCodeAt(0), 0) % Math.max(1, pool.length);
  const ids = [...scenery, ...pool.slice(offset), ...pool.slice(0, offset)];
  return [...new Set(ids)].slice(0, 3).map(photo);
}
