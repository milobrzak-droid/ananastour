import type { TourProvider } from "./provider";
import type {
  AvailabilityCheck,
  Board,
  BookingRequest,
  BookingResult,
  Hotel,
  Money,
  Offer,
  OfferWithHotel,
  SearchParams,
  SearchResult,
} from "./types";
import { AMENITY, DESTINATIONS, HOTELS, PHOTOS, photo, type HotelSeed } from "./mock-data";

/**
 * Deterministic, realistic fake data so the whole site works before AnChoice
 * API access exists. Hotels, regions, photos and Czech texts are static
 * (`mock-data.ts`); departures are generated from a hash of hotel × date, so
 * the same offer keeps its id and price from day to day while dates stay
 * relative to today. Replace by setting TOUR_PROVIDER=anchoice.
 */

// ---------------------------------------------------------------------------
// Deterministic randomness
// ---------------------------------------------------------------------------

function hash(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  // murmur3 finaliser for better bit distribution
  h ^= h >>> 16;
  h = Math.imul(h, 0x85ebca6b);
  h ^= h >>> 13;
  h = Math.imul(h, 0xc2b2ae35);
  h ^= h >>> 16;
  return h >>> 0;
}

/** Uniform number in [0, 1) derived from the key. */
const rnd = (key: string) => hash(key) / 4294967296;
const pick = <T>(arr: readonly T[], key: string): T => arr[hash(key) % arr.length];

function weighted<T>(items: ReadonlyArray<readonly [T, number]>, key: string): T {
  const total = items.reduce((s, [, w]) => s + w, 0);
  let r = rnd(key) * total;
  for (const [v, w] of items) {
    if ((r -= w) < 0) return v;
  }
  return items[items.length - 1][0];
}

/** Czech price tags: 18 990 Kč, 24 490 Kč … */
function czk(amount: number): number {
  const step = amount >= 50000 ? 500 : 100;
  return Math.max(990, Math.round(amount / step) * step - 10);
}
const money = (amount: number): Money => ({ amount, currency: "CZK" });

// ---------------------------------------------------------------------------
// Dates
// ---------------------------------------------------------------------------

const DAY_MS = 86_400_000;

/** Today's date in Prague, so server renders flip at local midnight. */
function todayIso(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}
const parseIso = (iso: string) => new Date(`${iso}T00:00:00Z`);
const toIso = (d: Date) => d.toISOString().slice(0, 10);
const addDays = (d: Date, days: number) => new Date(d.getTime() + days * DAY_MS);

// ---------------------------------------------------------------------------
// Hotels
// ---------------------------------------------------------------------------

function buildImages(seed: HotelSeed, index: number, counters: Record<string, number>): string[] {
  const used = new Set<string>();
  const out: string[] = [];
  const take = (list: readonly string[] | undefined, start: number) => {
    if (!list?.length) return;
    for (let k = 0; k < list.length; k++) {
      const id = list[(start + k) % list.length];
      if (!used.has(id)) {
        used.add(id);
        out.push(photo(id));
        return;
      }
    }
  };
  const style = DESTINATIONS[seed.slug].style;
  const n = (counters[style] = (counters[style] ?? -1) + 1);
  const scenery = PHOTOS.scenery[seed.slug];

  if (style === "maldives") {
    take(PHOTOS.maldives, n * 2);
    take(PHOTOS.maldives, n * 2 + 4);
    take(PHOTOS.beachTropical, n * 3 + 1);
    take(PHOTOS.maldives, n + 7);
    take(PHOTOS.room, index * 5);
    take(PHOTOS.facilities, 3 + (n % 3));
  } else if (style === "tropical") {
    take(PHOTOS.poolTropical, n * 5);
    take(PHOTOS.room, index * 5);
    take(PHOTOS.beachTropical, n * 3);
    take(scenery ?? PHOTOS.beachTropical, scenery ? n : n * 3 + 5);
    take(PHOTOS.poolTropical, n * 5 + 6);
    if (seed.stars >= 5) take(PHOTOS.facilities, index * 3);
  } else {
    take(PHOTOS.poolMed, n * 8);
    take(PHOTOS.room, index * 5);
    take(seed.beach <= 300 ? PHOTOS.beach : PHOTOS.poolMed, n * 3);
    take(PHOTOS.facilities, index * 3);
    take(scenery ?? PHOTOS.poolMed, scenery ? n : n * 8 + 11);
    if (seed.stars >= 5) take(PHOTOS.poolMed, n * 8 + 5);
  }
  return out;
}

