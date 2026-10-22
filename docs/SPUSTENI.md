# Checklist před spuštěním

Co musí být hotové, než web pustíme na ostrou doménu. Aktuální stav všech
chybějících údajů v kódu najdete příkazem:

```bash
grep -rn "TODO(client)" src
```

## 1. Firemní a právní náležitosti

- [ ] **Vyplnit firemní údaje** v `src/config/site.ts` → `company.*`:
      název s.r.o., **IČO**, sídlo (vyžaduje zákon č. 159/1999 Sb.).
      Tamtéž `contact.address` — zatím „fungujeme online“.
- [ ] **Živnost** — ověřit, že klientka má živnost
      „provozování cestovní agentury a průvodcovská činnost v oblasti cestovního
      ruchu“ (volná živnost); číslo/evidenci doplnit do obchodních podmínek.
      Volitelné: členství v ACK ČR (důvěryhodnost).
- [ ] **Právník zkontroluje `/privacy` a `/terms`** (oba dokumenty jsou drafty).
      Otevřené body z `TODO(client)` v kódu:
      - `terms/page.tsx`: celková revize právníkem; firemní údaje + údaje o živnosti;
        **platební tok** (platí zákazník přímo CK, nebo přes agenturu?);
        zda kombinace samostatných služeb (letenka + hotel) nezakládá
        „spojené cestovní služby“ (§ 2527 OZ) s povinným pojištěním úpadku;
        zda zprostředkování cestovního pojištění nevyžaduje **registraci u ČNB**
        (doplňkový pojišťovací zprostředkovatel); datum účinnosti.
      - `privacy/page.tsx`: celková revize právníkem; firemní údaje;
        skutečný seznam zpracovatelů (hosting, analytika, účetní, CRM);
        zda je potřeba pověřenec (DPO) — u malé agentury obvykle ne;
        datum účinnosti.

## 2. Telegram (hlavní kanál)

- [ ] **Zřídit bota a nastavit produkční env** `TELEGRAM_BOT_TOKEN` +
      `TELEGRAM_CHAT_ID` — krok za krokem v [TELEGRAM-SETUP.md](TELEGRAM-SETUP.md).
      Bez nich formuláře na produkci vrací chybu (503).
- [ ] **Poptávka end-to-end s ostrým botem**: vyplnit formulář na webu
      (kontakt, konkrétní termín, objednávka) → Aljoně dorazí zpráva
      `🍍 Нова заявка AT-…` s klikacím telefonem a odkazem na zájezd.
- [ ] **Ověřit předvyplnění `t.me/...?text=`** na všech platformách
      (chování se liší): **iPhone** (Safari i Chrome s aplikací),
      **Android** (Chrome s aplikací), **počítač** (Telegram Desktop,
      web.telegram.org, prohlížeč bez aplikace). Detaily v TELEGRAM-SETUP.md.

## 3. Doména a nasazení

- [ ] **Zaregistrovat `ananastour.cz`** — k 22. 10. 2026 je volná (neregistrovaná).
- [ ] **Založit schránku `hello@ananastour.cz`** (MX záznamy) a ověřit doručení.
      Web ji už uvádí jako kontaktní e-mail (`src/config/site.ts`) — dokud
      neexistuje, e-maily se vracejí.
- [ ] Připojit ostrou doménu na Vercelu a nastavit
      **`NEXT_PUBLIC_SITE_URL`** na ni (sitemap, metadata, odkazy v Telegram
      zprávách) + **redeploy** (NEXT_PUBLIC_* se zapékají při buildu).
- [ ] Zkontrolovat `robots.txt` a `sitemap.xml` na ostré doméně.
- [ ] **Analytika**: `src/lib/analytics.ts` posílá události
      (`contact_click` s kanálem a umístěním…) do `dataLayer`. GTM snippet
      **už je v layoutu zapojený** — načte se jen, když je nastavená env
      proměnná **`NEXT_PUBLIC_GTM_ID`** (+ redeploy, zapéká se při buildu).
      Zbývá: založit GTM kontejner (příp. GA4), nastavit `NEXT_PUBLIC_GTM_ID`
      a doplnit GTM/GA4 do seznamu zpracovatelů v `/privacy`
      (+ případná cookie lišta dle doporučení právníka).

## 4. Obsah a fotky

- [ ] **Jazyky**: proklikat web v `uk` i `cs`, přepínač jazyků, návrat na web
      (cookie si volbu pamatuje), URL bez prefixu přesměrovává správně.
