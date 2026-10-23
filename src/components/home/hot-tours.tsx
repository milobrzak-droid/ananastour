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
import { glue, leadingFor } from "./typo";

const C = {
  kicker: { uk: "Гарячі тури з Чехії", cs: "Last minute z Česka" },
  title: { uk: "Ще гаряче", cs: "Ještě žhavé" },
  lead: {
    uk: "Найближчі вильоти. Такі ціни живуть недовго, тож кожну я перевіряю в туроператора ще до бронювання.",
    cs: "Odlety v nejbližších dnech. Takové ceny dlouho nevydrží, proto každou ještě před rezervací ověřím u CK.",
  },
  // Stamp reads as one sentence: "Suitcase / in one evening / and off to the sea". No percentages here.
  stampTop: { uk: "LAST MINUTE • З ЧЕХІЇ", cs: "LAST MINUTE • Z ČESKA" },
  discount: { uk: "Валіза", cs: "Kufr" },
  stampWord: { uk: "ЗА ВЕЧІР", cs: "ZA VEČER" },
  discountNote: { uk: "і на море", cs: "a k moři" },
  all: { uk: "Усі гарячі тури", cs: "Všechny last minute" },
  nearest: { uk: "Найближчі вильоти", cs: "Nejbližší odlety" },
  verified: { uk: "Ціну перевірено", cs: "Cena ověřena" },
  // Shown when the price is not verified yet — an honest status, not a scarcity claim.
  few: { uk: "Ціну перевірю", cs: "Cenu ověřím" },
  open: { uk: "Деталі туру", cs: "Detail zájezdu" },
  empty: {
    uk: "Гарячі тури розібрали швидше, ніж сайт устиг їх показати. Напишіть — я надішлю свіжі.",
    cs: "Žhavé nabídky zmizely dřív, než je web stihl ukázat. Napište mi a pošlu vám čerstvé.",
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
      {/* One table row from lg; below that (tablets too) each offer stacks, so names and dates keep their room. */}
      <ul className="divide-y divide-ink/10">
        {offers.map((o) => (
          <li
            key={o.id}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 gap-y-2 px-3 py-4 sm:px-2 lg:grid-cols-[minmax(0,2fr)_auto_minmax(9rem,1.1fr)_minmax(8.5rem,auto)_auto] lg:py-5"
          >
            <Link href={routes.offer(locale, o.id)} className="min-w-0 hover:underline">
              {/* The row has room for two lines, so a long hotel name shows in full instead of "Aldemar Knossos R…". */}
              <span className="block text-balance font-display text-base font-bold sm:text-lg lg:line-clamp-2 lg:text-base xl:text-lg">{o.hotel.name}</span>
              {/* Stacked rows (below lg) have room: the place wraps after "· " instead of "Maledivy · Atol Dh…".
                  Only the dense one-line table row at lg keeps the ellipsis. */}
              <span className="block text-pretty text-sm text-ink/75 lg:truncate">
                {countryName(o.hotel.countrySlug, locale, o.hotel.country)}
                {" · "}
                {o.hotel.region}
              </span>
            </Link>
            <span className="row-span-3 self-center lg:order-last lg:row-span-1">
              <ArrowButton href={routes.offer(locale, o.id)} label={`${t(C.open, locale)}: ${o.hotel.name}`} size={48} />
            </span>
            <span>
              {o.verified ? <Pill tone="ice">{t(C.verified, locale)}</Pill> : <Pill tone="red">{t(C.few, locale)}</Pill>}
            </span>
            {/* Date, nights and airport each stay whole; the line may only break after a "· ". */}
            <span className="min-w-0 text-sm font-semibold">
              <span className="whitespace-nowrap">{formatDate(o.departureDate, locale)}</span>
              <span className="font-normal text-ink/75">
                {"\u00A0· "}
                <span className="whitespace-nowrap">
                  {o.nights} {dict.common.nights}
                </span>
                {o.departureAirport ? (
                  <>
                    {"\u00A0· "}
                    <span className="whitespace-nowrap">{o.departureAirport}</span>
                  </>
                ) : null}
              </span>
            </span>
            <span className="whitespace-nowrap font-display text-lg font-extrabold lg:text-right">{formatMoney(o.pricePerPerson, locale)}</span>
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
              <Eyebrow>{t(C.kicker, locale)}</Eyebrow>
              <h2 className={`mt-3 text-balance font-display text-[clamp(2rem,4.4vw,3.6rem)] font-black uppercase tracking-[-0.03em] ${leadingFor(t(C.title, locale))}`}>
                {t(C.title, locale)}
              </h2>
              <p className="mt-4 text-pretty text-ink/75">{glue(t(C.lead, locale))}</p>
            </div>
            <Stamp
              size={190}
              top={t(C.stampTop, locale)}
              bottom="ANANAS TOUR"
              above={[t(C.discount, locale).toUpperCase()]}
              word={t(C.stampWord, locale)}
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
            {/* The arrow is glued to the last word (NBSP); under 360px the button is a step smaller so it stays on one line. */}
            <ButtonLink href={routes.hot(locale)} variant="primary" className="px-8 py-4 text-lg max-[359px]:px-5 max-[359px]:text-base">
              {t(C.all, locale)}
              {" →"}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
