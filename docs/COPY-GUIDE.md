# COPY GUIDE: Ananas Tour

Závazný průvodce texty webu v obou jazycích (`uk` a `cs`). Vznikl syntézou čtyř strategických návrhů: konverze, publikum, kreativa a hlas značky. Platí pro každý řetězec `{ uk, cs }`, `src/i18n/dictionary.ts`, `src/content/*`, metadata i předvyplněné zprávy do Telegramu.

**Pořadí priorit při konfliktu**
1. Fakta (ground truth níže).
2. Pravidlo klientky: „z Česka“, ne „z Prahy“.
3. Tento guide.
4. Cokoli jiného.

Kreativa nikdy nepřebije fakta.

**Ground truth (nic jiného netvrdíme)**
- Aljona (Альона) vede agenturu osobně. V cestovním ruchu je od roku 2011 a osobně navštívila 22 zemí.
- Pravidelně jezdí na inspekční cesty.
- Účastnice ocenění Starway (Coral Travel) a opakovaně mezi TOP prodejními agenturami Join UP!. Obojí na Ukrajině.
- Prodává zájezdy českých CK. Každá CK je ze zákona č. 159/1999 Sb. pojištěná proti úpadku.
- Odlety: Praha, Brno, Ostrava, Pardubice. Do Bulharska a Itálie i autobusem.
- Ceny v Kč. Na webu se nic neplatí: rezervace je žádost a Aljona ji potvrdí u CK.
- Telegram @Ananas_tours: v době 9:00–21:00 obvykle odpoví do 15 minut, mimo ni ráno. Telefon +420 723 615 028. Mluví ukrajinsky a česky.
- Služby: zájezdy, last minute, hotely, letenky, transfery, cestovní pojištění, víza, výlety a výběr 3 hotelů na míru.
- 12 zemí: Turecko, Egypt, Řecko, Bulharsko, SAE, Maledivy, Vietnam, Španělsko, Dominikána, Itálie, Indonésie (Bali), Tanzanie–Zanzibar.

---

## Rychlá karta: 12 pravidel, která musí sedět u každého řetězce

1. **Z Česka, nikdy z Prahy.** V nadpisech, hero, title, meta a razítkách píšeme uk «з Чехії» / cs „z Česka“. Letiště jsou jen faktický detail.
2. **Pravda nad efektem.** Žádná čísla, slevy, ceny, recenze, záruky ani „24/7“, které nejsou v ground truth.
3. **15 minut je doba odpovědi, ne doba výběru.** Vždy se slovem «зазвичай» / „obvykle“ a s časem 9:00–21:00 poblíž.
4. **Mluví Aljona.** Její činy píšeme v první osobě («я»/„já“). Systém a tlačítka ji jmenují ve třetí osobě. Žádný „tým“ ani „manažer“ (viz §3).
5. **Každý blok = přínos + důkaz + další krok do Telegramu.** Každý chybový i prázdný stav končí cestou do Telegramu.
6. **Vykáme s malým písmenem:** uk «ви», cs „vy“.
7. **Jeden vtip na obrazovku.** Slovní hříčka A·NA·NÁS nejvýš jednou na obrazovku. O penězích, právu, dokladech a dětech se nevtipkuje (§0.5).
8. **Jedno tlačítko = jeden kanonický popisek** z tabulky v §5.
9. **Pojmy jen z glosáře** (§6).
10. **Délky podle §8.** Unbounded je extrémně široký, takže se počítají znaky ve slově, ne jen v řádku.
11. **Čeština je transkreace, ne překlad.** Může říct totéž jinými slovy, kratší a sušší. Nikdy ji nedoplňujeme jen proto, aby délkou odpovídala ukrajinštině.
12. **Žádné fráze ze seznamu zakázaných** (§10).

---

## 0. Velká myšlenka: A·NA·NÁS

### 0.1 Koncept

**Jméno značky je její slib.**
- Vysloveno nahlas, ukrajinské «ананас» zní přesně jako «а на нас» („a je to na nás“).
- Česky „ananas“ zní skoro jako „a na nás“.

Nejde o přeložený vtip. Slovní hříčka existuje v každém jazyce zvlášť a nikdo jiný ji nemůže použít, protože je to doslova naše jméno.

Myšlenka vyjadřuje hodnotu agentury jako dělbu práce. Vy si vyberete moře. Všechno ostatní je na nás:
- porovnat nabídky CK,
- prověřit hotel,
- pohlídat doklady,
- potvrdit cenu u CK dřív, než cokoli zaplatíte.

Navazuje na povinné hero „ВАШЕ МОРЕ З ЧЕХІЇ“ a nekonkuruje mu.

**Tagline**

| | uk | cs |
|---|---|---|
| Tagline (kanonický zápis) | «Вам — море, а на нас — решта.» | „Vám moře – a na nás zbytek.“ |
| Display varianta (razítko, plakát) | ВАМ — МОРЕ. А·НА·НАС — РЕШТА. | VÁM MOŘE. A·NA·NÁS ZBYTEK. |

### 0.2 Anatomie ananasu: důkazový systém pod taglinem

Ananas má tři chutě a každá něco slibuje:

| Chuť | Co znamená | uk | cs |
|---|---|---|---|
| sladká | dovolená, moře, čas pro sebe | Солодке — вам. | Sladké vám. |
| pichlavá | srovnávání CK, smlouva, doklady, transfer, pojištění | Колюче — нам. | Pichlavé nám. |
| kyselá | nepříjemná překvapení: skryté poplatky, fotka ≠ realita, ztracené peníze | Кисле — нікому. | Kyselé nikomu. |

**Manifest:** uk «Солодке — вам. Колюче — нам. Кисле — нікому.» / cs „Sladké vám. Pichlavé nám. Kyselé nikomu.“

Manifest říká totéž co tagline, ale o úroveň konkrétněji. Patří na stránku služeb (H1 tvoří první dva takty), do patičky a do příběhu na stránce O mně.

### 0.3 Hierarchie podpisových linek (nic dalšího nevymýšlet)

| Úroveň | Linka uk | Linka cs | Kde |
|---|---|---|---|
| 1. Pozice (povinná) | ВАШЕ МОРЕ / З ЧЕХІЇ | VAŠE MOŘE / Z ČESKA | hero H1, OG, meta úvodu |
| 2. Tagline (big idea) | Вам — море, а на нас — решта. | Vám moře – a na nás zbytek. | hero lead, sdílení, sociální sítě |
| 3. Manifest | Солодке — вам. Колюче — нам. Кисле — нікому. | Sladké vám. Pichlavé nám. Kyselé nikomu. | služby, patička, O mně |
| 4. Důkazní linky | Три готелі. Не сотні. · Каталог мовчить. Я — ні. · Це закон, а не моя обіцянка. | Tři hotely. Ne stovky. · Katalog mlčí. Já ne. · To není můj slib, to je zákon. | výběr hotelů, O mně, pojištění CK |
| 5. Šarm a humor | Пізно? Морю байдуже. · У Чехії немає моря. Зате є Альона. | Pozdě? Moři je to jedno. · Česko nemá moře. Má Aljonu. | mimo pracovní dobu, 404, sociální sítě |

**Rozhodnutí:** linky „Солодкий відпочинок без кислих сюрпризів“, „Чеська надійність. Український сервіс.“ a „Море без нервів“ **nejsou slogany**.
- „Bez kyselých překvapení“ / «без кислих сюрпризів» žije dál jako obrat v textu, například vedle faktů o pojištění.
- „Česká jistota / Український сервіс“ zní jako banka a v češtině by stejně musela znít jinak. Její obsah nesou klíčová sdělení.
- „Moře bez nervů“ je generické a staví na negativu.

### 0.4 Pravidla slovní hříčky A·NA·NÁS

- **Nejvýš jednou na obrazovku.**
- **Hned za ní konkrétní důkaz**, co přesně je „na nás“ (CK, hotel, doklady, potvrzení ceny). Bez důkazu je to prázdná fráze.
- **Vysvětlujeme ji jen jednou**, v úvodní sekci (route tagline): uk `— бо «ананас» звучить як «а на нас».` / cs `— protože „ananas“ zní jako „a na nás“.` (viz §7.2). Jinde ji nevysvětlujeme.
- **Zápis:** v display sazbě «А·НА·НАС» / „A·NA·NÁS“ (střední tečky). V běžném textu prosté «а на нас» / „a na nás“.
- **Povolená místa:**
  - hero lead,
  - intro (vysvětlení),
  - H2 sekce Proč my («А ЩО НА НАС?» / „A CO JE NA NÁS?“) na úvodu i na stránce O mně,
  - sdílecí texty.
- **„Нас/nás“ v hříčce je hlas značky.** Neruší pravidlo první osoby (§3.1): hned následující věta s důkazem už je v «я»/„já“.

### 0.5 Ananasové slovní hry: co funguje v kterém jazyce

| Motiv | uk | cs | Kde |
|---|---|---|---|
| Hříčka | Вам — море, а на нас — решта. | Vám moře – a na nás zbytek. | viz 0.4 |
| Loupání = načítání | Чистимо ананас… | Loupeme ananas… | loading, spinner |
| Pečeť kvality | ПЕРЕВІРЕНО АНАНАСОМ | PROVĚŘENO ANANASEM | pouze razítko v hero |
| Nic tu neroste = prázdný stav | Тут ананаси не ростуть | Tady ananas neroste | prázdné vyhledávání |
| Pichlavá = přísná | Я колюча до готелів — щоб вам було солодко. | Na hotely jsem pichlavá – abyste to vy měli sladké. | O mně |
| Kyselé = překvapení | без кислих сюрпризів | bez kyselých překvapení | body vedle faktů o penězích |
| Česko nemá moře | У Чехії немає моря. Зате є Альона. | Česko nemá moře. Má Aljonu. | 404, kontakt, sociální sítě |
| Jen česky | – | Peníze v suchu (= v bezpečí; zároveň mořská narážka) | dlaždice Proč my |
| Jen ukrajinsky | Гроші — під захистом, ви — під пальмою. | – | sdělení o penězích |

**Nikdy:** «соковиті ціни», «ананасові знижки», „ananasové ceny“, „šťavnaté slevy“ ani žádná slovní hra na cenu. Je to laciné a navíc je to zóna bez vtipů.

### 0.6 Tón humoru a kde nevtipkujeme

**Humor:**
- všední a rozpoznatelný (kufr za jeden večer, taxi-loterie ve dvě ráno, plavky);
- sebeironický (Česko nemá moře);
- suchý, hlavně v češtině.

Vtip je vždy krátký a jde **první, pokyn druhý**: «Тут ананаси не ростуть.» + co dělat.

**Zóna bez vtipů** (vtipkujeme *vedle*, ne *o tom*):
- ceny, slevy, změny ceny, platba, záloha, doplatek, storno, vrácení peněz;
- právo: pojištění CK, smlouva o zájezdu, GDPR, obchodní podmínky;
- doklady, víza, pobytový status, hranice, návrat do Česka;
- zdraví a cestovní pojištění, bezpečnost dětí;
- chyba nebo vyprodání **u rezervace** (klidně, prakticky, empaticky);
- válka, uprchlictví, ztráta domova: nikdy, ani v blízkosti.

---

## 1. Positioning statement

**uk:**
> Ananas Tour — турагенція з Чехії, яку веде Альона: вона підбирає тури чеських туроператорів, застрахованих від банкрутства, пояснює все українською чи чеською і в Telegram зазвичай відповідає за 15 хвилин. Вам — море, а на нас — решта: порівняння пропозицій, перевірка готелю й документів і підтвердження в туроператора ще до будь-якої оплати.

**cs:**
> Ananas Tour je cestovní agentura z Česka, kterou vede Aljona: vybírá zájezdy českých CK pojištěných proti úpadku, všechno vysvětlí česky i ukrajinsky a na Telegramu obvykle odpoví do 15 minut. Vám moře – a na nás zbytek: porovnání nabídek, prověření hotelu i dokladů a potvrzení u CK dřív, než cokoli zaplatíte.

**Proti komu se vymezujeme:**
- Velké CK a srovnávače nabízejí stovky nabídek, drobné písmo a call centrum.
- My nabízíme jednoho člověka, který hotel viděl, odpoví vaším jazykem a pošle 3 hotely místo 300 záložek.
- Nikdy netvrdíme, že jsme levnější.

**Co nejsme:**
- slevový portál;
- anonymní „tým“;
- pražská městská cestovka;
- CK. Právně jsme cestovní agentura, nikdy „cestovní kancelář“.
- web „jen pro Ukrajince“. Česká verze je osobní agentura, která mluví česky i ukrajinsky.

---

## 2. Publikum a insighty

**Primární čtenář** (pracovní hypotéza, ne statistika): Ukrajinka žijící kdekoli v Česku. Často plánuje dovolenou pro děti nebo rodiče, vydělává v Kč a večer po práci prochází web na mobilu. Doma kupovala zájezdy přes „svou“ agentku na Viberu či Telegramu.

**Sekundární čtenáři:**
- čeští partneři ve smíšených rodinách, kolegové a Češi, kteří chtějí člověka místo portálu;
- CK a úřady, které ověřují, zda jsme legitimní.

| # | Insight | Důsledek pro text |
|---|---|---|
| 1 | Moře je ta snadná část. Stres je všechno kolem: česká smlouva, doklady, strach o peníze, žádný volný večer na 20 webů CK. | Prodáváme klid přes jednoho člověka, ne „luxus“. |
| 2 | Tichý strach č. 1 jsou doklady: pustí mě ven, a hlavně zpátky? | «Перевірю до бронювання» / „ověřím před rezervací“. Slibujeme kontrolu, nikdy výsledek. |
| 3 | Strach č. 2 jsou peníze: podvody na Telegramu, zkrachovalí operátoři doma. | Zákon 159/1999 Sb. + „na webu nic neplatíte“ u každé ceny a každého tlačítka rezervace. |
| 4 | Časová chudoba a přemíra výběru. | «Три готелі. Не сотні.» |
| 5 | Důvěra je osobní («своя людина») a doporučení se šíří v městských Telegram skupinách. | Jméno a tvář Aljony v CTA, první osoba, krátké předvyplněné zprávy, které jde přeposlat. |
| 6 | Píšou večer, mimo 9–21. | Poctivá očekávání a mezera přetavená v šarm («Пізно? Морю байдуже.»). |
| 7 | Češi nemají Telegram, alergii mají na patos a kalky. | V cs vždy i telefon a formulář. Suchý humor, fakta, žádné „nezapomenutelné“. |
| 8 | Většina neví kam ani kdy. | «Не знаєте, куди? Ідеальний момент написати.» Výchozí hodnota hledání je «Куди завгодно» / „Kamkoli“. |
| 9 | Děti chodí do českých škol, takže rodiny plánují podle prázdnin. | Sezónní háčky: «осінні канікули» / „podzimní prázdniny“ bez vymyšlených cen. |
| 10 | Lidé žijí po celé zemi (Plzeň, Olomouc, Zlín…). | „Z Prahy“ by tiše říkalo „ne pro vás“. „Z Česka“ zahrnuje všechny. |

