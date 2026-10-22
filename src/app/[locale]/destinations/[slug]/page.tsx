import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleBadge, PineapplePattern, PineappleSlice } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { FaqList, faqJsonLd } from "@/components/content/faq";
import { JsonLd } from "@/components/content/json-ld";
import { TelegramCta } from "@/components/content/telegram-cta";
import { offerTelegramMessage } from "@/components/tours/offer-card";
import { ArrowButton, ButtonLink, Container, Pill, Section } from "@/components/ui";
import { destinations, getDestination, type Destination } from "@/content/destinations";
import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { languageAlternates, routes } from "@/i18n/routes";
import { formatDate, formatMoney } from "@/lib/format";
import { tours, type Board } from "@/lib/tours";
import { toQueryString } from "@/lib/tours/query";

type Params = Promise<{ locale: string; slug: string }>;

const copy = {
  facts: {
    flight: { uk: "Переліт", cs: "Let" },
    season: { uk: "Найкращий сезон", cs: "Nejlepší sezóna" },
    airports: { uk: "Виліт з", cs: "Odlet z" },
    currency: { uk: "Валюта", cs: "Měna" },
    entry: { uk: "В’їзд", cs: "Vstup" },
  },
  regionsTitle: { uk: "Куди саме поїхати", cs: "Kam přesně jet" },
  departuresTitle: { uk: "Найближчі виїзди", cs: "Nejbližší odjezdy" },
  departuresLead: {
    uk: "Ціна за особу при розміщенні двох дорослих. Точну ціну на ваші дати Альона перевірить онлайн.",
    cs: "Cena za osobu při ubytování dvou dospělých. Přesnou cenu na vaše termíny Aljona ověří online.",
  },
  allTours: { uk: "Усі тури", cs: "Všechny zájezdy" },
  th: {
    hotel: { uk: "Готель", cs: "Hotel" },
    date: { uk: "Виліт", cs: "Odlet" },
    nights: { uk: "Ночей", cs: "Nocí" },
    board: { uk: "Харчування", cs: "Strava" },
    from: { uk: "Звідки", cs: "Odkud" },
    price: { uk: "Ціна / особа", cs: "Cena / osoba" },
  },
  openOffer: { uk: "Деталі туру", cs: "Detail zájezdu" },
  noDepartures: {
    uk: "Зараз у пошуку немає вільних виїздів — напишіть Альоні, вона перевірить усіх туроператорів вручну.",
    cs: "Ve vyhledávání teď nejsou volné termíny — napište Aljoně, prověří ručně všechny cestovní kanceláře.",
  },
  moneyTitle: { uk: "Гроші та оплата", cs: "Peníze a placení" },
  payNote: {
    uk: "Сам тур ви оплачуєте нам у кронах (CZK) або євро — переказом чи карткою.",
    cs: "Samotný zájezd platíte u nás v korunách (CZK) nebo eurech — převodem či kartou.",
  },
  tipsTitle: { uk: "Поради від Ananas Tour", cs: "Tipy od Ananas Tour" },
  faqTitle: { uk: "Часті питання", cs: "Časté otázky" },
  ctaTitle: { uk: "Хочете {to}? Напишіть Альоні", cs: "Chcete jet {to}? Napište Aljoně" },
  ctaText: {
    uk: "Скажіть дати, кількість людей і бюджет — за 15 хвилин отримаєте 3 найкращі варіанти від перевірених чеських туроператорів.",
    cs: "Napište termín, počet osob a rozpočet — do 15 minut dostanete 3 nejlepší nabídky od ověřených českých cestovních kanceláří.",
  },
  ctaMessage: {
    uk: "Добрий день, Альоно! Мене цікавить відпочинок {in}. Підберіть, будь ласка, варіанти.",
    cs: "Dobrý den, Aljono! Mám zájem o dovolenou {in}. Můžete mi prosím poslat nabídky?",
  },
  heroCta: { uk: "Підібрати тур {to}", cs: "Vybrat zájezd {to}" },
  showTours: { uk: "Дивитися ціни", cs: "Zobrazit ceny" },
  other: { uk: "Інші країни", cs: "Další destinace" },
};

