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
  metaTitle: { uk: "Послуги: страховка, авіаквитки, готелі, візи", cs: "Služby: pojištění, letenky, hotely a víza" },
  metaDescription: {
    uk: "Страховка, авіаквитки, готелі, трансфер, візи й екскурсії — в одному чаті. Напишіть Альоні в Telegram: вона все підбере й пояснить українською чи чеською.",
    cs: "Pojištění, letenky, hotely, transfer, víza i výlety v jednom chatu. Aljona vybere, prověří a vysvětlí lidsky – česky i ukrajinsky. Napište jí na Telegram.",
  },
  eyebrow: { uk: "Усе в одному чаті", cs: "Vše v jednom chatu" },
  // Brand manifest (COPY-GUIDE §0.2): the sweet part is yours, the prickly part is mine.
  title: { uk: "Солодке — вам. Колюче — нам.", cs: "Sladké vám. Pichlavé nám." },
  lead: {
    uk: "Море — солодка частина. Квитки, готель, трансфер, страховка, віза й екскурсії — колюча. Її я беру на себе, а від вас — лише одне повідомлення.",
    cs: "Moře je ta sladká část. Ta pichlavá? Letenky, hotel, transfer, pojištění, víza a výlety. Tu beru na sebe – od vás stačí jedna zpráva.",
  },
  heroCta: { uk: "Написати Альоні", cs: "Napsat Aljoně" },
  heroTours: { uk: "Знайти тур", cs: "Najít zájezd" },
  telegramLabel: { uk: "Telegram", cs: "Telegram" },
  formTitle: { uk: "Немає Telegram? Не біда.", cs: "Nemáte Telegram? Nevadí." },
  formLead: {
    uk: "Оберіть послугу й залиште номер — відповім особисто: з 9:00 до 21:00 зазвичай за 15 хвилин. А якщо Telegram таки є, кнопка нижче відкриє чат із готовим повідомленням.",
    cs: "Vyberte službu a nechte mi číslo – ozvu se osobně, od 9 do 21 h obvykle do 15 minut. A kdyby se Telegram přece jen našel, tlačítko níže otevře chat s připravenou zprávou.",
  },
  choose: { uk: "Що вам потрібно?", cs: "Co potřebujete?" },
  // Sent as "{prefill}{service}." — the service name completes the last line.
  prefill: { uk: "Добрий день, Альоно!\nКуди: …\nКоли: …\nМене цікавить: ", cs: "Dobrý den, Aljono!\nKam: …\nKdy: …\nZajímá mě: " },
  approachTitle: { uk: "Хочете свій маршрут?", cs: "Chcete vlastní trasu?" },
  approach: {
    uk: "Два міста замість одного курорту, свої дати чи готель поза каталогом — зберу подорож, як пазл: переліт, готель, трансфер, страховка. Підбираю й перевіряю я, вирішуєте ви, а на сайті нічого не платите. Чогось немає в списку? Напишіть — розберемося.",
    cs: "Dvě města místo jednoho letoviska, vlastní termíny nebo hotel mimo katalog – složím vám cestu jako puzzle: let, hotel, transfer, pojištění. Vybírám a prověřuju já, rozhodujete vy – a na webu nic neplatíte. Něco v seznamu chybí? Napište mi, vymyslíme to.",
  },
} satisfies Record<string, L>;

// Hero stamp, read top to bottom: "Ananas Tour from Czechia · six services, one chat · in Ukrainian and Czech".
const stamp = {
  top: { uk: "ANANAS TOUR • З ЧЕХІЇ", cs: "ANANAS TOUR • Z ČESKA" },
  above: { uk: ["ШІСТЬ"], cs: ["ŠEST"] },
  word: { uk: "ПОСЛУГ", cs: "SLUŽEB" },
  below: { uk: ["ОДИН ЧАТ"], cs: ["JEDEN CHAT"] },
  bottom: { uk: "УКРАЇНСЬКОЮ • ЧЕСЬКОЮ", cs: "ČESKY • UKRAJINSKY" },
};

