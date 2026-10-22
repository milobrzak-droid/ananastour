import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { Stamp } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { Container, Section } from "@/components/ui";
import { NoResults, PickForMeCard } from "@/components/tours/help-cards";
import { countryName } from "@/components/tours/labels";
import { OfferCard } from "@/components/tours/offer-card";
import { isLocale, t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { tours } from "@/lib/tours";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Source copy: content-source/main_hot_tours.txt (adapted: Czech operators, CZK, departures from CZ).
const tx = {
  metaTitle: { uk: "Гарячі тури з Чехії — last minute", cs: "Last minute zájezdy z Česka" },
  metaDescription: {
    uk: "Гарячі тури з Праги, Брна, Острави та Пардубіце зі знижкою до 40 %. Єгипет, Туреччина, Греція та екзотика. Бронюйте в Telegram.",
    cs: "Last minute zájezdy z Prahy, Brna, Ostravy a Pardubic se slevou až 40 %. Egypt, Turecko, Řecko i exotika. Rezervace přes Telegram.",
  },
  h1: { uk: "Гарячі тури — відпочивайте за найкращими цінами!", cs: "Last minute — dovolená za nejlepší ceny!" },
  lead: {
    uk: "Гарячі тури — ваш шанс заощадити до 40 % від початкової вартості путівки без жодних компромісів щодо якості відпочинку. Ми щодня моніторимо пропозиції провідних чеських туроператорів, щоб першими перехоплювати для вас найсмачніші варіанти.",
    cs: "Last minute je vaše šance ušetřit až 40 % z původní ceny zájezdu bez kompromisů v kvalitě dovolené. Každý den sledujeme nabídky předních českých cestovních kanceláří, abychom pro vás jako první ulovili ty nejchutnější varianty.",
  },
  lead2: {
    uk: "Єгипет, Туреччина, Європа та екзотика — преміальний сервіс і чудовий готель за мінімальну ціну. Але пам'ятайте: справді вигідні путівки розбирають за лічені години, тож не зволікайте!",
    cs: "Egypt, Turecko, Evropa i exotika — prvotřídní servis a skvělý hotel za minimální cenu. Ale pozor: opravdu výhodné zájezdy mizí během pár hodin, tak neváhejte!",
  },
  cta: { uk: "Хочу гарячий тур", cs: "Chci last minute" },
  prefill: {
    uk: "Добрий день, Альоно! Цікавлять гарячі тури",
    cs: "Dobrý den, Aljono! Mám zájem o last minute",
  },
  all: { uk: "Усі країни", cs: "Všechny země" },
  filterLabel: { uk: "Країна", cs: "Země" },
  listTitle: { uk: "Найближчі вильоти зі знижкою", cs: "Nejbližší odlety se slevou" },
  listLead: {
    uk: "Ціни оновлюються щодня. Перед бронюванням перевіряємо наявність онлайн у туроператора.",
    cs: "Ceny aktualizujeme denně. Před rezervací ověříme dostupnost online u cestovní kanceláře.",
  },
  notifyTitle: {
    uk: "Хочете отримувати гарячі тури першими?",
    cs: "Chcete dostávat last minute jako první?",
  },
  notifyText: {
    uk: "Напишіть Альоні, куди й на скільки хочете полетіти, — вона надішле пропозицію, щойно з'явиться ціна, що вам підходить.",
    cs: "Napište Aljoně, kam a na jak dlouho chcete letět — pošle vám nabídku, jakmile se objeví cena, která vám sedí.",
  },
  notifyCta: { uk: "Підписатися в Telegram", cs: "Odebírat na Telegramu" },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(tx.metaTitle, locale),
    description: t(tx.metaDescription, locale),
    alternates: { canonical: routes.hot(locale), languages: { uk: routes.hot("uk"), cs: routes.hot("cs") } },
  };
}

