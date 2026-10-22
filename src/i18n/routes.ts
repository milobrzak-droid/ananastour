import type { Locale } from "./config";

/**
 * All internal URLs are built here so slugs stay consistent across pages.
 * Path segments are the same in both languages; only the /uk or /cs prefix differs.
 */
export const routes = {
  home: (l: Locale) => `/${l}`,
  tours: (l: Locale, query?: string) => `/${l}/tours${query ? `?${query}` : ""}`,
  hotel: (l: Locale, hotelId: string, query?: string) => `/${l}/hotels/${hotelId}${query ? `?${query}` : ""}`,
  offer: (l: Locale, offerId: string) => `/${l}/offers/${offerId}`,
  hot: (l: Locale) => `/${l}/hot-tours`,
  destinations: (l: Locale) => `/${l}/destinations`,
  destination: (l: Locale, slug: string) => `/${l}/destinations/${slug}`,
  services: (l: Locale) => `/${l}/services`,
  blog: (l: Locale) => `/${l}/blog`,
  post: (l: Locale, slug: string) => `/${l}/blog/${slug}`,
  about: (l: Locale) => `/${l}/about`,
  contact: (l: Locale) => `/${l}/contact`,
  privacy: (l: Locale) => `/${l}/privacy`,
  terms: (l: Locale) => `/${l}/terms`,
};
