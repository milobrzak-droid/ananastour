import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PineapplePattern } from "@/components/brand/pineapple";
import { TelegramCta } from "@/components/content/telegram-cta";
import { ArrowButton, Container, Pill } from "@/components/ui";
import { posts } from "@/content/blog";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";
import { formatDate } from "@/lib/format";

const copy = {
  // H1 is fluid (≈12.5vw, max 6rem). NBSP keeps «до моря» / „z cest“ together, so no short word hangs alone on a line.
  title: { uk: "Знати до моря", cs: "Tipy z cest" },
  metaTitle: { uk: "Знати до моря: візи, страховка, Tax Free", cs: "Tipy z cest: víza, pojištění, tax free" },
  lead: {
    uk: "Що я знаю з поїздок і про що питають мої туристи: документи, страховка, готелі, гроші. Без води — і з поправкою на те, що ви живете в Чехії.",
    cs: "Co vím z cest a na co se ptají moji klienti: doklady, pojištění, hotely, peníze. Bez vaty – a s ohledem na to, že žijete v Česku.",
  },
  minutes: { uk: "хв читання", cs: "min čtení" },
  read: { uk: "Читати далі", cs: "Číst dál" },
  ctaTitle: { uk: "Куди? Коли? Скільки вас?", cs: "Kam? Kdy? Kolik vás?" },
  ctaText: {
    uk: "Три відповіді в Telegram — і я почну шукати. З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин.",
    cs: "Tři odpovědi na Telegram a začnu hledat. Od 9 do 21 h odpovídám obvykle do 15 minut.",
  },
  ctaMessage: {
    uk: "Добрий день, Альоно! Хочу на море.\nКуди: …\nКоли: …\nСкільки нас (вік дітей): …",
    cs: "Dobrý den, Aljono! Chci k moři.\nKam: …\nKdy: …\nKolik nás je (věk dětí): …",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(copy.metaTitle, locale),
    description: t(copy.lead, locale),
    alternates: { canonical: routes.blog(locale), languages: languageAlternates(routes.blog) },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  const [first, ...rest] = sorted;

  return (
    <>
      <section className="relative overflow-hidden py-14 sm:py-20">
        <PineapplePattern preset="sparse" opacity={0.7} />
        <Container className="relative">
          <h1 className="text-balance font-display text-[clamp(2.4rem,12.5vw,6rem)] font-extrabold uppercase leading-none">{t(copy.title, locale)}</h1>
          <p className="mt-5 max-w-2xl text-lg text-ink/75">{t(copy.lead, locale)}</p>
        </Container>
      </section>

      <section className="pb-8">
        <Container className="space-y-6">
          {/* Featured (latest) post */}
          <Link
            href={routes.post(locale, first.slug)}
            className="group grid overflow-hidden shape-card bg-ink text-paper md:grid-cols-2"
          >
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[380px]">
              <Image src={first.image} alt={t(first.title, locale)} fill priority sizes="(min-width: 768px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
              <div className="flex items-center gap-3 text-sm text-paper/70">
                <Pill tone="yellow">{t(first.tag, locale)}</Pill>
                <span>{formatDate(first.date, locale, { day: "numeric", month: "long", year: "numeric" })}</span>
              </div>
              <h2 className="font-display text-3xl font-extrabold leading-tight sm:text-4xl">{t(first.title, locale)}</h2>
              <p className="text-paper/80">{t(first.excerpt, locale)}</p>
              <div className="flex items-center gap-3 pt-2 font-semibold">
                <ArrowButton label={t(copy.read, locale)} />
                {/* Reading time wraps as one unit under the CTA instead of splitting "4 хв / читання". */}
                <span className="flex min-w-0 flex-wrap items-baseline gap-x-2.5">
                  <span>{t(copy.read, locale)}</span>
                  <span className="whitespace-nowrap font-medium text-paper/70">
                    {first.readingMinutes} {t(copy.minutes, locale)}
                  </span>
                </span>
              </div>
            </div>
          </Link>

          <ul className="grid gap-6 md:grid-cols-3">
            {rest.map((p, i) => (
              <li key={p.slug}>
                <Link
                  href={routes.post(locale, p.slug)}
                  className={`group flex h-full flex-col overflow-hidden ${["shape-card-r", "shape-card", "shape-card-tl"][i % 3]} bg-white ring-1 ring-ink/5 transition hover:shadow-lg`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={p.image} alt={t(p.title, locale)} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute left-4 top-4">
                      <Pill tone="yellow">{t(p.tag, locale)}</Pill>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <p className="text-xs uppercase tracking-wider text-ink/75">
                      {formatDate(p.date, locale, { day: "numeric", month: "long", year: "numeric" })} · {p.readingMinutes}{" "}
                      {t(copy.minutes, locale)}
                    </p>
                    <h2 className="font-display text-xl font-bold leading-tight">{t(p.title, locale)}</h2>
                    <p className="text-sm text-ink/70">{t(p.excerpt, locale)}</p>
                    <div className="mt-auto flex justify-end pt-2">
                      <ArrowButton label={t(copy.read, locale)} size={42} />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <TelegramCta
        locale={locale}
        source="blog-index"
        title={t(copy.ctaTitle, locale)}
        text={t(copy.ctaText, locale)}
        message={t(copy.ctaMessage, locale)}
      />
    </>
  );
}
