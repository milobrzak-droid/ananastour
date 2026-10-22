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
 * Contract every tour data source implements. Mirrors the two AnChoice APIs:
 * Search API (search, hotel, offer, availability) and Booking API (book).
 */
export interface TourProvider {
  readonly name: string;

  search(params: SearchParams): Promise<SearchResult>;

  getHotel(hotelId: string): Promise<Hotel | null>;

  /** All departures for one hotel matching the params (hotel detail page). */
  getHotelOffers(hotelId: string, params: SearchParams): Promise<OfferWithHotel[]>;

  getOffer(offerId: string): Promise<OfferWithHotel | null>;

  /** Online price and availability check right before booking. */
  checkAvailability(offerId: string): Promise<AvailabilityCheck>;

  /** Discounted departures in the next weeks — homepage and /hot-tours. */
  getHotTours(limit: number): Promise<OfferWithHotel[]>;

  /** Hand-picked or provider-promoted offers ("Recommended by Ananas Tour"). */
  getFeatured(limit: number): Promise<OfferWithHotel[]>;

  book(request: BookingRequest): Promise<BookingResult>;
}
