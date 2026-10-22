/**
 * Provider-neutral domain model for package tours.
 *
 * The UI only ever talks to these types. A concrete provider (mock now,
 * AnChoice Search/Booking API later) maps its own payloads onto them in
 * its adapter, so swapping or adding a data source never touches pages.
 */

export type Money = {
  amount: number;
  currency: "CZK" | "EUR";
};

export type Transport = "flight" | "bus" | "own";

/** Normalised board codes; providers map their own codes onto these. */
export type Board = "RO" | "BB" | "HB" | "FB" | "AI" | "UAI";

export type Traveller = {
  /** Age at the date of return; adults may use 30. */
  age: number;
};

export type SearchParams = {
  /** Destination slug from `content/destinations` or a provider destination id. */
  destination?: string;
  hotelId?: string;
  dateFrom?: string; // ISO date, earliest departure
  dateTo?: string; // ISO date, latest departure
  nightsMin?: number;
  nightsMax?: number;
  adults: number;
  childrenAges: number[];
  transport?: Transport[];
  departureAirports?: string[]; // IATA, e.g. PRG, BRQ, OSR, PED
  board?: Board[];
  stars?: number[];
  priceMax?: number; // total for the whole group, in CZK
  touroperators?: string[];
  sort?: "price_asc" | "price_desc" | "date_asc" | "rating_desc";
  page?: number;
  pageSize?: number;
};

export type Hotel = {
  id: string;
  name: string;
  stars: number;
  country: string;
  countrySlug: string;
  region: string;
  location?: { lat: number; lng: number };
  images: string[];
  description?: string;
  amenities: string[];
  rating?: { score: number; reviews: number; source: "tripadvisor" | "provider" };
  distances?: { beach?: number; centre?: number; airport?: number }; // metres
};

/** One bookable departure (hotel × date × room × board × operator). */
export type Offer = {
  id: string;
  hotelId: string;
  touroperator: string;
  departureDate: string; // ISO date
  returnDate: string;
  nights: number;
  transport: Transport;
  departureAirport?: string;
  board: Board;
  roomType: string;
  /** Price for the whole searched group. */
  totalPrice: Money;
  pricePerPerson: Money;
  originalPrice?: Money; // set when discounted (hot tours)
  isLastMinute?: boolean;
  /** True when the provider verified price/availability online moments ago. */
  verified?: boolean;
};

export type OfferWithHotel = Offer & { hotel: Hotel };

export type SearchResult = {
  items: OfferWithHotel[];
  total: number;
  page: number;
  pageSize: number;
  /** Facet counts for filter UI, keyed by filter name then value. */
  facets?: Record<string, Record<string, number>>;
};

export type AvailabilityCheck = {
  offerId: string;
  available: boolean;
  price?: Money;
  checkedAt: string;
};

export type Customer = {
  name: string;
  phone: string;
  email?: string;
  telegram?: string;
};

export type BookingRequest = {
  offerId: string;
  customer: Customer;
  travellers: Array<Traveller & { firstName?: string; lastName?: string; birthDate?: string }>;
  note?: string;
};

export type BookingResult =
  | { status: "booked"; reservationNumber: string }
  /** Operator does not support direct booking — agent finishes it manually. */
  | { status: "inquiry"; reference: string }
  | { status: "failed"; reason: string };