const HOTEL_LIST: Hotel[] = (() => {
  const counters: Record<string, number> = {};
  return HOTELS.map((s, i): Hotel => {
    const dest = DESTINATIONS[s.slug];
    return {
      id: s.id,
      name: s.name,
      stars: s.stars,
      country: dest.country,
      countrySlug: s.slug,
      region: s.region,
      location: { lat: s.lat, lng: s.lng },
      images: buildImages(s, i, counters),
      description: s.description,
      amenities: ["Wi-Fi zdarma", "Klimatizace", ...s.amenities.split(" ").map((k) => AMENITY[k] ?? k)],
      rating: { score: s.rating, reviews: s.reviews, source: "tripadvisor" },
      distances: {
        beach: s.beach,
        airport: s.airport * 1000,
        ...(s.centre !== undefined ? { centre: Math.round(s.centre * 1000) } : {}),
      },
    };
  });
})();

const hotelById = new Map(HOTEL_LIST.map((h) => [h.id, h]));
const seedById = new Map(HOTELS.map((s) => [s.id, s]));

// ---------------------------------------------------------------------------
// Offers
// ---------------------------------------------------------------------------

const BOARD_FACTOR: Record<Board, number> = { RO: 0.85, BB: 0.9, HB: 1, FB: 1.1, AI: 1.18, UAI: 1.3 };
const STAR_FACTOR: Record<number, number> = { 3: 0.8, 4: 1, 5: 1.32 };
const ROOM_FACTOR = [1, 1.08, 1.15, 1.25, 1.4, 1.5];
const ROOM_WEIGHT = [7, 4, 2.5, 1.5, 1, 1];
const HORIZON_DAYS = 330; // look this far for in-season dates …
const SELL_DAYS = 150; // … but sell at most this many in-season days

/** Pricing for the rest of the party, kept beside the public offer. */
type OfferMeta = { childFactor: number; infant: number };

type Catalogue = {
  day: string;
  offers: Offer[];
  byId: Map<string, Offer>;
  meta: Map<string, OfferMeta>;
};

function seasonFactor(date: Date, season: number[], peak: number[]): number {
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  if ((m === 12 && d >= 20) || (m === 1 && d <= 4)) return 1.3; // Christmas & New Year
  if (m === 2 || (m === 3 && d <= 15)) return 1.06; // spring holidays
  if (peak.includes(m)) return 1.2;
  if (season.length < 12 && (m === season[0] || m === season[season.length - 1])) return 0.88; // shoulder
  return 1;
}

function hotelOperators(seed: HotelSeed): string[] {
  const ops = DESTINATIONS[seed.slug].operators;
  const sorted = [...ops].sort((a, b) => hash(seed.id + a) - hash(seed.id + b));
  return sorted.slice(0, Math.min(ops.length, 2 + (hash(seed.id + "ops") % 3)));
}

