import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache, type CSSProperties } from "react";
import { PineapplePattern } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { ArrowIcon, ButtonLink, Container, Notch, Pill } from "@/components/ui";
import { AvailabilityCheck } from "@/components/tours/availability-check";
import { BookingForm } from "@/components/tours/booking-form";
import { HotelLocation, HotelRating, Stars } from "@/components/tours/hotel-bits";
import { airportLabel, boardLabel, countryName, dateRangeLabel, roomTypeLabel, transportLabel } from "@/components/tours/labels";
import { fitLongestWord, glue } from "@/components/home/typo";
import { displayLeading } from "@/components/tours/display";
import { offerTelegramMessage } from "@/components/tours/offer-card";
import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatDate, formatDateRange, formatMoney } from "@/lib/format";
import { tours } from "@/lib/tours";
import type { OfferWithHotel } from "@/lib/tours/types";

type Props = { params: Promise<{ locale: string; id: string }> };

const getOffer = cache((id: string) => tours().getOffer(id));

const tx = {
  hotel: { uk: "Про готель та інші дати →", cs: "O hotelu a další termíny →" },
  dates: { uk: "Дати", cs: "Termín" },
  nights: { uk: "Тривалість", cs: "Délka pobytu" },
  transport: { uk: "Транспорт", cs: "Doprava" },
  board: { uk: "Харчування", cs: "Strava" },
  room: { uk: "Номер", cs: "Pokoj" },
  operator: { uk: "Туроператор", cs: "Cestovní kancelář" },
  priceTitle: { uk: "Вартість туру", cs: "Cena zájezdu" },
  total: { uk: "Разом за всіх", cs: "Celkem za všechny" },
  included: { uk: "Що входить у ціну", cs: "Co je v ceně" },
  extra: { uk: "Що оплачується окремо", cs: "Co v ceně není" },
  order: { uk: "Хочу цей тур", cs: "Chci tenhle zájezd" },
  ask: { uk: "Запитати Альону", cs: "Zeptat se Aljony" },
  // No-break space before the separator: the "·" stays at the end of a line and never starts the next one.
  noPay: {
    uk: "На сайті нічого не платите · чеські CK застраховані від банкрутства",
    cs: "Na webu nic neplatíte · české CK jsou pojištěné proti úpadku",
  },
  lastMinute: { uk: "Гарячий тур", cs: "Last minute" },
  verified: { uk: "✓ Ціну перевірено", cs: "✓ Cena ověřena" },
};

function included(o: OfferWithHotel, locale: Locale): string[] {
  // TODO(anchoice): take the real "included / extra" lists from the Search API offer detail.
  return [
    o.transport === "flight"
      ? t({ uk: `Переліт туди й назад${o.departureAirport ? ` (${o.departureAirport})` : ""}`, cs: `Zpáteční letenka${o.departureAirport ? ` (${o.departureAirport})` : ""}` }, locale)
      : o.transport === "bus"
        ? t({ uk: "Автобус туди й назад", cs: "Doprava autobusem tam i zpět" }, locale)
        : "",
    o.transport === "flight" ? t({ uk: "Аеропортові й паливні збори", cs: "Letištní a palivové poplatky" }, locale) : "",
    o.transport !== "own" ? t({ uk: "Трансфер до готелю й назад", cs: "Transfer do hotelu a zpět" }, locale) : "",
    t({ uk: `Проживання: ${o.nights} ночей, ${roomTypeLabel(o.roomType, locale)}`, cs: `Ubytování: ${o.nights} nocí, ${o.roomType}` }, locale),
    `${t({ uk: "Харчування", cs: "Strava" }, locale)}: ${boardLabel(o.board, locale)}`,
    t({ uk: "Представник туроператора на місці", cs: "Delegát CK na místě" }, locale),
    t({ uk: "Страхування туроператора від банкрутства (за законом)", cs: "Pojištění CK proti úpadku (ze zákona)" }, locale),
  ].filter(Boolean);
}

