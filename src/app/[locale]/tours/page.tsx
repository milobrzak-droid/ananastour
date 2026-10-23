import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { PineapplePattern } from "@/components/brand/pineapple";
import { fitLongestWord, glue } from "@/components/home/typo";
import { displayLeading } from "@/components/tours/display";
import { Container } from "@/components/ui";
import { Filters, activeFilterCount } from "@/components/tours/filters";
import { NoResults, PickForMeCard } from "@/components/tours/help-cards";
import { countryName, sortLabels } from "@/components/tours/labels";
import { searchSummary, searchTelegramMessage } from "@/components/tours/messages";
import { OfferCard } from "@/components/tours/offer-card";
import { Pagination } from "@/components/tours/pagination";
import { SearchBox } from "@/components/tours/search-box";
import { SortSelect } from "@/components/tours/sort-select";
import { getDestination } from "@/content/destinations";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";
import { tours } from "@/lib/tours";
import { parseSearchParams, toQueryString } from "@/lib/tours/query";
import type { SearchParams } from "@/lib/tours/types";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

const PAGE_SIZE = 12;
const SORTS = Object.keys(sortLabels) as Array<NonNullable<SearchParams["sort"]>>;

const tx = {
  title: { uk: "Тури з Чехії", cs: "Zájezdy z Česka" },
  titleTo: { uk: "Тури з Чехії: ", cs: "Zájezdy z Česka: " },
  titleDest: { uk: "Тури", cs: "Zájezdy" },
  description: {
    uk: "Пакетні тури чеських туроператорів, застрахованих від банкрутства. Ціни в кронах. Знайшли свій тур? Напишіть Альоні в Telegram — вона перевірить ціну й місця.",
    cs: "Vyhledávání zájezdů českých CK pojištěných proti úpadku, ceny v korunách. Zaujalo vás něco? Aljona vám na Telegramu ověří cenu i volná místa.",
  },
  found: { uk: "Знайдено турів", cs: "Nalezeno zájezdů" },
  results: { uk: "Результати пошуку", cs: "Výsledky hledání" },
  filters: { uk: "Фільтри", cs: "Filtry" },
  sort: { uk: "Сортувати:", cs: "Řadit:" },
  apply: { uk: "OK", cs: "OK" },
  // Labels for the search summary, so "2 dospělí" never stands alone as a stray caption (as on the hotel page).
  yourSearch: { uk: "Ваш пошук:", cs: "Vaše hledání:" },
  // Form context: also the first line of the Telegram prefill, so it is neutral, not "your".
  searchContext: { uk: "Пошук:", cs: "Hledání:" },
};

// Tour data comes from tours(): regenerate every 30 min instead of per request,
// so the AnChoice API is not hammered once it replaces the mock provider.
export const revalidate = 1800;

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const sp = parseSearchParams(await searchParams);
  const title = sp.destination
    ? `${t(tx.titleTo, locale)}${countryName(sp.destination, locale)}`
    : t(tx.title, locale);
  // Only the plain (optionally destination-scoped) listing is indexable; filtered variants are not.
  const filtered = activeFilterCount(sp) > 0 || sp.page || sp.sort || sp.dateFrom || sp.dateTo;
  return {
    title,
    description: t(tx.description, locale),
    robots: filtered ? { index: false, follow: true } : undefined,
    alternates: {
      canonical: routes.tours(locale, sp.destination ? `destination=${sp.destination}` : undefined),
      languages: languageAlternates((l) => routes.tours(l, sp.destination ? `destination=${sp.destination}` : undefined)),
    },
  };
}

