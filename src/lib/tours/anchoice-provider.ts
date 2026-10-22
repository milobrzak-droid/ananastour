import "server-only";
import type { TourProvider } from "./provider";
import type {
  AvailabilityCheck,
  BookingRequest,
  BookingResult,
  Hotel,
  OfferWithHotel,
  SearchParams,
  SearchResult,
} from "./types";

/**
 * Adapter for AnChoice Search API + Booking API (https://anchoice.cz/data-pro-vas-projekt/).
 *
 * TODO(anchoice): API documentation and credentials are not available yet.
 * When they arrive:
 *   1. fill ANCHOICE_API_URL / ANCHOICE_API_KEY in .env.local,
 *   2. implement `request()` auth and each method's endpoint,
 *   3. write the `map*` functions from AnChoice payloads to our domain types,
 *   4. switch TOUR_PROVIDER=anchoice.
 * AnChoice bills per compute unit, so every call goes through `request()`,
 * which caches GET-like calls (see `revalidate`).
 */

type AnchoiceConfig = { baseUrl: string; apiKey: string };

function config(): AnchoiceConfig {
  const baseUrl = process.env.ANCHOICE_API_URL;
  const apiKey = process.env.ANCHOICE_API_KEY;
  if (!baseUrl || !apiKey) {
    throw new Error("AnChoice API is not configured: set ANCHOICE_API_URL and ANCHOICE_API_KEY.");
  }
  return { baseUrl, apiKey };
}

async function request<T>(
  path: string,
  init: { method?: "GET" | "POST"; body?: unknown; revalidate?: number | false } = {},
): Promise<T> {
  const { baseUrl, apiKey } = config();
  const res = await fetch(new URL(path, baseUrl), {
    method: init.method ?? "GET",
    headers: {
      "Content-Type": "application/json",
      // TODO(anchoice): confirm auth scheme.
      Authorization: `Bearer ${apiKey}`,
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    next: init.revalidate === false ? undefined : { revalidate: init.revalidate ?? 300 },
    cache: init.revalidate === false ? "no-store" : undefined,
  });
  if (!res.ok) throw new Error(`AnChoice ${path} failed: ${res.status}`);
  return (await res.json()) as T;
}

const notImplemented = (what: string): never => {
  throw new Error(`AnChoice adapter: ${what} not implemented yet (waiting for API docs).`);
};

export class AnchoiceTourProvider implements TourProvider {
  readonly name = "anchoice";

  async search(params: SearchParams): Promise<SearchResult> {
    void params;
    void request;
    return notImplemented("search");
  }
  async getHotel(hotelId: string): Promise<Hotel | null> {
    void hotelId;
    return notImplemented("getHotel");
  }
  async getHotelOffers(hotelId: string, params: SearchParams): Promise<OfferWithHotel[]> {
    void hotelId;
    void params;
    return notImplemented("getHotelOffers");
  }
  async getOffer(offerId: string): Promise<OfferWithHotel | null> {
    void offerId;
    return notImplemented("getOffer");
  }
  async checkAvailability(offerId: string): Promise<AvailabilityCheck> {
    void offerId;
    return notImplemented("checkAvailability"); // must use revalidate: false
  }
  async getHotTours(limit: number): Promise<OfferWithHotel[]> {
    void limit;
    return notImplemented("getHotTours");
  }
  async getFeatured(limit: number): Promise<OfferWithHotel[]> {
    void limit;
    return notImplemented("getFeatured");
  }
  async book(req: BookingRequest): Promise<BookingResult> {
    void req;
    return notImplemented("book"); // Booking API; fall back to { status: "inquiry" } for unsupported operators
  }
}
