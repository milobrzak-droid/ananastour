export const locales = ["uk", "cs"] as const;
export type Locale = (typeof locales)[number];

// TODO(client): confirm primary language. Ukrainian first, because the clientele
// are Ukrainians living in Czechia.
export const defaultLocale: Locale = "uk";

export const localeLabels: Record<Locale, string> = {
  uk: "Українська",
  cs: "Čeština",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Pick the right language variant from a `{ uk, cs }` object. */
export function t<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale] ?? value[defaultLocale];
}