---

## 3. Hlas a tón

### 3.1 Kdo mluví (oba jazyky)

| Osoba | Kdy | uk | cs |
|---|---|---|---|
| **Já: Aljona** | Každý slib nebo čin, který dělá ona: leady, body sekcí, Proč my, O mně, kontakt, odpovědi FAQ, plovoucí widget, nápovědy formulářů | підберу, перевірю, поясню, відповім, надішлю, раджу | vyberu, ověřím, vysvětlím, ozvu se, pošlu, doporučuju |
| **Aljona (3. osoba)** | Tlačítka, kontaktní lišta, systémové a úspěšné stavy, meta, alt texty, popisky statistik. Návštěvník ještě neví, kdo je „já“, a jméno samo buduje důvěru. | Написати Альоні · Запит уже в Альони | Napsat Aljoně · Aljona má vaši poptávku |
| **My: značka nebo stroj** | (a) hříčka «а на нас»; (b) právní fakta v patičce; (c) mašinérie webu (loading, prázdný stav); (d) inkluzivní „vy a já“ («Куди летимо?») | Чистимо ананас… · Продаємо тури чеських CK… | Loupeme ananas… · Prodáváme zájezdy českých CK… |

**Pravidla:**
- Jeden blok = jedna osoba. Nikdy nemícháme «я» a «Альона відповість» v jedné větě.
- **Nikdy** nepíšeme «наш менеджер», «наша команда», «наші експерти», „náš tým“, „naši specialisté“. Je to jeden člověk.
- Role: uk «Альона, директорка Ananas Tour» / cs „Aljona, která vede Ananas Tour“. Nepíšeme „zakladatelka“ (neověřeno) ani „ředitelka“ (v češtině zní korporátně).

### 3.2 Ukrajinština (`uk`): mateřský hlas

- **Registr:** moderní spisovná ukrajinština tak, jak píše přátelská profesionálka klientce v Telegramu. Kamarádka, která je profík.
- **Rytmus:**
  - věty o 6–14 slovech;
  - slovesa místo podstatných jmen («підберу», ne «здійснюємо підбір»);
  - dvoutaktní linky s pomlčkou nebo tečkou: «Три готелі. Не сотні.»
- **Konkrétnost místo přívlastků:** пологий вхід у море, басейн із гіркою, тінь біля басейну, таксі о другій ночі, чи заслужені зірки.
- **Most do české reality:** pojmy, se kterými publikum žije, jednou vysvětlíme: CK (чеський туроператор), záloha (завдаток), storno, first minute (раннє бронювання). Je to signál „žiju tady taky“.
- **Feminitivy** důsledně: учасниця, директорка, експертка.
- **Emoce** vznikají z obrazů, ne z «незабутній». Holiday rámujeme jako čas pro sebe a své lidi: «Тиждень, коли нікуди не треба поспішати.»
- **Interpunkce:** max. 2× „!“ na stránku, nikdy v nadpisu. Žádné emoji v textech.
- **Vzorové linky:**
  - «Напишіть, куди хочеться. Я надішлю три готелі, у яких вам буде добре.»
  - «Договір чеською? Поясню кожен пункт українською.»
  - «Скажу не лише, скільки в готелю зірок, а й чи заслужені вони.»
  - «Написали о 23:00? Відповім зранку — з кавою і варіантами.»

### 3.3 Čeština (`cs`): transkreace

- **Registr:** spisovně, ale živě. Aljona v první osobě používá hovorově přijatelné tvary na -u: doporučuju, kontroluju, píšu, žiju, hlídám. Fakta ve FAQ a právní texty zůstávají neutrální (doporučuji, kontroluji).
- **Český vkus:**
  - understatement, suchá ironie a sebeironie, fakta napřed;
  - superlativy a patos působí jako laciný e-shop nebo podvod;
  - max. 1× „!“ na stránku, nikdy v nadpisu.
- **Živé idiomy:** na vlastní oči, na rovinu, kam to bude, a jedem, sednout („hotel, který vám sedne“), mít v suchu, jsem na příjmu, vysvětlím lidsky. „Cestovka“ jen v hřejivém hlase; ve faktech „cestovní kancelář (CK)“.
- **Oslovení:** „Dobrý den“ (předvyplněné zprávy), „Těší mě, jsem Aljona“ (představení). **Nikdy „Ahoj“** spolu s vykáním.
- **Rámec:** web není „pro Ukrajince“, ale osobní agentura, která mluví česky i ukrajinsky. Telegram vždy doplníme telefonem: „Napište na Telegram, nebo zavolejte.“
- **Geografie:** vždy „Česko / z Česka / v Česku“. Nikdy „Čechy / z Čech“, které vynechávají Moravu, tedy Brno a Ostravu. „Česká republika“ / „ČR“ jen v drobném písmu.
- **Vzorové linky:**
  - „Napište kam a kdy. Pošlu tři hotely, které vám sednou.“
  - „Smlouva, storno, pojištění – vysvětlím lidsky, bez drobného písma.“
  - „Řeknu vám nejen, kolik má hotel hvězd, ale i jestli si je zaslouží.“
  - „Napíšete ve 23:00? Ozvu se ráno.“

### 3.4 Emoční hranice (oba jazyky)

- **Teplo a sounáležitost ano:** uk «Я теж живу в Чехії — і знаю, як хочеться до моря.» / cs „Taky žiju v Česku – a vím, jak moc se odsud chce k moři.“
- **Patos o válce nikdy.** Zakázané:
  - «після всього пережитого», «попри війну», «ви заслужили після…», «біженці» / „uprchlíci“;
  - ztráta Černého moře jako háček.
- **Konotace vysídlení nepoužíváme:**
  - «сидіти/жити на валізах»;
  - rozkazovací «пакуйте/збирайте валізи». Neutrální «зібрати валізу за вечір» je v pořádku.
  - nabité «повернення додому» nahrazujeme «повернення з відпустки / з моря».
- Píšeme «українською», ne «рідною мовою».
- **Pobytový status** («тимчасовий захист», «дозвіл на проживання») patří jen do praktických odpovědí FAQ a do faktů destinace. Nikdy do nadpisu ani marketingové věty.

### 3.5 Typografie

| | uk | cs |
|---|---|---|
| Uvozovky | «…» (vnořené „…“) | „…“ (vnořené ‚…‘) |
| Pomlčka v textu | « — » (em dash s mezerami) | « – » (en dash s mezerami) |
| Apostrof | ’ (U+2019): зв’язок, ім’я, п’ять | – |
| Nezlomitelná mezera (NBSP) | po з, в, у, і, й, а, о: «з Чехії» | po z, v, k, s, o, u, a, i: „z Česka“ |
| Cena | 12 990 Kč (NBSP mezi číslem a Kč) | 12 990 Kč |
| Čas | 9:00–21:00 · «15 хв» | 9:00–21:00 nebo 9–21 h · „15 min“ |
| Datum | 12.06.2027 nebo 12 червня | 12. 6. 2027 nebo 12. června |
| Čísla | vždy číslicemi (3, 12, 15, 22, 2011); v display dvoutaktu smí být slovem (ТРИ ГОТЕЛІ) | totéž |
| Oslovení | ви, вас, ваш malými | vy, vás, váš malými |

---

## 4. Klíčová sdělení (seřazená)

| # | uk | cs | Proč / kde |
|---|---|---|---|
| 1 | Ваше море з Чехії. Вам — море, а на нас — решта. | Vaše moře z Česka. Vám moře – a na nás zbytek. | Pozice + big idea. Hero, OG, sociální sítě. |
| 2 | Ви пишете Альоні, а не в колл-центр. Одна людина — від першого повідомлення до повернення з відпустки. | Píšete Aljoně, ne call centru. Jeden člověk od první zprávy až po návrat z dovolené. | Hlavní rozdíl proti portálům. Proč my, O mně, patička. |
| 3 | Три готелі. Не сотні. Напишіть, куди й коли, — я надішлю три, які сама б обрала на вашому місці. | Tři hotely. Ne stovky. Napište kam a kdy – pošlu tři, které bych na vašem místě vybrala sama. | Kurátorství místo přemíry výběru. Výběr hotelů, plovoucí widget. |
| 4 | Кожен чеський туроператор за законом застрахований від банкрутства. Це закон, а не моя обіцянка. | Každá česká CK musí být ze zákona pojištěná proti úpadku. To není můj slib, to je zákon. | Strach č. 2 a ověřitelný fakt. Nikdy jako by ručil Ananas Tour. |
| 5 | На сайті ви нічого не платите. Спершу я перевірю ціну й місця в туроператора. | Na webu nic neplatíte. Cenu a volná místa nejdřív ověřím u CK. | Odstraňuje riziko rezervace. U každé ceny a každého tlačítka „Хочу цей тур“. |
| 6 | Документи й умови в’їзду перевірю ще до бронювання — щоб ви спокійно полетіли й спокійно повернулися. | Doklady a podmínky vstupu ověřím ještě před rezervací. | Strach č. 1. FAQ, destinace, služby/víza. |
| 7 | Договір чеською — пояснення українською. | Smlouva, storno, pojištění – vysvětlím lidsky. | Jazyková bariéra (uk) a strach z drobného písma (cs). Stejný slib, jiná slova. |
| 8 | З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин. Пізно ввечері? Відповім зранку. | Od 9 do 21 h odpovídám obvykle do 15 minut. Pozdě večer? Ozvu se ráno. | Poctivá rychlost místo falešného 24/7. |
| 9 | З 2011 року в туризмі, 22 країни на власні очі. Готелі знаю не з каталогу, а де не була — так і скажу. | V cestovním ruchu od roku 2011, 22 zemí na vlastní oči. Hotely neznám jen z katalogu, a kde jsem nebyla, to řeknu taky. | Expertíza + radikální upřímnost. |
| 10 | Ціни в кронах. Виліт із чотирьох аеропортів Чехії, до Болгарії та Італії — й автобусом. | Ceny v korunách. Odlety ze čtyř letišť v Česku, do Bulharska a Itálie i autobusem. | Lokální fakta. Letiště jen jako fakt. |
| 11 | Не знаєте, куди? Ідеальний момент написати. | Nevíte kam? Ideální chvíle napsat. | Zachytí nerozhodnuté, než odejdou na portál. |
| 12 | Учасниця премії Starway від Coral Travel і неодноразово в ТОП-агенціях Join UP! — ще в Україні. | Účast v ocenění Starway (Coral Travel) a opakovaně mezi TOP agenturami Join UP! – ještě na Ukrajině. | Uznání oboru přesně podle faktů: „účast“, ne „vítězství“. |

---

## 5. CTA: kanonické popisky

**Pravidla**
- Jedna akce = jeden popisek na celém webu.
- Začíná slovesem nebo «Хочу» / „Chci“.
- Bez koncové interpunkce a bez „!“.
- Délky viz §8.
- Telegram tlačítko vždy s předvyplněnou zprávou s kontextem (§9.6).

| Akce | uk | cs | Poznámka |
|---|---|---|---|
| Hlavní Telegram (hlavička, závěrečné CTA, O mně, plovoucí, chybové stavy, 404) | Написати Альоні | Napsat Aljoně | Univerzální únik do chatu, i z chyb. |
| Hero: obecný výběr přes Telegram | Хочу на море | Chci k moři | Navazuje na „Vaše moře“. Všech 12 zemí má moře. |
| Odeslat vyhledávání / kotva na hledání | Знайти тур | Najít zájezd | |
| Výběr 3 hotelů (Telegram) | Хочу 3 готелі | Chci 3 hotely | Nahrazuje „Отримати 3 готелі в Telegram“. |
| Dotaz na konkrétní věc: zájezd, hotel, FAQ, článek | Запитати Альону | Zeptat se Aljony | Jeden popisek pro všechny dotazové Telegramy. Kontext nese předvyplněná zpráva. |
| Doporučené hotely: proč právě tyhle | Чому саме ці? | Proč zrovna tyhle? | Jediná sankcionovaná výjimka z „Запитати Альону“ (zvědavostní háček). |
| Karta nabídky: otevřít detail | Деталі туру | Detail zájezdu | Nahrazuje „Відкрити / Otevřít“. |
| Detail nabídky: přejít k žádosti | Хочу цей тур | Chci tenhle zájezd | |
| Odeslat žádost o rezervaci | Надіслати запит | Odeslat žádost | Je to žádost, ne nákup. |
| Odeslat poptávkový formulář | Надіслати Альоні | Poslat Aljoně | Kontakt, služby. |
| Formulář „zavolejte mi“ | Передзвоніть мені | Zavolejte mi | Nahrazuje „Отримати підбірку / Získat výběr“. |
| Po odeslání: pokračovat v chatu | Продовжити в Telegram | Pokračovat na Telegramu | |
| Po odeslání: další poptávka | Ще один запит | Další poptávka | |
| Vyprodaný termín | Знайти схожий | Najít podobný | |
| Prázdné hledání: ruční hledání | Пошукайте за мене | Najděte to za mě | |
| Prázdné hledání: reset | Скинути фільтри | Zrušit filtry | |
| Načíst další výsledky | Ще варіанти | Další nabídky | |
| Úvod: všechny last minute | Усі гарячі тури | Všechny last minute | |
| Last minute: Telegram | Хочу гарячий тур | Chci last minute | |
| Last minute: hlídání ceny | Стежити за ціною | Hlídat cenu | Nikdy „Підписатися / Odebírat“: žádný kanál neexistuje. |
| Destinace: Telegram | Хочу {nameTo} → Хочу до Туреччини · Хочу на Мальдіви | Chci {nameTo} → Chci do Turecka · Chci na Maledivy | Používá `nameTo`. cs `nameTo` Dominikány musí být „do Dominikány“ (§6). |
| Destinace: skok na termíny | Ціни та дати | Ceny a termíny | |
| Úvod: všechny destinace | Усі 12 країн | Všech 12 zemí | |
| Služba: pojištění | Підібрати страховку | Vybrat pojištění | Ne „Оформити поліс“ (zní jako okamžitý nákup). |
| Služba: letenky | Знайти рейс | Najít let | |
| Služba: hotely | Обрати готель | Vybrat hotel | |
| Služba: transfer | Замовити трансфер | Objednat transfer | Ne „Замовити авто“. |
| Služba: víza | Запитати про візу | Poradit s vízem | Ne holé „Консультація“. |
| Služba: výlety | Обрати екскурсію | Vybrat výlet | Ne „exkurze“. |
| Telefon | Подзвонити | Zavolat | |
| Kontakt: otevřít chat | Відкрити чат | Otevřít chat | |
| Teaser O mně | Більше про мене | Víc o mně | |
| Blog: číst | Читати далі | Číst dál | Nikdy „Детальніше / Více informací“. |
| Chyba: znovu | Спробувати ще раз | Zkusit znovu | |
| 404: domů | На головну | Zpět na úvod | |

