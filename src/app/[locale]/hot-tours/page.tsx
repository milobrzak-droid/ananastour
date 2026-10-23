import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { Stamp } from "@/components/brand/pineapple";
import { glue } from "@/components/home/typo";
import { displayLeading } from "@/components/tours/display";
import { TelegramButton } from "@/components/contact/telegram";
import { Container, Section } from "@/components/ui";
import { NoResults, PickForMeCard } from "@/components/tours/help-cards";
import { countryName } from "@/components/tours/labels";
import { OfferCard } from "@/components/tours/offer-card";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";
import { tours } from "@/lib/tours";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

// Source copy: content-source/main_hot_tours.txt (adapted: Czech operators, CZK, departures from CZ).
const tx = {
  metaTitle: { uk: "Гарячі тури з Чехії", cs: "Last minute zájezdy z Česka" },
  metaDescription: {
    uk: "Гарячі тури з Чехії: вильоти найближчими днями, ціни в кронах, чеські туроператори. Напишіть Альоні — вона перевірить ціну ще до бронювання.",
    cs: "Last minute zájezdy z Česka: odlety v nejbližších dnech, ceny v korunách a české CK. Napište Aljoně – každou cenu ověří ještě před rezervací.",
  },
  kicker: { uk: "Вильоти найближчими днями", cs: "Odlety v nejbližších dnech" },
  h1: { uk: "Гарячі тури з Чехії", cs: "Last minute z Česka" },
  lead: {
    uk: "Коли туроператору треба заповнити літак, ціна падає. Я стежу за такими моментами й перевіряю кожну ціну до бронювання — щоб «гаряче» не охололо.",
    cs: "Když cestovka potřebuje zaplnit letadlo, cena jde dolů. Hlídám tyhle chvíle a každou cenu před rezervací ověřím, aby žhavá nabídka nevychladla.",
  },
  lead2: {
    uk: "Аеропорти — у Чехії, ціни — в кронах, туроператори — чеські й застраховані від банкрутства. Вам залишається тільки обрати море.",
    cs: "Letiště v Česku, ceny v korunách a české CK pojištěné proti úpadku. Vám zbývá jen vybrat moře.",
  },
  cta: { uk: "Хочу гарячий тур", cs: "Chci last minute" },
  // Sent as "{prefill} ({country})." — the country lands on the last line, so it ends without punctuation.
  prefill: {
    uk: "Добрий день, Альоно!\nКоли можу вилетіти: …\nСкільки нас: …\nХочу гарячий тур",
    cs: "Dobrý den, Aljono!\nKdy můžu letět: …\nKolik nás je: …\nChci last minute",
  },
  all: { uk: "Усі країни", cs: "Všechny země" },
  filterLabel: { uk: "Країна", cs: "Země" },
  listTitle: { uk: "Найближчі вильоти", cs: "Nejbližší odlety" },
  listLead: {
    uk: "Ціни в кронах за одну особу. Відкрийте тур, щоб побачити, що входить у ціну, і надіслати запит — на сайті ви нічого не платите.",
    cs: "Ceny jsou za osobu v korunách. V detailu zájezdu najdete, co je v ceně, a můžete rovnou poslat žádost – na webu nic neplatíte.",
  },
  notifyTitle: {
    uk: "Чекаєте на ціну?",
    cs: "Čekáte na cenu?",
  },
  notifyText: {
    uk: "Напишіть, куди, коли й за скільки, — дам знати, щойно з’явиться ваш варіант.",
    cs: "Napište kam, kdy a za kolik – ozvu se, jakmile se objeví ta vaše nabídka.",
  },
  notifyCta: { uk: "Стежити за ціною", cs: "Hlídat cenu" },
};

// Tour data comes from tours(): regenerate every 30 min instead of per request,
// so the AnChoice API is not hammered once it replaces the mock provider.
export const revalidate = 1800;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(tx.metaTitle, locale),
    description: t(tx.metaDescription, locale),
    alternates: { canonical: routes.hot(locale), languages: languageAlternates(routes.hot) },
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
          {/* Below lg the copy runs the full width, so the scrim stays dark top to bottom instead of fading out on the right. */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/85 via-ink/80 to-ink/75 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/70 lg:to-ink/30" />
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-3xl">
              <p className="inline-flex shape-pill bg-red px-4 py-1.5 text-sm font-bold text-white">{t(tx.kicker, locale)}</p>
              {/* Greedy wrap on purpose (overrides the global h1 balance): with "з Чехії" glued it breaks as
                  "ГАРЯЧІ ТУРИ / З ЧЕХІЇ" and "LAST MINUTE / Z ČESKA", like the hero's "ВАШЕ МОРЕ / З ЧЕХІЇ";
                  balance would split the term into "ГАРЯЧІ / ТУРИ З ЧЕХІЇ". */}
              <h1 className={`mt-5 text-wrap! font-display text-[clamp(2rem,5.4vw,4.4rem)] font-black uppercase ${displayLeading(t(tx.h1, locale))} tracking-[-0.035em]`}>
                {glue(t(tx.h1, locale))}
              </h1>
              <p className="mt-6 text-pretty text-lg text-white">{glue(t(tx.lead, locale))}</p>
              <p className="mt-3 text-pretty text-white">{glue(t(tx.lead2, locale))}</p>
              <TelegramButton locale={locale} source="hot-hero" size="lg" message={prefill} label={t(tx.cta, locale)} className="mt-8" />
            </div>
            <Stamp
              size={220}
              tone="yellow"
              top={locale === "uk" ? "LAST MINUTE • З ЧЕХІЇ" : "LAST MINUTE • Z ČESKA"}
              bottom={locale === "uk" ? "ВИЛІТ НА ДНЯХ" : "ODLET ZA PÁR DNÍ"}
              above={[locale === "uk" ? "ВАЛІЗА" : "KUFR"]}
              word={locale === "uk" ? "ЗА ВЕЧІР" : "ZA VEČER"}
              below={[]}
              className="hidden -rotate-6 lg:block"
            />
          </div>
        </section>
      </Container>

      <Section title={t(tx.listTitle, locale)} lead={glue(t(tx.listLead, locale))}>
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
              <p className="mt-2 text-pretty text-ink/75">{glue(t(tx.notifyText, locale))}</p>
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
