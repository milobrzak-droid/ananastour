import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalDocument, localize, type LegalSource as Src } from "@/components/pages/legal";
import { site } from "@/config/site";
import { isLocale, t } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";

/*
 * Privacy policy (GDPR, Regulation (EU) 2016/679 + zákon č. 110/2019 Sb.).
 * TODO(client): whole document must be reviewed by a Czech lawyer before launch.
 * TODO(client): fill legal entity data in src/config/site.ts (company.*).
 * TODO(client): confirm the actual list of processors (hosting, analytics, accountant, CRM).
 * TODO(client): confirm whether a DPO (pověřenec) is required — normally not for a small agency.
 * TODO(client): confirm the effective date below.
 */


const EFFECTIVE = { uk: "Редакція від 22.10.2026", cs: "Účinné od 22. 10. 2026" };

const meta = {
  title: { uk: "Політика конфіденційності", cs: "Zásady ochrany osobních údajů" },
  description: {
    uk: "Як Ananas Tour обробляє персональні дані згідно з GDPR: запити, Telegram, бронювання турів.",
    cs: "Jak Ananas Tour zpracovává osobní údaje podle GDPR: poptávky, Telegram, rezervace zájezdů.",
  },
  toc: { uk: "Зміст", cs: "Obsah" },
};