function extras(locale: Locale): string[] {
  return [
    t({ uk: "Туристична страховка — дуже раджу", cs: "Cestovní pojištění – vřele doporučuju" }, locale),
    t({ uk: "Екскурсії й курортний збір (оплата на місці)", cs: "Výlety a pobytová taxa (platíte na místě)" }, locale),
    t({ uk: "Віза, якщо потрібна, — перевірю ще до бронювання", cs: "Vízum, pokud je potřeba – ověřím ještě před rezervací" }, locale),
    t({ uk: "Сусідні місця в літаку й додатковий багаж", cs: "Místa vedle sebe v letadle a zavazadlo navíc" }, locale),
  ];
}

/**
 * `--amt`: width of a formatted price in em of Unbounded Black. Digits, caps and the grouping spaces measure
 * ~0.73em per character ("79 990 CZK" = 7.2–7.3em, "79 990 Kč" = 6.25em); 0.75 keeps a margin.
 */
function amountFit(amount: string): CSSProperties {
  return { "--amt": (amount.length * 0.75).toFixed(2) } as CSSProperties;
}

// Tour data comes from tours(): regenerate every 30 min instead of per request,
// so the AnChoice API is not hammered once it replaces the mock provider.
export const revalidate = 1800;

// No offers are known at build time (IDs come from the live search), but an
// empty list opts the route into on-demand ISR so visited offers are cached.
export function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const o = await getOffer(id);
  if (!o) return {};
  const when = formatDateRange(o.departureDate, o.returnDate, locale);
  return {
    title: `${o.hotel.name} ${o.hotel.stars}* · ${formatDate(o.departureDate, locale)}, ${o.nights} ${getDictionary(locale).common.nights}`,
    description: t(
      {
        uk: `${o.hotel.name}, ${countryName(o.hotel.countrySlug, locale, o.hotel.country)}: ${when}, ${boardLabel(o.board, locale)}, від ${formatMoney(o.pricePerPerson, locale)} за особу. Надішліть запит — Альона перевірить місця й ціну в туроператора. На сайті нічого не платите.`,
        cs: `${o.hotel.name}, ${countryName(o.hotel.countrySlug, locale, o.hotel.country)}: ${when}, ${boardLabel(o.board, locale)}, od ${formatMoney(o.pricePerPerson, locale)} za osobu. Pošlete žádost a Aljona ověří volná místa i cenu u CK. Na webu nic neplatíte.`,
      },
      locale,
    ),
    // Departures expire quickly — keep them out of the index; hotels are the indexable pages.
    robots: { index: false, follow: true },
    openGraph: { images: o.hotel.images.slice(0, 1) },
  };
}