export default async function ToursPage({ params, searchParams }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;

  const sp = parseSearchParams(await searchParams);
  const result = await tours().search({ ...sp, pageSize: PAGE_SIZE });
  const pages = Math.ceil(result.total / result.pageSize);
  const tgMessage = searchTelegramMessage(sp, locale);
  const summary = searchSummary(sp, locale);
  const nFilters = activeFilterCount(sp);
  const pageHref = (page: number) => routes.tours(locale, toQueryString({ ...sp, page }));
  const resetHref = routes.tours(
    locale,
    toQueryString({ ...sp, board: [], stars: [], transport: [], departureAirports: [], touroperators: [], priceMax: undefined, page: undefined }),
  );
  const sortHidden = [
    ...new URLSearchParams(toQueryString({ ...sp, sort: undefined, page: undefined })).entries(),
  ] as Array<[string, string]>;

  // COPY-GUIDE §7.3: with a country filter the H1 is "ТУРИ ДО ТУРЕЧЧИНИ" / "ZÁJEZDY DO TURECKA".
  const dest = sp.destination ? getDestination(sp.destination) : undefined;
  const heading = glue(
    dest
      ? `${t(tx.titleDest, locale)} ${t(dest.nameTo, locale)}`
      : sp.destination
        ? `${t(tx.titleTo, locale)}${countryName(sp.destination, locale)}`
        : t(tx.title, locale),
  );

  return (
    <>
      <Container className="pt-2 sm:pt-4">
        {/* @container: the H1 is sized against the hero, so only a long country word (BULHARSKA, ДОМІНІКАНИ) shrinks
            on a 320px phone instead of breaking mid-word; wider screens keep the clamp. */}
        <div className="@container relative isolate overflow-hidden rounded-[2rem] bg-teal px-3 pb-3 pt-8 text-white sm:rounded-[2.5rem] sm:px-6 sm:pb-6 sm:pt-12">
          <PineapplePattern preset="section" opacity={0.22} className="-z-10" />
          <h1
            className={`text-balance px-2 font-display text-[min(var(--fit),clamp(2rem,5vw,4.2rem))] font-black uppercase ${displayLeading(heading)} tracking-[-0.035em]`}
            style={fitLongestWord(heading)}
          >
            {heading}
          </h1>
          <p className="mt-3 px-2 text-sm font-medium text-white">{glue(`${t(tx.yourSearch, locale)} ${summary}`)}</p>
          <div className="mt-6 text-ink">
            <SearchBox locale={locale} initial={sp} variant="bar" />
          </div>
        </div>
      </Container>

      <Container className="py-8 sm:py-12">
        <div className="grid gap-8 lg:grid-cols-[17rem_minmax(0,1fr)]">
          {/* Desktop filters */}
          <aside className="hidden lg:block" aria-label={t(tx.filters, locale)}>
            <div className="sticky top-24 rounded-[2rem] bg-white p-6">
              <h2 className="mb-4 font-display text-xl font-black uppercase">{t(tx.filters, locale)}</h2>
              <Filters locale={locale} params={sp} facets={result.facets} />
            </div>
          </aside>

          <div className="min-w-0">
            {/* Mobile filters */}
            <details className="group mb-4 rounded-[1.75rem] bg-white lg:hidden">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between px-6 py-4 font-display text-lg font-extrabold uppercase">
                <span>
                  {t(tx.filters, locale)}
                  {nFilters > 0 && (
                    <span className="ml-2 inline-grid h-6 min-w-6 place-items-center rounded-full bg-yellow px-2 font-sans text-xs text-ink">
                      {nFilters}
                    </span>
                  )}
                </span>
                <span aria-hidden className="text-2xl transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 pb-6">
                <Filters locale={locale} params={sp} facets={result.facets} />
              </div>
            </details>

            {/* The visible "Filters" H2 sits inside the collapsed drawer on mobile,
                so the results list gets its own (visually hidden) H2. */}
            <h2 className="sr-only">{t(tx.results, locale)}</h2>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm text-ink/70">
                {t(tx.found, locale)}: <strong className="text-ink">{result.total}</strong>
              </p>
              <SortSelect
                action={routes.tours(locale)}
                name="sort"
                value={sp.sort ?? "price_asc"}
                options={SORTS.map((s) => ({ value: s, label: t(sortLabels[s], locale) }))}
                hidden={sortHidden}
                label={t(tx.sort, locale)}
                submitLabel={t(tx.apply, locale)}
              />
            </div>

            {result.items.length === 0 ? (
              <NoResults
                locale={locale}
                message={tgMessage}
                resetHref={nFilters > 0 ? resetHref : undefined}
                source="tours-empty"
              />
            ) : (
              <>
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {result.items.map((offer, i) => (
                    <Fragment key={offer.id}>
                      <OfferCard offer={offer} locale={locale} source="tours-results" />
                      {(i === 5 || (i === result.items.length - 1 && result.items.length < 6)) && (
                        <PickForMeCard
                          locale={locale}
                          message={tgMessage}
                          context={`${t(tx.searchContext, locale)} ${summary}`}
                          source="tours-inline"
                          className="sm:col-span-2 xl:col-span-3"
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
                <Pagination locale={locale} page={result.page} pages={pages} href={pageHref} />
              </>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
