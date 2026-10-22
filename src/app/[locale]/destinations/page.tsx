import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { TelegramCta } from "@/components/content/telegram-cta";
import { ArrowButton, Container } from "@/components/ui";
import { destinations } from "@/content/destinations";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";

const copy = {
  title: { uk: "Країни", cs: "Destinace" },
  metaTitle: { uk: "Країни для відпочинку з вильотом із Чехії", cs: "Destinace s odletem z Česka" },
  lead: {
    uk: "12 напрямків, куди ми відправляємо туристів із Праги, Брна, Острави та Пардубиць. Поради, сезони, гроші й відповіді на часті питання — усе, що Альона розповідає клієнтам особисто.",
    cs: "12 destinací, kam posíláme klienty z Prahy, Brna, Ostravy a Pardubic. Tipy, sezóny, peníze a odpovědi na časté otázky — vše, co Aljona klientům říká osobně.",
  },
  metaDescription: {
    uk: "Туреччина, Єгипет, Греція, Мальдіви, ОАЕ та ще 7 країн. Гіди від Ananas Tour для українців у Чехії та підбір туру в Telegram.",
    cs: "Turecko, Egypt, Řecko, Maledivy, SAE a dalších 7 zemí. Průvodce od Ananas Tour a výběr zájezdu přes Telegram.",
  },
  badge: { uk: "12 КРАЇН • ВИЛІТ З ЧЕХІЇ • ", cs: "12 ZEMÍ • ODLETY Z ČESKA • " },
  season: { uk: "Сезон", cs: "Sezóna" },
  open: { uk: "Відкрити", cs: "Otevřít" },
  ctaTitle: { uk: "Не знаєте, куди полетіти?", cs: "Nevíte, kam letět?" },
  ctaText: {
    uk: "Напишіть Альоні, коли й з ким плануєте відпустку та який бюджет — вона запропонує 3 країни й конкретні готелі.",
    cs: "Napište Aljoně, kdy a s kým chcete jet a jaký máte rozpočet — navrhne 3 země a konkrétní hotely.",
  },
  ctaMessage: {
    uk: "Добрий день, Альоно! Допоможіть обрати країну для відпочинку. Плануємо: ",
    cs: "Dobrý den, Aljono! Pomozte mi vybrat destinaci. Plánujeme: ",
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

  return (
    <>
      {/* Hero: grey panel with giant title + three pill photo columns (Reference 1) */}
      <section className="pb-6 pt-2 sm:pt-4">
        <Container>
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-grey px-5 py-10 sm:rounded-[2.5rem] sm:px-10 sm:py-12 lg:px-14">
            <PineapplePattern preset="section" opacity={0.9} className="-z-10" />
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div>
                <h1 className="font-display text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.88] tracking-[-0.045em]">{t(copy.title, locale)}</h1>
                <p className="mt-6 max-w-xl text-lg text-ink/80">{t(copy.lead, locale)}</p>
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
                    className={`relative isolate flex aspect-[2/5] items-end justify-center overflow-hidden rounded-full bg-ink pb-8 text-center ${i === 1 ? "translate-y-8" : ""}`}
                  >
                    <Image src={d.heroImage} alt="" fill sizes="(min-width: 1024px) 14vw, 30vw" className="-z-10 object-cover" priority={i === 0} />
                    <span className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <span className="px-2 font-display text-[clamp(0.75rem,1.4vw,1.1rem)] font-extrabold uppercase text-white">{t(d.name, locale)}</span>
                  </Link>
                ))}
                <div className="absolute -left-6 -top-6 hidden sm:block">
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
              <li key={d.slug} className={i % 2 === 1 ? "sm:translate-y-8" : ""}>
                <Link href={routes.destination(locale, d.slug)} className="group block">
                  <div className="relative aspect-[3/5] overflow-hidden rounded-full bg-grey">
                    <Image
                      src={d.heroImage}
                      alt={t(d.name, locale)}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex flex-col items-center px-4 pb-10 text-center text-paper">
                      <span className="text-3xl" aria-hidden>
                        {d.flag}
                      </span>
                      <h2 className="mt-1 font-display text-xl font-extrabold uppercase leading-tight sm:text-2xl">
                        {t(d.name, locale)}
                      </h2>
                      <p className="mt-1 text-xs text-paper/80">
                        {t(copy.season, locale)}: {t(d.bestSeason, locale)}
                      </p>
                      <span className="mt-4">
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
