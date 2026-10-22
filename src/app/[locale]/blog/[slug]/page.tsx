import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Blocks } from "@/components/content/blocks";
import { JsonLd } from "@/components/content/json-ld";
import { TelegramCta } from "@/components/content/telegram-cta";
import { ArrowButton, Container, Pill } from "@/components/ui";
import { site } from "@/config/site";
import { getPost, posts } from "@/content/blog";
import { getDestination } from "@/content/destinations";
import { isLocale, t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { formatDate } from "@/lib/format";

type Params = Promise<{ locale: string; slug: string }>;

const copy = {
  back: { uk: "Усі статті", cs: "Všechny články" },
  minutes: { uk: "хв читання", cs: "min čtení" },
  related: { uk: "Корисно для країн", cs: "Hodí se pro destinace" },
  more: { uk: "Читайте також", cs: "Přečtěte si také" },
  ctaTitle: { uk: "Залишилися питання?", cs: "Máte další otázky?" },
  ctaText: {
    uk: "Напишіть Альоні в Telegram — вона пояснить усе на прикладі вашої поїздки й підбере тур.",
    cs: "Napište Aljoně na Telegram — vysvětlí vše na příkladu vaší cesty a vybere vám zájezd.",
  },
};

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(locale) || !post) return {};
  return {
    title: t(post.seo.title, locale),
    description: t(post.seo.description, locale),
    alternates: { languages: { uk: routes.post("uk", slug), cs: routes.post("cs", slug) } },
    openGraph: {
      type: "article",
      title: t(post.seo.title, locale),
      description: t(post.seo.description, locale),
      publishedTime: post.date,
      images: [post.image],
    },
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { locale: raw, slug } = await params;
  const post = getPost(slug);
  if (!isLocale(raw) || !post) notFound();
  const locale: Locale = raw;
  const title = t(post.title, locale);
  const related = post.related.map(getDestination).filter((d) => d !== undefined);
  const others = posts.filter((p) => p.slug !== slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: title,
          description: t(post.excerpt, locale),
          datePublished: post.date,
          image: post.image,
          inLanguage: locale,
          author: { "@type": "Organization", name: site.name },
          mainEntityOfPage: `${site.url}${routes.post(locale, slug)}`,
        }}
      />

      <article className="pb-4 pt-2 sm:pt-4">
        <Container>
          <div className="grid items-center gap-6 rounded-[2rem] bg-grey p-5 sm:rounded-[2.5rem] sm:p-8 lg:grid-cols-[1.25fr_1fr] lg:gap-10 lg:p-10">
            <div>
              <Link href={routes.blog(locale)} className="inline-flex min-h-11 items-center gap-2 text-sm font-bold text-ink/80 hover:text-ink">
                <ArrowButton label={t(copy.back, locale)} direction="left" size={32} />
                {t(copy.back, locale)}
              </Link>
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-ink/80">
                <Pill tone="yellow">{t(post.tag, locale)}</Pill>
                <span>{formatDate(post.date, locale, { day: "numeric", month: "long", year: "numeric" })}</span>
                <span aria-hidden>·</span>
                <span>
                  {post.readingMinutes} {t(copy.minutes, locale)}
                </span>
              </div>
              <h1 className="mt-4 font-display text-[clamp(1.9rem,4vw,3.4rem)] font-black uppercase leading-[1] tracking-[-0.03em]">{title}</h1>
              <p className="mt-5 text-lg text-ink/80">{t(post.excerpt, locale)}</p>
            </div>
            <div className="relative mx-auto aspect-[4/3] w-full max-w-[34rem] overflow-hidden rounded-[2rem] bg-white">
              <Image src={post.image} alt={title} fill priority sizes="(min-width: 1024px) 34rem, 100vw" className="object-cover" />
            </div>
          </div>
        </Container>

        <Container className="mt-10 max-w-3xl">
          <Blocks blocks={post.body[locale]} />

          {related.length > 0 && (
            <div className="mt-12">
              <p className="font-display text-lg font-bold">{t(copy.related, locale)}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {related.map((d) => (
                  <li key={d.slug}>
                    <Link
                      href={routes.destination(locale, d.slug)}
                      className="inline-flex items-center gap-2 shape-pill bg-white px-4 py-2 text-sm font-semibold ring-1 ring-ink/10 transition hover:bg-yellow"
                    >
                      <span aria-hidden>{d.flag}</span> {t(d.name, locale)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </article>

      <TelegramCta
        locale={locale}
        source={`blog-${slug}`}
        title={t(copy.ctaTitle, locale)}
        text={t(copy.ctaText, locale)}
        message={t(post.telegramMessage, locale)}
      />

      <section className="pb-16">
        <Container>
          <h2 className="font-display text-2xl font-black uppercase sm:text-3xl">{t(copy.more, locale)}</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <Link
                  href={routes.post(locale, p.slug)}
                  className="group flex h-full items-center gap-4 rounded-full bg-white p-3 pr-6 transition hover:bg-yellow"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full">
                    <Image src={p.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <span className="font-display font-bold leading-tight group-hover:underline">{t(p.title, locale)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
