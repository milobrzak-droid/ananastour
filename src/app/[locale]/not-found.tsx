"use client";

import { useParams } from "next/navigation";
import { LogoMark } from "@/components/brand/logo";
import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { ButtonLink, Container } from "@/components/ui";
import { defaultLocale, isLocale, t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";

const copy = {
  title: { uk: "Тут моря немає", cs: "Tady moře není" },
  text: {
    uk: "Як і в усій Чехії. Зате Альона знає, де воно є: поверніться на головну або напишіть їй.",
    cs: "Jako v celém Česku. Aljona ale ví, kde ho najít: vraťte se na úvod, nebo jí rovnou napište.",
  },
  prefill: {
    uk: "Добрий день, Альоно! Пишу з сайту — допоможете з туром?",
    cs: "Dobrý den, Aljono! Píšu z webu – pomůžete mi se zájezdem?",
  },
  home: { uk: "На головну", cs: "Zpět na úvod" },
  tours: { uk: "Знайти тур", cs: "Najít zájezd" },
  // The badge states the plain fact; the headline carries the joke.
  badge: { uk: "404 • СТОРІНКУ НЕ ЗНАЙДЕНО • ", cs: "404 • STRÁNKA NENALEZENA • " },
};

/** Friendly 404 inside the [locale] segment. Locale comes from the URL (not-found gets no params). */
export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <PineapplePattern preset="hero" opacity={0.5} />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto mb-8 grid place-items-center">
          <CircleBadge size={260} text={t(copy.badge, locale)} center={<LogoMark size={110} />} />
          {/* Hangs below the ring like a luggage tag: the badge spins, so anything on the ring would hide its letters. */}
          <span className="absolute top-full -mt-2 shape-pill bg-ink px-5 py-1 font-display text-3xl font-extrabold text-paper">404</span>
        </div>
        <div className="max-w-2xl">
          <h1 className="font-display text-[clamp(2.1rem,5vw,4rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">{t(copy.title, locale)}</h1>
          <p className="mt-5 text-lg text-ink/80">{t(copy.text, locale)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <TelegramButton locale={locale} source="404" message={t(copy.prefill, locale)} size="lg" />
            <ButtonLink href={routes.tours(locale)} variant="dark">
              {t(copy.tours, locale)}
            </ButtonLink>
            <ButtonLink href={routes.home(locale)} variant="outline">
              {t(copy.home, locale)}
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
