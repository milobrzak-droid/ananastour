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
    phone: process.env.NEXT_PUBLIC_PHONE || "+420 723 615 028",
    // TODO(client): ananastour.cz is not registered yet (checked 2026-10-22) — register the
    // domain and create this mailbox before launch, otherwise e-mails bounce.
    email: process.env.NEXT_PUBLIC_EMAIL || "hello@ananastour.cz",
    instagram: "https://instagram.com/ananas_tour_",
    // TODO(client): Czech office address — none yet, agency works remotely.
    address: { uk: "Чехія — працюємо онлайн", cs: "Česko — fungujeme online" },
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
