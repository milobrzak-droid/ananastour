import type { Locale } from "@/i18n/config";
import { ananasPhotos } from "@/content/ananas-photos";

/**
 * Blog posts from ananastour.com (Tax free, Insurance, Visas, Hotel signs),
 * rewritten for Ukrainians living in Czechia. Plain structured blocks —
 * no markdown library. Legal/entry claims are general guidance only and are
 * marked `TODO(client): verify`.
 */

type Text = Record<Locale, string>;

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "note"; title?: string; text: string };

export type Post = {
  slug: string;
  /** ISO date of the original publication / last update. */
  date: string;
  image: string;
  tag: Text;
  title: Text;
  excerpt: Text;
  readingMinutes: number;
  body: Record<Locale, Block[]>;
  /** Pre-filled Telegram message for the CTA at the end of the post. */
  telegramMessage: Text;
  /** Destination slugs to link from the post. */
  related: string[];
  seo: { title: Text; description: Text };
};

const tx = (uk: string, cs: string): Text => ({ uk, cs });
const cover = (slug: string) => ananasPhotos.blog[slug];

export const posts: Post[] = [
  // ───────────────────────────── TAX FREE
  {
    slug: "tax-free",
    date: "2026-03-18",
    image: cover("tax-free"),
    tag: tx("Гроші", "Peníze"),
    title: tx("Tax Free: як повернути ПДВ за покупки за кордоном", "Tax free: jak získat zpět DPH z nákupů v zahraničí"),
    excerpt: tx(
      "Як працює повернення податку, коли на нього має право людина, що живе в Чехії, і як не втратити гроші на митниці.",
      "Jak funguje vracení daně, kdy na něj má nárok člověk žijící v Česku a jak nepřijít o peníze na celnici.",
    ),
    readingMinutes: 4,
    related: ["turkey", "uae"],
    telegramMessage: tx(
      "Добрий день, Альона! Маю питання щодо Tax Free під час поїздки.",
      "Dobrý den, Aljono! Mám dotaz k tax free na cestě.",
    ),
    seo: {
      title: tx("Tax Free для українців у Чехії — як повернути ПДВ", "Tax free — jak získat zpět DPH z nákupů"),
      description: tx(
        "Покроково: як оформити Tax Free, де він діє для мешканців Чехії (Туреччина, ОАЕ) і що врахувати на митниці при поверненні.",
        "Krok za krokem: jak vyřídit tax free, kde funguje pro obyvatele Česka (Turecko, SAE) a na co myslet na celnici.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Tax Free — це система, яка повертає податок на додану вартість (ПДВ) людям, що вивозять покупки за межі країни в особистому багажі. Залежно від країни можна заощадити від кількох до майже двадцяти відсотків вартості покупки.",
        },
        { type: "h2", text: "Як це працює" },
        {
          type: "p",
          text: "ПДВ — внутрішній податок на споживання. Якщо товар залишає країну разом із вами, держава готова цей податок повернути. Головне — правильно оформити документи й пройти митну перевірку при виїзді.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "У магазині з позначкою Tax Free попросіть оформити форму повернення — знадобиться паспорт.",
            "Не розпаковуйте й не використовуйте покупку до виїзду з країни.",
            "Перед вильотом пройдіть митну валідацію: печатка на формі або електронне підтвердження в кіоску.",
            "Отримайте гроші готівкою в пункті повернення в аеропорту або на банківську картку.",
          ],
        },
        { type: "h2", text: "Чи маю я право на Tax Free, якщо живу в Чехії?" },
        // TODO(client): verify VAT refund eligibility for holders of temporary protection / residence permits in CZ.
        {
          type: "p",
          text: "У країнах Євросоюзу Tax Free призначений для людей, які постійно проживають поза ЄС. Якщо у вас тимчасовий захист або дозвіл на проживання в Чехії, магазини та митниця зазвичай вважають вас мешканцем ЄС — тож у Греції, Італії чи Іспанії повернення ПДВ, найімовірніше, не буде.",
        },
        {
          type: "p",
          text: "Зате за межами ЄС ви — звичайний іноземний турист. Tax Free працює, наприклад, у Туреччині та ОАЕ: у великих торгових центрах оформлення займає кілька хвилин, а повернення отримуєте в аеропорту перед вильотом до Праги.",
        },
        {
          type: "table",
          head: ["Параметр", "На що звернути увагу"],
          rows: [
            ["Мінімальна сума чека", "Різна в кожній країні — уточніть у магазині"],
            ["Стан товару", "Новий, в оригінальній упаковці"],
            ["Документи", "Паспорт, чек і форма Tax Free"],
            ["Де валідувати", "У країні покупки, перед вильотом додому"],
          ],
        },
        { type: "h2", text: "Повернення до Чехії: митні ліміти" },
        // TODO(client): verify — link the current Celní správa allowances page.
        {
          type: "p",
          text: "Покупки з-за меж ЄС при поверненні до Чехії підлягають лімітам безмитного ввезення — окремо на загальну вартість товарів, алкоголь і тютюн. Актуальні суми перевіряйте на сайті Митної служби ЧР (Celní správa) перед поїздкою.",
        },
        {
          type: "note",
          title: "Порада Ananas Tour",
          text: "Залиште на валідацію щонайменше 30 хвилин в аеропорту та тримайте покупки в ручній поклажі або здайте багаж уже після печатки — митник може попросити показати товар.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Tax free je systém, který vrací daň z přidané hodnoty (DPH) lidem, kteří si nákupy odvážejí z dané země v osobních zavazadlech. Podle země můžete ušetřit od několika až po skoro dvacet procent z ceny nákupu.",
        },
        { type: "h2", text: "Jak to funguje" },
        {
          type: "p",
          text: "DPH je vnitrostátní daň ze spotřeby. Když zboží opustí zemi spolu s vámi, stát je ochoten daň vrátit. Klíčové je správně vyplnit doklady a projít celní kontrolou při odjezdu.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "V obchodě s označením Tax Free požádejte o formulář pro vrácení daně — budete potřebovat pas.",
            "Zboží až do odjezdu nerozbalujte a nepoužívejte.",
            "Před odletem projděte celním ověřením: razítko na formuláři nebo elektronické potvrzení v kiosku.",
            "Peníze dostanete v hotovosti na letišti nebo na platební kartu.",
          ],
        },
        { type: "h2", text: "Mám nárok na tax free, když žiju v Česku?" },
        // TODO(client): verify VAT refund eligibility for holders of temporary protection / residence permits in CZ.
        {
          type: "p",
          text: "V zemích Evropské unie je tax free určený lidem s trvalým bydlištěm mimo EU. Pokud máte v Česku dočasnou ochranu nebo povolení k pobytu, obchody i celníci vás obvykle považují za obyvatele EU — v Řecku, Itálii nebo Španělsku tedy DPH nejspíš nevrátí.",
        },
        {
          type: "p",
          text: "Mimo EU jste ale běžný zahraniční turista. Tax free funguje třeba v Turecku a SAE: ve velkých nákupních centrech zabere vyřízení pár minut a peníze dostanete na letišti před odletem do Prahy.",
        },
        {
          type: "table",
          head: ["Parametr", "Na co si dát pozor"],
          rows: [
            ["Minimální částka nákupu", "Liší se podle země — zeptejte se v obchodě"],
            ["Stav zboží", "Nové, v originálním balení"],
            ["Doklady", "Pas, účtenka a formulář tax free"],
            ["Kde ověřit", "V zemi nákupu, před odletem domů"],
          ],
        },
        { type: "h2", text: "Návrat do Česka: celní limity" },
        // TODO(client): verify — link the current Celní správa allowances page.
        {
          type: "p",
          text: "Na nákupy ze zemí mimo EU se při návratu do Česka vztahují limity pro dovoz bez cla — zvlášť pro celkovou hodnotu zboží, alkohol a tabák. Aktuální částky si před cestou ověřte na webu Celní správy ČR.",
        },
        {
          type: "note",
          title: "Tip od Ananas Tour",
          text: "Na ověření si na letišti nechte aspoň 30 minut a nákupy mějte v příručním zavazadle, případně kufr odbavte až po razítku — celník může chtít zboží vidět.",
        },
      ],
    },
  },
  // ───────────────────────────── INSURANCE
  {
    slug: "insurance",
    date: "2023-09-11",
    image: cover("insurance"),
    tag: tx("Безпека", "Bezpečí"),
    title: tx("Страхування в подорожі: що діє, коли ви живете в Чехії", "Cestovní pojištění: co platí, když žijete v Česku"),
    excerpt: tx(
      "Європейська картка здоров’я, туристичний поліс і страховка від скасування туру — що потрібно саме вам.",
      "Evropský průkaz zdravotního pojištění, cestovní pojistka a pojištění storna — co opravdu potřebujete.",
    ),
    readingMinutes: 5,
    related: ["egypt", "turkey"],
    telegramMessage: tx(
      "Добрий день, Альона! Хочу оформити страховку до поїздки.",
      "Dobrý den, Aljono! Chtěl(a) bych si sjednat cestovní pojištění.",
    ),
    seo: {
      title: tx("Туристична страховка для українців у Чехії", "Cestovní pojištění k zájezdu"),
      description: tx(
        "Чим відрізняється EHIC від туристичного поліса, що має покривати страховка і навіщо storno-страхування. Пояснює Ananas Tour.",
        "Jaký je rozdíl mezi průkazem EHIC a cestovní pojistkou, co má pojištění krýt a proč se vyplatí pojištění storna.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Страховка — не формальність, а ваш доступ до якісної медицини за кордоном і захист бюджету відпустки. Пояснюємо, що у вас уже є, якщо ви живете в Чехії, і що варто докупити до туру.",
        },
        { type: "h2", text: "Європейська картка медичного страхування (EHIC)" },
        // TODO(client): verify EHIC eligibility and coverage for temporary-protection holders.
        {
          type: "p",
          text: "Якщо ви застраховані в чеській державній медичній страховій компанії (наприклад, VZP), на звороті вашої картки страхувальника зазвичай є Європейська картка медичного страхування. Вона дає право на необхідну медичну допомогу в державних закладах країн ЄС на тих самих умовах, що й місцевим.",
        },
        { type: "h3", text: "Чого EHIC не покриває" },
        {
          type: "list",
          items: [
            "Приватні клініки — а на курортах вони часто саме приватні.",
            "Доплати та спільну участь пацієнта, які діють у країні.",
            "Транспортування додому (репатріацію).",
            "Країни поза ЄС — Туреччину, Єгипет, ОАЕ, Азію, Карибі.",
          ],
        },
        { type: "h2", text: "Туристичний поліс" },
        {
          type: "p",
          text: "Тому ми радимо оформлювати комерційне туристичне страхування до кожної поїздки. Чеські туроператори пропонують пакети, які додаються до туру прямо при бронюванні, — Альона підкаже, який варіант підходить вам.",
        },
        { type: "h3", text: "Що має бути в хорошому полісі" },
        {
          type: "list",
          items: [
            "Медичні витрати та госпіталізація з достатнім лімітом.",
            "Асистанс 24/7 із прямою оплатою клініці (direct billing) — щоб не платити зі своєї кишені.",
            "Репатріація додому.",
            "Страхування багажу та затримки рейсу.",
            "Цивільна відповідальність.",
          ],
        },
        {
          type: "table",
          head: ["Регіон", "Приклади", "На що звернути увагу"],
          rows: [
            ["Європа", "Греція, Італія, Іспанія, Болгарія", "Ліміт медичних витрат, приватні клініки"],
            ["Світ без США", "Туреччина, Єгипет, ОАЕ, Азія, Карибі", "Direct billing, репатріація, активний відпочинок"],
            ["Увесь світ", "США, Канада, далекі поїздки", "Високі ліміти — лікування там дуже дороге"],
          ],
        },
        { type: "h2", text: "Страхування від скасування туру (storno)" },
        {
          type: "p",
          text: "Захворіли перед вильотом або сталося щось непередбачене? Storno-страхування повертає більшу частину вартості туру, якщо поїздку довелося скасувати з поважної причини. Оформлювати його потрібно одразу при бронюванні.",
        },
        {
          type: "note",
          title: "Ваш тур уже захищений",
          text: "За чеським законом кожна туристична компанія (cestovní kancelář) зобов’язана мати страхування на випадок банкрутства. Ми працюємо лише з такими туроператорами, тож гроші за тур у безпеці.",
        },
        {
          type: "p",
          text: "Порада: збережіть номер асистансу в телефоні й надішліть фото поліса собі в Telegram — так він завжди буде під рукою.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Pojištění není formalita, ale váš přístup ke kvalitní péči v zahraničí a ochrana rozpočtu dovolené. Vysvětlíme, co už máte, když žijete v Česku, a co se vyplatí k zájezdu přikoupit.",
        },
        { type: "h2", text: "Evropský průkaz zdravotního pojištění (EHIC)" },
        // TODO(client): verify EHIC eligibility and coverage for temporary-protection holders.
        {
          type: "p",
          text: "Pokud jste pojištěni u české zdravotní pojišťovny (např. VZP), máte na zadní straně kartičky pojištěnce obvykle Evropský průkaz zdravotního pojištění. Ten vám v zemích EU zajistí nezbytnou péči ve státních zařízeních za stejných podmínek jako místním.",
        },
        { type: "h3", text: "Co EHIC nepokrývá" },
        {
          type: "list",
          items: [
            "Soukromé kliniky — a v letoviscích bývají právě soukromé.",
            "Spoluúčast a doplatky, které v dané zemi platí.",
            "Převoz domů (repatriaci).",
            "Země mimo EU — Turecko, Egypt, SAE, Asii, Karibik.",
          ],
        },
        { type: "h2", text: "Cestovní pojištění" },
        {
          type: "p",
          text: "Proto doporučujeme ke každé cestě komerční cestovní pojištění. České cestovní kanceláře nabízejí balíčky, které se přidávají přímo při rezervaci zájezdu — Aljona vám poradí, která varianta je pro vás.",
        },
        { type: "h3", text: "Co má dobrá pojistka obsahovat" },
        {
          type: "list",
          items: [
            "Léčebné výlohy a hospitalizaci s dostatečným limitem.",
            "Asistenci 24/7 s přímou úhradou klinice (direct billing) — abyste nic neplatili ze svého.",
            "Repatriaci domů.",
            "Pojištění zavazadel a zpoždění letu.",
            "Odpovědnost za škodu.",
          ],
        },
        {
          type: "table",
          head: ["Oblast", "Příklady", "Na co si dát pozor"],
          rows: [
            ["Evropa", "Řecko, Itálie, Španělsko, Bulharsko", "Limit léčebných výloh, soukromé kliniky"],
            ["Svět bez USA", "Turecko, Egypt, SAE, Asie, Karibik", "Direct billing, repatriace, aktivní dovolená"],
            ["Celý svět", "USA, Kanada, dlouhé cesty", "Vysoké limity — léčba je tam velmi drahá"],
          ],
        },
        { type: "h2", text: "Pojištění storna zájezdu" },
        {
          type: "p",
          text: "Onemocněli jste před odletem nebo se stalo něco nečekaného? Pojištění storna vám vrátí většinu ceny zájezdu, pokud jste museli cestu ze závažného důvodu zrušit. Sjednává se hned při rezervaci.",
        },
        {
          type: "note",
          title: "Váš zájezd je už chráněný",
          text: "Podle českého zákona musí mít každá cestovní kancelář pojištění proti úpadku. Spolupracujeme jen s takovými cestovkami, takže jsou vaše peníze za zájezd v bezpečí.",
        },
        {
          type: "p",
          text: "Tip: uložte si číslo asistenční služby do telefonu a fotku pojistky si pošlete na Telegram — budete ji mít vždy po ruce.",
        },
      ],
    },
  },
  // ───────────────────────────── VISAS
  {
    slug: "visas",
    date: "2023-09-08",
    image: cover("visas"),
    tag: tx("Документи", "Doklady"),
    title: tx("Візи та документи: як подорожувати, коли ви живете в Чехії", "Víza a doklady: jak cestovat, když žijete v Česku"),
    excerpt: tx(
      "Шенген, країни поза ЄС і спокійне повернення додому — загальні правила та чек-лист документів.",
      "Schengen, země mimo EU a bezproblémový návrat domů — obecná pravidla a kontrolní seznam dokladů.",
    ),
    readingMinutes: 5,
    related: ["egypt", "turkey", "greece"],
    telegramMessage: tx(
      "Добрий день, Альона! Підкажіть, будь ласка, які документи потрібні для поїздки. Моє громадянство і статус у ЧР: ",
      "Dobrý den, Aljono! Poraďte mi prosím, jaké doklady potřebuji na cestu. Moje občanství a pobyt v ČR: ",
    ),
    seo: {
      title: tx("Візи для українців у Чехії — що потрібно для туру", "Víza a doklady na dovolenou — přehled"),
      description: tx(
        "Загальні правила в’їзду до Шенгену та країн поза ЄС для українців, які живуть у Чехії, і чек-лист документів перед вильотом.",
        "Obecná pravidla pro cesty do Schengenu i mimo EU a kontrolní seznam dokladů před odletem.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Правила в’їзду залежать від трьох речей: вашого громадянства (паспорта), статусу в Чехії та країни призначення. Нижче — загальні орієнтири. Остаточні умови ми перевіряємо для кожного туриста перед бронюванням.",
        },
        {
          type: "note",
          title: "Важливо",
          text: "Ця стаття — загальна інформація, а не юридична консультація. Правила часто змінюються; актуальні вимоги дивіться на сайтах посольства країни призначення та МЗС ЧР або запитайте Альону.",
        },
        { type: "h2", text: "Подорожі Шенгенською зоною" },
        // TODO(client): verify Schengen travel rules for temporary-protection / residence-permit holders.
        {
          type: "p",
          text: "Греція, Італія, Іспанія та Болгарія входять до Шенгену. Власники біометричного паспорта зазвичай можуть подорожувати туди без віз. Обов’язково візьміть чинний документ про перебування в Чехії — віза тимчасового захисту чи дозвіл на проживання, — щоб без проблем повернутися.",
        },
        {
          type: "list",
          items: [
            "Перевірте строк дії паспорта на дату повернення.",
            "Маєте небіометричний паспорт? Напишіть нам до бронювання — правила можуть бути іншими.",
            "Діти подорожують із власними документами.",
          ],
        },
        { type: "h2", text: "Поїздки за межі ЄС" },
        {
          type: "p",
          text: "Для Туреччини, Єгипту, ОАЕ, Азії чи Карибів вирішує передусім громадянство, а не те, де ви живете. Залежно від країни це може бути безвізовий в’їзд, віза після прильоту або електронна віза, яку оформлюють заздалегідь.",
        },
        // TODO(client): verify each row for Ukrainian citizens before publishing.
        {
          type: "table",
          head: ["Країна", "Що перевірити"],
          rows: [
            ["Туреччина", "Чи діє безвізовий режим для вашого паспорта і на який строк"],
            ["Єгипет", "Віза після прильоту або штамп Sinai Only для Шарм-ель-Шейху"],
            ["ОАЕ", "Умови в’їзду для вашого громадянства"],
            ["В’єтнам, Індонезія", "Електронна віза заздалегідь або віза по прильоту"],
            ["Домінікана", "Обов’язкова онлайн-анкета e-Ticket перед вильотом"],
            ["Мальдіви, Занзібар", "Умови в’їзду, підтвердження готелю, місцева страховка"],
          ],
        },
        { type: "h2", text: "Повернення до Чехії" },
        // TODO(client): verify — consequences of travel abroad for temporary protection status.
        {
          type: "p",
          text: "Найважливіше — спокійно повернутися додому. Перед поїздкою переконайтеся, що ваш документ про перебування в ЧР дійсний на дату повернення. Якщо у вас тимчасовий захист і плануєте довшу подорож, уточніть у МВС ЧР (OAMP), чи не вплине відсутність на ваш статус.",
        },
        { type: "h3", text: "Чек-лист перед вильотом" },
        {
          type: "list",
          items: [
            "Закордонний біометричний паспорт із достатнім строком дії (часто 3–6 місяців після повернення).",
            "Документ про перебування в Чехії.",
            "Страховий поліс і номер асистансу.",
            "Ваучер, авіаквитки та трансфер — ми надішлемо їх у Telegram.",
            "Для дітей — власні паспорти; якщо дитина їде з одним із батьків, уточніть, чи потрібна згода другого.",
          ],
        },
        {
          type: "note",
          title: "Ananas Tour перевірить усе за вас",
          text: "Напишіть Альоні своє громадянство та статус у Чехії — вона перевірить вимоги для обраної країни ще до бронювання.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Pravidla vstupu závisí na třech věcech: na vašem občanství (pasu), pobytovém statusu v Česku a cílové zemi. Níže najdete obecné orientační body. Konkrétní podmínky ověřujeme každému klientovi před rezervací.",
        },
        {
          type: "note",
          title: "Důležité",
          text: "Tento článek je obecná informace, ne právní poradenství. Pravidla se často mění; aktuální požadavky najdete na webu velvyslanectví cílové země a MZV ČR, nebo se zeptejte Aljony.",
        },
        { type: "h2", text: "Cesty v rámci Schengenu" },
        // TODO(client): verify Schengen travel rules for temporary-protection / residence-permit holders.
        {
          type: "p",
          text: "Řecko, Itálie, Španělsko i Bulharsko jsou součástí Schengenu. Držitelé biometrického pasu tam obvykle mohou cestovat bez víza. Vždy si vezměte platný doklad o pobytu v Česku — vízum dočasné ochrany nebo povolení k pobytu —, abyste se bez problémů vrátili.",
        },
        {
          type: "list",
          items: [
            "Zkontrolujte platnost pasu k datu návratu.",
            "Máte nebiometrický pas? Napište nám před rezervací — pravidla mohou být jiná.",
            "Děti cestují s vlastními doklady.",
          ],
        },
        { type: "h2", text: "Cesty mimo EU" },
        {
          type: "p",
          text: "U Turecka, Egypta, SAE, Asie nebo Karibiku rozhoduje především občanství, ne to, kde žijete. Podle země to může být bezvízový vstup, vízum po příletu nebo elektronické vízum vyřízené předem.",
        },
        // TODO(client): verify each row for Ukrainian citizens before publishing.
        {
          type: "table",
          head: ["Země", "Co ověřit"],
          rows: [
            ["Turecko", "Zda pro váš pas platí bezvízový režim a na jak dlouho"],
            ["Egypt", "Vízum po příletu nebo razítko Sinai Only pro Šarm aš-Šajch"],
            ["SAE", "Podmínky vstupu pro vaše občanství"],
            ["Vietnam, Indonésie", "Elektronické vízum předem nebo vízum po příletu"],
            ["Dominikánská republika", "Povinný online formulář e-Ticket před odletem"],
            ["Maledivy, Zanzibar", "Podmínky vstupu, potvrzení hotelu, místní pojištění"],
          ],
        },
        { type: "h2", text: "Návrat do Česka" },
        // TODO(client): verify — consequences of travel abroad for temporary protection status.
        {
          type: "p",
          text: "Nejdůležitější je v klidu se vrátit domů. Před cestou si ověřte, že je váš doklad o pobytu v ČR platný k datu návratu. Pokud máte dočasnou ochranu a plánujete delší cestu, zeptejte se na MV ČR (OAMP), zda nepřítomnost neovlivní váš status.",
        },
        { type: "h3", text: "Kontrolní seznam před odletem" },
        {
          type: "list",
          items: [
            "Biometrický cestovní pas s dostatečnou platností (často 3–6 měsíců po návratu).",
            "Doklad o pobytu v Česku.",
            "Pojistka a číslo asistenční služby.",
            "Voucher, letenky a transfer — pošleme vám je na Telegram.",
            "Pro děti vlastní pasy; pokud dítě cestuje s jedním z rodičů, ověřte, zda je potřeba souhlas druhého.",
          ],
        },
        {
          type: "note",
          title: "Ananas Tour vše ověří za vás",
          text: "Napište Aljoně své občanství a pobytový status v Česku — požadavky pro vybranou zemi ověří ještě před rezervací.",
        },
      ],
    },
  },
  // ───────────────────────────── HOTEL SIGNS
  {
    slug: "hotel-signs",
    date: "2023-09-08",
    image: cover("hotel-signs"),
    tag: tx("Готелі", "Hotely"),
    title: tx("Позначки готелів: AI, HB, SV та зірки без загадок", "Značky hotelů: AI, HB, SV a hvězdičky bez záhad"),
    excerpt: tx(
      "Розшифровуємо типи харчування, номерів і зірковість — і як ці позначки виглядають у каталогах чеських туроператорів.",
      "Vysvětlujeme typy stravování, pokojů a hvězdičky — a jak je najdete v katalozích českých cestovek.",
    ),
    readingMinutes: 4,
    related: ["turkey", "egypt", "greece"],
    telegramMessage: tx(
      "Добрий день, Альона! Допоможіть розібратися з типом номера та харчування в готелі.",
      "Dobrý den, Aljono! Pomozte mi prosím vyznat se v typu pokoje a stravování v hotelu.",
    ),
    seo: {
      title: tx("Позначки готелів: RO, BB, HB, AI, UAI, SV", "Značky hotelů: RO, BB, HB, AI, UAI, SV"),
      description: tx(
        "Що означають абревіатури харчування та номерів у турах, як читати зірки й чеські каталоги. Шпаргалка від Ananas Tour.",
        "Co znamenají zkratky stravování a pokojů, jak číst hvězdičky a české katalogy. Tahák od Ananas Tour.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Обираючи готель, легко загубитися в абревіатурах. Ми зібрали розшифровку найпоширеніших позначок — і додали, як вони звучать чеською, адже саме так їх пишуть у каталогах місцевих туроператорів.",
        },
        { type: "h2", text: "Типи харчування" },
        {
          type: "table",
          head: ["Позначка", "Що означає", "У чеських каталогах"],
          rows: [
            ["RO / OB", "Без харчування", "Bez stravy"],
            ["BB", "Лише сніданки", "Snídaně"],
            ["HB", "Напівпансіон: сніданок + вечеря", "Polopenze"],
            ["FB", "Повний пансіон: сніданок + обід + вечеря", "Plná penze"],
            ["AI", "Все включено: харчування та напої", "All inclusive"],
            ["UAI", "Розширене «все включено», часто з імпортним алкоголем", "Ultra all inclusive"],
          ],
        },
        { type: "h2", text: "Типи номерів і вид із вікна" },
        {
          type: "list",
          items: [
            "Standard — звичайний однокімнатний номер.",
            "Superior — трохи більший або оновлений номер.",
            "Family Room — сімейний номер, часто з двома спальнями.",
            "Suite — двокімнатний номер або номер із вітальнею.",
            "Bungalow — окремий будиночок чи прибудова.",
            "Sea View (SV) — прямий вид на море; Side Sea View — боковий.",
            "Garden View (GV) — вид на сад або територію.",
          ],
        },
        { type: "h2", text: "Зірковість" },
        {
          type: "p",
          text: "Критерії «зірок» відрізняються від країни до країни, а деякі туроператори використовують ще й власну оцінку. Тож 4* в Туреччині й 4* у Греції — не одне й те саме.",
        },
        {
          type: "list",
          items: [
            "5* — найвищий рівень сервісу, велика територія, кілька ресторанів à la carte.",
            "4* — хороший сервіс, комфортні номери, розвинена інфраструктура.",
            "3* — оптимальне співвідношення ціни та якості, базовий набір послуг.",
          ],
        },
        {
          type: "note",
          title: "Порада Ananas Tour",
          text: "Завжди дивіться на рік останньої реновації. Якісний 4* після ремонту часто кращий за старий 5*. Альона підкаже, які готелі справді відповідають своїм зіркам.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Při výběru hotelu se snadno ztratíte ve zkratkách. Sepsali jsme ty nejčastější — včetně toho, jak je najdete v katalozích českých cestovních kanceláří.",
        },
        { type: "h2", text: "Typy stravování" },
        {
          type: "table",
          head: ["Zkratka", "Co znamená", "V českých katalozích"],
          rows: [
            ["RO / OB", "Bez jídla, jen ubytování", "Bez stravy"],
            ["BB", "Jen snídaně", "Snídaně"],
            ["HB", "Snídaně + večeře", "Polopenze"],
            ["FB", "Snídaně + oběd + večeře", "Plná penze"],
            ["AI", "Jídlo i nápoje v ceně", "All inclusive"],
            ["UAI", "Rozšířené all inclusive, často s dováženým alkoholem", "Ultra all inclusive"],
          ],
        },
        { type: "h2", text: "Typy pokojů a výhled" },
        {
          type: "list",
          items: [
            "Standard — běžný jednopokojový pokoj.",
            "Superior — o něco větší nebo zrekonstruovaný pokoj.",
            "Family Room — rodinný pokoj, často se dvěma ložnicemi.",
            "Suite — apartmá se dvěma místnostmi nebo obývacím pokojem.",
            "Bungalow — samostatný domek nebo přístavba.",
            "Sea View (SV) — přímý výhled na moře; Side Sea View — boční výhled.",
            "Garden View (GV) — výhled do zahrady nebo areálu.",
          ],
        },
        { type: "h2", text: "Hvězdičky" },
        {
          type: "p",
          text: "Kritéria hvězdiček se liší podle země a některé cestovní kanceláře používají i vlastní hodnocení. Čtyři hvězdy v Turecku a v Řecku tedy nejsou totéž.",
        },
        {
          type: "list",
          items: [
            "5* — nejvyšší úroveň služeb, velký areál, několik à la carte restaurací.",
            "4* — dobrý servis, pohodlné pokoje, rozvinuté zázemí.",
            "3* — rozumný poměr ceny a kvality, základní služby.",
          ],
        },
        {
          type: "note",
          title: "Tip od Ananas Tour",
          text: "Vždy se dívejte na rok poslední rekonstrukce. Kvalitní 4* po renovaci bývá lepší než starý 5*. Aljona vám poradí, které hotely svým hvězdičkám opravdu odpovídají.",
        },
      ],
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
