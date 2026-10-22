# Ananas Tour — web

Web cestovní agentury Ananas Tour pro Ukrajince v Česku. Zájezdy českých CK
dodává **AnChoice Search API + Booking API** (zatím mock data).

## Stack
Next.js 15 (App Router, `params` je Promise) · TypeScript strict · Tailwind CSS v4 (tokeny v `src/app/globals.css`) · zod.

## Pravidla
- **Jazyky:** `uk` (výchozí) a `cs`, všechny stránky pod `src/app/[locale]/…`.
  Sdílené texty v `src/i18n/dictionary.ts`, texty stránky přímo u stránky jako `{ uk, cs }` + `t(value, locale)`.
  URL vždy přes `src/i18n/routes.ts`.
- **Data zájezdů** jen přes `tours()` z `src/lib/tours` (server-only). UI zná jen typy z `types.ts`.
  Nikdy nevolat AnChoice ani mock napřímo. `TOUR_PROVIDER=mock|anchoice`.
- **Kontakt = Telegram.** Každá stránka musí mít jasnou cestu do Telegramu:
  `TelegramButton` (s předvyplněnou zprávou s kontextem), `offerTelegramMessage()` u zájezdů,
  `InquiryForm` (posílá na `/api/inquiry` → Telegram bot). Kontaktní lišta, hlavička a plovoucí tlačítko jsou v layoutu.
- **Vizuál:** web leží na teal rámu (`bg-teal`) jako zaoblený panel `bg-paper` (layout). Tokeny `bg-red` (jen hlavní CTA, #d93219 kvůli kontrastu),
  `bg-yellow` (ananas), `bg-ice`, `bg-ink` (námořnická), `bg-grey`, `bg-charcoal`, `bg-telegram` (#1a78ad; brand #229ed9 jen dekor).
  Karty velké zaoblení (`rounded-[2rem] sm:rounded-[2.5rem]`, `shape-card*` jsou aliasy), tlačítka `shape-pill`, `Notch` (výřez s CTA v rohu fotky).
  Nadpisy `font-display` (Unbounded, black, uppercase), razítka `font-slab` (Roboto Slab), text Montserrat. Min. kontrast textu `text-ink/70`.
  Brand: `brand/logo.tsx` (LogoMark/LogoFull), `brand/pineapple.tsx` (`PineappleSlice`, `PineapplePattern`, `Stamp`, `CircleBadge`, `SliceMask`, `PineappleSpinner`),
  `brand/route-doodle.tsx` (tečkovaná trasa s piny), fotky klientky `src/content/ananas-photos.ts`, stock `brand/photos.ts`. UI: `src/components/ui.tsx`.
- **Obsah** přebíráme z původního webu ananastour.com (texty v `content-source/*.txt`, ukrajinsky);
  české verze přeložit. Ceny v CZK, letiště PRG/BRQ/OSR/PED, ne Kyjev.
- `TODO(client)` = chybí údaj od klientky, `TODO(anchoice)` = čeká na API dokumentaci.

## Struktura
| URL | Obsah |
|---|---|
| `/[locale]` | úvod |
| `/tours` | vyhledávání + filtry (query string = SearchParams) |
| `/hotels/[id]` | detail hotelu + termíny |
| `/offers/[id]` | detail termínu, ověření ceny, objednávka |
| `/hot-tours` | last minute |
| `/destinations`, `/destinations/[slug]` | 12 zemí |
| `/services`, `/blog`, `/blog/[slug]`, `/about`, `/contact`, `/privacy`, `/terms` | obsah |
| `/api/inquiry` | poptávka → Telegram bot |
