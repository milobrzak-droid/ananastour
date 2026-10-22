# Úpravy obsahu

Návod pro úpravy textů, destinací, blogu, kontaktů a fotek. Vše je v kódu
(žádný CMS) — po každé změně commit + deploy.

**Základní pravidlo:** každý text na webu existuje ve dvou jazycích jako objekt
`{ uk: "…", cs: "…" }` (často přes helper `tx(uk, cs)`). Vždy vyplňte **obě**
verze; na stránce se vybírá přes `t(value, locale)`.

## Kde co je

| Obsah | Soubor |
|---|---|
| Navigace, tlačítka, společné fráze | `src/i18n/dictionary.ts` |
| Texty konkrétní stránky (úvod, služby, o nás, kontakt…) | objekty `{ uk, cs }` přímo v souboru stránky: `src/app/[locale]/<stránka>/page.tsx`, sekce úvodu v `src/components/home/*` |
| Průvodce destinacemi (12 zemí) | `src/content/destinations.ts` |
| Dlaždice destinací na úvodu + v SearchBoxu | `src/components/home/destinations-data.ts` |
| Blog | `src/content/blog.ts` |
| Kontakty, otevírací doba, firemní údaje | `src/config/site.ts` + env proměnné (viz níže) |
| Fotky z původního webu | `public/img/ananas/` + mapování v `src/content/ananas-photos.ts` |
| Stock fotky (Unsplash) | `src/components/brand/photos.ts` |
| Právní texty (ochrana údajů, podmínky) | `src/app/[locale]/privacy/page.tsx`, `…/terms/page.tsx` |
| Původní ukrajinské texty z ananastour.com (jen zdroj) | `content-source/*.txt` |

Značka `TODO(client)` v kódu = údaj, který musí potvrdit/dodat klientka
(souhrn v [SPUSTENI.md](SPUSTENI.md)).

## Jak přidat 13. destinaci

Příklad: Thajsko, slug `thailand`. Slug je malými písmeny, bez diakritiky,
objeví se v URL `/uk/destinations/thailand`.

1. **Fotka** — uložte hlavní fotku jako `public/img/ananas/dest-thailand.jpg`
   (JPG na šířku, ideálně ~1600 px, komprimovaná).
2. **`src/content/ananas-photos.ts`** — přidejte `"thailand"` do setu `DEST_LOCAL`.
   Bez toho se místo vaší fotky použije stock záběr.
3. **`src/content/destinations.ts`** — do pole `destinations` přidejte nový objekt.
   Nejjednodušší je zkopírovat celý blok Turecka (`slug: "turkey"`) a přepsat:
   `slug`, `name`/`nameTo`/`nameIn` (pády: „do Thajska“, „v Thajsku“), `flag`,
   `tagline`, `teaser`, `intro`, `bestSeason`, `flightTime`, `airports`,
   `currency`, `entry`, 3× `regions`, `money`, `tips`, `faq`, `seo`.
   Vše dvojjazyčně přes `tx(uk, cs)`.
4. **`src/components/home/destinations-data.ts`** — přidejte řádek do `DESTINATIONS`
   (`slug`, `name`, `tagline`), jinak destinace chybí na úvodní stránce a ve vyhledávači.
5. **`src/lib/tours/mock-data.ts`** — dokud jedeme na mock datech, přidejte záznam
   do `DESTINATIONS` (klíč = slug): `country`, `style` (`med`/`tropical`/`maldives`
   — řídí i výběr galerie), `base` (cena za osobu, 7 nocí, 4★), `fixedShare`,
   `season`, `peak`, `operators`, `airports`, `nights`, `density`. Bez toho
   vyhledávání pro novou zemi nic nenajde. Volitelně doplňte `PHOTOS.scenery`.
6. **Hotovo automaticky:** sitemap, výpis `/destinations` a detailová stránka se
   generují z pole `destinations` — nic dalšího netřeba.
7. **Kontrola:** `/uk/destinations/thailand`, `/uk/tours?destination=thailand`,
   dlaždice na úvodu, přepnutí do češtiny.

