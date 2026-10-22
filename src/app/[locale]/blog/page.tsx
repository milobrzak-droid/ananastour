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
  title: { uk: "Блог", cs: "Blog" },
  metaTitle: { uk: "Блог — корисне перед поїздкою", cs: "Blog — užitečné rady před cestou" },
  lead: {
    uk: "Візи, страховка, Tax Free та позначки готелів — коротко й по суті, з урахуванням того, що ви живете в Чехії.",
    cs: "Víza, pojištění, tax free a značky hotelů — stručně a k věci, pro ty, kdo žijí v Česku.",
  },
  minutes: { uk: "хв читання", cs: "min čtení" },
  read: { uk: "Читати", cs: "Číst" },
  ctaTitle: { uk: "Не знайшли відповідь?", cs: "Nenašli jste odpověď?" },
  ctaText: {
    uk: "Запитайте Альону в Telegram — вона відповість особисто, зазвичай протягом 15 хвилин.",
    cs: "Zeptejte se Aljony na Telegramu — odpoví osobně, obvykle do 15 minut.",
  },
  ctaMessage: { uk: "Добрий день, Альоно! У мене питання щодо поїздки: ", cs: "Dobrý den, Aljono! Mám dotaz k cestě: " },
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
          <h1 className="font-display text-6xl font-extrabold uppercase leading-none sm:text-8xl">{t(copy.title, locale)}</h1>
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
                {t(copy.read, locale)} · {first.readingMinutes} {t(copy.minutes, locale)}
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