function buildCatalogue(day: string): Catalogue {
  const today = parseIso(day);
  const offers: Offer[] = [];
  const meta = new Map<string, OfferMeta>();

  for (const seed of HOTELS) {
    const dest = DESTINATIONS[seed.slug];
    const season = seed.allYear ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] : dest.season;
    const ops = hotelOperators(seed);
    const hotelVar = 0.94 + rnd(seed.id + "var") * 0.12;
    const base = dest.base * (STAR_FACTOR[seed.stars] ?? 1) * (seed.price ?? 1) * hotelVar;
    const density = (dest.density / 100) * (seed.stars === 5 ? 1 : 1.15);
    let sold = 0;

    for (let d = 3; d <= HORIZON_DAYS && sold < SELL_DAYS; d++) {
      const date = addDays(today, d);
      if (!season.includes(date.getUTCMonth() + 1)) continue;
      sold++;
      const iso = toIso(date);
      const dayKey = `${seed.id}|${iso}`;
      if (rnd(dayKey) >= density) continue;
      const variants = 1 + (rnd(dayKey + "|v2") < 0.4 ? 1 : 0) + (rnd(dayKey + "|v3") < 0.12 ? 1 : 0);

      for (let v = 0; v < variants; v++) {
        const key = `${dayKey}|${v}`;
        const airport = weighted(dest.airports, key + "|ap");
        const bus = airport === "BUS";
        const nights = bus
          ? pick([10, 11, 12].filter((n) => dest.nights.includes(n) || seed.slug === "italy"), key + "|n")
          : pick(dest.nights, key + "|n");
        const board = seed.boards[(hash(key + "|b") + v) % seed.boards.length];
        const roomIdx = weighted(
          seed.rooms.map((_, i) => [i, ROOM_WEIGHT[i] ?? 1] as const),
          key + "|r",
        );
        const nightsF = dest.fixedShare + ((1 - dest.fixedShare) * nights) / 7;
        const firstMinute = d > 120 ? 0.92 : 1;
        const regional = airport === "PRG" || bus ? 1 : 1.04;
        const opF = 0.96 + rnd(key + "|op") * 0.08;
        const transportF = bus ? 0.72 : 1;

        let pp =
          base *
          BOARD_FACTOR[board] *
          (ROOM_FACTOR[roomIdx] ?? 1) *
          seasonFactor(date, season, dest.peak) *
          nightsF *
          firstMinute *
          regional *
          opF *
          transportF;

        let original: number | undefined;
        if (d <= 21 && rnd(key + "|lm") < 0.55) {
          const markup = 1.15 + rnd(key + "|disc") * 0.25; // original 15–40 % higher
          original = czk(pp * 1.05);
          pp = original / markup;
        }
        const price = czk(pp);
        const id = `${seed.id}-${iso.replace(/-/g, "")}-${v + 1}`;
        const exotic = dest.style !== "med";

        offers.push({
          id,
          hotelId: seed.id,
          touroperator: pick(ops, key + "|o"),
          departureDate: iso,
          returnDate: toIso(addDays(date, nights + (exotic && dest.fixedShare >= 0.45 ? 1 : 0))),
          nights,
          transport: bus ? "bus" : "flight",
          departureAirport: bus ? undefined : airport,
          board,
          roomType: seed.rooms[roomIdx],
          pricePerPerson: money(price),
          totalPrice: money(price * 2),
          originalPrice: original ? money(original) : undefined,
          isLastMinute: original !== undefined,
          verified: rnd(key + "|ver") < (d <= 30 ? 0.75 : 0.3),
        });
        meta.set(id, {
          childFactor: 0.3 + rnd(key + "|ch") * 0.3,
          infant: exotic ? 2490 : 1490,
        });
      }
    }
  }

  offers.sort((a, b) => a.departureDate.localeCompare(b.departureDate) || a.id.localeCompare(b.id));
  return { day, offers, byId: new Map(offers.map((o) => [o.id, o])), meta };
}

let catalogue: Catalogue | undefined;

/** Rebuilt once per (Prague) day so departures stay in the future. */
function data(): Catalogue {
  const day = todayIso();
  if (!catalogue || catalogue.day !== day) catalogue = buildCatalogue(day);
  return catalogue;
}

const withHotel = (o: Offer): OfferWithHotel => ({ ...o, hotel: hotelById.get(o.hotelId)! });

/** Recompute prices for the searched party: children 30–60 %, infants a flat fee, solo traveller surcharge. */
function priceFor(o: Offer, p: Pick<SearchParams, "adults" | "childrenAges">): Offer {
  const m = data().meta.get(o.id) ?? { childFactor: 0.5, infant: 1490 };
  const adults = Math.max(1, p.adults || 2);
  const kids = p.childrenAges ?? [];
  const solo = adults === 1 && kids.length === 0;
  const adult = solo ? czk(o.pricePerPerson.amount * 1.3) : o.pricePerPerson.amount;

  let total = adult * adults;
  let firstChildWithSingleAdult = adults === 1;
  for (const age of kids) {
    if (age < 2) {
      total += m.infant;
    } else if (firstChildWithSingleAdult) {
      total += Math.round(adult * 0.8);
      firstChildWithSingleAdult = false;
    } else {
      total += Math.round(adult * (age >= 12 ? Math.max(m.childFactor, 0.55) : m.childFactor));
    }
  }

  return {
    ...o,
    pricePerPerson: money(adult),
    originalPrice: o.originalPrice
      ? money(solo ? czk(o.originalPrice.amount * 1.3) : o.originalPrice.amount)
      : undefined,
    totalPrice: money(Math.round(total / 10) * 10),
  };
}

// ---------------------------------------------------------------------------
// Search
// ---------------------------------------------------------------------------

