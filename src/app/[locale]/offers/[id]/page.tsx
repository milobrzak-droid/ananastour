import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { PineapplePattern } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { ArrowIcon, ButtonLink, Container, Notch, Pill } from "@/components/ui";
import { AvailabilityCheck } from "@/components/tours/availability-check";
import { BookingForm } from "@/components/tours/booking-form";
import { HotelLocation, HotelRating, Stars } from "@/components/tours/hotel-bits";
import { airportLabel, boardLabel, countryName, transportLabel } from "@/components/tours/labels";
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
  hotel: { uk: "Про готель і всі дати →", cs: "O hotelu a všechny termíny →" },
  dates: { uk: "Дати", cs: "Termín" },
  nights: { uk: "Тривалість", cs: "Délka" },
  transport: { uk: "Транспорт", cs: "Doprava" },
  board: { uk: "Харчування", cs: "Strava" },
  room: { uk: "Номер", cs: "Pokoj" },
  operator: { uk: "Туроператор", cs: "Cestovní kancelář" },
  priceTitle: { uk: "Вартість туру", cs: "Cena zájezdu" },
  total: { uk: "Разом за всіх", cs: "Celkem za všechny" },
  included: { uk: "У вартість входить", cs: "V ceně je" },
  extra: { uk: "Оплачується окремо", cs: "Za příplatek" },
  order: { uk: "Замовити тур", cs: "Objednat zájezd" },
  ask: { uk: "Запитати в Telegram", cs: "Zeptat se na Telegramu" },
  noPay: { uk: "Нічого не платите на сайті", cs: "Na webu nic neplatíte" },
};

function included(o: OfferWithHotel, locale: Locale): string[] {
  // TODO(anchoice): take the real "included / extra" lists from the Search API offer detail.
  return [
    o.transport === "flight"
      ? t({ uk: `Авіапереліт туди й назад${o.departureAirport ? ` з ${o.departureAirport}` : ""}`, cs: `Letenka tam i zpět${o.departureAirport ? ` z ${o.departureAirport}` : ""}` }, locale)
      : o.transport === "bus"
        ? t({ uk: "Проїзд автобусом", cs: "Doprava autobusem" }, locale)
        : "",
    o.transport === "flight" ? t({ uk: "Аеропортові та паливні збори", cs: "Letištní a palivové poplatky" }, locale) : "",
    o.transport !== "own" ? t({ uk: "Трансфер аеропорт — готель — аеропорт", cs: "Transfer letiště — hotel — letiště" }, locale) : "",
    t({ uk: `Проживання ${o.nights} ночей, ${o.roomType}`, cs: `Ubytování ${o.nights} nocí, ${o.roomType}` }, locale),
    `${t({ uk: "Харчування", cs: "Strava" }, locale)}: ${boardLabel(o.board, locale)}`,
    t({ uk: "Супровід представника туроператора", cs: "Delegát cestovní kanceláře" }, locale),
    t({ uk: "Страхування від банкрутства туроператора", cs: "Pojištění CK proti úpadku" }, locale),
  ].filter(Boolean);
}

