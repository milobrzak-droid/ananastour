# AnChoice — runbook napojení

Zájezdy dodává AnChoice (**Search API + Booking API**,
https://anchoice.cz/data-pro-vas-projekt/). Tento dokument popisuje, co je
hotové, co musí dodat AnChoice, co zbývá doprogramovat a co otestovat.

## Současný stav

- **Web běží na mock datech** (`TOUR_PROVIDER=mock`). Mock provider
  (`src/lib/tours/mock-provider.ts` + `mock-data.ts`) generuje realistický
  katalog hotelů a termínů pro 12 destinací — celé UI je na něm odladěné.
- Celé UI čte data **výhradně** přes `tours()` z `src/lib/tours` (server-only)
  a zná jen doménové typy z `src/lib/tours/types.ts`. Žádná stránka nevolá
  AnChoice ani mock napřímo — výměna zdroje se UI nedotkne.
- Adaptér `src/lib/tours/anchoice-provider.ts` je **kostra**: má hotovou
  konfiguraci, společný `request()` s cachováním a všechny metody rozhraní
  `TourProvider`, ale každá zatím vyhazuje `not implemented` (čeká na dokumentaci).

## Co musí AnChoice dodat

- [ ] **Dokumentaci Search API** — endpointy, parametry, formáty odpovědí
- [ ] **Dokumentaci Booking API** — vytvoření objednávky, stavy, chybové kódy;
      které CK podporují přímý booking (pro ostatní padáme na `{ status: "inquiry" }`)
- [ ] **Přístupy** — base URL + API klíč (→ `ANCHOICE_API_URL`, `ANCHOICE_API_KEY`),
      potvrzení auth schématu (adaptér zatím předpokládá `Authorization: Bearer <key>`)
- [ ] **Hostname obrázkového CDN** — nutné přidat do `images.remotePatterns`
      v `next.config.ts`, jinak `next/image` fotky hotelů odmítne
- [ ] **Číselníky** — id zemí/destinací (mapování na naše slugy), letišť, stravy,
      touroperátorů
- [ ] Jsou texty hotelů dostupné v uk/cs? (viz TODO v `hotels/[id]/page.tsx`)
- [ ] **Sandbox/test prostředí** a testovací objednávka
- [ ] **Ceník compute units** — podklad pro nastavení cache (viz Náklady)

## TODO adaptéru

Z hlavičky `src/lib/tours/anchoice-provider.ts` — až dorazí dokumentace a přístupy:

1. Vyplnit `ANCHOICE_API_URL` / `ANCHOICE_API_KEY` v `.env.local` (produkce: Vercel).
2. Implementovat autentizaci v `request()` a endpoint každé metody.
3. Napsat `map*` funkce z AnChoice payloadů na naše doménové typy (`types.ts`).
4. Přepnout `TOUR_PROVIDER=anchoice`.

Související `TODO(anchoice)` jinde v repu:

| Soubor | Co |
|---|---|
| `next.config.ts` | přidat hostname AnChoice image CDN do `remotePatterns` |
| `src/lib/tours/anchoice-provider.ts` | potvrdit auth schéma (`request()`) |
| `src/app/api/availability/route.ts` | každé volání stojí compute units → zvážit rate limit per IP |
| `src/app/[locale]/hotels/[id]/page.tsx` | popisy hotelů chodí v jazyce providera; vyžádat uk/cs |
| `src/app/[locale]/offers/[id]/page.tsx` | reálné seznamy „v ceně / za příplatek“ z detailu nabídky |

## Jak funguje přepnutí

`tours()` v `src/lib/tours/index.ts` je singleton: podle
`TOUR_PROVIDER=mock|anchoice` vybere `MockTourProvider`, nebo
`AnchoiceTourProvider`. Přepnutí = nastavit na Vercelu
`TOUR_PROVIDER=anchoice` + `ANCHOICE_API_URL` + `ANCHOICE_API_KEY` a redeploy.
Rollback = vrátit `TOUR_PROVIDER=mock` a redeploy — mock zůstává v kódu jako záloha.

Metody, které musí adaptér pokrýt (rozhraní `TourProvider`):

| Metoda | Používá | Cache |
|---|---|---|
| `search(params)` | `/tours` — výsledky + filtry + stránkování | ano |
| `getHotel(id)` | `/hotels/[id]` | ano |
| `getHotelOffers(id, params)` | tabulka termínů na detailu hotelu | ano |
| `getOffer(id)` | `/offers/[id]` | ano |
| `checkAvailability(offerId)` | ověření ceny před objednávkou (`/api/availability`) | **nikdy** (`revalidate: false`) |
| `getHotTours(limit)` | `/hot-tours` + sekce na úvodu | ano |
| `getFeatured(limit)` | doporučené na úvodu | ano |
| `book(req)` | `/api/booking`; CK bez přímého bookingu → `{ status: "inquiry" }` | ne |

## Co otestovat po přepnutí

Projít v obou jazycích (uk/cs):

- [ ] **Vyhledávání** — `/tours` s destinací, termínem, počtem osob (vč. dětí s věky);
      prázdný výsledek; sdílený odkaz s query stringem vrací stejné výsledky
- [ ] **Filtry** — strava, hvězdičky, cena max, letiště odletu, doprava,
      touroperátoři, řazení, stránkování; kombinace filtrů
- [ ] **Detail hotelu** — `/hotels/[id]`: fotky (z AnChoice CDN!), popis, tabulka termínů
- [ ] **Detail nabídky** — `/offers/[id]`: cena, složení ceny, „v ceně / za příplatek“
- [ ] **Ověření dostupnosti** — na detailu nabídky živé ověření ceny
      (`/api/availability`); odpověď se nesmí cachovat; chování při výpadku API (502)
- [ ] **Objednávka** — `/api/booking`: cesta `booked`, cesta `inquiry`
      (CK bez přímého bookingu), cesta `failed`; v každém případě dorazí
      objednávka Aljoně do Telegramu
- [ ] **Hot tours** — `/hot-tours` + sekce na úvodní stránce
- [ ] **Featured** — doporučené zájezdy na úvodní stránce
- [ ] Fotky hotelů se načítají přes `next/image` (hostname v `next.config.ts`)
- [ ] Chybové stavy: neplatné `hotelId`/`offerId` (404), výpadek AnChoice

## Náklady (compute units) a cache

AnChoice účtuje **za compute unit**, proto:

- Všechna volání jdou přes společný `request()` v adaptéru, který GET-like
  dotazy cachuje přes Next.js (`next: { revalidate }`, default **300 s**).
  Po nasazení doladit délku podle typu dotazu (search krátce, detail hotelu
  klidně déle) a podle ceníku.
- **`checkAvailability` se nesmí cachovat nikdy** (`revalidate: false` →
  `cache: "no-store"`) — zákazník musí před objednávkou vidět aktuální cenu
  a dostupnost ze systému CK. `/api/availability` je proto `force-dynamic`
  s `Cache-Control: no-store`.
- Protože availability je necachované a volá ho klient, zvážit **rate limit
  per IP** na `/api/availability` (TODO v route), ať náklady neudělá robot.
- Po spuštění hlídat spotřebu units první týdny a podle toho upravit
  `revalidate` jednotlivých metod.
