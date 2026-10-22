import Image from "next/image";
import Link from "next/link";
import { ArrowButton, ButtonLink, Container, Eyebrow } from "@/components/ui";
import { destinations } from "@/content/destinations";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";

const C = {
  kicker: { uk: "12 країн", cs: "12 zemí" },
  title: { uk: "Що на вас чекає", cs: "Co vás čeká" },
  lead: {
    uk: "Від Туреччини за 3 години льоту до Мальдів і Занзібару. Вильоти з Праги, Брна, Острави та Пардубиць.",
    cs: "Od Turecka 3 hodiny letu až po Maledivy a Zanzibar. Odlety z Prahy, Brna, Ostravy a Pardubic.",
  },
  all: { uk: "Усі країни", cs: "Všechny destinace" },
};

/** 12 destinations as tall pill columns with a round ↘ button (Reference 1). */
export function Destinations({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Eyebrow>{t(C.kicker, locale)}</Eyebrow>
            <h2 className="mt-3 font-display text-[clamp(2.2rem,6vw,5rem)] font-black uppercase leading-[0.92] tracking-[-0.035em]">{t(C.title, locale)}?</h2>
            <p className="mt-4 text-ink/75">{t(C.lead, locale)}</p>
          </div>
          <ButtonLink href={routes.destinations(locale)} variant="outline">
            {t(C.all, locale)} →
          </ButtonLink>
        </div>

        <ul className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-x-3 sm:gap-y-6 sm:overflow-visible sm:px-0 md:grid-cols-4 lg:grid-cols-6 lg:gap-x-4 lg:pb-10">
          {destinations.map((d, i) => (
            <li key={d.slug} className={`w-[42%] shrink-0 snap-start sm:w-auto ${i % 2 === 1 ? "lg:translate-y-10" : ""}`}>
              <Link href={routes.destination(locale, d.slug)} className="group block text-center">
                <span className="relative isolate flex aspect-[3/5] flex-col items-center justify-between overflow-hidden rounded-full bg-ink px-2 pb-8 pt-3">
                  <Image
                    src={d.heroImage}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 15vw, (min-width: 640px) 30vw, 50vw"
                    className="-z-10 object-cover transition duration-700 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/0" />
                  <ArrowButton label={t(d.name, locale)} size={40} direction="down-right" tone="white" />
                  <span className="font-display text-[clamp(0.8rem,1.15vw,1.05rem)] font-extrabold uppercase leading-tight text-white">
                    <span aria-hidden className="mb-1 block text-xl">{d.flag}</span>
                    {t(d.name, locale)}
                  </span>
                </span>
                <span className="mt-2 line-clamp-2 block px-1 text-xs text-ink/75">{t(d.tagline, locale)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