function extras(locale: Locale): string[] {
  return [
    t({ uk: "Комплексне туристичне страхування (рекомендуємо)", cs: "Komplexní cestovní pojištění (doporučujeme)" }, locale),
    t({ uk: "Екскурсії та курортний збір на місці", cs: "Výlety a pobytová taxa na místě" }, locale),
    t({ uk: "Віза, якщо потрібна", cs: "Vízum, pokud je potřeba" }, locale),
    t({ uk: "Бронювання місць у літаку, додатковий багаж", cs: "Rezervace míst v letadle, další zavazadlo" }, locale),
  ];
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
        uk: `${o.hotel.name}, ${countryName(o.hotel.countrySlug, locale, o.hotel.country)}: ${when}, ${boardLabel(o.board, locale)}, від ${formatMoney(o.pricePerPerson, locale)} за особу. Перевірка наявності онлайн, замовлення або питання в Telegram.`,
        cs: `${o.hotel.name}, ${countryName(o.hotel.countrySlug, locale, o.hotel.country)}: ${when}, ${boardLabel(o.board, locale)}, od ${formatMoney(o.pricePerPerson, locale)} za osobu. Ověření dostupnosti online, objednávka nebo dotaz na Telegramu.`,
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
  const summary = `${hotel.name} ${hotel.stars}*, ${formatDateRange(offer.departureDate, offer.returnDate, locale)}, ${offer.nights} ${dict.common.nights}, ${offer.board}`;

  const facts: Array<[string, string]> = [
    [t(tx.dates, locale), formatDateRange(offer.departureDate, offer.returnDate, locale)],
    [t(tx.nights, locale), `${offer.nights} ${dict.common.nights}`],
    [
      t(tx.transport, locale),
      `${transportLabel(offer.transport, locale)}${offer.departureAirport ? `, ${airportLabel(offer.departureAirport, locale)}` : ""}`,
    ],
    [t(tx.board, locale), `${boardLabel(offer.board, locale)} (${offer.board})`],
    [t(tx.room, locale), offer.roomType],
    [t(tx.operator, locale), offer.touroperator],
  ];

  return (
    <>
      <Container className="pt-2 sm:pt-4">
        <div className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-grey sm:col-span-2 sm:aspect-[16/10] sm:rounded-[2.5rem]">
            <Image src={hotel.images[0]} alt={hotel.name} fill priority sizes="(min-width: 640px) 66vw, 100vw" className="object-cover" />
            <div className="absolute left-4 top-4 flex gap-2">
              {offer.isLastMinute && <Pill tone="red">Last minute</Pill>}
              {offer.verified && <Pill tone="white">✓ online</Pill>}
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

      <Container className="grid gap-8 py-10 lg:grid-cols-[minmax(0,1fr)_24rem] lg:gap-10">
        <div className="min-w-0">
          <p className="eyebrow text-ink/75">
            <HotelLocation hotel={hotel} locale={locale} />
          </p>
          <h1 className="mt-2 font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
            {hotel.name} <span className="align-middle text-[0.42em]"><Stars n={hotel.stars} locale={locale} /></span>
          </h1>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <HotelRating hotel={hotel} locale={locale} />
            <Link href={routes.hotel(locale, hotel.id)} className="inline-flex min-h-11 items-center text-sm font-bold underline underline-offset-4 hover:text-red">
              {t(tx.hotel, locale)}
            </Link>
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
            {facts.map(([k, v], i) => (
              <div key={k} className={`rounded-[1.5rem] px-5 py-4 ${i === 0 ? "bg-yellow" : i === 3 ? "bg-ice" : "bg-grey"}`}>
                <dt className="eyebrow text-ink/80">{k}</dt>
                <dd className="mt-1.5 font-semibold leading-snug">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-paper sm:rounded-[2.5rem] sm:p-8">
            <PineapplePattern preset="sparse" opacity={0.35} />
            <div className="relative">
              <p className="eyebrow text-paper/80">{t(tx.priceTitle, locale)}</p>
              {offer.originalPrice && <p className="mt-3 text-paper/75 line-through">{formatMoney(offer.originalPrice, locale)}</p>}
              <p className="mt-1 font-display text-4xl font-black leading-none">{formatMoney(offer.pricePerPerson, locale)}</p>
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
                <p className="text-center text-xs text-paper/80">{t(tx.noPay, locale)}</p>
              </div>
            </div>
          </div>
        </aside>
      </Container>

      {/* "Стоимость тура" (Reference 1): dark photo background with price pill and cards */}
      <Container>
        <section aria-labelledby="price-title" className="relative isolate overflow-hidden rounded-[2rem] bg-ink p-3 sm:rounded-[2.75rem] sm:p-8 lg:p-12">
          <Image src={hotel.images[3] ?? hotel.images[0]} alt="" fill sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-ink/65" />
          <h2 id="price-title" className="px-3 pt-4 font-display text-[clamp(1.8rem,4.2vw,3.4rem)] font-black uppercase leading-none tracking-[-0.03em] text-white sm:px-0 sm:pt-0">
            {t(tx.priceTitle, locale)}
          </h2>
          <div className="mt-6 inline-flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-[2rem] bg-white px-6 py-4 sm:rounded-full sm:px-10 sm:py-6">
            <span className="font-display text-[clamp(2.2rem,6vw,4.8rem)] font-black leading-none tracking-[-0.03em]">{formatMoney(offer.pricePerPerson, locale)}</span>
            <span className="text-lg font-semibold text-ink/80">{dict.common.perPerson}</span>
          </div>
          <div className="mt-4 grid gap-3 sm:gap-4 lg:grid-cols-[1.2fr_1fr]">
            <div className="rounded-[1.75rem] bg-grey p-6 sm:rounded-[2.25rem] sm:p-8">
              <h3 className="font-display text-xl font-extrabold uppercase">{t(tx.included, locale)}</h3>
              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {included(offer, locale).map((item) => (
                  <li key={item} className="flex gap-2.5 text-[0.95rem]">
                    <span aria-hidden className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-yellow ring-2 ring-ink" />
                    {item}
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
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-start gap-3 rounded-[1.5rem] bg-grey p-5">
                <span aria-hidden className="mt-1.5 h-3 w-3 shrink-0 rounded-full bg-red" />
                <p className="text-sm">
                  <strong>{t(tx.noPay, locale)}.</strong> {t(tx.total, locale)}: <strong>{formatMoney(offer.totalPrice, locale)}</strong>
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
