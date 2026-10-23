import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { TelegramCta } from "@/components/content/telegram-cta";
import { typeset } from "@/components/content/typeset";
import { ArrowButton, Container } from "@/components/ui";
import { destinations } from "@/content/destinations";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";

const copy = {
  title: { uk: "12 країн. Одна Альона.", cs: "12 zemí. Jedna Aljona." },
  metaTitle: { uk: "Куди полетіти з Чехії: 12 країн", cs: "Kam letět z Česka: 12 zemí" },
  lead: {
    uk: "Куди я відправляю туристів із Чехії і що про кожну країну варто знати до вильоту: сезон, переліт, гроші, документи.",
    cs: "Kam posílám klienty z Česka a co o každé zemi vědět před odletem: sezóna, let, peníze, doklady.",
  },
  metaDescription: {
    uk: "Туреччина, Єгипет, Греція, Мальдіви, Балі й ще 7 країн, куди летять із Чехії: коли їхати, що з грошима й документами. Альона підбере 3 готелі в Telegram.",
    cs: "Turecko, Egypt, Řecko, Maledivy, Bali a dalších 7 zemí, kam se z Česka létá: kdy jet a jak to chodí s penězi i doklady. Aljona vám vybere 3 hotely.",
  },
  badge: { uk: "КРАЇН З МОРЕМ • ВИЛЬОТИ З ЧЕХІЇ • ", cs: "ZEMÍ S MOŘEM • ODLETY Z ČESKA • " },
  season: { uk: "Сезон", cs: "Sezóna" },
  open: { uk: "Путівник", cs: "Průvodce" },
  ctaTitle: { uk: "Не знаєте, куди?", cs: "Nevíte kam?" },
  ctaText: {
    uk: "Ідеальний момент написати. Скажіть, коли хочете поїхати й скільки вас, — підкажу, де в ці дати тепле море, і надішлю 3 готелі.",
    cs: "Ideální chvíle napsat. Řekněte mi, kdy chcete jet a kolik vás je – poradím, kde bude v tu dobu teplé moře, a pošlu 3 hotely.",
  },
  ctaMessage: {
    uk: "Добрий день, Альоно! Ще не знаю, куди поїхати.\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: …",
    cs: "Dobrý den, Aljono! Ještě nevím, kam jet.\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: …",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(copy.metaTitle, locale),
    description: t(copy.metaDescription, locale),
    alternates: { canonical: routes.destinations(locale), languages: languageAlternates(routes.destinations) },
  };
}

