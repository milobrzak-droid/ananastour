import Link from "next/link";
import { Stamp } from "@/components/brand/pineapple";
import { countryName } from "@/components/tours/labels";
import { OfferCard } from "@/components/tours/offer-card";
import { ArrowButton, ButtonLink, Container, Eyebrow, Pill } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatDate, formatMoney } from "@/lib/format";
import type { OfferWithHotel } from "@/lib/tours/types";

const C = {
  kicker: { uk: "Last minute", cs: "Last minute" },
  title: { uk: "Гарячі тури: встигніть схопити!", cs: "Last minute: stihněte to!" },
  lead: {
    uk: "Найближчі вильоти з Чехії за неймовірними цінами. Валіза вже зібрана?",
    cs: "Nejbližší odlety z Česka za neuvěřitelné ceny. Kufr už je sbalený?",
  },
  discount: { uk: "Знижки до", cs: "Slevy až" },
  discountNote: { uk: "на популярні напрямки", cs: "na oblíbené destinace" },
  all: { uk: "Усі гарячі тури", cs: "Všechny last minute" },
  nearest: { uk: "Найближчі вильоти", cs: "Nejbližší odlety" },
  verified: { uk: "Ціна перевірена", cs: "Cena ověřena" },
  few: { uk: "Мало місць", cs: "Poslední místa" },
  open: { uk: "Відкрити", cs: "Otevřít" },
  empty: {
    uk: "Зараз підбираємо нові гарячі пропозиції — напишіть, і я надішлю актуальні.",
    cs: "Právě vybíráme nové nabídky — napište mi a pošlu aktuální.",
  },
};

/** Reference 1 "nearest dates" table: bold name, status pill, dates, yellow arrow. */
function NearestTable({ offers, locale }: { offers: OfferWithHotel[]; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <div className="mt-12 rounded-[2rem] bg-white p-3 sm:rounded-[2.5rem] sm:p-6 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-3 px-3 pb-3 pt-2 sm:px-2">
        <h3 className="font-display text-2xl font-extrabold uppercase sm:text-3xl">{t(C.nearest, locale)}</h3>
        <span className="text-sm text-ink/75">{dict.common.perPerson.replace(/^\/\s*/, "")}</span>
      </div>
      <ul className="divide-y divide-ink/10">
        {offers.map((o) => (
          <li
            key={o.id}
            className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 px-3 py-4 sm:px-2 md:grid-cols-[minmax(0,2.2fr)_9rem_minmax(0,1.1fr)_8rem_auto] md:py-5"
          >
            <Link href={routes.offer(locale, o.id)} className="min-w-0 hover:underline">
              <span className="block truncate font-display text-base font-bold sm:text-lg">{o.hotel.name}</span>
              <span className="block truncate text-sm text-ink/75">
                {countryName(o.hotel.countrySlug, locale, o.hotel.country)} · {o.hotel.region}
              </span>
            </Link>
            <span className="row-span-3 self-center md:order-last md:row-span-1">
              <ArrowButton href={routes.offer(locale, o.id)} label={`${t(C.open, locale)}: ${o.hotel.name}`} size={48} />
            </span>
            <span>
              {o.verified ? <Pill tone="ice">{t(C.verified, locale)}</Pill> : <Pill tone="red">{t(C.few, locale)}</Pill>}
            </span>
            <span className="text-sm font-semibold">
              {formatDate(o.departureDate, locale)}
              <span className="font-normal text-ink/75">
                {" "}
                · {o.nights} {dict.common.nights}
                {o.departureAirport ? ` · ${o.departureAirport}` : ""}
              </span>
            </span>
            <span className="font-display text-lg font-extrabold md:text-right">{formatMoney(o.pricePerPerson, locale)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HotTours({ offers, locale }: { offers: OfferWithHotel[]; locale: Locale }) {
  const cards = offers.slice(0, 6);
  const table = offers.slice(6, 11);
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="rounded-[2rem] bg-grey px-3 py-8 sm:rounded-[2.75rem] sm:px-8 sm:py-12 lg:px-12">
          <div className="mb-10 grid gap-6 px-2 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="max-w-3xl">
              <Eyebrow>🔥 {t(C.kicker, locale)}</Eyebrow>
              <h2 className="mt-3 font-display text-[clamp(2rem,4.4vw,3.6rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
                {t(C.title, locale)}
              </h2>
              <p className="mt-4 text-ink/75">{t(C.lead, locale)}</p>
            </div>
            <Stamp
              size={190}
              top="LAST MINUTE • HOT TOURS"
              bottom="ANANAS TOUR"
              above={[t(C.discount, locale).toUpperCase()]}
              word="−40%"
              below={[t(C.discountNote, locale).toUpperCase()]}
              className="hidden -rotate-6 sm:block"
            />
          </div>

          {cards.length > 0 ? (
            <div className="relative -mx-3 flex snap-x snap-mandatory gap-3 overflow-x-auto px-3 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 lg:grid-cols-3 [&>*]:w-[84%] [&>*]:shrink-0 [&>*]:snap-start sm:[&>*]:w-auto">
              {cards.map((o) => (
                <OfferCard key={o.id} offer={o} locale={locale} source="home-hot" />
              ))}
            </div>
          ) : (
            <p className="px-2 text-ink/75">{t(C.empty, locale)}</p>
          )}

          {table.length > 0 && <NearestTable offers={table} locale={locale} />}

          <div className="mt-10 flex justify-center">
            <ButtonLink href={routes.hot(locale)} variant="primary" className="px-8 py-4 text-lg">
              {t(C.all, locale)} →
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
