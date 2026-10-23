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
    title: tx("Tax Free. Не всюди.", "Tax free. Ne všude."),
    excerpt: tx(
      "Як повернути ПДВ за покупки за кордоном — і чому тим, хто живе в Чехії, це вдається в Туреччині та ОАЕ, але зазвичай не в Греції чи Італії.",
      "Jak si nechat vrátit DPH z nákupů v zahraničí – a proč to s bydlištěm v Česku vyjde v Turecku nebo SAE, ale v Řecku či Itálii obvykle ne.",
    ),
    readingMinutes: 4,
    related: ["turkey", "uae"],
    telegramMessage: tx(
      "Добрий день, Альоно! У мене питання про Tax Free: …\nКуди: …\nКоли: …\nСкільки нас: …",
      "Dobrý den, Aljono! Mám otázku k tax free: …\nKam: …\nKdy: …\nKolik nás je: …",
    ),
    seo: {
      title: tx("Tax Free з Чехії: де вам повернуть ПДВ", "Tax free z Česka: kde vám vrátí DPH"),
      description: tx(
        "Покроково: як оформити Tax Free, чому в ЄС він зазвичай не діє для тих, хто живе в Чехії, де працює (Туреччина, ОАЕ) і що врахувати на митниці.",
        "Krok za krokem: jak vyřídit tax free, proč v EU s pobytem v Česku obvykle nefunguje, kde naopak ano (Turecko, SAE) a co pohlídat na celnici.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Нова сумка чи навушники з відпустки можуть подешевшати ще в аеропорту. Це і є Tax Free — повернення податку на додану вартість (ПДВ) за покупки, які ви вивозите з країни в особистому багажі. Залежно від країни — від кількох до майже 20 % ціни.",
        },
        { type: "h2", text: "Як це працює: 4 кроки" },
        {
          type: "p",
          text: "ПДВ — це податок на споживання всередині країни. Їде покупка з вами за кордон — держава готова його повернути. Але тільки якщо документи оформлено правильно, а митник підтвердив вивезення ще до вильоту.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "У магазині з наліпкою Tax Free попросіть оформити форму на повернення податку. Знадобиться паспорт — тож не залишайте його в готельному сейфі.",
            "Не розпаковуйте й не носіть покупку до виїзду: вона має бути новою, з бирками.",
            "Перед вильотом підтвердьте вивезення: штамп митника на формі або електронна відмітка в кіоску.",
            "Заберіть гроші готівкою в пункті Tax Free в аеропорту — або отримайте їх на картку.",
          ],
        },
        { type: "h2", text: "А якщо ви живете в Чехії?" },
        // TODO(client): verify VAT refund eligibility for holders of temporary protection / residence permits in CZ.
        {
          type: "p",
          text: "У країнах ЄС Tax Free призначений для тих, хто постійно живе поза Євросоюзом. Якщо у вас тимчасовий захист чи дозвіл на проживання в Чехії, магазини й митниця зазвичай вважають вас мешканцем ЄС. Тож у Греції, Італії, Іспанії чи Болгарії ПДВ вам, найімовірніше, не повернуть — хоч би який у вас був паспорт.",
        },
        {
          type: "p",
          text: "Зате за межами ЄС ви — звичайний іноземний турист. У Туреччині та ОАЕ Tax Free працює: у великих торгових центрах оформлення триває кілька хвилин, а гроші ви отримуєте в аеропорту перед вильотом до Чехії.",
        },
        {
          type: "table",
          head: ["Пункт", "На що звернути увагу"],
          rows: [
            ["Мінімальна сума чека", "У кожній країні своя — запитайте на касі"],
            ["Стан товару", "Новий, в оригінальній упаковці, з бирками"],
            ["Документи", "Паспорт, чек і форма Tax Free"],
            ["Де ставити штамп", "У країні покупки, до вильоту"],
          ],
        },
        { type: "h2", text: "Назад до Чехії: митні ліміти" },
        // TODO(client): verify — link the current Celní správa allowances page.
        {
          type: "p",
          text: "Покупки з-поза ЄС можна ввезти до Чехії без мита лише в межах лімітів — окремих для загальної вартості, алкоголю й тютюну. Актуальні суми перевірте перед поїздкою на сайті чеської митниці (Celní správa): краще знати їх до шопінгу, ніж дізнатися від митника.",
        },
        {
          type: "note",
          title: "Порада Альони",
          text: "На митний штамп в аеропорту закладіть щонайменше 30 хвилин. Покупки тримайте в ручній поклажі або здавайте валізу вже після штампа — митник може попросити показати товар.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Nová kabelka nebo sluchátka z dovolené můžou zlevnit ještě na letišti. Tomu se říká tax free: vrácení daně z přidané hodnoty (DPH) za zboží, které si ze země odvážíte v osobních zavazadlech. Podle země jde o pár procent, ale klidně i o skoro 20 % ceny.",
        },
        { type: "h2", text: "Jak to funguje: 4 kroky" },
        {
          type: "p",
          text: "DPH je daň ze spotřeby v dané zemi. Když zboží vyvezete za hranice, stát vám ji může vrátit. Ovšem jen se správně vyplněnými doklady a s potvrzením celníka ještě před odletem.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "V obchodě s nálepkou Tax Free si řekněte o formulář k vrácení daně. Budete potřebovat pas, takže ho nenechávejte v hotelovém trezoru.",
            "Zboží až do odjezdu nerozbalujte a nepoužívejte – musí být nové a se štítky.",
            "Před odletem si nechte vývoz potvrdit – razítkem celníka na formuláři, nebo elektronicky v kiosku.",
            "Peníze si vyzvedněte v hotovosti u přepážky Tax Free na letišti, nebo si je nechte poslat na kartu.",
          ],
        },
        { type: "h2", text: "A když žijete v Česku?" },
        // TODO(client): verify VAT refund eligibility for holders of temporary protection / residence permits in CZ.
        {
          type: "p",
          text: "V EU je tax free jen pro lidi s bydlištěm mimo Unii. S dočasnou ochranou nebo povolením k pobytu v Česku vás obchody i celníci obvykle berou jako obyvatele EU. V Řecku, Itálii, Španělsku nebo Bulharsku vám proto DPH nejspíš nevrátí – ať máte v kapse jakýkoli pas.",
        },
        {
          type: "p",
          text: "Zato mimo EU jste prostě turista ze zahraničí. V Turecku a SAE tax free funguje: ve velkých nákupních centrech ho vyřídíte za pár minut a peníze dostanete na letišti před odletem do Česka.",
        },
        {
          type: "table",
          head: ["Položka", "Na co si dát pozor"],
          rows: [
            ["Minimální částka na účtence", "V každé zemi jiná – zeptejte se u pokladny"],
            ["Stav zboží", "Nové, v původním balení, se štítky"],
            ["Doklady", "Pas, účtenka a formulář tax free"],
            ["Kde potvrdit vývoz", "V zemi nákupu, ještě před odletem"],
          ],
        },
        { type: "h2", text: "Zpátky v Česku: celní limity" },
        // TODO(client): verify — link the current Celní správa allowances page.
        {
          type: "p",
          text: "Zboží ze zemí mimo EU dovezete do Česka bez cla jen do určitých limitů – zvlášť pro celkovou hodnotu, alkohol a tabák. Aktuální částky najdete na webu Celní správy ČR. Vyplatí se je znát dřív, než vám je připomene celník.",
        },
        {
          type: "note",
          title: "Aljonin tip",
          text: "Na celní razítko si na letišti nechte aspoň 30 minut navíc. Nákupy mějte v příručním zavazadle, nebo kufr odbavte až po razítku – celník může chtít zboží vidět.",
        },
      ],
    },
  },
  // ───────────────────────────── INSURANCE
  {
    slug: "insurance",
    date: "2023-09-11",
    image: cover("insurance"),
    tag: tx("Страховка", "Pojištění"),
    title: tx("Хто заплатить лікарю?", "Kdo zaplatí lékaře?"),
    excerpt: tx(
      "На звороті чеської картки медичного страхування зазвичай уже є EHIC. Пояснюю, де вона допоможе, а де ні — і який поліс докупити до туру.",
      "Na zadní straně kartičky pojištěnce už nejspíš máte evropský průkaz EHIC. Vysvětlím, kde vás podrží, kde ne – a jakou pojistku si k zájezdu přikoupit.",
    ),
    readingMinutes: 5,
    related: ["egypt", "turkey"],
    telegramMessage: tx(
      "Добрий день, Альоно! Мене цікавить: туристична страховка.\nКуди: …\nКоли: …\nСкільки нас (вік): …",
      "Dobrý den, Aljono! Zajímá mě: cestovní pojištění.\nKam: …\nKdy: …\nKolik nás je (věk): …",
    ),
    seo: {
      title: tx("Туристична страховка з Чехії: EHIC чи поліс", "Cestovní pojištění: EHIC, nebo pojistka?"),
      description: tx(
        "Чим EHIC відрізняється від туристичного поліса, що має покривати страховка і навіщо страхування від невиїзду. Пояснюю для тих, хто живе в Чехії.",
        "Čím se liší průkaz EHIC od cestovní pojistky, co má pojistka krýt a kdy se vyplatí pojištění storna. Lidsky vysvětleno pro každého, kdo žije v Česku.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Страховка — не папірець для галочки. Це нормальний лікар за кордоном — і гроші, які не підуть із відпускного бюджету на рахунок клініки. Розповім, що у вас уже є, якщо ви живете в Чехії, і що варто докупити до туру.",
        },
        { type: "h2", text: "EHIC: що у вас уже є" },
        // TODO(client): verify EHIC eligibility and coverage for temporary-protection holders.
        {
          type: "p",
          text: "Якщо у вас є чеське державне медичне страхування (VZP чи інша zdravotní pojišťovna), на звороті картки, яку вам видала страхова, зазвичай уже є Європейська картка медичного страхування — EHIC. Вона дає право на необхідну медичну допомогу в державних закладах країн ЄС на тих самих умовах, що й для місцевих.",
        },
        { type: "h3", text: "Чого EHIC не покриває" },
        {
          type: "list",
          items: [
            "Приватні клініки — а на курортах медицина часто саме приватна.",
            "Доплати й співоплата пацієнта, якщо вони є в цій країні.",
            "Транспортування назад до Чехії (репатріація).",
            "Країни поза ЄС: Туреччина, Єгипет, ОАЕ, Азія, Кариби.",
          ],
        },
        { type: "h2", text: "Туристичний поліс" },
        {
          type: "p",
          text: "Тому я раджу оформлювати туристичну страховку до кожної поїздки — навіть у Грецію, навіть на тиждень. Чеські туроператори пропонують страховку, яку можна додати до туру одразу під час бронювання. А я поясню, що саме покриває поліс, — до того, як ви його купите.",
        },
        { type: "h3", text: "Що має бути в хорошому полісі" },
        {
          type: "list",
          items: [
            "Медичні витрати й госпіталізація з достатнім лімітом.",
            "Асистанс, до якого можна додзвонитися будь-коли, і пряма оплата клініці (direct billing) — щоб не платити зі своєї кишені.",
            "Транспортування назад до Чехії (репатріація).",
            "Багаж і затримка рейсу.",
            "Цивільна відповідальність — якщо ненароком щось пошкодите чи когось травмуєте.",
          ],
        },
        {
          type: "table",
          head: ["Регіон", "Приклади", "На що звернути увагу"],
          rows: [
            ["Європа", "Греція, Італія, Іспанія, Болгарія", "Ліміт медичних витрат, приватні клініки"],
            ["Світ без США", "Туреччина, Єгипет, ОАЕ, Азія, Кариби", "Direct billing, репатріація, активний відпочинок"],
            ["Увесь світ", "США, Канада, далекі маршрути", "Високі ліміти — лікування там дуже дороге"],
          ],
        },
        { type: "h2", text: "Страхування від невиїзду (storno)" },
        {
          type: "p",
          text: "Температура за 2 дні до вильоту — і відпустка під питанням. Страхування від невиїзду покриває більшу частину штрафу за скасування туру (storno), якщо ви не змогли поїхати з поважної причини. Оформлюють його разом із бронюванням. Які причини вважаються поважними, написано в умовах — їх я теж поясню українською.",
        },
        {
          type: "note",
          title: "Це закон, а не моя обіцянка",
          text: "Кожен чеський туроператор (CK) за законом № 159/1999 Sb. зобов’язаний мати страхування від банкрутства. Я продаю тури лише таких CK, тож ваші гроші й дорога назад захищені. Тільки не плутайте: це страхування туроператора, а не ваше, — лікаря воно не оплатить.",
        },
        {
          type: "p",
          text: "І маленька звичка на всяк випадок: внесіть номер асистансу в контакти, а фото поліса надішліть собі в «Збережене» в Telegram. Знадобиться — і все під рукою за секунду.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Pojištění není kolonka, kterou stačí odškrtnout. Je to slušný lékař v zahraničí – a peníze, které z rozpočtu na dovolenou neodtečou na účet kliniky. Vysvětlím, co už máte, když žijete v Česku, a co si k zájezdu přikoupit.",
        },
        { type: "h2", text: "EHIC: co už máte" },
        // TODO(client): verify EHIC eligibility and coverage for temporary-protection holders.
        {
          type: "p",
          text: "Pokud jste v Česku veřejně zdravotně pojištěni (u VZP nebo jiné zdravotní pojišťovny), máte na zadní straně kartičky pojištěnce obvykle Evropský průkaz zdravotního pojištění – EHIC. V zemích EU vám zajistí nezbytnou péči ve veřejném zdravotnictví za stejných podmínek, jaké mají místní.",
        },
        { type: "h3", text: "Co EHIC nepokryje" },
        {
          type: "list",
          items: [
            "Soukromé kliniky – a ty v letoviscích obvykle převažují.",
            "Spoluúčast a doplatky, pokud je daná země má.",
            "Repatriaci, tedy převoz zpět do Česka.",
            "Země mimo EU: Turecko, Egypt, SAE, Asie a Karibik.",
          ],
        },
        { type: "h2", text: "Cestovní pojištění" },
        {
          type: "p",
          text: "Proto ke každé cestě doporučuju cestovní pojištění – i do Řecka, i na pouhý týden. České CK ho nabízejí jako doplněk, který přidáte rovnou při rezervaci zájezdu. A já vám vysvětlím, co pojistka kryje – dřív, než ji koupíte.",
        },
        { type: "h3", text: "Co má dobrá pojistka krýt" },
        {
          type: "list",
          items: [
            "Léčebné výlohy a hospitalizaci s dostatečným limitem.",
            "Asistenční službu, na kterou se dovoláte ve dne v noci, a přímou platbu klinice (direct billing) – abyste nic nemuseli platit ze svého.",
            "Repatriaci, tedy převoz zpět do Česka.",
            "Zavazadla a zpoždění letu.",
            "Odpovědnost za škodu – kdybyste nechtěně něco poškodili nebo někoho zranili.",
          ],
        },
        {
          type: "table",
          head: ["Oblast", "Příklady", "Na co si dát pozor"],
          rows: [
            ["Evropa", "Řecko, Itálie, Španělsko, Bulharsko", "Limit léčebných výloh, soukromé kliniky"],
            ["Svět bez USA", "Turecko, Egypt, SAE, Asie, Karibik", "Direct billing, repatriace, krytí sportů"],
            ["Celý svět", "USA, Kanada, vzdálené destinace", "Vysoké limity – léčba je tam velmi drahá"],
          ],
        },
        { type: "h2", text: "Pojištění storna zájezdu" },
        {
          type: "p",
          text: "Horečka 2 dny před odletem a dovolená visí na vlásku. Pojištění storna uhradí většinu stornopoplatku, když ze závažného důvodu nemůžete odcestovat. Sjednává se rovnou s rezervací zájezdu. Které důvody se počítají, stojí v podmínkách – i ty vám vysvětlím lidsky.",
        },
        {
          type: "note",
          title: "To není můj slib, to je zákon",
          text: "Každá česká CK musí mít ze zákona č. 159/1999 Sb. pojištění proti úpadku. Prodávám jen zájezdy takto pojištěných CK, takže vaše peníze i cesta zpět jsou kryté. Jen si to nepleťte: je to pojištění cestovní kanceláře, ne vaše – lékaře z něj nezaplatíte.",
        },
        {
          type: "p",
          text: "A jeden zvyk, který se vyplatí: číslo asistenční služby si uložte do kontaktů a fotku pojistky si pošlete do Uložených zpráv na Telegramu. Kdyby bylo potřeba, máte všechno během vteřiny po ruce.",
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
    title: tx("Документи: туди й назад", "Doklady: tam a zpátky"),
    excerpt: tx(
      "Від чого залежать правила в’їзду, що взяти із собою в Шенген і за межі ЄС — і як спокійно повернутися до Чехії. Наприкінці — чек-лист перед вильотом.",
      "Na čem závisí pravidla vstupu, co si vzít do Schengenu i mimo EU – a jak se v klidu vrátit do Česka. Na konci najdete tahák před odletem.",
    ),
    readingMinutes: 5,
    related: ["egypt", "turkey", "greece"],
    telegramMessage: tx(
      "Добрий день, Альоно! Хочу перевірити документи перед поїздкою.\nКуди й коли: …\nСкільки нас (вік дітей): …\nГромадянство: …\nМій документ у Чехії: …",
      "Dobrý den, Aljono! Chci si před cestou ověřit doklady.\nKam a kdy: …\nKolik nás je (věk dětí): …\nObčanství: …\nMůj pobyt v Česku: …",
    ),
    seo: {
      title: tx("Візи й документи для туру з Чехії", "Víza a doklady na zájezd z Česka"),
      description: tx(
        "Від чого залежать правила в’їзду, як подорожувати Шенгеном і за межі ЄС, коли ви живете в Чехії, і що перевірити перед вильотом. Чек-лист документів.",
        "Na čem závisí pravidla vstupu, jak s pobytem v Česku cestovat po Schengenu i mimo EU a co pohlídat před odletem. Na konci tahák, co mít s sebou.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Правила в’їзду залежать від трьох речей: вашого громадянства (паспорта), документа про перебування в Чехії та країни, куди летите. Нижче — загальні орієнтири. А конкретні умови саме для вашої поїздки я перевірю ще до бронювання.",
        },
        {
          type: "note",
          title: "Важливо",
          text: "Ця стаття — загальна інформація, а не юридична консультація. Правила змінюються, тож актуальні вимоги дивіться на сайтах посольства країни призначення та МЗС Чехії — або запитайте мене.",
        },
        { type: "h2", text: "Подорожі Шенгеном" },
        // TODO(client): verify Schengen travel rules for temporary-protection / residence-permit holders.
        {
          type: "p",
          text: "Греція, Італія, Іспанія та Болгарія — у Шенгені. З біометричним паспортом туди зазвичай можна їхати без візи. Але обов’язково візьміть чинний документ про перебування в Чехії (тимчасовий захист чи дозвіл на проживання) — саме він знадобиться, щоб без проблем повернутися.",
        },
        {
          type: "list",
          items: [
            "Перевірте, до якої дати дійсний паспорт, — і рахуйте від дня повернення, а не вильоту.",
            "Паспорт небіометричний? Напишіть мені до бронювання — правила можуть бути іншими.",
            "У кожної дитини мають бути власні документи.",
          ],
        },
        { type: "h2", text: "Поїздки за межі ЄС" },
        {
          type: "p",
          text: "У Туреччині, Єгипті, ОАЕ, Азії чи на Карибах вирішує передусім громадянство, а не те, де ви живете. Залежно від країни це може бути безвізовий в’їзд, віза в аеропорту після прильоту або електронна віза, яку оформлюють заздалегідь.",
        },
        // TODO(client): verify each row for Ukrainian citizens before publishing.
        {
          type: "table",
          head: ["Країна", "Що перевірити"],
          rows: [
            ["Туреччина", "Чи діє безвізовий режим для вашого паспорта й на який строк"],
            ["Єгипет", "Віза в аеропорту після прильоту або штамп Sinai Only для Шарм-ель-Шейха"],
            ["ОАЕ", "Умови в’їзду для вашого громадянства"],
            ["В’єтнам, Балі (Індонезія)", "Електронна віза заздалегідь або віза в аеропорту після прильоту"],
            ["Домінікана", "Обов’язкова онлайн-анкета e-Ticket перед вильотом"],
            ["Мальдіви, Занзібар", "Умови в’їзду, підтвердження готелю, місцева страховка"],
          ],
        },
        { type: "h2", text: "Назад до Чехії" },
        // TODO(client): verify — consequences of travel abroad for temporary protection status.
        {
          type: "p",
          text: "Найважливіше — спокійно повернутися з відпустки. Перед поїздкою переконайтеся, що ваш документ про перебування в Чехії дійсний на дату повернення. Якщо у вас тимчасовий захист і ви плануєте довшу подорож, уточніть у МВС Чехії (OAMP), чи не вплине тривала відсутність на ваш статус.",
        },
        { type: "h3", text: "Чек-лист перед вильотом" },
        {
          type: "list",
          items: [
            "Біометричний закордонний паспорт із запасом строку дії (часто 3–6 місяців після повернення).",
            "Документ про перебування в Чехії.",
            "Страховий поліс і номер асистансу.",
            "Ваучер, квитки й деталі трансферу — я надішлю їх у Telegram.",
            "Для дітей — власні паспорти. Якщо дитина їде з одним із батьків, уточніть, чи потрібна згода другого.",
          ],
        },
        {
          type: "note",
          title: "Перевірю до бронювання",
          text: "Напишіть мені своє громадянство й документ, з яким ви живете в Чехії. Я перевірю вимоги обраної країни ще до бронювання — щоб ви спокійно полетіли й спокійно повернулися.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Pravidla vstupu závisí na třech věcech: na vašem občanství (tedy pasu), na dokladu o pobytu v Česku a na zemi, kam letíte. Níže najdete základní přehled – konkrétní podmínky pro vaši cestu ověřím ještě před rezervací.",
        },
        {
          type: "note",
          title: "Důležité",
          text: "Článek je obecná informace, ne právní rada. Pravidla se mění, a tak aktuální požadavky hledejte na webu velvyslanectví cílové země a MZV ČR – nebo se zeptejte mě.",
        },
        { type: "h2", text: "Cesty po Schengenu" },
        // TODO(client): verify Schengen travel rules for temporary-protection / residence-permit holders.
        {
          type: "p",
          text: "Řecko, Itálie, Španělsko i Bulharsko jsou v Schengenu. S biometrickým pasem tam obvykle pojedete bez víza. Vždycky si ale vezměte platný doklad o pobytu v Česku (dočasnou ochranu nebo povolení k pobytu) – právě ten budete potřebovat, abyste se bez potíží vrátili.",
        },
        {
          type: "list",
          items: [
            "Zkontrolujte, do kdy platí pas – a počítejte od data návratu, ne odletu.",
            "Máte nebiometrický pas? Napište mi před rezervací – pravidla pro vás můžou být jiná.",
            "Každé dítě musí mít vlastní doklady.",
          ],
        },
        { type: "h2", text: "Cesty mimo EU" },
        {
          type: "p",
          text: "Při cestě do Turecka, Egypta, SAE, Asie nebo Karibiku rozhoduje hlavně občanství, ne to, kde žijete. Podle země vás čeká bezvízový vstup, vízum po příletu na letišti, nebo elektronické vízum, které se vyřizuje předem.",
        },
        // TODO(client): verify each row for Ukrainian citizens before publishing.
        {
          type: "table",
          head: ["Země", "Co ověřit"],
          rows: [
            ["Turecko", "Jestli pro váš pas platí bezvízový režim a na jak dlouho"],
            ["Egypt", "Vízum po příletu na letišti, nebo razítko Sinai Only pro Šarm aš-Šajch"],
            ["SAE", "Podmínky vstupu pro vaše občanství"],
            ["Vietnam, Bali (Indonésie)", "Elektronické vízum předem, nebo vízum po příletu na letišti"],
            ["Dominikána", "Povinný online formulář e-Ticket před odletem"],
            ["Maledivy, Zanzibar", "Podmínky vstupu, potvrzení hotelu, místní pojištění"],
          ],
        },
        { type: "h2", text: "Návrat do Česka" },
        // TODO(client): verify — consequences of travel abroad for temporary protection status.
        {
          type: "p",
          text: "Nejdůležitější je, abyste se z dovolené v klidu vrátili. Před cestou si ověřte, že váš doklad o pobytu v Česku platí i v den návratu. Pokud máte dočasnou ochranu a chystáte se na delší cestu, zeptejte se na Ministerstvu vnitra (OAMP), jestli delší nepřítomnost neovlivní váš status.",
        },
        { type: "h3", text: "Než vyrazíte na letiště" },
        {
          type: "list",
          items: [
            "Biometrický cestovní pas s rezervou platnosti (často 3–6 měsíců po návratu).",
            "Doklad o pobytu v Česku.",
            "Pojistka a číslo asistenční služby.",
            "Voucher, letenky a informace k transferu – všechno vám pošlu na Telegram.",
            "Pro děti vlastní pasy. Pokud dítě cestuje jen s jedním z rodičů, ověřte si, jestli je potřeba souhlas toho druhého.",
          ],
        },
        {
          type: "note",
          title: "Ověřím před rezervací",
          text: "Napište mi, jaké máte občanství a doklad o pobytu v Česku. Požadavky vybrané země ověřím ještě před rezervací – abyste odletěli v klidu a v klidu se i vrátili.",
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
    title: tx("Готель по літерах", "Hotel ve zkratce"),
    excerpt: tx(
      "AI чи UAI? SV чи GV? Розшифровую позначки так, як їх пишуть чеські туроператори, — і пояснюю, чому 4★ у Туреччині не дорівнює 4★ у Греції.",
      "AI, nebo UAI? SV, nebo GV? Rozluštím zkratky z katalogů českých CK – a vysvětlím, proč 4* v Turecku není totéž co 4* v Řecku.",
    ),
    readingMinutes: 4,
    related: ["turkey", "egypt", "greece"],
    telegramMessage: tx(
      "Добрий день, Альоно! Хочу готель, який заслуговує на свої зірки.\nКуди: …\nКоли: …\nСкільки нас (вік дітей): …\nХарчування: …",
      "Dobrý den, Aljono! Chci hotel, který si své hvězdy zaslouží.\nKam: …\nKdy: …\nKolik nás je (věk dětí): …\nStrava: …",
    ),
    seo: {
      title: tx("Позначки готелів: AI, UAI, HB, SV і зірки", "Hotelové zkratky: AI, UAI, HB, SV a hvězdičky"),
      description: tx(
        "Що означають RO, BB, HB, FB, AI, UAI, SV і GV, чому 4★ у Туреччині й Греції — не одне й те саме і як читати каталоги чеських туроператорів. Шпаргалка.",
        "Co znamenají RO, BB, HB, FB, AI, UAI, SV a GV, proč 4* v Turecku a v Řecku není totéž a jak číst katalogy českých CK. Tahák na jednom místě.",
      ),
    },
    body: {
      uk: [
        {
          type: "p",
          text: "Дві-три літери в описі туру вирішують, чи платитимете ви за кожен напій біля басейну й чи побачите море з балкона. Нижче — розшифровка найпоширеніших позначок і те, як вони звучать чеською: саме так їх пишуть у каталогах місцевих туроператорів.",
        },
        { type: "h2", text: "Типи харчування" },
        {
          type: "table",
          head: ["Позначка", "Що означає", "У чеських каталогах"],
          rows: [
            ["RO / OB", "Без харчування, лише проживання", "Bez stravy"],
            ["BB", "Лише сніданки", "Snídaně"],
            ["HB", "Напівпансіон: сніданок і вечеря", "Polopenze"],
            ["FB", "Повний пансіон: сніданок, обід і вечеря", "Plná penze"],
            ["AI", "Все включено: їжа й напої", "All inclusive"],
            ["UAI", "Ультра все включено: ширший вибір, часто з імпортним алкоголем", "Ultra all inclusive"],
          ],
        },
        { type: "h2", text: "Номер і вид із вікна" },
        {
          type: "list",
          items: [
            "Standard — базовий номер.",
            "Superior — трохи просторіший або з новішим ремонтом.",
            "Family Room — сімейний номер, часто з двома спальнями.",
            "Suite — номер із вітальнею або двома кімнатами.",
            "Bungalow — окремий будиночок чи прибудова.",
            "Sea View (SV) — вид на море; Side Sea View — бічний вид на море.",
            "Garden View (GV) — вид на сад або територію готелю.",
          ],
        },
        { type: "h2", text: "Зірки" },
        {
          type: "p",
          text: "Критерії зірок у кожній країні свої, а деякі туроператори ще й ставлять власну оцінку. Тож 4★ у Туреччині й 4★ у Греції — не одне й те саме.",
        },
        {
          type: "list",
          items: [
            "5★ — найвищий рівень сервісу, велика територія, кілька ресторанів à la carte.",
            "4★ — хороший сервіс, зручні номери, усе потрібне на території.",
            "3★ — помірна ціна й базовий набір послуг.",
          ],
        },
        {
          type: "note",
          title: "Порада Альони",
          text: "Дивіться не лише на зірки, а й на рік останнього ремонту: свіжий 4★ часто кращий за втомлений 5★. А чи заслужив свої зірки конкретний готель, скажу чесно — навіть якщо мовчки його було б легше продати.",
        },
      ],
      cs: [
        {
          type: "p",
          text: "Dvě, tři písmena v popisu zájezdu rozhodnou, jestli budete platit za každé pití u bazénu a jestli z balkonu uvidíte moře. Tady jsou nejčastější zkratky – i s tím, jak je najdete v katalozích českých CK.",
        },
        { type: "h2", text: "Typy stravování" },
        {
          type: "table",
          head: ["Zkratka", "Co znamená", "V českých katalozích"],
          rows: [
            ["RO / OB", "Bez jídla, jen ubytování", "Bez stravy"],
            ["BB", "Jen snídaně", "Snídaně"],
            ["HB", "Snídaně a večeře", "Polopenze"],
            ["FB", "Snídaně, oběd a večeře", "Plná penze"],
            ["AI", "Jídlo i pití v ceně", "All inclusive"],
            ["UAI", "Rozšířené all inclusive, často i s dováženým alkoholem", "Ultra all inclusive"],
          ],
        },
        { type: "h2", text: "Pokoj a výhled" },
        {
          type: "list",
          items: [
            "Standard – základní pokoj.",
            "Superior – o něco prostornější nebo nověji zrekonstruovaný.",
            "Family Room – rodinný pokoj, často se dvěma ložnicemi.",
            "Suite – pokoj s obývákem nebo ze dvou místností.",
            "Bungalow – samostatný domek nebo přístavba.",
            "Sea View (SV) – výhled na moře; Side Sea View – boční výhled na moře.",
            "Garden View (GV) – výhled do zahrady nebo areálu.",
          ],
        },
        { type: "h2", text: "Hvězdičky" },
        {
          type: "p",
          text: "Kritéria hvězdiček si každá země určuje po svém a některé CK k nim přidávají ještě vlastní hodnocení. Proto 4* v Turecku není totéž co 4* v Řecku.",
        },
        {
          type: "list",
          items: [
            "5* – nejvyšší úroveň služeb, velký areál, několik à la carte restaurací.",
            "4* – dobré služby, pohodlné pokoje, vše potřebné přímo v areálu.",
            "3* – příznivější cena a základní služby.",
          ],
        },
        {
          type: "note",
          title: "Aljonin tip",
          text: "Nedívejte se jen na hvězdy, ale i na rok poslední rekonstrukce: čerstvý 4* bývá lepší než unavený 5*. A jestli si konkrétní hotel své hvězdy zaslouží, řeknu vám na rovinu – i když by bylo jednodušší mlčet a prodat ho.",
        },
      ],
    },
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
