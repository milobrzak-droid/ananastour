import type { Board, SearchParams, Transport } from "./types";

/**
 * SearchParams <-> URL query string. Short keys keep shareable links readable:
 * /uk/tours?destination=egypt&from=2026-11-01&to=2026-11-30&nmin=7&nmax=10&adults=2&kids=5,9
 */
type Raw = Record<string, string | string[] | undefined>;

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
const list = (v: string | string[] | undefined) =>
  (one(v) ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
const num = (v: string | string[] | undefined) => {
  const n = Number(one(v));
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export const DEFAULT_SEARCH: SearchParams = { adults: 2, childrenAges: [] };

export function parseSearchParams(raw: Raw): SearchParams {
  return {
    destination: one(raw.destination) || undefined,
    hotelId: one(raw.hotel) || undefined,
    dateFrom: one(raw.from) || undefined,
    dateTo: one(raw.to) || undefined,
    nightsMin: num(raw.nmin),
    nightsMax: num(raw.nmax),
    adults: Math.min(9, num(raw.adults) ?? DEFAULT_SEARCH.adults),
    childrenAges: list(raw.kids)
      .map(Number)
      .filter((n) => Number.isInteger(n) && n >= 0 && n < 18),
    transport: list(raw.transport) as Transport[],
    departureAirports: list(raw.airports),
    board: list(raw.board) as Board[],
    stars: list(raw.stars).map(Number).filter(Boolean),
    priceMax: num(raw.pmax),
    touroperators: list(raw.ops),
    sort: (one(raw.sort) as SearchParams["sort"]) || undefined,
    page: num(raw.page),
  };
}

export function toQueryString(p: Partial<SearchParams>): string {
  const q = new URLSearchParams();
  const set = (k: string, v: unknown) => {
    if (v === undefined || v === null || v === "" || (Array.isArray(v) && v.length === 0)) return;
    q.set(k, Array.isArray(v) ? v.join(",") : String(v));
  };
  set("destination", p.destination);
  set("hotel", p.hotelId);
  set("from", p.dateFrom);
  set("to", p.dateTo);
  set("nmin", p.nightsMin);
  set("nmax", p.nightsMax);
  set("adults", p.adults);
  set("kids", p.childrenAges);
  set("transport", p.transport);
  set("airports", p.departureAirports);
  set("board", p.board);
  set("stars", p.stars);
  set("pmax", p.priceMax);
  set("ops", p.touroperators);
  set("sort", p.sort);
  set("page", p.page && p.page > 1 ? p.page : undefined);
  return q.toString();
}