type FacetKey = "board" | "stars" | "touroperator" | "destination" | "transport" | "departureAirport";

function matches(o: Offer, h: Hotel, p: SearchParams, skip?: FacetKey): boolean {
  if (p.destination && h.countrySlug !== p.destination && skip !== "destination") return false;
  if (p.hotelId && h.id !== p.hotelId) return false;
  if (p.dateFrom && o.departureDate < p.dateFrom) return false;
  if (p.dateTo && o.departureDate > p.dateTo) return false;
  if (p.nightsMin && o.nights < p.nightsMin) return false;
  if (p.nightsMax && o.nights > p.nightsMax) return false;
  if (skip !== "transport" && p.transport?.length && !p.transport.includes(o.transport)) return false;
  if (
    skip !== "departureAirport" &&
    p.departureAirports?.length &&
    (!o.departureAirport || !p.departureAirports.includes(o.departureAirport))
  )
    return false;
  if (skip !== "board" && p.board?.length && !p.board.includes(o.board)) return false;
  if (skip !== "stars" && p.stars?.length && !p.stars.includes(h.stars)) return false;
  if (skip !== "touroperator" && p.touroperators?.length && !p.touroperators.includes(o.touroperator)) return false;
  return true;
}

const FACET_VALUE: Record<FacetKey, (o: Offer, h: Hotel) => string | undefined> = {
  board: (o) => o.board,
  stars: (_o, h) => String(h.stars),
  touroperator: (o) => o.touroperator,
  destination: (_o, h) => h.countrySlug,
  transport: (o) => o.transport,
  departureAirport: (o) => o.departureAirport,
};

/** Disjunctive facets: each facet ignores its own filter so other options stay visible. */
function facetsFor(offers: Offer[], p: SearchParams): NonNullable<SearchResult["facets"]> {
  const facets = {} as Record<FacetKey, Record<string, number>>;
  for (const key of Object.keys(FACET_VALUE) as FacetKey[]) {
    const counts: Record<string, number> = {};
    for (const o of offers) {
      const h = hotelById.get(o.hotelId)!;
      if (!matches(o, h, p, key)) continue;
      if (p.priceMax && priceFor(o, p).totalPrice.amount > p.priceMax) continue;
      const v = FACET_VALUE[key](o, h);
      if (v) counts[v] = (counts[v] ?? 0) + 1;
    }
    facets[key] = counts;
  }
  return facets;
}

function sortOffers(items: OfferWithHotel[], sort: NonNullable<SearchParams["sort"]>) {
  items.sort((a, b) => {
    switch (sort) {
      case "price_desc":
        return b.totalPrice.amount - a.totalPrice.amount;
      case "date_asc":
        return a.departureDate.localeCompare(b.departureDate) || a.totalPrice.amount - b.totalPrice.amount;
      case "rating_desc":
        return (
          (b.hotel.rating?.score ?? 0) - (a.hotel.rating?.score ?? 0) || a.totalPrice.amount - b.totalPrice.amount
        );
      default:
        return a.totalPrice.amount - b.totalPrice.amount || a.departureDate.localeCompare(b.departureDate);
    }
  });
}

const delay = (ms = 90 + Math.floor(Math.random() * 90)) => new Promise((r) => setTimeout(r, ms));

