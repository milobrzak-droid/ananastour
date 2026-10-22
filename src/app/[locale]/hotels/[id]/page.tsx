import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { TelegramButton } from "@/components/contact/telegram";
import { ArrowButton, Container, Pill } from "@/components/ui";
import { PhotoSlider } from "@/components/tours/photo-slider";
import { DeparturesTable } from "@/components/tours/departures-table";
import { NoResults } from "@/components/tours/help-cards";
import { HotelDistances, HotelLocation, HotelRating, Stars } from "@/components/tours/hotel-bits";
import { countryName } from "@/components/tours/labels";
import { hotelTelegramMessage, searchSummary } from "@/components/tours/messages";
import { site } from "@/config/site";
import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { languageAlternates, routes } from "@/i18n/routes";
import { formatMoney } from "@/lib/format";
import { tours } from "@/lib/tours";
import { parseSearchParams } from "@/lib/tours/query";

type Props = {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const getHotel = cache((id: string) => tours().getHotel(id));

const tx = {
  back: { uk: "← До результатів пошуку", cs: "← Zpět na výsledky" },
  about: { uk: "Про готель", cs: "O hotelu" },
  amenities: { uk: "Зручності", cs: "Vybavení" },
  location: { uk: "Розташування", cs: "Poloha" },
  departures: { uk: "Дати та ціни", cs: "Termíny a ceny" },
  departuresLead: {
    uk: "Ціни за особу. Натисніть на дату — перевіримо наявність онлайн і оформимо бронювання.",
    cs: "Ceny za osobu. Klikněte na termín — ověříme dostupnost online a připravíme objednávku.",
  },
  from: { uk: "від", cs: "od" },
  ctaTitle: { uk: "Була в цьому регіоні — розповім чесно", cs: "V této oblasti jsem byla — řeknu vám to upřímně" },
  ctaText: {
    uk: "Підкажу, які номери кращі, чи підходить готель для дітей і коли там найкраща погода. Напишіть у Telegram.",
    cs: "Poradím, které pokoje jsou lepší, zda je hotel vhodný pro děti a kdy je tam nejlepší počasí. Napište mi na Telegram.",
  },
  ask: { uk: "Запитати про готель", cs: "Zeptat se na hotel" },
  formTitle: { uk: "Або залиште контакт", cs: "Nebo nám nechte kontakt" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, id } = await params;
  if (!isLocale(locale)) return {};
  const hotel = await getHotel(id);
  if (!hotel) return {};
  const where = `${hotel.region}, ${countryName(hotel.countrySlug, locale, hotel.country)}`;
  return {
    title: `${hotel.name} ${hotel.stars}* — ${where}`,
    description: t(
      {
        uk: `${hotel.name} ${hotel.stars}*, ${where}: фото, зручності, дати та ціни турів з Чехії. Консультація в Telegram.`,
        cs: `${hotel.name} ${hotel.stars}*, ${where}: fotky, vybavení, termíny a ceny zájezdů z Česka. Poradíme na Telegramu.`,
      },
      locale,
    ),
    alternates: { canonical: routes.hotel(locale, hotel.id), languages: languageAlternates((l) => routes.hotel(l, hotel.id)) },
    openGraph: { images: hotel.images.slice(0, 1) },
  };
}

export default async function HotelPage({ params, searchParams }: Props) {
  const { locale: raw, id } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const hotel = await getHotel(id);
  if (!hotel) notFound();

  const sp = parseSearchParams(await searchParams);
  const offers = await tours().getHotelOffers(hotel.id, sp);
  const cheapest = offers.reduce<(typeof offers)[number] | undefined>(
    (min, o) => (!min || o.pricePerPerson.amount < min.pricePerPerson.amount ? o : min),
    undefined,
  );
  const dict = getDictionary(locale);
  const tgMessage = hotelTelegramMessage(hotel, locale);

  return (
    <>
      <Container className="pt-2 sm:pt-4">
        <Link href={routes.tours(locale, `destination=${hotel.countrySlug}`)} className="inline-flex min-h-11 items-center text-sm font-bold text-ink/80 hover:text-ink">
          {t(tx.back, locale)}
        </Link>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-4xl">
            <p className="eyebrow text-ink/75">
              <HotelLocation hotel={hotel} locale={locale} />
            </p>
            <h1 className="mt-2 font-display text-[clamp(2rem,5vw,4.2rem)] font-black uppercase leading-[0.95] tracking-[-0.035em]">
              {hotel.name} <span className="align-middle text-[0.42em]"><Stars n={hotel.stars} locale={locale} /></span>
            </h1>
            <div className="mt-4">
              <HotelRating hotel={hotel} locale={locale} />
            </div>
          </div>
          {cheapest && (
            <a href="#departures" className="group flex items-center gap-4 rounded-full bg-white py-2 pl-6 pr-2 shadow-sm ring-1 ring-ink/5">
              <span>
                <span className="block text-xs font-bold uppercase tracking-widest text-ink/75">{t(tx.from, locale)}</span>
                <span className="font-display text-2xl font-black leading-none sm:text-3xl">{formatMoney(cheapest.pricePerPerson, locale)}</span>
                <span className="ml-1 text-sm text-ink/75">{dict.common.perPerson}</span>
              </span>
              <ArrowButton label={t(tx.departures, locale)} size={52} direction="down-right" />
            </a>
          )}
        </div>
      </Container>

      <div className="mt-6 pl-3 sm:pl-6 lg:pl-10">
        <PhotoSlider
          images={hotel.images}
          alt={hotel.name}
          priority
          prevLabel={t({ uk: "Попереднє фото", cs: "Předchozí fotka" }, locale)}
          nextLabel={t({ uk: "Наступне фото", cs: "Další fotka" }, locale)}
        />
      </div>

      <Container className="grid gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 space-y-10">
          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {hotel.description && (
              <section className="rounded-[2rem] bg-grey p-6 sm:col-span-2 sm:rounded-[2.5rem] sm:p-9">
                <h2 className="font-display text-2xl font-black uppercase">{t(tx.about, locale)}</h2>
                {/* TODO(anchoice): description comes in the provider's language; request uk/cs texts. */}
                <p className="mt-3 whitespace-pre-line leading-relaxed text-ink/85">{hotel.description}</p>
              </section>
            )}
            {hotel.amenities.length > 0 && (
              <section className="rounded-[2rem] bg-ice p-6 sm:rounded-[2.5rem] sm:p-8">
                <h2 className="font-display text-lg font-extrabold uppercase">{t(tx.amenities, locale)}</h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {hotel.amenities.map((a) => (
                    <li key={a}>
                      <Pill tone="white">{a}</Pill>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {hotel.distances && (
              <section className="rounded-[2rem] bg-yellow p-6 sm:rounded-[2.5rem] sm:p-8">
                <h2 className="mb-4 font-display text-lg font-extrabold uppercase">{t(tx.location, locale)}</h2>
                <HotelDistances hotel={hotel} locale={locale} />
              </section>
            )}
          </div>

          <section id="departures" className="scroll-mt-24">
            <h2 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-black uppercase leading-none tracking-[-0.03em]">{t(tx.departures, locale)}</h2>
            <p className="mb-6 mt-3 text-sm text-ink/80">
              {t(tx.departuresLead, locale)} {searchSummary(sp, locale)}
            </p>
            {offers.length > 0 ? (
              <DeparturesTable offers={offers} locale={locale} />
            ) : (
              <NoResults locale={locale} message={tgMessage} source="hotel-empty" />
            )}
          </section>
        </div>

        <aside className="space-y-3 lg:sticky lg:top-24 lg:self-start">
          <div className="relative overflow-hidden rounded-[2rem] bg-charcoal p-7 text-white sm:rounded-[2.5rem]">
            <p className="font-display text-xl font-extrabold leading-snug">{t(tx.ctaTitle, locale)}</p>
            <p className="mt-3 text-sm text-white/85">{t(tx.ctaText, locale)}</p>
            <TelegramButton locale={locale} source="hotel-sidebar" message={tgMessage} label={t(tx.ask, locale)} className="mt-6 w-full" />
            <p className="mt-3 text-center text-xs text-white/80">@{site.contact.telegramUsername}</p>
          </div>
          <InquiryForm
            locale={locale}
            kind="pick-tour"
            context={`${hotel.name} ${hotel.stars}*, ${hotel.region}`}
            fields={["dates", "travellers", "message"]}
            source="hotel-form"
            variant="light"
            title={t(tx.formTitle, locale)}
          />
        </aside>
      </Container>
    </>
  );
}
