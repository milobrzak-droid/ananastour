import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument, localize, type LegalSource } from "@/components/pages/legal";
import { site } from "@/config/site";
import { isLocale, t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";

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
 */

type L = Record<Locale, string>;

const EFFECTIVE = { uk: "Редакція від 22.10.2026", cs: "Účinné od 22. 10. 2026" };

const meta = {
  title: { uk: "Умови надання послуг", cs: "Obchodní podmínky" },
  description: {
    uk: "Умови посередництва турагенції Ananas Tour у продажу турів чеських туроператорів.",
    cs: "Obchodní podmínky cestovní agentury Ananas Tour pro zprostředkování zájezdů českých cestovních kanceláří.",
  },
  toc: { uk: "Зміст", cs: "Obsah" },
  intro: {
    uk: "Коротко: Ananas Tour — турагенція. Ми допомагаємо обрати тур і оформити його, а договір про тур ви укладаєте безпосередньо з туроператором (cestovní kancelář, CK), який застрахований на випадок банкрутства.",
    cs: "Stručně: Ananas Tour je cestovní agentura. Pomůžeme vám vybrat zájezd a vyřídit objednávku, smlouvu o zájezdu však uzavíráte přímo s cestovní kanceláří (CK), která je pojištěna pro případ úpadku.",
  },
};

function sections(): LegalSource[] {
  const c = site.company;
  const ct = site.contact;
  return [
    {
      id: "intro",
      heading: { uk: "Вступні положення", cs: "Úvodní ustanovení" },
      paragraphs: [
        {
          uk: `Ці умови регулюють відносини між ${c.legalName}, IČO: ${c.ico}, з місцезнаходженням ${c.registeredOffice} (далі — «агенція» або «Ananas Tour»), і клієнтом під час посередництва в продажу турів та інших туристичних послуг.`,
          cs: `Tyto obchodní podmínky upravují vztah mezi společností ${c.legalName}, IČO: ${c.ico}, se sídlem ${c.registeredOffice} (dále jen „agentura“ nebo „Ananas Tour“) a zákazníkem při zprostředkování zájezdů a dalších služeb cestovního ruchu.`,
        },
        {
          uk: "Агенція провадить діяльність турагенції відповідно до закону № 159/1999 Sb. про деякі умови підприємницької діяльності у сфері туризму та положень Цивільного кодексу (zákon č. 89/2012 Sb.) про договір про тур.",
          cs: "Agentura provozuje činnost cestovní agentury podle zákona č. 159/1999 Sb., o některých podmínkách podnikání a o výkonu některých činností v oblasti cestovního ruchu, a ustanovení občanského zákoníku (zákon č. 89/2012 Sb.) o zájezdu.",
        },
      ],
    },
    {
      id: "role",
      heading: { uk: "Роль агенції та туроператора", cs: "Postavení agentury a cestovní kanceláře" },
      list: [
        {
          uk: "Агенція є посередником: пропонує та продає тури від імені й на рахунок туроператорів (cestovní kanceláře, CK), що мають концесію на провадження туристичної діяльності в Чехії.",
          cs: "Agentura je zprostředkovatelem: nabízí a prodává zájezdy jménem a na účet cestovních kanceláří (CK), které mají koncesi k provozování cestovní kanceláře v České republice.",
        },
        {
          uk: "Договір про тур (smlouva o zájezdu) укладається між вами та туроператором. Туроператор відповідає за належне надання всіх послуг туру.",
          cs: "Smlouva o zájezdu se uzavírá mezi vámi a cestovní kanceláří. Za řádné poskytnutí všech služeb zájezdu odpovídá cestovní kancelář.",
        },
        {
          uk: "На договір поширюються загальні умови відповідного туроператора, з якими ми ознайомимо вас до бронювання.",
          cs: "Smlouva se řídí všeobecnými smluvními podmínkami příslušné CK, se kterými vás seznámíme před rezervací.",
        },
        {
          uk: "Перед укладенням договору ви отримаєте передбачений законом формуляр з інформацією про тур і сертифікат страхування туроператора.",
          cs: "Před uzavřením smlouvy obdržíte zákonem předepsaný formulář s informacemi o zájezdu a doklad o pojištění cestovní kanceláře.",
        },
      ],
    },
    {
      id: "booking",
      heading: { uk: "Як відбувається замовлення", cs: "Jak probíhá objednávka" },
      list: [
        {
          uk: "Ви надсилаєте запит у Telegram, телефоном, e-mail або через форму на сайті.",
          cs: "Pošlete poptávku přes Telegram, telefonicky, e-mailem nebo formulářem na webu.",
        },
        {
          uk: "Ми підбираємо варіанти й перевіряємо актуальну ціну та наявність у туроператора. Ціни на сайті орієнтовні, доки їх не підтвердить туроператор.",
          cs: "Připravíme varianty a ověříme aktuální cenu a dostupnost u CK. Ceny na webu jsou orientační, dokud je CK nepotvrdí.",
        },
        {
          uk: "Після вашого підтвердження ми бронюємо тур, а туроператор підтверджує бронювання та надсилає договір про тур.",
          cs: "Po vašem potvrzení zájezd rezervujeme, CK rezervaci potvrdí a vystaví smlouvu o zájezdu.",
        },
        {
          uk: "Договір вважається укладеним після його підтвердження туроператором згідно з його умовами.",
          cs: "Smlouva je uzavřena okamžikem jejího potvrzení cestovní kanceláří podle jejích podmínek.",
        },
      ],
    },
    {
      id: "payment",
      heading: { uk: "Ціни та оплата", cs: "Ceny a platby" },
      paragraphs: [
        {
          uk: "Ціни вказуються в чеських кронах (CZK). Розмір і строки передоплати та доплати визначають умови туроператора; зазвичай передоплата становить частину ціни, а решта сплачується до виїзду.",
          cs: "Ceny jsou uváděny v českých korunách (Kč). Výši a splatnost zálohy a doplatku určují podmínky CK; obvykle se platí záloha a doplatek před odjezdem.",
        },
        {
          uk: "Оплата здійснюється на рахунок туроператора або на рахунок агенції, яка приймає кошти від імені туроператора. Спосіб оплати буде вказано в підтвердженні бронювання.",
          cs: "Platba se provádí na účet CK, nebo na účet agentury, která platbu přijímá jménem CK. Způsob platby bude uveden v potvrzení rezervace.",
        },
      ],
    },
    {
      id: "insolvency",
      heading: { uk: "Страхування на випадок банкрутства туроператора", cs: "Pojištění pro případ úpadku CK" },
      paragraphs: [
        {
          uk: "Ми пропонуємо тури лише тих туроператорів, які мають обов'язкове страхування на випадок банкрутства. Якщо туроператор не зможе виконати зобов'язання через банкрутство, страховик забезпечить повернення на батьківщину та відшкодування сплачених коштів відповідно до закону № 159/1999 Sb.",
          cs: "Nabízíme pouze zájezdy cestovních kanceláří, které mají povinné pojištění záruky pro případ úpadku. Nesplní-li CK své závazky z důvodu úpadku, pojišťovna zajistí repatriaci a vrácení zaplacených částek podle zákona č. 159/1999 Sb.",
        },
      ],
    },
    {
      id: "changes",
      heading: { uk: "Зміни та скасування", cs: "Změny a zrušení" },
      paragraphs: [
        {
          uk: "Ви можете відмовитися від договору про тур до його початку. Туроператор має право стягнути відступні (storno poplatek) відповідно до своїх умов. Зміни в бронюванні також регулюються умовами туроператора.",
          cs: "Od smlouvy o zájezdu můžete odstoupit před zahájením zájezdu. CK je oprávněna účtovat odstupné (stornopoplatek) podle svých podmínek. Změny rezervace se rovněž řídí podmínkami CK.",
        },
        {
          uk: "Рекомендуємо оформити страхування від невиїзду, яке покриває відступні у разі хвороби чи інших поважних причин.",
          cs: "Doporučujeme sjednat pojištění storna zájezdu, které kryje stornopoplatky v případě nemoci či jiných závažných důvodů.",
        },
      ],
    },
    {
      id: "services",
      heading: { uk: "Інші послуги", cs: "Další služby" },
      paragraphs: [
        {
          uk: "Під час посередництва в окремих послугах (авіаквитки, проживання, трансфер, страхування, екскурсії) договір укладається з постачальником послуги, і застосовуються його умови. Перед оплатою ми повідомимо, чи йдеться про тур, пов'язані туристичні послуги чи окрему послугу.",
          cs: "Při zprostředkování samostatných služeb (letenky, ubytování, transfer, pojištění, výlety) se smlouva uzavírá s poskytovatelem služby a platí jeho podmínky. Před platbou vás upozorníme, zda jde o zájezd, spojené cestovní služby, nebo samostatnou službu.",
        },
      ],
    },
    {
      id: "documents",
      heading: { uk: "Документи для подорожі", cs: "Cestovní doklady" },
      paragraphs: [
        {
          uk: "Клієнт відповідає за дійсний закордонний паспорт, візи та виконання умов в'їзду. Ми надаємо загальну інформацію з урахуванням українського громадянства та статусу перебування в Чехії (зокрема тимчасового захисту), але остаточні вимоги встановлюють органи країни призначення.",
          cs: "Zákazník odpovídá za platný cestovní doklad, víza a splnění podmínek vstupu. Poskytneme obecné informace s ohledem na ukrajinské občanství a pobytový status v Česku (včetně dočasné ochrany), konečné požadavky však stanovují orgány cílové země.",
        },
      ],
    },
    {
      id: "complaints",
      heading: { uk: "Скарги на тур", cs: "Reklamace" },
      paragraphs: [
        {
          uk: "Недоліки туру слід повідомити туроператору (або його представнику на місці) без зайвої затримки. Агенція допоможе зі складанням і передачею скарги туроператору.",
          cs: "Vady zájezdu je třeba vytknout cestovní kanceláři (nebo jejímu delegátovi na místě) bez zbytečného odkladu. Agentura vám pomůže reklamaci sepsat a předat ji CK.",
        },
        {
          uk: `Скарги щодо послуг самої агенції надсилайте на ${ct.email} або в Telegram @${ct.telegramUsername}.`,
          cs: `Stížnosti na služby samotné agentury zasílejte na ${ct.email} nebo přes Telegram @${ct.telegramUsername}.`,
        },
      ],
    },
    {
      id: "adr",
      heading: { uk: "Позасудове вирішення спорів", cs: "Mimosoudní řešení sporů" },
      paragraphs: [
        {
          uk: "Для позасудового вирішення споживчих спорів компетентна Česká obchodní inspekce (www.coi.cz, adr.coi.cz). Також можна скористатися платформою ЄС для онлайн-вирішення спорів.",
          cs: "K mimosoudnímu řešení spotřebitelských sporů je příslušná Česká obchodní inspekce (www.coi.cz, adr.coi.cz). Využít lze také platformu EU pro řešení sporů online.",
        },
      ],
    },
    {
      id: "final",
      heading: { uk: "Заключні положення", cs: "Závěrečná ustanovení" },
      paragraphs: [
        {
          uk: "Відносини регулюються правом Чеської Республіки. Обробку персональних даних описано в Політиці конфіденційності. Обов'язковою є чеська версія умов; український переклад має інформаційний характер.",
          cs: "Vztahy se řídí právním řádem České republiky. Zpracování osobních údajů popisují Zásady ochrany osobních údajů. Rozhodující je české znění podmínek; ukrajinský překlad má informativní charakter.",
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
    alternates: { languages: { uk: routes.terms("uk"), cs: routes.terms("cs") } },
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