function sections(): Src[] {
  const c = site.company;
  const ct = site.contact;
  return [
    {
      id: "controller",
      heading: { uk: "Адміністратор персональних даних", cs: "Správce osobních údajů" },
      paragraphs: [
        {
          uk: `Адміністратором (správce) ваших персональних даних є ${c.legalName}, IČO: ${c.ico}, з місцезнаходженням ${c.registeredOffice} (далі — «Ananas Tour», «ми»).`,
          cs: `Správcem vašich osobních údajů je ${c.legalName}, IČO: ${c.ico}, se sídlem ${c.registeredOffice} (dále jen „Ananas Tour“ nebo „my“).`,
        },
        {
          uk: `З питань захисту персональних даних пишіть на ${ct.email}, телефонуйте ${ct.phone} або в Telegram @${ct.telegramUsername}.`,
          cs: `Ve věcech ochrany osobních údajů nás kontaktujte na ${ct.email}, telefonu ${ct.phone} nebo přes Telegram @${ct.telegramUsername}.`,
        },
      ],
    },
    {
      id: "data",
      heading: { uk: "Які дані ми обробляємо", cs: "Jaké údaje zpracováváme" },
      list: [
        {
          uk: "Контактні дані: ім’я, телефон, e-mail, ім’я користувача в Telegram.",
          cs: "Kontaktní údaje: jméno, telefon, e-mail, uživatelské jméno na Telegramu.",
        },
        {
          uk: "Зміст запиту: напрямок, дати, тривалість, кількість і вік мандрівників, ваше повідомлення.",
          cs: "Obsah poptávky: destinace, termín, délka pobytu, počet a věk cestujících, vaše zpráva.",
        },
        {
          uk: "Листування в Telegram, e-mail чи по телефону, яке ви з нами ведете.",
          cs: "Komunikace, kterou s námi vedete přes Telegram, e-mail nebo telefon.",
        },
        {
          uk: "Дані для бронювання (лише якщо ви замовляєте тур чи послугу): ім’я та прізвище всіх мандрівників, дата народження, громадянство, дані паспорта, адреса, платіжна інформація.",
          cs: "Údaje pro rezervaci (jen pokud si objednáte zájezd či službu): jména a příjmení všech cestujících, datum narození, státní občanství, údaje z cestovního dokladu, adresa, platební údaje.",
        },
        {
          uk: "Технічні дані: IP-адреса, тип браузера, cookies та статистика відвідувань (лише за вашою згодою, якщо цього вимагає закон).",
          cs: "Technické údaje: IP adresa, typ prohlížeče, cookies a statistiky návštěvnosti (s vaším souhlasem, vyžaduje-li to zákon).",
        },
      ],
    },
    {
      id: "purposes",
      heading: { uk: "Мета та правові підстави обробки", cs: "Účely a právní základy zpracování" },
      list: [
        {
          uk: "Відповідь на запит із форми на сайті та підбір пропозицій — заходи до укладення договору на ваше прохання (ст. 6(1)(b) GDPR).",
          cs: "Vyřízení poptávky z formuláře na webu a příprava nabídek — opatření před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).",
        },
        {
          uk: "Спілкування в Telegram: коли ви пишете нам або надсилаєте форму, заявка автоматично пересилається Альоні в Telegram через бота, щоб ми відповіли якнайшвидше (ст. 6(1)(b) та (f) GDPR).",
          cs: "Komunikace přes Telegram: když nám napíšete nebo odešlete formulář, poptávka se automaticky přepošle Aljoně na Telegram prostřednictvím bota, abychom mohli odpovědět co nejrychleji (čl. 6 odst. 1 písm. b) a f) GDPR).",
        },
        {
          uk: "Посередництво в продажу туру чи послуги та передача даних туроператору (CK), авіакомпанії, страховику — виконання договору (ст. 6(1)(b) GDPR).",
          cs: "Zprostředkování zájezdu či služby a předání údajů cestovní kanceláři, letecké společnosti nebo pojišťovně — plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR).",
        },
        {
          uk: "Виконання юридичних обов’язків, зокрема бухгалтерських і податкових (ст. 6(1)(c) GDPR).",
          cs: "Plnění právních povinností, zejména účetních a daňových (čl. 6 odst. 1 písm. c) GDPR).",
        },
        {
          uk: "Захист наших прав і безпека сайту — законний інтерес (ст. 6(1)(f) GDPR).",
          cs: "Ochrana našich právních nároků a bezpečnost webu — oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR).",
        },
        {
          uk: "Аналітика відвідуваності та маркетингові повідомлення — лише за вашою згодою (ст. 6(1)(a) GDPR), яку можна будь-коли відкликати.",
          cs: "Analýza návštěvnosti a marketingová sdělení — pouze s vaším souhlasem (čl. 6 odst. 1 písm. a) GDPR), který můžete kdykoli odvolat.",
        },
      ],
    },
    {
      id: "recipients",
      heading: { uk: "Кому ми передаємо дані", cs: "Komu údaje předáváme" },
      paragraphs: [
        {
          uk: "Ми не продаємо ваші дані. Передаємо їх лише в обсязі, необхідному для конкретної мети:",
          cs: "Vaše údaje neprodáváme. Předáváme je jen v rozsahu nutném pro daný účel:",
        },
      ],
      list: [
        {
          uk: "туроператорам (cestovní kanceláře), чиї тури ви замовляєте, а також авіакомпаніям, готелям, трансферним компаніям і страховикам;",
          cs: "cestovním kancelářím, jejichž zájezdy si objednáváte, a dále leteckým společnostem, hotelům, dopravcům a pojišťovnám;",
        },
        {
          uk: "Telegram (Telegram Messenger Inc.) — як платформі для листування та пересилання заявок;",
          cs: "společnosti Telegram (Telegram Messenger Inc.) jako platformě pro komunikaci a přeposílání poptávek;",
        },
        {
          uk: "постачальникам хостингу, IT- та аналітичних сервісів, бухгалтеру — як обробникам за договором;",
          cs: "poskytovatelům hostingu, IT a analytických služeb a účetní — jako zpracovatelům na základě smlouvy;",
        },
        {
          uk: "державним органам, якщо цього вимагає закон.",
          cs: "orgánům veřejné moci, pokud to vyžaduje zákon.",
        },
      ],
    },
    {
      id: "transfers",
      heading: { uk: "Передача даних за межі ЄС", cs: "Předávání údajů mimo EU" },
      paragraphs: [
        {
          uk: "Telegram та деякі постачальники послуг можуть обробляти дані за межами Європейського економічного простору. Пишучи нам у Telegram, ви користуєтеся цим сервісом на його власних умовах. Якщо віддаєте перевагу іншому каналу, зв’яжіться з нами телефоном чи e-mail. Для інших передач ми використовуємо гарантії відповідно до глави V GDPR (наприклад, стандартні договірні положення).",
          cs: "Telegram a někteří poskytovatelé služeb mohou údaje zpracovávat mimo Evropský hospodářský prostor. Komunikací přes Telegram využíváte tuto službu za jejích vlastních podmínek. Pokud dáváte přednost jinému kanálu, kontaktujte nás telefonicky nebo e-mailem. U ostatních předání využíváme záruky podle kapitoly V GDPR (např. standardní smluvní doložky).",
        },
      ],
    },
    {
      id: "retention",
      heading: { uk: "Як довго ми зберігаємо дані", cs: "Jak dlouho údaje uchováváme" },
      list: [
        {
          uk: "Запити, які не завершилися замовленням, — до 12 місяців від останнього контакту.",
          cs: "Poptávky, které nevedly k objednávce — nejdéle 12 měsíců od posledního kontaktu.",
        },
        {
          uk: "Дані, пов’язані з укладеним договором, — протягом строку позовної давності та строків, установлених бухгалтерськими й податковими нормами.",
          cs: "Údaje související s uzavřenou smlouvou — po dobu promlčecích lhůt a lhůt stanovených účetními a daňovými předpisy.",
        },
        {
          uk: "Дані, оброблювані на підставі згоди, — до її відкликання.",
          cs: "Údaje zpracovávané na základě souhlasu — do jeho odvolání.",
        },
      ],
    },
    {
      id: "rights",
      heading: { uk: "Ваші права", cs: "Vaše práva" },
      paragraphs: [{ uk: "Ви маєте право:", cs: "Máte právo:" }],
      list: [
        { uk: "на доступ до своїх даних і їх копію;", cs: "na přístup ke svým údajům a jejich kopii;" },
        { uk: "на виправлення неточних даних;", cs: "na opravu nepřesných údajů;" },
        { uk: "на видалення («право бути забутим»);", cs: "na výmaz („právo být zapomenut“);" },
        { uk: "на обмеження обробки;", cs: "na omezení zpracování;" },
        { uk: "на перенесення даних;", cs: "na přenositelnost údajů;" },
        { uk: "заперечити проти обробки на підставі законного інтересу;", cs: "vznést námitku proti zpracování na základě oprávněného zájmu;" },
        { uk: "будь-коли відкликати згоду;", cs: "kdykoli odvolat souhlas;" },
        {
          uk: "подати скаргу до Úřad pro ochranu osobních údajů (Pplk. Sochora 27, 170 00 Praha 7, www.uoou.gov.cz).",
          cs: "podat stížnost u Úřadu pro ochranu osobních údajů (Pplk. Sochora 27, 170 00 Praha 7, www.uoou.gov.cz).",
        },
      ],
      after: [
        {
          uk: `Щоб скористатися правами, напишіть нам на ${ct.email}. Відповімо без зайвої затримки, не пізніше ніж за місяць.`,
          cs: `Svá práva můžete uplatnit e-mailem na ${ct.email}. Odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce.`,
        },
      ],
    },
    {
      id: "cookies",
      heading: { uk: "Cookies", cs: "Cookies" },
      paragraphs: [
        {
          uk: "Сайт використовує технічно необхідні cookies для свого функціонування. Аналітичні та маркетингові cookies використовуємо лише за вашою згодою, яку можна змінити в налаштуваннях браузера.",
          cs: "Web používá technicky nezbytné cookies nutné pro svůj provoz. Analytické a marketingové cookies používáme jen s vaším souhlasem, který můžete změnit v nastavení prohlížeče.",
        },
      ],
    },
    {
      id: "changes",
      heading: { uk: "Зміни цієї політики", cs: "Změny těchto zásad" },
      paragraphs: [
        {
          uk: "Ми можемо оновлювати цю політику. Актуальна редакція завжди доступна на цій сторінці. Обов’язковою є чеська версія документа.",
          cs: "Tyto zásady můžeme aktualizovat. Aktuální znění je vždy k dispozici na této stránce. Rozhodující je české znění dokumentu.",
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
    alternates: { canonical: routes.privacy(locale), languages: languageAlternates(routes.privacy) },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <LegalDocument
      title={t(meta.title, locale)}
      updated={t(EFFECTIVE, locale)}
      tocLabel={t(meta.toc, locale)}
      sections={localize(sections(), locale)}
    />
  );
}
