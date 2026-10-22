import type { Metadata } from "next";
import { ananasPhotos } from "@/content/ananas-photos";
import { notFound } from "next/navigation";
import { PineappleSlice, Stamp } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { PageHero } from "@/components/pages/page-hero";
import { ServiceOrder, type ServiceIcon, type ServiceItem } from "@/components/pages/service-order";
import { ButtonLink, Container, Section } from "@/components/ui";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";

type L = Record<Locale, string>;

const copy = {
  metaTitle: { uk: "Наші послуги — страхування, авіаквитки, готелі, візи", cs: "Naše služby — pojištění, letenky, hotely, víza" },
  metaDescription: {
    uk: "Медичне страхування, авіаквитки з Праги, бронювання готелів, трансфер, візова підтримка та екскурсії. Замовте послугу в Telegram.",
    cs: "Cestovní pojištění, letenky z Prahy, hotely, transfery, vízová podpora a výlety. Objednejte službu přes Telegram.",
  },
  eyebrow: { uk: "Послуги", cs: "Služby" },
  title: { uk: "Усе для подорожі — в одному чаті", cs: "Vše pro cestu — v jednom chatu" },
  lead: {
    uk: "Ваш комфорт — наш пріоритет. Окрім турів, допоможемо зі страховкою, квитками, готелями, трансфером, візами та екскурсіями — для вильотів із Праги, Брна, Острави чи Пардубиць.",
    cs: "Váš komfort je naše priorita. Kromě zájezdů vám pomůžeme s pojištěním, letenkami, hotely, transferem, vízy i výlety — pro odlety z Prahy, Brna, Ostravy či Pardubic.",
  },
  heroCta: { uk: "Запитати в Telegram", cs: "Zeptat se na Telegramu" },
  heroTours: { uk: "Шукати тур", cs: "Hledat zájezd" },
  telegramLabel: { uk: "Telegram", cs: "Telegram" },
  formTitle: { uk: "Замовити послугу", cs: "Objednat službu" },
  formLead: {
    uk: "Залиште контакт — Альона отримає заявку миттєво й напише вам. Або одразу відкрийте чат у Telegram.",
    cs: "Nechte nám kontakt — Aljona dostane poptávku okamžitě a ozve se vám. Nebo rovnou otevřete chat na Telegramu.",
  },
  choose: { uk: "Оберіть послугу", cs: "Vyberte službu" },
  prefill: { uk: "Добрий день, Альоно! Мене цікавить послуга: ", cs: "Dobrý den, Aljono! Mám zájem o službu: " },
  approachTitle: { uk: "Індивідуальний підхід і турбота", cs: "Individuální přístup a péče" },
  approach: {
    uk: "Кожен мандрівник унікальний. Тому ми пропонуємо як готові пакетні тури від перевірених чеських туроператорів, так і складні індивідуальні маршрути. Персональний трансфер, оренда яхти чи авторська екскурсійна програма — довірте організаційні клопоти нам і просто насолоджуйтеся відпочинком.",
    cs: "Každý cestovatel je jiný. Proto nabízíme jak hotové zájezdy od prověřených českých cestovních kanceláří, tak i individuální trasy na míru. Soukromý transfer, pronájem jachty nebo vlastní program výletů — organizaci nechte na nás a vy si jen užívejte dovolenou.",
  },
} satisfies Record<string, L>;