export default async function DestinationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const [a, b, c] = destinations;
  // Card names are sized to the card (container query), budgeted for the longest name in this locale,
  // so ДОМІНІКАНА / DOMINIKÁNA never touch the rounded edge (Unbounded is ~0.86 em per capital).
  const longestName = Math.max(...destinations.map((d) => t(d.name, locale).length));

  return (
    <>
      {/* Hero: grey panel with giant title + three pill photo columns (Reference 1) */}
      <section className="pb-6 pt-2 sm:pt-4">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-grey px-5 py-10 sm:rounded-[2.5rem] sm:px-10 sm:py-12 lg:px-14">
            {/* Below lg the text sits on top of the panel: the pattern is masked there (fades in from 60% down,
                behind the photo pills), so no slice lands on "АЛЬОНА." or the lead. */}
            <PineapplePattern
              preset="section"
              opacity={0.9}
              className="-z-10 max-lg:[mask-image:linear-gradient(to_bottom,transparent_0,transparent_60%,black_75%)]"
            />
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
              <div className="min-w-0">
                {/* Phones: also capped by the longest word (АЛЬОНА. ≈ 5.8 em) in the panel (100vw − 5.5rem), so it fits at 320 px. */}
                <h1 className="font-display text-[length:min(max(3rem,10vw),calc((100vw_-_5.5rem)/6),8rem)] font-black uppercase leading-[0.88] tracking-[-0.045em] lg:text-[clamp(3rem,6.5vw,7rem)]">{t(copy.title, locale)}</h1>
                <p className="mt-6 max-w-xl text-pretty text-lg text-ink/80">{typeset(t(copy.lead, locale))}</p>
                <div className="mt-6 flex flex-wrap gap-2 text-2xl" aria-hidden>
                  {destinations.map((d) => (
                    <span key={d.slug}>{d.flag}</span>
                  ))}
                </div>
              </div>
              <div className="relative grid grid-cols-3 gap-3">
                {[a, b, c].map((d, i) => (
                  <Link
                    key={d.slug}
                    href={routes.destination(locale, d.slug)}
                    className={`@container relative isolate flex aspect-[2/5] min-w-0 items-end justify-center overflow-hidden rounded-full bg-ink pb-8 text-center ${i === 1 ? "translate-y-8" : ""}`}
                  >
                    <Image src={d.heroImage} alt="" fill sizes="(min-width: 1024px) 14vw, 30vw" className="-z-10 object-cover" priority={i === 0} />
                    <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/90 via-ink/45 via-55% to-ink/5" />
                    {/* Name runs up the pill like a book spine: sized to the pill width, so any name fits at any viewport. */}
                    <span className="rotate-180 whitespace-nowrap font-display text-[clamp(0.75rem,17cqw,1.5rem)] font-extrabold uppercase leading-[1.15] tracking-[0.02em] text-white [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] [writing-mode:vertical-rl]">
                      {t(d.name, locale)}
                    </span>
                  </Link>
                ))}
                <div className="absolute -left-6 -top-6 hidden sm:block lg:-left-10 lg:-top-10">
                  <CircleBadge size={130} text={t(copy.badge, locale)} center={<span className="font-display text-3xl font-black">12</span>} className="rounded-full bg-yellow" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Grid of tall pill cards */}
      <section className="pb-8">
        <Container>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 lg:gap-x-6">
            {destinations.map((d, i) => (
              // Stagger only in the 4-column grid, where the shifted columns stay the same from row to row.
              <li key={d.slug} className={i % 2 === 1 ? "lg:translate-y-8" : ""}>
                <Link href={routes.destination(locale, d.slug)} className="group block">
                  <div className="@container relative aspect-[3/5] overflow-hidden rounded-full bg-grey">
                    <Image
                      src={d.heroImage}
                      alt={t(d.name, locale)}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/70 via-55% to-ink/10" />
                    {/* Padding scales with the pill (≈9cqi a side, bottom 13cqi): on wide desktop pills the season sits in the
                        bottom semicircle and stays clear of the curve; on the 130px pill at 320 it sits above the curve, so
                        the sides can tighten and the whole stack still fits the pill's height. */}
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-[max(0.5rem,calc(9cqi_-_0.25rem))] pb-[clamp(1rem,13cqi,2.5rem)] text-center text-paper [text-shadow:0_1px_8px_rgb(0_0_0/0.35)]">
                      <span className="text-3xl" aria-hidden>
                        {d.flag}
                      </span>
                      <h2
                        className="mt-1 whitespace-nowrap font-display font-extrabold uppercase leading-tight"
                        style={{ fontSize: `clamp(0.85rem, calc((100cqi - max(2rem, 18cqi)) / ${(longestName * 0.9).toFixed(2)}), 1.5rem)` }}
                      >
                        {t(d.name, locale)}
                      </h2>
                      {/* The value is an inline-block: a range like "listopad–duben" (glued in the copy) drops below the
                          label as one piece; a long value still wraps inside it, balanced. The size follows the pill below
                          ~156px, so the widest glued range ("червень–вересень;" ≈ 10 em) fits the 320px pill. */}
                      <p className="mt-1 text-balance text-[length:clamp(0.6875rem,8.2cqi,0.8rem)] leading-snug text-paper">
                        {t(copy.season, locale)}: <span className="inline-block">{typeset(t(d.bestSeason, locale))}</span>
                      </p>
                      <span className="mt-[clamp(0.5rem,8cqi,1rem)]">
                        <ArrowButton label={`${t(copy.open, locale)}: ${t(d.name, locale)}`} size={44} />
                      </span>
                    </div>
                  </div>
                  <p className="mt-3 px-2 text-center text-sm text-ink/80">{t(d.teaser, locale)}</p>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <TelegramCta
        locale={locale}
        source="destinations-index"
        title={t(copy.ctaTitle, locale)}
        text={t(copy.ctaText, locale)}
        message={t(copy.ctaMessage, locale)}
      />
    </>
  );
}