**Mikrolinky pod Telegram CTA** (volitelné, max. jedna pod tlačítkem):

| Účel | uk | cs |
|---|---|---|
| Bez závazku | Повідомлення ні до чого не зобов’язує. | Zpráva vás k ničemu nezavazuje. |
| Předvyplněno | Повідомлення вже написане — лише натисніть «Надіслати». | Zprávu máte předepsanou – stačí ji odeslat. |
| Bez Telegramu | Немає Telegram? Дзвоніть: +420 723 615 028 | Nemáte Telegram? Volejte: +420 723 615 028 |
| Bezpečnost peněz (u ceny) | На сайті нічого не платите · чеські CK застраховані від банкрутства | Na webu nic neplatíte · české CK jsou pojištěné proti úpadku |

---

## 6. Glosář

| Pojem | uk | cs | Vyhnout se |
|---|---|---|---|
| Pozice (geografie) | з Чехії, у Чехії, Чехія | z Česka, v Česku, Česko | «з Праги» / „z Prahy“ jako pozice; cs „Čechy / z Čech“; «Чеська Республіка» / „ČR“ v nadpisech |
| Letiště odletu (jen fakt) | Виліт: Прага · Брно · Острава · Пардубиці | Odlet: Praha · Brno · Ostrava · Pardubice | Letiště v hero, H1, title, meta title, razítku; kódy PRG/BRQ v běžném textu (jen ve filtrech/datech) |
| Autobus | до Болгарії та Італії — й автобусом | do Bulharska a Itálie i autobusem | «автобусний тур» jako pozice |
| Zájezd (produkt) | тур, пакетний тур | zájezd (pobytový zájezd) | uk «путівка» (jen SEO meta), «пакет»; cs „tour“, „túra“ (= pěší výlet), „balíček“, „paket“ |
| Cestovní kancelář | туроператор; při 1. zmínce «чеський туроператор (CK)» | cestovní kancelář (CK), dál jen CK; hřejivě „cestovka“ | uk «турфірма», samotné «оператор»; cs „touroperátor“ |
| My (právně) | турагенція | cestovní agentura | „cestovní kancelář Ananas Tour“ (právně špatně); «туроператор» o nás; «турагентство» (mix) |
| Pojištění CK proti úpadku | страхування туроператора від банкрутства (закон № 159/1999 Sb.) | pojištění CK proti úpadku (zákon č. 159/1999 Sb.) | «гарантія повернення коштів», „garance vrácení peněz“, «100 % захист»; «ліцензовані» / „licencované CK“ (CK má koncesi, ne licenci) |
| Cestovní pojištění | туристична (медична) страховка | cestovní pojištění (léčebné výlohy) | cs „zdravotní pojištění“ (= veřejné zdravotní pojištění, VZP); «медстраховка» v nadpisech |
| Pojištění storna | страхування від невиїзду (storno) | pojištění storna zájezdu | „pojištění nevycestování“ (kalk); «стороно» |
| Last minute | гарячі тури | last minute; hravě „žhavé“ | uk «горящі / горячі тури» (rusismus); cs „horké zájezdy“, „hot tours“ |
| First minute | раннє бронювання (first minute) | first minute | uk «early booking»; cs „brzká rezervace“ |
| Poptávka (formulář) | запит | poptávka | uk míchání «заявка» a «запит»; «звернення», «лід»; cs „objednávka“ (nic se neobjednává), „dotaz“ pro formulář (dotaz = otázka, ve FAQ OK) |
| Žádost o rezervaci (u nabídky) | запит на бронювання | žádost o rezervaci | «купити онлайн», «оплатити», «замовлення оформлено»; „koupit“, „zaplatit“, „objednávka zaplacena“; „nezávazná rezervace“ až po potvrzení klientkou (TODO) |
| Záloha / doplatek | завдаток (záloha) / доплата | záloha / doplatek | «аванс», «предоплата» |
| Smlouva | договір із чеським туроператором | smlouva o zájezdu | «офіційні договори» jako fráze |
| Odlet | виліт, вильоти | odlet, odlety | «вильот» (překlep), «відліт» (mix) |
| Termín | дата вильоту, термін | termín | |
| Noci | 7 ночей | 7 nocí | «7 діб» |
| Strava | все включено (All Inclusive) · ультра все включено (UAI) · сніданки (BB) · напівпансіон (HB) · повний пансіон (FB) · без харчування (RO) | all inclusive · ultra all inclusive · snídaně · polopenze · plná penze · bez stravy | cs „vše v ceně“ jako typ stravy; uk «ол інклюзив»; míchání AI/UAI v nadpisech |
| Hvězdičky | готель 4★, чотиризірковий | hotel 4*, čtyřhvězdičkový | «4-х зірковий» |
| Transfer | трансфер (груповий / індивідуальний) | transfer (skupinový / individuální) | «трансфер авто», cs „odvoz“ |
| Výlety | екскурсії | výlety, fakultativní výlety | cs „exkurze“ (= školní exkurze) |
| Letovisko | курорт | letovisko | cs „resort“ (jen v názvu hotelu) |
| Dočasná ochrana | тимчасовий захист | dočasná ochrana | «статус біженця», «віза толерації», „uprchlík“ |
| Povolení k pobytu | дозвіл на проживання | povolení k pobytu | «ВНЖ», «вид на жительство», «резиденція», «посвідка» (sjednocujeme na «дозвіл») |
| Pobytový doklad (obecně) | документ про перебування в Чехії | doklad o pobytu v Česku | statusová slova v nadpisech |
| Vízum na místě | віза в аеропорту після прильоту | vízum po příletu na letišti | uk «по прильоту» (rusismus) |
| Inspekční cesta | інспекційна поїздка; v textu «їжджу перевіряти готелі» | inspekční cesta | «рекламний тур», «рекламник» (zní jako „reklamní“); «інфотур»; „fam trip“ |
| Výběr 3 hotelů | 3 готелі під ваші побажання | 3 hotely podle vašich přání / na míru | «підбірка» na tlačítku, «підборка» (rusismus); «3 найкращі варіанти за 15 хвилин»; cs „selekce“, „kompilace“ |
| Rychlost odpovědi | зазвичай за 15 хвилин (з 9:00 до 21:00) | obvykle do 15 minut (9–21 h) | «миттєво», «24/7», «цілодобово», „okamžitě“, „nonstop“; «за празьким часом» (jen «за чеським часом», a to jen na kontaktu) |
| Telegram | у Telegram / в Telegram (latinkou, neskloňuje se) | na Telegramu, na Telegram, přes Telegram | uk «в Телеграмі», «телега»; cs „v Telegramu“, „telegramem“; «Telegram-канал» (je to osobní chat) |
| Měna | ceny «12 990 Kč»; v textu «крони, у кронах» | Kč, v korunách | «грн»; ceny jen v EUR; „CZK“ v běžném textu (v meta OK) |
| Dovolená | відпочинок, відпустка | dovolená | «відпуск» (rusismus), «вакації»; cs „dovča“ v nadpisech |
| Prázdniny | канікули (осінні, зимові, весняні, літні) | prázdniny (podzimní, vánoční, jarní, letní) | «вакації» |
| Sleva | знижка, «було — стало» | sleva, zlevněno | «скидка»; jakékoli % nespočítané z živých dat |
| Uznání | визнання; учасниця премії Starway (Coral Travel); неодноразово в ТОП-агенціях Join UP! | uznání; účast v ocenění Starway (Coral Travel); opakovaně mezi TOP agenturami Join UP! na Ukrajině | «переможниця», «нагорода», nadpis «Нагороди»; „vítězka“, nadpis „Ocenění“; «стабільно», „dlouhodobě“ |
| Aljona (pády) | Альона · Альони · Альоні · Альону · Альоно! · з Альоною | Aljona · Aljony · Aljoně · Aljonu · Aljono! · s Aljonou | Алёна, Олена, Alena, Alyona; nesklonné „Napsat Aljona“; «Альона» v cs textu |
| Klient | ви (oslovení), «мої туристи» (o nich) | vy, „moji klienti“ | «шановний клієнте», „vážený zákazníku“; «турист» při oslovení |
| Země: Dominikánská rep. | Домінікана · до Домінікани | Dominikána · do Dominikány | V UI míchat „Dominikánská republika“ a „Dominikána“. **Pro agenta destinací: cs `nameTo` změnit na „do Dominikány“, slug beze změny.** |
| Země: SAE | ОАЕ · до ОАЕ (v textu «Емірати», «Дубай») | SAE · do SAE (v textu „Emiráty“, „Dubaj“) | «Об’єднані Арабські Емірати» v nadpisech |
| Země: Indonésie | Балі (Індонезія) · на Балі | Bali (Indonésie) · na Bali | Display a tlačítka: „Bali“ prodává víc. Slug `indonesia` beze změny. |
| Země: Zanzibar | Занзібар (Танзанія) · на Занзібар | Zanzibar (Tanzanie) · na Zanzibar | |
| Ověřený hotel (štítek) | Альона тут була | Aljona tu byla | Jen s datovým příznakem od klientky (TODO(client)). Nikdy plošně. |

---

## 7. Nadpisy: vzorce a konkrétní návrhy

### 7.1 Vzorce

Každý nadpis je jeden z těchto vzorců. Pod ním **vždy** lead s jedním faktem nebo dalším krokem.

| Vzorec | uk | cs |
|---|---|---|
| F1 Dvoutakt „X. Ne Y.“ | ТРИ ГОТЕЛІ. НЕ СОТНІ. · КАТАЛОГ МОВЧИТЬ. Я — НІ. | TŘI HOTELY. NE STOVKY. · KATALOG MLČÍ. JÁ NE. |
| F2 Otázka, kterou si návštěvník už klade | КУДИ ЛЕТИМО? · ЧЕКАЄТЕ НА ЦІНУ? · А ЩО НА НАС? | KAM TO BUDE? · ČEKÁTE NA CENU? · A CO JE NA NÁS? |
| F3 Přivlastnění + místo / číslo + člověk | ВАШЕ МОРЕ З ЧЕХІЇ · 12 КРАЇН. ОДНА АЛЬОНА. | VAŠE MOŘE Z ČESKA · 12 ZEMÍ. JEDNA ALJONA. |
| F4 Anatomie ananasu | СОЛОДКЕ — ВАМ. КОЛЮЧЕ — НАМ. | SLADKÉ VÁM. PICHLAVÉ NÁM. |
| F5 Osobní představení | ПРИВІТ, Я АЛЬОНА · ПИШІТЬ, Я ТУТ | TĚŠÍ MĚ, JSEM ALJONA · PIŠTE, JSEM TU |
| F6 Poctivý stav s úsměvem | ТУТ МОРЯ НЕМАЄ · ЗАТРИМКА РЕЙСУ | TADY MOŘE NENÍ · ZPOŽDĚNÍ LETU |
| F7 Faktický titulek SEO stránky: {TÉMA} + Z ČESKA | ТУРИ З ЧЕХІЇ · ГАРЯЧІ ТУРИ З ЧЕХІЇ | ZÁJEZDY Z ČESKA · LAST MINUTE Z ČESKA |

**Zákazy:**
- žádné „!“;
- žádná slova s apostrofem v display sazbě (ЗВ’ЯЗОК, П’ЯТЬ). Výjimka je jen název země В’ЄТНАМ.
- žádné město;
- žádná slova delší než limit z §8.

### 7.2 Úvod (`/[locale]`), sekce po sekcích

**Hero** (`src/components/home/hero.tsx`)

| Prvek | uk | cs |
|---|---|---|
| Kicker pill | Альона · тури українською | Aljona · česky i ukrajinsky |
| H1 (2 řádky, pevné) | ВАШЕ МОРЕ / З ЧЕХІЇ | VAŠE MOŘE / Z ČESKA |
| Lead | Вам — море, а на нас — решта. Тури застрахованих чеських туроператорів, 3 готелі під ваші побажання й відповідь у Telegram зазвичай за 15 хвилин. | Vám moře – a na nás zbytek. Zájezdy pojištěných českých CK, 3 hotely podle vašich přání a odpověď na Telegramu obvykle do 15 minut. |
| CTA Telegram | Хочу на море | Chci k moři |
| CTA hledání | Знайти тур | Najít zájezd |
| Linka pod vyhledáváním (nahrazuje „Відповідаю українською та чеською“) | На сайті нічого не платите · чеські CK застраховані від банкрутства | Na webu nic neplatíte · české CK jsou pojištěné proti úpadku |
| Alt fotky | Пляж і море | Pláž a moře |
| Razítko (nahrazuje FROM PRAGUE) | top `ANANAS TOUR • З ЧЕХІЇ` · above `["ПЕРЕВІРЕНО"]` · word `АНАНАСОМ` · below `["З 2011"]` · bottom `22 КРАЇНИ ОСОБИСТО` | top `ANANAS TOUR • Z ČESKA` · above `["PROVĚŘENO"]` · word `ANANASEM` · below `["OD 2011"]` · bottom `22 ZEMÍ OSOBNĚ` |