const services: Array<{ id: ServiceIcon; title: L; text: L; points: Record<Locale, string[]>; order: L; photo: string }> = [
  {
    id: "insurance",
    title: { uk: "Медичне страхування", cs: "Cestovní pojištění" },
    text: {
      uk: "Повний захист здоров’я в будь-якій країні. Працюємо лише з перевіреними страховими компаніями та асистанс-службами.",
      cs: "Plná ochrana zdraví v jakékoli zemi. Spolupracujeme jen s ověřenými pojišťovnami a asistenčními službami.",
    },
    points: {
      uk: ["Поліс за 10 хвилин онлайн", "Страхування від невиїзду", "Для власників тимчасового захисту в ЧР"],
      cs: ["Pojistka online do 10 minut", "Pojištění storna zájezdu", "I pro držitele dočasné ochrany v ČR"],
    },
    order: { uk: "Оформити поліс", cs: "Sjednat pojištění" },
    photo: ananasPhotos.services.insurance,
  },
  {
    id: "flight",
    title: { uk: "Пошук авіаквитків", cs: "Letenky" },
    text: {
      uk: "Найкращі ціни та зручні пересадки. Знайдемо оптимальний рейс із Праги, Брна, Острави чи Пардубиць за лічені хвилини.",
      cs: "Nejlepší ceny a pohodlné přestupy. Optimální let z Prahy, Brna, Ostravy či Pardubic najdeme během pár minut.",
    },
    points: {
      uk: ["Регулярні рейси та лоукости", "Багаж і місця — без сюрпризів", "Квитки для всієї родини"],
      cs: ["Pravidelné i nízkonákladové lety", "Zavazadla a místa bez překvapení", "Letenky pro celou rodinu"],
    },
    order: { uk: "Знайти рейс", cs: "Najít let" },
    photo: ananasPhotos.services.flights,
  },
  {
    id: "hotel",
    title: { uk: "Бронювання готелів", cs: "Rezervace hotelů" },
    text: {
      uk: "Понад 500 000 варіантів проживання — від затишних апартаментів до розкішних вілл. Більшість готелів Альона бачила на власні очі.",
      cs: "Přes 500 000 možností ubytování — od útulných apartmánů po luxusní vily. Většinu hotelů Aljona viděla na vlastní oči.",
    },
    points: {
      uk: ["Готелі, перевірені особисто", "Сімейні номери та дитячі клуби", "Чесні відгуки, а не каталог"],
      cs: ["Osobně prověřené hotely", "Rodinné pokoje a dětské kluby", "Upřímné reference, ne katalog"],
    },
    order: { uk: "Обрати готель", cs: "Vybrat hotel" },
    photo: ananasPhotos.services.hotels,
  },
  {
    id: "transfer",
    title: { uk: "Індивідуальний трансфер", cs: "Soukromý transfer" },
    text: {
      uk: "Ваша приватність понад усе. Зустріч із табличкою в аеропорту та комфортна поїздка до самого готелю.",
      cs: "Vaše soukromí na prvním místě. Přivítání s cedulkou na letišti a pohodlná cesta až k hotelu.",
    },
    points: {
      uk: ["Зустріч із табличкою", "Дитячі крісла на запит", "Трансфер до аеропорту в Чехії"],
      cs: ["Přivítání s cedulkou", "Dětské autosedačky na přání", "Odvoz na letiště v Česku"],
    },
    order: { uk: "Замовити авто", cs: "Objednat auto" },
    photo: ananasPhotos.services.transfer,
  },
  {
    id: "visa",
    title: { uk: "Візова підтримка", cs: "Vízová podpora" },
    text: {
      uk: "Консультація та допомога зі збором документів для віз будь-якої складності — з урахуванням вашого статусу перебування в Чехії.",
      cs: "Konzultace a pomoc s dokumenty k vízům jakékoli složitosti — s ohledem na váš pobytový status v Česku.",
    },
    points: {
      uk: ["Що потрібно з українським паспортом", "Перелік документів під вашу країну", "Віза по прильоту чи заздалегідь"],
      cs: ["Co platí pro ukrajinský pas", "Seznam dokumentů pro vaši destinaci", "Vízum po příletu, nebo předem"],
    },
    order: { uk: "Консультація", cs: "Konzultace" },
    photo: ananasPhotos.services.visa,
  },
  {
    id: "excursion",
    title: { uk: "Екскурсії та розваги", cs: "Výlety a zábava" },
    text: {
      uk: "Авторські маршрути та унікальні локації. Зробимо ваше дозвілля на відпочинку по-справжньому яскравим.",
      cs: "Autorské trasy a jedinečná místa. Postaráme se, aby vaše dovolená byla opravdu pestrá.",
    },
    points: {
      uk: ["Україномовні гіди, де це можливо", "Яхти, сафарі, дайвінг", "Програми для дітей"],
      cs: ["Ukrajinsky mluvící průvodci, kde to jde", "Jachty, safari, potápění", "Programy pro děti"],
    },
    order: { uk: "Обрати екскурсію", cs: "Vybrat výlet" },
    photo: ananasPhotos.services.excursions,
  },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(copy.metaTitle, locale),
    description: t(copy.metaDescription, locale),
    alternates: { canonical: routes.services(locale), languages: languageAlternates(routes.services) },
  };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const items: ServiceItem[] = services.map((s) => ({
    id: s.id,
    title: t(s.title, locale),
    text: t(s.text, locale),
    points: t(s.points, locale),
    orderLabel: t(s.order, locale),
    telegramMessage: `${t(copy.prefill, locale)}${t(s.title, locale)}.`,
    photo: s.photo,
  }));

  return (
    <>
      <PageHero
        eyebrow={t(copy.eyebrow, locale)}
        title={t(copy.title, locale)}
        lead={t(copy.lead, locale)}
        aside={<Stamp size={200} top="ANANAS TOUR • SERVICE" bottom="CARE • SINCE 2011" above={["ALL", "IN ONE"]} word="CHAT" below={["UA", "CZ"]} className="rotate-6" />}
      >
        <TelegramButton locale={locale} source="services-hero" label={t(copy.heroCta, locale)} size="lg" />
        <ButtonLink href={routes.tours(locale)} variant="outline">
          {t(copy.heroTours, locale)}
        </ButtonLink>
      </PageHero>

      <Section>
        <ServiceOrder
          locale={locale}
          services={items}
          formTitle={t(copy.formTitle, locale)}
          formLead={t(copy.formLead, locale)}
          chooseLabel={t(copy.choose, locale)}
          telegramLabel={t(copy.telegramLabel, locale)}
        />
      </Section>

      <Container className="pb-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-yellow p-7 text-ink sm:rounded-[2.5rem] sm:p-12">
          <PineappleSlice kind="half" size={260} rotate={200} seed={31} color="var(--c-yellow-light)" fibre="var(--c-yellow)" className="absolute -bottom-24 -right-16" />
          <h2 className="relative max-w-3xl font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">{t(copy.approachTitle, locale)}</h2>
          <p className="relative mt-5 max-w-3xl text-lg text-ink/85">{t(copy.approach, locale)}</p>
        </div>
      </Container>
    </>
  );
}