- [ ] **Licence fotek z původního webu**: fotky v `public/img/ananas/` jsme
      převzali z ananastour.com. Některé vypadají jako stock — zejména
      `service-visa`, `blog-visas`, `blog-tax-free`, `service-insurance`,
      `blog-insurance`. Ověřit s klientkou, že k nim má licenci; jinak nahradit
      (vlastní fotky, nebo stock s licencí).
- [ ] **Stock fotky designu** (Unsplash, `src/components/brand/photos.ts`):
      pokud klientka chce, nahradit vlastními — hlavně hero na úvodu
      (`src/components/home/hero.tsx`, TODO: Aljonina vlastní fotka).
- [ ] Ocenění na stránce O nás: potvrdit roky a dodat loga/certifikáty
      (`src/app/[locale]/about/page.tsx`).

## 5. Ověření obsahu klientkou — souhrn `TODO(client)`

Stav k 2026-10-22: **65 značek** `TODO(client)` v `src/` (+ 2 vysvětlující
poznámky v hlavičkách souborů). Po zapracování značku smažte; seznam
aktualizujete grepem výše.

| Soubor | Počet | Co je potřeba |
|---|---|---|
| `src/content/destinations.ts` | 35 | ověřit délky letů, sezónní letiště odletů, vstupní/vízová pravidla (zvl. pro držitele dočasné ochrany / pobytu v ČR), poplatky (Bali levy, TGST, emirátní taxy), měny (euro v Bulharsku od 1/2026), očkování Zanzibar, řidičáky Itálie |
| `src/content/blog.ts` | 12 | ověřit nárok na tax free pro držitele dočasné ochrany, odkaz na aktuální limity Celní správy, EHIC pro dočasnou ochranu, schengenská pravidla cestování + důsledky pro status dočasné ochrany (každý bod je 2× — uk a cs verze textu) |
| `src/app/[locale]/terms/page.tsx` | 6 | revize právníkem, firemní údaje + živnost, platební tok, § 2527 OZ, registrace ČNB, datum účinnosti (viz sekce 1) |
| `src/app/[locale]/privacy/page.tsx` | 5 | revize právníkem, firemní údaje, zpracovatelé, DPO, datum účinnosti (viz sekce 1) |
| `src/config/site.ts` | 2 | adresa kanceláře (zatím online), firemní údaje (`company.*`) |
| `src/app/[locale]/about/page.tsx` | 1 | potvrdit roky ocenění, dodat loga/certifikáty |
| `src/components/seo/json-ld.tsx` | 1 | ulice + PSČ do strukturovaných dat, až bude adresa |
| `src/components/home/hero.tsx` | 1 | nahradit hero fotku Aljoninou vlastní |
| `src/components/brand/photos.ts` | 1 | nahradit stock fotky Aljoninými |
| `src/i18n/config.ts` | 1 | potvrdit výchozí jazyk (nyní ukrajinština) |

## 6. Finální kontrola

- [ ] `npm run build` prochází bez chyb, `npm run lint` čistý.
- [ ] Poptávkový formulář a objednávka end-to-end na **produkci** s ostrým botem.
- [ ] Mobil: plovoucí Telegram tlačítko, kontaktní lišta, formuláře.
- [ ] 404 stránka, `/privacy` a `/terms` dostupné z patičky v obou jazycích.

> Napojení na AnChoice (ostrá data zájezdů) má vlastní runbook:
> [ANCHOICE.md](ANCHOICE.md). Web lze spustit i na mock datech, ale pak
> zájezdy neodpovídají realitě — o pořadí spuštění rozhodněte s klientkou.

## Závislosti a bezpečnost (stav 22. 10. 2026)

- Next.js **15.5.28** / React **19.1.10** — obsahuje opravu CVE-2025-66478
  (Vercel starší 15.5.x odmítá nasadit).
- `npm audit --omit=dev`: zbývá **PostCSS ≤ 8.5.22 uvnitř `next`** (čtení
  zdrojových map při buildu). Týká se jen sestavení našeho vlastního CSS,
  zvenku nezneužitelné. Oprava = upgrade na Next 16 → naplánovat po spuštění
  (`npm audit fix --force` NEspouštět naslepo, je to breaking change).
- Kritické nálezy `npm audit` (bez `--omit=dev`) jsou jen ve vývojových
  nástrojích a do webu se nedostanou.
