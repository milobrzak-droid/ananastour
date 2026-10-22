import { notFound } from "next/navigation";
import { AboutTeaser } from "@/components/home/about";
import { Destinations } from "@/components/home/destinations";
import { Faq } from "@/components/home/faq";
import { Featured } from "@/components/home/featured";
import { FinalCta } from "@/components/home/final-cta";
import { Hero } from "@/components/home/hero";
import { HotTours } from "@/components/home/hot-tours";
import { PillSentence, RouteTagline } from "@/components/home/intro";
import { PickTour } from "@/components/home/pick-tour";
import { WhyUs } from "@/components/home/why-us";
import { isLocale } from "@/i18n/config";
import { tours } from "@/lib/tours";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  // 11 hot tours: 6 cards + up to 5 rows in the "nearest departures" table.
  const [hot, featured] = await Promise.all([tours().getHotTours(11), tours().getFeatured(4)]);

  return (
    <>
      <Hero locale={locale} />
      <RouteTagline locale={locale} />
      <PillSentence locale={locale} />
      <HotTours offers={hot} locale={locale} />
      <Featured offers={featured} locale={locale} />
      <PickTour locale={locale} />
      <Destinations locale={locale} />
      <AboutTeaser locale={locale} />
      <WhyUs locale={locale} />
      <Faq locale={locale} />
      <FinalCta locale={locale} />
    </>
  );
}
