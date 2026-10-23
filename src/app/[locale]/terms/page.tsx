import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument, localize, type LegalSource } from "@/components/pages/legal";
import { site } from "@/config/site";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";

/*
 * Terms of a travel AGENCY (cestovní agentura) under zákon č. 159/1999 Sb.
 * and §§ 2521 ff. zákona č. 89/2012 Sb. (občanský zákoník).
 * TODO(client): whole document must be reviewed by a Czech lawyer before launch.
 * TODO(client): fill legal entity data in src/config/site.ts (company.*) and the trade licence
 *               ("provozování cestovní agentury") registration details.
 * TODO(client): confirm payment flow — does the customer pay the CK directly, or the agency
 *               on behalf of the CK (agency then must pass the money on per the CK contract)?
 * TODO(client): lawyer to check whether combined separate services (flight + hotel) can create
 *               "spojené cestovní služby" (§ 2527 OZ) requiring the agency's own insolvency insurance.
 * TODO(client): mediating travel insurance may require registration with ČNB as a (doplňkový)
 *               pojišťovací zprostředkovatel — lawyer to confirm.
 * TODO(client): confirm the effective date below.
 * TODO(client): the EU online dispute resolution (ODR) platform mentioned in the "adr" section was
 *               discontinued in July 2025 (Regulation (EU) 2024/3228) — lawyer to confirm and update.
 */

type L = Record<Locale, string>;

const EFFECTIVE = { uk: "Діє з 22.10.2026", cs: "Účinné od 22. 10. 2026" };

const meta = {
  title: { uk: "Умови надання послуг", cs: "Obchodní podmínky" },
  description: {
    uk: "Як працює турагенція Ananas Tour: шлях від запиту до договору з чеським туроператором, оплата, страхування від банкрутства, зміни, скасування й скарги.",
    cs: "Jak funguje cestovní agentura Ananas Tour: cesta od poptávky ke smlouvě s českou CK, platby, pojištění proti úpadku, změny, storno a reklamace.",
  },
  toc: { uk: "Зміст", cs: "Obsah" },
  intro: {
    uk: "Коротко: Ananas Tour — турагенція, а не туроператор. Ми допомагаємо обрати тур і оформити бронювання, а договір про тур ви укладаєте безпосередньо з чеським туроператором (cestovní kancelář, CK), який за законом має бути застрахований від банкрутства. На сайті ви нічого не платите.",
    cs: "Ve zkratce: Ananas Tour je cestovní agentura, ne cestovní kancelář. Pomůžeme vám vybrat zájezd a vyřídit rezervaci, smlouvu o zájezdu ale uzavíráte přímo s českou cestovní kanceláří (CK), která musí být ze zákona pojištěná proti úpadku. Na webu nic neplatíte.",
  },
};