export default async function HotToursPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const sp = await searchParams;
  const country = typeof sp.country === "string" ? sp.country : undefined;

  const all = await tours().getHotTours(24);
  const counts = new Map<string, { name: string; n: number }>();
  for (const o of all) {
    const c = counts.get(o.hotel.countrySlug);
    counts.set(o.hotel.countrySlug, {
      name: countryName(o.hotel.countrySlug, locale, o.hotel.country),
      n: (c?.n ?? 0) + 1,
    });
  }
  const countries = [...counts.entries()].sort((a, b) => b[1].n - a[1].n);
  const active = country && counts.has(country) ? country : undefined;
  const items = active ? all.filter((o) => o.hotel.countrySlug === active) : all;

  const prefill = `${t(tx.prefill, locale)}${active ? ` (${counts.get(active)!.name})` : ""}.`;
  const hotHref = (c?: string) => `${routes.hot(locale)}${c ? `?country=${encodeURIComponent(c)}` : ""}`;

  return (
    <>
      <Container className="pt-2 sm:pt-4">
        <section className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-5 py-10 text-white sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:px-14">
          <Image src={ananasPhotos.banner.beachUmbrella} alt="" fill priority sizes="100vw" className="-z-10 object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/90 via-ink/70 to-ink/30" />
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-3xl">
              <p className="inline-flex shape-pill bg-red px-4 py-1.5 text-sm font-bold text-white">🔥 Last minute · −40 %</p>
              <h1 className="mt-5 font-display text-[clamp(2.1rem,5.4vw,4.4rem)] font-black uppercase leading-[0.95] tracking-[-0.035em]">{t(tx.h1, locale)}</h1>
              <p className="mt-6 text-lg text-white">{t(tx.lead, locale)}</p>
              <p className="mt-3 text-white/85">{t(tx.lead2, locale)}</p>
              <TelegramButton locale={locale} source="hot-hero" size="lg" message={prefill} label={t(tx.cta, locale)} className="mt-8" />
            </div>
            <Stamp
              size={220}
              tone="yellow"
              top="LAST MINUTE • HOT TOURS"
              bottom="ANANAS TOUR"
              above={[locale === "uk" ? "ЗНИЖКИ ДО" : "SLEVY AŽ"]}
              word="−40%"
              below={[locale === "uk" ? "ЩОДНЯ НОВІ" : "KAŽDÝ DEN NOVÉ"]}
              className="hidden -rotate-6 lg:block"
            />
          </div>
        </section>
      </Container>

      <Section title={t(tx.listTitle, locale)} lead={t(tx.listLead, locale)}>
        {countries.length > 1 && (
          <nav aria-label={t(tx.filterLabel, locale)} className="-mt-2 mb-8">
            <ul className="flex flex-wrap gap-2">
              <li>
                <FilterPill href={hotHref()} active={!active}>
                  {t(tx.all, locale)} <span className="opacity-60">{all.length}</span>
                </FilterPill>
              </li>
              {countries.map(([slug, { name, n }]) => (
                <li key={slug}>
                  <FilterPill href={hotHref(slug)} active={active === slug}>
                    {name} <span className="opacity-60">{n}</span>
                  </FilterPill>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {items.length === 0 ? (
          <NoResults locale={locale} message={prefill} source="hot-empty" />
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((o) => (
              <OfferCard key={o.id} offer={o} locale={locale} source="hot-tours" />
            ))}
          </div>
        )}
      </Section>

      <Container className="pb-16">
        <div className="grid gap-6">
          <div className="flex flex-col items-start gap-4 rounded-[2rem] bg-yellow p-6 sm:flex-row sm:items-center sm:justify-between sm:rounded-[2.5rem] sm:p-10">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl font-black uppercase sm:text-3xl">{t(tx.notifyTitle, locale)}</h2>
              <p className="mt-2 text-ink/75">{t(tx.notifyText, locale)}</p>
            </div>
            <TelegramButton locale={locale} source="hot-notify" size="lg" message={prefill} label={t(tx.notifyCta, locale)} />
          </div>
          <PickForMeCard locale={locale} message={prefill} context="Last minute" source="hot-inline" />
        </div>
      </Container>
    </>
  );
}

function FilterPill({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      scroll={false}
      aria-current={active ? "true" : undefined}
      className={`inline-flex min-h-11 items-center gap-1.5 shape-pill px-4 py-2 text-sm font-semibold transition ${
        active ? "bg-ink text-paper" : "bg-white hover:bg-yellow"
      }`}
    >
      {children}
    </Link>
  );
}
