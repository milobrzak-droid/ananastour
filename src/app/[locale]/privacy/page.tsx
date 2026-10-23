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


const EFFECTIVE = { uk: "Діє з 22.10.2026", cs: "Účinné od 22. 10. 2026" };

const meta = {
  title: { uk: "Захист даних", cs: "Ochrana osobních údajů" },
  description: {
    uk: "Які персональні дані обробляє Ananas Tour, навіщо й на якій підставі, кому їх передає, як довго зберігає і як скористатися своїми правами за GDPR.",
    cs: "Jaké osobní údaje Ananas Tour zpracovává, proč a na jakém základě, komu je předává, jak dlouho je uchovává a jak můžete uplatnit svá práva podle GDPR.",
  },
  toc: { uk: "Зміст", cs: "Obsah" },
};

function sections(): Src[] {
  const c = site.company;
  const ct = site.contact;
  // The phone number never splits across lines ("+420 / 723 615 028").
  const phoneNoBreak = ct.phone.replace(/ /g, "\u00A0");
  return [
    {
      id: "controller",
      heading: { uk: "Хто відповідає за ваші дані", cs: "Kdo za vaše údaje odpovídá" },
      paragraphs: [
        {
          uk: `Контролером (správce) ваших персональних даних є ${c.legalName}, IČO: ${c.ico}, з місцезнаходженням ${c.registeredOffice} (далі — «Ananas Tour» або «ми»).`,
          cs: `Správcem vašich osobních údajů je ${c.legalName}, IČO: ${c.ico}, se sídlem ${c.registeredOffice} (dále jen „Ananas Tour“ nebo „my“).`,
        },
        {
          uk: `З будь-яких питань щодо ваших даних звертайтеся до нас: e-mail ${ct.email}, телефон ${phoneNoBreak}, Telegram @${ct.telegramUsername}.`,
          cs: `S jakýmikoli dotazy k vašim osobním údajům se na nás obraťte e-\u2060mailem na ${ct.email}, telefonicky na ${phoneNoBreak} nebo přes Telegram @${ct.telegramUsername}.`,
        },
      ],
    },
    {
      id: "data",
      heading: { uk: "Які дані ми обробляємо", cs: "Jaké údaje zpracováváme" },
      list: [
        {
          uk: "Контактні дані: ім’я, номер телефону, адреса електронної пошти, ім’я користувача в Telegram.",
          cs: "Kontaktní údaje: jméno, telefonní číslo, e-mailová adresa a uživatelské jméno na Telegramu.",
        },
        {
          uk: "Зміст запиту: куди, коли й на скільки ночей ви хочете поїхати, скільки мандрівників і якого вони віку, а також ваше повідомлення.",
          cs: "Obsah poptávky: kam a kdy chcete cestovat, na kolik nocí, počet a věk cestujících a text vaší zprávy.",
        },
        {
          uk: "Ваше спілкування з нами в Telegram, електронною поштою чи телефоном.",
          cs: "Komunikace, kterou s námi vedete přes Telegram, e-\u2060mailem nebo telefonicky.",
        },
        {
          uk: "Дані для бронювання (лише якщо ви бронюєте тур чи послугу): ім’я та прізвище кожного мандрівника, дата народження, громадянство, дані закордонного паспорта чи іншого проїзного документа, адреса, платіжні дані.",
          cs: "Údaje pro rezervaci (pouze pokud si rezervujete zájezd nebo službu): jména a příjmení všech cestujících, data narození, státní občanství, údaje z cestovního dokladu, adresa a platební údaje.",
        },
        {
          uk: "Технічні дані: IP-адреса, тип браузера, файли cookie і статистика відвідувань (з вашої згоди, якщо її вимагає закон).",
          cs: "Technické údaje: IP adresa, typ prohlížeče, soubory cookies a statistiky návštěvnosti (s vaším souhlasem, pokud ho zákon vyžaduje).",
        },
      ],
    },
    {
      id: "purposes",
      heading: { uk: "Навіщо ми обробляємо дані й на якій підставі", cs: "Proč údaje zpracováváme a na jakém základě" },
      list: [
        {
          uk: "Щоб відповісти на ваш запит із сайту й підготувати пропозиції — заходи до укладення договору, вжиті на ваше прохання (ст. 6(1)\u2060(b) GDPR).",
          cs: "Abychom mohli vyřídit vaši poptávku z webu a připravit vám nabídky – provedení opatření před uzavřením smlouvy na vaši žádost (čl. 6 odst. 1 písm. b) GDPR).",
        },
        {
          uk: "Щоб спілкуватися з вами в Telegram: коли ви пишете нам або надсилаєте форму, бот автоматично пересилає запит Альоні в Telegram — так ми можемо відповісти якнайшвидше (ст. 6(1)\u2060(b) і (f) GDPR).",
          cs: "Abychom s vámi mohli komunikovat přes Telegram: když nám napíšete nebo odešlete formulář, bot vaši poptávku automaticky přepošle Aljoně na Telegram, takže můžeme odpovědět co nejdříve (čl. 6 odst. 1 písm. b) a f) GDPR).",
        },
        {
          uk: "Щоб посередничати в продажу туру чи послуги й передати ваші дані туроператору (CK), авіакомпанії чи страховикові — виконання договору (ст. 6(1)\u2060(b) GDPR).",
          cs: "Abychom vám mohli zprostředkovat zájezd nebo službu a předat vaše údaje cestovní kanceláři, letecké společnosti nebo pojišťovně – plnění smlouvy (čl. 6 odst. 1 písm. b) GDPR).",
        },
        {
          uk: "Щоб виконувати обов’язки, які покладає на нас закон, зокрема бухгалтерські й податкові (ст. 6(1)\u2060(c) GDPR).",
          cs: "Abychom plnili své zákonné povinnosti, zejména účetní a daňové (čl. 6 odst. 1 písm. c) GDPR).",
        },
        {
          uk: "Щоб захистити свої правові вимоги й подбати про безпеку сайту — законний інтерес (ст. 6(1)\u2060(f) GDPR).",
          cs: "Abychom mohli hájit své právní nároky a zajistit bezpečnost webu – oprávněný zájem (čl. 6 odst. 1 písm. f) GDPR).",
        },
        {
          uk: "Щоб аналізувати відвідуваність і надсилати маркетингові повідомлення — лише з вашої згоди, яку можна будь-коли відкликати (ст. 6(1)\u2060(a) GDPR).",
          cs: "Abychom mohli analyzovat návštěvnost webu a zasílat vám obchodní sdělení – pouze s vaším souhlasem (čl. 6 odst. 1 písm. a) GDPR), který můžete kdykoli odvolat.",
        },
      ],
    },
    {
      id: "recipients",
      heading: { uk: "Кому ми передаємо дані", cs: "Komu údaje předáváme" },
      paragraphs: [
        {
          uk: "Ваші дані ми не продаємо. Передаємо їх лише в обсязі, необхідному для конкретної мети:",
          cs: "Vaše údaje neprodáváme. Předáváme je jen v rozsahu nezbytném pro konkrétní účel:",
        },
      ],
      list: [
        {
          uk: "туроператорам (CK), чиї тури ви бронюєте, а також авіакомпаніям, готелям, перевізникам і страховикам;",
          cs: "cestovním kancelářím, jejichž zájezdy si rezervujete, a dále leteckým společnostem, hotelům, dopravcům a pojišťovnám;",
        },
        {
          uk: "Telegram (Telegram Messenger Inc.) — платформі, через яку ми листуємося з вами й пересилаємо запити;",
          cs: "provozovateli platformy Telegram (Telegram Messenger Inc.), přes kterou s vámi komunikujeme a přeposíláme poptávky;",
        },
        {
          uk: "постачальникам хостингу, IT- та аналітичних сервісів і бухгалтерських послуг — як обробникам за договором;",
          cs: "poskytovatelům hostingu, IT, analytických a účetních služeb, kteří pro nás údaje zpracovávají na základě smlouvy;",
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
          uk: "Telegram і деякі постачальники послуг можуть обробляти дані за межами Європейського економічного простору. Коли ви пишете нам у Telegram, ви користуєтеся цим сервісом на його власних умовах. Якщо вам зручніший інший канал зв’язку, телефонуйте або пишіть на електронну пошту. Для інших передач даних ми застосовуємо гарантії відповідно до глави V GDPR (наприклад, стандартні договірні положення).",
          cs: "Telegram a někteří poskytovatelé služeb mohou údaje zpracovávat mimo Evropský hospodářský prostor. Když nám píšete přes Telegram, používáte tuto službu podle jejích vlastních podmínek. Pokud vám víc vyhovuje jiný způsob komunikace, zavolejte nám nebo napište e-mail. U ostatních předávání údajů využíváme záruky podle kapitoly V GDPR (např. standardní smluvní doložky).",
        },
      ],
    },
    {
      id: "retention",
      heading: { uk: "Як довго ми зберігаємо дані", cs: "Jak dlouho údaje uchováváme" },
      list: [
        {
          uk: "Запити, які не завершилися бронюванням, — не довше ніж 12 місяців після останнього контакту.",
          cs: "Poptávky, ze kterých nevznikla rezervace – nejdéle 12 měsíců od posledního kontaktu.",
        },
        {
          uk: "Дані, пов’язані з укладеним договором, — протягом строків позовної давності та строків, установлених бухгалтерським і податковим законодавством.",
          cs: "Údaje související s uzavřenou smlouvou – po dobu promlčecích lhůt a lhůt stanovených účetními a daňovými předpisy.",
        },
        {
          uk: "Дані, які ми обробляємо на підставі згоди, — доки ви її не відкличете.",
          cs: "Údaje zpracovávané na základě souhlasu – do jeho odvolání.",
        },
      ],
    },
    {
      id: "rights",
      heading: { uk: "Ваші права", cs: "Vaše práva" },
      paragraphs: [{ uk: "Ви маєте право:", cs: "Máte právo:" }],
      list: [
        { uk: "на доступ до своїх даних і на отримання їхньої копії;", cs: "na přístup ke svým údajům a na jejich kopii;" },
        { uk: "на виправлення неточних даних;", cs: "na opravu nepřesných údajů;" },
        { uk: "на видалення («право бути забутим»);", cs: "na výmaz („právo být zapomenut“);" },
        { uk: "на обмеження обробки;", cs: "na omezení zpracování;" },
        { uk: "на перенесення даних;", cs: "na přenositelnost údajů;" },
        { uk: "заперечувати проти обробки, що ґрунтується на законному інтересі;", cs: "vznést námitku proti zpracování na základě oprávněného zájmu;" },
        { uk: "будь-коли відкликати згоду;", cs: "kdykoli odvolat udělený souhlas;" },
        {
          uk: "подати скаргу до чеського наглядового органу — Úřad pro ochranu osobních údajů (Pplk. Sochora 27, 170 00 Praha 7, www.uoou.gov.cz).",
          cs: "podat stížnost u dozorového úřadu, kterým je Úřad pro ochranu osobních údajů (Pplk. Sochora 27, 170 00 Praha 7, www.uoou.gov.cz).",
        },
      ],
      after: [
        {
          uk: `Щоб скористатися будь-яким із цих прав, напишіть нам на ${ct.email}. Відповімо без зайвої затримки, найпізніше протягом місяця.`,
          cs: `Kterékoli z těchto práv můžete uplatnit e-\u2060mailem na ${ct.email}. Odpovíme bez zbytečného odkladu, nejpozději do jednoho měsíce.`,
        },
      ],
    },
    {
      id: "cookies",
      heading: { uk: "Файли cookie", cs: "Cookies" },
      paragraphs: [
        {
          uk: "Сайт використовує технічно необхідні файли cookie, без яких він не працював би. Аналітичні й маркетингові файли cookie ми використовуємо лише з вашої згоди, яку можна змінити в налаштуваннях браузера.",
          cs: "Web používá technicky nezbytné soubory cookies, bez kterých by nefungoval. Analytické a marketingové cookies používáme pouze s vaším souhlasem; svou volbu můžete změnit v nastavení prohlížeče.",
        },
      ],
    },
    {
      id: "changes",
      heading: { uk: "Зміни цього документа", cs: "Změny těchto zásad" },
      paragraphs: [
        {
          uk: "Ми можемо оновлювати цей документ. Чинну редакцію ви завжди знайдете на цій сторінці. Переважну силу має чеська версія.",
          cs: "Tyto zásady můžeme aktualizovat. Aktuální znění najdete vždy na této stránce. Rozhodující je české znění.",
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