const boardLabels: Record<Board, { uk: string; cs: string }> = {
  RO: { uk: "Без харчування", cs: "Bez stravy" },
  BB: { uk: "Сніданки", cs: "Snídaně" },
  HB: { uk: "Напівпансіон", cs: "Polopenze" },
  FB: { uk: "Повний пансіон", cs: "Plná penze" },
  AI: { uk: "All inclusive", cs: "All inclusive" },
  UAI: { uk: "Ultra all inclusive", cs: "Ultra all inclusive" },
};

const airportLabels: Record<string, { uk: string; cs: string }> = {
  PRG: { uk: "Прага", cs: "Praha" },
  BRQ: { uk: "Брно", cs: "Brno" },
  OSR: { uk: "Острава", cs: "Ostrava" },
  PED: { uk: "Пардубиці", cs: "Pardubice" },
};

const airport = (code: string | undefined, locale: Locale) =>
  code ? (airportLabels[code] ? t(airportLabels[code], locale) : code) : "—";

const fill = (s: string, d: Destination, locale: Locale) =>
  s.replace("{to}", t(d.nameTo, locale)).replace("{in}", t(d.nameIn, locale));

// Tour data comes from tours(): regenerate every 30 min instead of per request,
// so the AnChoice API is not hammered once it replaces the mock provider.
export const revalidate = 1800;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const d = getDestination(slug);
  if (!isLocale(locale) || !d) return {};
  return {
    title: t(d.seo.title, locale),
    description: t(d.seo.description, locale),
    alternates: {
      canonical: routes.destination(locale, slug),
      languages: languageAlternates((l) => routes.destination(l, slug)),
    },
    openGraph: {
      title: t(d.seo.title, locale),
      description: t(d.seo.description, locale),
      images: [d.heroImage],
    },
  };
}