export default async function OfferPage({ params }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const offer = await getOffer(id);
  if (!offer) notFound();

  const dict = getDictionary(locale);
  const { hotel } = offer;
  const tgMessage = offerTelegramMessage(offer, locale);
  const price = formatMoney(offer.pricePerPerson, locale);
  const summary = `${hotel.name} ${hotel.stars}*, ${formatDateRange(offer.departureDate, offer.returnDate, locale)}, ${offer.nights} ${dict.common.nights}, ${offer.board}`;

  const facts: Array<[string, string]> = [
    [t(tx.dates, locale), dateRangeLabel(offer.departureDate, offer.returnDate, locale)],
    [t(tx.nights, locale), `${offer.nights} ${dict.common.nights}`],
    [
      t(tx.transport, locale),
      `${transportLabel(offer.transport, locale)}${offer.departureAirport ? `, ${airportLabel(offer.departureAirport, locale)}` : ""}`,
    ],
    [t(tx.board, locale), `${boardLabel(offer.board, locale)} (${offer.board})`],
    // Glued: a one-letter preposition ("pokoj s výhledem") never ends a line.
    [t(tx.room, locale), glue(roomTypeLabel(offer.roomType, locale))],
    [t(tx.operator, locale), offer.touroperator],
  ];

  return (
    <>
      <Container className="pt-2 sm:pt-4">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-grey sm:col-span-2 sm:aspect-[16/10] sm:rounded-[2.5rem]">
            <Image src={hotel.images[0]} alt={hotel.name} fill priority sizes="(min-width: 640px) 66vw, 100vw" className="object-cover" />
            <div className="absolute left-4 top-4 flex gap-2">
              {offer.isLastMinute && <Pill tone="red">{t(tx.lastMinute, locale)}</Pill>}
              {offer.verified && <Pill tone="white">{t(tx.verified, locale)}</Pill>}
            </div>
            <Notch radius="1.75rem" className="pr-2.5 pt-2.5 sm:pr-3 sm:pt-3">
              <a
                href="#order"
                className="inline-flex min-h-13 items-center gap-3 shape-pill bg-red py-2 pl-6 pr-2 font-bold text-white shadow-[0_14px_30px_-14px_rgba(217,50,25,0.9)] transition hover:bg-red-dark sm:text-lg"
              >
                {t(tx.order, locale)}
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink">
                  <ArrowIcon size={16} rotate={90} />
                </span>
              </a>
            </Notch>
          </div>
          <div className="hidden gap-3 sm:grid sm:gap-4">
            {hotel.images.slice(1, 3).map((src, i) => (
              <div key={src} className={`relative overflow-hidden bg-grey ${i === 0 ? "rounded-[2.5rem]" : "rounded-full"}`}>
                <Image src={src} alt={`${hotel.name} — ${i + 2}`} fill sizes="33vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </Container>

      {/* minmax(0,1fr) also below lg: an auto track would grow to the widest unbreakable content (the aside price)
          and push both the column and the aside past the panel on a 320px phone. */}
      <Container className="grid grid-cols-[minmax(0,1fr)] gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10">
        {/* @container: the H1 is sized against this column, so a long provider name (INTERCONTINENTAL,
            STEIGENBERGER) shrinks until its longest word fits instead of splitting mid-word; short names keep the clamp. */}
        <div className="@container min-w-0">
          <p className="eyebrow text-ink/75">
            <HotelLocation hotel={hotel} locale={locale} />
          </p>
          <h1
            className={`mt-2 text-balance font-display text-[min(var(--fit),clamp(1.9rem,4.4vw,3.6rem))] font-black uppercase ${displayLeading(hotel.name)} tracking-[-0.03em]`}
            style={fitLongestWord(hotel.name)}
          >
            {hotel.name} <span className="align-middle text-[0.42em]"><Stars n={hotel.stars} locale={locale} /></span>
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <HotelRating hotel={hotel} locale={locale} />
            <Link href={routes.hotel(locale, hotel.id)} className="inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4 hover:text-red">
              {t(tx.hotel, locale)}
            </Link>
          </div>

          {/* Columns follow the column width (@container): one tile per row on a 320px phone, where a half-width
              tile is narrower than "Dvoulůžkový", two from 17.5rem, three from 30rem. */}
          <dl className="mt-8 grid grid-cols-1 gap-2 @min-[17.5rem]:grid-cols-2 @min-[30rem]:grid-cols-3 sm:gap-3">
            {facts.map(([k, v], i) => (
              <div key={k} className={`min-w-0 rounded-[1.5rem] px-4 py-4 sm:px-5 ${i === 0 ? "bg-yellow" : i === 3 ? "bg-ice" : "bg-grey"}`}>
                {/* Tighter tracking than the global eyebrow: ТУРОПЕРАТОР is one word and must fit a half-width tile. */}
                <dt className="eyebrow tracking-[0.12em] text-ink/80">{k}</dt>
                <dd className="mt-1.5 break-words font-semibold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:rounded-[2.5rem] sm:p-8">
            {/* Faded out behind the price block so no slice sits under the figures. */}
            <PineapplePattern
              preset="sparse"
              opacity={0.3}
              className="[mask-image:linear-gradient(to_bottom,transparent_45%,black_80%)]"
            />
            {/* @container: the price is capped to this box (100cqi / --amt), so "26 790 CZK" fits a 320px phone. */}
            <div className="@container relative">
              <p className="eyebrow text-paper/80">{t(tx.priceTitle, locale)}</p>
              {offer.originalPrice && <p className="mt-3 text-paper/75 line-through">{formatMoney(offer.originalPrice, locale)}</p>}
              <p className="mt-1 whitespace-nowrap font-display text-[min(2.25rem,calc(100cqi_/_var(--amt)))] font-black leading-none" style={amountFit(price)}>
                {price}
              </p>
              <p className="mt-1 text-sm text-paper/80">{dict.common.perPerson}</p>
              <p className="mt-3 text-sm">
                {t(tx.total, locale)}: <strong>{formatMoney(offer.totalPrice, locale)}</strong>
              </p>
              <div className="mt-5">
                <AvailabilityCheck offerId={offer.id} locale={locale} totalPrice={offer.totalPrice} telegramMessage={tgMessage} />
              </div>
              <div className="mt-6 flex flex-col gap-3">
                <ButtonLink href="#order" variant="primary" className="w-full text-lg">
                  {t(tx.order, locale)}
                </ButtonLink>
                <TelegramButton locale={locale} source="offer-price" message={tgMessage} label={t(tx.ask, locale)} className="w-full" />
                <p className="text-balance text-center text-xs text-paper/80">{glue(t(tx.noPay, locale))}</p>
              </div>
            </div>
          </div>
        </aside>
      </Container>

      {/* "Стоимость тура" (Reference 1): dark photo background with price pill and cards */}
      <Container>
        <section aria-labelledby="price-title" className="@container relative isolate overflow-hidden rounded-[2rem] bg-ink p-3 sm:rounded-[2.75rem] sm:p-8 lg:p-12">
          <Image src={hotel.images[3] ?? hotel.images[0]} alt="" fill sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/65" />
          <h2 id="price-title" className="px-3 pt-4 font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-black uppercase leading-none tracking-[-0.03em] text-white sm:px-0 sm:pt-0">
            {t(tx.priceTitle, locale)}
          </h2>
          {/* The amount never wraps and is capped to the pill's text box (section width minus the pill padding,
              divided by the amount's width in em, --amt), so "79 990 CZK" fits a 320px phone; wider screens keep the clamp. */}
          <div className="mt-6 inline-flex max-w-full flex-wrap items-baseline gap-x-4 gap-y-1 rounded-[2rem] bg-white px-4 py-4 sm:rounded-full sm:px-10 sm:py-6">
            <span
              className="whitespace-nowrap font-display text-[min(clamp(2.2rem,6vw,4.8rem),calc((100cqi_-_2rem)_/_var(--amt)))] font-black leading-none tracking-[-0.03em] sm:text-[min(clamp(2.2rem,6vw,4.8rem),calc((100cqi_-_5rem)_/_var(--amt)))]"
              style={amountFit(price)}
            >
              {price}
            </span>
            <span className="text-lg font-semibold text-ink/80">{dict.common.perPerson}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[1.75rem] bg-grey p-6 sm:rounded-[2.25rem] sm:p-8">
              <h3 className="font-display text-xl font-extrabold uppercase">{t(tx.included, locale)}</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {included(offer, locale).map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.95rem]">
                    <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-yellow ring-2 ring-ink" />
                    <span className="min-w-0 text-pretty">{glue(item)}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="flex-1 rounded-[1.75rem] bg-ice p-6 sm:rounded-[2.25rem] sm:p-8">
                <h3 className="font-display text-xl font-extrabold uppercase">{t(tx.extra, locale)}</h3>
                <ul className="mt-4 grid gap-2.5">
                  {extras(locale).map((item) => (
                    <li key={item} className="flex gap-2.5 text-[0.95rem]">
                      <span aria-hidden className="font-bold">+</span>
                      <span className="min-w-0 text-pretty">{glue(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-start gap-3 rounded-[1.5rem] bg-grey p-5">
                <span aria-hidden className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-red" />
                <p className="text-pretty text-sm">
                  <strong>{glue(t(tx.noPay, locale))}.</strong> {t(tx.total, locale)}:{" "}
                  <strong className="whitespace-nowrap">{formatMoney(offer.totalPrice, locale)}</strong>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <Container>
        <section id="order" className="mx-auto max-w-4xl scroll-mt-24 py-12 sm:py-16">
          <BookingForm locale={locale} offerId={offer.id} offerSummary={summary} telegramMessage={tgMessage} />
        </section>
      </Container>
    </>
  );
}