Poznámky:
- Razítko je v JSX jako literály. Mění se jen řetězce, ne props ani struktura.
- Pro cs zkontrolovat proklad: „Z ČESKA“ pod „VAŠE MOŘE“ potřebuje leading ≥ 0,9 kvůli háčkům. Je to úkol pro vizuál, ne pro copy.

**Intro / route tagline** (`intro.tsx`)

| Prvek | uk | cs |
|---|---|---|
| Tagline za „Ananas Tour“ (jediné vysvětlení hříčky) | — бо «ананас» звучить як «а на нас». | — protože „ananas“ zní jako „a na nás“. |
| Sub | Ви кажете, куди й коли. Порівняти пропозиції чеських туроператорів, перевірити готель і документи — це на нас. | Vy řeknete kam a kdy. Porovnat nabídky českých CK, prověřit hotel i doklady – to je na nás. |
| Faktická linka odletů | Виліт: Прага · Брно · Острава · Пардубиці · до Болгарії та Італії — й автобусом | Odlet: Praha · Brno · Ostrava · Pardubice · do Bulharska a Itálie i autobusem |
| Statistika 2011 | у туризмі | v cestovním ruchu |
| Statistika 22 | країни на власні очі | zemí na vlastní oči |
| Statistika Starway | учасники премії Coral Travel | účast v ocenění Coral Travel |
| Statistika TOP | агенцій Join UP! в Україні | agentur Join UP! na Ukrajině |
| Pill věta (3 pilulky + šipka) | ОДИН · ЧАТ → МОРЕ | JEDEN · CHAT → MOŘE |
| aria-label věty | Один чат — і ви біля моря | Jeden chat a jste u moře |

Klíče `we/love/sea` zůstávají a mění se jen hodnoty. Původní „Ми любимо море“ nahrazuje benefit „jeden chat → moře“.

**Last minute na úvodu** (`hot-tours.tsx`)

| Prvek | uk | cs |
|---|---|---|
| Kicker | Гарячі тури з Чехії | Last minute z Česka |
| H2 | ЩЕ ГАРЯЧЕ | JEŠTĚ ŽHAVÉ |
| Lead | Найближчі вильоти з Чехії. Ціни живуть недовго, тож перед бронюванням я перевіряю кожну в туроператора. | Nejbližší odlety z Česka. Ceny dlouho nevydrží, a tak každou před rezervací ověřím u CK. |
| Razítko (nahrazuje „−40 %“) | top `LAST MINUTE • З ЧЕХІЇ` · above `["ВАЛІЗА"]` · word `ЗА ВЕЧІР` · below `[]` · bottom `ANANAS TOUR` | top `LAST MINUTE • Z ČESKA` · above `["KUFR"]` · word `ZA VEČER` · below `[]` · bottom `ANANAS TOUR` |
| Štítky (jen z dat) | Ціну перевірено · Мало місць | Cena ověřena · Poslední místa |
| Odkaz karty | Деталі туру | Detail zájezdu |
| Všechny | Усі гарячі тури | Všechny last minute |
| Prázdný stav | Гарячі тури розібрали швидше, ніж ми встигли їх показати. Напишіть — надішлю свіжі. | Last minute zmizely rychleji, než jsme je stihli ukázat. Napište mi a pošlu čerstvé. |

Klíče `discount` a `discountNote` zůstávají. Pokud je komponenta dál používá, nesmí obsahovat procenta.

**Doporučené hotely** (`featured.tsx`)

| Prvek | uk | cs |
|---|---|---|
| Kicker | Раджу без вагань | Doporučuju bez váhání |
| H2 | ВИБІР АЛЬОНИ | ALJONIN VÝBĚR |
| Lead | Готелі, які я раджу цього сезону. І поясню чому: кому там добре, який там пляж і за що не варто переплачувати. | Hotely, které tuhle sezónu doporučuju. A řeknu proč: komu tam bude dobře, jaká je tam pláž a za co nemá smysl připlácet. |
| CTA | Чому саме ці? | Proč zrovna tyhle? |
| Cena „od“ | від | od |

Pozor: „Готелі, які ми перевірили особисто“ je **zakázané**, dokud klientka nepotvrdí konkrétní hotely (TODO(client)).

**Výběr 3 hotelů** (`pick-tour.tsx`)

| Prvek | uk | cs |
|---|---|---|
| Kicker | Не знаєте, що обрати? | Nevíte, co vybrat? |
| H2 | ТРИ ГОТЕЛІ. НЕ СОТНІ. | TŘI HOTELY. NE STOVKY. |
| Lead | Напишіть, куди, коли і скільки вас. Я порівняю пропозиції чеських туроператорів і надішлю 3 готелі, які сама б обрала на вашому місці, — з поясненням чому. | Napište mi kam, kdy a kolik vás je. Porovnám nabídky českých CK a pošlu 3 hotely, které bych na vašem místě vybrala sama – i s tím, proč zrovna ty. |
| 3 kroky | Ви пишете одне повідомлення → Я порівнюю пропозиції → Ви обираєте з трьох | Napíšete jednu zprávu → Já porovnám nabídky → Vy vyberete ze tří |
| CTA | Хочу 3 готелі | Chci 3 hotely |
| Kvalifikátor rychlosti (vždy viditelný) | З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин. Пізніше — зранку. | Od 9 do 21 h odpovídám obvykle do 15 minut, později večer až ráno. |
| „nebo“ | або | nebo |
| Titulek formuláře | Не любите писати? Залиште номер — передзвоню | Radši telefon? Nechte číslo, zavolám vám |
| Submit | Передзвоніть мені | Zavolejte mi |
| CircleBadge | 3 ГОТЕЛІ • 1 ПОВІДОМЛЕННЯ • | 3 HOTELY • 1 ZPRÁVA • |

**Rozhodnutí:** „3 ГОТЕЛІ ЗА 15 ХВИЛИН*“ jsme zamítli. Spojuje dva sliby do jednoho a výběr do 15 minut není pravda. Odpověď do 15 minut je pravda.

**Destinace na úvodu** (`destinations.tsx`; komponenta sama přidává „?“, takže se píše bez něj)

| Prvek | uk | cs |
|---|---|---|
| Kicker | 12 країн, 1 чат | 12 zemí, 1 chat |
| H2 (bez „?“) | КУДИ ЛЕТИМО | KAM TO BUDE |
| Lead | Від Болгарії, куди можна й автобусом, до Мальдів і Занзібару. Підкажу, де зараз сезон, а де купатися ще рано. | Od Bulharska, kam se dá jet i autobusem, po Maledivy a Zanzibar. Poradím, kde je teď sezóna a kde je na koupání ještě brzo. |
| Všechny | Усі 12 країн | Všech 12 zemí |

**Teaser O mně** (`about.tsx`)

| Prvek | uk | cs |
|---|---|---|
| Kicker | Про мене | O mně |
| H2 | ПРИВІТ, Я АЛЬОНА | TĚŠÍ MĚ, JSEM ALJONA |
| Odstavec 1 | З 2011 року відправляю людей на море. Побувала у 22 країнах і досі регулярно їжджу перевіряти готелі — щоб радити те, що бачила сама, а не те, що гарно виглядає в каталозі. | Lidi k moři posílám od roku 2011. Navštívila jsem 22 zemí a pořád pravidelně jezdím kontrolovat hotely – abych doporučovala to, co jsem viděla sama, ne co hezky vypadá v katalogu. |
| Odstavec 2 | Тепер я теж живу в Чехії — і знаю, як хочеться до моря. Пишіть українською чи чеською: поясню все простими словами. | Teď žiju v Česku a vím, jak moc se odsud chce k moři. Pište česky, nebo ukrajinsky – všechno vysvětlím lidsky. |
| Label uznání | Визнання | Uznání |
| Pilulky | Starway · Coral Travel · ТОП Join UP! | Starway · Coral Travel · TOP Join UP! |
| Odkaz | Більше про мене | Víc o mně |
| Alt fotky | Альона, директорка Ananas Tour | Aljona, která vede Ananas Tour |

**Proč my** (`why-us.tsx`)

| Prvek | uk | cs |
|---|---|---|
| H2 | А ЩО НА НАС? | A CO JE NA NÁS? |
| Dlaždice 1: titul | Гроші під захистом | Peníze v suchu |
| Dlaždice 1: text | Я продаю тури лише чеських туроператорів, а кожен за законом застрахований від банкрутства. Це закон, а не моя обіцянка. | Prodávám jen zájezdy českých CK a každá musí být ze zákona pojištěná proti úpadku. To není můj slib, to je zákon. |
| Dlaždice 2: titul (nahrazuje „Підтримка 24/7“) | Людина, а не бот | Člověk, ne robot |
| Dlaždice 2: text | Пишете в Telegram — відповідаю я, з 9:00 до 21:00 зазвичай за 15 хвилин. Пізно ввечері? Зранку, за першою кавою. | Píšete na Telegram a odpovídám já, od 9 do 21 h obvykle do 15 minut. Pozdě večer? Ráno u první kávy. |
| Dlaždice 3: titul | Бачила сама | Na vlastní oči |
| Dlaždice 3: text | Регулярно їжджу перевіряти готелі. Тож скажу не лише, скільки в готелю зірок, а й чи заслужені вони. | Pravidelně jezdím kontrolovat hotely. Řeknu vám nejen, kolik má hotel hvězd, ale i jestli si je zaslouží. |

**FAQ** (`faq.tsx`)

| Prvek | uk | cs |
|---|---|---|
| H2 | БЕЗ ДРІБНОГО ШРИФТУ | BEZ DROBNÉHO PÍSMA |
| Lead | Гроші, документи, діти — чесно й по суті. Не знайшли свого питання? Запитайте мене. | Peníze, doklady, děti – rovnou a na rovinu. Svou otázku jste nenašli? Zeptejte se mě. |
| CTA | Запитати Альону | Zeptat se Aljony |

**Pořadí otázek podle váhy strachu:**
1. doklady a návrat,
2. co když CK zkrachuje,
3. platím něco na webu,
4. co je v ceně,
5. platba po částech,
6. storno,
7. děti,
8. jen pro Ukrajince?

Ke stávajícím otázkám doplnit:

| Otázka | Odpověď |
|---|---|
| uk «Що буде з грошима, якщо туроператор збанкрутує?» | «Кожен чеський туроператор (CK) за законом зобов’язаний мати страхування від банкрутства (закон № 159/1999 Sb.). Я продаю тури лише таких CK — тож ваші гроші й дорога назад захищені.» |
| cs „Co když cestovní kancelář zkrachuje?“ | „Každá česká CK musí mít ze zákona pojištění proti úpadku (zákon č. 159/1999 Sb.). Prodávám jen zájezdy takto pojištěných CK, takže vaše peníze i cesta zpět jsou kryté.“ |
| uk «Чи треба щось платити на сайті?» | «Ні. На сайті ви лише надсилаєте запит. Я перевіряю ціну й місця в туроператора, усе пояснюю — і лише тоді домовляємося про договір та оплату.» |
| cs „Platím něco na webu?“ | „Ne. Na webu jen pošlete poptávku. Cenu a volná místa ověřím u CK, všechno vysvětlím – a teprve pak řešíme smlouvu a platbu.“ |
| uk «Ви працюєте лише з українцями?» | «Ні. Я говорю українською й чеською — пишіть будь-якою, хоч разом із чеськими друзями.» |
| cs „Jste jen pro Ukrajince?“ | „Vůbec ne. Mluvím česky i ukrajinsky a k moři ráda pošlu každého.“ |

**Opravy ve stávajících odpovědích:**
- Odpověď o dětech: «Ми особисто перевіряємо готелі» → «Я знаю, на що дивитися:» / „Vím, na co se dívat:“.
- Odpověď o ceně: místo vyjmenovaných letišť «переліт із Чехії» / „let z Česka“.
- «вилетіти миттєво» → «вилетіти вже за кілька днів».

**Závěrečné CTA** (`final-cta.tsx`)

| Prvek | uk | cs |
|---|---|---|
| H2 | МОРЕ ЧЕКАЄ. Я ТЕЖ. | MOŘE ČEKÁ. JÁ TAKY. |
| Lead | Три рядки в Telegram: куди, коли і скільки вас. Решту беру на себе. | Tři řádky na Telegram: kam, kdy a kolik vás je. Zbytek je na mně. |
| CTA | Написати Альоні | Napsat Aljoně |
| CircleBadge | ЗАЗВИЧАЙ ЗА 15 ХВ • 9:00–21:00 • | OBVYKLE DO 15 MIN • 9–21 H • |

### 7.3 Stránky: H1 a klíčové H2

**Zájezdy `/tours`**

| Prvek | uk | cs |
|---|---|---|
| Kicker | Пошук турів | Vyhledávání zájezdů |
| H1 | ТУРИ З ЧЕХІЇ | ZÁJEZDY Z ČESKA |
| H1 s filtrem země (`nameTo`) | ТУРИ ДО ТУРЕЧЧИНИ · ТУРИ НА МАЛЬДІВИ | ZÁJEZDY DO TURECKA · ZÁJEZDY NA MALEDIVY |
| Lead | Пакетні тури чеських туроператорів із цінами в кронах. Знайшли щось цікаве? Надішліть мені — перевірю ціну й місця. | Zájezdy českých CK s cenami v korunách. Zaujalo vás něco? Pošlete mi to a ověřím cenu i volná místa. |
| Meta title | Тури з Чехії — пошук і ціни в кронах \| Ananas Tour | Zájezdy z Česka – vyhledávání a ceny v Kč \| Ananas Tour |
| Pomocná karta (po ~6 výsledcích) | Важко обрати? / Надішлю 3 готелі під ваші побажання. / CTA «Хочу 3 готелі» | Nemůžete si vybrat? / Pošlu vám 3 hotely podle vašich přání. / CTA „Chci 3 hotely“ |
| Řazení | Спочатку дешевші · Найближчі вильоти | Od nejlevnějších · Nejbližší odlety |
| Prázdný stav | viz §9.1 | viz §9.1 |

