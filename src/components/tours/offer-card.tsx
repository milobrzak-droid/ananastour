import Image from "next/image";
import Link from "next/link";
import { TelegramButton } from "@/components/contact/telegram";
import { ArrowButton, Pill } from "@/components/ui";
import { Stars } from "@/components/tours/hotel-bits";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatDateRange, formatMoney } from "@/lib/format";
import type { OfferWithHotel } from "@/lib/tours/types";
import { site } from "@/config/site";
import { t } from "@/i18n/config";
import { boardLabel, countryName, dateRangeLabel, regionLabel } from "@/components/tours/labels";

const pills = {
  lastMinute: { uk: "Гарячий тур", cs: "Last minute" },
  verified: { uk: "✓ Ціну перевірено", cs: "✓ Cena ověřena" },
};

/** Pre-filled Telegram message describing one offer. */
export function offerTelegramMessage(offer: OfferWithHotel, locale: Locale): string {
  const dict = getDictionary(locale);
  return [
    dict.contact.prefillTour,
    `${offer.hotel.name} ${"★".repeat(offer.hotel.stars)}, ${offer.hotel.region}`,
    `${formatDateRange(offer.departureDate, offer.returnDate, locale)} (${offer.nights} ${dict.common.nights}), ${boardLabel(offer.board, locale)}`,
    `${formatMoney(offer.totalPrice, locale)}`,
    `${site.url}${routes.offer(locale, offer.id)}`,
  ].join("\n");
}

export function OfferCard({ offer, locale, source = "offer-card" }: { offer: OfferWithHotel; locale: Locale; source?: string }) {
  const dict = getDictionary(locale);
  const href = routes.offer(locale, offer.id);
  return (
    <article className="group relative flex flex-col rounded-[2rem] bg-white p-2 shadow-[0_1px_0_rgba(30,34,53,0.06)] transition hover:shadow-[0_24px_50px_-28px_rgba(30,34,53,0.45)]">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-grey" tabIndex={-1} aria-hidden>
        <Image
          src={offer.hotel.images[0]}
          alt=""
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 85vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {offer.isLastMinute && <Pill tone="red">{t(pills.lastMinute, locale)}</Pill>}
          {offer.verified && <Pill tone="white">{t(pills.verified, locale)}</Pill>}
        </div>
        <span className="absolute bottom-3 right-3">
          <ArrowButton label={offer.hotel.name} size={44} direction="up-right" />
        </span>
      </Link>
      {/* @container: the Telegram button below tightens to the card's width, not the viewport. */}
      <div className="@container flex flex-1 flex-col gap-1.5 px-3 pb-3 pt-4">
        <p className="eyebrow text-ink/75">
          {countryName(offer.hotel.countrySlug, locale, offer.hotel.country)} · {regionLabel(offer.hotel.region, locale)}
        </p>
        <h3 className="font-display text-lg font-bold leading-tight">
          <Link href={href} className="hover:underline">
            {offer.hotel.name}
          </Link>{" "}
          <Stars n={offer.hotel.stars} locale={locale} />
        </h3>
        {/* Breaks only after a " · " separator: the date, "10 nocí" and the board label stay whole. */}
        <p className="text-sm text-ink/75">
          {dateRangeLabel(offer.departureDate, offer.returnDate, locale)}
          {" · "}
          <span className="whitespace-nowrap">
            {offer.nights} {dict.common.nights}
          </span>
          {" · "}
          <span className="whitespace-nowrap">{boardLabel(offer.board, locale)}</span>
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          {/* "/ за особу" drops under the price when a narrow card can't fit both on one line. */}
          <p className="flex min-w-0 flex-wrap items-baseline gap-x-1.5 gap-y-1 font-display text-2xl font-extrabold leading-none">
            {offer.originalPrice && (
              <span className="mb-1 basis-full text-sm font-semibold text-ink/70 line-through">{formatMoney(offer.originalPrice, locale)}</span>
            )}
            <span className="whitespace-nowrap">{formatMoney(offer.pricePerPerson, locale)}</span>
            <span className="whitespace-nowrap font-sans text-sm font-medium text-ink/75">{dict.common.perPerson}</span>
          </p>
        </div>
        <TelegramButton
          locale={locale}
          source={source}
          size="sm"
          message={offerTelegramMessage(offer, locale)}
          label={dict.contact.askAboutTour}
          // In a card narrower than 11.5rem (home carousel on a 320px phone) the pill tightens its gap, right
          // padding and type a step, so «Запитати Альону» / „Zeptat se Aljony“ stays on one line.
          className="mt-3 w-full @max-[11.5rem]:gap-1 @max-[11.5rem]:pr-2.5 @max-[11.5rem]:text-[0.8125rem]"
        />
      </div>
    </article>
  );
}
