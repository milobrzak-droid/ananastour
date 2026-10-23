import Image from "next/image";
import Link from "next/link";
import { TelegramButton } from "@/components/contact/telegram";
import { Stars } from "@/components/tours/hotel-bits";
import { countryName } from "@/components/tours/labels";
import { ArrowButton, Container, Eyebrow } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { formatMoney } from "@/lib/format";
import type { OfferWithHotel } from "@/lib/tours/types";
import { fitLongestWord, glue, leadingFor } from "./typo";

const C = {
  kicker: { uk: "Раджу без вагань", cs: "Doporučuju bez váhání" },
  // TODO(client): no "I checked these personally" claim until Aljona confirms which hotels she has seen.
  title: { uk: "Вибір Альони", cs: "Aljonin výběr" },
  lead: {
    uk: "Готелі, які я раджу цього сезону. Спитайте чому — розкажу, кому там буде добре, який пляж і за що не варто переплачувати.",
    cs: "Hotely, které tuhle sezónu doporučuju. Zeptejte se proč – řeknu vám, komu tam bude dobře, jaká je pláž a za co nemá smysl připlácet.",
  },
  ask: { uk: "Чому саме ці?", cs: "Proč zrovna tyhle?" },
  askMsg: {
    uk: "Добрий день, Альоно! Чому ви радите саме ці готелі? Хочу щось схоже.\nКоли: …\nСкільки нас: …",
    cs: "Dobrý den, Aljono! Proč doporučujete zrovna tyhle hotely? Chci něco podobného.\nKdy: …\nKolik nás je: …",
  },
  from: { uk: "від", cs: "od" },
};

/** Wide tall photo card with a navy text box at the bottom (Reference 1 "What awaits you?"). */
function WideCard({ offer, locale }: { offer: OfferWithHotel; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Link
      href={routes.offer(locale, offer.id)}
      className="group relative isolate block min-h-[26rem] overflow-hidden rounded-[2rem] bg-ink sm:min-h-[34rem] sm:rounded-[2.5rem]"
    >
      {/* Below the fold on the home page — no priority, lazy-load like the rest. */}
      <Image src={offer.hotel.images[0]} alt="" fill sizes="(min-width: 1024px) 55vw, 100vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
      <span className="absolute right-4 top-4">
        <ArrowButton label={offer.hotel.name} size={52} direction="down-right" tone="white" />
      </span>
      <div className="@container absolute inset-x-3 bottom-3 rounded-[1.6rem] bg-ink p-5 text-white sm:inset-x-auto sm:left-4 sm:w-[28rem] sm:max-w-[calc(100%-2rem)] sm:p-7 sm:pb-6">
        <p className="eyebrow text-white/80">
          {countryName(offer.hotel.countrySlug, locale, offer.hotel.country)} · {offer.hotel.region}
        </p>
        <h3
          className="mt-2 font-display text-[clamp(1rem,var(--fit),1.5rem)] font-extrabold uppercase leading-tight [overflow-wrap:break-word] sm:text-[clamp(1rem,var(--fit),1.875rem)]"
          style={fitLongestWord(offer.hotel.name)}
        >
          {offer.hotel.name} <Stars n={offer.hotel.stars} locale={locale} tone="dark" />
        </h3>
        <p className="mt-3 text-white/85">
          {t(C.from, locale)} <span className="font-display text-xl font-extrabold text-yellow">{formatMoney(offer.pricePerPerson, locale)}</span>{" "}
          {dict.common.perPerson}
        </p>
      </div>
    </Link>
  );
}

/** Narrow tall pill column with a round ↘ button at the top. */
function PillColumn({ offer, locale }: { offer: OfferWithHotel; locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <Link
      href={routes.offer(locale, offer.id)}
      className="@container group relative isolate flex min-h-[22rem] flex-col items-center justify-between overflow-hidden rounded-[999px] bg-ink px-3 pb-10 pt-4 text-center text-white sm:min-h-[34rem]"
    >
      <Image src={offer.hotel.images[0]} alt="" fill sizes="(min-width: 1024px) 18vw, 50vw" className="-z-10 object-cover transition duration-700 group-hover:scale-110" />
      <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/30 to-ink/0" />
      <ArrowButton label={offer.hotel.name} size={48} direction="down-right" tone="white" />
      <span>
        {/* Long proper names ("INTERCONTINENTAL DANANG…") shrink to the pill instead of splitting mid-word. */}
        <span
          className="block font-display text-[clamp(0.6rem,var(--fit),0.95rem)] font-extrabold uppercase leading-tight [overflow-wrap:break-word] lg:text-[clamp(0.6rem,var(--fit),1rem)]"
          style={fitLongestWord(offer.hotel.name)}
        >
          {offer.hotel.name}
        </span>
        <span className="mt-1 block text-xs font-semibold uppercase tracking-widest text-white/85">{countryName(offer.hotel.countrySlug, locale, offer.hotel.country)}</span>
        <span className="mt-3 inline-block shape-pill bg-yellow px-3 py-1 text-sm font-bold text-ink">
          {formatMoney(offer.pricePerPerson, locale)}
          <span className="sr-only"> {dict.common.perPerson}</span>
        </span>
      </span>
    </Link>
  );
}

export function Featured({ offers, locale }: { offers: OfferWithHotel[]; locale: Locale }) {
  const [first, ...rest] = offers.slice(0, 4);
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-3xl">
            <Eyebrow>{t(C.kicker, locale)}</Eyebrow>
            <h2 className={`mt-3 text-balance font-display text-[clamp(2rem,4.4vw,3.6rem)] font-black uppercase tracking-[-0.03em] ${leadingFor(t(C.title, locale))}`}>
              {t(C.title, locale)}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-ink/75">{glue(t(C.lead, locale))}</p>
          </div>
          <TelegramButton locale={locale} source="home-featured" label={t(C.ask, locale)} message={t(C.askMsg, locale)} />
        </div>

        {first && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
            <div className="col-span-2">
              <WideCard offer={first} locale={locale} />
            </div>
            {rest.map((o, i) => (
              <div key={o.id} className={i === 2 ? "hidden lg:block" : ""}>
                <PillColumn offer={o} locale={locale} />
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
