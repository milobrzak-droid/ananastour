import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleBadge, PineapplePattern, PineappleSlice } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { FaqList, faqJsonLd } from "@/components/content/faq";
import { JsonLd } from "@/components/content/json-ld";
import { TelegramCta } from "@/components/content/telegram-cta";
import { keepRanges, typeset } from "@/components/content/typeset";
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
    season: { uk: "Сезон", cs: "Sezóna" },
    airports: { uk: "Вильоти", cs: "Odlety" },
    currency: { uk: "Валюта", cs: "Měna" },
    entry: { uk: "В’їзд", cs: "Vstup" },
  },
  regionsTitle: { uk: "Куди саме", cs: "Kam přesně" },
  departuresTitle: { uk: "Вильоти з Чехії", cs: "Odlety z Česka" },
  departuresLead: {
    uk: "Ціна — за одну особу, якщо в номері двоє дорослих. Ціну й вільні місця на ваші дати перевірю в туроператора ще до бронювання.",
    cs: "Ceny jsou za osobu při obsazení pokoje dvěma dospělými. Cenu i volná místa na váš termín ověřím u CK ještě před rezervací.",
  },
  allTours: { uk: "Усі тури", cs: "Zájezdy" },
  th: {
    hotel: { uk: "Готель", cs: "Hotel" },
    date: { uk: "Виліт", cs: "Odlet" },
    nights: { uk: "Ночей", cs: "Nocí" },
    board: { uk: "Харчування", cs: "Strava" },
    from: { uk: "Звідки", cs: "Odkud" },
    price: { uk: "Ціна за особу", cs: "Cena za osobu" },
  },
  openOffer: { uk: "Деталі туру", cs: "Detail zájezdu" },
  noDepartures: {
    uk: "Онлайн-пошук зараз не бачить вильотів. Але бачить він не все — напишіть, і я перевірю в туроператорів вручну.",
    cs: "Online vyhledávání teď žádné odlety nevidí. Jenže nevidí všechno – napište mi a ověřím to přímo u CK.",
  },
  moneyTitle: { uk: "Гроші на місці", cs: "Peníze na místě" },
  payNote: {
    uk: "Ціни турів — у кронах, а на сайті ви нічого не платите. Спершу я підтверджу тур у туроператора, застрахованого від банкрутства, — і лише тоді договір та оплата.",
    cs: "Ceny jsou v korunách a na webu nic neplatíte. Zájezd nejdřív potvrdím u CK pojištěné proti úpadku – teprve potom přijde na řadu smlouva a platba.",
  },
  tipsTitle: { uk: "Поради Альони", cs: "Aljoniny tipy" },
  faqTitle: { uk: "Що зазвичай питають", cs: "Na co se ptáte" },
  ctaTitle: { uk: "Хочете {to}?", cs: "Chcete {to}?" },
  ctaText: {
    uk: "Скажіть дати, скільки вас і бюджет — я надішлю 3 готелі. З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин.",
    cs: "Napište termín, kolik vás je a rozpočet – pošlu vám 3 hotely. Od 9 do 21 h odpovídám obvykle do 15 minut.",
  },
  ctaMessage: {
    uk: "Добрий день, Альоно! Хочу {to}.\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: …",
    cs: "Dobrý den, Aljono! Chci {to}.\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: …",
  },
  heroCta: { uk: "Хочу {to}", cs: "Chci {to}" },
  showTours: { uk: "Ціни та дати", cs: "Ceny a termíny" },
  other: { uk: "А може, інше море?", cs: "Nebo jiné moře?" },
};

