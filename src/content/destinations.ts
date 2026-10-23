import type { Locale } from "@/i18n/config";
import { destinationGallery, destinationPhoto } from "@/content/ananas-photos";

/**
 * Destination guides (12 countries). Source: ananastour.com country pages,
 * adapted for Ukrainians living in Czechia — departures from PRG/BRQ/OSR/PED,
 * prices in CZK, payments in CZK/EUR.
 *
 * Entry/visa rules depend on citizenship and residence status (temporary
 * protection, residence permit…). We only give general guidance here; every
 * such claim is marked `TODO(client): verify`.
 */

export type Text = Record<Locale, string>;

export type Destination = {
  slug: string;
  name: Text;
  /** "до Туреччини" / "do Turecka" — for "tours to …" headings. */
  nameTo: Text;
  /** "у Туреччині" / "v Turecku" — for "holiday in …" phrases. */
  nameIn: Text;
  flag: string;
  heroImage: string;
  tagline: Text;
  teaser: Text;
  intro: Text;
  bestSeason: Text;
  flightTime: Text;
  /** Czech departure airports (IATA) typically served in season. */
  airports: string[];
  currency: Text;
  /** One-line entry note for the key-facts row. */
  entry: Text;
  regions: Array<{ title: Text; text: Text; image: string }>;
  money: Array<{ title: Text; text: Text }>;
  tips: Array<{ title: Text; text: Text }>;
  faq: Array<{ q: Text; a: Text }>;
  seo: { title: Text; description: Text };
};

const tx = (uk: string, cs: string): Text => ({ uk, cs });
const hero = (slug: string) => destinationPhoto(slug);
const img = (slug: string, i: number) => destinationGallery(slug)[i - 1] ?? destinationPhoto(slug);

// TODO(client): verify entry rules for Ukrainian citizens with temporary protection / residence permit in CZ.
const ENTRY_SCHENGEN = tx(
  "Шенген: біометричний паспорт + чинний документ про перебування в Чехії. Перевірю саме для вашої ситуації.",
  "Schengen: biometrický pas + platný doklad o pobytu v Česku. Ověřím pro vaši situaci.",
);
// TODO(client): verify — rules for non-Schengen countries depend on citizenship.
const ENTRY_CHECK = tx(
  "Залежить від громадянства. Перевірю саме для вашої ситуації.",
  "Záleží na občanství. Ověřím pro vaši situaci.",
);

const ALL_CZ = ["PRG", "BRQ", "OSR", "PED"];

