import type { TourProvider } from "./provider";
import type {
  Board,
  Hotel,
  Offer,
  OfferWithHotel,
  SearchParams,
  SearchResult,
} from "./types";

/**
 * Deterministic fake data so the whole site works before AnChoice API access
 * exists. Shapes match `types.ts` exactly; replace by setting TOUR_PROVIDER=anchoice.
 */

const img = (seed: string, w = 1200, h = 800) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

const HOTEL_SEED: Array<[string, string, number, string, string]> = [
  // [name, countrySlug, stars, country, region]
  ["Rixos Sharm El Sheikh", "egypt", 5, "Egypt", "Sharm El Sheikh"],
  ["Steigenberger Aldau Beach", "egypt", 5, "Egypt", "Hurghada"],
  ["Albatros Palace Resort", "egypt", 4, "Egypt", "Hurghada"],
  ["Titanic Deluxe Belek", "turkey", 5, "Turecko", "Belek"],
  ["Delphin Imperial", "turkey", 5, "Turecko", "Lara"],
  ["Club Hotel Sera", "turkey", 4, "Turecko", "Lara"],
  ["Ikos Olivia", "greece", 5, "Řecko", "Chalkidiki"],
  ["Mitsis Grand Hotel", "greece", 4, "Řecko", "Rhodos"],
  ["Barceló Royal Beach", "bulgaria", 5, "Bulharsko", "Slunečné pobřeží"],
  ["Atlantis The Palm", "uae", 5, "SAE", "Dubaj"],
  ["Rixos Bab Al Bahr", "uae", 5, "SAE", "Ras Al Khaimah"],
  ["Kandima Maldives", "maldives", 5, "Maledivy", "Dhaalu Atoll"],
  ["Sun Siyam Iru Fushi", "maldives", 5, "Maledivy", "Noonu Atoll"],
  ["Vinpearl Resort Nha Trang", "vietnam", 5, "Vietnam", "Nha Trang"],
  ["Iberostar Selection Playa de Palma", "spain", 4, "Španělsko", "Mallorca"],
  ["Hard Rock Hotel Tenerife", "spain", 5, "Španělsko", "Tenerife"],
  ["Iberostar Selection Bávaro", "dominicana", 5, "Dominikánská republika", "Punta Cana"],
  ["Forte Village", "italy", 5, "Itálie", "Sardinie"],
  ["The Mulia Bali", "indonesia", 5, "Indonésie", "Bali"],
  ["Riu Palace Zanzibar", "zanzibar", 5, "Tanzanie", "Zanzibar"],
];

const OPERATORS = ["Join UP!", "Coral Travel", "FISCHER", "EXIM tours", "ČEDOK", "Blue Style"];
const BOARDS: Board[] = ["AI", "UAI", "HB", "BB", "AI", "AI"];
const AIRPORTS = ["PRG", "BRQ", "OSR", "PED"];

function hash(s: string): number {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return h >>> 0;
}

const hotels: Hotel[] = HOTEL_SEED.map(([name, countrySlug, stars, country, region], i) => {
  const id = `h${i + 1}`;
  const h = hash(name);
  return {
    id,
    name,
    stars,
    country,
    countrySlug,
    region,
    images: [0, 1, 2, 3].map((n) => img(`${id}-${n}`)),
    description:
      "Ukázkový popis hotelu. Skutečný text, fotografie a hodnocení dodá AnChoice Search API.",
    amenities: ["Bazén", "Wi-Fi", "Pláž", "Spa", "Dětský klub", "Fitness"].slice(0, 3 + (h % 4)),
    rating: { score: 3.8 + (h % 12) / 10, reviews: 200 + (h % 3000), source: "tripadvisor" },
    distances: { beach: (h % 5) * 100, airport: 15000 + (h % 40) * 1000 },
  };
});

function addDays(d: Date, days: number): Date {
  const r = new Date(d);
  r.setUTCDate(r.getUTCDate() + days);
  return r;
}
const iso = (d: Date) => d.toISOString().slice(0, 10);

function buildOffers(): Offer[] {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const offers: Offer[] = [];
  hotels.forEach((hotel, hi) => {
    for (let k = 0; k < 8; k++) {
      const seed = hash(`${hotel.id}-${k}`);
      const nights = [7, 7, 10, 11, 14][seed % 5];
      const start = addDays(today, 3 + k * 9 + (seed % 6));
      const base = 9000 + hotel.stars * 3500 + (seed % 9000) + (hotel.countrySlug === "maldives" ? 40000 : 0);
      const perPerson = Math.round((base * nights) / 7 / 10) * 10;
      const lastMinute = k < 2 && seed % 3 !== 0;
      offers.push({
        id: `o${hi + 1}-${k + 1}`,
        hotelId: hotel.id,
        touroperator: OPERATORS[seed % OPERATORS.length],
        departureDate: iso(start),
        returnDate: iso(addDays(start, nights)),
        nights,
        transport: hotel.countrySlug === "bulgaria" && seed % 2 ? "bus" : "flight",
        departureAirport: AIRPORTS[seed % AIRPORTS.length],
        board: BOARDS[seed % BOARDS.length],
        roomType: ["Standard Room", "Superior Sea View", "Family Room", "Junior Suite"][seed % 4],
        pricePerPerson: { amount: perPerson, currency: "CZK" },
        totalPrice: { amount: perPerson * 2, currency: "CZK" },
        originalPrice: lastMinute ? { amount: Math.round(perPerson * 1.3), currency: "CZK" } : undefined,
        isLastMinute: lastMinute,
        verified: seed % 2 === 0,
      });
    }
  });
  return offers;
}