const boardLabels: Record<Board, { uk: string; cs: string }> = {
  RO: { uk: "Без харчування", cs: "Bez stravy" },
  BB: { uk: "Сніданки", cs: "Snídaně" },
  HB: { uk: "Напівпансіон", cs: "Polopenze" },
  FB: { uk: "Повний пансіон", cs: "Plná penze" },
  AI: { uk: "Все включено", cs: "All inclusive" },
  UAI: { uk: "Ультра все включено", cs: "Ultra all inclusive" },
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

  // Typeset: "k moři", "найкраще — …", "10–12" never leave a one-letter word, a dash or half a range at a line
  // edge. The flight time only gets its ranges held: its spaces are set in the copy ("cca·4,5·h z·Prahy"), and
  // glue() would also chain "h z", so the value could no longer wrap inside a half-width card.
  const facts = [
    { label: copy.facts.flight, value: keepRanges(t(d.flightTime, locale)) },
    { label: copy.facts.season, value: typeset(t(d.bestSeason, locale)) },
    { label: copy.facts.airports, value: d.airports.map((a) => airport(a, locale)).join(", ") },
    { label: copy.facts.currency, value: typeset(t(d.currency, locale)) },
    { label: copy.facts.entry, value: typeset(t(d.entry, locale)) },
  ];
  // Phones: season, currency and entry always take the full row ("листопад–квітень", "домініканське песо");
  // flight or airports too when they hold a run of 12+ characters ("(з·пересадкою" ≈ 8 em, wider than half a
  // 320px row). Half cards stay in pairs, so no card sits alone next to a hole.
  const longestRun = (s: string) => Math.max(...s.replace(/⁠/g, "").split(/[ \t\n]+/).map((w) => w.length));
  const wide = facts.map((f, i) => i === 1 || i >= 3 || longestRun(f.value) >= 12);
  const halves = wide.flatMap((w, i) => (w ? [] : [i]));
  if (halves.length % 2) wide[halves[halves.length - 1]] = true;

  const regionShapes = ["shape-card", "shape-card-r", "shape-card-tl"];
  const longestOf = (s: string) => Math.max(...s.split(/\s+/).map((w) => w.length));
  const longestWord = longestOf(name);

  return (
    <>
      <JsonLd data={faqJsonLd(faq)} />

      {/* Hero */}
      <section className="pt-6 sm:pt-10">
        <Container>
          <div className="relative flex min-h-[540px] flex-col justify-end overflow-hidden shape-card bg-ink text-paper sm:min-h-[640px]">
            <Image src={d.heroImage} alt={name} fill priority sizes="100vw" className="object-cover" />
            {/* Desktop keeps the lower half dark (via-ink/50 at 45%) so the giant name and the teaser stay readable
                over bright sky or water; the top of the photo stays light. */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 via-55% to-ink/20 sm:via-ink/50 sm:via-45% sm:to-ink/10" />
            <div className="absolute right-5 top-5 hidden sm:block">
              <CircleBadge size={150} color="var(--c-paper)" text={`${name.toUpperCase()} • ANANAS TOUR • `} center={<span className="text-5xl">{d.flag}</span>} />
            </div>
            <div className="relative px-6 pb-10 sm:px-12 sm:pb-14">
              <Pill tone="yellow">{t(d.tagline, locale)}</Pill>
              <h1
                // Sized to the longest word so it never breaks mid-word: --hk = letters × 0.98 em (widest Unbounded caps,
                // МАЛЬДІВИ, measure 0.90 em). The subtracted rem is the real chrome (frame + container + card padding)
                // at each breakpoint: 6rem phones, 11rem sm–md, 13rem from lg; the 1.4rem floor fits ДОМІНІКАНА at 320 px.
                // Gap above scales with the size: at leading 0.88 a cap accent (Ř Š Á) rises ≈0.19 em above the line box,
                // so a fixed 1rem let the giant ŘECKO / ŠPANĚLSKO / ITÁLIE accent run into the pill from 768 px up.
                className="mt-[max(1rem,0.25rem_+_0.22em)] text-balance font-display font-black uppercase leading-[0.88] tracking-[-0.04em] [text-shadow:0_2px_18px_rgb(0_0_0/0.3)] text-[length:clamp(1.4rem,calc((100vw_-_6rem)/var(--hk)),9.5rem)] sm:text-[length:clamp(1.4rem,calc((100vw_-_11rem)/var(--hk)),9.5rem)] lg:text-[length:clamp(1.4rem,calc((min(100vw,86rem)_-_13rem)/var(--hk)),9.5rem)]"
                style={{ "--hk": (longestWord * 0.98).toFixed(2) } as CSSProperties}
              >
                {name}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-lg text-paper [text-shadow:0_1px_12px_rgb(0_0_0/0.35)]">{t(d.teaser, locale)}</p>
              <div className="mt-7 flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap">
                <TelegramButton
                  locale={locale}
                  source={`destination-hero-${slug}`}
                  message={telegramMessage}
                  label={fill(t(copy.heroCta, locale), d, locale)}
                  size="lg"
                  // Phones get md metrics so "Хочу до Домінікани" stays on one line down to 320 px.
                  className="max-sm:min-h-12 max-sm:gap-2 max-sm:pl-2 max-sm:pr-5 max-sm:text-[clamp(0.875rem,4.3vw,1rem)]"
                />
                <ButtonLink href={toursHref} variant="light" className="py-4">
                  {t(copy.showTours, locale)}
                </ButtonLink>
              </div>
            </div>
          </div>

          {/* Key facts */}
          {/* 5 in a row only from xl: at 1024 a fifth of the row is too narrow for "листопад–квітень" or "громадянства".
              Below md, season, currency and entry span the row (dense flow pulls airports up next to the flight),
              so a glued range or "домініканське" never has to break inside a half-width card. */}
          <dl className="mt-4 grid grid-cols-2 gap-3 max-md:grid-flow-row-dense md:grid-cols-3 xl:grid-cols-5">
            {facts.map((f, i) => (
              <div
                key={i}
                className={`min-w-0 rounded-[1.5rem] p-4 sm:p-5 ${i === 0 ? "bg-yellow" : i === 3 ? "bg-ice" : "bg-grey"} ${wide[i] ? "col-span-2 md:col-span-1" : ""}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-wider text-ink/75">{t(f.label, locale)}</dt>
                {/* Half-width cards (flight, airports) hold ≈ 8 em unbroken ("(з пересадкою", "Пардубиці"): scaled with vw on phones. */}
                <dd className="mt-1.5 text-pretty text-[clamp(0.92rem,3.9vw,1.05rem)] font-bold leading-snug [overflow-wrap:break-word]">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Intro + regions mosaic */}
      <Section
        title={t(copy.regionsTitle, locale)}
        // Block span: text-pretty needs a block box, and the lead <p> belongs to the shared Section.
        lead={<span className="block text-pretty">{typeset(t(d.intro, locale))}</span>}
      >
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
                <h3
                  className={`text-balance font-display font-extrabold ${i === 0 ? "leading-[1.12]" : "text-2xl"}`}
                  // Big tile: sized to its longest word. Cyrillic lowercase measures ≈0.80 em per letter ("Класична" 6.43 em,
                  // "Барселона" 7.13 em), budgeted at 0.84 so no word splits at 320 px; very long compounds
                  // ("Острови-резорти") reach the floor and wrap at their hyphen.
                  style={i === 0 ? { fontSize: `clamp(1.45rem, calc((100vw - 6rem) / ${(longestOf(t(r.title, locale)) * 0.84).toFixed(2)}), 2.25rem)` } : undefined}
                >
                  {t(r.title, locale)}
                </h3>
                <p className="mt-2 max-w-xl text-pretty text-sm leading-relaxed text-paper/85 sm:text-base">{t(r.text, locale)}</p>
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
          <>
            {/* Below xl: one card per departure. The 7-column table needs ~960px (more in Ukrainian); in a scroller its
                Telegram and detail buttons sat off-screen and hotel names stacked one word per line. */}
            <ul className="grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:hidden">
              {departures.map((o) => (
                <li key={o.id} className="flex flex-col rounded-[1.75rem] bg-white p-5">
                  <p className="text-balance">
                    <Link href={routes.offer(locale, o.id)} className="font-display font-bold hover:underline">
                      {o.hotel.name}
                    </Link>{" "}
                    <span className="text-yellow">{"★".repeat(o.hotel.stars)}</span>
                  </p>
                  <p className="text-xs text-ink/75">{o.hotel.region}</p>
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {[
                      { label: copy.th.date, value: formatDate(o.departureDate, locale, { weekday: "short", day: "numeric", month: "short" }) },
                      { label: copy.th.nights, value: o.nights },
                      { label: copy.th.board, value: t(boardLabels[o.board], locale) },
                      { label: copy.th.from, value: o.transport === "bus" ? "🚌" : airport(o.departureAirport, locale) },
                    ].map((f, i) => (
                      <div key={i} className="min-w-0">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-ink/75">{t(f.label, locale)}</dt>
                        <dd className="text-pretty">{f.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 gap-y-3 pt-4">
                    <p className="flex flex-wrap items-baseline gap-x-1.5 font-display text-lg font-extrabold">
                      <span className="whitespace-nowrap">{formatMoney(o.pricePerPerson, locale)}</span>
                      <span className="whitespace-nowrap font-sans text-xs font-normal text-ink/75">{dict.common.perPerson}</span>
                    </p>
                    <div className="flex items-center gap-2">
                      <TelegramButton
                        locale={locale}
                        source={`destination-table-${slug}`}
                        message={offerTelegramMessage(o, locale)}
                        label={dict.contact.telegramShort}
                        size="sm"
                      />
                      <ArrowButton href={routes.offer(locale, o.id)} label={t(copy.openOffer, locale)} size={40} />
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="hidden overflow-x-auto rounded-[2rem] bg-white p-2 sm:rounded-[2.5rem] xl:block">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink/75">
                  <tr>
                    {/* min-w: the hotel column keeps ~2 words per line ("Viva Dominicus / Beach by Wyndham"). */}
                    <th className="min-w-[13rem] px-6 py-4 font-semibold">{t(copy.th.hotel, locale)}</th>
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
                      <td className="whitespace-nowrap px-3 py-4">{t(boardLabels[o.board], locale)}</td>
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
          </>
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
              <p className="mt-2 text-pretty leading-relaxed text-ink/75">{typeset(t(m.text, locale))}</p>
            </div>
          ))}
          <div className="relative overflow-hidden shape-card-tl bg-yellow p-7">
            <PineappleSlice kind="half" size={140} rotate={200} className="absolute -bottom-10 -right-8 opacity-40" color="var(--c-paper)" />
            <p className="relative font-display text-xl font-bold">Kč</p>
            <p className="relative mt-2 text-pretty leading-relaxed">{typeset(t(copy.payNote, locale))}</p>
          </div>
        </div>
      </Section>

      {/* Tips */}
      <section className="relative overflow-hidden bg-ink py-12 text-paper sm:py-16">
        {/* Masked off the heading band (top 7rem, fading in by 11rem): the corner wedge never lands on the h2. */}
        <PineapplePattern preset="sparse" opacity={0.3} className="[mask-image:linear-gradient(to_bottom,transparent_7rem,black_11rem)]" />
        <Container className="relative">
          <h2 className="font-display text-3xl font-black uppercase leading-[1] tracking-[-0.03em] sm:text-5xl">{t(copy.tipsTitle, locale)}</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {d.tips.map((tip, i) => (
              <li key={i} className="flex gap-4 shape-card bg-paper/5 p-6 ring-1 ring-paper/10">
                <PineappleSlice kind="wedge" size={40} seed={i + 2} className="shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-bold text-yellow-light">{t(tip.title, locale)}</h3>
                  <p className="mt-1 text-pretty leading-relaxed text-paper/80">{typeset(t(tip.text, locale))}</p>
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
