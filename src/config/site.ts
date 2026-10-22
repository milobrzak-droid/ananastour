/**
 * Central business configuration. Everything a non-developer may need to change
 * (contacts, Telegram, company data) lives here or in environment variables.
 */
export const site = {
  name: "Ananas Tour",
  tagline: "travel agency",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  owner: {
    name: { uk: "Альона", cs: "Aljona" },
    since: 2011,
    countriesVisited: 22,
  },

  contact: {
    /** Telegram username without "@" — main contact channel. */
    telegramUsername: process.env.NEXT_PUBLIC_TELEGRAM_USERNAME ?? "Ananas_tours",
    // TODO(client): Czech phone number and e-mail once known.
    phone: process.env.NEXT_PUBLIC_PHONE ?? "+420 000 000 000",
    email: process.env.NEXT_PUBLIC_EMAIL ?? "info@ananastour.com",
    instagram: "https://instagram.com/ananas_tour_",
    // TODO(client): Czech office address (or remove if online-only).
    address: { uk: "Прага, Чехія", cs: "Praha, Česká republika" },
    hours: { uk: "Пн–Нд 9:00–21:00", cs: "Po–Ne 9:00–21:00" },
  },

  // TODO(client): legal entity data required by Czech law (zákon 159/1999 Sb.).
  company: {
    legalName: "TODO s.r.o.",
    ico: "TODO",
    registeredOffice: "TODO",
  },
} as const;

export type Site = typeof site;