export default async function DestinationPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  const d = getDestination(slug);
  if (!isLocale(raw) || !d) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  const { items: departures } = await tours().search({
    destination: slug,
    adults: 2,
    childrenAges: [],
    pageSize: 6,
    sort: "date_asc",
  });
  const toursHref = routes.tours(locale, toQueryString({ destination: slug }));
  const name = t(d.name, locale);
  const telegramMessage = fill(t(copy.ctaMessage, locale), d, locale);
  const faq = d.faq.map((f) => ({ q: t(f.q, locale), a: t(f.a, locale) }));

  const facts = [
    { label: copy.facts.flight, value: t(d.flightTime, locale) },
    { label: copy.facts.season, value: t(d.bestSeason, locale) },
    { label: copy.facts.airports, value: d.airports.map((a) => airport(a, locale)).join(", ") },
    { label: copy.facts.currency, value: t(d.currency, locale) },
    { label: copy.facts.entry, value: t(d.entry, locale) },
  ];

  const regionShapes = ["shape-card", "shape-card-r", "shape-card-tl"];
  const longestWord = Math.max(...name.split(/\s+/).map((w) => w.length));

  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />

      {/* Hero */}
      <section className="pt-6 sm:pt-10">
        <Container>
          <div className="relative flex min-h-[540px] flex-col justify-end overflow-hidden shape-card bg-ink text-paper sm:min-h-[640px]">
            <Image src={d.heroImage} alt={name} fill priority sizes="100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/35 to-ink/10" />
            <div className="absolute right-5 top-5 hidden sm:block">
              <CircleBadge size={150} color="var(--c-paper)" text={`${name.toUpperCase()} • ANANAS TOUR • `} center={<span className="text-5xl">{d.flag}</span>} />
            </div>
            <div className="relative px-6 pb-10 sm:px-12 sm:pb-14">
              <Pill tone="yellow">{t(d.tagline, locale)}</Pill>
              <h1
                className="mt-4 font-display font-black uppercase leading-[0.88] tracking-[-0.04em]"
                // Size to the longest word so it never breaks mid-word (Unbounded is wide).
                style={{ fontSize: `clamp(2rem, calc((min(100vw, 84rem) - 9rem) / ${(longestWord * 0.98).toFixed(2)}), 9.5rem)` }}
              >
                {name}
              </h1>
              <p className="mt-5 max-w-2xl text-lg text-paper/85">{t(d.teaser, locale)}</p>
              <div className="mt-7 flex flex-wrap gap-3">
                <TelegramButton
                  locale={locale}
                  source={`destination-hero-${slug}`}
                  message={telegramMessage}
                  label={fill(t(copy.heroCta, locale), d, locale)}
                  size="lg"
                />
                <ButtonLink href={toursHref} variant="light" className="py-4">
                  {t(copy.showTours, locale)}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Key facts */}
          <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {facts.map((f, i) => (
              <div
                key={i}
                className={`rounded-[1.5rem] p-5 ${i === 0 ? "bg-yellow" : i === 3 ? "bg-ice" : "bg-grey"} ${i === facts.length - 1 ? "col-span-2 md:col-span-1" : ""}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink/75">{t(f.label, locale)}</dt>
                <dd className="mt-1.5 text-[1.05rem] font-bold leading-snug">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Intro + regions mosaic */}
      <Section title={t(copy.regionsTitle, locale)} lead={t(d.intro, locale)}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
          {d.regions.map((r, i) => (
            <article
              key={i}
              className={`group relative flex min-h-[280px] flex-col justify-end overflow-hidden ${regionShapes[i % 3]} bg-ink text-paper ${
                i === 0 ? "md:col-span-2 lg:row-span-2 lg:min-h-[560px]" : ""
              }`}
            >
              <Image
                src={r.image}
                alt={t(r.title, locale)}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
              <div className="relative p-6 sm:p-8">
                <h3 className={`font-display font-extrabold ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                  {t(r.title, locale)}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-paper/85 sm:text-base">{t(r.text, locale)}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Nearest departures */}
      <Section
        className="bg-ice-light"
        title={`${t(copy.departuresTitle, locale)} ${t(d.nameTo, locale)}`}
        lead={t(copy.departuresLead, locale)}
        action={
          <ButtonLink href={toursHref} variant="dark">
            {t(copy.allTours, locale)} {t(d.nameTo, locale)}
          </ButtonLink>
        }
      >
        {departures.length > 0 ? (
          <div className="overflow-x-auto rounded-[2rem] bg-white p-2 sm:rounded-[2.5rem]">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/75">
                <tr>
                  <th className="px-6 py-4 font-semibold">{t(copy.th.hotel, locale)}</th>
                  <th className="px-3 py-4 font-semibold">{t(copy.th.date, locale)}</th>
                  <th className="px-3 py-4 font-semibold">{t(copy.th.nights, locale)}</th>
                  <th className="px-3 py-4 font-semibold">{t(copy.th.board, locale)}</th>
                  <th className="px-3 py-4 font-semibold">{t(copy.th.from, locale)}</th>
                  <th className="px-3 py-4 text-right font-semibold">{t(copy.th.price, locale)}</th>
                  <th className="px-6 py-4">
                    <span className="sr-only">{t(copy.openOffer, locale)}</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/5">
                {departures.map((o) => (
                  <tr key={o.id} className="transition hover:bg-paper">
                    <td className="px-6 py-4">
                      <Link href={routes.offer(locale, o.id)} className="font-display font-bold hover:underline">
                        {o.hotel.name}
                      </Link>{" "}
                      <span className="text-yellow">{"★".repeat(o.hotel.stars)}</span>
                      <div className="text-xs text-ink/75">{o.hotel.region}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4">
                      {formatDate(o.departureDate, locale, { weekday: "short", day: "numeric", month: "short" })}
                    </td>
                    <td className="px-3 py-4">{o.nights}</td>
                    <td className="px-3 py-4">{t(boardLabels[o.board], locale)}</td>
                    <td className="px-3 py-4">{o.transport === "bus" ? "🚌" : airport(o.departureAirport, locale)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-right font-display text-lg font-extrabold">
                      {formatMoney(o.pricePerPerson, locale)}
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <TelegramButton
                          locale={locale}
                          source={`destination-table-${slug}`}
                          message={offerTelegramMessage(o, locale)}
                          label={dict.contact.telegramShort}
                          size="sm"
                        />
                        <ArrowButton href={routes.offer(locale, o.id)} label={t(copy.openOffer, locale)} size={40} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4 shape-card bg-white p-8 ring-1 ring-ink/5">
            <p className="max-w-xl text-ink/75">{t(copy.noDepartures, locale)}</p>
            <TelegramButton locale={locale} source={`destination-empty-${slug}`} message={telegramMessage} />
          </div>
        )}
      </Section>

      {/* Money */}
      <Section title={t(copy.moneyTitle, locale)}>
        <div className="grid gap-4 md:grid-cols-3">
          {d.money.map((m, i) => (
            <div key={i} className={`${i % 2 ? "shape-card-r" : "shape-card"} bg-grey p-7`}>
              <h3 className="font-display text-xl font-bold">{t(m.title, locale)}</h3>
              <p className="mt-2 leading-relaxed text-ink/75">{t(m.text, locale)}</p>
            </div>
          ))}
          <div className="relative overflow-hidden shape-card-tl bg-yellow p-7">
            <PineappleSlice kind="half" size={140} rotate={200} className="absolute -bottom-10 -right-8 opacity-40" color="var(--c-paper)" />
            <p className="relative font-display text-xl font-bold">CZK / EUR</p>
            <p className="relative mt-2 leading-relaxed">{t(copy.payNote, locale)}</p>
          </div>
        </div>
      </Section>

      {/* Tips */}
      <section className="relative overflow-hidden bg-ink py-12 text-paper sm:py-16">
        <PineapplePattern preset="sparse" opacity={0.3} />
        <Container className="relative">
          <h2 className="font-display text-3xl font-black uppercase leading-[1] tracking-[-0.03em] sm:text-5xl">{t(copy.tipsTitle, locale)}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {d.tips.map((tip, i) => (
              <li key={i} className="flex gap-4 shape-card bg-paper/5 p-6 ring-1 ring-paper/10">
                <PineappleSlice kind="wedge" size={40} seed={i + 2} className="shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-bold text-yellow-light">{t(tip.title, locale)}</h3>
                  <p className="mt-1 leading-relaxed text-paper/80">{t(tip.text, locale)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* FAQ */}
      <Section title={`${t(copy.faqTitle, locale)}: ${name}`}>
        <FaqList items={faq} />
      </Section>

      <TelegramCta
        locale={locale}
        source={`destination-cta-${slug}`}
        title={fill(t(copy.ctaTitle, locale), d, locale)}
        text={t(copy.ctaText, locale)}
        message={telegramMessage}
      />

      {/* Other destinations */}
      <section className="pb-16">
        <Container>
          <h2 className="font-display text-xl font-bold">{t(copy.other, locale)}</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {destinations
              .filter((x) => x.slug !== slug)
              .map((x) => (
                <li key={x.slug}>
                  <Link
                    href={routes.destination(locale, x.slug)}
                    className="inline-flex items-center gap-2 shape-pill bg-white px-4 py-2 text-sm font-semibold ring-1 ring-ink/10 transition hover:bg-yellow"
                  >
                    <span aria-hidden>{x.flag}</span> {t(x.name, locale)}
                  </Link>
                </li>
              ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