**Detail nabídky `/offers/[id]`**

| Prvek | uk | cs |
|---|---|---|
| Faktická linka | Виліт: Прага · 12.06.2027 · 7 ночей · все включено | Odlet: Praha · 12. 6. 2027 · 7 nocí · all inclusive |
| Cena | Разом за всіх · ціна за особу | Celkem za všechny · cena za osobu |
| Živé ověření | Місця є · ціну перевірено: 14:32 | Volná místa · cena ověřena: 14:32 |
| Hned pod cenou | На сайті нічого не платите. Тур чеського туроператора, застрахованого від банкрутства. | Na webu nic neplatíte. Zájezd české CK pojištěné proti úpadku. |
| CTA | Хочу цей тур + Запитати Альону | Chci tenhle zájezd + Zeptat se Aljony |
| Sekce | Що входить у ціну · Що оплачується окремо | Co je v ceně · Co v ceně není |
| Blok žádosti: kicker / H2 | Запит на бронювання / ХОЧУ ЦЕЙ ТУР | Žádost o rezervaci / CHCI TENHLE ZÁJEZD |
| Blok žádosti: lead | На сайті ви нічого не платите. Я перевірю місця й ціну в туроператора і напишу вам для підтвердження. | Na webu nic neplatíte. Ověřím volná místa i cenu u CK a ozvu se vám kvůli potvrzení. |
| Submit | Надіслати запит | Odeslat žádost |
| Vyprodáno | Цей термін щойно розібрали. Знайду схожий — за ціною й готелем. + «Знайти схожий» | Tenhle termín se právě vyprodal. Najdu podobný – cenou i hotelem. + „Najít podobný“ |
| Změna ceny | Ціна змінилася: було {old}, тепер {new}. Напишіть — підкажу, чи варто брати. | Cena se změnila: dříve {old}, teď {new}. Napište mi a poradím, jestli do toho jít. |

U času ověření používáme formát s dvojtečkou, aby se cs vyhnula „v/ve“.

**Detail hotelu `/hotels/[id]`**

| Prvek | uk | cs |
|---|---|---|
| H2 termínů | НАЙБЛИЖЧІ ВИЛЬОТИ | NEJBLIŽŠÍ ODLETY |
| Štítek (jen s příznakem) | Альона тут була | Aljona tu byla |
| CTA | Запитати Альону | Zeptat se Aljony |
| Bez termínů | Для цього готелю пошук зараз не бачить вильотів. Напишіть — перевірю в туроператора. | Vyhledávání teď pro tenhle hotel nevidí termíny. Napište mi a ověřím to u CK. |

**Last minute `/hot-tours`**

| Prvek | uk | cs |
|---|---|---|
| Kicker | Вильоти найближчими днями | Odlety v nejbližších dnech |
| H1 | ГАРЯЧІ ТУРИ З ЧЕХІЇ | LAST MINUTE Z ČESKA |
| Lead | Коли туроператору треба заповнити літак, ціна падає. Я стежу за такими моментами й перевіряю кожну ціну до бронювання — щоб «гаряче» не охололо. | Když cestovka potřebuje zaplnit letadlo, cena jde dolů. Hlídám tyhle chvíle a každou cenu před rezervací ověřím, aby žhavá nabídka nevychladla. |
| Titulek seznamu | Найближчі вильоти | Nejbližší odlety |
| Blok hlídání: H2 | ЧЕКАЄТЕ НА ЦІНУ? | ČEKÁTE NA CENU? |
| Blok hlídání: text | Напишіть, куди, коли й за скільки — дам знати, щойно з’явиться ваш варіант. | Napište kam, kdy a za kolik – ozvu se, jakmile se objeví ta vaše nabídka. |
| Blok hlídání: CTA | Стежити за ціною | Hlídat cenu |
| Telegram CTA | Хочу гарячий тур | Chci last minute |
| Meta title | Гарячі тури з Чехії \| Ananas Tour | Last minute zájezdy z Česka \| Ananas Tour |

Sezónní háček je volitelný, jen podle reálného kalendáře a bez cen: «На осінні канікули ще є вильоти» / „Na podzimní prázdniny ještě jsou odlety“.

**Destinace `/destinations`**

| Prvek | uk | cs |
|---|---|---|
| Kicker | Тури з Чехії | Zájezdy z Česka |
| H1 | 12 КРАЇН. ОДНА АЛЬОНА. | 12 ZEMÍ. JEDNA ALJONA. |
| Lead | Куди я відправляю туристів із Чехії і що про кожну країну варто знати до вильоту: сезон, переліт, гроші, документи. | Kam posílám klienty z Česka a co o každé zemi vědět před odletem: sezóna, let, peníze, doklady. |
| Závěr | Не знаєте, куди? Ідеальний момент написати. + «Написати Альоні» | Nevíte kam? Ideální chvíle napsat. + „Napsat Aljoně“ |
| Meta title | Куди полетіти з Чехії: 12 країн \| Ananas Tour | Kam letět z Česka: 12 zemí \| Ananas Tour |

**Šablona detailu destinace `/destinations/[slug]`** (`src/content/destinations.ts`)

| Prvek | uk | cs |
|---|---|---|
| Kicker | Тури з Чехії | Zájezdy z Česka |
| H1 (samotný název země) | ТУРЕЧЧИНА · ЄГИПЕТ · ДОМІНІКАНА | TURECKO · EGYPT · DOMINIKÁNA |
| CTA v hero | Хочу {nameTo} + Ціни та дати | Chci {nameTo} + Ceny a termíny |
| Klíčová fakta: popisky | Сезон · Переліт · Вильоти · Валюта · В’їзд | Sezóna · Let · Odlety · Měna · Vstup |
| Pravidla faktů | Délka letu „з Праги ≈ 3 год“ je povolená jako faktický údaj. Text o vstupu vždy končí «Перевірю саме для вашої ситуації.» | Totéž; text o vstupu končí „Ověřím pro vaši situaci.“ |
| H2 sekcí | КОЛИ ЇХАТИ · КУДИ САМЕ · ГРОШІ НА МІСЦІ · ПОРАДИ АЛЬОНИ · ВИЛЬОТИ З ЧЕХІЇ · ЩО ЗАЗВИЧАЙ ПИТАЮТЬ | KDY JET · KAM PŘESNĚ · PENÍZE NA MÍSTĚ · ALJONINY TIPY · ODLETY Z ČESKA · NA CO SE PTÁTE |
| CTA H2 | ХОЧЕТЕ ДО ТУРЕЧЧИНИ? (`nameTo`) | CHCETE DO TURECKA? |
| CTA lead | Скажіть дати, скільки вас і бюджет — я надішлю 3 готелі. З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин. | Napište termín, kolik vás je a rozpočet – pošlu vám 3 hotely. Od 9 do 21 h odpovídám obvykle do 15 minut. |
| Meta title | Тури до Туреччини з Чехії — ціни в кронах \| Ananas Tour | Zájezdy do Turecka z Česka – ceny v Kč \| Ananas Tour |

**Taglines destinací** (≤ 28 znaků). Jsou to návrhy a je nutné je ověřit proti regionům v `destinations.ts`:

| Země | uk | cs |
|---|---|---|
| Turecko | Батьківщина all inclusive | Domovina all inclusive |
| Egypt | Літо, яке працює взимку | Léto, které maká i v zimě |
| Řecko | Острови, оливки, тиша | Ostrovy, olivy, klid |
| Bulharsko | Близько. Навіть автобусом | Blízko. I autobusem |
| SAE | Пляж зранку, Дубай увечері | Ráno pláž, večer mrakodrapy |
| Maledivy | Вілла над водою — і все | Vila nad vodou. Víc netřeba |
| Vietnam | Екзотика без поспіху | Exotika bez spěchu |
| Dominikána | Карибське море наживо | Karibik naživo |
| Bali | Джунглі, серфінг, рисові тераси | Džungle, surf a rýžová pole |
| Zanzibar | Білий пісок і спеції | Bílý písek a koření |
| Španělsko, Itálie | podle regionů v datech, vzorec „3 konkrétní podstatná jména“ | totéž |

Ve sloupci „SEO titles“ odstranit všechna „з Праги / z Prahy“.

**Služby `/services`**

| Prvek | uk | cs |
|---|---|---|
| Kicker | Усе в одному чаті | Vše v jednom chatu |
| H1 | СОЛОДКЕ — ВАМ. КОЛЮЧЕ — НАМ. | SLADKÉ VÁM. PICHLAVÉ NÁM. |
| Lead | Море — солодка частина. Страховка, квитки, трансфер, віза й екскурсії — колюча. Її я беру на себе, в одному чаті. | Moře je ta sladká část. Pojištění, letenky, transfer, víza a výlety jsou ta pichlavá. Tu beru na sebe, v jednom chatu. |

| Karta | uk: titul / text / odrážky / CTA | cs: titul / text / odrážky / CTA |
|---|---|---|
| Pojištění | Страхування / Поясню, що покриває поліс, — до того, як ви його купите. / Медичні витрати за кордоном · Страхування від невиїзду · Умови — українською / Підібрати страховку | Pojištění / Vysvětlím, co pojistka kryje – dřív, než ji koupíte. / Léčebné výlohy v zahraničí · Pojištění storna zájezdu · Podmínky vysvětlené lidsky / Vybrat pojištění |
| Letenky | Авіаквитки / Коли потрібен лише переліт. Підкажу, де багаж уже в ціні, а де — пастка. / Вильоти з аеропортів Чехії · Ціна одразу з багажем · Зручні пересадки / Знайти рейс | Letenky / Když potřebujete jen letenku. Poradím, kde je zavazadlo v ceně a kde je to past. / Odlety z letišť v Česku · Cena rovnou se zavazadlem · Rozumné přestupy / Najít let |
| Hotely | Готелі / Без туру, просто готель. Знаю, куди з дітьми, куди вдвох — і куди краще не їхати. / 3 готелі під ваші побажання · Сімейні номери й дитячі клуби · Чесно і про мінуси / Обрати готель | Hotely / Jen hotel, bez zájezdu. Vím, kam s dětmi, kam ve dvou – a kam radši ne. / 3 hotely podle vašich přání · Rodinné pokoje a dětské kluby · Na rovinu i o mínusech / Vybrat hotel |
| Transfer | Трансфер / Зустріч в аеропорту з табличкою — і просто до готелю. Без таксі-лотереї о другій ночі. / Груповий або індивідуальний · Туди й назад · Ціна відома наперед / Замовити трансфер | Transfer / Vyzvednutí na letišti s cedulkou a rovnou do hotelu. Žádná taxi-loterie ve dvě ráno. / Skupinový, nebo individuální · Tam i zpět · Cena známá předem / Objednat transfer |
| Víza | Візи / Перелік документів під вашу країну й ваш статус у Чехії — щоб на кордоні без сюрпризів. / Перевірю, чи потрібна віза · Перелік документів · Допомога із заявою / Запитати про візу | Víza / Seznam dokladů pro vaši destinaci i váš pobyt v Česku – ať vás na hranicích nic nepřekvapí. / Ověřím, zda potřebujete vízum · Seznam dokladů · Pomoc se žádostí / Poradit s vízem |
| Výlety | Екскурсії / Що справді варто побачити, а що можна пропустити, навіть якщо гід дуже вмовляє. / Групові й приватні · Бронювання наперед · Порада, що обрати / Обрати екскурсію | Výlety / Co opravdu stojí za to – a co klidně vynechat, i když průvodce hodně přemlouvá. / Skupinové i soukromé · Rezervace předem · Rada, co vybrat / Vybrat výlet |

| Prvek | uk | cs |
|---|---|---|
| H2 „Jak to funguje“ | ЯК ЦЕ ПРАЦЮЄ: Пишете, що потрібно → Я підбираю й перевіряю → Ви вирішуєте, а на сайті нічого не платите | JAK TO FUNGUJE: Napíšete, co potřebujete → Vyberu a ověřím → Rozhodnete se, na webu nic neplatíte |
| H2 na míru | ХОЧЕТЕ СВІЙ МАРШРУТ? | RADĚJI NA MÍRU? |
| Titulek formuláře | Немає Telegram? Без проблем | Bez Telegramu? Žádný problém |
| Závěr | Не знайшли потрібного? Напишіть — розберемося. | Nenašli jste, co hledáte? Napište mi, vyřešíme to. |

**Odstranit:** «500 000 варіантів», «поліс за 10 хвилин», «повний захист у будь-якій країні», «україномовні гіди» (TODO(client)) a «трансфер до чеських аеропортів» (TODO(client)).

**O mně `/about`**

