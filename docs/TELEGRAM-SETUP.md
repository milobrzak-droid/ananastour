# Telegram — nastavení poptávek z webu

Každý formulář na webu (výběr zájezdu, dotaz na konkrétní termín, služby, kontakt,
zpětné volání) odešle poptávku na `/api/inquiry` a server ji **během pár sekund**
pošle Aljoně do Telegramu přes vlastního bota. Ve zprávě je jméno, klikací telefon,
e-mail, Telegram zákazníka (pokud ho vyplnil), zájezd s odkazem na web, stránka,
ze které formulář přišel, jazyk, čas (Praha) a číslo poptávky ve tvaru `AT-7K3Q`.

Zabere to asi 10 minut. Potřebujete telefon s Telegramem, na kterém je Aljonin účet.

---

## 1. Vytvořte bota přes @BotFather

1. V Telegramu otevřete chat s **[@BotFather](https://t.me/BotFather)** (oficiální, s modrou fajfkou).
2. Pošlete příkaz `/newbot`.
3. Zadejte **jméno bota**, např. `Ananas Tour – poptávky`.
4. Zadejte **uživatelské jméno bota** — musí končit na `bot`, např. `ananastour_inquiry_bot`.
5. BotFather odpoví zprávou s **tokenem**, vypadá zhruba takto:
   `7234567890:AAH9xYz...`
   Token je heslo — nikomu ho neposílejte a nedávejte ho do kódu ani na web.

Volitelně: `/setuserpic` (logo ananasu) a `/setdescription`, ať bot v chatu vypadá důvěryhodně.

## 2. Aljona bota spustí

Bot smí psát jen lidem, kteří s ním sami začali konverzaci.

1. Aljona otevře `https://t.me/<uživatelské_jméno_bota>` (např. `https://t.me/ananastour_inquiry_bot`).
2. Klikne na **Start** (nebo pošle libovolnou zprávu, např. „ahoj“).

> Chcete poptávky do skupiny (Aljona + kolegyně)? Vytvořte skupinu, přidejte do ní bota
> a pošlete do skupiny jakoukoli zprávu. Dál postupujte stejně — chat id skupiny začíná mínusem (`-100…`).

## 3. Zjistěte chat id

1. V prohlížeči otevřete (místo `<TOKEN>` vložte token z kroku 1):
   `https://api.telegram.org/bot<TOKEN>/getUpdates`
2. Najděte v odpovědi část `"chat":{"id":123456789,...}` — číslo za `"id"` je **chat id**.
3. Pokud je odpověď prázdná (`"result":[]`), pošlete botovi ještě jednu zprávu a stránku obnovte.

## 4. Nastavte proměnné prostředí

Na hostingu (např. Vercel → Project → Settings → Environment Variables) nebo lokálně v `.env.local`:

```env
TELEGRAM_BOT_TOKEN=7234567890:AAH9xYz...
TELEGRAM_CHAT_ID=123456789
```

Po změně proměnných je potřeba web znovu nasadit (redeploy).

Chování bez nastavení:
- **lokální vývoj** — poptávka se jen vypíše do konzole serveru a formulář ukáže úspěch;
- **produkce** — formulář ukáže chybu a nabídne zákazníkovi napsat přímo do Telegramu (HTTP 503).
  Na produkci proto proměnné vždy nastavte.

## 5. Otestujte

1. Otevřete web, vyplňte libovolný formulář (např. na stránce Kontakt) a odešlete.
2. Do pár sekund musí Aljoně přijít zpráva od bota začínající `🍍 Нова заявка AT-…`.
3. Klikněte v ní na telefon (má se nabídnout hovor) a na odkaz zájezdu.
4. Zkuste i formulář u konkrétního termínu — ve zprávě musí být odkaz „відкрити“ na nabídku.

Když zpráva nepřijde: zkontrolujte logy serveru (`[inquiry AT-…] Telegram send failed: …`).
Nejčastější příčiny: překlep v tokenu, špatné chat id, Aljona nestiskla Start, bot byl ze skupiny odebrán.
Poptávka v takovém případě zůstane v logu serveru, takže se neztratí.

Ochrana proti spamu: skryté pole pro roboty + max. 5 poptávek z jedné IP adresy za 10 minut.

---

## Veřejné uživatelské jméno na webu

Všechna tlačítka „Napsat na Telegram“ vedou na Aljonin **osobní** účet (ne na bota).
Uživatelské jméno se nastavuje proměnnou (bez `@`):

```env
NEXT_PUBLIC_TELEGRAM_USERNAME=Ananas_tours
```

Změnu je nutné nasadit znovu (proměnné `NEXT_PUBLIC_…` se vkládají při buildu).
Pokud proměnná chybí, použije se výchozí hodnota ze `src/config/site.ts`.

## Předvyplněná zpráva (`?text=`)

Tlačítka otevírají odkaz `https://t.me/<username>?text=…`, takže zákazník má v okně
chatu rovnou připravenou zprávu s kontextem (zájezd, termín, cena, číslo poptávky)
a stačí ji odeslat. Po odeslání formuláře nabízí web tlačítko „Napsat na Telegram hned teď“
s číslem poptávky, aby Aljona hned spárovala chat s poptávkou.

Chování `?text=` se liší podle aplikace, proto před spuštěním **otestujte na**:
- **iPhone** (Safari i Chrome, s nainstalovanou aplikací Telegram),
- **Androidu** (Chrome, s aplikací Telegram),
- **počítači** (Telegram Desktop i web.telegram.org, prohlížeč bez aplikace).

Ověřte, že se otevře správný chat a text je předvyplněný (ne odeslaný automaticky).
Pokud se na některém zařízení text nevyplní, odkaz pořád otevře správný chat — jen
zákazník napíše zprávu sám.