const DEFAULT_PARTY = { adults: 2, childrenAges: [] as number[] };

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export class MockTourProvider implements TourProvider {
  readonly name = "mock";

  async search(params: SearchParams): Promise<SearchResult> {
    await delay();
    const { offers } = data();
    let items = offers.filter((o) => matches(o, hotelById.get(o.hotelId)!, params)).map((o) => withHotel(priceFor(o, params)));
    if (params.priceMax) items = items.filter((o) => o.totalPrice.amount <= params.priceMax!);
    sortOffers(items, params.sort ?? "price_asc");

    const pageSize = Math.max(1, params.pageSize ?? 12);
    const page = Math.max(1, params.page ?? 1);
    return {
      items: items.slice((page - 1) * pageSize, page * pageSize),
      total: items.length,
      page,
      pageSize,
      facets: facetsFor(offers, params),
    };
  }

  async getHotel(hotelId: string): Promise<Hotel | null> {
    await delay(40);
    return hotelById.get(hotelId) ?? null;
  }

  async getHotelOffers(hotelId: string, params: SearchParams): Promise<OfferWithHotel[]> {
    await delay();
    const hotel = hotelById.get(hotelId);
    if (!hotel) return [];
    const p = { ...params, hotelId };
    let items = data()
      .offers.filter((o) => o.hotelId === hotelId && matches(o, hotel, p))
      .map((o) => withHotel(priceFor(o, p)));
    if (p.priceMax) items = items.filter((o) => o.totalPrice.amount <= p.priceMax!);
    sortOffers(items, "date_asc");
    return items;
  }

  async getOffer(offerId: string): Promise<OfferWithHotel | null> {
    await delay(40);
    const o = data().byId.get(offerId);
    return o ? withHotel(priceFor(o, DEFAULT_PARTY)) : null;
  }

  async checkAvailability(offerId: string): Promise<AvailabilityCheck> {
    await delay(600 + Math.floor(Math.random() * 600)); // online check at the operator takes a moment
    const { day, byId } = data();
    const o = byId.get(offerId);
    const checkedAt = new Date().toISOString();
    if (!o) return { offerId, available: false, checkedAt };

    const r = rnd(`${offerId}|avail|${day}`);
    const soldOutRate = o.isLastMinute ? 0.14 : 0.07;
    if (r < soldOutRate) return { offerId, available: false, checkedAt };

    const base = priceFor(o, DEFAULT_PARTY).totalPrice.amount;
    let total = base;
    if (r > 0.9) {
      // operator re-priced: −2 % … +4 %
      const change = -0.02 + rnd(`${offerId}|delta|${day}`) * 0.06;
      total = czk((base * (1 + change)) / 2) * 2;
    }
    return { offerId, available: true, price: money(total), checkedAt };
  }

  async getHotTours(limit: number): Promise<OfferWithHotel[]> {
    await delay();
    const hot = data()
      .offers.filter((o) => o.isLastMinute)
      .sort((a, b) => a.departureDate.localeCompare(b.departureDate) || a.pricePerPerson.amount - b.pricePerPerson.amount);
    // Prefer one departure per hotel so the list shows variety, then fill up.
    const seen = new Set<string>();
    const first: Offer[] = [];
    const rest: Offer[] = [];
    for (const o of hot) {
      if (seen.has(o.hotelId)) rest.push(o);
      else {
        seen.add(o.hotelId);
        first.push(o);
      }
    }
    return [...first, ...rest]
      .slice(0, limit)
      .sort((a, b) => a.departureDate.localeCompare(b.departureDate))
      .map((o) => withHotel(priceFor(o, DEFAULT_PARTY)));
  }

  async getFeatured(limit: number): Promise<OfferWithHotel[]> {
    await delay();
    const { offers } = data();
    const cheapestByHotel = new Map<string, Offer>();
    for (const o of offers) {
      if (o.isLastMinute) continue;
      const cur = cheapestByHotel.get(o.hotelId);
      if (!cur || o.pricePerPerson.amount < cur.pricePerPerson.amount) cheapestByHotel.set(o.hotelId, o);
    }
    const candidates = HOTEL_LIST.filter((h) => h.stars === 5 && cheapestByHotel.has(h.id)).sort(
      (a, b) => (b.rating?.score ?? 0) - (a.rating?.score ?? 0) || (b.rating?.reviews ?? 0) - (a.rating?.reviews ?? 0),
    );
    // Round-robin over destinations: best hotel of each country first.
    const out: Hotel[] = [];
    const used = new Set<string>();
    while (out.length < limit && used.size < candidates.length) {
      const countries = new Set<string>();
      for (const h of candidates) {
        if (out.length >= limit) break;
        if (used.has(h.id) || countries.has(h.countrySlug)) continue;
        countries.add(h.countrySlug);
        used.add(h.id);
        out.push(h);
      }
    }
    return out.map((h) => withHotel(priceFor(cheapestByHotel.get(h.id)!, DEFAULT_PARTY)));
  }

  async book(request: BookingRequest): Promise<BookingResult> {
    await delay(300);
    // The mock never books directly: every request becomes an inquiry the agent finishes by hand.
    const o = data().byId.get(request.offerId);
    const seed = o ? seedById.get(o.hotelId) : undefined;
    const prefix = (seed?.slug ?? "xx").slice(0, 2).toUpperCase();
    const n = hash(`${request.offerId}|${request.customer.phone}|${Date.now()}`) % 900000;
    return { status: "inquiry", reference: `AT-${prefix}${String(100000 + n)}` };
  }
}
