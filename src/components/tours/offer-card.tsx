import Image from "next/image";
import Link from "next/link";
import { TelegramButton } from "@/components/contact/telegram";
import { Pill } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatDateRange, formatMoney } from "@/lib/format";
import type { OfferWithHotel } from "@/lib/tours/types";
import { site } from "@/config/site";

/** Pre-filled Telegram message describing one offer. */
export function offerTelegramMessage(offer: OfferWithHotel, locale: Locale): string {
  const dict = getDictionary(locale);
  return [
    dict.contact.prefillTour,
    `${offer.hotel.name} ${"★".repeat(offer.hotel.stars)}, ${offer.hotel.region}`,
    `${formatDateRange(offer.departureDate, offer.returnDate, locale)} (${offer.nights} ${dict.common.nights}), ${offer.board}`,
    `${formatMoney(offer.totalPrice, locale)}`,
    `${site.url}${routes.offer(locale, offer.id)}`,
  ].join("\n");
}

export function OfferCard({ offer, locale, source = "offer-card" }: { offer: OfferWithHotel; locale: Locale; source?: string }) {
  const dict = getDictionary(locale);
  const href = routes.offer(locale, offer.id);
  return (
    <article className="group flex flex-col overflow-hidden shape-card bg-white ring-1 ring-ink/5 transition hover:shadow-lg">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden">
        <Image
          src={offer.hotel.images[0]}
          alt={offer.hotel.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          {offer.isLastMinute && <Pill tone="red">Last minute</Pill>}
          {offer.verified && <Pill tone="ice">✓ online</Pill>}
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs uppercase tracking-wider text-ink/60">
          {offer.hotel.country} · {offer.hotel.region}
        </p>
        <h3 className="font-display text-lg font-bold leading-tight">
          <Link href={href}>{offer.hotel.name}</Link>{" "}
          <span className="text-yellow">{"★".repeat(offer.hotel.stars)}</span>
        </h3>
        <p className="text-sm text-ink/70">
          {formatDateRange(offer.departureDate, offer.returnDate, locale)} · {offer.nights} {dict.common.nights} · {offer.board}
        </p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <div>
            {offer.originalPrice && (
              <p className="text-sm text-ink/50 line-through">{formatMoney(offer.originalPrice, locale)}</p>
            )}
            <p className="font-display text-2xl font-extrabold">
              {formatMoney(offer.pricePerPerson, locale)}
              <span className="ml-1 text-sm font-normal text-ink/60">{dict.common.perPerson}</span>
            </p>
          </div>
        </div>
        <TelegramButton
          locale={locale}
          source={source}
          size="sm"
          message={offerTelegramMessage(offer, locale)}
          label={dict.contact.askAboutTour}
          className="mt-2 w-full"
        />
      </div>
    </article>
  );
}