> Po přepnutí na AnChoice bude navíc potřeba namapovat slug na číselník zemí
> AnChoice v adaptéru — viz [ANCHOICE.md](ANCHOICE.md).

## Jak přidat článek na blog

1. **Cover fotka** — `public/img/ananas/blog-<slug>.jpg` a přidejte záznam do
   `ananasPhotos.blog` v `src/content/ananas-photos.ts`
   (např. `"pakovani": local("blog-pakovani")`).
2. **`src/content/blog.ts`** — do pole `posts` přidejte objekt `Post`:
   - `slug` (URL), `date` (ISO), `image: cover("<slug>")`, `tag`, `title`,
     `excerpt`, `readingMinutes`;
   - `related` — slugy destinací, na které článek odkazuje;
   - `telegramMessage` — předvyplněná zpráva pro CTA na konci článku;
   - `seo.title` + `seo.description`;
   - `body` — **zvlášť pro `uk` a zvlášť pro `cs`**, pole bloků:
     `{ type: "p" | "h2" | "h3", text }`, `{ type: "list", items, ordered? }`,
     `{ type: "table", head, rows }`, `{ type: "note", title?, text }`.
     Žádný markdown — jen tyto bloky.
3. Výpis `/blog` i detail `/blog/<slug>` se vygenerují samy.
4. **Kontrola:** oba jazyky, cover fotka, odkazy na destinace, Telegram CTA.

## Jak změnit kontakty a otevírací dobu

| Údaj | Kde |
|---|---|
| Telefon | env `NEXT_PUBLIC_PHONE`; bez ní fallback v `src/config/site.ts` (`contact.phone`) |
| E-mail | env `NEXT_PUBLIC_EMAIL`; fallback `contact.email` v `site.ts` |
| Telegram username (bez `@`) | env `NEXT_PUBLIC_TELEGRAM_USERNAME`; fallback `contact.telegramUsername` |
| Instagram | `site.ts` → `contact.instagram` |
| Otevírací doba | `site.ts` → `contact.hours` (`{ uk, cs }`) |
| Adresa | `site.ts` → `contact.address` (`{ uk, cs }`) — zatím „fungujeme online“ |
| Firemní údaje (název, IČO, sídlo) | `site.ts` → `company.*` |

Env proměnné se nastavují na Vercelu (Project → Settings → Environment Variables).
Pozor: `NEXT_PUBLIC_*` se zapékají při buildu — **po změně redeploy**. Změny
v `site.ts` jsou změny kódu (commit + deploy).

Telegram bot pro poptávky (token, chat id) je zvlášť: [TELEGRAM-SETUP.md](TELEGRAM-SETUP.md).

## Jak vyměnit fotky

Fotky z původního webu leží v `public/img/ananas/` a mapují se v
`src/content/ananas-photos.ts`. Konvence názvů:

| Prefix | Použití |
|---|---|
| `aljona-*` | fotky majitelky (portrét, event) |
| `hero-*` | velké záběry na úvodu |
| `banner-*` | bannery sekcí (hot tours apod.) |
| `dest-<slug>` | hlavní fotka destinace |
| `service-*` | dlaždice služeb |
| `blog-<slug>` | cover článků |

- **Výměna 1:1:** přepište soubor **pod stejným názvem** — v kódu se nemění nic.
- **Nová fotka / jiný název:** přidejte soubor a upravte mapování v `ananas-photos.ts`.
- Stock fotky (Unsplash) používané designem jsou v `src/components/brand/photos.ts`
  — `TODO(client)`: postupně nahradit Aljoninými (zejména hero na úvodu,
  viz `src/components/home/hero.tsx`).
- Galerie destinací (`destinationGallery`) se skládá ze stock poolu podle
  `style` destinace v `src/lib/tours/mock-data.ts`; vlastní záběry lze přidat
  do `PHOTOS.scenery` tamtéž.

Doporučení: JPG, rozumná komprese (< 400 kB), šířka 1600–2000 px pro hero/bannery,
~1200 px pro dlaždice. Next.js `<Image>` si zmenšeniny vyrobí sám.