| Prvek | uk | cs |
|---|---|---|
| H1 | ПРИВІТ, Я АЛЬОНА | TĚŠÍ MĚ, JSEM ALJONA |
| Lead | З 2011 року в туризмі, 22 країни на власні очі. Раніше — Київ, тепер — Чехія. У Telegram відповідаю сама, без колл-центру. | V cestovním ruchu od roku 2011, 22 zemí na vlastní oči. Dřív Kyjev, teď Česko. Na Telegramu odpovídám sama, žádné call centrum. |
| Statistiky | 2011 / у туризмі · 22 / країни на власні очі · ≈15 хв / типова відповідь у Telegram | 2011 / v cestovním ruchu · 22 / zemí na vlastní oči · ≈15 min / obvyklá odpověď na Telegramu |
| Příběh: H2 (nahrazuje „Туризм — це не професія, а стиль життя“) | КАТАЛОГ МОВЧИТЬ. Я — НІ. | KATALOG MLČÍ. JÁ NE. |
| Příběh: text | Я регулярно їжджу в інспекційні поїздки й дивлюся готелі не на рендерах, а наживо: де тінь біля басейну, скільки насправді йти до моря і чи заслужені зірки. Як ананас: колюча до готелів — щоб вам було солодко. | Pravidelně jezdím na inspekční cesty a hotely nevidím na vizualizacích, ale naživo: kde je u bazénu stín, kolik je to doopravdy k moři a jestli si hotel své hvězdy zaslouží. Jako ananas: na hotely pichlavá – abyste to vy měli sladké. |
| Hodnoty: H2 | МОЇ ПРАВИЛА | MOJE PRAVIDLA |
| Hodnota: Poctivě | Чесно — Якщо готель не вартий своїх грошей, так і скажу, навіть якщо його легше продати. | Poctivě – Když hotel za ty peníze nestojí, řeknu vám to na rovinu, i kdyby se dal prodat snáz. |
| Hodnota: Osobně | Особисто — Ви пишете мені, а не в колл-центр. Ваш тур веду від першого повідомлення. | Osobně – Píšete mně, ne call centru. Váš zájezd vedu od první zprávy. |
| Hodnota: Až do návratu | До повернення — Щось пішло не так на відпочинку? Пишіть у той самий чат — розберемося разом із туроператором. | Až do návratu – Něco se na dovolené pokazí? Napište do stejného chatu, vyřešíme to s CK spolu. |
| Uznání: H2 (nahrazuje „Нагороди“) | ВИЗНАННЯ | UZNÁNÍ |
| Uznání: lead | Мою роботу помітили й туроператори — ще в Україні. | Mé práce si všimly i cestovní kanceláře – ještě na Ukrajině. |
| Uznání: položky | Учасниця премії Starway від Coral Travel · Неодноразово серед ТОП-агенцій продажів Join UP! | Účast v ocenění Starway od Coral Travel · Opakovaně mezi TOP prodejními agenturami Join UP! |
| Blok Proč my | А ЩО НА НАС? (texty jako na úvodu) | A CO JE NA NÁS? |
| Závěrečné H2 | ВАША ВІДПУСТКА — МОЯ ВІЗИТІВКА | VAŠE DOVOLENÁ, MOJE VIZITKA |
| CTA | Написати Альоні | Napsat Aljoně |

**Kontakt `/contact`**

| Prvek | uk | cs |
|---|---|---|
| Kicker | Контакти | Kontakty |
| H1 (nahrazuje „Я НА ЗВ’ЯЗКУ“, apostrof v display) | ПИШІТЬ, Я ТУТ | PIŠTE, JSEM TU |
| Lead | Найшвидше — Telegram: щодня з 9:00 до 21:00 зазвичай відповідаю за 15 хвилин. Пізно ввечері? Відповім зранку, за першою кавою. | Nejrychleji přes Telegram: denně od 9 do 21 h odpovídám obvykle do 15 minut. Pozdě večer? Ozvu se ráno u první kávy. |
| Karta Telegram | Telegram @Ananas_tours · Відповідаю особисто, українською чи чеською. · CTA «Відкрити чат» | Telegram @Ananas_tours · Odpovídám osobně, česky i ukrajinsky. · CTA „Otevřít chat“ |
| QR popisek | Наведіть камеру — і ви в чаті | Namiřte foťák a jste v chatu |
| Telefon | Немає Telegram? Дзвоніть: +420 723 615 028 · CTA «Подзвонити» | Nemáte Telegram? Volejte: +420 723 615 028 · CTA „Zavolat“ |
| Hodiny (nahrazuje „Години роботи / Otevírací doba“) | Коли відповідаю: щодня 9:00–21:00 (за чеським часом) | Kdy odpovídám: denně 9:00–21:00 |
| Formulář | Або залиште повідомлення · Повідомлення одразу прийде Альоні. · CTA «Надіслати Альоні» | Nebo mi napište sem · Zpráva dorazí rovnou Aljoně. · CTA „Poslat Aljoně“ |
| Šarm (volitelné, pod H1) | У Чехії немає моря. Зате є Альона. | Česko nemá moře. Má Aljonu. |

„Щодня / denně“ odpovídá `site.ts` (Пн–Нд). Víkendy je potřeba potvrdit (TODO(client)). Osobní schůzky jen po potvrzení klientkou (TODO(client)).

**Blog `/blog`, `/blog/[slug]`**

| Prvek | uk | cs |
|---|---|---|
| H1 | ПОРАДИ З ДОРОГИ | TIPY Z CEST |
| Lead | Що я знаю з поїздок і про що питають мої туристи: сезони, документи, готелі, гроші. | Co vím z cest a na co se ptají moji klienti: sezóny, doklady, hotely, peníze. |
| Odkaz karty | Читати далі | Číst dál |
| Inline CTA po první užitečné odpovědi | Питання про вашу ситуацію? Запитайте Альону. | Otázka k vaší situaci? Zeptejte se Aljony. |
| Blok na konci: H2 | КУДИ? КОЛИ? СКІЛЬКИ ВАС? | KAM? KDY? KOLIK VÁS? |
| Blok na konci: lead | Три відповіді в Telegram — і я почну шукати. | Tři odpovědi na Telegram a začnu hledat. |
| CTA | Написати Альоні | Napsat Aljoně |

**404 a chybová stránka**

| Prvek | uk | cs |
|---|---|---|
| 404 H1 | ТУТ МОРЯ НЕМАЄ | TADY MOŘE NENÍ |
| 404 text | Як і в усій Чехії. Зате Альона знає, де воно є: поверніться на головну або напишіть їй. | Jako v celém Česku. Aljona ale ví, kde je: vraťte se na úvod, nebo jí napište. |
| 404 CTA | На головну + Написати Альоні | Zpět na úvod + Napsat Aljoně |
| Chyba H1 | ЗАТРИМКА РЕЙСУ | ZPOŽDĚNÍ LETU |
| Chyba text | Сторінка не завантажилась. Спробуйте ще раз — або напишіть Альоні: вона не затримується. | Stránka se nenačetla. Zkuste to znovu, nebo napište Aljoně – ta zpoždění nemá. |
| Chyba CTA | Спробувати ще раз + Написати Альоні | Zkusit znovu + Napsat Aljoně |

**Úspěch a chyba formulářů:** viz §9.4 a §9.5.

### 7.4 Globální prvky

| Prvek | uk | cs |
|---|---|---|
| Kontaktní lišta (3. osoba) | Альона в Telegram · зазвичай відповідає за 15 хв (9:00–21:00) | Aljona na Telegramu · obvykle odpoví do 15 min (9–21 h) |
| Hlavička CTA | Написати Альоні | Napsat Aljoně |
| Plovoucí widget v pracovní době: titul / text | Три готелі для вас? / Напишіть, куди й коли, — зазвичай відповідаю за 15 хвилин. | Tři hotely pro vás? / Napište kam a kdy – odpovídám obvykle do 15 minut. |
| Plovoucí widget mimo pracovní dobu: titul / text | Пізно? Морю байдуже. / Напишіть зараз — відповім зранку, з 9:00. | Pozdě? Moři je to jedno. / Napište hned – ozvu se ráno od 9:00. |
| Patička: tagline (nahrazuje „Ваш надійний партнер…“) | Тури з Чехії, які підбирає людина, а не алгоритм. Солодке — вам, колюче — нам, кисле — нікому. | Zájezdy z Česka, které vybírá člověk, ne algoritmus. Sladké vám, pichlavé nám, kyselé nikomu. |
| Patička: právní ujištění | Ananas Tour — турагенція. Продаємо тури чеських туроператорів, застрахованих від банкрутства (zákon č. 159/1999 Sb.). | Ananas Tour je cestovní agentura. Prodáváme zájezdy českých cestovních kanceláří pojištěných proti úpadku (zákon č. 159/1999 Sb.). |
| Meta title webu | Ananas Tour — тури з Чехії українською | Ananas Tour – zájezdy z Česka, česky i ukrajinsky |
| Meta description webu | Тури чеських туроператорів, застрахованих від банкрутства: Туреччина, Єгипет, Греція й ще 9 країн. Альона підбере 3 готелі в Telegram. | Zájezdy českých CK pojištěných proti úpadku: Turecko, Egypt, Řecko a dalších 9 zemí. Aljona vám na Telegramu vybere 3 hotely na míru. |
| OG / sdílení | Ваше море з Чехії. Вам — море, а на нас — решта. | Vaše moře z Česka. Vám moře – a na nás zbytek. |

---

## 8. Pravidla délky

**Proč na tom záleží:**
- Unbounded Black v kapitálkách má zhruba 0,8–0,95 em na znak.
- Na telefonu 360 px minus 2 × 16 px okrajů se do 40px nadpisu vejde asi **10 znaků na řádek**.
- Cyrilice Ш Щ Ж Ю М Ф je ještě širší: počítej ji jako 1,3 znaku.
- České háčky (Č Ř Š Ž Ě) potřebují ve víceřádkovém display řádkování ≥ 0,9.
- Proto se počítá **délka nejdelšího slova**, nejen délka řádku.
- Slova v display sazbě nikdy nedělíme a jednopísmenné předložky lepíme k dalšímu slovu NBSP mezerou.

| Prvek | Limit | Příklad, který sedí |
|---|---|---|
| Hero H1 | Přesně 2 řádky. Ř1 ≤ 10 znaků, Ř2 ≤ 8 znaků (Ř2 přetéká přes okraj). Text je zamčený. | ВАШЕ МОРЕ (9) / З ЧЕХІЇ (7) · VAŠE MOŘE / Z ČESKA |
| Page H1 | ≤ 4 slova (pomlčka a tečka se nepočítají), ≤ 28 znaků celkem, každé slovo ≤ 9 znaků (10 jen pro názvy zemí: ДОМІНІКАНА / DOMINIKÁNA, pak o krok menší clamp). 2 řádky desktop, max. 3 mobil. | СОЛОДКЕ — ВАМ. КОЛЮЧЕ — НАМ. (28) |
| Section H2 | ≤ 4 slova, ≤ 30 znaků, slovo ≤ 9 znaků, max. jedno „?“, žádné „!“. | ТРИ ГОТЕЛІ. НЕ СОТНІ. (21) |
| Final CTA H2 (až 6rem) | ≤ 3 řádky × ≤ 9 znaků. | МОРЕ ЧЕКАЄ. / Я ТЕЖ. |
| Display tagline (~2rem, intro) | ≤ 45 znaků, slovo ≤ 12. | — protože „ananas“ zní jako „a na nás“. (39) |
| H3 / titul karty | 1–3 slova, ≤ 20 znaků, slovo ≤ 11 (СТРАХУВАННЯ je strop). | Гроші під захистом (18) |
| Pill věta | 1 slovo na pilulku, ≤ 7 znaků (cs ≤ 8). | ОДИН · ЧАТ → МОРЕ |
| Kicker / eyebrow | 1–4 slova, ≤ 28 znaků, větná velikost písmen, smí obsahovat « · ». | Альона · тури українською (25) |
| Štítek / badge na kartě či fotce | 1–2 slova, ≤ 14 znaků; jen když to podporují data. | Мало місць · Cena ověřena |
| Razítko (`Stamp`) | Oblouky top/bottom ≤ 26 znaků. `word` ≤ 8 znaků (vč. teček). `above`/`below` ≤ 12 znaků na řádek, max. 2 řádky. Čte se shora dolů jako jedna věta. | ПЕРЕВІРЕНО / АНАНАСОМ |
| Kruhový text (`CircleBadge`) | 22–34 znaků vč. « • », 2–3 segmenty, kapitálky, končí « • ». | 3 HOTELY • 1 ZPRÁVA • |
| Tlačítko | ≤ 3 slova; uk ≤ 22 znaků, cs ≤ 24. Sloveso nebo „Хочу/Chci“ na začátku. Když je dlouhé, krátíme podstatné jméno, nikdy sloveso. | Pokračovat na Telegramu (23) |
| Statistika | Hodnota ≤ 7 znaků; popisek ≤ 28 znaků (2 krátké řádky). | Starway / účast v ocenění Coral Travel |
| Hero lead | ≤ 170 znaků, max. 2 věty. | |
| Section lead | ≤ 200 znaků, max. 2 věty, jeden fakt nebo další krok. | |
| Page-hero lead | ≤ 220 znaků. | |
| Text karty | ≤ 160 znaků, 1–2 věty. Odrážky ≤ 32 znaků, max. 3 na kartu. | |
| Tagline destinace | ≤ 28 znaků. | Vila nad vodou. Víc netřeba |
| FAQ | Otázka ≤ 70 znaků, slovy uživatele. Odpověď ≤ 420 znaků a první věta odpovídá přímo (Так. / Ні. / Зазвичай… / Ano. / Ne. / Obvykle…). | |
| Mikrocopy (nápověda, validace, loading, prázdný stav) | 1 věta ≤ 100 znaků + volitelná akce. | |
| Kvalifikátor (15 minut, cena) | ≤ 90 znaků, `text-sm`, vždy viditelný přímo u slibu, nikdy v tooltipu. | |
| Telegram prefill | Pozdrav + ≤ 1 kontextová řádka + ≤ 4 řádky „Popisek: …“; ≤ 200 znaků celkem. | |
| Meta title | ≤ 60 znaků. Na úvodu, zájezdech, last minute a destinacích obsahuje «з Чехії» / „z Česka“. Vzorec «{Téma} з Чехії \| Ananas Tour». | |
| Meta description | 140–160 znaků, jedno akční sloveso. Letiště smí zaznít až za «з Чехії». | |

**Jazyky:**
- Drafty se neshodly, který jazyk je delší. **Rozhodnutí:** měř obě verze a kontroluj tu delší.
- Ukrajinština bývá delší v podstatných jménech (-ування, -ість), čeština v diakritice a skupinách souhlásek.
- Nikdy nedoplňuj kratší verzi.
- Pokud doslovný překlad láme limit, transkreuj.

---

## 9. Vzory mikrocopy

### 9.1 Prázdné stavy

Struktura: (vtip nebo pojmenování) + poctivé vysvětlení + akce do Telegramu.