const services: Array<{ id: ServiceIcon; title: L; text: L; points: Record<Locale, string[]>; order: L; photo: string }> = [
  {
    id: "insurance",
    title: { uk: "Страхування", cs: "Pojištění" },
    text: {
      uk: "Поясню, що покриває поліс, — ще до того, як ви його купите. І які винятки ховаються в дрібному шрифті.",
      cs: "Vysvětlím, co pojistka kryje, ještě než ji koupíte – a jaké výluky se schovávají v drobném písmu.",
    },
    // TODO(client): insurance for holders of temporary protection — confirm before mentioning it here.
    points: {
      uk: ["Медичні витрати за кордоном", "Страхування від невиїзду", "Умови — українською"],
      cs: ["Léčebné výlohy v zahraničí", "Pojištění storna zájezdu", "Podmínky vysvětlené lidsky"],
    },
    order: { uk: "Підібрати страховку", cs: "Vybrat pojištění" },
    photo: ananasPhotos.services.insurance,
  },
  {
    id: "flight",
    title: { uk: "Авіаквитки", cs: "Letenky" },
    text: {
      uk: "Коли потрібен лише переліт. Підкажу, де багаж уже в ціні, а де дешевий квиток дорожчає аж біля стійки реєстрації.",
      cs: "Potřebujete jen let? Poradím, kde je zavazadlo v ceně a kde se levná letenka prodraží až u přepážky.",
    },
    points: {
      uk: ["Вильоти з аеропортів Чехії", "Ціна одразу з багажем", "Зручні пересадки"],
      cs: ["Odlety z letišť v Česku", "Cena rovnou se zavazadlem", "Rozumné přestupy"],
    },
    order: { uk: "Знайти рейс", cs: "Najít let" },
    photo: ananasPhotos.services.flights,
  },
  {
    id: "hotel",
    title: { uk: "Готелі", cs: "Hotely" },
    text: {
      uk: "Без туру, просто готель. Знаю, куди з дітьми, куди вдвох — і куди краще не їхати.",
      cs: "Jen hotel, bez zájezdu. Vím, kam s dětmi, kam ve dvou – a kam radši ne.",
    },
    points: {
      uk: ["3 готелі під ваші побажання", "Сімейні номери й дитячі клуби", "Чесно скажу й про мінуси"],
      cs: ["3 hotely podle vašich přání", "Rodinné pokoje a dětské kluby", "Na rovinu řeknu i mínusy"],
    },
    order: { uk: "Обрати готель", cs: "Vybrat hotel" },
    photo: ananasPhotos.services.hotels,
  },
  {
    id: "transfer",
    title: { uk: "Трансфер", cs: "Transfer" },
    text: {
      uk: "Зустріч в аеропорту з табличкою — і просто до готелю. Без таксі-\u2060лотереї о другій ночі.",
      cs: "Na letišti vás vyzvednou s cedulkou a odvezou rovnou do hotelu. Žádná loterie s taxíky ve dvě ráno.",
    },
    // TODO(client): transfers to Czech airports — confirm before offering them.
    points: {
      uk: ["Груповий або індивідуальний", "Туди й назад", "Ціна відома наперед"],
      cs: ["Skupinový i individuální", "Tam i zpět", "Cenu znáte předem"],
    },
    order: { uk: "Замовити трансфер", cs: "Objednat transfer" },
    photo: ananasPhotos.services.transfer,
  },
  {
    id: "visa",
    title: { uk: "Візи", cs: "Víza" },
    text: {
      uk: "Врахую ваш паспорт, документ про перебування в Чехії й країну поїздки — і скажу, що саме взяти з собою, щоб на кордоні обійшлося без сюрпризів.",
      cs: "Podívám se na váš pas, doklad o pobytu v Česku i cílovou zemi a řeknu vám, co přesně si vzít s sebou. Ať vás na hranicích nic nepřekvapí.",
    },
    points: {
      uk: ["Перевірю, чи потрібна віза", "Перелік документів", "Допомога із заявою"],
      cs: ["Ověřím, jestli potřebujete vízum", "Seznam dokladů na míru", "Pomoc se žádostí"],
    },
    order: { uk: "Запитати про візу", cs: "Poradit s vízem" },
    photo: ananasPhotos.services.visa,
  },
  {
    id: "excursion",
    title: { uk: "Екскурсії", cs: "Výlety" },
    text: {
      uk: "Підкажу, що справді варто побачити, а що можна спокійно пропустити, — навіть якщо гід на зустрічі в готелі вмовляє з усіх сил.",
      cs: "Poradím, co opravdu stojí za vidění a co můžete s klidem vynechat – i kdyby vás delegát na uvítací schůzce přemlouval sebevíc.",
    },
    // TODO(client): Ukrainian-speaking guides — confirm before mentioning them.
    points: {
      uk: ["Групові й приватні", "Бронювання наперед", "Чесна порада, що обрати"],
      cs: ["Skupinové i soukromé", "Rezervace předem", "Upřímná rada, co vybrat"],
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
        aside={<Stamp size={200} top={t(stamp.top, locale)} bottom={t(stamp.bottom, locale)} above={t(stamp.above, locale)} word={t(stamp.word, locale)} below={t(stamp.below, locale)} className="rotate-6" />}
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
          <h2 className="relative max-w-3xl font-display text-[clamp(1.8rem,4vw,3.2rem)] text-balance font-black uppercase leading-[1.08] tracking-[-0.03em]">{t(copy.approachTitle, locale)}</h2>
          <p className="relative mt-5 max-w-3xl text-lg text-ink/85">{t(copy.approach, locale)}</p>
        </div>
      </Container>
    </>
  );
}