const offers = buildOffers();
const hotelById = new Map(hotels.map((h) => [h.id, h]));

function withHotel(o: Offer): OfferWithHotel {
  return { ...o, hotel: hotelById.get(o.hotelId)! };
}

/** Recompute group price for the searched party (children at 50 %). */
function priceFor(o: Offer, params: SearchParams): Offer {
  const children = params.childrenAges ?? [];
  const units = Math.max(1, params.adults) + children.filter((a) => a >= 2).length * 0.5;
  return {
    ...o,
    totalPrice: { amount: Math.round(o.pricePerPerson.amount * units), currency: "CZK" },
  };
}

function matches(o: Offer, h: Hotel, p: SearchParams): boolean {
  if (p.destination && h.countrySlug !== p.destination) return false;
  if (p.hotelId && h.id !== p.hotelId) return false;
  if (p.dateFrom && o.departureDate < p.dateFrom) return false;
  if (p.dateTo && o.departureDate > p.dateTo) return false;
  if (p.nightsMin && o.nights < p.nightsMin) return false;
  if (p.nightsMax && o.nights > p.nightsMax) return false;
  if (p.transport?.length && !p.transport.includes(o.transport)) return false;
  if (p.departureAirports?.length && (!o.departureAirport || !p.departureAirports.includes(o.departureAirport)))
    return false;
  if (p.board?.length && !p.board.includes(o.board)) return false;
  if (p.stars?.length && !p.stars.includes(h.stars)) return false;
  if (p.touroperators?.length && !p.touroperators.includes(o.touroperator)) return false;
  return true;
}

const delay = () => new Promise((r) => setTimeout(r, 120));

export class MockTourProvider implements TourProvider {
  readonly name = "mock";

  async search(params: SearchParams): Promise<SearchResult> {
    await delay();
    let items = offers
      .filter((o) => matches(o, hotelById.get(o.hotelId)!, params))
      .map((o) => withHotel(priceFor(o, params)));
    if (params.priceMax) items = items.filter((o) => o.totalPrice.amount <= params.priceMax!);

    const sort = params.sort ?? "price_asc";
    items.sort((a, b) => {
      switch (sort) {
        case "price_desc":
          return b.totalPrice.amount - a.totalPrice.amount;
        case "date_asc":
          return a.departureDate.localeCompare(b.departureDate);
        case "rating_desc":
          return (b.hotel.rating?.score ?? 0) - (a.hotel.rating?.score ?? 0);
        default:
          return a.totalPrice.amount - b.totalPrice.amount;
      }
    });

    const facets: SearchResult["facets"] = { board: {}, stars: {}, touroperator: {}, destination: {} };
    for (const o of items) {
      facets.board[o.board] = (facets.board[o.board] ?? 0) + 1;
      facets.stars[String(o.hotel.stars)] = (facets.stars[String(o.hotel.stars)] ?? 0) + 1;
      facets.touroperator[o.touroperator] = (facets.touroperator[o.touroperator] ?? 0) + 1;
      facets.destination[o.hotel.countrySlug] = (facets.destination[o.hotel.countrySlug] ?? 0) + 1;
    }

    const page = params.page ?? 1;
    const pageSize = params.pageSize ?? 12;
    return {
      items: items.slice((page - 1) * pageSize, page * pageSize),
      total: items.length,
      page,
      pageSize,
      facets,
    };
  }

  async getHotel(hotelId: string) {
    return hotelById.get(hotelId) ?? null;
  }

  async getHotelOffers(hotelId: string, params: SearchParams) {
    const r = await this.search({ ...params, hotelId, pageSize: 100, sort: "date_asc" });
    return r.items;
  }

  async getOffer(offerId: string) {
    const o = offers.find((x) => x.id === offerId);
    return o ? withHotel(o) : null;
  }

  async checkAvailability(offerId: string) {
    await delay();
    const o = offers.find((x) => x.id === offerId);
    return {
      offerId,
      available: Boolean(o) && hash(offerId) % 7 !== 0,
      price: o?.totalPrice,
      checkedAt: new Date().toISOString(),
    };
  }

  async getHotTours(limit: number) {
    return offers
      .filter((o) => o.isLastMinute)
      .sort((a, b) => a.departureDate.localeCompare(b.departureDate))
      .slice(0, limit)
      .map(withHotel);
  }

  async getFeatured(limit: number) {
    const seen = new Set<string>();
    const out: OfferWithHotel[] = [];
    for (const o of [...offers].sort((a, b) => b.pricePerPerson.amount - a.pricePerPerson.amount)) {
      if (seen.has(o.hotelId)) continue;
      seen.add(o.hotelId);
      out.push(withHotel(o));
      if (out.length >= limit) break;
    }
    return out;
  }

  async book(request: Parameters<TourProvider["book"]>[0]) {
    await delay();
    return { status: "inquiry" as const, reference: `MOCK-${hash(request.offerId + request.customer.phone) % 100000}` };
  }
}