| Kde | uk | cs |
|---|---|---|
| Vyhledávání bez výsledků: titul | Тут ананаси не ростуть | Tady ananas neroste |
| Vyhledávání bez výsledků: text | З такими фільтрами нічого не знайшлося. Але онлайн-пошук бачить не все — напишіть, і я пошукаю вручну. | S těmito filtry jsme nic nenašli. Online vyhledávání ale nevidí všechno – napište mi a podívám se ručně. |
| Vyhledávání bez výsledků: CTA | Пошукайте за мене + Скинути фільтри | Najděte to za mě + Zrušit filtry |
| Last minute prázdné | Гарячі тури розібрали швидше, ніж ми встигли їх показати. Напишіть — надішлю свіжі. | Last minute zmizely rychleji, než jsme je stihli ukázat. Napište mi a pošlu čerstvé. |
| Hotel bez termínů | Для цього готелю пошук зараз не бачить вильотів. Напишіть — перевірю в туроператора. | Vyhledávání teď pro tenhle hotel nevidí termíny. Napište mi a ověřím to u CK. |
| Blog prázdný | Поради вже в дорозі. А поки — питайте напряму. | Tipy jsou na cestě. Zatím se ptejte napřímo. |

### 9.2 Načítání

| Kde | uk | cs |
|---|---|---|
| Vyhledávání (spinner) | Чистимо ананас… шукаємо тури | Loupeme ananas… hledáme zájezdy |
| Ověření ceny (automat, proto „my“) | Перевіряємо актуальну ціну… | Ověřujeme aktuální cenu… |
| Odesílání poptávky | Летить до Альони… | Letí za Aljonou… |
| Odesílání žádosti o rezervaci (bez vtipu) | Надсилаємо запит… | Odesíláme žádost… |

### 9.3 Formuláře: popisky, placeholdery, nápovědy

| Pole | uk: popisek / placeholder / nápověda | cs: popisek / placeholder / nápověda |
|---|---|---|
| Jméno | Ім’я / Як до вас звертатися | Jméno / Jak vám mám říkat |
| Telefon | Телефон / +420 … | Telefon / +420 … |
| Telegram | Telegram / @username / Необов’язково, але так швидше | Telegram / @username / Nepovinné, ale bude to rychlejší |
| E-mail | E-mail / name@example.com | E-mail / jmeno@example.cz |
| Kam | Куди / Наприклад, Туреччина або «ще не знаю» | Kam / Třeba Turecko, nebo „ještě nevím“ |
| Kdy | Коли / Наприклад, друга половина липня | Kdy / Třeba druhá půlka července |
| Kolik vás je | Скільки вас / 2 дорослих + дитина 6 років | Kolik vás je / 2 dospělí + dítě 6 let |
| Přání | Побажання / Бюджет, харчування, басейн із гіркою, тиша чи вечірки… | Přání / Rozpočet, strava, tobogány, klid, nebo party… |
| Souhlas | Погоджуюся з обробкою персональних даних (odkaz) | Souhlasím se zpracováním osobních údajů (odkaz) |
| Povinná pole | * — обов’язкові поля | * povinné údaje |

**Vyhledávací box:**

| Pole | uk | cs |
|---|---|---|
| Kam | Куди · výchozí «Куди завгодно» | Kam · výchozí „Kamkoli“ |
| Odkud | Звідки · «Усі аеропорти» | Odkud · „Všechna letiště“ |
| Kdy | Коли · «Дата вильоту» | Kdy · „Termín odletu“ |
| Noci | Ночей · «Не важливо» (nahrazuje „Будь-скільки“) | Nocí · „Nezáleží“ (nahrazuje „Libovolně“) |
| Kdo jede | Хто їде · «Дорослі: 2 · Діти: 1» | Kdo jede · „Dospělí: 2 · Děti: 1“ |
| Věk dítěte | Вік дитини | Věk dítěte |
| Strava | Харчування · «Будь-яке» | Strava · „Jakákoli“ |
| Odeslat | Знайти тур | Najít zájezd |

Používáme jednotně „Хто їде / Kdo jede“, nikdy „Kdo cestuje“.

**Množná čísla.** Kde to jde, používej vzor „Popisek: číslo“, který skloňování obchází. Jinak:

| | 1 | 2–4 | 5+ |
|---|---|---|---|
| uk ніч | 1 ніч | 2 ночі | 7 ночей |
| uk тур | 1 тур | 3 тури | 12 турів |
| uk країна | 1 країна | 2 країни (i 22, 23, 24) | 12 країн |
| cs noc | 1 noc | 2 noci | 7 nocí |
| cs zájezd | 1 zájezd | 3 zájezdy | 12 zájezdů |
| cs země | 1 země | 2 země | 22 zemí |
| cs dospělý | 1 dospělý | 2 dospělí | 5 dospělých |

**Validace (vstřícně, bez obviňování):**

| Chyba | uk | cs |
|---|---|---|
| Chybí jméno | Як до вас звертатися? | Jak vám mám říkat? |
| Telefon | Перевірте номер, наприклад: +420 123 456 789 | Zkontrolujte číslo, třeba: +420 123 456 789 |
| E-mail | Схоже, в e-mail закралася помилка. | V e-mailu je asi překlep. |
| Žádný kontakt | Залиште телефон або Telegram — інакше мені нема куди відповісти. | Nechte mi telefon nebo Telegram, jinak vám nemám jak odpovědět. |
| Data | Дата повернення має бути після вильоту. | Návrat musí být až po odletu. |
| Souhlas | Без згоди я не зможу вам відповісти. | Bez souhlasu vám nemůžu odpovědět. |

### 9.4 Úspěchy

| Kde | uk | cs |
|---|---|---|
| Poptávka: titul | Є! Запит уже в Альони | Je to tam! Aljona má vaši poptávku |
| Poptávka: text | З 9:00 до 21:00 вона зазвичай відповідає за 15 хвилин, пізніше — зранку. Поки можна діставати валізу з шафи. | Mezi 9. a 21. hodinou odpoví obvykle do 15 minut, jinak ráno. Mezitím můžete hledat plavky. |
| Poptávka: číslo | Номер запиту: {id} | Číslo poptávky: {id} |
| Poptávka: CTA | Продовжити в Telegram + Ще один запит | Pokračovat na Telegramu + Další poptávka |
| Žádost o rezervaci (bez vtipu, jde o peníze): titul | Запит на бронювання надіслано | Žádost o rezervaci odeslána |
| Žádost o rezervaci: text | Альона перевірить місця й ціну в туроператора і напише вам. Платите лише після підтвердження — не на сайті. | Aljona ověří volná místa i cenu u CK a ozve se vám. Platí se až po potvrzení, ne na webu. |
| Žádost o rezervaci: číslo | Номер запиту: {id} | Číslo žádosti: {id} |
| Zpětné volání | Дякую! Передзвоню вам з 9:00 до 21:00. | Díky! Zavolám vám mezi 9. a 21. hodinou. |

Uvozovací „Є!“ a „Je to tam!“ jsou jediné povolené vykřičníky na stránce.

### 9.5 Chyby

Každá chyba nabízí Telegram. U peněz a rezervací nevtipkujeme.

| Kde | uk | cs |
|---|---|---|
| Poptávka: obecná | Запит застряг у дорозі. Напишіть Альоні в Telegram — так навіть швидше. | Poptávka se cestou zasekla. Napište Aljoně na Telegram, bude to i rychlejší. |
| Žádost o rezervaci (bez vtipu) | Запит не вдалося надіслати. Спробуйте ще раз або напишіть Альоні в Telegram — вона оформить усе вручну. | Žádost se nepodařilo odeslat. Zkuste to znovu, nebo napište Aljoně na Telegram – vyřídí to ručně. |
| Příliš mnoho pokusů | Забагато спроб поспіль. Зачекайте хвилинку — або пишіть одразу в Telegram. | Příliš mnoho pokusů za sebou. Chvilku počkejte, nebo pište rovnou na Telegram. |
| Bez připojení | Немає з’єднання з інтернетом. Перевірте мережу й спробуйте ще раз. | Nejste připojeni k internetu. Zkontrolujte síť a zkuste to znovu. |
| Ověření ceny selhalo | Не вдалося перевірити ціну онлайн. Альона перевірить її вручну — напишіть їй. | Cenu se nepodařilo ověřit online. Aljona ji ověří ručně – napište jí. |

### 9.6 Předvyplněné zprávy do Telegramu

**Pravidla:**
- Vždy začínají pozdravem uk «Добрий день, Альоно!» / cs „Dobrý den, Aljono!“.
- Jsou rodově neutrální: ne «хотів(-ла)», «залишив(-ла)», „chtěl(a)“, „poslal(a)“.
- Prázdná místa mají tvar „Popisek: …“.
- Max. 4 popsané řádky, ≤ 200 znaků, žádné emoji.
- Nikdy nepředvyplňují osobní údaje.
- Řádky se oddělují `\n`.

| Kontext (source) | uk | cs |
|---|---|---|
| Obecná (hlavička, hero, plovoucí, O mně) | Добрий день, Альоно! Хочу на море.\nКуди: …\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: … | Dobrý den, Aljono! Chci k moři.\nKam: …\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: … |
| Výběr 3 hotelů | Добрий день, Альоно! Хочу 3 готелі на вибір.\nКуди: …\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: … | Dobrý den, Aljono! Prosím 3 hotely na výběr.\nKam: …\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: … |
| Konkrétní nabídka (`offerTelegramMessage()`) | Добрий день, Альоно! Цікавить цей тур — чи є ще місця?\n{готель} · {дата} · {ночі} · {ціна}\n{url} | Dobrý den, Aljono! Zajímá mě tenhle zájezd – jsou ještě volná místa?\n{hotel} · {datum} · {noci} · {cena}\n{url} |
| Hotel | Добрий день, Альоно! Цікавить готель {назва}.\nКоли: …\nСкільки нас: … | Dobrý den, Aljono! Zajímá mě hotel {název}.\nKdy: …\nKolik nás je: … |
| Doporučené hotely | Добрий день, Альоно! Чому ви радите саме ці готелі? Хочу щось схоже.\nКоли: …\nСкільки нас: … | Dobrý den, Aljono! Proč doporučujete zrovna tyhle hotely? Chci něco podobného.\nKdy: …\nKolik nás je: … |
| Destinace | Добрий день, Альоно! Хочу {nameTo}.\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: … | Dobrý den, Aljono! Chci {nameTo}.\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: … |
| Last minute | Добрий день, Альоно! Що є гарячого?\nКуди: …\nКоли можу вилетіти: …\nСкільки нас: … | Dobrý den, Aljono! Co máte žhavého?\nKam: …\nKdy můžu letět: …\nKolik nás je: … |
| Hlídání ceny | Добрий день, Альоно! Постежте, будь ласка, за ціною для мене.\nКуди: …\nКоли: …\nБюджет до: … | Dobrý den, Aljono! Pohlídejte mi prosím cenu.\nKam: …\nKdy: …\nRozpočet do: … |
| Služba | Добрий день, Альоно! Мене цікавить: {послуга}.\nКуди: …\nКоли: … | Dobrý den, Aljono! Zajímá mě: {služba}.\nKam: …\nKdy: … |
| Doklady / víza | Добрий день, Альоно! Хочу перевірити документи перед поїздкою.\nКуди: …\nМій документ у Чехії: … | Dobrý den, Aljono! Chci si před cestou ověřit doklady.\nKam: …\nMůj pobyt v Česku: … |
| FAQ / blog / obecný dotaz | Добрий день, Альоно! У мене питання: | Dobrý den, Aljono! Mám otázku: |
| Po formuláři | Добрий день, Альоно! Пишу щодо запиту з сайту, номер: {id} | Dobrý den, Aljono! Píšu kvůli poptávce z webu, číslo: {id} |
| 404 / chyba | Добрий день, Альоно! Пишу з сайту — допоможете з туром? | Dobrý den, Aljono! Píšu z webu – pomůžete mi se zájezdem? |

---

## 10. Zakázané fráze a antivzory

### 10.1 Ukrajinsky (`uk`)

**Pozice (pravidlo klientky):**
- «з Праги», «Тури з Праги», «вильоти з Праги» jako titulek, hero, H1, title, meta title, kicker nebo razítko;
- «FROM PRAGUE»;
- «Чеська Республіка» v nadpisech.

**Neověřené a vymyšlené:**
- «Підтримка 24/7», «цілодобово», «ми завжди на зв’язку», «миттєво»;
- «Знижки до −40 %» a jakékoli % nespočítané z živých dat;
- «Понад 500 000 варіантів проживання», «Поліс за 10 хвилин онлайн», «Повний захист здоров’я в будь-якій країні»;
- «жили в більшості готелів, які пропонуємо», «Готелі, які ми перевірили особисто» (bez potvrzení);
- «з усіма великими чеськими туроператорами», «шукаю серед усіх CK»;
- «Підберу тур за 15 хвилин», «3 найкращі варіанти за 15 хвилин»;
- «гарантуємо найкращу ціну», «найкращі / найвигідніші ціни», «100 % актуальність цін», «гарантуємо» (kromě zákonného pojištění CK);
- «переможниця / переможці Starway», «нагорода Starway», nadpis «Нагороди», «стабільно в ТОПі», «лідер ринку»;
- «засновниця»;
- «Підбір безкоштовний», «Україномовні гіди», «оплачуєте нам… карткою», «трансфер до чеських аеропортів» (vše TODO(client));
- «щодня нові тури», «ціни оновлюємо щодня» (neověřená frekvence).

**Klišé a patos:**
- «незабутні враження / подорожі / відпочинок», «ваш ключ до незабутніх подорожей»;
- «ідеальний відпочинок», «відпустка мрії», «рай на землі», «райський куточок»;
- «залишить найтепліший слід у вашому серці», «Відчуйте справжню атмосферу люксового відпочинку», «люксовий відпочинок»;
- «Ваш надійний партнер у світі подорожей», «знак якості та надійності»;
- «Ваш комфорт — наш пріоритет», «Ваша приватність понад усе»;
- «Тотальна турбота», «Глибока експертність», «індивідуальний підхід», «преміальний сервіс»;
- «Туризм — це не професія, а стиль життя», «пристрасть»;
- «за неймовірними цінами», «найсмачніші варіанти», «соковиті ціни».

**Falešná naléhavost:**
- «Встигніть схопити!», «Не зволікайте!», «Тільки сьогодні», odpočty;
- «Валіза вже зібрана?» jako tlak.

