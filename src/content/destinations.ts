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
  "Шенген: біометричний паспорт + чинний документ про перебування в ЧР",
  "Schengen: biometrický pas + platný doklad o pobytu v ČR",
);
// TODO(client): verify — rules for non-Schengen countries depend on citizenship.
const ENTRY_CHECK = tx(
  "Залежить від громадянства — перевіримо умови перед бронюванням",
  "Záleží na občanství — podmínky ověříme před rezervací",
);

const ALL_CZ = ["PRG", "BRQ", "OSR", "PED"];

export const destinations: Destination[] = [
  // ───────────────────────────── TURKEY
  {
    slug: "turkey",
    name: tx("Туреччина", "Turecko"),
    nameTo: tx("до Туреччини", "do Turecka"),
    nameIn: tx("у Туреччині", "v Turecku"),
    flag: "🇹🇷",
    heroImage: hero("turkey"),
    tagline: tx("Східна казка з сервісом all inclusive", "Orientální pohádka se servisem all inclusive"),
    teaser: tx(
      "Анталія, Белек і Бодрум — найпопулярніший пляжний напрямок з Праги, Брна та Острави.",
      "Antalya, Belek a Bodrum — nejoblíbenější letní destinace s odlety z Prahy, Brna i Ostravy.",
    ),
    intro: tx(
      "Туреччина — країна, де розкішний сервіс зустрічається з тисячолітньою історією. Від золотих пляжів Анталії до скель Каппадокії кожен куточок тут створений для ідеального відпочинку. Чартери з Чехії літають сюди щодня, а готелі на all inclusive — одні з найкращих у світі за співвідношенням ціни та якості. Ananas Tour обирає для вас лише перевірені готелі, які ми знаємо особисто або за відгуками наших туристів.",
      "Turecko je země, kde se luxusní servis potkává s tisíciletou historií. Od zlatých pláží Antalye po skály Kappadokie je tu všechno připravené na dokonalou dovolenou. Charterové lety z Česka sem v sezóně létají denně a hotely s all inclusive patří poměrem ceny a kvality ke světové špičce. Ananas Tour vybírá jen prověřené hotely, které známe osobně nebo z recenzí našich klientů.",
    ),
    bestSeason: tx("травень – жовтень", "květen – říjen"),
    flightTime: tx("≈ 3 год з Праги", "cca 3 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    currency: tx("турецька ліра (TRY)", "turecká lira (TRY)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Анталія та Белек", "Antalya a Belek"),
        text: tx(
          "Центр елітного відпочинку. Белек славиться сосновими лісами, гольф-полями та VIP-готелями. Анталія — це поєднання шопінгу, розваг і пляжного релаксу.",
          "Centrum luxusní dovolené. Belek je známý borovými lesy, golfovými hřišti a VIP hotely. Antalya spojuje nákupy, zábavu i odpočinek na pláži.",
        ),
        image: img("turkey", 1),
      },
      {
        title: tx("Кемер та Фетхіє", "Kemer a Fethiye"),
        text: tx(
          "Для тих, хто любить гори та сосни. Кемер вражає прозорою водою, а Фетхіє — «турецькі Мальдіви» з бухтою Олюденіз.",
          "Pro milovníky hor a borovic. Kemer okouzlí průzračnou vodou, Fethiye jsou „turecké Maledivy“ se zátokou Ölüdeniz.",
        ),
        image: img("turkey", 2),
      },
      {
        title: tx("Бодрум та Мармарис", "Bodrum a Marmaris"),
        text: tx(
          "Егейське узбережжя з європейським шармом. Бодрум — нічне життя та білосніжна архітектура, Мармарис — зелене місто в затишній бухті.",
          "Egejské pobřeží s evropským šarmem. Bodrum láká nočním životem a bílou architekturou, Marmaris je zelené město v klidné zátoce.",
        ),
        image: img("turkey", 3),
      },
    ],
    money: [
      {
        title: tx("Ліри чи євро?", "Liry, nebo eura?"),
        text: tx(
          "Національна валюта — турецька ліра. У готелях і великих магазинах охоче беруть євро, тож із Чехії найзручніше везти євро (крони в Туреччині міняють невигідно). Для дрібних витрат, долмушів і базарів майте трохи лір.",
          "Měnou je turecká lira. V hotelech a větších obchodech rádi vezmou eura, proto je nejpraktičtější vézt si z Česka eura (koruny se v Turecku mění nevýhodně). Na drobné výdaje, dolmuše a bazary mějte pár lir.",
        ),
      },
      {
        title: tx("Де міняти гроші?", "Kde měnit peníze?"),
        text: tx(
          "Найкращий курс в офіційних обмінниках (Döviz) у містах. В аеропорту курс зазвичай гірший, на ресепшені готелю — трохи нижчий, ніж у місті.",
          "Nejlepší kurz nabízejí oficiální směnárny (Döviz) ve městech. Na letišti bývá kurz horší, na recepci hotelu o něco nižší než ve městě.",
        ),
      },
      {
        title: tx("Банківські картки", "Platební karty"),
        text: tx(
          "Visa та Mastercard (зокрема картки чеських банків) працюють майже скрізь. Якщо термінал пропонує оплату в кронах або євро — обирайте місцеву валюту, так курс буде чеснішим.",
          "Visa i Mastercard (včetně karet českých bank) fungují téměř všude. Když terminál nabídne platbu v korunách nebo eurech, zvolte místní měnu — kurz bude férovější.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Найзручніше їздити на долмушах (маршрутках). Платять готівкою або картками AntalyaKart / MuğlaKart з терміналів.",
          "Nejpohodlnější jsou dolmuše (minibusy). Platí se hotově nebo kartou AntalyaKart / MuğlaKart z automatů.",
        ),
      },
      {
        title: tx("Розетки", "Zásuvky"),
        text: tx(
          "Такі самі, як у Чехії (тип F, 230 V) — перехідник не потрібен.",
          "Stejné jako v Česku (typ F, 230 V) — adaptér nepotřebujete.",
        ),
      },
      {
        title: tx("Дрес-код", "Oblékání"),
        text: tx(
          "Поза готелем, особливо в мечетях, закривайте плечі й коліна. Хустки жінкам видають на вході безкоштовно.",
          "Mimo hotel, hlavně v mešitách, mějte zakrytá ramena a kolena. Šátky ženám půjčí u vchodu zdarma.",
        ),
      },
      {
        title: tx("Медицина", "Zdraví"),
        text: tx(
          "Якщо нездужаєте, спершу дзвоніть в асистанс за номером у страховому полісі — там скажуть, у яку клініку їхати, щоб не платити самим.",
          "Když vám není dobře, volejte nejdřív asistenční službu z pojistky — poradí, na kterou kliniku jet, abyste nic neplatili sami.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Чим Ultra All Inclusive відрізняється від All Inclusive?", "Jaký je rozdíl mezi Ultra All Inclusive a All Inclusive?"),
        a: tx(
          "Ultra All Inclusive зазвичай включає імпортний алкоголь, цілодобове харчування та безкоштовне відвідування à la carte ресторану. Звичайний All Inclusive обмежений місцевими напоями та розкладом головного ресторану.",
          "Ultra All Inclusive obvykle zahrnuje dovážený alkohol, jídlo 24 hodin denně a návštěvu à la carte restaurace zdarma. Klasické All Inclusive je omezené na místní nápoje a otevírací dobu hlavní restaurace.",
        ),
      },
      {
        q: tx("Ми прилетіли вранці, а заселення о 14:00. Що робити?", "Přiletíme ráno, ale ubytování je až od 14:00. Co dělat?"),
        a: tx(
          "Залиште валізи в камері схову, отримайте браслети й одразу користуйтеся послугами готелю: сніданок, басейн, пляж. Ми завжди просимо готель про раннє заселення, якщо є вільні номери.",
          "Nechte kufry v úschovně, vezměte si náramky a hned můžete využívat služby hotelu: snídani, bazén, pláž. Pokud jsou volné pokoje, vždy hotel požádáme o dřívější ubytování.",
        ),
      },
      {
        q: tx("Що таке готелі Adults Only і чи пустять туди з підлітком?", "Co jsou hotely Adults Only a pustí nás tam s teenagerem?"),
        a: tx(
          "Це готелі «тільки для дорослих» (зазвичай 16+ або 18+). Навіть якщо дитині майже 16, готель може відмовити в поселенні, тому ми завжди перевіряємо вікові обмеження.",
          "Jsou to hotely „jen pro dospělé“ (obvykle 16+ nebo 18+). I když je dítěti skoro 16, hotel ho může odmítnout, proto věková omezení vždy předem ověřujeme.",
        ),
      },
      {
        q: tx("Чи безпечно залишати цінні речі в номері?", "Je bezpečné nechávat cennosti na pokoji?"),
        a: tx(
          "Паспорти, документи про перебування в ЧР, готівку та прикраси тримайте в сейфі. У готелях 5* сейф зазвичай безкоштовний, у бюджетніших може коштувати кілька євро на добу.",
          "Pasy, doklady o pobytu v ČR, hotovost a šperky mějte v trezoru. V hotelech 5* bývá trezor zdarma, v levnějších může stát pár eur na den.",
        ),
      },
      {
        q: tx("Брати ліки з собою чи купити на місці?", "Brát léky s sebou, nebo je koupit na místě?"),
        a: tx(
          "У Туреччині суворий контроль якості ліків і невисокі ціни, але ліки, які ви приймаєте постійно, краще взяти з дому. Аптеки позначені червоною літерою «E» (Eczane).",
          "V Turecku je přísná kontrola léků a nízké ceny, ale léky, které berete pravidelně, si vezměte z domova. Lékárny poznáte podle červeného písmene „E“ (Eczane).",
        ),
      },
      {
        q: tx("Як порозумітися без турецької та англійської?", "Jak se domluvit bez turečtiny a angličtiny?"),
        a: tx(
          "У популярних курортах персонал часто розуміє російську, дедалі частіше — українську. Для поїздок містом вистачить базової англійської або перекладача в телефоні.",
          "V oblíbených letoviscích personál často rozumí rusky, stále častěji i ukrajinsky. Na výlety stačí základní angličtina nebo překladač v telefonu.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Туреччини з Праги — ціни в CZK", "Zájezdy do Turecka z Prahy"),
      description: tx(
        "Відпочинок у Туреччині з вильотом з Праги, Брна, Острави. Анталія, Белек, Кемер, Бодрум. Альона підбере тур у Telegram за 15 хвилин.",
        "Dovolená v Turecku s odletem z Prahy, Brna a Ostravy. Antalya, Belek, Kemer, Bodrum. Aljona vám zájezd vybere na Telegramu do 15 minut.",
      ),
    },
  },
  // ───────────────────────────── EGYPT
  {
    slug: "egypt",
    name: tx("Єгипет", "Egypt"),
    nameTo: tx("до Єгипту", "do Egypta"),
    nameIn: tx("в Єгипті", "v Egyptě"),
    flag: "🇪🇬",
    heroImage: hero("egypt"),
    tagline: tx("Червоне море та велич пірамід", "Rudé moře a majestát pyramid"),
    teaser: tx(
      "Вічне літо, коралові рифи та готелі світового рівня — тепло навіть у листопаді й лютому.",
      "Věčné léto, korálové útesy a hotely světové úrovně — teplo i v listopadu a únoru.",
    ),
    intro: tx(
      "Єгипет — країна вічного літа, де тепле Червоне море зустрічається з величчю давніх пірамід. Цей напрямок закохує з першого занурення на кораловий риф і дарує справжній релакс у готелях світового рівня. З Чехії сюди летять цілий рік, тому Єгипет — улюблений вибір для зимової відпустки. Ananas Tour підбере резорт під ваш формат: сімейний, романтичний чи дайверський.",
      "Egypt je zemí věčného léta, kde se teplé Rudé moře potkává s majestátem starověkých pyramid. Zamilujete si ho při prvním ponoru na korálový útes a odpočinete si v hotelech světové úrovně. Z Česka se sem létá celý rok, proto je Egypt oblíbenou volbou na zimní dovolenou. Ananas Tour vybere resort přesně pro vás: rodinný, romantický i potápěčský.",
    ),
    bestSeason: tx("цілий рік; найкомфортніше жовтень – травень", "celoročně; nejpříjemněji říjen – květen"),
    flightTime: tx("≈ 4,5 год з Праги", "cca 4,5 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    currency: tx("єгипетський фунт (EGP)", "egyptská libra (EGP)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Шарм-ель-Шейх", "Šarm aš-Šajch"),
        text: tx(
          "Рай для дайвінгу та снорклінгу. Курорт захищений горами від вітрів, тому ідеальний взимку. Тут найрозкішніші готелі та активне нічне життя.",
          "Ráj pro potápění a šnorchlování. Letovisko chrání hory před větrem, takže je ideální i v zimě. Najdete tu nejluxusnější hotely a živý noční život.",
        ),
        image: img("egypt", 1),
      },
      {
        title: tx("Хургада", "Hurghada"),
        text: tx(
          "Найкращий вибір для родин завдяки пологим піщаним пляжам. Багато аквапарків, а до Луксора й Каїра — рукою подати.",
          "Nejlepší volba pro rodiny díky pozvolným písečným plážím. Spousta aquaparků a do Luxoru či Káhiry je to kousek.",
        ),
        image: img("egypt", 2),
      },
      {
        title: tx("Марса-Алам", "Marsa Alam"),
        text: tx(
          "Спокійний курорт для тих, хто шукає усамітнення. Тут можна побачити дюгонів і морських черепах у природному середовищі.",
          "Klidné letovisko pro ty, kdo hledají soukromí. Můžete tu potkat dugongy a mořské želvy v jejich přirozeném prostředí.",
        ),
        image: img("egypt", 3),
      },
    ],
    money: [
      {
        title: tx("Долари чи євро?", "Dolary, nebo eura?"),
        text: tx(
          "Офіційна валюта — єгипетський фунт, але в туристичних зонах приймають долари та євро. Із Чехії зручно везти євро або долари дрібними купюрами нового зразка — для чайових і сувенірів.",
          "Oficiální měnou je egyptská libra, v turistických oblastech ale vezmou dolary i eura. Z Česka si vezměte eura nebo dolary v drobných a nových bankovkách — na spropitné a suvenýry.",
        ),
      },
      {
        title: tx("Обмін і розрахунки", "Směna a placení"),
        text: tx(
          "Невелику суму вигідно поміняти на фунти для супермаркетів, де ціни в місцевій валюті — так отримаєте решту без втрат на курсі.",
          "Menší částku se vyplatí vyměnit na libry do supermarketů, kde jsou ceny v místní měně — dostanete vrácené bez ztráty na kurzu.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify current visa rules for Ukrainian citizens / holders of CZ residence documents.
        title: tx("Віза", "Vízum"),
        text: tx(
          "Для багатьох туристів віза оформлюється після прильоту, а для Шарм-ель-Шейху існує спеціальний штамп «Sinai Only». Умови залежать від громадянства — ми перевіримо їх для вашого паспорта перед бронюванням.",
          "Pro mnoho turistů se vízum vyřizuje po příletu a pro Šarm aš-Šajch existuje speciální razítko „Sinai Only“. Podmínky závisí na občanství — pro váš pas je ověříme před rezervací.",
        ),
      },
      {
        title: tx("Безпека на морі", "Bezpečí v moři"),
        text: tx(
          "Червоне море — заповідник. Не торкайтеся коралів і риб руками: це небезпечно і за це штрафують.",
          "Rudé moře je přírodní rezervace. Korálů a ryb se nedotýkejte — je to nebezpečné a hrozí pokuta.",
        ),
      },
      {
        title: tx("Вода", "Voda"),
        text: tx(
          "Воду з-під крана не пийте. Навіть зуби краще чистити бутильованою водою, яку готель дає безкоштовно.",
          "Vodu z kohoutku nepijte. I zuby si raději čistěte balenou vodou, kterou hotel dává zdarma.",
        ),
      },
      {
        title: tx("Аптечка", "Lékárnička"),
        text: tx(
          "Візьміть базовий набір: засоби від сонця та для травлення. Решту легко купити в місцевих аптеках.",
          "Přibalte si základ: opalovací krém a léky na trávení. Ostatní koupíte v místních lékárnách.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Коли летіти в Єгипет, щоб не було сильного вітру?", "Kdy letět do Egypta, aby moc nefoukalo?"),
        a: tx(
          "З грудня по березень у Єгипті сезон вітрів. Взимку радимо готелі в захищених бухтах Шарм-ель-Шейху (Наама-Бей, Шарм-ель-Майя). У Хургаді в цей час вітряно майже всюди — ідеально для кайтсерфінгу.",
          "Od prosince do března je v Egyptě větrná sezóna. V zimě doporučujeme hotely v chráněných zátokách Šarm aš-Šajchu (Naama Bay, Sharm El Maya). V Hurghadě tou dobou fouká skoro všude — ideální pro kitesurfing.",
        ),
      },
      {
        q: tx("Що таке вхід з понтону і чи потрібні коралки?", "Co je vstup z pontonu a potřebujeme boty do vody?"),
        a: tx(
          "У багатьох готелях Шарму в море заходять з понтону одразу на глибину над рифом. Спеціальне взуття обов’язкове, щоб не поранитися об корали чи морських їжаків.",
          "V mnoha hotelech v Šarmu se do moře vstupuje z pontonu rovnou do hloubky nad útesem. Boty do vody jsou nutnost, abyste se neporanili o korály nebo ježovky.",
        ),
      },
      {
        q: tx("Чи варто купувати місцеву SIM-картку?", "Vyplatí se místní SIM karta?"),
        a: tx(
          "Так. Готельний Wi-Fi часто працює лише в лобі. Картку Orange або Vodafone можна купити прямо в аеропорту — великий пакет інтернету коштує близько 10–15 $.",
          "Ano. Hotelová Wi-Fi často funguje jen v lobby. Kartu Orange nebo Vodafone koupíte přímo na letišti — velký datový balíček stojí kolem 10–15 $.",
        ),
      },
      {
        q: tx("Чи безпечно купатися в Червоному морі?", "Je koupání v Rudém moři bezpečné?"),
        a: tx(
          "Популярні готелі мають рятувальників і захисні сітки. Головні правила: не купатися на світанку й після заходу сонця, не відпливати далеко від рифу і не годувати риб.",
          "Oblíbené hotely mají plavčíky a ochranné sítě. Hlavní pravidla: nekoupat se za svítání a po setmění, neodplouvat daleko od útesu a nekrmit ryby.",
        ),
      },
      {
        q: tx("Луксор чи піраміди — що обрати?", "Luxor, nebo pyramidy — co vybrat?"),
        a: tx(
          "Луксор — це храми та гробниці фараонів (ближче з Хургади). Піраміди Гізи — біля Каїра (ближче з Шарму або літаком). Обидві поїздки займають цілий день, тож плануйте їх заздалегідь.",
          "Luxor jsou chrámy a hrobky faraonů (blíž z Hurghady). Pyramidy v Gíze jsou u Káhiry (blíž ze Šarmu nebo letadlem). Oba výlety zaberou celý den, plánujte je dopředu.",
        ),
      },
      {
        q: tx("Чи можна купити алкоголь у звичайному магазині?", "Dá se koupit alkohol v běžném obchodě?"),
        a: tx(
          "У супермаркетах алкоголь зазвичай не продають. Імпортні напої можна купити в Duty Free протягом кількох днів після прильоту (з паспортом). На all inclusive подають місцеві напої.",
          "V supermarketech se alkohol většinou neprodává. Dovážený alkohol koupíte v Duty Free několik dní po příletu (s pasem). V rámci all inclusive se podávají místní nápoje.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Єгипту з Праги — Хургада, Шарм", "Zájezdy do Egypta — Hurghada, Šarm"),
      description: tx(
        "Відпочинок в Єгипті цілий рік з вильотом з Чехії. Хургада, Шарм-ель-Шейх, Марса-Алам. Ціни в CZK, підбір туру в Telegram.",
        "Dovolená v Egyptě celý rok s odletem z Česka. Hurghada, Šarm aš-Šajch, Marsa Alam. Ceny v CZK, výběr zájezdu přes Telegram.",
      ),
    },
  },
  // ───────────────────────────── GREECE
  {
    slug: "greece",
    name: tx("Греція", "Řecko"),
    nameTo: tx("до Греції", "do Řecka"),
    nameIn: tx("у Греції", "v Řecku"),
    flag: "🇬🇷",
    heroImage: hero("greece"),
    tagline: tx("Тисяча островів і найчистіше море Європи", "Tisíc ostrovů a nejčistší moře Evropy"),
    teaser: tx(
      "Крит, Халкідікі, Родос і Санторіні — таверни, оливки та море кольору бірюзи.",
      "Kréta, Chalkidiki, Rhodos a Santorini — taverny, olivy a tyrkysové moře.",
    ),
    intro: tx(
      "Греція — колиска європейської цивілізації, країна тисячі островів і неймовірно чистого моря. Тут оживають міфи, а кожен вечір пахне свіжими оливками та звучить сіртакі. З Праги до грецьких островів летіти менше трьох годин, а Греція — частина Шенгену, тож подорож максимально проста. Ananas Tour допоможе обрати острів і готель саме під ваш формат відпочинку.",
      "Řecko je kolébkou evropské civilizace, zemí tisíce ostrovů a neuvěřitelně čistého moře. Mýty tu ožívají a každý večer voní čerstvými olivami a zní sirtaki. Z Prahy na řecké ostrovy letíte necelé tři hodiny a Řecko je součástí Schengenu, takže je cesta maximálně jednoduchá. Ananas Tour vám pomůže vybrat ostrov i hotel přesně podle vašich představ.",
    ),
    bestSeason: tx("травень – жовтень", "květen – říjen"),
    flightTime: tx("≈ 2,5–3 год з Праги", "cca 2,5–3 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Крит", "Kréta"),
        text: tx(
          "Найбільший острів Греції: руїни Кносського палацу, рожеві піски Елафонісі, чудова кухня та безкінечні пляжі.",
          "Největší řecký ostrov: ruiny paláce v Knóssu, růžový písek na Elafonisi, skvělá kuchyně a nekonečné pláže.",
        ),
        image: img("greece", 1),
      },
      {
        title: tx("Халкідікі", "Chalkidiki"),
        text: tx(
          "Півострів у формі тризуба Посейдона: соснові ліси, золотий пісок і спокійне море — ідеально для родин.",
          "Poloostrov ve tvaru Poseidonova trojzubce: borové lesy, zlatý písek a klidné moře — ideální pro rodiny.",
        ),
        image: img("greece", 2),
      },
      {
        title: tx("Родос і Санторіні", "Rhodos a Santorini"),
        text: tx(
          "Родос — острів лицарів і сонця. Санторіні — найфотогенічніший острів світу з білими будиночками на скелях і легендарними заходами сонця.",
          "Rhodos je ostrov rytířů a slunce. Santorini je nejfotogeničtější ostrov světa s bílými domky na útesech a legendárními západy slunce.",
        ),
        image: img("greece", 3),
      },
    ],
    money: [
      {
        title: tx("Готівка чи картка?", "Hotovost, nebo karta?"),
        text: tx(
          "Валюта — євро. У готелях і супермаркетах картки приймають без проблем, але в маленьких тавернах на островах краще мати готівку. Перед поїздкою зручно поміняти кілька сотень крон на євро ще в Чехії.",
          "Platí se eurem. V hotelech a supermarketech karty berou bez problémů, v malých tavernách na ostrovech se ale hodí hotovost. Pár stovek korun na eura si pohodlně vyměníte ještě v Česku.",
        ),
      },
      {
        title: tx("Чайові в тавернах", "Spropitné v tavernách"),
        text: tx(
          "Традиційно залишають близько 10 % від рахунку, якщо обслуговування не включене в чек.",
          "Obvykle se nechává kolem 10 % z účtu, pokud obsluha není zahrnutá v ceně.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify travel rules for temporary-protection holders.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Греція — у Шенгені. Зазвичай достатньо біометричного паспорта та чинного документа про перебування в Чехії. Ми підкажемо, що взяти саме у вашій ситуації.",
          "Řecko je v Schengenu. Obvykle stačí biometrický pas a platný doklad o pobytu v Česku. Poradíme, co si vzít právě ve vaší situaci.",
        ),
      },
      {
        title: tx("Сієста", "Siesta"),
        text: tx(
          "З 14:00 до 17:00 багато магазинів і лавок зачинені — саме час для холодного фраппе.",
          "Mezi 14. a 17. hodinou je řada obchodů zavřená — ideální čas na ledové frappé.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Оренда авто — найкращий спосіб побачити дикі пляжі. Між островами курсують пороми та швидкісні катамарани.",
          "Půjčené auto je nejlepší cesta k divokým plážím. Mezi ostrovy jezdí trajekty a rychlé katamarány.",
        ),
      },
      {
        title: tx("Кухня", "Kuchyně"),
        text: tx(
          "Спробуйте справжній грецький салат (хоріатікі), мусаку та свіжі морепродукти.",
          "Ochutnejte pravý řecký salát (choriatiki), musaku a čerstvé plody moře.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Пляжі в Греції платні?", "Jsou pláže v Řecku placené?"),
        a: tx(
          "Усі пляжі належать державі, вхід вільний. Платити треба за шезлонги та парасольки (близько 10–15 € за комплект). Деякі готелі включають їх у ціну — ми уточнимо це при бронюванні.",
          "Všechny pláže jsou státní a vstup je volný. Platí se za lehátka a slunečníky (zhruba 10–15 € za set). Některé hotely je mají v ceně — ověříme to při rezervaci.",
        ),
      },
      {
        q: tx("Як подорожувати між островами?", "Jak cestovat mezi ostrovy?"),
        a: tx(
          "Найпопулярніше — пороми та катамарани. Квитки в липні–серпні краще купувати заздалегідь. Можна також замовити одноденну екскурсію з трансфером від готелю.",
          "Nejoblíbenější jsou trajekty a katamarány. V červenci a srpnu kupujte lístky předem. Můžete si také objednat jednodenní výlet s transferem z hotelu.",
        ),
      },
      {
        // TODO(client): verify driving licence rules for Ukrainian vs. exchanged Czech licences.
        q: tx("Чи потрібні міжнародні права для оренди авто?", "Potřebuji k půjčení auta mezinárodní řidičák?"),
        a: tx(
          "Залежить від вашого посвідчення: чеські права діють у всьому ЄС, для українських вимоги прокатних компаній різняться. Водієві зазвичай має бути від 21–23 років і мати стаж 1–2 роки. Ми перевіримо умови конкретного прокату.",
          "Záleží na vašem průkazu: český řidičák platí v celé EU, u ukrajinského se požadavky půjčoven liší. Řidiči musí být obvykle aspoň 21–23 let a mít praxi 1–2 roky. Podmínky konkrétní půjčovny ověříme.",
        ),
      },
      {
        q: tx("Яке море найтепліше?", "Kde je nejteplejší moře?"),
        a: tx(
          "Егейське (Крит, Родос) прогрівається трохи швидше, але вітряніше. Іонічне (Корфу, Закінф) — спокійніше. На скелястих ділянках бувають морські їжаки, тож візьміть коралки.",
          "Egejské moře (Kréta, Rhodos) se ohřeje o něco dřív, ale víc fouká. Jónské (Korfu, Zakynthos) je klidnější. Na skalnatých místech bývají ježovky, vezměte si boty do vody.",
        ),
      },
      {
        q: tx("Що привезти з Греції?", "Co si přivézt z Řecka?"),
        a: tx(
          "Оливкову олію Extra Virgin, мед із чебрецю, сир фета та косметику з мастикою. Ми підкажемо ринки, де купують самі греки.",
          "Olivový olej extra virgin, tymiánový med, sýr fetu a kosmetiku s mastichou. Poradíme vám trhy, kde nakupují sami Řekové.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Греції з Праги — Крит, Родос", "Zájezdy do Řecka — Kréta, Rhodos"),
      description: tx(
        "Відпочинок у Греції з вильотом з Праги, Брна, Острави, Пардубіце. Крит, Халкідікі, Родос, Санторіні. Підбір туру в Telegram.",
        "Dovolená v Řecku s odletem z Prahy, Brna, Ostravy a Pardubic. Kréta, Chalkidiki, Rhodos, Santorini. Výběr zájezdu přes Telegram.",
      ),
    },
  },
  // ───────────────────────────── BULGARIA
  {
    slug: "bulgaria",
    name: tx("Болгарія", "Bulharsko"),
    nameTo: tx("до Болгарії", "do Bulharska"),
    nameIn: tx("у Болгарії", "v Bulharsku"),
    flag: "🇧🇬",
    heroImage: hero("bulgaria"),
    tagline: tx("Золоті пляжі Чорного моря поруч", "Zlaté pláže Černého moře kousek od domova"),
    teaser: tx(
      "Сонячний Берег, Золоті Піски, Несебр — доступне море для всієї родини, літаком або автобусом.",
      "Slunečné pobřeží, Zlaté písky, Nesebar — dostupné moře pro celou rodinu, letadlem i autobusem.",
    ),
    intro: tx(
      "Болгарія — це сонячне узбережжя з безкраїми золотими пляжами, гори та затишні старовинні містечка. Тут кожен знайде свій формат: від активного молодіжного відпочинку до спокійної сімейної відпустки. Літак із Праги долітає до Бургаса чи Варни приблизно за дві години, а для економних є автобусні тури. Ananas Tour відкриє для вас найкращі курорти Чорноморського узбережжя.",
      "Bulharsko je slunečné pobřeží s nekonečnými zlatými plážemi, hory a útulná historická městečka. Každý si tu najde to své: od dovolené plné zábavy po klidný rodinný odpočinek. Letadlo z Prahy doletí do Burgasu nebo Varny zhruba za dvě hodiny a pro šetřivé jsou tu autobusové zájezdy. Ananas Tour vám ukáže nejlepší letoviska černomořského pobřeží.",
    ),
    bestSeason: tx("червень – вересень", "červen – září"),
    flightTime: tx("≈ 2 год з Праги", "cca 2 h z Prahy"), // TODO(client): verify
    airports: ALL_CZ, // TODO(client): verify seasonal departures
    // TODO(client): verify — Bulgaria adopted the euro on 1 Jan 2026.
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Золоті Піски", "Zlaté písky"),
        text: tx(
          "Перлина болгарської Рив’єри з широкими пляжами та розвиненою інфраструктурою — для любителів нічного життя та водних розваг.",
          "Perla bulharské riviéry se širokými plážemi a skvělým zázemím — pro milovníky nočního života a vodních sportů.",
        ),
        image: img("bulgaria", 1),
      },
      {
        title: tx("Сонячний Берег", "Slunečné pobřeží"),
        text: tx(
          "Найбільший курорт країни з дюнами та чистим морем. Пологий вхід у воду й аквапарки — ідеально для родин із дітьми.",
          "Největší letovisko v zemi s dunami a čistým mořem. Pozvolný vstup do vody a aquaparky — ideální pro rodiny s dětmi.",
        ),
        image: img("bulgaria", 2),
      },
      {
        title: tx("Старий Несебр", "Starý Nesebar"),
        text: tx(
          "Місто-музей під відкритим небом зі списку ЮНЕСКО: середньовічна архітектура та затишні рибні ресторанчики.",
          "Město-muzeum pod širým nebem zapsané na seznamu UNESCO: středověká architektura a útulné rybí restaurace.",
        ),
        image: img("bulgaria", 3),
      },
    ],
    money: [
      {
        // TODO(client): verify — euro since 1 Jan 2026; lev may still appear on some price tags.
        title: tx("Валюта", "Měna"),
        text: tx(
          "З 2026 року Болгарія розраховується в євро, тож брати з собою зручно саме євро. Крони тут не міняють вигідно — поміняйте гроші ще в Чехії або платіть карткою.",
          "Od roku 2026 se v Bulharsku platí eurem, takže si berte eura. Koruny se tu výhodně nevymění — směňte je ještě v Česku nebo plaťte kartou.",
        ),
      },
      {
        title: tx("Ціни та розрахунки", "Ceny a placení"),
        text: tx(
          "Болгарія — одна з найдоступніших країн Європи. Картою можна платити майже всюди, але для ринків і дрібних лавок майте трохи готівки.",
          "Bulharsko patří k nejlevnějším zemím Evropy. Kartou zaplatíte skoro všude, na trhy a v malých stáncích se ale hodí hotovost.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify travel rules for temporary-protection holders.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Болгарія входить до Шенгенської зони. Зазвичай достатньо біометричного паспорта та чинного документа про перебування в ЧР — уточніть у нас свою ситуацію.",
          "Bulharsko je součástí Schengenu. Obvykle stačí biometrický pas a platný doklad o pobytu v ČR — svou situaci s námi raději proberte.",
        ),
      },
      {
        title: tx("Жести", "Gesta"),
        text: tx(
          "Кивок головою в Болгарії часто означає «ні», а похитування в боки — «так». Краще перепитуйте словами «да» чи «не».",
          "Kývnutí hlavou v Bulharsku často znamená „ne“ a vrtění „ano“. Raději se ptejte slovy „da“ a „ne“.",
        ),
      },
      {
        title: tx("Мінеральні джерела", "Minerální prameny"),
        text: tx(
          "Поєднайте море з оздоровленням: у Св. Костянтині та Олені термальна вода надходить прямо в басейни готелів.",
          "Spojte moře s wellness: ve Sv. Konstantinu a Eleně teče termální voda přímo do hotelových bazénů.",
        ),
      },
      {
        title: tx("Смаки Болгарії", "Chutě Bulharska"),
        text: tx(
          "Спробуйте шопський салат, баніцу з бринзою, каварму та місцеві вина — кухня ситна й дуже близька нам за смаком.",
          "Ochutnejte šopský salát, banicu s balkánským sýrem, kavarmu a místní víno — kuchyně je vydatná a chutná jako domácí.",
        ),
      },
    ],
    faq: [
      {
        // TODO(client): verify bus tour duration and availability from CZ.
        q: tx("Скільки їхати автобусом із Чехії?", "Jak dlouho se jede autobusem z Česka?"),
        a: tx(
          "Дорога з Праги чи Брна триває приблизно добу. Це найбюджетніший спосіб дістатися моря, але якщо цінуєте час — ми підберемо авіатур із вильотом із найближчого до вас аеропорту.",
          "Cesta z Prahy nebo Brna trvá zhruba den. Je to nejlevnější způsob, jak se dostat k moři, ale pokud vám záleží na čase, vybereme letecký zájezd z letiště nejblíž vám.",
        ),
      },
      {
        q: tx("Чи можна прийти на пляж зі своєю парасолькою?", "Můžu na pláž s vlastním slunečníkem?"),
        a: tx(
          "Так. Пляжі поділені на платні зони з шезлонгами та вільні зони, де можна відпочивати зі своїм рушником і парасолькою безкоштовно.",
          "Ano. Pláže jsou rozdělené na placené zóny s lehátky a volné zóny, kde můžete být zdarma s vlastním ručníkem a slunečníkem.",
        ),
      },
      {
        q: tx("Брати «все включено» чи харчуватися в тавернах?", "Vzít all inclusive, nebo jíst v tavernách?"),
        a: tx(
          "Болгарія — одна з небагатьох країн, де вигідно брати лише сніданки: у місцевих механах ціни демократичні, а порції величезні.",
          "Bulharsko je jedna z mála zemí, kde se vyplatí jen snídaně: v místních mechanách jsou ceny příznivé a porce obrovské.",
        ),
      },
      {
        q: tx("Де знайти гарячі джерела біля моря?", "Kde najdu termální prameny u moře?"),
        a: tx(
          "Найкращий вибір — курорт Св. Костянтин і Олена або Сонячний День. Термальна вода там надходить прямо в басейни готелів.",
          "Nejlepší volba je letovisko Sv. Konstantin a Elena nebo Sunny Day. Termální voda tam teče přímo do hotelových bazénů.",
        ),
      },
      {
        q: tx("Чи приймають у Болгарії крони?", "Berou v Bulharsku koruny?"),
        a: tx(
          "Ні, розрахунки в євро. Найзручніше платити карткою чеського банку або взяти готівкові євро з дому.",
          "Ne, platí se eurem. Nejpohodlnější je platit kartou české banky nebo si vzít hotovost v eurech z domova.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Болгарії з Чехії — літак і автобус", "Zájezdy do Bulharska — letecky i autobusem"),
      description: tx(
        "Відпочинок у Болгарії з Праги, Брна, Острави. Сонячний Берег, Золоті Піски, Несебр. Ціни в CZK, підбір туру в Telegram.",
        "Dovolená v Bulharsku z Prahy, Brna a Ostravy. Slunečné pobřeží, Zlaté písky, Nesebar. Ceny v CZK, výběr zájezdu přes Telegram.",
      ),
    },
  },
  // ───────────────────────────── UAE
  {
    slug: "uae",
    name: tx("ОАЕ", "SAE"),
    nameTo: tx("до ОАЕ", "do SAE"),
    nameIn: tx("в ОАЕ", "v SAE"),
    flag: "🇦🇪",
    heroImage: hero("uae"),
    tagline: tx("Пустеля, хмарочоси й сонце взимку", "Poušť, mrakodrapy a slunce i v zimě"),
    teaser: tx(
      "Дубай, Абу-Дабі та Рас-ель-Хайма — розкішні пляжі, шопінг і розваги світового рівня.",
      "Dubaj, Abú Dhabí a Ras al-Chajma — luxusní pláže, nákupy a zábava světové úrovně.",
    ),
    intro: tx(
      "Об’єднані Арабські Емірати — країна, де пустеля зустрічається з футуристичними містами, а традиції Сходу — з технологіями майбутнього. Штучні острови, найвищі хмарочоси світу та тепла Перська затока з жовтня до квітня. З Праги до Дубая — прямий переліт, тож Емірати ідеальні для зимової відпустки. Ananas Tour підбере готель у Дубаї, спокійному аристократичному Абу-Дабі чи на пляжах Рас-ель-Хайми.",
      "Spojené arabské emiráty jsou zemí, kde se poušť potkává s futuristickými městy a tradice Orientu s technologiemi budoucnosti. Umělé ostrovy, nejvyšší mrakodrapy světa a teplý Perský záliv od října do dubna. Z Prahy do Dubaje se létá přímo, takže jsou Emiráty ideální na zimní dovolenou. Ananas Tour vybere hotel v Dubaji, v klidném a noblesním Abú Dhabí nebo na plážích Ras al-Chajmy.",
    ),
    bestSeason: tx("жовтень – квітень", "říjen – duben"),
    flightTime: tx("≈ 6 год з Праги", "cca 6 h z Prahy"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("дирхам ОАЕ (AED)", "dirham SAE (AED)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Дубай", "Dubaj"),
        text: tx(
          "Бурдж-Халіфа, Пальма Джумейра, гігантські моли та пляжі в самому місті — для тих, хто хоче побачити все й одразу.",
          "Burdž Chalífa, Palma Džumeira, obří nákupní centra a pláže přímo ve městě — pro ty, kdo chtějí vidět všechno najednou.",
        ),
        image: img("uae", 1),
      },
      {
        title: tx("Абу-Дабі", "Abú Dhabí"),
        text: tx(
          "Велична столиця: мечеть Шейха Заїда, Лувр Абу-Дабі та острів Яс із Ferrari World, трасою Формули-1 та аквапарками.",
          "Majestátní hlavní město: mešita šejcha Zajída, Louvre Abú Dhabí a ostrov Yas s Ferrari World, okruhem F1 a aquaparky.",
        ),
        image: img("uae", 2),
      },
      {
        title: tx("Рас-ель-Хайма", "Ras al-Chajma"),
        text: tx(
          "Спокійніший емірат із широкими пляжами, горами Хаджар і чудовими all inclusive — часто вигідніше за Дубай.",
          "Klidnější emirát se širokými plážemi, pohořím Hadžar a skvělými all inclusive hotely — často výhodnější než Dubaj.",
        ),
        image: img("uae", 3),
      },
    ],
    money: [
      {
        title: tx("Готівка чи картка?", "Hotovost, nebo karta?"),
        text: tx(
          "Дирхам прив’язаний до долара, тож курс стабільний. Картки приймають майже скрізь — від бутиків до таксі. Для чайових і традиційних ринків (суків) майте трохи готівки.",
          "Dirham je navázaný na dolar, takže je kurz stabilní. Karty berou skoro všude — od butiků po taxi. Na spropitné a tradiční trhy (súky) mějte trochu hotovosti.",
        ),
      },
      {
        title: tx("Валютний обмін", "Směna"),
        text: tx(
          "Євро чи долари вигідніше міняти в обмінниках (Exchange) у торгових центрах, ніж у готелі чи аеропорту.",
          "Eura nebo dolary se vyplatí měnit ve směnárnách (Exchange) v nákupních centrech, ne v hotelu nebo na letišti.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Дрес-код", "Oblékání"),
        text: tx(
          "Емірати — мусульманська країна. У торгових центрах і держустановах обирайте закритий одяг; у готелях і на пляжах правила вільніші.",
          "Emiráty jsou muslimská země. V nákupních centrech a na úřadech volte zakryté oblečení, v hotelech a na plážích jsou pravidla volnější.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Найзручніше — офіційні таксі з лічильником, метро в Дубаї або оренда авто. Між Абу-Дабі та Дубаєм ходять комфортні автобуси.",
          "Nejpohodlnější jsou oficiální taxíky s taxametrem, metro v Dubaji nebo půjčené auto. Mezi Abú Dhabí a Dubají jezdí pohodlné autobusy.",
        ),
      },
      {
        title: tx("Кухня", "Kuchyně"),
        text: tx(
          "Скуштуйте арабську каву з кардамоном і фініками, хумус і морепродукти за місцевими рецептами.",
          "Ochutnejte arabskou kávu s kardamomem a datlemi, hummus a mořské plody podle místních receptů.",
        ),
      },
      {
        title: tx("Сезон", "Sezóna"),
        text: tx(
          "Ідеальний час — з жовтня до квітня. Влітку спека понад 40 °C, зате ціни на готелі помітно нижчі.",
          "Ideální doba je od října do dubna. V létě bývá přes 40 °C, ceny hotelů jsou ale výrazně nižší.",
        ),
      },
    ],
    faq: [
      {
        // TODO(client): verify current tourism fee amounts per emirate.
        q: tx("Що таке туристичний збір (Tourism Dirham)?", "Co je turistický poplatek (Tourism Dirham)?"),
        a: tx(
          "У готелях ОАЕ стягують обов’язковий збір за номер за ніч — його розмір залежить від емірату та категорії готелю. Сплачується на місці при заселенні чи виїзді, готівкою або карткою.",
          "Hotely v SAE vybírají povinný poplatek za pokoj a noc — výše závisí na emirátu a kategorii hotelu. Platí se na místě při příjezdu nebo odjezdu, hotově nebo kartou.",
        ),
      },
      {
        q: tx("Де можна купити алкоголь?", "Kde se dá koupit alkohol?"),
        a: tx(
          "Алкоголь подають у ресторанах і барах готелів з ліцензією. Вживати його в громадських місцях — на вулиці чи пляжі — суворо заборонено.",
          "Alkohol se podává v hotelových restauracích a barech s licencí. Pít na veřejnosti — na ulici nebo pláži — je přísně zakázané.",
        ),
      },
      {
        q: tx("Чи вигідні комбіновані квитки в парки острова Яс?", "Vyplatí se kombinované vstupenky do parků na Yas?"),
        a: tx(
          "Так. Якщо плануєте Ferrari World, Warner Bros. World чи Yas Waterworld, беріть Multi-Park Ticket на 2–3 дні. Ми допоможемо забронювати квитки заздалегідь.",
          "Ano. Pokud plánujete Ferrari World, Warner Bros. World nebo Yas Waterworld, vezměte si Multi-Park Ticket na 2–3 dny. Vstupenky vám pomůžeme zarezervovat předem.",
        ),
      },
      {
        q: tx("Як одягатися жінкам у місті?", "Jak se mají ženy oblékat ve městě?"),
        a: tx(
          "У готелі — як завгодно. Для моллів і набережної обирайте одяг, що закриває плечі й коліна. У Великій мечеті Шейха Заїда видають абаю.",
          "V hotelu jakkoli. Do obchodních center a na nábřeží volte oblečení zakrývající ramena a kolena. Ve Velké mešitě šejcha Zajída vám půjčí abáju.",
        ),
      },
      {
        q: tx("Чи варто летіти під час Рамадану?", "Vyplatí se letět během ramadánu?"),
        a: tx(
          "Це особливий досвід: ціни на готелі часто нижчі, вечори дуже атмосферні з вечерями-іфтарами. Вдень їсти й пити в громадських місцях не можна, частина ресторанів поза готелями зачинена.",
          "Je to zvláštní zážitek: ceny hotelů bývají nižší a večery s iftarem jsou velmi atmosférické. Přes den se na veřejnosti nesmí jíst ani pít a část restaurací mimo hotely je zavřená.",
        ),
      },
      {
        q: tx("Чому готель просить депозит при заселенні?", "Proč hotel chce při příjezdu zálohu?"),
        a: tx(
          "Більшість готелів 5* блокують депозит на картці або беруть готівку на випадок додаткових послуг. Ми можемо заздалегідь попросити прибрати міні-бар, щоб депозит був меншим.",
          "Většina hotelů 5* blokuje zálohu na kartě nebo vybírá hotovost pro případ dalších služeb. Můžeme předem požádat o vyklizení minibaru, aby byla záloha nižší.",
        ),
      },
    ],
    seo: {
      title: tx("Тури в ОАЕ з Праги — Дубай, Абу-Дабі", "Zájezdy do SAE — Dubaj, Abú Dhabí"),
      description: tx(
        "Відпочинок в Еміратах із прямим перельотом з Праги. Дубай, Абу-Дабі, Рас-ель-Хайма. Ціни в CZK, підбір туру в Telegram.",
        "Dovolená v Emirátech s přímým letem z Prahy. Dubaj, Abú Dhabí, Ras al-Chajma. Ceny v CZK, výběr zájezdu přes Telegram.",
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
    tagline: tx("Острів, де зупиняється час", "Ostrov, kde se zastaví čas"),
    teaser: tx(
      "Вілли над водою, коралові рифи та бірюзовий океан — медовий місяць мрії чи тиха втеча від усього.",
      "Vily nad vodou, korálové útesy a tyrkysový oceán — vysněné líbánky nebo klidný únik od všeho.",
    ),
    intro: tx(
      "Мальдіви — понад тисяча коралових островів, загублених в Індійському океані. Тут єдиний шум — шелест пальм і легкий прибій. Один острів — один готель: повна приватність і бездоганний сервіс. Ananas Tour допоможе обрати резорт під ваш бюджет — від затишних гестхаусів на локальних островах до вілл над водою — і продумає зручний переліт із Праги.",
      "Maledivy jsou víc než tisíc korálových ostrovů ztracených v Indickém oceánu. Jediný zvuk je tu šumění palem a jemný příboj. Jeden ostrov — jeden hotel: naprosté soukromí a bezchybný servis. Ananas Tour vám pomůže vybrat resort podle rozpočtu — od útulných guesthousů na místních ostrovech po vily nad vodou — a vymyslí pohodlný let z Prahy.",
    ),
    bestSeason: tx("листопад – квітень", "listopad – duben"),
    flightTime: tx("≈ 10–12 год (з пересадкою або чартером)", "cca 10–12 h (s přestupem nebo charterem)"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("руфія (MVR), на курортах — USD", "rupie (MVR), v resortech USD"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Острови-резорти", "Ostrovní resorty"),
        text: tx(
          "Класичний мальдівський формат: один острів — один готель. Приватність, бездоганний сервіс і легендарні бунгало над водою.",
          "Klasické Maledivy: jeden ostrov — jeden hotel. Soukromí, bezchybný servis a legendární bungalovy nad vodou.",
        ),
        image: img("maldives", 1),
      },
      {
        title: tx("Локальні острови", "Místní ostrovy"),
        text: tx(
          "Доступніший варіант: гестхауси на Маафуші, Тулусду чи Тодду. Ви побачите справжнє життя мальдівців.",
          "Dostupnější varianta: guesthousy na Maafushi, Thulusdhoo nebo Thoddoo. Poznáte skutečný život Maledivanů.",
        ),
        image: img("maldives", 2),
      },
      {
        title: tx("Дайвінг і снорклінг", "Potápění a šnorchlování"),
        text: tx(
          "Коралові сади, манти, китові акули та мільйони яскравих рибок — просто біля берега готелю.",
          "Korálové zahrady, manty, žraloci velrybí a miliony barevných rybek — přímo u břehu hotelu.",
        ),
        image: img("maldives", 3),
      },
    ],
    money: [
      {
        title: tx("Долари та картки", "Dolary a karty"),
        text: tx(
          "На курортах основна валюта — долар США та міжнародні картки. Руфія вам майже не знадобиться. Візьміть дрібні долари для чайових.",
          "V resortech se platí americkým dolarem a mezinárodními kartami, rupie skoro nebudete potřebovat. Vezměte si drobné dolary na spropitné.",
        ),
      },
      {
        // TODO(client): verify current TGST rate.
        title: tx("Система розрахунків", "Jak se platí"),
        text: tx(
          "Зазвичай усі витрати записують на номер, а рахунок оплачують при виїзді. До цін часто додають податок (TGST) і сервісний збір — позначка «++» у меню.",
          "Obvykle se vše píše na pokoj a účet se platí při odjezdu. K cenám se často připočítává daň (TGST) a servisní poplatek — v menu je to značka „++“.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Трансфер", "Transfer"),
        text: tx(
          "До острова добираються швидкісним катером, гідролітаком або внутрішнім рейсом. Гідролітак — окрема екскурсія з неймовірними краєвидами!",
          "Na ostrov se dostanete rychlým člunem, hydroplánem nebo vnitrostátním letem. Hydroplán je sám o sobě výlet s úžasnými výhledy!",
        ),
      },
      {
        title: tx("Культура", "Kultura"),
        text: tx(
          "Мальдіви — мусульманська країна. Алкоголь дозволений лише на островах-резортах; на локальних островах дотримуйтеся дрес-коду поза «бікіні-пляжами».",
          "Maledivy jsou muslimská země. Alkohol je povolený jen v resortech, na místních ostrovech dodržujte mimo „bikini pláže“ dress code.",
        ),
      },
      {
        title: tx("Захист природи", "Ochrana přírody"),
        text: tx(
          "Вивозити корали, мушлі та пісок суворо заборонено. Бережіть цей крихкий рай.",
          "Vyvážet korály, mušle a písek je přísně zakázané. Chraňte tenhle křehký ráj.",
        ),
      },
      {
        title: tx("Коли їхати", "Kdy jet"),
        text: tx(
          "Найкращий сезон — з листопада по квітень. Літо чудове для серфінгу та спокійного відпочинку за вигіднішими цінами.",
          "Nejlepší sezóna je od listopadu do dubna. Léto je skvělé na surfování a klidnou dovolenou za nižší ceny.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Чи можна привезти алкоголь із Duty Free?", "Můžu si přivézt alkohol z Duty Free?"),
        a: tx(
          "Ні. Ввезення алкоголю заборонене — пляшки вилучать на митниці й повернуть лише при вильоті. На островах-резортах алкоголь вільно продається в барах.",
          "Ne. Dovoz alkoholu je zakázaný — lahve vám na celnici zabaví a vrátí až při odletu. V resortech se alkohol běžně prodává v barech.",
        ),
      },
      {
        q: tx("Що, як рейс прилітає пізно ввечері?", "Co když přiletíme pozdě večer?"),
        a: tx(
          "Гідролітаки літають лише у світлий час доби. Якщо рейс прибуває пізно, доведеться переночувати біля аеропорту Мале. Швидкісні катери ходять і ввечері — залежить від віддаленості острова.",
          "Hydroplány létají jen za světla. Pokud přiletíte pozdě, přespíte u letiště v Male. Rychlé čluny jezdí i večer — záleží na vzdálenosti ostrova.",
        ),
      },
      {
        q: tx("Що означає «++» у рахунках?", "Co znamená „++“ na účtech?"),
        a: tx(
          "Що до ціни додадуть державний податок TGST і 10 % сервісного збору. Тому ми зазвичай радимо All Inclusive — ці витрати вже враховані.",
          "Že se k ceně přičte státní daň TGST a 10% servisní poplatek. Proto obvykle doporučujeme All Inclusive — tyhle náklady už jsou v ceně.",
        ),
      },
      {
        q: tx("Чи дорого харчуватися, якщо лише сніданки?", "Je drahé stravovat se, když máme jen snídaně?"),
        a: tx(
          "Так, усі продукти імпортні, обід може коштувати 50–100 $ на людину. Радимо повний пансіон або All Inclusive, щоб бюджет був під контролем.",
          "Ano, všechny potraviny se dovážejí a oběd může stát 50–100 $ na osobu. Doporučujeme plnou penzi nebo All Inclusive, ať máte rozpočet pod kontrolou.",
        ),
      },
      {
        q: tx("Чи безпечно плавати на домашньому рифі?", "Je bezpečné šnorchlovat na domácím útesu?"),
        a: tx(
          "Загалом так, але стежте за течіями й не запливайте за риф наодинці. Рифові акули безпечні для людей; головна небезпека — гострі корали та екваторіальне сонце.",
          "Obecně ano, ale sledujte proudy a za útes sami neplavte. Útesoví žraloci jsou pro lidi neškodní, hlavní nebezpečí jsou ostré korály a rovníkové slunce.",
        ),
      },
      {
        q: tx("Чи можна взяти дрон?", "Můžu si vzít dron?"),
        a: tx(
          "Більшість преміум-резортів забороняють дрони заради приватності гостей. Якщо плануєте зйомку, ми заздалегідь перевіримо правила обраного готелю.",
          "Většina prémiových resortů drony kvůli soukromí hostů zakazuje. Pokud plánujete natáčet, pravidla vybraného hotelu předem ověříme.",
        ),
      },
    ],
    seo: {
      title: tx("Тури на Мальдіви з Праги — резорти та вілли", "Zájezdy na Maledivy z Prahy"),
      description: tx(
        "Мальдіви з вильотом із Праги: острови-резорти, вілли над водою, локальні острови. Ціни в CZK, підбір у Telegram.",
        "Maledivy s odletem z Prahy: ostrovní resorty, vily nad vodou, místní ostrovy. Ceny v CZK, výběr přes Telegram.",
      ),
    },
  },
  // ───────────────────────────── VIETNAM
  {
    slug: "vietnam",
    name: tx("В’єтнам", "Vietnam"),
    nameTo: tx("до В’єтнаму", "do Vietnamu"),
    nameIn: tx("у В’єтнамі", "ve Vietnamu"),
    flag: "🇻🇳",
    heroImage: hero("vietnam"),
    tagline: tx("Екзотика, кухня і море Нячангу", "Exotika, kuchyně a moře v Nha Trangu"),
    teaser: tx(
      "Білі пляжі, острів розваг Vinpearl, SPA та найсмачніший суп фо — Азія для першого знайомства.",
      "Bílé pláže, zábavní ostrov Vinpearl, lázně a nejlepší polévka phở — Asie na první seznámení.",
    ),
    intro: tx(
      "В’єтнам — країна контрастів, де гори зустрічаються з бірюзовим морем, а давні пагоди сусідять із хмарочосами. Він підкорює щирістю, кухнею та особливим спокоєм. До речі, у Чехії велика в’єтнамська громада — тож фо ви, напевно, вже куштували, але на батьківщині він ще смачніший. Ananas Tour запрошує до Нячангу — головної морської перлини країни.",
      "Vietnam je země kontrastů, kde se hory potkávají s tyrkysovým mořem a staré pagody stojí vedle mrakodrapů. Okouzlí upřímností, kuchyní a zvláštním klidem. Phở jste v Česku jistě ochutnali, ale ve Vietnamu chutná ještě lépe. Ananas Tour vás zve do Nha Trangu — hlavní přímořské perly země.",
    ),
    bestSeason: tx("лютий – вересень (Нячанг)", "únor – září (Nha Trang)"),
    flightTime: tx("≈ 12–15 год з пересадкою", "cca 12–15 h s přestupem"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("в’єтнамський донг (VND)", "vietnamský dong (VND)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Пляжі та Vinpearl", "Pláže a Vinpearl"),
        text: tx(
          "Кілометри набережної з білим піском і острів розваг Vinpearl, до якого веде одна з найдовших канатних доріг над морем.",
          "Kilometry promenády s bílým pískem a zábavní ostrov Vinpearl, kam vede jedna z nejdelších lanovek nad mořem.",
        ),
        image: img("vietnam", 1),
      },
      {
        title: tx("Оздоровлення та SPA", "Wellness a lázně"),
        text: tx(
          "Термальні джерела та цілющі грязі — у Нячанзі чудово відновлюють сили.",
          "Termální prameny a léčivé bahenní koupele — v Nha Trangu skvěle nabijete síly.",
        ),
        image: img("vietnam", 2),
      },
      {
        title: tx("Гастрономічний рай", "Gastronomický ráj"),
        text: tx(
          "Столиця морепродуктів: лобстери на грилі, суп фо та в’єтнамська кава зі згущеним молоком.",
          "Hlavní město mořských plodů: humři z grilu, polévka phở a vietnamská káva s kondenzovaným mlékem.",
        ),
        image: img("vietnam", 3),
      },
    ],
    money: [
      {
        title: tx("Долари на донги", "Dolary na dongy"),
        text: tx(
          "Найвигідніше міняти готівкові долари або євро в банках чи ювелірних крамницях. За нові купюри великого номіналу курс кращий.",
          "Nejvýhodněji vyměníte hotovostní dolary nebo eura v bankách či zlatnictvích. Za nové bankovky vyšších hodnot je lepší kurz.",
        ),
      },
      {
        title: tx("Оплата та чайові", "Placení a spropitné"),
        text: tx(
          "У готелях і ТЦ приймають картки, на ринках і у вуличних кафе потрібна готівка. Чайові необов’язкові, але завжди вітаються.",
          "V hotelech a obchodních centrech berou karty, na trzích a v pouličních bistrech potřebujete hotovost. Spropitné není povinné, ale vždy potěší.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify e-visa / visa-free rules by citizenship.
        title: tx("Віза", "Vízum"),
        text: tx(
          "Для багатьох громадянств потрібна електронна віза, яку оформлюють заздалегідь. Ми перевіримо вимоги для вашого паспорта й допоможемо з деталями.",
          "Pro řadu občanství je potřeba elektronické vízum, které se vyřizuje předem. Ověříme požadavky pro váš pas a pomůžeme s detaily.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Найпопулярніше — таксі через Grab. Переходячи дорогу, рухайтеся плавно та впевнено.",
          "Nejoblíbenější je taxi přes aplikaci Grab. Silnici přecházejte plynule a s jistotou.",
        ),
      },
      {
        title: tx("Храми", "Chrámy"),
        text: tx(
          "Відвідайте вежі По Нагар і пагоду Лонг Шон. Плечі й коліна мають бути закриті.",
          "Navštivte věže Po Nagar a pagodu Long Son. Ramena a kolena mějte zakrytá.",
        ),
      },
      {
        title: tx("Що привезти", "Co přivézt"),
        text: tx(
          "В’єтнамську каву, шовк і перли, які вирощують прямо в бухті Нячангу.",
          "Vietnamskou kávu, hedvábí a perly, které se pěstují přímo v zátoce Nha Trangu.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Коли в Нячанзі сезон дощів?", "Kdy je v Nha Trangu období dešťů?"),
        a: tx(
          "З жовтня по грудень — море може штормити. Найкращий час для пляжу — з лютого по вересень.",
          "Od října do prosince — moře bývá rozbouřené. Nejlepší doba na pláž je od února do září.",
        ),
      },
      {
        q: tx("Як перейти дорогу в потоці байків?", "Jak přejít silnici v proudu motorek?"),
        a: tx(
          "Рухайтеся повільно та передбачувано, не зупиняйтеся посеред дороги — водії самі об’їдуть. Можна підняти руку або йти поруч із місцевим.",
          "Jděte pomalu a předvídatelně, uprostřed silnice nezastavujte — řidiči vás objedou. Můžete zvednout ruku nebo jít s místními.",
        ),
      },
      {
        q: tx("Чи безпечний лід у напоях?", "Je led v nápojích bezpečný?"),
        a: tx(
          "У більших кафе лід фабричний (циліндрики з отвором) — він безпечний. Колотого вручну льоду в дрібних закладах краще уникати.",
          "Ve větších kavárnách je led z továrny (válečky s dírkou) a je bezpečný. Ručně sekanému ledu v malých podnicích se raději vyhněte.",
        ),
      },
      {
        q: tx("Чи потрібна місцева SIM-картка?", "Potřebuji místní SIM kartu?"),
        a: tx(
          "Так, для Grab (таксі та доставка їжі) — ціни там фіксовані й нижчі, ніж у вуличних таксистів. Картку Viettel чи Vinaphone купите в аеропорту Камрань.",
          "Ano, kvůli Grabu (taxi a rozvoz jídla) — ceny jsou pevné a nižší než u pouličních taxikářů. Kartu Viettel nebo Vinaphone koupíte na letišti Cam Ranh.",
        ),
      },
      {
        q: tx("Якою мовою спілкуватися?", "Jak se domluvit?"),
        a: tx(
          "У великих готелях допоможе англійська. На ринках найпростіше — калькулятор у телефоні, де ви з продавцем набираєте ціну.",
          "Ve velkých hotelech pomůže angličtina. Na trzích je nejjednodušší kalkulačka v telefonu, kam s prodejcem vyťukáte cenu.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до В’єтнаму з Праги — Нячанг", "Zájezdy do Vietnamu — Nha Trang"),
      description: tx(
        "Відпочинок у В’єтнамі з Праги: пляжі Нячангу, Vinpearl, SPA. Ціни в CZK, підбір туру в Telegram за 15 хвилин.",
        "Dovolená ve Vietnamu z Prahy: pláže Nha Trangu, Vinpearl, lázně. Ceny v CZK, výběr zájezdu přes Telegram do 15 minut.",
      ),
    },
  },
  // ───────────────────────────── SPAIN
  {
    slug: "spain",
    name: tx("Іспанія", "Španělsko"),
    nameTo: tx("до Іспанії", "do Španělska"),
    nameIn: tx("в Іспанії", "ve Španělsku"),
    flag: "🇪🇸",
    heroImage: hero("spain"),
    tagline: tx("Сонце, фієста і Канари цілий рік", "Slunce, fiesta a Kanáry po celý rok"),
    teaser: tx(
      "Майорка, Тенеріфе, Коста-Брава та Барселона — пляжі, тапас і Гауді.",
      "Mallorca, Tenerife, Costa Brava a Barcelona — pláže, tapas a Gaudí.",
    ),
    intro: tx(
      "Іспанія — країна вічного сонця, пристрасного фламенко та неймовірної енергії. Архітектура Барселони й Мадрида тут поєднується з пляжами Коста-Дорадо та Балеарських островів, а Канари гріють навіть узимку. Із Праги до Майорки летіти приблизно 2,5 години. Ananas Tour запрошує відчути справжню іспанську фієсту.",
      "Španělsko je země věčného slunce, vášnivého flamenka a neuvěřitelné energie. Architektura Barcelony a Madridu se tu snoubí s plážemi Costa Dorada a Baleárských ostrovů a Kanáry hřejí i v zimě. Z Prahy na Mallorku letíte zhruba 2,5 hodiny. Ananas Tour vás zve na pravou španělskou fiestu.",
    ),
    bestSeason: tx("червень – вересень; Канари — цілий рік", "červen – září; Kanáry celoročně"),
    flightTime: tx("≈ 2,5 год (Майорка), ≈ 5 год (Канари)", "cca 2,5 h (Mallorca), cca 5 h (Kanáry)"), // TODO(client): verify
    airports: ["PRG", "BRQ", "OSR"], // TODO(client): verify
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Барселона та Коста-Брава", "Barcelona a Costa Brava"),
        text: tx(
          "Шедеври Гауді, Готичний квартал і скелясті береги — поєднання екскурсій із відпочинком у затишних бухтах.",
          "Gaudího skvosty, Gotická čtvrť a skalnaté pobřeží — spojení výletů s odpočinkem v klidných zátokách.",
        ),
        image: img("spain", 1),
      },
      {
        title: tx("Коста-Дорада", "Costa Dorada"),
        text: tx(
          "«Золоте узбережжя» з пологим входом у море та парком PortAventura — найкращий вибір для родин із дітьми.",
          "„Zlaté pobřeží“ s pozvolným vstupem do moře a parkem PortAventura — nejlepší volba pro rodiny s dětmi.",
        ),
        image: img("spain", 2),
      },
      {
        title: tx("Майорка та Тенеріфе", "Mallorca a Tenerife"),
        text: tx(
          "Майорка — перлина Середземномор’я з розкішними бухтами. Тенеріфе — «острів вічної весни» з вулканом Тейде.",
          "Mallorca je perla Středomoří s nádhernými zátokami. Tenerife je „ostrov věčného jara“ se sopkou Teide.",
        ),
        image: img("spain", 3),
      },
    ],
    money: [
      {
        title: tx("Безготівкова оплата", "Placení kartou"),
        text: tx(
          "Картки приймають майже скрізь — від кав’ярень до сувенірних лавок. Трохи готівки знадобиться для транспорту та чайових.",
          "Kartou zaplatíte skoro všude — od kaváren po suvenýry. Trochu hotovosti se hodí na dopravu a spropitné.",
        ),
      },
      {
        title: tx("Банкомати та комісії", "Bankomaty a poplatky"),
        text: tx(
          "Банкомати (cajeros) є всюди. Зважайте на комісію місцевого банку та відмовляйтеся від конвертації в крони — обирайте зняття в євро.",
          "Bankomaty (cajeros) jsou všude. Hlídejte poplatek místní banky a odmítněte převod na koruny — vybírejte v eurech.",
        ),
      },
    ],
    tips: [
      {
        title: tx("Сієста", "Siesta"),
        text: tx(
          "Багато магазинів зачиняються з 14:00 до 17:00 — час для неспішного обіду.",
          "Řada obchodů zavírá mezi 14. a 17. hodinou — čas na pomalý oběd.",
        ),
      },
      {
        title: tx("Гастрономія", "Gastronomie"),
        text: tx(
          "Паелья, гаспачо, хамон і сангрія. Вечеря в Іспанії починається не раніше 20:00–21:00.",
          "Paella, gazpacho, jamón a sangria. Večeře se ve Španělsku začíná až po 20.–21. hodině.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Потяги RENFE та автобуси працюють бездоганно, а орендоване авто відкриє дикі пляжі та затишні села.",
          "Vlaky RENFE a autobusy fungují skvěle, půjčené auto vám ukáže divoké pláže a malebné vesnice.",
        ),
      },
      {
        title: tx("Шопінг", "Nákupy"),
        text: tx(
          "Найкращі розпродажі (rebajas) — у січні–лютому та липні–серпні.",
          "Nejlepší výprodeje (rebajas) jsou v lednu–únoru a v červenci–srpnu.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Чи потрібно платити туристичний збір?", "Platí se turistická daň?"),
        a: tx(
          "Так, у багатьох регіонах (особливо в Каталонії та на Балеарах) — від 1 до 5 € з особи за ніч залежно від категорії готелю. Платять на місці.",
          "Ano, v mnoha regionech (hlavně v Katalánsku a na Baleárech) — 1 až 5 € za osobu a noc podle kategorie hotelu. Platí se na místě.",
        ),
      },
      {
        q: tx("Скільки коштують шезлонги?", "Kolik stojí lehátka?"),
        a: tx(
          "Пляжі державні й безкоштовні. Комплект (парасолька + 2 шезлонги) — у середньому 15–20 € на день. На своєму рушнику можна лежати будь-де.",
          "Pláže jsou státní a zdarma. Set (slunečník + 2 lehátka) stojí v průměru 15–20 € na den. Na vlastním ručníku můžete ležet kdekoli.",
        ),
      },
      {
        q: tx("Чому ресторани зачинені о 18:00?", "Proč mají restaurace v 18:00 zavřeno?"),
        a: tx(
          "Обід в Іспанії — з 13:30 до 16:00, вечеря — після 20:00. Якщо зголодніли раніше, шукайте тапас-бари.",
          "Oběd je ve Španělsku od 13:30 do 16:00, večeře po 20:00. Když dostanete hlad dřív, zajděte do tapas baru.",
        ),
      },
      {
        q: tx("Як не стояти в чергах у PortAventura?", "Jak se vyhnout frontám v PortAventuře?"),
        a: tx(
          "Купуйте квитки онлайн заздалегідь, у сезон — з Express Pass. Вигідно жити в готелі парку: квитки вже включені.",
          "Kupte vstupenky online předem, v sezóně s Express Passem. Výhodné je bydlet v hotelu přímo v parku — vstupenky jsou v ceně.",
        ),
      },
      {
        q: tx("Наскільки безпечно в туристичних центрах?", "Jak bezpečná jsou turistická centra?"),
        a: tx(
          "Іспанія безпечна, але в Барселоні та Мадриді активні кишенькові злодії. Не залишайте телефон на столику кафе й тримайте рюкзак перед собою.",
          "Španělsko je bezpečné, ale v Barceloně a Madridu řádí kapsáři. Nenechávejte telefon na stolku a batoh noste před sebou.",
        ),
      },
      {
        q: tx("Чи можна пити воду з-під крана?", "Dá se pít voda z kohoutku?"),
        a: tx(
          "Офіційно вона питна, але має специфічний присмак через мінерали. Бутильована вода в супермаркеті коштує копійки.",
          "Oficiálně je pitná, ale kvůli minerálům má zvláštní chuť. Balená voda stojí v supermarketu pár centů.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Іспанії з Праги — Майорка, Канари", "Zájezdy do Španělska — Mallorca, Kanáry"),
      description: tx(
        "Відпочинок в Іспанії з вильотом із Праги, Брна, Острави. Майорка, Тенеріфе, Коста-Брава, Коста-Дорада. Підбір у Telegram.",
        "Dovolená ve Španělsku s odletem z Prahy, Brna a Ostravy. Mallorca, Tenerife, Costa Brava, Costa Dorada. Výběr přes Telegram.",
      ),
    },
  },
  // ───────────────────────────── DOMINICAN REPUBLIC
  {
    slug: "dominicana",
    name: tx("Домінікана", "Dominikánská republika"),
    nameTo: tx("до Домінікани", "do Dominikánské republiky"),
    nameIn: tx("у Домінікані", "v Dominikánské republice"),
    flag: "🇩🇴",
    heroImage: hero("dominicana"),
    tagline: tx("Карибський баунті-рай", "Karibský ráj jako z reklamy"),
    teaser: tx(
      "Пунта-Кана, білі пляжі під пальмами та ром — зимова втеча в справжнє літо.",
      "Punta Cana, bílé pláže pod palmami a rum — zimní útěk do opravdového léta.",
    ),
    intro: tx(
      "Домініканська Республіка — втілення мрії про баунті-відпочинок. Сонце світить тут 365 днів на рік, а повітря пахне кавою та морським бризом. Найкращі пляжі Атлантики й Карибського моря, готелі all inclusive преміального рівня та прямі чартери з Праги в зимовому сезоні. Ananas Tour підбере резорт для родини, медового місяця чи активного відпочинку.",
      "Dominikánská republika je splněný sen o dovolené jako z reklamy na Bounty. Slunce tu svítí 365 dní v roce a vzduch voní kávou a mořem. Nejkrásnější pláže Atlantiku i Karibiku, prémiové all inclusive hotely a v zimní sezóně přímé chartery z Prahy. Ananas Tour vybere resort pro rodinu, líbánky i aktivní dovolenou.",
    ),
    bestSeason: tx("листопад – квітень", "listopad – duben"),
    flightTime: tx("≈ 10–11 год з Праги (чартер)", "cca 10–11 h z Prahy (charter)"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("домініканське песо (DOP), USD", "dominikánské peso (DOP), USD"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Пунта-Кана", "Punta Cana"),
        text: tx(
          "Найвідоміший курорт із нескінченними пляжами Баваро, розкішними all inclusive і найкращими дискотеками Карибів.",
          "Nejznámější letovisko s nekonečnými plážemi Bávaro, luxusními all inclusive hotely a nejlepšími diskotékami v Karibiku.",
        ),
        image: img("dominicana", 1),
      },
      {
        title: tx("Ла-Романа та Байяїбе", "La Romana a Bayahibe"),
        text: tx(
          "Спокійне Карибське море з бірюзовою водою — для дайвінгу та романтики. Поруч «місто художників» Альтос-де-Чавон.",
          "Klidné Karibské moře s tyrkysovou vodou — pro potápění i romantiku. Kousek odtud je „město umělců“ Altos de Chavón.",
        ),
        image: img("dominicana", 2),
      },
      {
        title: tx("Пуерто-Плата та Самана", "Puerto Plata a Samaná"),
        text: tx(
          "Атлантичне узбережжя для любителів природи: дикі пляжі, водоспади та горбаті кити з січня по березень.",
          "Atlantické pobřeží pro milovníky přírody: divoké pláže, vodopády a keporkaci od ledna do března.",
        ),
        image: img("dominicana", 3),
      },
    ],
    money: [
      {
        title: tx("Долари США", "Americké dolary"),
        text: tx(
          "Долар приймають майже скрізь: у готелях, сувенірних лавках та екскурсійних бюро. Перед поїздкою поміняйте частину крон на долари дрібними купюрами.",
          "Dolary berou skoro všude: v hotelech, obchůdcích se suvenýry i na výletech. Před cestou si část korun vyměňte na dolary v drobných bankovkách.",
        ),
      },
      {
        title: tx("Банківські картки", "Platební karty"),
        text: tx(
          "У готелях і великих ТЦ картки працюють без проблем. Для ринків і маленьких кафе в місті краще мати готівкові песо.",
          "V hotelech a velkých obchodních centrech karty fungují bez problémů. Na trhy a do malých kaváren ve městě se hodí hotovostní pesa.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify entry rules by citizenship; e-Ticket form is mandatory for all travellers.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Перед вильотом кожен турист заповнює безкоштовну електронну анкету e-Ticket. Візові умови залежать від громадянства — ми перевіримо їх для вас.",
          "Před odletem každý cestující vyplní bezplatný elektronický formulář e-Ticket. Vízové podmínky závisí na občanství — ověříme je za vás.",
        ),
      },
      {
        title: tx("Що привезти", "Co přivézt"),
        text: tx(
          "Карибський ром, каву, домініканські сигари та ларимар — камінь, який видобувають лише тут.",
          "Karibský rum, kávu, dominikánské doutníky a larimar — kámen, který se těží jen tady.",
        ),
      },
      {
        title: tx("Сонце", "Slunce"),
        text: tx(
          "Сонце дуже підступне — навіть у хмарну погоду користуйтеся кремом SPF 50+.",
          "Slunce je zrádné — i pod mraky používejte krém s SPF 50+.",
        ),
      },
      {
        title: tx("Вода", "Voda"),
        text: tx(
          "Пийте лише бутильовану воду, навіть у готелях 5*.",
          "Pijte jen balenou vodu, i v hotelech 5*.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Атлантика чи Карибське море?", "Atlantik, nebo Karibské moře?"),
        a: tx(
          "Пунта-Кана — Атлантика: вода трохи прохолодніша, хвилі вищі. Карибське море (Ла-Романа, Байяїбе) — спокійне, дуже тепле та яскраво-бірюзове.",
          "Punta Cana leží u Atlantiku: voda je o něco chladnější a vlny vyšší. Karibské moře (La Romana, Bayahibe) je klidné, velmi teplé a jasně tyrkysové.",
        ),
      },
      {
        q: tx("Що таке сезон водоростей (саргасів)?", "Co je sezóna řas (sargasy)?"),
        a: tx(
          "Періодично до берега прибиває бурі водорості — це природне явище. Хороші готелі щоранку чистять пляжі та ставлять сітки в океані.",
          "Občas moře vyplaví hnědé řasy — je to přírodní jev. Dobré hotely každé ráno čistí pláže a instalují v oceánu sítě.",
        ),
      },
      {
        q: tx("Чи потрібен перехідник для розеток?", "Potřebuji adaptér do zásuvky?"),
        a: tx(
          "Так, розетки американського типу (плоскі штирі) і напруга 110 V. Купіть універсальний адаптер ще в Чехії.",
          "Ano, zásuvky jsou americké (ploché kolíky) a napětí 110 V. Univerzální adaptér si kupte ještě v Česku.",
        ),
      },
      {
        q: tx("Чи безпечно виходити за межі готелю?", "Je bezpečné chodit mimo hotel?"),
        a: tx(
          "У курортних зонах — так. Увечері не гуляйте наодинці в нетуристичних кварталах; для поїздок беріть офіційне таксі або організовані екскурсії.",
          "V turistických zónách ano. Večer nechoďte sami do neturistických čtvrtí, na výlety využijte oficiální taxi nebo organizované výlety.",
        ),
      },
      {
        q: tx("Коли можна побачити китів на Самані?", "Kdy uvidíme velryby na Samaná?"),
        a: tx(
          "З середини січня до кінця березня кити припливають у затоку Самана. Якщо ваша відпустка в ці дати — обов’язково замовте екскурсію.",
          "Od poloviny ledna do konce března připlouvají velryby do zátoky Samaná. Pokud tam budete v tomto termínu, výlet si určitě objednejte.",
        ),
      },
      {
        q: tx("Які чайові прийнятні на all inclusive?", "Jaké spropitné se dává na all inclusive?"),
        a: tx(
          "Зазвичай 1–2 $ офіціанту, бармену чи покоївці. Невелика подяка помітно пришвидшує обслуговування.",
          "Obvykle 1–2 $ číšníkovi, barmanovi nebo pokojské. Malá pozornost znatelně zrychlí obsluhu.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Домінікани з Праги — Пунта-Кана", "Zájezdy do Dominikánské republiky — Punta Cana"),
      description: tx(
        "Домінікана з чартером із Праги: Пунта-Кана, Ла-Романа, Самана. All inclusive, ціни в CZK, підбір у Telegram.",
        "Dominikánská republika s charterem z Prahy: Punta Cana, La Romana, Samaná. All inclusive, ceny v CZK, výběr přes Telegram.",
      ),
    },
  },
  // ───────────────────────────── ITALY
  {
    slug: "italy",
    name: tx("Італія", "Itálie"),
    nameTo: tx("до Італії", "do Itálie"),
    nameIn: tx("в Італії", "v Itálii"),
    flag: "🇮🇹",
    heroImage: hero("italy"),
    tagline: tx("La Dolce Vita за дві години від Праги", "La dolce vita dvě hodiny od Prahy"),
    teaser: tx(
      "Рим, Венеція, Амальфі, Сардинія та озера Півночі — мистецтво, море і найкраща кухня.",
      "Řím, Benátky, Amalfi, Sardinie a severní jezera — umění, moře a nejlepší kuchyně.",
    ),
    intro: tx(
      "Італія не потребує представлення: батьківщина великого мистецтва, моди та неперевершеної кухні. Від Альп до пляжів Сицилії й Сардинії вона дарує частинку свого вічного свята. Із Праги до Риму чи Кальярі — близько двох годин польоту, а до озера Гарда можна доїхати й власним авто. Ananas Tour пропонує відчути справжню La Dolce Vita.",
      "Itálii není třeba představovat: kolébka umění, módy a skvělé kuchyně. Od Alp po pláže Sicílie a Sardinie vám dá kousek svého věčného svátku. Z Prahy do Říma nebo Cagliari letíte asi dvě hodiny a k Lago di Garda dojedete i autem. Ananas Tour vám nabízí pravou dolce vitu.",
    ),
    bestSeason: tx("квітень – жовтень; море — червень – вересень", "duben – říjen; moře červen – září"),
    flightTime: tx("≈ 1,5–2 год з Праги", "cca 1,5–2 h z Prahy"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("євро (EUR)", "euro (EUR)"),
    entry: ENTRY_SCHENGEN,
    regions: [
      {
        title: tx("Рим, Флоренція, Венеція", "Řím, Florencie, Benátky"),
        text: tx(
          "Класичний трикутник мистецтва: Колізей, канали Венеції та архітектура Ренесансу — обов’язкова програма.",
          "Klasický trojúhelník umění: Koloseum, benátské kanály a renesanční architektura — povinná výbava každého cestovatele.",
        ),
        image: img("italy", 1),
      },
      {
        title: tx("Амальфі, Сицилія та Сардинія", "Amalfi, Sicílie a Sardinie"),
        text: tx(
          "Кольорові будиночки Позітано, Етна на Сицилії та смарагдове море Сардинії — ідеальний фон для пляжного відпочинку.",
          "Barevné domky Positana, Etna na Sicílii a smaragdové moře Sardinie — ideální kulisa pro dovolenou u moře.",
        ),
        image: img("italy", 2),
      },
      {
        title: tx("Мілан та озера", "Milán a jezera"),
        text: tx(
          "Висока мода та спокій озер Комо й Гарда: розкішні вілли, прозора вода й атмосфера вишуканого відпочинку.",
          "Vysoká móda a klid jezer Como a Garda: luxusní vily, průzračná voda a atmosféra vytříbeného odpočinku.",
        ),
        image: img("italy", 3),
      },
    ],
    money: [
      {
        title: tx("Безготівкові розрахунки", "Platba kartou"),
        text: tx(
          "Картки приймають майже скрізь. Готівка знадобиться для ринків і туристичного податку в готелі.",
          "Kartou zaplatíte skoro všude. Hotovost se hodí na trhy a na turistickou daň v hotelu.",
        ),
      },
      {
        title: tx("Банкомати", "Bankomaty"),
        text: tx(
          "Знімайте готівку в банкоматах (Bancomat) великих банків. Вуличних обмінників у туристичних центрах краще уникати.",
          "Hotovost vybírejte z bankomatů (Bancomat) velkých bank. Pouličním směnárnám v turistických centrech se vyhněte.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify travel rules for temporary-protection holders.
        title: tx("В’їзд", "Vstup"),
        text: tx(
          "Італія — у Шенгені. Зазвичай достатньо біометричного паспорта та документа про перебування в ЧР.",
          "Itálie je v Schengenu. Obvykle stačí biometrický pas a doklad o pobytu v ČR.",
        ),
      },
      {
        title: tx("Кава", "Káva"),
        text: tx(
          "Еспресо п’ють швидко, стоячи біля барної стійки. За столиком кава дорожча.",
          "Espresso se pije rychle u baru vestoje. U stolku je káva dražší.",
        ),
      },
      {
        title: tx("Riposo", "Riposo"),
        text: tx(
          "Багато магазинів і невеликих ресторанів зачинені з 13:00 до 16:00.",
          "Řada obchodů a malých restaurací má zavřeno mezi 13. a 16. hodinou.",
        ),
      },
      {
        title: tx("Дрес-код у храмах", "Oblékání v kostelech"),
        text: tx(
          "У Ватикані та соборах плечі й коліна мають бути закриті.",
          "Ve Vatikánu a katedrálách mějte zakrytá ramena a kolena.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Що таке tassa di soggiorno?", "Co je tassa di soggiorno?"),
        a: tx(
          "Міський туристичний податок, що не входить у ціну туру. У Римі та Венеції він найвищий — до кількох євро з особи за ніч. Сплачується в готелі.",
          "Městská turistická daň, která není v ceně zájezdu. Nejvyšší je v Římě a Benátkách — až několik eur za osobu a noc. Platí se v hotelu.",
        ),
      },
      {
        q: tx("Що означає coperto в рахунку?", "Co znamená coperto na účtu?"),
        a: tx(
          "Плата за сервірування та хліб (зазвичай 1,5–3 € з особи). Це не чайові; 1–2 € зверху за гарний сервіс завжди вітаються.",
          "Poplatek za prostření a chléb (obvykle 1,5–3 € na osobu). Není to spropitné; 1–2 € navíc za dobrou obsluhu vždy potěší.",
        ),
      },
      {
        q: tx("Чи є безкоштовні пляжі?", "Jsou v Itálii pláže zdarma?"),
        a: tx(
          "Більшість облаштованих пляжів (lido) платні — 20–50 € на день за парасольку й шезлонги. Але в кожному місті є spiaggia libera — вільні ділянки.",
          "Většina vybavených pláží (lido) je placená — 20–50 € na den za slunečník a lehátka. V každém městě je ale i spiaggia libera — volná pláž.",
        ),
      },
      {
        q: tx("Чи треба компостувати квитки?", "Musím si označit jízdenku?"),
        a: tx(
          "Так! Паперові квитки на регіональні потяги та міський транспорт валідуйте перед посадкою, інакше штраф від 50 €.",
          "Ano! Papírové jízdenky na regionální vlaky a MHD před nástupem označte, jinak hrozí pokuta od 50 €.",
        ),
      },
      {
        q: tx("Чи безпечно ввечері в туристичних центрах?", "Je večer v centrech bezpečno?"),
        a: tx(
          "Загалом так, але в Римі, Мілані та Неаполі багато кишенькових злодіїв. Не тримайте телефон у задній кишені й не вішайте сумку на спинку стільця.",
          "Obecně ano, ale v Římě, Miláně a Neapoli je hodně kapsářů. Nenoste telefon v zadní kapse a kabelku nevěšte na opěradlo židle.",
        ),
      },
      {
        q: tx("Чи можна пити з фонтанчиків у Римі?", "Dá se pít z fontánek v Římě?"),
        a: tx(
          "Так, фонтанчики nasoni дають чисту холодну питну воду безкоштовно — наповнюйте пляшку сміливо.",
          "Ano, fontánky nasoni nabízejí čistou studenou pitnou vodu zdarma — klidně si naplňte láhev.",
        ),
      },
    ],
    seo: {
      title: tx("Тури до Італії з Праги — море та екскурсії", "Zájezdy do Itálie — moře i poznávání"),
      description: tx(
        "Італія з Праги: Рим, Венеція, Сардинія, Сицилія, озера. Пляжні та екскурсійні тури, ціни в CZK, підбір у Telegram.",
        "Itálie z Prahy: Řím, Benátky, Sardinie, Sicílie, jezera. Pobytové i poznávací zájezdy, ceny v CZK, výběr přes Telegram.",
      ),
    },
  },
  // ───────────────────────────── INDONESIA
  {
    slug: "indonesia",
    name: tx("Індонезія", "Indonésie"),
    nameTo: tx("до Індонезії", "do Indonésie"),
    nameIn: tx("в Індонезії", "v Indonésii"),
    flag: "🇮🇩",
    heroImage: hero("indonesia"),
    tagline: tx("Балі — острів богів і SPA", "Bali — ostrov bohů a lázní"),
    teaser: tx(
      "Храми, рисові тераси, вулкани та океан — екзотика, яку запам’ятовують на все життя.",
      "Chrámy, rýžové terasy, sopky a oceán — exotika, na kterou se nezapomíná.",
    ),
    intro: tx(
      "Індонезія — архіпелаг із понад 17 тисяч островів, де кожен знайде свій шматочок раю: давні храми, діючі вулкани та найкращі у світі SPA-ритуали. Дорога з Праги довга, тому ми продумаємо зручну пересадку та, за бажанням, зупинку в Дубаї чи Сінгапурі. Ananas Tour запрошує від культурного Убуду до білосніжних пляжів Нуса-Дуа.",
      "Indonésie je souostroví s více než 17 tisíci ostrovy, kde si každý najde svůj kousek ráje: staré chrámy, činné sopky a nejlepší lázeňské rituály na světě. Cesta z Prahy je dlouhá, proto vymyslíme pohodlný přestup a případně i zastávku v Dubaji nebo Singapuru. Ananas Tour vás zve od kulturního Ubudu po bílé pláže Nusa Dua.",
    ),
    bestSeason: tx("квітень – жовтень (сухий сезон)", "duben – říjen (období sucha)"),
    flightTime: tx("≈ 16–20 год з пересадкою", "cca 16–20 h s přestupem"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("індонезійська рупія (IDR)", "indonéská rupie (IDR)"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Балі", "Bali"),
        text: tx(
          "Убуд — центр мистецтв і йоги серед джунглів. Нуса-Дуа та Семіньяк — розкішні готелі й ресторани на березі океану.",
          "Ubud je centrem umění a jógy uprostřed džungle. Nusa Dua a Seminyak nabízejí luxusní hotely a restaurace u oceánu.",
        ),
        image: img("indonesia", 1),
      },
      {
        title: tx("Гілі та Ломбок", "Gili a Lombok"),
        text: tx(
          "Повний релакс і кришталева вода. На островах Гілі немає машин, а поруч — рифи та морські черепахи.",
          "Naprostý klid a křišťálová voda. Na ostrovech Gili nejezdí auta a kousek od břehu žijí mořské želvy.",
        ),
        image: img("indonesia", 2),
      },
      {
        title: tx("Комодо та Флорес", "Komodo a Flores"),
        text: tx(
          "Для шукачів пригод: комодські варани та пляжі з рожевим піском.",
          "Pro dobrodruhy: varani komodští a pláže s růžovým pískem.",
        ),
        image: img("indonesia", 3),
      },
    ],
    money: [
      {
        title: tx("Яку валюту брати?", "Jakou měnu si vzít?"),
        text: tx(
          "Найкраще — долари або євро великими купюрами нового зразка без пошкоджень: курс на них вигідніший. Крони в Індонезії не поміняєте.",
          "Nejlepší jsou dolary nebo eura ve vyšších, nových a nepoškozených bankovkách — mají lepší kurz. Koruny v Indonésii nevyměníte.",
        ),
      },
      {
        title: tx("Картки та банкомати", "Karty a bankomaty"),
        text: tx(
          "У туристичних зонах картки приймають майже скрізь, але на ринках, у варунгах і за вхід до храмів потрібна готівка.",
          "V turistických oblastech karty berou skoro všude, na trzích, ve warunzích a na vstupné do chrámů ale potřebujete hotovost.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify visa-on-arrival / e-VOA availability by citizenship.
        title: tx("Віза", "Vízum"),
        text: tx(
          "Для багатьох країн діє віза по прильоту або електронна віза заздалегідь. Ми перевіримо умови для вашого громадянства.",
          "Pro mnoho zemí platí vízum po příletu nebo elektronické vízum předem. Podmínky pro vaše občanství ověříme.",
        ),
      },
      {
        title: tx("Етикет у храмах", "Etiketa v chrámech"),
        text: tx(
          "Коліна прикривають саронгом, який часто можна взяти напрокат на вході.",
          "Kolena se zakrývají sarongem, který si často půjčíte u vchodu.",
        ),
      },
      {
        title: tx("Транспорт", "Doprava"),
        text: tx(
          "Лівосторонній рух. Найзручніше — таксі Blue Bird, Grab або авто з водієм, яке ми можемо організувати.",
          "Jezdí se vlevo. Nejpohodlnější je taxi Blue Bird, Grab nebo auto s řidičem, které vám zajistíme.",
        ),
      },
      {
        title: tx("Вода", "Voda"),
        text: tx(
          "Пийте лише бутильовану воду й уникайте льоду у вуличних кафе.",
          "Pijte jen balenou vodu a v pouličních bistrech se vyhněte ledu.",
        ),
      },
    ],
    faq: [
      {
        // TODO(client): verify current Bali levy amount.
        q: tx("Що таке туристичний збір Балі?", "Co je turistický poplatek na Bali?"),
        a: tx(
          "З 2024 року кожен іноземний турист сплачує збір Балі (близько 150 000 IDR). Його зручно оплатити онлайн через офіційний портал Love Bali або в аеропорту.",
          "Od roku 2024 platí každý zahraniční turista poplatek Bali (zhruba 150 000 IDR). Nejpohodlněji ho zaplatíte online přes oficiální portál Love Bali nebo na letišti.",
        ),
      },
      {
        q: tx("Чому іноді на пляжі не поплаваєш?", "Proč se někdy na pláži nedá plavat?"),
        a: tx(
          "Через сильні припливи й відпливи: у Нуса-Дуа вода може відходити на сотні метрів. Перевіряйте розклад у застосунку Tide Table або на ресепшені.",
          "Kvůli silnému přílivu a odlivu: v Nusa Dua voda ustoupí i o stovky metrů. Rozpis sledujte v aplikaci Tide Table nebo na recepci.",
        ),
      },
      {
        q: tx("Як поводитися з мавпами?", "Jak se chovat k opicím?"),
        a: tx(
          "Не тримайте в руках їжу, окуляри чи телефон, не дивіться мавпам в очі й не відбирайте вкрадене силою — покличте наглядача.",
          "Nedržte v rukou jídlo, brýle ani telefon, nedívejte se opicím do očí a ukradené věci jim neberte silou — zavolejte strážce.",
        ),
      },
      {
        q: tx("Чи багато комарів?", "Je tam hodně komárů?"),
        a: tx(
          "Це тропіки, тож комахи є, особливо в Убуді. Місцеві репеленти (наприклад, Soffell) працюють чудово; преміум-готелі регулярно обробляють територію.",
          "Jsou to tropy, takže hmyz tu je, hlavně v Ubudu. Místní repelenty (např. Soffell) fungují skvěle a prémiové hotely areál pravidelně ošetřují.",
        ),
      },
      {
        q: tx("Дорогу перекрила церемонія — що робити?", "Silnici zablokoval průvod — co dělat?"),
        a: tx(
          "Релігійні процесії мають пріоритет. Наберіться терпіння й насолодіться видовищем — балійці цінують повагу до своїх традицій.",
          "Náboženské průvody mají přednost. Vydržte a užijte si podívanou — Balijci si úcty ke svým tradicím velmi váží.",
        ),
      },
    ],
    seo: {
      title: tx("Тури на Балі та в Індонезію з Праги", "Zájezdy na Bali a do Indonésie"),
      description: tx(
        "Балі, Гілі, Ломбок і Комодо з вильотом із Праги. Зручні пересадки, ціни в CZK, підбір туру в Telegram.",
        "Bali, Gili, Lombok a Komodo s odletem z Prahy. Pohodlné přestupy, ceny v CZK, výběr zájezdu přes Telegram.",
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
    tagline: tx("Острів прянощів в Індійському океані", "Ostrov koření v Indickém oceánu"),
    teaser: tx(
      "Білосніжний пісок, бірюзова вода, Стоун-Таун і сафарі поруч — Африка, якої ви ще не бачили.",
      "Bílý písek, tyrkysová voda, Stone Town a safari kousek odtud — Afrika, jakou jste ještě neviděli.",
    ),
    intro: tx(
      "Занзібар — тропічний острів біля узбережжя Танзанії, де пахне гвоздикою та корицею, а океан має всі відтінки бірюзи. Тут поєднуються пляжний відпочинок, історія арабських султанів у Стоун-Тауні та можливість злітати на справжнє сафарі. У зимовому сезоні з Праги літають прямі чартери, тож потрапити в африканське літо простіше, ніж здається. Ananas Tour підбере готель на тихому півночі чи на сході для кайтсерфінгу.",
      "Zanzibar je tropický ostrov u pobřeží Tanzanie, kde to voní hřebíčkem a skořicí a oceán hraje všemi odstíny tyrkysové. Spojíte tu odpočinek na pláži, historii arabských sultánů ve Stone Townu i výlet na opravdové safari. V zimní sezóně létají z Prahy přímé chartery, takže africké léto je blíž, než se zdá. Ananas Tour vybere hotel na klidném severu nebo na východě pro kitesurfing.",
    ),
    bestSeason: tx("червень – жовтень, грудень – лютий", "červen – říjen, prosinec – únor"),
    flightTime: tx("≈ 9 год з Праги (чартер)", "cca 9 h z Prahy (charter)"), // TODO(client): verify
    airports: ["PRG"],
    currency: tx("танзанійський шилінг (TZS), USD", "tanzanský šilink (TZS), USD"),
    entry: ENTRY_CHECK,
    regions: [
      {
        title: tx("Північ: Нунгві та Кендва", "Sever: Nungwi a Kendwa"),
        text: tx(
          "Найкращі пляжі для купання: тут майже немає відпливів, а заходи сонця над океаном — найгарніші на острові.",
          "Nejlepší pláže na koupání: odliv tu skoro není a západy slunce nad oceánem jsou nejkrásnější na ostrově.",
        ),
        image: img("zanzibar", 1),
      },
      {
        title: tx("Схід: Паже та Джамбіані", "Východ: Paje a Jambiani"),
        text: tx(
          "Безкраї білі пляжі, кайтсерфінг і атмосферні бутик-готелі. Під час відпливу океан відходить далеко — ідеально для прогулянок.",
          "Nekonečné bílé pláže, kitesurfing a stylové butikové hotely. Při odlivu oceán ustoupí daleko — ideální na procházky.",
        ),
        image: img("zanzibar", 2),
      },
      {
        title: tx("Стоун-Таун", "Stone Town"),
        text: tx(
          "Старе місто зі списку ЮНЕСКО: різьблені двері, вузькі вулички, базари прянощів і нічний ринок Фородхані.",
          "Staré město na seznamu UNESCO: vyřezávané dveře, úzké uličky, trhy s kořením a noční trh Forodhani.",
        ),
        image: img("zanzibar", 3),
      },
    ],
    money: [
      {
        title: tx("Долари та шилінги", "Dolary a šilinky"),
        text: tx(
          "У готелях і на екскурсіях ціни часто в доларах. Беріть долари нового зразка без пошкоджень — старі купюри можуть не прийняти. Для ринків поміняйте трохи на шилінги.",
          "V hotelech a na výletech jsou ceny často v dolarech. Berte nové a nepoškozené dolarové bankovky — staré nemusí přijmout. Na trhy si vyměňte trochu šilinků.",
        ),
      },
      {
        title: tx("Картки", "Karty"),
        text: tx(
          "Картки приймають у більшості готелів, але поза ними готівка надійніша. Банкомати є в Стоун-Тауні та великих селищах.",
          "Karty berou ve většině hotelů, mimo ně je ale spolehlivější hotovost. Bankomaty najdete ve Stone Townu a větších vesnicích.",
        ),
      },
    ],
    tips: [
      {
        // TODO(client): verify visa rules by citizenship and the mandatory Zanzibar travel insurance.
        title: tx("Віза та страховка", "Vízum a pojištění"),
        text: tx(
          "Візові умови залежать від громадянства. Занзібар також вимагає спеціальну місцеву страховку для туристів — ми підкажемо актуальні правила перед поїздкою.",
          "Vízové podmínky závisí na občanství. Zanzibar navíc vyžaduje speciální místní pojištění pro turisty — aktuální pravidla vám před cestou připomeneme.",
        ),
      },
      {
        // TODO(client): verify vaccination requirements.
        title: tx("Здоров’я", "Zdraví"),
        text: tx(
          "Перед поїздкою порадьтеся з лікарем щодо профілактики малярії та щеплень. Користуйтеся репелентом увечері.",
          "Před cestou se poraďte s lékařem o prevenci malárie a očkování. Večer používejte repelent.",
        ),
      },
      {
        title: tx("Культура", "Kultura"),
        text: tx(
          "Більшість населення — мусульмани. У селах і Стоун-Тауні закривайте плечі й коліна; купальник — лише на пляжі.",
          "Většina obyvatel jsou muslimové. Ve vesnicích a ve Stone Townu mějte zakrytá ramena a kolena, plavky jen na pláži.",
        ),
      },
      {
        title: tx("Екскурсії", "Výlety"),
        text: tx(
          "Тур прянощами, черепахи на острові Прізон, снорклінг біля Мнемби, Safari Blue та сафарі на материку.",
          "Výlet za kořením, želvy na ostrově Prison Island, šnorchlování u Mnemby, Safari Blue a safari na pevnině.",
        ),
      },
    ],
    faq: [
      {
        q: tx("Де жити, щоб купатися без відпливів?", "Kde bydlet, aby se dalo koupat bez odlivu?"),
        a: tx(
          "На півночі — у Нунгві чи Кендві. На сході (Паже, Джамбіані) відпливи сильні: океан відходить на сотні метрів, зате там рай для кайтсерферів.",
          "Na severu — v Nungwi nebo Kendwě. Na východě (Paje, Jambiani) je silný odliv a oceán ustoupí o stovky metrů, zato je to ráj kitesurferů.",
        ),
      },
      {
        q: tx("Коли сезон дощів?", "Kdy je období dešťů?"),
        a: tx(
          "Великі дощі — квітень–травень, короткі — у листопаді. Найкращий час — з червня по жовтень і з грудня по лютий.",
          "Velké deště jsou v dubnu a květnu, krátké v listopadu. Nejlepší doba je od června do října a od prosince do února.",
        ),
      },
      {
        q: tx("Чи можна поєднати Занзібар із сафарі?", "Dá se Zanzibar spojit se safari?"),
        a: tx(
          "Так. З острова літають невеликі літаки до нацпарків Танзанії — Селус (Ньєрере) чи Мікумі — на 1–3 дні. Ми допоможемо спланувати комбінацію.",
          "Ano. Z ostrova létají malá letadla do tanzanských národních parků — Selous (Nyerere) nebo Mikumi — na 1–3 dny. Kombinaci vám pomůžeme naplánovat.",
        ),
      },
      {
        q: tx("Чи безпечно на Занзібарі?", "Je na Zanzibaru bezpečno?"),
        a: tx(
          "Острів доброзичливий до туристів. Звичайні правила: не носіть цінне напоказ, увечері користуйтеся таксі від готелю, а екскурсії купуйте в перевірених агентів.",
          "Ostrov je k turistům přátelský. Platí běžná pravidla: nenoste cennosti na odiv, večer jezděte hotelovým taxi a výlety kupujte u ověřených agentur.",
        ),
      },
      {
        q: tx("Які розетки на Занзібарі?", "Jaké jsou na Zanzibaru zásuvky?"),
        a: tx(
          "Переважно британського типу G (230 V). Візьміть універсальний адаптер.",
          "Převážně britský typ G (230 V). Vezměte si univerzální adaptér.",
        ),
      },
    ],
    seo: {
      title: tx("Тури на Занзібар з Праги — пляжі та сафарі", "Zájezdy na Zanzibar z Prahy"),
      description: tx(
        "Занзібар із прямим чартером із Праги: Нунгві, Кендва, Паже, Стоун-Таун, сафарі. Ціни в CZK, підбір туру в Telegram.",
        "Zanzibar s přímým charterem z Prahy: Nungwi, Kendwa, Paje, Stone Town, safari. Ceny v CZK, výběr zájezdu přes Telegram.",
      ),
    },
  },
];

export function getDestination(slug: string): Destination | undefined {
  return destinations.find((d) => d.slug === slug);
}
