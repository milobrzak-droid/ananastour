# Ananas Tour — web

Web cestovní agentury **Ananas Tour** (majitelka Aljona) pro Ukrajince žijící v Česku.
Prodává zájezdy českých CK; data zájezdů dodává **AnChoice Search API + Booking API**
(zatím běží na mock datech, viz [docs/ANCHOICE.md](docs/ANCHOICE.md)).
Hlavní kontaktní kanál je **Telegram** — každá stránka vede do chatu s Aljonou,
formuláře chodí přes bota rovnou do jejího Telegramu.

Web je dvojjazyčný: **ukrajinština (výchozí) + čeština**. Klientela mluví ukrajinsky,
dokumentace a kód jsou česky/anglicky.

## Stack

| Vrstva | Technologie |
|---|---|
| Framework | Next.js 15.5 (App Router, `params` je Promise), React 19 |
| Jazyk | TypeScript (strict) |
| Styly | Tailwind CSS v4 (design tokeny v `src/app/globals.css`) |
| Validace | zod (API routes) |
| Hosting | Vercel |

## Jak spustit

```bash
npm install
cp .env.example .env.local   # vyplňte proměnné (viz níže)
npm run dev                  # http://localhost:3000
```

Produkční build:

```bash
npm run build
npm start
```

Lint: `npm run lint`.

Bez vyplněného `.env.local` web funguje: zájezdy jedou z mock dat a poptávky
z formulářů se při vývoji jen vypisují do konzole serveru.

## Proměnné prostředí

Zdroj pravdy je [`.env.example`](.env.example). Proměnné `NEXT_PUBLIC_*` se
zapékají při **buildu** — po jejich změně je nutný redeploy.

| Proměnná | Povinná v produkci | Význam |
|---|---|---|
| `TOUR_PROVIDER` | ano (`mock` \| `anchoice`) | Zdroj dat zájezdů. Zatím `mock`; přepnutí viz [docs/ANCHOICE.md](docs/ANCHOICE.md). |
| `ANCHOICE_API_URL` | až s `anchoice` | Base URL AnChoice API. |
| `ANCHOICE_API_KEY` | až s `anchoice` | API klíč AnChoice. |
| `TELEGRAM_BOT_TOKEN` | **ano** | Token bota, který přeposílá poptávky z webu Aljoně ([docs/TELEGRAM-SETUP.md](docs/TELEGRAM-SETUP.md)). |
| `TELEGRAM_CHAT_ID` | **ano** | Chat id Aljony (nebo skupiny), kam bot píše. |
| `NEXT_PUBLIC_SITE_URL` | **ano** | Veřejná URL webu (metadata, sitemap, odkazy v Telegram zprávách). |
| `NEXT_PUBLIC_TELEGRAM_USERNAME` | ne (default `Ananas_tours`) | Aljonin veřejný Telegram účet bez `@` — cíl všech tlačítek „Napsat na Telegram“. |
| `NEXT_PUBLIC_PHONE` | ne | Telefon zobrazený na webu; bez něj platí fallback v `src/config/site.ts`. |
| `NEXT_PUBLIC_EMAIL` | ne | E-mail zobrazený na webu; bez něj platí fallback v `src/config/site.ts`. |

## Struktura projektu

```
src/
  app/[locale]/        stránky (uk/cs): úvod, tours, hotels/[id], offers/[id],
                       hot-tours, destinations, services, blog, about, contact,
                       privacy, terms
  app/api/             inquiry (poptávka → Telegram), availability, booking
  components/          brand/ (logo, ananas, doodle), layout/, home/, tours/,
                       contact/, pages/, seo/, ui.tsx
  config/site.ts       byznys konfigurace (kontakty, firma) — viz níže
  content/             destinations.ts (12 zemí), blog.ts, ananas-photos.ts
  i18n/                config.ts (locales, t()), dictionary.ts, routes.ts
  lib/tours/           datová vrstva zájezdů (mock + AnChoice adaptér)
  lib/contact/         Telegram (odkazy, bot)
  lib/analytics.ts     dataLayer wrapper (GTM)
  middleware.ts        jazykový redirect + cookie
content-source/        původní texty z ananastour.com (ukrajinsky)
public/img/ananas/     fotky převzaté z původního webu
docs/                  provozní dokumentace (viz níže)
ARCHITECTURE.md        pravidla kódu pro vývojáře
```

Podrobná mapa URL → obsah je v [ARCHITECTURE.md](ARCHITECTURE.md).

## Jak fungují jazyky

- Všechny stránky žijí pod `src/app/[locale]/…`, URL má vždy prefix `/uk` nebo `/cs`.
- **Ukrajinština je výchozí.** URL bez prefixu přesměruje `src/middleware.ts` na `/uk`,
  pokud si návštěvník dřív nepřepnul na češtinu — volba se pamatuje v cookie
  `NEXT_LOCALE` (platnost 1 rok). `Accept-Language` prohlížeče se **záměrně ignoruje**
  (Ukrajinci v ČR mívají prohlížeč česky).
- Sdílené texty (navigace, tlačítka): `src/i18n/dictionary.ts`.
  Texty konkrétní stránky: objekt `{ uk, cs }` přímo u stránky, čtený přes `t(value, locale)`.
- Interní odkazy vždy přes `src/i18n/routes.ts`.

## Byznys konfigurace

Vše, co může chtít změnit neprogramátor, je v **`src/config/site.ts`**:
kontakty (Telegram, telefon, e-mail, Instagram, adresa, otevírací doba)
a firemní údaje (`company.*` — název s.r.o., IČO, sídlo; zatím `TODO`).
Telefon, e-mail, Telegram username a URL webu lze přebít proměnnými prostředí.
Návod pro úpravy obsahu: [docs/OBSAH.md](docs/OBSAH.md).

## Deploy (Vercel)

1. Projekt je stavěný na Vercel — standardní Next.js build, žádné zvláštnosti.
2. Proměnné prostředí: Vercel → Project → Settings → Environment Variables
   (minimálně `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`, `NEXT_PUBLIC_SITE_URL`, `TOUR_PROVIDER`).
3. Po změně jakékoli `NEXT_PUBLIC_*` proměnné je potřeba **redeploy** (zapékají se při buildu).
4. Před ostrým spuštěním projděte [docs/SPUSTENI.md](docs/SPUSTENI.md).

## Dokumentace

| Soubor | Pro koho / o čem |
|---|---|
| [ARCHITECTURE.md](ARCHITECTURE.md) | vývojář — pravidla kódu, vizuál, struktura |
| [docs/OBSAH.md](docs/OBSAH.md) | úpravy textů, destinace, blog, fotky, kontakty |
| [docs/ANCHOICE.md](docs/ANCHOICE.md) | napojení na AnChoice API (runbook) |
| [docs/TELEGRAM-SETUP.md](docs/TELEGRAM-SETUP.md) | zřízení Telegram bota pro poptávky |
| [docs/SPUSTENI.md](docs/SPUSTENI.md) | checklist před spuštěním |