**Úřednický styl, rusismy, kalky:**
- «здійснюємо», «надаємо послуги», «у разі», «з метою», «вищезазначений», «на основі офіційних договорів»;
- «Наши», «горящі / горячі тури», «відпуск», «по прильоту», «на протязі», «приймати участь», «получити», «являється», «співпадати», «вильот», «скидка», «підборка», «вартує»;
- «Будь-скільки»;
- «рекламний тур», «рекламник».

**Mluvení za „tým“:** «наш менеджер зв’яжеться з вами», «наша команда», «наші експерти».

**Válka a status:**
- «біженці», «статус біженця», «після всього пережитого», «попри війну», «ви заслужили після…»;
- «сидіти / жити на валізах», «пакуйте / збирайте валізи» (rozkaz);
- «до щасливого повернення додому», «рідною мовою».

**Tlačítka, která lžou:**
- «Купити», «Оплатити», «Забронювати й оплатити»;
- «Підписатися в Telegram» (žádný kanál neexistuje);
- «Отримати підбірку», «Отримати 3 готелі в Telegram»;
- «Детальніше», «Відкрити»;
- «Години роботи» (nejde o obchod).

**Prefilly:** «хотів(-ла)», «залишив(-ла)», «прочитав(-ла)».

**Typografie:**
- velké «Ви / Вам / Ваш» v textu webu;
- „!“ v nadpisu, víc než 2× „!“ na stránku;
- emoji v textech.

### 10.2 Česky (`cs`)

**Pozice:**
- „z Prahy“, „Zájezdy z Prahy“ jako titulek, hero, H1, title, meta, kicker nebo razítko;
- „FROM PRAGUE“;
- „Čechy / z Čech“ ve významu celé země;
- „ČR / Česká republika“ v nadpisech.

**Neověřené a vymyšlené:**
- „Podpora 24/7“, „nonstop“, „jsme stále k zastižení“, „okamžitě“;
- „Slevy až 40 %“ a jakékoli % nespočítané z dat;
- „Přes 500 000 možností ubytování“, „Pojistka online do 10 minut“, „Plná ochrana zdraví v jakékoli zemi“;
- „ve většině nabízených hotelů jsme sami bydleli“, „Hotely, které jsme osobně prověřili“ (bez potvrzení);
- „se všemi velkými CK“, „hledám u všech CK“;
- „Zájezd vyberu do 15 minut“, „3 nejlepší varianty do 15 minut“;
- „garance nejnižší ceny“, „nejlepší ceny“, „garantujeme“ (kromě zákonného pojištění CK);
- „vítězka / vítěz Starway“, nadpis „Ocenění“, „dlouhodobě patříme“, „nejlepší agentura“;
- „zakladatelka“;
- „Výběr zdarma“, „Ukrajinsky mluvící průvodci“, „nezávazná rezervace“ (vše TODO(client));
- „Každý den nové“, „Každý den sledujeme“.

**Klišé a patos:**
- „nezapomenutelné zážitky / cesty“, „zážitky na celý život“, „váš klíč k nezapomenutelným cestám“;
- „dovolená snů“, „vysněná / dokonalá dovolená“, „ráj na zemi“, „letovisko snů“, „Objevte kouzlo“;
- „Zažijte skutečnou atmosféru luxusní dovolené“, „luxusní dovolená“;
- „Váš spolehlivý partner pro cestování“, „synonymum kvality“;
- „Váš komfort je naše priorita“, „Vaše soukromí na prvním místě“;
- „individuální přístup“, „prvotřídní servis“, „péče od A do Z“, „vášeň“, „Cestovní ruch je můj život“;
- „za neuvěřitelné ceny“, „ulovili jsme ty nejchutnější varianty“, „šťavnaté slevy“.

**Falešná naléhavost:**
- „Stihněte to!“, „Neváhejte!“, „Jen dnes“, odpočty;
- „Kufr už je sbalený?“ jako tlak.

**Kalky a překladová čeština:**
- „Proč si vybrat nás?“, „Hluboká odbornost“, „Čestní účastníci prestižního ocenění“, „Ocenění jsou výsledkem neměnných zásad“;
- „Spolupracujeme jen s prověřenými… na základě oficiálních smluv“;
- „horké zájezdy“, „hot tours“, „tour / túra / balíček / paket“ pro zájezd;
- „touroperátor“;
- „exkurze“ pro výlety;
- „pojištění nevycestování“;
- „zdravotní pojištění“ pro cestovní pojištění;
- „brzká rezervace“;
- „licencované CK“;
- „v Telegramu“, „telegramem“.

**Právně špatně:** „cestovní kancelář Ananas Tour“ (jsme cestovní agentura).

**Mluvení za „tým“:** „náš tým“, „naši specialisté“, „náš operátor“.

**Rámec:**
- „Cestovní agentura pro Ukrajince v Česku“ jako hero kicker (vylučuje české čtenáře);
- „uprchlíci“ a válečné narážky.

**Tlačítka a štítky:**
- „Koupit“, „Zaplatit“;
- „Odebírat na Telegramu“;
- „Získat výběr“, „Získat 3 hotely na Telegramu“;
- „Více informací“, „Otevřít“;
- „Otevírací doba“ (nejde o obchod; místo toho „Kdy odpovídám“).

**Prefilly:** „chtěl(a)“, „poslal(a)“, „četl(a)“.

**Oslovení a typografie:**
- „Ahoj!“ spolu s vykáním;
- velké „Vy / Vám / Váš“ v textu webu;
- „!“ v nadpisu, víc než 1× „!“ na stránku;
- anglické uvozovky "…" místo „…“;
- emoji.

### 10.3 Antivzory (oba jazyky)

1. **Slib bez kvalifikátoru:** „15 minut“ bez «зазвичай / obvykle» a bez 9–21. Kvalifikátor patří přímo k slibu, ne do tooltipu.
2. **Vtip bez důkazu:** hříčka A·NA·NÁS bez navazující věty, co přesně je „na nás“.
3. **Dva vtipy na jedné obrazovce** nebo vtip v zóně bez vtipů (§0.6).
4. **Mrtvý konec:** prázdný stav nebo chyba bez cesty do Telegramu.
5. **Míchání osob v jednom bloku:** «я» + «Альона відповість» + «ми».
6. **Doslovný překlad,** který láme délku nebo zní jako kalk. Transkreuj.
7. **Letiště jako pozice:** výčet měst v leadu hero nebo v meta title. Patří do faktické linky.
8. **Štítky bez dat:** «Мало місць», «Ціну перевірено», «Альона тут була» jen když to říkají data.

---

## Příloha A: Rozhodnutí sporných bodů

| # | Spor | Rozhodnutí | Proč |
|---|---|---|---|
| 1 | Velká myšlenka: sladká a kyselá (konverze) × Moře bez nervů (publikum) × A·NA·NÁS (kreativa) × pichlavý a sladký (hlas) | **A·NA·NÁS** jako koncept. Pichlavé, sladké a kyselé splývají do „anatomie ananasu“ (manifest). „Moře bez nervů“ a „Česká jistota. Український сервіс.“ vypadly. | Jediný koncept, který je naše vlastní jméno a funguje nativně v obou jazycích. Ostatní nesou důkaz. |
| 2 | CTA v hero: „Підберіть мені тур“ × „Хочу на море“ | **Хочу на море / Chci k moři** | První osoba, ozvěna „Vaše moře“, 12 znaků. Služba „vyberu“ je hned v leadu. |
| 3 | „3 ГОТЕЛІ ЗА 15 ХВИЛИН*“ | **Zamítnuto.** H2 „ТРИ ГОТЕЛІ. НЕ СОТНІ.“, 15 minut jen jako doba odpovědi. | Výběr do 15 minut není pravda, odpověď do 15 minut ano. |
| 4 | Kdo mluví: já × my × Aljona | Já pro její činy, Aljona pro tlačítka a systém, my jen v hříčce, právních faktech a mašinérii. | Jeden člověk. Jméno v tlačítku buduje důvěru, první osoba v textu buduje blízkost. |
| 5 | Last minute H2: „ЗБИРАЙТЕ / ПАКУЙТЕ ВАЛІЗИ“ × „ЩЕ ГАРЯЧЕ“ × „ВИЛІТ НА ДНЯХ“ | **ЩЕ ГАРЯЧЕ / JEŠTĚ ŽHAVÉ** | Rozkaz „пакуйте валізи“ má v ukrajinštině konotaci vyhnání. „Ještě žhavé“ je čerstvé jako z pece. |
| 6 | Hero kicker: „для українців“ × osoba + jazyk | **Альона · тури українською / Aljona · česky i ukrajinsky** | Místo nese H1. „Pro Ukrajince“ vylučuje Čechy. |
| 7 | Doporučené hotely: „БАЧИЛА САМА“ × „ВИБІР АЛЬОНИ“ × „МІЙ ВИБІР“ | **ВИБІР АЛЬОНИ / ALJONIN VÝBĚR**. „Бачила сама“ jen s příznakem u hotelu. | Nelze tvrdit osobní inspekci plošně. |
| 8 | Závěrečné CTA: „КУДИ? КОЛИ? СКІЛЬКИ ВАС?“ × „МОРЕ ЧЕКАЄ. Я ТЕЖ.“ × hříčka | **МОРЕ ЧЕКАЄ. Я ТЕЖ.** „Kudy/Koly/Skilky“ jde na konec blogu a do prefillů. | Osobní a hřejivé. Hříčka už je na Proč my. |
| 9 | Inspekční cesta: «рекламний тур» × «інфотур» × «інспекційна» | **інспекційна поїздка / inspekční cesta** | „Рекламний“ zní jako reklama, „інфотур“ je žargon. |
| 10 | Poptávka: «заявка» × «запит» | **uk «запит» všude** (poptávka i «запит на бронювання»); **cs „poptávka“** (formulář) × „žádost o rezervaci“ (nabídka). | Jeden pojem na stránku a nic nezní jako nákup. |
| 11 | Čas: «за празьким» × «за чеським» | **«за чеським часом»**, jen na kontaktu. | Bez Prahy. |
| 12 | Callback submit: «Чекаю дзвінка» × «Передзвоніть мені» | **Передзвоніть мені / Zavolejte mi** | Tlačítko má říkat, co se stane. |
| 13 | Dotazová CTA (FAQ, nabídka, hotel, blog) | **Jedno: Запитати Альону / Zeptat se Aljony**. Výjimka: „Чому саме ці?“ | Méně popisků = víc rozpoznání. |
| 14 | Pill věta: „МИ ЛЮБИМО МОРЕ“ × „ОДИН ЧАТ → МОРЕ“ | **ОДИН · ЧАТ → МОРЕ** | Nese benefit, ne pocit. |
| 15 | Razítka anglicky × lokalizovaně | **Lokalizovaně.** Angličtina jen v ANANAS TOUR a LAST MINUTE. Hero: „ПЕРЕВІРЕНО АНАНАСОМ“. | Razítko má mluvit jazykem stránky a nést značku z Česka. |
| 16 | Kontakt H1: „Я НА ЗВ’ЯЗКУ“ × „ПИШІТЬ. ДЗВОНІТЬ.“ × „ПИШІТЬ, Я ТУТ“ | **ПИШІТЬ, Я ТУТ / PIŠTE, JSEM TU** | Apostrof v display sazbě nechceme. Telefon nese lead a karta. |
| 17 | Destinace index: „12 КРАЇН, 1 ЧАТ“ × „12 КРАЇН. ОДНА АЛЬОНА.“ | **12 КРАЇН. ОДНА АЛЬОНА.** „1 chat“ jde do kickeru na úvodu. | Prodává člověka a je zapamatovatelné. |
| 18 | Detail destinace H1: „ТУРИ ДО ЄГИПТУ“ × „ЄГИПЕТ / З ЧЕХІЇ“ × samotná země | **Samotný název země**, kicker „Тури з Чехії“, meta s «з Чехії». | Nejkratší display, pozice zůstává. |
| 19 | Uznání | «учасниця / účast», «неодноразово / opakovaně», «ще в Україні / ještě na Ukrajině», nadpis «Визнання / Uznání» | Přesně podle faktů. Češi tyto značky neznají. |
| 20 | Pobytový doklad: «посвідка» × «дозвіл» | **«дозвіл на проживання»** + «тимчасовий захист», obecně «документ про перебування в Чехії» | Jeden pojem, odpovídá „povolení k pobytu“. |
| 21 | Délkové limity: drafty se lišily (22–28 znaků H1/H2) | Page H1 ≤ 28, H2 ≤ 30, **rozhoduje slovo ≤ 9** | Šířku láme nejdelší slovo, ne součet. |
| 22 | Vykřičníky | uk ≤ 2, cs ≤ 1 na stránku, nikdy v nadpisu | Češi čtou „!“ jako laciný e-shop. |
| 23 | „Підбір безкоштовний / Výběr zdarma“, „nezávazně“ | **Nepoužívat do potvrzení.** Místo toho „Повідомлення ні до чого не зобов’язує / Zpráva vás k ničemu nezavazuje“. | Zpráva v chatu je zjevně nezávazná, cena služby není ověřená. |

## Příloha B: TODO(client): potvrdit před použitím

Do potvrzení tato tvrzení na webu **nepoužívat**:

- Výběr a konzultace zdarma? Cena stejná jako v katalogu CK, bez přirážky?
- Způsob platby: komu se platí, Kč nebo EUR, karta nebo převod?
- Hodiny 9–21 i o víkendech? (`site.ts` uvádí Пн–Нд.)
- Doba zpětného volání (jen pokud ji chceme slibovat).
- Které „doporučené“ hotely Aljona osobně viděla (příznak pro štítek „Альона тут була“)?
- Cestovní pojištění pro držitele dočasné ochrany.
- Ukrajinsky mluvící průvodci.
- Transfery na česká letiště.
- Je žádost o rezervaci právně nezávazná („nezávazná“)?
- Osobní schůzky (kde, zda vůbec).
- Smí se psát i hlasovou zprávou („можна голосовим / klidně i hlasovkou“)?
- Přesné znění FAQ o dokladech (6 měsíců platnosti pasu atd.) ověřit u aktuálních pravidel.