export const destinations: Destination[] = [
  // ───────────────────────────── TURKEY
  {
    slug: "turkey",
    name: tx("Туреччина", "Turecko"),
    nameTo: tx("до Туреччини", "do Turecka"),
    nameIn: tx("у Туреччині", "v Turecku"),
    flag: "🇹🇷",
    heroImage: hero("turkey"),
    tagline: tx("Батьківщина all inclusive", "Domovina all inclusive"),
    teaser: tx(
      "Анталія, Кемер, Бодрум: сосни аж до пляжу, басейни з гірками й готелі на будь-який гаманець.",
      "Antalya, Kemer, Bodrum: borovice až k pláži, bazény s tobogány a hotely pro každou peněženku.",
    ),
    intro: tx(
      "Готелів тут тисячі, і на фото в усіх однаково блакитний басейн. Я підкажу, де справді пологий вхід у море, де анімація до ночі, а де тиша й сосни.",
      "Hotelů jsou tu tisíce a na fotkách mají všechny stejně modrý bazén. Řeknu vám, kde je opravdu pozvolný vstup do moře, kde jede animace do noci a kde je jen klid a borovice.",
    ),
    bestSeason: tx("травень\u2060–\u2060жовтень", "květen\u2060–\u2060říjen"),
    flightTime: tx("≈ 3 год з Праги", "cca 3 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    currency: tx("турецька ліра (TRY)", "turecká lira (TRY)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Анталія та Белек", "Antalya a Belek"),
        text: tx(
          "Белек — це сосни, гольф і великі готелі з власними аквапарками. Анталія — старе місто Калеїчі, шопінг і пляжі просто в місті.",
          "Belek, to jsou borovice, golf a velké hotely s vlastními aquaparky. V Antalyi čeká staré město Kaleiçi, nákupy a pláže přímo ve městě.",
        ),
        image: img("turkey", 1),
      },
      {
        title: tx("Кемер і Фетхіє", "Kemer a Fethiye"),
        text: tx(
          "Гори спускаються до самого моря, а вода тут прозора. У Фетхіє — лагуна Олюденіз, яку недарма називають «турецькими Мальдівами».",
          "Hory tu sahají až do moře a voda je jako sklo. U Fethiye leží laguna Ölüdeniz, které se ne náhodou říká „turecké Maledivy“.",
        ),
        image: img("turkey", 2),
      },
      {
        title: tx("Бодрум і Мармарис", "Bodrum a Marmaris"),
        text: tx(
          "Егейське узбережжя: білі будиночки, марини з яхтами й вечори, які не закінчуються о десятій. Мармарис — зелена бухта, де ліс підступає до самої води.",
          "Egejské pobřeží: bílé domky, přístavy plné jachet a večery, které v deset zdaleka nekončí. Marmaris je zelená zátoka, kde les sahá až k vodě.",
        ),
        image: img("turkey", 3),
      },
    ],
    money: [
      {
        title: tx("Ліри чи євро?", "Liry, nebo eura?"),
        text: tx(
          "Платять у лірах, але готелі й великі магазини охоче беруть євро. Тож везіть із Чехії євро (крони тут міняють невигідно), а на долмуші й базари — трохи лір.",
          "Platí se lirami, ale hotely a obchody rády vezmou i eura. Vezte si je z Česka – koruny se tu mění nevýhodně. Na dolmuše a bazary stačí pár lir.",
        ),
      },
      {
        title: tx("Де міняти гроші?", "Kde měnit peníze?"),
        text: tx(
          "Найкращий курс — в офіційних обмінниках Döviz у місті. В аеропорту він зазвичай найгірший, на ресепшені готелю — трохи кращий, але до міського не дотягує.",
          "Nejlepší kurz mají oficiální směnárny Döviz ve městě. Na letišti bývá nejhorší, na recepci hotelu o něco lepší, ale na městské směnárny nemá.",
        ),
      },
      {
        title: tx("Банківські картки", "Platební karty"),
        text: tx(
          "Visa й Mastercard чеських банків працюють майже скрізь. Термінал пропонує оплату в кронах чи євро? Обирайте ліри — курс буде чеснішим.",
          "Karty Visa i Mastercard od českých bank fungují skoro všude. Terminál nabízí platbu v korunách nebo eurech? Zvolte liry, vyjde to levněji.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Долмуші", "Dolmuše"),
        text: tx(
          "Маршрутки-долмуші — найпростіший спосіб дістатися до міста. Платять готівкою або транспортною карткою AntalyaKart чи MuğlaKart з автомата.",
          "Dolmuš, tedy minibus, je nejjednodušší cesta do města. Platí se hotově nebo kartou AntalyaKart či MuğlaKart, kterou koupíte v automatu.",
        ),
      },
      {
        title: tx("Розетки", "Zásuvky"),
        text: tx(
          "Як у Чехії: тип F, 230 В. Перехідник можна спокійно лишити вдома.",
          "Stejné jako v Česku: typ F, 230 V. Adaptér klidně nechte doma.",
        ),
      },
      {
        title: tx("Дрес-код", "Oblékání"),
        text: tx(
          "Поза готелем, а надто в мечеті, закривайте плечі й коліна. Хустку жінкам безкоштовно видадуть просто біля входу.",
          "Mimo hotel, a hlavně v mešitě, mějte zakrytá ramena a kolena. Šátek ženám zdarma půjčí přímo u vchodu.",
        ),
      },
      {
        title: tx("Якщо занедужали", "Když vám není dobře"),
        text: tx(
          "Спершу телефонуйте в асистанс-службу за номером зі страхового поліса: там скажуть, до якої клініки їхати, щоб не платити зі своєї кишені.",
          "Nejdřív volejte asistenční službu – číslo najdete na pojistce. Řeknou vám, na kterou kliniku jet, abyste nic neplatili ze svého.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Чим «ультра все включено» відрізняється від звичайного?", "Čím se liší ultra all inclusive od obyčejného?"),
        a: tx(
          "Зазвичай — імпортним алкоголем, їжею майже весь день і ресторанами à la carte без доплати. Звичайне «все включено» — це місцеві напої й основний ресторан за розкладом. Чи варто доплачувати саме у вашому готелі, скажу чесно.",
          "Obvykle dováženým alkoholem, jídlem skoro celý den a à la carte restauracemi bez příplatku. Obyčejné all inclusive znamená místní nápoje a hlavní restauraci podle rozpisu. Jestli se ve vašem hotelu vyplatí připlatit, řeknu vám na rovinu.",
        ),
      },
      {
        q: tx("Прилітаємо вранці, а заселення з 14:00. Що робити?", "Přiletíme ráno, ale pokoj je až od 14:00. Co s tím?"),
        a: tx(
          "Не чекати в лобі. Залиште валізи в камері схову, візьміть браслети — і на сніданок, до басейну чи на пляж. Про раннє заселення я попрошу готель заздалегідь, але все залежатиме від того, чи будуть вільні номери.",
          "V lobby rozhodně nečekejte. Kufry nechte v úschovně, vezměte si náramky a jděte na snídani, k bazénu nebo rovnou na pláž. O dřívější ubytování hotel předem požádám, záleží ale na tom, jestli bude volný pokoj.",
        ),
      },
      {
        q: tx("Чи пустять у готель Adults Only з підлітком?", "Pustí nás do hotelu Adults Only s teenagerem?"),
        a: tx(
          "Зазвичай ні. Такі готелі приймають гостей від 16 або від 18 років, і навіть дитині, якій «майже 16», можуть відмовити. Тому вікові обмеження я перевіряю ще до бронювання.",
          "Většinou ne. Tyhle hotely berou hosty od 16 nebo od 18 let a odmítnout můžou i dítě, kterému je „skoro 16“. Věková omezení proto ověřuji ještě před rezervací.",
        ),
      },
      {
        q: tx("Чи безпечно лишати цінні речі в номері?", "Můžu nechat cennosti na pokoji?"),
        a: tx(
          "Лише в сейфі. Кладіть туди паспорти, документ про перебування в Чехії, готівку й прикраси. У готелях 5★ сейф зазвичай безкоштовний, у простіших може коштувати кілька євро на добу.",
          "Jen v trezoru. Patří do něj pasy, doklad o pobytu v Česku, hotovost a šperky. V hotelech 5* bývá trezor zdarma, v jednodušších může stát pár eur na den.",
        ),
      },
      {
        q: tx("Брати ліки із собою чи купити на місці?", "Brát léky s sebou, nebo je koupit na místě?"),
        a: tx(
          "Ті, що приймаєте постійно, беріть із собою. Решту легко знайти в аптеках: шукайте червону літеру «E» і напис Eczane.",
          "Ty, které berete pravidelně, si vezměte s sebou. Zbytek seženete v lékárnách – hledejte červené „E“ a nápis Eczane.",
        ),
      },
      {
        q: tx("Як порозумітися без турецької й англійської?", "Jak se domluvit bez turečtiny a angličtiny?"),
        a: tx(
          "Легше, ніж здається. У курортних готелях персонал часто розуміє російську, а дехто — й українську. У місті вистачить базової англійської або перекладача в телефоні.",
          "Snáz, než se zdá. V letoviscích personál často rozumí rusky, někdo i ukrajinsky. Ve městě vystačíte se základní angličtinou nebo překladačem v telefonu.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Туреччини з Чехії — ціни в кронах", "Zájezdy do Turecka z Česka – ceny v Kč"),
      description: tx(
        "Тури до Туреччини з Чехії: Анталія, Белек, Кемер, Бодрум. Ціни в кронах, туроператори застраховані від банкрутства. Альона підбере вам 3 готелі.",
        "Zájezdy do Turecka z Česka: Antalya, Belek, Kemer, Bodrum. Ceny v Kč, české CK pojištěné proti úpadku. Aljona vám na Telegramu vybere 3 hotely.",
      ),
    },
  },
  // ───────────────────────────── EGYPT
  {
    slug: "egypt",
    name: tx("Єгипет", "Egypt"),
    nameTo: tx("до Єгипту", "do Egypta"),
    nameIn: tx("в Єгипті", "v Egyptě"),
    flag: "🇪🇬",
    heroImage: hero("egypt"),
    tagline: tx("Літо, яке працює взимку", "Léto, které maká i v zimě"),
    teaser: tx(
      "Хургада, Шарм, Марса-\u2060Алам: коралові рифи просто біля пляжу й тепло навіть у листопаді та лютому.",
      "Hurghada, Sharm, Marsa Alam: korálové útesy hned u pláže a teplo i v listopadu a v únoru.",
    ),
    intro: tx(
      "Коли в Чехії сіро й мокро, Червоне море лишається теплим, а рейси сюди є цілий рік. Головне — обрати правильну бухту: підкажу, де взимку менше вітру, а де найкращий риф.",
      "Když je v Česku šedivo a mokro, Rudé moře je pořád teplé – a létá se sem celý rok. Jde jen o to vybrat správnou zátoku: poradím, kde v zimě tolik nefouká a kde je nejhezčí útes.",
    ),
    bestSeason: tx("цілий рік, найкраще — жовтень\u2060–\u2060травень", "celoročně, nejlépe říjen\u2060–\u2060květen"),
    flightTime: tx("≈ 4,5 год з Праги", "cca 4,5 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    currency: tx("єгипетський фунт (EGP)", "egyptská libra (EGP)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Шарм-ель-Шейх", "Sharm El Sheikh"),
        text: tx(
          "Столиця снорклінгу й дайвінгу: рифи починаються одразу від понтона. Гори прикривають курорт від вітру, тож узимку тут затишніше.",
          "Mekka šnorchlařů i potápěčů: útes začíná hned za pontonem. Hory chrání letovisko před větrem, takže je tu v zimě příjemněji.",
        ),
        image: img("egypt", 1),
      },
      {
        title: tx("Хургада", "Hurghada"),
        text: tx(
          "Пологі піщані пляжі, аквапарки й анімація — добрий вибір для родин. А звідси найближче до храмів Луксора.",
          "Pozvolné písečné pláže, aquaparky a animace – dobrá volba pro rodiny. A odtud je to nejblíž k chrámům v Luxoru.",
        ),
        image: img("egypt", 2),
      },
      {
        title: tx("Марса-Алам", "Marsa Alam"),
        text: tx(
          "Тихий південь для тих, хто їде заради моря, а не дискотек. Тут можна поплавати поруч із черепахами, а якщо пощастить — і з дюгонем.",
          "Klidný jih pro ty, kdo jedou za mořem, ne za diskotékami. Můžete tu plavat se želvami, a když budete mít štěstí, i s dugongem.",
        ),
        image: img("egypt", 3),
      },
    ],
    money: [
      {
        title: tx("Долари чи євро?", "Dolary, nebo eura?"),
        text: tx(
          "Офіційна валюта — єгипетський фунт, але в туристичних зонах беруть долари й євро. Із Чехії везіть дрібні купюри нового зразка — на чайові й сувеніри.",
          "Oficiální měnou je egyptská libra, v turistických oblastech ale berou i dolary a eura. Z Česka si vezte drobné bankovky, ideálně nové – na spropitné a suvenýry.",
        ),
      },
      {
        title: tx("Обмін і розрахунки", "Směna a placení"),
        text: tx(
          "Невелику суму поміняйте на фунти: у супермаркетах ціни в місцевій валюті, тож на решті ви не втратите через курс.",
          "Menší částku si vyměňte na libry. V supermarketech jsou ceny v místní měně, takže při placení netratíte na kurzu.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify current visa rules for Ukrainian citizens / holders of CZ residence documents.
        title: tx("Віза", "Vízum"),
        text: tx(
          "Багатьом туристам візу оформлюють в аеропорту після прильоту, а для Шарму є штамп Sinai Only. Умови залежать від громадянства — перевірю ще до бронювання.",
          "Řada turistů dostane vízum po příletu na letišti a na samotný Sharm stačí razítko Sinai Only. Podmínky závisí na občanství – ověřím je ještě před rezervací.",
        ),
      },
      {
        title: tx("Корали — лише очима", "Korály jen očima"),
        text: tx(
          "Червоне море — заповідник. Не торкайтеся коралів і риб: можна поранитися, а ще за це штрафують.",
          "Rudé moře je přírodní rezervace. Korálů ani ryb se nedotýkejte: můžete se zranit a navíc hrozí pokuta.",
        ),
      },
      {
        title: tx("Вода", "Voda"),
        text: tx(
          "Воду з-під крана не пийте, і навіть зуби краще чистіть бутильованою — готелі зазвичай дають її безкоштовно.",
          "Vodu z kohoutku nepijte a i zuby si radši čistěte balenou – hotely ji obvykle dávají zdarma.",
        ),
      },
      {
        title: tx("Аптечка", "Lékárnička"),
        text: tx(
          "Мінімум — сонцезахисний крем і щось для шлунка. Решту купите в місцевій аптеці.",
          "Minimum: opalovací krém a něco na žaludek. Zbytek koupíte v místní lékárně.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Коли летіти до Єгипту, щоб не було сильного вітру?", "Kdy letět do Egypta, aby moc nefoukalo?"),
        a: tx(
          "Найспокійніше — поза груднем–березнем: тоді в Єгипті сезон вітрів. Якщо летите взимку, раджу Шарм-ель-Шейх із захищеними бухтами Наама-Бей чи Шарм-ель-Майя. У Хургаді взимку дме майже всюди — зате кайтсерферам там роздолля.",
          "Mimo prosinec až březen, kdy je v Egyptě větrná sezóna. Pokud letíte v zimě, doporučuji Sharm El Sheikh a jeho chráněné zátoky Naama Bay nebo Sharm El Maya. V Hurghadě v zimě fouká skoro všude – zato si tam přijdou na své kitesurfaři.",
        ),
      },
      {
        q: tx("Що таке вхід із понтона і чи потрібні коралки?", "Co je vstup z pontonu? A potřebujeme boty do vody?"),
        a: tx(
          "Це місток, з якого заходять у море одразу на глибину над рифом, — так влаштовано в багатьох готелях Шарму. А коралки потрібні: вони захищають ноги від коралів і морських їжаків.",
          "Ponton je molo, ze kterého se jde do moře rovnou do hloubky nad útesem – tak to má spousta hotelů v Sharmu. A boty do vody ano: chrání nohy před korály i ježovkami.",
        ),
      },
      {
        q: tx("Чи варто купувати місцеву SIM-картку?", "Vyplatí se místní SIM karta?"),
        a: tx(
          "Так. Готельний Wi-Fi часто ловить лише в лобі. Картку Orange чи Vodafone купите просто в аеропорту, великий пакет інтернету коштує приблизно 10–15 $.",
          "Ano. Hotelová Wi-Fi často funguje jen v lobby. Kartu Orange nebo Vodafone koupíte přímo na letišti, velký datový balíček stojí zhruba 10–15 $.",
        ),
      },
      {
        q: tx("Чи безпечно купатися в Червоному морі?", "Je koupání v Rudém moři bezpečné?"),
        a: tx(
          "Так, якщо дотримуватися простих правил. Не купайтеся на світанку й після заходу сонця, не запливайте далеко від рифу й не годуйте риб. У популярних готелях пляж стережуть рятувальники.",
          "Ano, když dodržíte pár jednoduchých pravidel. Nekoupejte se za svítání a po setmění, neplavte daleko od útesu a nekrmte ryby. V oblíbených hotelech pláž hlídají plavčíci.",
        ),
      },
      {
        q: tx("Луксор чи піраміди — що обрати?", "Luxor, nebo pyramidy – co vybrat?"),
        a: tx(
          "Залежить від того, де ваш готель. Луксор — це храми й гробниці фараонів, і найближче до нього з Хургади. Піраміди Гізи стоять біля Каїра, туди їдуть автобусом або летять літаком. Обидві поїздки забирають цілий день, тож плануйте їх заздалегідь.",
          "Záleží na tom, kde bydlíte. Luxor, to jsou chrámy a hrobky faraonů, a nejblíž to tam máte z Hurghady. Pyramidy v Gíze stojí u Káhiry, dostanete se k nim autobusem nebo letadlem. Oba výlety zaberou celý den, tak je plánujte dopředu.",
        ),
      },
      {
        q: tx("Чи продають алкоголь у звичайних магазинах?", "Dá se koupit alkohol v běžném obchodě?"),
        a: tx(
          "Зазвичай ні. Імпортні напої можна купити в Duty Free протягом кількох днів після прильоту, з паспортом. На «все включено» наливають місцеві напої.",
          "Většinou ne. Dovážený alkohol koupíte v Duty Free na pas, a to jen během pár dní po příletu. V rámci all inclusive se nalévají místní nápoje.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Єгипту з Чехії — ціни в кронах", "Zájezdy do Egypta z Česka – ceny v Kč"),
      description: tx(
        "Тури до Єгипту з Чехії цілий рік: Хургада, Шарм-ель-Шейх, Марса-Алам. Ціни в кронах, застраховані чеські туроператори. Альона підбере 3 готелі.",
        "Zájezdy do Egypta z Česka po celý rok: Hurghada, Sharm El Sheikh, Marsa Alam. Ceny v Kč, pojištěné české CK. Aljona vám vybere 3 hotely na míru.",
      ),
    },
  },
  // ───────────────────────────── GREECE
  {
    slug: "greece",
    name: tx("Греція", "Řecko"),
    nameTo: tx("до Греції", "do Řecka"),
    nameIn: tx("у Греції", "v Řecku"),
    flag: "🇬🇷",
    heroImage: hero("greece"),
    tagline: tx("Острови, оливки, тиша", "Ostrovy, olivy, klid"),
    teaser: tx(
      "Крит, Халкідікі, Родос, Санторіні: таверна біля води, фета з оливковою олією й море, прозоре до самого дна.",
      "Kréta, Chalkidiki, Rhodos, Santorini: taverna u vody, feta s olivovým olejem a moře průzračné až na dno.",
    ),
    intro: tx(
      "Греція — це щонайменше чотири різні відпустки: Крит, коли хочеться всього одразу, Халкідікі для сімей, Родос для історії, Санторіні для заходів сонця. Скажіть, яка з них ваша, — і я підберу готель.",
      "Řecko, to jsou nejmíň čtyři dovolené: Kréta, když chcete všechno najednou, Chalkidiki pro rodiny, Rhodos pro historii a Santorini pro západy slunce. Řekněte, která je ta vaše, a já k ní najdu hotel.",
    ),
    bestSeason: tx("травень\u2060–\u2060жовтень", "květen\u2060–\u2060říjen"),
    flightTime: tx("≈ 2,5–3 год з Праги", "cca 2,5–3 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Крит", "Kréta"),
        text: tx(
          "Найбільший острів Греції: Кносський палац, рожевий пісок Елафонісі й пляжі на будь-який смак — від міських до зовсім диких.",
          "Největší řecký ostrov: palác v Knóssu, růžový písek na Elafonisi a pláže pro každého – od městských po úplně divoké.",
        ),
        image: img("greece", 1),
      },
      {
        title: tx("Халкідікі", "Chalkidiki"),
        text: tx(
          "Півострів у формі тризуба: сосни до самої води, золотий пісок і спокійне море. Для сімей із дітьми — один із найкращих варіантів.",
          "Poloostrov ve tvaru trojzubce: borovice až k vodě, zlatý písek a klidné moře. Pro rodiny s dětmi jedna z nejjistějších sázek.",
        ),
        image: img("greece", 2),
      },
      {
        title: tx("Родос і Санторіні", "Rhodos a Santorini"),
        text: tx(
          "Родос — середньовічне місто лицарів і пляжі на два моря. Санторіні — білі будиночки на скелях і захід сонця, на який збирається пів острова.",
          "Rhodos: středověké město rytířů a pláže u dvou moří. Santorini: bílé domky na útesech a západ slunce, na který se schází půl ostrova.",
        ),
        image: img("greece", 3),
      },
    ],
    money: [
      {
        title: tx("Готівка чи картка?", "Hotově, nebo kartou?"),
        text: tx(
          "У готелях і супермаркетах картку беруть без питань, а в маленьких тавернах на островах краще мати готівку. Трохи євро зручно взяти ще з Чехії.",
          "V hotelech a supermarketech berou karty bez řečí, v malých tavernách na ostrovech se ale hodí hotovost. Pár eur si klidně vezměte už z Česka.",
        ),
      },
      {
        title: tx("Чайові в тавернах", "Dýško v taverně"),
        text: tx(
          "Зазвичай близько 10 % суми, якщо обслуговування не включено в рахунок.",
          "Obvykle kolem 10 %, pokud obsluha není započítaná v účtu.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify travel rules for temporary-protection holders.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Греція — у Шенгені: зазвичай досить біометричного паспорта й чинного документа про перебування в Чехії. Перевірю саме для вашої ситуації.",
          "Řecko je ve Schengenu: obvykle stačí biometrický pas a platný doklad o pobytu v Česku. Ověřím pro vaši situaci.",
        ),
      },
      {
        title: tx("Сієста", "Siesta"),
        text: tx(
          "З 14:00 до 17:00 багато крамниць зачинено. Саме час для холодного фраппе — так роблять і самі греки.",
          "Mezi 14. a 17. hodinou má spousta obchodů zavřeno. Ideální čas na ledové frappé – přesně tak to dělají i Řekové.",
        ),
      },
      {
        title: tx("Пороми й авто", "Trajekty a auto"),
        text: tx(
          "До диких пляжів найпростіше дістатися орендованим авто. Між островами ходять пороми й швидкісні катамарани.",
          "K divokým plážím se nejsnáz dostanete půjčeným autem. Mezi ostrovy pendlují trajekty a rychlé katamarány.",
        ),
      },
      {
        title: tx("Що скуштувати", "Co ochutnat"),
        text: tx(
          "Справжній грецький салат хоріатікі, мусаку й свіжі морепродукти в портовій таверні.",
          "Opravdový řecký salát choriatiki, musaku a čerstvé plody moře v taverně u přístavu.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Пляжі в Греції платні?", "Jsou pláže v Řecku placené?"),
        a: tx(
          "Ні, вхід на пляж вільний: усі пляжі належать державі. Платите лише за шезлонги й парасольку — приблизно 10–15 € за комплект. У деяких готелях вони вже в ціні, це я уточню під час бронювання.",
          "Ne. Všechny pláže jsou státní a vstup je volný. Platí se jen lehátka a slunečník, zhruba 10–15 € za dvě lehátka se slunečníkem. Některé hotely je mají v ceně – to ověřím při rezervaci.",
        ),
      },
      {
        q: tx("Як подорожувати між островами?", "Jak cestovat mezi ostrovy?"),
        a: tx(
          "Поромами або катамаранами. У липні й серпні квитки краще купувати заздалегідь. Простіший варіант — одноденна екскурсія з трансфером від готелю.",
          "Trajektem nebo katamaránem. V červenci a srpnu kupujte lístky předem. Nejjednodušší je jednodenní výlet s transferem z hotelu.",
        ),
      },
      {
        // TODO(client): verify driving licence rules for Ukrainian vs. exchanged Czech licences.
        q: tx("Чи потрібні міжнародні права для оренди авто?", "Potřebuju na půjčení auta mezinárodní řidičák?"),
        a: tx(
          "Залежить від посвідчення. Чеські права діють у всьому ЄС, а для українських вимоги прокатів різняться. Зазвичай водієві має бути щонайменше 21–23 роки, а стаж — від 1–2 років. Умови конкретного прокату перевірю.",
          "Záleží na průkazu. Český řidičák platí v celé EU, u ukrajinského se požadavky půjčoven liší. Řidiči musí být obvykle aspoň 21–23 let a mít 1–2 roky praxe. Podmínky konkrétní půjčovny ověřím.",
        ),
      },
      {
        q: tx("Де море найтепліше?", "Kde je nejteplejší moře?"),
        a: tx(
          "Егейське (Крит, Родос) прогрівається трохи раніше, але там вітряніше. Іонічне (Корфу, Закінф) — спокійніше. На скелястих ділянках бувають морські їжаки, тож коралки не завадять.",
          "Egejské moře (Kréta, Rhodos) se ohřeje o něco dřív, zato víc fouká. Jónské (Korfu, Zakynthos) je klidnější. Na skalnatých místech bývají ježovky, takže se hodí boty do vody.",
        ),
      },
      {
        q: tx("Що привезти з Греції?", "Co si přivézt z Řecka?"),
        a: tx(
          "Оливкову олію extra virgin, чебрецевий мед, фету й косметику з мастикою. А де купують самі греки, підкажу перед поїздкою.",
          "Olivový olej extra virgin, tymiánový med, fetu a kosmetiku s mastichou. A kde nakupují sami Řekové, prozradím před cestou.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Греції з Чехії — ціни в кронах", "Zájezdy do Řecka z Česka – ceny v Kč"),
      description: tx(
        "Тури до Греції з Чехії: Крит, Халкідікі, Родос, Санторіні. Ціни в кронах, вильоти з чотирьох аеропортів. Альона підбере вам острів і 3 готелі.",
        "Zájezdy do Řecka z Česka: Kréta, Chalkidiki, Rhodos, Santorini. Ceny v Kč, odlety ze čtyř letišť. Aljona vám vybere ostrov i 3 hotely na míru.",
      ),
    },
  },
  // ───────────────────────────── BULGARIA
  {
    slug: "bulgaria",
    name: tx("Болгарія", "Bulharsko"),
    nameTo: tx("до Болгарії", "do Bulharska"),
    nameIn: tx("у Болгарії", "v Bulharsku"),
    flag: "🇧🇬",
    heroImage: hero("bulgaria"),
    tagline: tx("Близько. Навіть автобусом", "Blízko. I autobusem"),
    teaser: tx(
      "Сонячний Берег, Золоті Піски, Несебр: пологий вхід у море для дітей і дорога хоч літаком, хоч автобусом.",
      "Slunečné pobřeží, Zlaté písky, Nesebar: pozvolný vstup do moře, jaký mají děti rády, a cesta letadlem, nebo klidně autobusem.",
    ),
    intro: tx(
      "Найближче море, до якого з Чехії можна й долетіти, і доїхати автобусом. Літаком до Бургаса чи Варни — близько двох годин, а на місці — ситна кухня й помірні ціни.",
      "Nejbližší moře, kam se z Česka dá letět i dojet autobusem. Do Burgasu nebo Varny letíte zhruba dvě hodiny a na místě čeká vydatná kuchyně a příjemné ceny.",
    ),
    bestSeason: tx("червень\u2060–\u2060вересень", "červen\u2060–\u2060září"),
    flightTime: tx("≈ 2 год з Праги", "cca 2 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    // TODO(client): verify — Bulgaria adopted the euro on 1 Jan 2026.
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Золоті Піски", "Zlaté písky"),
        text: tx(
          "Широкі пляжі, водні розваги й вечори, які плавно переходять у ніч. Для тих, хто приїхав не висипатися.",
          "Široké pláže, vodní radovánky a večery, které plynule přecházejí v noc. Pro ty, kdo sem nepřijeli spát.",
        ),
        image: img("bulgaria", 1),
      },
      {
        title: tx("Сонячний Берег", "Slunečné pobřeží"),
        text: tx(
          "Найбільший курорт країни: дюни, чисте море, пологий вхід і аквапарки. Із дітьми — саме сюди.",
          "Největší letovisko v zemi: duny, čisté moře, pozvolný vstup a aquaparky. S dětmi rovnou sem.",
        ),
        image: img("bulgaria", 2),
      },
      {
        title: tx("Старий Несебр", "Starý Nesebar"),
        text: tx(
          "Місто-музей під охороною ЮНЕСКО: бруківка, середньовічні церкви й рибні ресторанчики біля самої води.",
          "Město-muzeum pod ochranou UNESCO: dlážděné uličky, středověké kostely a rybí restaurace přímo u vody.",
        ),
        image: img("bulgaria", 3),
      },
    ],
    money: [
      {
        // TODO(client): verify — euro since 1 Jan 2026; lev may still appear on some price tags.
        title: tx("Валюта", "Měna"),
        text: tx(
          "З 2026 року в Болгарії платять в євро. Крони тут міняють невигідно, тож беріть євро з Чехії або платіть карткою.",
          "Od roku 2026 se v Bulharsku platí eurem. Koruny se tu mění nevýhodně, takže si eura vezměte z Česka, nebo plaťte kartou.",
        ),
      },
      {
        title: tx("Картка чи готівка?", "Kartou, nebo hotově?"),
        text: tx(
          "Болгарія — одна з найдоступніших країн Європи. Карткою платять майже скрізь, а на ринок і до маленьких яток візьміть трохи готівки.",
          "Bulharsko patří k nejlevnějším zemím Evropy. Kartou zaplatíte skoro všude, na trhy a ke stánkům si ale vezměte trochu hotovosti.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify travel rules for temporary-protection holders.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Болгарія — у Шенгені: зазвичай досить біометричного паспорта й чинного документа про перебування в Чехії. Перевірю саме для вашої ситуації.",
          "Bulharsko je ve Schengenu: obvykle stačí biometrický pas a platný doklad o pobytu v Česku. Ověřím pro vaši situaci.",
        ),
      },
      {
        title: tx("Кивок означає «ні»", "Kývnutí znamená ne"),
        text: tx(
          "Болгари часто кивають, коли кажуть «ні», і хитають головою, коли «так». Щоб не заплутатися, перепитуйте словами: «да» чи «не».",
          "Kývnutí tu často znamená „ne“ a vrtění hlavou „ano“. Abyste se nezamotali, nechte si odpovědět slovy: „da“, nebo „ne“.",
        ),
      },
      {
        title: tx("Термальні басейни", "Termální bazény"),
        text: tx(
          "Море можна поєднати з оздоровленням: на курорті Святі Костянтин і Олена термальна вода надходить просто в готельні басейни.",
          "K moři si můžete přibalit i lázně: v letovisku Sv. Konstantin a Elena teče termální voda přímo do hotelových bazénů.",
        ),
      },
      {
        title: tx("Смаки Болгарії", "Chutě Bulharska"),
        text: tx(
          "Шопський салат, баніца з бринзою, каварма й місцеве вино. Ситно, недорого — і дуже схоже на домашнє.",
          "Šopský salát, banica se sýrem, kavarma a místní víno. Vydatné, levné a skoro jako od mámy.",
        ),
      },
    ],
    faq: [
      {
        // TODO(client): verify bus tour duration and availability from CZ.
        q: tx("Скільки їхати автобусом із Чехії?", "Jak dlouho se jede autobusem z Česka?"),
        a: tx(
          "Близько доби. Це найбюджетніший спосіб дістатися моря, але якщо шкода часу, підберу авіатур із найближчого до вас аеропорту.",
          "Zhruba 24 hodin. Je to nejlevnější cesta k moři, ale pokud je vám líto času, vyberu letecký zájezd z letiště, které máte nejblíž.",
        ),
      },
      {
        q: tx("Можна на пляж зі своєю парасолькою?", "Můžu na pláž s vlastním slunečníkem?"),
        a: tx(
          "Так. На пляжах є платні зони з шезлонгами й вільні, де можна безкоштовно розкластися зі своїм рушником і парасолькою.",
          "Ano. Pláže se dělí na placené zóny s lehátky a volné, kde se zdarma rozložíte s vlastním ručníkem i slunečníkem.",
        ),
      },
      {
        q: tx("Брати «все включено» чи харчуватися в місті?", "Vzít all inclusive, nebo jíst ve městě?"),
        a: tx(
          "Часто вигідніше брати лише сніданки. У механах — болгарських корчмах — ціни помірні, а порції такі, що вечеря легко замінить і обід.",
          "Často se vyplatí vzít jen snídaně. V mehanách, bulharských hospůdkách, jsou ceny příznivé a porce tak velké, že vám večeře klidně nahradí i oběd.",
        ),
      },
      {
        q: tx("Де знайти термальні джерела біля моря?", "Kde najdu termální prameny u moře?"),
        a: tx(
          "На курортах Святі Костянтин і Олена та Сонячний День: там багато готелів наповнює басейни термальною водою.",
          "V letoviscích Sunny Day a Sv. Konstantin a Elena. Spousta hotelů tam napouští bazény termální vodou.",
        ),
      },
      {
        q: tx("Чи приймають у Болгарії крони?", "Berou v Bulharsku koruny?"),
        a: tx(
          "Ні, тут платять в євро. Найпростіше — картка чеського банку або готівкові євро, які ви взяли з Чехії.",
          "Ne, platí se eurem. Nejjednodušší je karta české banky nebo hotovost v eurech, kterou si přivezete z Česka.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Болгарії з Чехії літаком і автобусом", "Zájezdy do Bulharska z Česka – i autobusem"),
      description: tx(
        "Тури до Болгарії з Чехії літаком або автобусом: Сонячний Берег, Золоті Піски, Несебр. Ціни в кронах. Альона підбере 3 готелі для вашої родини.",
        "Zájezdy do Bulharska z Česka letecky i autobusem: Slunečné pobřeží, Zlaté písky, Nesebar. Ceny v Kč. Aljona vám vybere 3 hotely pro celou rodinu.",
      ),
    },
  },
  // ───────────────────────────── UAE
  {
    slug: "uae",
    name: tx("ОАЕ", "SAE"),
    nameTo: tx("до ОАЕ", "do SAE"),
    nameIn: tx("в ОАЕ", "v SAE"),
    flag: "🇦🇪",
    heroImage: hero("uae"),
    tagline: tx("Пляж зранку, Дубай увечері", "Ráno pláž, večer mrakodrapy"),
    teaser: tx(
      "Дубай, Абу-\u2060Дабі, Рас-\u2060ель-\u2060Хайма: зимове сонце, пляжі просто в місті й хмарочоси, на які дивитеся з басейну.",
      "Dubaj, Abú Dhabí, Ras Al Khaimah: zimní slunce, pláže přímo ve městě a mrakodrapy, na které koukáte z bazénu.",
    ),
    intro: tx(
      "Емірати — найкоротший шлях від чеського листопада до літа: прямий переліт, а з жовтня до квітня — тепло без сорокаградусної спеки. Підкажу, де жити: у Дубаї, спокійному Абу-Дабі чи в Рас-ель-Хаймі.",
      "Emiráty jsou nejkratší cesta z českého listopadu do léta: přímý let a od října do dubna teplo bez čtyřicetistupňových veder. Poradím, kde bydlet: v Dubaji, v klidném Abú Dhabí, nebo v Ras Al Khaimah.",
    ),
    bestSeason: tx("жовтень\u2060–\u2060квітень", "říjen\u2060–\u2060duben"),
    flightTime: tx("≈ 6 год з Праги", "cca 6 h z Prahy"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("дирхам ОАЕ (AED)", "dirham SAE (AED)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Дубай", "Dubaj"),
        text: tx(
          "Бурдж-Халіфа, Пальма Джумейра, величезні моли й пляжі посеред міста. Для тих, хто хоче побачити все й одразу — і ще встигнути на захід сонця.",
          "Burj Khalifa, Palm Jumeirah, obří nákupní centra a pláže uprostřed města. Pro ty, kdo chtějí vidět všechno najednou – a ještě stihnout západ slunce.",
        ),
        image: img("uae", 1),
      },
      {
        title: tx("Абу-Дабі", "Abú Dhabí"),
        text: tx(
          "Столиця, спокійніша й величніша за Дубай: мечеть шейха Заїда, Лувр Абу-Дабі та острів Яс із Ferrari World, трасою Формули-1 й аквапарками.",
          "Hlavní město, klidnější a vznešenější než Dubaj: mešita šejcha Zajída, Louvre Abú Dhabí a ostrov Yas s Ferrari World, okruhem F1 a aquaparky.",
        ),
        image: img("uae", 2),
      },
      {
        title: tx("Рас-ель-Хайма", "Ras Al Khaimah"),
        text: tx(
          "Широкі пляжі, гори Хаджар і готелі «все включено» — часто вигідніше, ніж у Дубаї. Сюди їдуть відпочивати, а не бігати.",
          "Široké pláže, pohoří Hadžar a hotely s all inclusive, často výhodněji než v Dubaji. Sem se jezdí odpočívat, ne běhat po památkách.",
        ),
        image: img("uae", 3),
      },
    ],
    money: [
      {
        title: tx("Готівка чи картка?", "Hotově, nebo kartou?"),
        text: tx(
          "Дирхам прив’язаний до долара, тож курс стабільний. Картки беруть майже скрізь — від бутиків до таксі, а готівка знадобиться на чайові й традиційні ринки.",
          "Dirham je navázaný na dolar, takže je kurz stabilní. Karty berou skoro všude, od butiků po taxi, hotovost se hodí na spropitné a tradiční trhy (súky).",
        ),
      },
      {
        title: tx("Де міняти гроші?", "Kde měnit peníze?"),
        text: tx(
          "Євро й долари вигідніше міняти в обмінниках (Exchange) у торгових центрах, ніж у готелі чи в аеропорту.",
          "Eura a dolary se vyplatí měnit ve směnárnách (Exchange) v nákupních centrech, ne v hotelu ani na letišti.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Дрес-код", "Oblékání"),
        text: tx(
          "Емірати — мусульманська країна. У молах і держустановах обирайте закритий одяг; у готелі та на пляжі правила вільніші.",
          "Emiráty jsou muslimská země. Do nákupních center a na úřady volte zakryté oblečení, v hotelu a na pláži jsou pravidla volnější.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Офіційні таксі з лічильником, метро в Дубаї або авто напрокат. Між Абу-Дабі й Дубаєм ходять зручні автобуси.",
          "Oficiální taxi s taxametrem, metro v Dubaji nebo půjčené auto. Mezi Abú Dhabí a Dubají jezdí pohodlné autobusy.",
        ),
      },
      {
        title: tx("Що скуштувати", "Co ochutnat"),
        text: tx(
          "Арабську каву з кардамоном і фініки до неї, хумус і морепродукти за місцевими рецептами.",
          "Arabskou kávu s kardamomem a k ní datle, hummus a mořské plody na místní způsob.",
        ),
      },
      {
        title: tx("А влітку?", "A v létě?"),
        text: tx(
          "Влітку понад 40 °C, зате готелі помітно дешевші. Якщо басейн і кондиціонер вам миліші за прогулянки — чому б і ні.",
          "V létě bývá přes 40 °C, zato jsou hotely znatelně levnější. Pokud máte radši bazén a klimatizaci než procházky, proč ne.",
        ),
      },
    ],
    faq: [
      {
        // TODO(client): verify current tourism fee amounts per emirate.
        q: tx("Що таке туристичний збір Tourism Dirham?", "Co je turistický poplatek Tourism Dirham?"),
        a: tx(
          "Це обов’язковий збір за кожну ніч у номері. Його розмір залежить від емірату й категорії готелю, а сплачують його на місці — під час заселення чи виїзду, готівкою або карткою.",
          "Je to povinný poplatek za každou noc a pokoj. Výše závisí na emirátu a kategorii hotelu, platí se na místě při příjezdu nebo odjezdu, hotově nebo kartou.",
        ),
      },
      {
        q: tx("Де можна купити алкоголь?", "Kde se dá koupit alkohol?"),
        a: tx(
          "У ресторанах і барах готелів із ліцензією. Пити на вулиці чи на пляжі суворо заборонено.",
          "V hotelových restauracích a barech s licencí. Pít na ulici nebo na pláži je přísně zakázané.",
        ),
      },
      {
        q: tx("Чи вигідні комбіновані квитки до парків на острові Яс?", "Vyplatí se kombinované vstupenky do parků na ostrově Yas?"),
        a: tx(
          "Так, якщо плануєте відвідати кілька парків. Для Ferrari World, Warner Bros. World і Yas Waterworld беріть Multi-Park Ticket на 2–3 дні. Квитки допоможу забронювати заздалегідь.",
          "Ano, pokud plánujete víc než jeden park. Na Ferrari World, Warner Bros. World a Yas Waterworld si vezměte Multi-Park Ticket na 2–3 dny. Vstupenky vám pomůžu rezervovat předem.",
        ),
      },
      {
        q: tx("Як одягатися жінкам у місті?", "Jak se mají ženy oblékat ve městě?"),
        a: tx(
          "У молах і на набережній — так, щоб плечі й коліна були закриті. У готелі — як завгодно. У Великій мечеті шейха Заїда абаю видадуть просто біля входу.",
          "V obchodních centrech a na nábřeží tak, aby byla zakrytá ramena a kolena. V hotelu jak chcete. Ve Velké mešitě šejcha Zajída vám abáju půjčí přímo u vchodu.",
        ),
      },
      {
        q: tx("Чи варто летіти під час Рамадану?", "Vyplatí se letět během ramadánu?"),
        a: tx(
          "Так, якщо вас не бентежить інший ритм. Готелі часто дешевші, а вечори з іфтарами мають свою атмосферу. Удень на людях не можна їсти й пити, і частина ресторанів поза готелями зачинена.",
          "Ano, pokud vám nevadí jiný rytmus. Hotely bývají levnější a večery s iftarem mají svou atmosféru. Přes den se na veřejnosti nesmí jíst ani pít a část restaurací mimo hotely je zavřená.",
        ),
      },
      {
        q: tx("Чому готель просить депозит під час заселення?", "Proč po mně hotel při příjezdu chce kauci?"),
        a: tx(
          "Так готель страхується на випадок додаткових витрат. Більшість готелів 5★ блокує суму на картці або бере готівку. Можу заздалегідь попросити прибрати міні-бар, щоб депозит був меншим.",
          "Hotel se tak jistí pro případ, že využijete placené služby. Většina hotelů 5* zablokuje částku na kartě nebo vybere hotovost. Můžu předem požádat o vyklizení minibaru, kauce pak bývá nižší.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до ОАЕ з Чехії — ціни в кронах", "Zájezdy do SAE z Česka – ceny v Kč"),
      description: tx(
        "Тури до ОАЕ з Чехії прямим рейсом: Дубай, Абу-Дабі, Рас-ель-Хайма. Ціни в кронах, тури чеських туроператорів. Альона підбере 3 готелі для вас.",
        "Zájezdy do SAE z Česka s přímým letem: Dubaj, Abú Dhabí, Ras Al Khaimah. Ceny v Kč, pojištěné české CK. Aljona vám na Telegramu vybere 3 hotely.",
      ),
    },
  },
  // ───────────────────────────── MALDIVES
  {
    slug: "maldives",
    name: tx("Мальдіви", "Maledivy"),
    nameTo: tx("на Мальдіви", "na Maledivy"),
    nameIn: tx("на Мальдівах", "na Maledivách"),
    flag: "🇲🇻",
    heroImage: hero("maldives"),
    tagline: tx("Вілла над водою — і все", "Vila nad vodou. Víc netřeba"),
    teaser: tx(
      "Риф просто під сходами вашої вілли й тиша, у якій чути лише океан. Для медового місяця — або щоб нарешті вимкнути телефон.",
      "Útes hned pod schůdky vaší vily a ticho, ve kterém je slyšet jen oceán. Na líbánky – nebo abyste konečně vypnuli telefon.",
    ),
    intro: tx(
      "Тут один острів — один готель, тож від вибору острова залежить усе: риф, пляж, трансфер і ціна вечері. Я порівняю резорти й гестхауси в межах вашого бюджету й продумаю зручний переліт.",
      "Tady platí: jeden ostrov, jeden hotel. Na výběru ostrova proto závisí všechno – útes, pláž, transfer i cena večeře. Porovnám hotely i menší penziony podle vašeho rozpočtu a vymyslím pohodlný let.",
    ),
    bestSeason: tx("листопад\u2060–\u2060квітень", "listopad\u2060–\u2060duben"),
    flightTime: tx("≈ 10–12 год (з пересадкою або чартером)", "cca 10–12 h (s přestupem nebo charterem)"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("руфія (MVR), на курортах — USD", "maledivská rupie (MVR), v hotelech USD"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Острови-резорти", "Hotelové ostrovy"),
        text: tx(
          "Класичні Мальдіви: на острові лише ваш готель, бунгало над водою й часто власний риф за кілька кроків від номера.",
          "Klasické Maledivy: na ostrově jen váš hotel, bungalovy nad vodou a často vlastní útes pár kroků od pokoje.",
        ),
        image: img("maldives", 1),
      },
      {
        title: tx("Локальні острови", "Místní ostrovy"),
        text: tx(
          "Гестхауси на Маафуші, Тулусду чи Тодду: дешевше, простіше й ближче до справжнього мальдівського життя.",
          "Penziony na Maafushi, Thulusdhoo nebo Thoddoo: levněji, jednodušeji a blíž opravdovému maledivskému životu.",
        ),
        image: img("maldives", 2),
      },
      {
        title: tx("Під водою", "Pod hladinou"),
        text: tx(
          "Коралові сади, манти, китові акули й зграї яскравих риб — часто просто біля берега готелю.",
          "Korálové zahrady, manty, žraloci velrybí a hejna barevných ryb – často přímo u břehu hotelu.",
        ),
        image: img("maldives", 3),
      },
    ],
    money: [
      {
        title: tx("Долари й картки", "Dolary a karty"),
        text: tx(
          "На курортах платять доларами або міжнародною карткою, руфія майже не знадобиться. На чайові візьміть дрібні купюри.",
          "V hotelech se platí dolary nebo kartou, rupie skoro nebudete potřebovat. Na spropitné si vezměte drobné bankovky.",
        ),
      },
      {
        // TODO(client): verify current TGST rate.
        title: tx("Як тут рахують", "Jak se tu platí"),
        text: tx(
          "Усе записують на номер, а рахунок оплачують перед виїздом. До цін у меню часто додають податок TGST і сервісний збір — це позначка «++».",
          "Všechno se píše na pokoj a účet se platí před odjezdem. K cenám v menu se často připočítává daň TGST a servisní poplatek – to je ta značka „++“.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Трансфер", "Transfer"),
        text: tx(
          "До острова — швидкісним катером, гідролітаком або внутрішнім рейсом. А переліт гідролітаком — це ще й маленька екскурсія з видом на атоли.",
          "Na ostrov vás doveze rychlý člun, hydroplán nebo vnitrostátní let. Let hydroplánem je malý výlet sám o sobě – s výhledem na atoly.",
        ),
      },
      {
        title: tx("Культура", "Kultura"),
        text: tx(
          "Мальдіви — мусульманська країна. Алкоголь — лише на островах-резортах, а на локальних островах поза «бікіні-пляжами» діє дрес-код.",
          "Maledivy jsou muslimská země. Alkohol dostanete jen na hotelových ostrovech a na místních ostrovech platí mimo „bikini pláže“ pravidla oblékání.",
        ),
      },
      {
        title: tx("Мушлі — не сувенір", "Mušle nejsou suvenýr"),
        text: tx(
          "Вивозити корали, мушлі й пісок суворо заборонено. Сфотографуйте — і нехай лишаються там, де вони вдома.",
          "Vyvážet korály, mušle a písek je přísně zakázané. Vyfoťte si je a nechte je tam, kde jsou doma.",
        ),
      },
      {
        title: tx("Коли їхати", "Kdy jet"),
        text: tx(
          "Найкраще — з листопада до квітня. Улітку — серфінг і спокійний відпочинок за нижчими цінами.",
          "Nejlépe od listopadu do dubna. Léto patří surfařům a těm, kdo chtějí klid za nižší ceny.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Можна привезти алкоголь із Duty Free?", "Můžu si přivézt alkohol z Duty Free?"),
        a: tx(
          "Ні. Ввозити алкоголь заборонено: пляшки заберуть на митниці й повернуть лише перед вильотом. На островах-резортах алкоголь продають у барах.",
          "Ne. Dovoz alkoholu je zakázaný: lahve vám na celnici zabaví a vrátí až při odletu. Na hotelových ostrovech se alkohol prodává v barech.",
        ),
      },
      {
        q: tx("Що робити, якщо рейс прилітає пізно ввечері?", "Co když přiletíme pozdě večer?"),
        a: tx(
          "Залежить від трансферу. Гідролітаки літають лише вдень, тож із пізнім рейсом доведеться переночувати біля аеропорту Мале. Катери ходять і ввечері — якщо острів недалеко. Це я врахую ще під час вибору рейсу.",
          "Záleží na transferu. Hydroplány létají jen za světla, takže s pozdním letem přespíte u letiště v Malé. Čluny jezdí i večer, pokud ostrov není daleko. S tím počítám už při výběru letu.",
        ),
      },
      {
        q: tx("Що означає «++» у рахунку?", "Co znamená „++“ na účtu?"),
        a: tx(
          "Це означає, що до ціни додадуть податок TGST і 10 % сервісного збору. Тому я часто раджу «все включено»: ці витрати там уже враховані.",
          "Že se k ceně přičte daň TGST a 10% servisní poplatek. Proto často doporučuji all inclusive – tyhle náklady už jsou v ceně.",
        ),
      },
      {
        q: tx("Чи дорого харчуватися, якщо в нас лише сніданки?", "Vyjde jídlo draho, když máme jen snídaně?"),
        a: tx(
          "Так. Продукти тут привізні, тож обід може коштувати 50–100 $ на людину. Щоб бюджет не розповзався, раджу повний пансіон або «все включено».",
          "Ano. Potraviny se sem dovážejí, takže oběd může stát 50–100 $ na osobu. Aby se rozpočet nerozutekl, doporučuji plnou penzi nebo all inclusive.",
        ),
      },
      {
        q: tx("Чи безпечно плавати на домашньому рифі?", "Je bezpečné šnorchlovat na domácím útesu?"),
        a: tx(
          "Загалом так, але стежте за течіями й не запливайте за риф наодинці. Рифові акули для людей безпечні; головна небезпека — гострі корали й екваторіальне сонце.",
          "Obecně ano, ale sledujte proudy a za útes sami neplavte. Útesoví žraloci jsou pro lidi neškodní, hlavním nebezpečím jsou ostré korály a rovníkové slunce.",
        ),
      },
      {
        q: tx("Можна взяти із собою дрон?", "Můžu si vzít dron?"),
        a: tx(
          "Не всюди. Більшість преміальних резортів забороняє дрони, щоб берегти приватність гостей, тож правила вашого готелю я перевірю заздалегідь.",
          "Ne všude. Většina dražších hotelů drony kvůli soukromí hostů zakazuje, pravidla toho vašeho proto ověřím předem.",
        ),
      },
    ],
    seo: {
      title: tx("Тури на Мальдіви з Чехії — ціни в кронах", "Zájezdy na Maledivy z Česka – ceny v Kč"),
      description: tx(
        "Тури на Мальдіви з Чехії: острови-резорти, вілли над водою, локальні острови. Ціни в кронах, зручний переліт. Альона підбере 3 готелі на ваш бюджет.",
        "Zájezdy na Maledivy z Česka: vily nad vodou, hotelové i levnější místní ostrovy. Ceny v Kč, pohodlný let. Aljona vám vybere 3 hotely podle rozpočtu.",
      ),
    },
  },
  // ───────────────────────────── VIETNAM
  {
    slug: "vietnam",
    name: tx("В’єтнам", "Vietnam"),
    nameTo: tx("до В’єтнаму", "do Vietnamu"),
    nameIn: tx("у В’єтнамі", "ve Vietnamu"),
    flag: "🇻🇳",
    heroImage: hero("vietnam"),
    tagline: tx("Екзотика без поспіху", "Exotika bez spěchu"),
    teaser: tx(
      "Нячанг: білий пісок, канатна дорога над морем до Vinpearl, грязьові ванни й фо, яке смакує інакше, ніж у Чехії.",
      "Nha Trang: bílý písek, lanovka nad mořem na Vinpearl, bahenní koupele a phở, které chutná jinak než v Česku.",
    ),
    intro: tx(
      "Фо ви, найпевніше, вже куштували — в’єтнамська громада в Чехії велика. Але на батьківщині воно ще смачніше, а до нього — море Нячангу, пагоди й неспішний ритм, який швидко стає вашим.",
      "Phở jste v Česku nejspíš už ochutnali – vietnamská komunita je tu velká. Ve Vietnamu ale chutná ještě líp a k tomu moře v Nha Trangu, pagody a pomalý rytmus, kterému rychle propadnete.",
    ),
    bestSeason: tx("лютий\u2060–\u2060вересень (Нячанг)", "únor\u2060–\u2060září (Nha Trang)"),
    flightTime: tx("≈ 12–15 год з пересадкою", "cca 12–15 h s přestupem"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("в’єтнамський донг (VND)", "vietnamský dong (VND)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Пляжі й Vinpearl", "Pláže a Vinpearl"),
        text: tx(
          "Кілометри білого піску вздовж набережної й острів розваг Vinpearl, куди веде одна з найдовших канатних доріг над морем.",
          "Kilometry bílého písku podél promenády a zábavní ostrov Vinpearl, kam vede jedna z nejdelších lanovek nad mořem.",
        ),
        image: img("vietnam", 1),
      },
      {
        title: tx("Джерела й грязі", "Prameny a bahno"),
        text: tx(
          "Термальні джерела й грязьові ванни: пів дня — і ви як після відпустки, хоча відпустка ще триває.",
          "Termální prameny a bahenní koupele: půl dne a cítíte se jako po dovolené – přitom ta pořád běží.",
        ),
        image: img("vietnam", 2),
      },
      {
        title: tx("Що на тарілці", "Co na talíři"),
        text: tx(
          "Фо на сніданок, в’єтнамська кава зі згущеним молоком, а ввечері — лобстери на грилі. Для вас екзотика, для Нячангу — звичайний день.",
          "Ráno phở, k tomu vietnamská káva s kondenzovaným mlékem a večer humři z grilu. Pro vás exotika, pro Nha Trang obyčejný den.",
        ),
        image: img("vietnam", 3),
      },
    ],
    money: [
      {
        title: tx("Долари на донги", "Dolary na dongy"),
        text: tx(
          "Готівкові долари чи євро найвигідніше міняти в банках або ювелірних крамницях. За нові купюри великого номіналу дають кращий курс.",
          "Hotovostní dolary nebo eura nejvýhodněji vyměníte v bankách nebo zlatnictvích. Za nové bankovky vyšších hodnot dostanete lepší kurz.",
        ),
      },
      {
        title: tx("Оплата й чайові", "Placení a spropitné"),
        text: tx(
          "У готелях і торгових центрах беруть картки, на ринках та у вуличних кафе — лише готівку. Чайові необов’язкові, але завжди доречні.",
          "V hotelech a obchodních centrech berou karty, na trzích a v pouličních bistrech jen hotovost. Spropitné není povinné, ale vždy potěší.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify e-visa / visa-free rules by citizenship.
        title: tx("Віза", "Vízum"),
        text: tx(
          "Громадянам багатьох країн потрібна електронна віза, яку оформлюють заздалегідь. Перевірю вимоги для вашого паспорта й підкажу, як подати заяву.",
          "Občané mnoha zemí potřebují elektronické vízum vyřízené předem. Ověřím, co platí pro váš pas, a poradím, jak o vízum požádat.",
        ),
      },
      {
        title: tx("Grab замість таксі", "Grab místo taxíku"),
        text: tx(
          "Викликайте авто через застосунок Grab: ціна відома наперед, і торгуватися не доведеться.",
          "Auto si volejte přes aplikaci Grab: cenu znáte předem a nemusíte smlouvat.",
        ),
      },
      {
        title: tx("Храми", "Chrámy"),
        text: tx(
          "Варто побачити вежі По Нагар і пагоду Лонг Шон. Лише закрийте плечі й коліна.",
          "Určitě se podívejte k věžím Po Nagar a do pagody Long Son. Jen mějte zakrytá ramena a kolena.",
        ),
      },
      {
        title: tx("Що привезти", "Co přivézt"),
        text: tx(
          "В’єтнамську каву, шовк і перли, які вирощують просто в бухті Нячангу.",
          "Vietnamskou kávu, hedvábí a perly, které se pěstují přímo v zátoce Nha Trangu.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Коли в Нячанзі сезон дощів?", "Kdy je v Nha Trangu období dešťů?"),
        a: tx(
          "З жовтня до грудня: море тоді часто штормить. Для пляжу найкраще — з лютого до вересня.",
          "Od října do prosince, moře je tehdy často rozbouřené. Na pláž je nejlepší jet od února do září.",
        ),
      },
      {
        q: tx("Як перейти дорогу в потоці мопедів?", "Jak přejít silnici v proudu motorek?"),
        a: tx(
          "Повільно й передбачувано. Не зупиняйтеся й не відступайте посеред дороги — водії самі вас об’їдуть. Можна підняти руку або перейти разом із місцевими.",
          "Pomalu a předvídatelně. Uprostřed silnice nezastavujte ani necouvejte – řidiči vás objedou sami. Pomůže zvednutá ruka, nebo se přidejte k místním.",
        ),
      },
      {
        q: tx("Чи безпечний лід у напоях?", "Je led v nápojích bezpečný?"),
        a: tx(
          "У більших кафе — так: там фабричний лід у вигляді циліндриків із дірочкою. Колотого вручну льоду в маленьких закладах краще уникати.",
          "Ve větších kavárnách ano, dávají tam tovární led ve tvaru válečků s dírkou. Ručně sekanému ledu v malých podnicích se raději vyhněte.",
        ),
      },
      {
        q: tx("Чи потрібна місцева SIM-картка?", "Potřebuju místní SIM kartu?"),
        a: tx(
          "Так, хоча б заради Grab — таксі й доставки їжі з фіксованими цінами. Картку Viettel чи Vinaphone купите в аеропорту Камрань.",
          "Ano, už kvůli Grabu – taxi a rozvozu jídla za pevné ceny. Kartu Viettel nebo Vinaphone koupíte na letišti Cam Ranh.",
        ),
      },
      {
        q: tx("Якою мовою там порозумітися?", "Jak se tam domluvím?"),
        a: tx(
          "У великих готелях — англійською. На ринку найпростіше набирати ціну на калькуляторі в телефоні: ви — свою, продавець — свою, і так до згоди.",
          "Ve velkých hotelech anglicky. Na trhu je nejjednodušší ťukat cenu do kalkulačky v telefonu: vy svou, prodavač svou – a tak dokola, dokud se nedohodnete.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до В’єтнаму з Чехії — ціни в кронах", "Zájezdy do Vietnamu z Česka – ceny v Kč"),
      description: tx(
        "Тури до В’єтнаму з Чехії: пляжі Нячангу, Vinpearl, грязьові ванни й спа. Ціни в кронах, переліт із пересадкою. Альона підбере 3 готелі для вас.",
        "Zájezdy do Vietnamu z Česka: pláže Nha Trangu, Vinpearl, bahenní koupele a termální prameny. Ceny v Kč, let s přestupem. Aljona vám vybere 3 hotely.",
      ),
    },
  },
  // ───────────────────────────── SPAIN
  {
    slug: "spain",
    name: tx("Іспанія", "Španělsko"),
    nameTo: tx("до Іспанії", "do Španělska"),
    nameIn: tx("в Іспанії", "ve Španělsku"),
    flag: "🇪🇸",
    heroImage: hero("spain"),
    tagline: tx("Тапас, Гауді й Канари", "Tapas, Gaudí a Kanáry"),
    teaser: tx(
      "Майорка, Тенеріфе, Коста-\u2060Брава й Барселона: пляж до обіду, Гауді — після, а вечеря — не раніше дев’ятої.",
      "Mallorca, Tenerife, Costa Brava a Barcelona: dopoledne pláž, odpoledne Gaudí a večeře ne dřív než v devět.",
    ),
    intro: tx(
      "Іспанія — це дві відпустки в одній країні: літнє Середземномор’я з Барселоною й Майоркою та Канари, де тепло навіть у січні. Скажіть, що вам ближче, — і я підберу острів чи узбережжя.",
      "Španělsko nabízí dvě dovolené v jedné zemi: letní Středomoří s Barcelonou a Mallorkou, nebo Kanáry, kde je teplo i v lednu. Řekněte, co je vám bližší, a já vyberu ostrov či pobřeží.",
    ),
    bestSeason: tx("червень\u2060–\u2060вересень; Канари — цілий рік", "červen\u2060–\u2060září; Kanáry celoročně"),
    flightTime: tx("≈ 2,5 год (Майорка), ≈ 5 год (Канари)", "cca 2,5 h (Mallorca), cca 5 h (Kanáry)"), // TODO(client): verify
    airports: ["PRG", "BRQ", "OSR"], // TODO(client): verify
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Барселона", "Barcelona"),
        text: tx(
          "Шедеври Гауді й Готичний квартал, а поруч — скелясті бухти Коста-Брави. Екскурсія зранку, море після обіду.",
          "Gaudího stavby a Gotická čtvrť, kousek odtud skalnaté zátoky Costa Brava. Ráno výlet, odpoledne moře.",
        ),
        image: img("spain", 1),
      },
      {
        title: tx("Коста-Дорада", "Costa Dorada"),
        text: tx(
          "«Золоте узбережжя»: пологий вхід у море й парк PortAventura поруч. З дітьми — чи не найзручніше місце в Іспанії.",
          "„Zlaté pobřeží“: pozvolný vstup do moře a za humny zábavní park PortAventura. S dětmi snad nejpohodlnější místo ve Španělsku.",
        ),
        image: img("spain", 2),
      },
      {
        title: tx("Майорка й Тенеріфе", "Mallorca a Tenerife"),
        text: tx(
          "Майорка — бухти з водою кольору м’яти. Тенеріфе — «острів вічної весни» з вулканом Тейде, куди можна поїхати й у грудні.",
          "Mallorca láká na zátoky s vodou barvy máty. Tenerife je „ostrov věčného jara“ se sopkou Teide – jet se tam dá i v prosinci.",
        ),
        image: img("spain", 3),
      },
    ],
    money: [
      {
        title: tx("Картка всюди", "Karta všude"),
        text: tx(
          "Картки приймають майже скрізь — від кав’ярень до сувенірних крамничок. Трохи готівки знадобиться на транспорт і чайові.",
          "Kartou zaplatíte skoro všude, od kaváren po stánky se suvenýry. Trochu hotovosti se hodí na dopravu a spropitné.",
        ),
      },
      {
        title: tx("Банкомати", "Bankomaty"),
        text: tx(
          "Банкомати (cajeros) є всюди. Зважайте на комісію місцевого банку й відмовляйтеся від конвертації в крони: знімайте в євро.",
          "Bankomaty (cajeros) najdete všude. Hlídejte poplatek místní banky a převod na koruny odmítněte: vybírejte v eurech.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Сієста", "Siesta"),
        text: tx(
          "З 14:00 до 17:00 багато крамниць зачиняється. Не боріться з цим — пообідайте так само неспішно, як іспанці.",
          "Mezi 14. a 17. hodinou spousta obchodů zavírá. Nebojujte s tím – dejte si oběd stejně pomalu jako Španělé.",
        ),
      },
      {
        title: tx("Що скуштувати", "Co ochutnat"),
        text: tx(
          "Паелья, гаспачо, хамон і сангрія. І пам’ятайте: вечеря тут починається не раніше 20:00–21:00.",
          "Paella, gazpacho, jamón a sangria. A počítejte s tím, že večeře tu začíná až mezi 20. a 21. hodinou.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Потяги RENFE й автобуси ходять точно, а авто напрокат довезе до диких пляжів і маленьких сіл.",
          "Vlaky RENFE a autobusy jezdí na čas a půjčené auto vás doveze k divokým plážím a malým vesnicím.",
        ),
      },
      {
        title: tx("Розпродажі", "Výprodeje"),
        text: tx(
          "Найкращі знижки (rebajas) — у січні–лютому та в липні–серпні.",
          "Velké výprodeje (rebajas) bývají v lednu a únoru a pak v červenci a srpnu.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Чи треба платити туристичний збір?", "Platí se turistická daň?"),
        a: tx(
          "Так, у багатьох регіонах — особливо в Каталонії й на Балеарах. Зазвичай це 1–5 € з людини за ніч залежно від категорії готелю, сплачують на місці.",
          "Ano, v mnoha regionech, hlavně v Katalánsku a na Baleárech. Obvykle 1–5 € za osobu a noc podle kategorie hotelu, platí se na místě.",
        ),
      },
      {
        q: tx("Скільки коштують шезлонги?", "Kolik stojí lehátka?"),
        a: tx(
          "Зазвичай 15–20 € на день за парасольку й два шезлонги. Самі пляжі державні й безкоштовні — на своєму рушнику можна лежати будь-де.",
          "Obvykle 15–20 € na den za slunečník a dvě lehátka. Samotné pláže jsou státní a zdarma, na vlastním ručníku můžete ležet kdekoli.",
        ),
      },
      {
        q: tx("Чому о 18:00 ресторани ще зачинені?", "Proč mají restaurace v 18:00 ještě zavřeno?"),
        a: tx(
          "Бо в Іспанії обідають з 13:30 до 16:00, а вечеряють після 20:00. Зголодніли раніше — шукайте тапас-бар.",
          "Protože se ve Španělsku obědvá od 13:30 do 16:00 a večeří až po 20:00. Když dostanete hlad dřív, zajděte do tapas baru.",
        ),
      },
      {
        q: tx("Як не стояти в чергах у PortAventura?", "Jak se vyhnout frontám v PortAventuře?"),
        a: tx(
          "Купуйте квитки онлайн заздалегідь, а в сезон — з Express Pass. Ще простіше — оселитися в одному з готелів парку: квитки там уже в ціні.",
          "Kupte si vstupenky online předem, v sezóně rovnou s Express Passem. Ještě jednodušší je bydlet v některém z hotelů parku – vstupenky tam máte v ceně.",
        ),
      },
      {
        q: tx("Наскільки безпечно в туристичних центрах?", "Jak bezpečná jsou turistická centra?"),
        a: tx(
          "Загалом безпечно, але в Барселоні та Мадриді орудують кишенькові злодії. Не лишайте телефон на столику кафе й носіть рюкзак перед собою.",
          "Obecně bezpečná, ale v Barceloně a Madridu řádí kapsáři. Nenechávejte telefon na stolku v kavárně a batoh noste před sebou.",
        ),
      },
      {
        q: tx("Можна пити воду з-під крана?", "Dá se pít voda z kohoutku?"),
        a: tx(
          "Офіційно так, але через мінерали вона має своєрідний присмак. Бутильована вода в супермаркеті коштує копійки.",
          "Oficiálně ano, kvůli minerálům ale má zvláštní chuť. Balená voda stojí v supermarketu pár centů.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Іспанії з Чехії — ціни в кронах", "Zájezdy do Španělska z Česka – ceny v Kč"),
      description: tx(
        "Тури до Іспанії з Чехії: Майорка, Тенеріфе, Коста-Брава, Коста-Дорада, а Канари — навіть узимку. Ціни в кронах. Альона підбере 3 готелі для вас.",
        "Zájezdy do Španělska z Česka: Mallorca, Tenerife, Costa Brava, Costa Dorada a Kanáry i v zimě. Ceny v Kč. Aljona vám vybere 3 hotely na míru.",
      ),
    },
  },
  // ───────────────────────────── DOMINICAN REPUBLIC
  {
    slug: "dominicana",
    name: tx("Домінікана", "Dominikána"),
    nameTo: tx("до Домінікани", "do Dominikány"),
    nameIn: tx("у Домінікані", "v Dominikáně"),
    flag: "🇩🇴",
    heroImage: hero("dominicana"),
    tagline: tx("Карибське море наживо", "Karibik naživo"),
    teaser: tx(
      "Пунта-\u2060Кана, пальми над білим піском і справжнє літо посеред чеської зими.",
      "Punta Cana, palmy nad bílým pískem a opravdové léto uprostřed české zimy.",
    ),
    intro: tx(
      "Той самий краєвид, що на заставці робочого комп’ютера, — тільки наживо й з теплим морем. Підкажу, що вам ближче: хвилі Атлантики чи спокійне Карибське море, — і підберу резорт, де вам буде добре.",
      "Přesně ta pláž, kterou máte na tapetě pracovního počítače – jen naživo a s teplým mořem. Poradím, co je vám bližší, jestli vlny Atlantiku, nebo klidné Karibské moře, a vyberu hotel, který vám sedne.",
    ),
    bestSeason: tx("листопад\u2060–\u2060квітень", "listopad\u2060–\u2060duben"),
    flightTime: tx("≈ 10–11 год з Праги (чартер)", "cca 10–11 h z Prahy (charter)"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("домініканське песо (DOP), USD", "dominikánské peso (DOP), USD"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Пунта-Кана", "Punta Cana"),
        text: tx(
          "Найвідоміший курорт: нескінченні пляжі Баваро, великі готелі «все включено» й нічне життя для тих, хто не втомився за день.",
          "Nejznámější letovisko: nekonečné pláže Bávaro, velké all inclusive hotely a noční život pro ty, kterým den nestačil.",
        ),
        image: img("dominicana", 1),
      },
      {
        title: tx("Ла-Романа й Байяїбе", "La Romana a Bayahibe"),
        text: tx(
          "Спокійне бірюзове Карибське море — для снорклінгу й романтики. Поруч — «місто художників» Альтос-\u2060де-\u2060Чавон.",
          "Klidné tyrkysové Karibské moře na šnorchlování i romantiku. Kousek odtud je „město umělců“ Altos de Chavón.",
        ),
        image: img("dominicana", 2),
      },
      {
        title: tx("Атлантичний берег", "Atlantské pobřeží"),
        text: tx(
          "Пуерто-Плата й півострів Самана — для тих, хто любить природу: дикі пляжі, водоспади й горбаті кити з січня до березня.",
          "Puerto Plata a poloostrov Samaná pro milovníky přírody: divoké pláže, vodopády a od ledna do března velryby keporkaci.",
        ),
        image: img("dominicana", 3),
      },
    ],
    money: [
      {
        title: tx("Долари США", "Americké dolary"),
        text: tx(
          "Долари беруть майже скрізь: у готелях, сувенірних крамничках і на екскурсіях. Частину крон поміняйте на долари дрібними купюрами ще в Чехії.",
          "Dolary berou skoro všude: v hotelech, obchůdcích se suvenýry i na výletech. Část korun si vyměňte na drobné dolary ještě v Česku.",
        ),
      },
      {
        title: tx("Банківські картки", "Platební karty"),
        text: tx(
          "У готелях і великих торгових центрах картки працюють без проблем. На ринок і до маленьких кафе в місті візьміть песо готівкою.",
          "V hotelech a velkých obchodních centrech fungují karty bez problémů. Na trhy a do malých kaváren ve městě si vezměte pesa v hotovosti.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify entry rules by citizenship; e-Ticket form is mandatory for all travellers.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Перед вильотом кожен заповнює безкоштовну електронну анкету e-\u2060Ticket. Візові умови залежать від громадянства — перевірю саме для вашої ситуації.",
          "Před odletem každý vyplní bezplatný elektronický formulář e-\u2060Ticket. Vízové podmínky závisí na občanství. Ověřím pro vaši situaci.",
        ),
      },
      {
        title: tx("Що привезти", "Co přivézt"),
        text: tx(
          "Ром, каву, сигари й ларимар — блакитний камінь, який видобувають лише тут.",
          "Rum, kávu, doutníky a larimar – modrý kámen, který se těží jen tady.",
        ),
      },
      {
        title: tx("Сонце", "Slunce"),
        text: tx(
          "Тут воно пече навіть крізь хмари. Крем SPF 50+ — щодня, а не лише першого дня.",
          "Pálí i přes mraky. Krém s SPF 50+ mažte každý den, ne jen ten první.",
        ),
      },
      {
        title: tx("Вода", "Voda"),
        text: tx(
          "Пийте лише бутильовану воду — навіть у готелях 5★.",
          "Pijte jen balenou vodu, i v hotelech 5*.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Атлантика чи Карибське море?", "Atlantik, nebo Karibské moře?"),
        a: tx(
          "Залежить від того, що ви любите. Пунта-Кана — це Атлантика: вода трохи прохолодніша, хвилі вищі. Карибське море біля Ла-Романи й Байяїбе спокійне, дуже тепле й яскраво-бірюзове.",
          "Záleží na tom, co máte rádi. Punta Cana leží u Atlantiku: voda je o něco chladnější a vlny vyšší. Karibské moře u La Romany a Bayahibe je klidné, velmi teplé a jasně tyrkysové.",
        ),
      },
      {
        q: tx("Що таке сезон саргасових водоростей?", "Co je sezóna sargasových řas?"),
        a: tx(
          "Це природне явище: часом море виносить на берег бурі водорості. Добрі готелі щоранку прибирають пляж і ставлять в океані загороджувальні сітки.",
          "Je to přírodní jev: moře občas vyplaví na břeh hnědé řasy. Dobré hotely každé ráno čistí pláž a v oceánu mají zábrany.",
        ),
      },
      {
        q: tx("Чи потрібен перехідник для розеток?", "Potřebuju adaptér do zásuvky?"),
        a: tx(
          "Так. Розетки американського типу з пласкими штирями, напруга 110 В. Універсальний адаптер купіть ще в Чехії.",
          "Ano. Zásuvky jsou americké s plochými kolíky a napětí 110 V. Univerzální adaptér si kupte ještě v Česku.",
        ),
      },
      {
        q: tx("Чи безпечно виходити за межі готелю?", "Je bezpečné chodit mimo hotel?"),
        a: tx(
          "У курортних зонах — так. Увечері не гуляйте самі в нетуристичних кварталах, а для поїздок обирайте офіційне таксі чи організовані екскурсії.",
          "V turistických zónách ano. Večer nechoďte sami do neturistických čtvrtí a na přesuny volte oficiální taxi nebo organizované výlety.",
        ),
      },
      {
        q: tx("Коли можна побачити китів на Самані?", "Kdy se dají u Samaná vidět velryby?"),
        a: tx(
          "З середини січня до кінця березня — тоді горбаті кити припливають у затоку Самана. Якщо ваша відпустка припадає на ці дати, екскурсію раджу не пропускати.",
          "Od poloviny ledna do konce března, kdy do zátoky Samaná připlouvají keporkaci. Pokud tam budete v tomhle termínu, výlet si nenechte ujít.",
        ),
      },
      {
        q: tx("Скільки давати чайових на «все включено»?", "Kolik dávat spropitné při all inclusive?"),
        a: tx(
          "Зазвичай 1–2 $ офіціантові, барменові чи покоївці. Невелика подяка помітно пришвидшує сервіс.",
          "Obvykle 1–2 $ číšníkovi, barmanovi nebo pokojské. Malá pozornost znatelně zrychlí obsluhu.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Домінікани з Чехії — ціни в кронах", "Zájezdy do Dominikány z Česka – ceny v Kč"),
      description: tx(
        "Тури до Домінікани з Чехії: Пунта-Кана, Ла-Романа, Самана. Чартер у зимовий сезон, «все включено», ціни в кронах. Альона підбере 3 готелі для вас.",
        "Zájezdy do Dominikány z Česka: Punta Cana, La Romana, Samaná. Charter v zimní sezóně, all inclusive, ceny v Kč. Aljona vám vybere 3 hotely na míru.",
      ),
    },
  },
  // ───────────────────────────── ITALY
  {
    slug: "italy",
    name: tx("Італія", "Itálie"),
    nameTo: tx("до Італії", "do Itálie"),
    nameIn: tx("в Італії", "v Itálii"),
    flag: "🇮🇹",
    heroImage: hero("italy"),
    tagline: tx("Сардинія, Сицилія й паста", "Sardinie, Sicílie a pasta"),
    teaser: tx(
      "Рим, Венеція, Амальфі, Сардинія, озера. Мистецтво зранку, море вдень, паста ввечері — і нікому не треба вибирати.",
      "Řím, Benátky, Amalfi, Sardinie, jezera. Ráno umění, přes den moře, večer pasta – a nikdo nemusí vybírat.",
    ),
    intro: tx(
      "Італія зовсім поруч: літаком — до двох годин, а можна доїхати й автобусом. Скажіть, чого хочеться більше — моря, міст чи всього одразу, — і я складу таку відпустку.",
      "Itálie je skoro za rohem: letadlem do dvou hodin a dojet se dá i autobusem. Řekněte, co vás táhne víc – moře, města, nebo všechno najednou – a já vám takovou dovolenou poskládám.",
    ),
    bestSeason: tx("квітень\u2060–\u2060жовтень; море — червень\u2060–\u2060вересень", "duben\u2060–\u2060říjen; k moři červen\u2060–\u2060září"),
    flightTime: tx("≈ 1,5–2 год з Праги", "cca 1,5–2 h z Prahy"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Класична Італія", "Klasická Itálie"),
        text: tx(
          "Рим, Флоренція й Венеція: Колізей, Ренесанс і канали. Обов’язкова програма, після якої хочеться ще.",
          "Řím, Florencie a Benátky: Koloseum, renesance a kanály. Povinná jízda, po které budete chtít přidat.",
        ),
        image: img("italy", 1),
      },
      {
        title: tx("Південь і острови", "Jih a ostrovy"),
        text: tx(
          "Кольорові будиночки Позітано на Амальфі, Етна на Сицилії й смарагдове море Сардинії — для тих, хто їде передусім до моря.",
          "Barevné domky v Positanu na Amalfi, Etna na Sicílii a smaragdové moře Sardinie – pro ty, kdo jedou hlavně k moři.",
        ),
        image: img("italy", 2),
      },
      {
        title: tx("Мілан і озера", "Milán a jezera"),
        text: tx(
          "Мода Мілана й спокій озер Комо та Гарда: вілли, прозора вода й неспішні вечори на набережних.",
          "Milánská móda a klid jezer Como a Garda: vily, průzračná voda a pomalé večery na nábřeží.",
        ),
        image: img("italy", 3),
      },
    ],
    money: [
      {
        title: tx("Картка чи готівка?", "Kartou, nebo hotově?"),
        text: tx(
          "Карткою можна платити майже скрізь. Готівка знадобиться на ринках і для туристичного податку в готелі.",
          "Kartou zaplatíte skoro všude. Hotovost se hodí na trzích a na turistickou daň v hotelu.",
        ),
      },
      {
        title: tx("Банкомати", "Bankomaty"),
        text: tx(
          "Знімайте готівку в банкоматах (Bancomat) великих банків, а вуличних обмінників у туристичних центрах краще уникати.",
          "Hotovost vybírejte z bankomatů (Bancomat) velkých bank, pouličním směnárnám v turistických centrech se raději vyhněte.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify travel rules for temporary-protection holders.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Італія — у Шенгені: зазвичай досить біометричного паспорта й чинного документа про перебування в Чехії. Перевірю саме для вашої ситуації.",
          "Itálie je ve Schengenu: obvykle stačí biometrický pas a platný doklad o pobytu v Česku. Ověřím pro vaši situaci.",
        ),
      },
      {
        title: tx("Кава біля стійки", "Káva u baru"),
        text: tx(
          "Еспресо п’ють швидко й стоячи біля стійки. За столиком та сама кава коштує дорожче.",
          "Espresso se pije rychle a vestoje u baru. U stolku stojí stejná káva víc.",
        ),
      },
      {
        title: tx("Riposo", "Riposo"),
        text: tx(
          "З 13:00 до 16:00 багато крамниць і невеликих ресторанів зачинено. Італійці відпочивають — і вам раджу.",
          "Mezi 13. a 16. hodinou má spousta obchodů a malých restaurací zavřeno. Italové odpočívají – a já vám radím totéž.",
        ),
      },
      {
        title: tx("Дрес-код у храмах", "Oblékání v kostelech"),
        text: tx(
          "У Ватикані та в соборах плечі й коліна мають бути закриті. Легкий шарф у сумці рятує завжди.",
          "Ve Vatikánu a v katedrálách mějte zakrytá ramena i kolena. Lehký šátek v tašce vás vždycky zachrání.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Що таке tassa di soggiorno?", "Co je tassa di soggiorno?"),
        a: tx(
          "Міський туристичний податок, який не входить у ціну туру. Найвищий він у Римі й Венеції — до кількох євро з людини за ніч. Сплачують у готелі.",
          "Městská turistická daň, která není v ceně zájezdu. Nejvyšší je v Římě a Benátkách, až několik eur za osobu a noc. Platí se v hotelu.",
        ),
      },
      {
        q: tx("Що означає coperto в рахунку?", "Co znamená coperto na účtu?"),
        a: tx(
          "Це плата за сервірування й хліб, зазвичай 1,5–3 € з людини. Чайових вона не замінює: 1–2 € зверху за добрий сервіс завжди доречні.",
          "Poplatek za prostření a chléb, obvykle 1,5–3 € na osobu. Spropitné ale nenahrazuje: 1–2 € navíc za dobrou obsluhu vždy potěší.",
        ),
      },
      {
        q: tx("Чи є в Італії безкоштовні пляжі?", "Jsou v Itálii pláže zdarma?"),
        a: tx(
          "Так, хоча більшість облаштованих пляжів (lido) платна: 20–50 € на день за парасольку й шезлонги. Але майже в кожному місті є spiaggia libera — вільні ділянки, де можна розкласти свій рушник.",
          "Ano, i když většina vybavených pláží (lido) je placená – 20–50 € na den za slunečník a lehátka. Skoro v každém městě ale najdete i spiaggia libera, volnou pláž, kde si lehnete na vlastní ručník.",
        ),
      },
      {
        q: tx("Чи треба компостувати квитки?", "Musím si označit jízdenku?"),
        a: tx(
          "Так. Паперові квитки на регіональні потяги й міський транспорт компостуйте перед посадкою, інакше штраф — від 50 €.",
          "Ano. Papírové jízdenky na regionální vlaky a MHD si před nástupem označte, jinak hrozí pokuta od 50 €.",
        ),
      },
      {
        q: tx("Чи безпечно ввечері в туристичних центрах?", "Je večer v turistických centrech bezpečno?"),
        a: tx(
          "Загалом так, але в Римі, Мілані й Неаполі багато кишенькових злодіїв. Не тримайте телефон у задній кишені й не вішайте сумку на спинку стільця.",
          "Obecně ano, ale v Římě, Miláně a Neapoli je hodně kapsářů. Nenoste telefon v zadní kapse a tašku nevěšte na opěradlo židle.",
        ),
      },
      {
        q: tx("Можна пити з фонтанчиків у Римі?", "Dá se pít z fontánek v Římě?"),
        a: tx(
          "Так. Фонтанчики nasoni дають чисту холодну питну воду безкоштовно — сміливо наповнюйте пляшку.",
          "Ano. Z fontánek nasoni teče čistá studená pitná voda zdarma, láhev si klidně naplňte.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Італії з Чехії — ціни в кронах", "Zájezdy do Itálie z Česka – ceny v Kč"),
      description: tx(
        "Тури до Італії з Чехії літаком або автобусом: Рим, Венеція, Амальфі, Сардинія, Сицилія, озера. Ціни в кронах. Альона підбере 3 готелі на ваш смак.",
        "Zájezdy do Itálie z Česka letecky i autobusem: Řím, Benátky, Amalfi, Sardinie, Sicílie, jezera. Ceny v Kč. Aljona vám vybere 3 hotely na míru.",
      ),
    },
  },
  // ───────────────────────────── INDONESIA
  {
    slug: "indonesia",
    name: tx("Балі", "Bali"),
    nameTo: tx("на Балі", "na Bali"),
    nameIn: tx("на Балі", "na Bali"),
    flag: "🇮🇩",
    heroImage: hero("indonesia"),
    tagline: tx("Джунглі, серф, рисові тераси", "Džungle, surf a rýžová pole"),
    teaser: tx(
      "Храми в джунглях, рисові тераси Убуду, вулкани й океан. Дорога довга, але перший же ранок усе пояснює.",
      "Chrámy v džungli, rýžové terasy v Ubudu, sopky a oceán. Cesta je dlouhá, ale hned první ráno vám vysvětlí proč.",
    ),
    intro: tx(
      "Летіти сюди довго, тож я продумаю зручну пересадку — і, якщо хочете, зупинку в Дубаї чи Сінгапурі. А на місці підкажу, де оселитися: серед джунглів Убуду чи на пляжах Нуса-Дуа.",
      "Letí se sem dlouho, proto vymyslím pohodlný přestup – a když budete chtít, i zastávku v Dubaji nebo Singapuru. Na místě pak poradím, kde bydlet: v džungli u Ubudu, nebo na plážích Nusa Dua.",
    ),
    bestSeason: tx("квітень\u2060–\u2060жовтень (сухий сезон)", "duben\u2060–\u2060říjen (období sucha)"),
    flightTime: tx("≈ 16–20 год з пересадкою", "cca 16–20 h s přestupem"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("індонезійська рупія (IDR)", "indonéská rupie (IDR)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Балі", "Bali"),
        text: tx(
          "Убуд — мистецтво, йога й рисові тераси серед джунглів. Нуса-Дуа й Семіньяк — готелі та ресторани просто на березі океану.",
          "V Ubudu umění, jóga a rýžové terasy uprostřed džungle, v Nusa Dua a Seminyaku hotely a restaurace přímo u oceánu.",
        ),
        image: img("indonesia", 1),
      },
      {
        title: tx("Гілі та Ломбок", "Gili a Lombok"),
        text: tx(
          "Катером із Балі — у світ без машин: на островах Гілі їздять на велосипедах, а біля берега плавають морські черепахи.",
          "Člunem z Bali do světa bez aut: na ostrovech Gili se jezdí na kole a u břehu plavou mořské želvy.",
        ),
        image: img("indonesia", 2),
      },
      {
        title: tx("Комодо та Флорес", "Komodo a Flores"),
        text: tx(
          "Для тих, кому мало пляжу: комодські варани й рожевий пісок. Із Балі — коротким внутрішнім рейсом.",
          "Pro ty, kterým pláž nestačí: varani komodští a růžový písek. Z Bali krátkým vnitrostátním letem.",
        ),
        image: img("indonesia", 3),
      },
    ],
    money: [
      {
        title: tx("Яку валюту брати?", "Jakou měnu si vzít?"),
        text: tx(
          "Долари або євро великими купюрами — нові й неушкоджені, за них дають кращий курс. Крони в Індонезії не поміняєте.",
          "Dolary nebo eura ve vyšších hodnotách, nové a nepoškozené – za takové dostanete lepší kurz. Koruny v Indonésii nevyměníte.",
        ),
      },
      {
        title: tx("Картки й банкомати", "Karty a bankomaty"),
        text: tx(
          "У туристичних зонах картки беруть майже всюди, але на ринках, у варунгах (місцевих їдальнях) і за вхід до храмів потрібна готівка.",
          "V turistických oblastech berou karty skoro všude, na trzích, v místních jídelnách (warung) a na vstupné do chrámů ale budete potřebovat hotovost.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify visa-on-arrival / e-VOA availability by citizenship.
        title: tx("Віза", "Vízum"),
        text: tx(
          "Громадянам багатьох країн підійде віза в аеропорту після прильоту або електронна, оформлена заздалегідь. Перевірю саме для вашої ситуації.",
          "Občanům mnoha zemí stačí vízum po příletu na letišti nebo elektronické vízum vyřízené předem. Ověřím pro vaši situaci.",
        ),
      },
      {
        title: tx("Етикет у храмах", "Etiketa v chrámech"),
        text: tx(
          "Коліна прикривають саронгом — його часто дають напрокат просто біля входу.",
          "Kolena se zakrývají sarongem, který si často půjčíte přímo u vchodu.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Рух лівосторонній. Найзручніше — таксі Blue Bird, Grab або авто з водієм, яке я можу організувати.",
          "Jezdí se vlevo. Nejpohodlnější je taxi Blue Bird, Grab nebo auto s řidičem, které vám můžu zajistit.",
        ),
      },
      {
        title: tx("Вода", "Voda"),
        text: tx(
          "Лише бутильована. І без льоду у вуличних кафе.",
          "Jen balená. A v pouličních bistrech radši bez ledu.",
        ),
      },
    ],
    faq: [
      {
        // TODO(client): verify current Bali levy amount.
        q: tx("Що таке туристичний збір Балі?", "Co je turistický poplatek na Bali?"),
        a: tx(
          "Це збір, який із 2024 року сплачує кожен іноземний турист, — приблизно 150 000 IDR. Найзручніше оплатити його онлайн на офіційному порталі Love Bali або в аеропорту.",
          "Poplatek, který od roku 2024 platí každý zahraniční turista – zhruba 150 000 IDR. Nejpohodlněji ho zaplatíte online na oficiálním portálu Love Bali nebo na letišti.",
        ),
      },
      {
        q: tx("Чому іноді на пляжі не поплаваєш?", "Proč se někdy nedá koupat?"),
        a: tx(
          "Через сильні припливи й відпливи: у Нуса-Дуа вода може відступати на сотні метрів. Розклад дивіться в застосунку Tide Table або питайте на ресепшені.",
          "Kvůli silnému přílivu a odlivu: v Nusa Dua voda ustoupí i o stovky metrů. Tabulku přílivů najdete v aplikaci Tide Table, nebo se zeptejte na recepci.",
        ),
      },
      {
        q: tx("Як поводитися з мавпами?", "Jak se chovat k opicím?"),
        a: tx(
          "Як із кишеньковими злодіями — бо вони ними і є. Не тримайте в руках їжу, окуляри чи телефон, не дивіться мавпам в очі й не відбирайте вкрадене силою: покличте наглядача.",
          "Jako ke kapsářům – protože jimi jsou. Nedržte v rukou jídlo, brýle ani telefon, nedívejte se opicím do očí a ukradené věci jim neberte silou: zavolejte strážce.",
        ),
      },
      {
        q: tx("Чи багато там комарів?", "Je tam hodně komárů?"),
        a: tx(
          "Чимало, особливо в Убуді, — це ж тропіки. Місцеві репеленти (наприклад, Soffell) працюють добре, а преміум-готелі регулярно обробляють територію.",
          "Dost, hlavně v Ubudu – jsou to přece tropy. Místní repelenty (třeba Soffell) fungují dobře a lepší hotely areál pravidelně ošetřují.",
        ),
      },
      {
        q: tx("Дорогу перекрила церемонія. Що робити?", "Silnici zablokoval obřadní průvod. Co dělat?"),
        a: tx(
          "Чекати й дивитися. Релігійні процесії на дорозі завжди мають перевагу, а балійці дуже цінують повагу до своїх традицій. До того ж це видовище варте кількох хвилин.",
          "Počkat a dívat se. Náboženské průvody mají na silnici vždycky přednost a Balijci si úcty ke svým tradicím velmi váží. A ta podívaná za těch pár minut stojí.",
        ),
      },
    ],
    seo: {
      title: tx("Тури на Балі з Чехії — ціни в кронах", "Zájezdy na Bali z Česka – ceny v Kč"),
      description: tx(
        "Тури на Балі з Чехії: Убуд, Нуса-Дуа, Семіньяк, а ще Гілі, Ломбок і Комодо. Зручні пересадки, ціни в кронах. Альона підбере 3 готелі для вас.",
        "Zájezdy na Bali z Česka: Ubud, Nusa Dua, Seminyak a k tomu Gili, Lombok i Komodo. Pohodlné přestupy, ceny v Kč. Aljona vám vybere 3 hotely na míru.",
      ),
    },
  },
  // ───────────────────────────── ZANZIBAR (written from scratch — source page was empty)
  {
    slug: "zanzibar",
    name: tx("Занзібар", "Zanzibar"),
    nameTo: tx("на Занзібар", "na Zanzibar"),
    nameIn: tx("на Занзібарі", "na Zanzibaru"),
    flag: "🇹🇿",
    heroImage: hero("zanzibar"),
    tagline: tx("Білий пісок і спеції", "Bílý písek a koření"),
    teaser: tx(
      "Океан усіх відтінків бірюзи, вулички Стоун-\u2060Тауна й сафарі зовсім поруч. Африка — але в шльопанцях.",
      "Oceán ve všech odstínech tyrkysové, uličky Stone Townu a safari kousek odtud. Afrika, ale v žabkách.",
    ),
    intro: tx(
      "Острів біля узбережжя Танзанії, де пахне гвоздикою й корицею, а взимку з Чехії літають прямі чартери. Підкажу, де жити: на півночі, щоб купатися без відпливів, чи на сході — заради кайту.",
      "Ostrov u pobřeží Tanzanie, kde to voní hřebíčkem a skořicí a kam v zimě létají přímé chartery z Česka. Poradím, kde bydlet: na severu, kde koupání nekazí odliv, nebo na východě, kam se jezdí za kitem.",
    ),
    bestSeason: tx("червень\u2060–\u2060жовтень, грудень\u2060–\u2060лютий", "červen\u2060–\u2060říjen, prosinec\u2060–\u2060únor"),
    flightTime: tx("≈ 9 год з Праги (чартер)", "cca 9 h z Prahy (charter)"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("танзанійський шилінг (TZS), USD", "tanzanský šilink (TZS), USD"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Нунгві й Кендва", "Nungwi a Kendwa"),
        text: tx(
          "Північ острова: відпливів тут майже немає, тож купатися можна цілий день, а заходи сонця над океаном — найгарніші на Занзібарі.",
          "Sever ostrova: odliv tu skoro není, takže se dá koupat celý den. A západy slunce nad oceánem jsou nejhezčí na celém Zanzibaru.",
        ),
        image: img("zanzibar", 1),
      },
      {
        title: tx("Паже й Джамбіані", "Paje a Jambiani"),
        text: tx(
          "Схід: безкраї білі пляжі, кайтсерфінг і затишні бутик-готелі. У відплив океан відступає далеко — і можна гуляти дном.",
          "Východ: nekonečné bílé pláže, kitesurfing a útulné butikové hotely. Při odlivu oceán ustoupí daleko a dá se procházet po dně.",
        ),
        image: img("zanzibar", 2),
      },
      {
        title: tx("Стоун-Таун", "Stone Town"),
        text: tx(
          "Старе місто під охороною ЮНЕСКО: різьблені двері, вузькі вулички, базари спецій і нічний ринок Фородхані.",
          "Staré město pod ochranou UNESCO: vyřezávané dveře, úzké uličky, trhy s kořením a noční trh Forodhani.",
        ),
        image: img("zanzibar", 3),
      },
    ],
    money: [
      {
        title: tx("Долари й шилінги", "Dolary a šilinky"),
        text: tx(
          "У готелях і на екскурсіях ціни часто в доларах. Беріть нові неушкоджені купюри — старі можуть не прийняти. А на ринок розміняйте трохи шилінгів.",
          "V hotelech a na výletech bývají ceny v dolarech. Berte nové a nepoškozené bankovky, starší vám nemusí vzít. Na trhy si rozměňte trochu šilinků.",
        ),
      },
      {
        title: tx("Картки", "Karty"),
        text: tx(
          "Більшість готелів приймає картки, але за їхніми межами готівка надійніша. Банкомати є в Стоун-Тауні та більших селищах.",
          "Většina hotelů bere karty, mimo ně je ale spolehlivější hotovost. Bankomaty najdete ve Stone Townu a větších vesnicích.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify visa rules by citizenship and the mandatory Zanzibar travel insurance.
        title: tx("Віза й страховка", "Vízum a pojištění"),
        text: tx(
          "Візові умови залежать від громадянства, а Занзібар ще й вимагає окрему місцеву страховку для туристів. Перевірю саме для вашої ситуації.",
          "Vízové podmínky závisí na občanství a Zanzibar navíc vyžaduje vlastní povinné pojištění pro turisty. Ověřím pro vaši situaci.",
        ),
      },
      {
        // TODO(client): verify vaccination requirements.
        title: tx("Здоров’я", "Zdraví"),
        text: tx(
          "Перед поїздкою порадьтеся з лікарем щодо щеплень і профілактики малярії. Увечері — репелент.",
          "Před cestou se poraďte s lékařem o očkování a prevenci malárie. A večer nezapomeňte na repelent.",
        ),
      },
      {
        title: tx("Культура", "Kultura"),
        text: tx(
          "Більшість місцевих — мусульмани. У селах і Стоун-Тауні закривайте плечі й коліна; купальник — лише на пляжі.",
          "Většina místních jsou muslimové. Ve vesnicích a ve Stone Townu mějte zakrytá ramena a kolena, plavky jen na pláži.",
        ),
      },
      {
        title: tx("Екскурсії", "Výlety"),
        text: tx(
          "Плантації спецій, черепахи на острові Призон, снорклінг біля Мнемби, Safari Blue — і сафарі на материку.",
          "Plantáže koření, želvy na Prison Islandu, šnorchlování u Mnemby, Safari Blue a safari na pevnině.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Де жити, щоб купатися без відпливів?", "Kde bydlet, aby nám koupání nekazil odliv?"),
        a: tx(
          "На півночі — у Нунгві чи Кендві. На сході (Паже, Джамбіані) відпливи сильні й океан відступає на сотні метрів, зате там роздолля для кайтсерферів.",
          "Na severu, v Nungwi nebo Kendwě. Na východě (Paje, Jambiani) je silný odliv a oceán ustoupí o stovky metrů, zato je tam kitesurfařům hej.",
        ),
      },
      {
        q: tx("Коли сезон дощів?", "Kdy je období dešťů?"),
        a: tx(
          "Великі дощі — у квітні–травні, короткі — у листопаді. Найкращий час — з червня до жовтня та з грудня до лютого.",
          "Velké deště přicházejí v dubnu a květnu, ty krátké v listopadu. Nejlepší doba je od června do října a od prosince do února.",
        ),
      },
      {
        q: tx("Можна поєднати Занзібар із сафарі?", "Dá se Zanzibar spojit se safari?"),
        a: tx(
          "Так. З острова невеликими літаками летять на 1–3 дні до національних парків Танзанії — Ньєрере (Селус) чи Мікумі. Таку поїздку допоможу спланувати.",
          "Ano. Malým letadlem se z ostrova dá na 1–3 dny zaletět do tanzanských národních parků Nyerere (Selous) nebo Mikumi. Takový výlet vám pomůžu naplánovat.",
        ),
      },
      {
        q: tx("Чи безпечно на Занзібарі?", "Je na Zanzibaru bezpečno?"),
        a: tx(
          "Так, острів доброзичливий до туристів. Звичайні правила: не носіть цінні речі напоказ, увечері їздіть таксі від готелю, а екскурсії купуйте в перевірених агенціях.",
          "Ano, ostrov je k turistům přátelský. Platí běžná pravidla: nenoste cennosti na odiv, večer jezděte hotelovým taxi a výlety kupujte u ověřených agentur.",
        ),
      },
      {
        q: tx("Які на Занзібарі розетки?", "Jaké jsou na Zanzibaru zásuvky?"),
        a: tx(
          "Переважно британського типу G, 230 В. Візьміть універсальний адаптер.",
          "Převážně britský typ G, 230 V. Vezměte si univerzální adaptér.",
        ),
      },
    ],
    seo: {
      title: tx("Тури на Занзібар з Чехії — ціни в кронах", "Zájezdy na Zanzibar z Česka – ceny v Kč"),
      description: tx(
        "Тури на Занзібар з Чехії прямим чартером: Нунгві, Кендва, Паже, Стоун-Таун і сафарі на материку. Ціни в кронах. Альона підбере 3 готелі для вас.",
        "Zájezdy na Zanzibar z Česka přímým charterem: Nungwi, Kendwa, Paje, Stone Town a safari na pevnině. Ceny v Kč. Aljona vám vybere 3 hotely na míru.",
      ),
    },
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