function sections(): LegalSource[] {
  const c = site.company;
  const ct = site.contact;
  return [
    {
      id: "intro",
      heading: { uk: "Загальні положення", cs: "Úvodní ustanovení" },
      paragraphs: [
        {
          uk: `Ці умови регулюють відносини між компанією ${c.legalName}, IČO: ${c.ico}, з місцезнаходженням ${c.registeredOffice} (далі — «агенція» або «Ananas Tour»), і клієнтом (далі — «ви») під час посередництва в продажу турів та інших туристичних послуг.`,
          cs: `Tyto obchodní podmínky upravují vztah mezi společností ${c.legalName}, IČO: ${c.ico}, se sídlem ${c.registeredOffice} (dále jen „agentura“ nebo „Ananas Tour“), a zákazníkem (dále jen „vy“) při zprostředkování zájezdů a dalších služeb cestovního ruchu.`,
        },
        {
          uk: "Агенція провадить діяльність турагенції відповідно до закону № 159/1999 Sb. про деякі умови підприємницької діяльності та здійснення окремих видів діяльності у сфері туризму, а також положень Цивільного кодексу (zákon č. 89/2012 Sb.) щодо договору про тур.",
          cs: "Agentura vykonává činnost cestovní agentury podle zákona č. 159/1999 Sb., o některých podmínkách podnikání a o výkonu některých činností v oblasti cestovního ruchu, a podle ustanovení občanského zákoníku (zákon č. 89/2012 Sb.) o zájezdu.",
        },
      ],
    },
    {
      id: "role",
      heading: { uk: "Хто за що відповідає", cs: "Kdo za co odpovídá" },
      list: [
        {
          uk: "Агенція — посередник: пропонує й продає тури від імені та за рахунок туроператорів (cestovní kanceláře, CK), які мають концесію на провадження діяльності туроператора в Чехії.",
          cs: "Agentura jedná jako zprostředkovatel: nabízí a prodává zájezdy jménem a na účet cestovních kanceláří (CK), které mají koncesi k provozování cestovní kanceláře v České republice.",
        },
        {
          uk: "Договір про тур (smlouva o zájezdu) ви укладаєте з туроператором. Саме туроператор відповідає за належне надання всіх послуг туру.",
          cs: "Smlouvu o zájezdu uzavíráte s cestovní kanceláří. Právě ta odpovídá za řádné poskytnutí všech služeb zájezdu.",
        },
        {
          uk: "На договір поширюються загальні договірні умови відповідного туроператора — ми ознайомимо вас із ними ще до бронювання.",
          cs: "Smlouva se řídí všeobecnými smluvními podmínkami příslušné CK; seznámíme vás s nimi ještě před rezervací.",
        },
        {
          uk: "Перед укладенням договору ви отримаєте передбачений законом формуляр з інформацією про тур і документ про страхування туроператора від банкрутства.",
          cs: "Před uzavřením smlouvy obdržíte zákonem předepsaný formulář s informacemi o zájezdu a doklad o pojištění cestovní kanceláře pro případ úpadku.",
        },
      ],
    },
    {
      id: "booking",
      heading: { uk: "Від запиту до договору", cs: "Od poptávky ke smlouvě" },
      list: [
        {
          uk: "Ви надсилаєте запит — у Telegram, телефоном, електронною поштою або через форму на сайті.",
          cs: "Pošlete nám poptávku – přes Telegram, telefonicky, e-mailem nebo formulářem na webu.",
        },
        {
          uk: "Ми підбираємо варіанти й перевіряємо в туроператора актуальну ціну та вільні місця. Ціни на сайті орієнтовні, доки їх не підтвердить туроператор.",
          cs: "Vybereme pro vás vhodné varianty a u CK ověříme aktuální cenu a volná místa. Ceny na webu jsou orientační, dokud je CK nepotvrdí.",
        },
        {
          uk: "Щойно ви підтвердите вибір, ми бронюємо тур; туроператор підтверджує бронювання й оформлює договір про тур.",
          cs: "Jakmile svůj výběr potvrdíte, zájezd zarezervujeme; CK rezervaci potvrdí a vystaví smlouvu o zájezdu.",
        },
        {
          uk: "Договір вважається укладеним з моменту, коли його підтвердить туроператор згідно зі своїми умовами.",
          cs: "Smlouva je uzavřena okamžikem, kdy ji cestovní kancelář potvrdí podle svých podmínek.",
        },
      ],
    },
    {
      id: "payment",
      heading: { uk: "Ціни та оплата", cs: "Ceny a platby" },
      paragraphs: [
        {
          uk: "Ціни вказано в чеських кронах (Kč). Розмір і строки сплати завдатку (záloha) та доплати визначають умови туроператора: зазвичай спершу ви сплачуєте завдаток, а решту — до виїзду.",
          cs: "Ceny jsou uvedeny v českých korunách (Kč). Výši a splatnost zálohy a doplatku určují podmínky CK; obvykle nejprve zaplatíte zálohu a zbytek ceny před odjezdem.",
        },
        {
          uk: "Ви платите на рахунок туроператора або на рахунок агенції, яка приймає кошти від імені туроператора. Спосіб оплати буде вказано в підтвердженні бронювання.",
          cs: "Platíte buď na účet CK, nebo na účet agentury, která platbu přijímá jménem CK. Způsob platby bude uveden v potvrzení rezervace.",
        },
      ],
    },
    {
      id: "insolvency",
      heading: { uk: "Страхування туроператора від банкрутства", cs: "Pojištění CK proti úpadku" },
      paragraphs: [
        {
          uk: "Ми пропонуємо тури лише тих туроператорів, які мають обов’язкове страхування від банкрутства. Якщо через банкрутство туроператор не виконає своїх зобов’язань, страховик відповідно до закону № 159/1999 Sb. забезпечить вам перевезення назад до місця виїзду (репатріацію) і повернення сплачених коштів.",
          cs: "Nabízíme pouze zájezdy cestovních kanceláří, které mají povinné pojištění záruky pro případ úpadku. Pokud CK v důsledku úpadku nesplní své závazky, pojišťovna podle zákona č. 159/1999 Sb. zajistí dopravu zpět do místa odjezdu (repatriaci) a vrácení zaplacených částek.",
        },
      ],
    },
    {
      id: "changes",
      heading: { uk: "Зміни та відмова від договору", cs: "Změny a odstoupení od smlouvy" },
      paragraphs: [
        {
          uk: "Ви можете відмовитися від договору про тур до початку туру. Туроператор має право стягнути відступне (stornopoplatek) згідно зі своїми умовами. Зміни бронювання так само регулюють умови туроператора.",
          cs: "Od smlouvy o zájezdu můžete odstoupit před zahájením zájezdu. CK má právo požadovat odstupné (stornopoplatek) podle svých podmínek. Změny rezervace se rovněž řídí podmínkami CK.",
        },
        {
          uk: "Радимо оформити страхування від невиїзду (storno): воно покриває відступне, якщо поїхати завадить хвороба чи інша поважна причина.",
          cs: "Doporučujeme sjednat si pojištění storna zájezdu: kryje stornopoplatky, pokud vám v odjezdu zabrání nemoc nebo jiný závažný důvod.",
        },
      ],
    },
    {
      id: "services",
      heading: { uk: "Окремі послуги", cs: "Samostatné služby" },
      paragraphs: [
        {
          uk: "Коли ми посередничаємо в продажу окремих послуг (авіаквитки, проживання, трансфер, страхування, екскурсії), договір ви укладаєте з постачальником послуги, і діють його умови. Ще до оплати ми повідомимо, про що саме йдеться: про тур, пов’язані туристичні послуги (spojené cestovní služby) чи окрему послугу.",
          cs: "Při zprostředkování samostatných služeb (letenky, ubytování, transfer, pojištění, výlety) uzavíráte smlouvu s poskytovatelem služby a platí jeho podmínky. Ještě před platbou vás upozorníme, zda jde o zájezd, spojené cestovní služby, nebo samostatnou službu.",
        },
      ],
    },
    {
      id: "documents",
      heading: { uk: "Документи для подорожі", cs: "Cestovní doklady" },
      paragraphs: [
        {
          uk: "За дійсний закордонний паспорт чи інший проїзний документ, візи та виконання умов в’їзду відповідаєте ви. Ми надамо загальну інформацію з урахуванням українського громадянства та статусу перебування в Чехії (зокрема тимчасового захисту), проте остаточні вимоги встановлюють органи країни призначення.",
          cs: "Za platný cestovní doklad, víza a splnění podmínek vstupu odpovídáte vy. Poskytneme vám obecné informace s ohledem na ukrajinské občanství a pobytový status v Česku (včetně dočasné ochrany), konečné požadavky však stanovují orgány cílové země.",
        },
      ],
    },
    {
      id: "complaints",
      heading: { uk: "Рекламації та скарги", cs: "Reklamace a stížnosti" },
      paragraphs: [
        {
          uk: "Про недоліки туру потрібно без зайвої затримки повідомити туроператора (або його представника на місці). Агенція допоможе скласти рекламацію й передати її туроператору.",
          cs: "Vady zájezdu je třeba bez zbytečného odkladu vytknout cestovní kanceláři (nebo jejímu delegátovi na místě). Agentura vám pomůže reklamaci sepsat a předat ji CK.",
        },
        {
          uk: `Скарги на послуги самої агенції надсилайте на ${ct.email} або в Telegram @${ct.telegramUsername}.`,
          cs: `Stížnosti na služby samotné agentury posílejte na ${ct.email} nebo přes Telegram @${ct.telegramUsername}.`,
        },
      ],
    },
    {
      id: "adr",
      heading: { uk: "Позасудове вирішення спорів", cs: "Mimosoudní řešení sporů" },
      paragraphs: [
        {
          uk: "Органом, уповноваженим позасудово вирішувати споживчі спори, є Чеська торговельна інспекція (Česká obchodní inspekce; www.coi.cz, adr.coi.cz). Також можна скористатися платформою ЄС для онлайн-\u2060вирішення спорів.",
          cs: "K mimosoudnímu řešení spotřebitelských sporů je příslušná Česká obchodní inspekce (www.coi.cz, adr.coi.cz). Využít lze také platformu EU pro řešení sporů online.",
        },
      ],
    },
    {
      id: "final",
      heading: { uk: "Прикінцеві положення", cs: "Závěrečná ustanovení" },
      paragraphs: [
        {
          uk: "Відносини сторін регулює право Чеської Республіки. Як ми обробляємо персональні дані, описано на сторінці «Захист даних». Переважну силу має чеська версія умов; український переклад наведено для довідки.",
          cs: "Vztahy smluvních stran se řídí právním řádem České republiky. Jak zpracováváme osobní údaje, popisuje stránka „Ochrana osobních údajů“. Rozhodující je české znění podmínek; ukrajinský překlad slouží pouze pro informaci.",
        },
      ],
    },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(meta.title, locale),
    description: t(meta.description, locale),
    alternates: { canonical: routes.terms(locale), languages: languageAlternates(routes.terms) },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const intro: L = meta.intro;
  return (
    <LegalDocument
      title={t(meta.title, locale)}
      updated={t(EFFECTIVE, locale)}
      tocLabel={t(meta.toc, locale)}
      intro={t(intro, locale)}
      sections={localize(sections(), locale)}
    />
  );
}
