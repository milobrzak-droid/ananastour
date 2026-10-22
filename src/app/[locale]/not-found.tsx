"use client";

import { useParams } from "next/navigation";
import { LogoMark } from "@/components/brand/logo";
import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { ButtonLink, Container } from "@/components/ui";
import { defaultLocale, isLocale, t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";

const copy = {
  title: { uk: "Ой, цієї сторінки немає", cs: "Jejda, tahle stránka neexistuje" },
  text: {
    uk: "Схоже, вона полетіла у відпустку без нас. Але ваш ідеальний тур нікуди не дівся — напишіть Альоні, і за 15 хвилин отримаєте 3 найкращі варіанти.",
    cs: "Vypadá to, že odletěla na dovolenou bez nás. Váš vysněný zájezd ale nikam nezmizel — napište Aljoně a do 15 minut máte 3 nejlepší varianty.",
  },
  prefill: {
    uk: "Добрий день, Альоно! Не знайшов(-ла) потрібну сторінку на сайті — допоможіть підібрати тур.",
    cs: "Dobrý den, Aljono! Nenašel(a) jsem na webu, co jsem hledal(a) — pomůžete mi vybrat zájezd?",
  },
  home: { uk: "На головну", cs: "Na úvodní stránku" },
  tours: { uk: "Шукати тур", cs: "Hledat zájezd" },
};

/** Friendly 404 inside the [locale] segment. Locale comes from the URL (not-found gets no params). */
export default function NotFound() {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <PineapplePattern preset="hero" opacity={0.5} />
      <Container className="relative grid items-center gap-12 lg:grid-cols-[auto_1fr]">
        <div className="relative mx-auto grid place-items-center">
          <CircleBadge size={260} text="404 • PAGE NOT FOUND • ANANAS TOUR • " center={<LogoMark size={110} />} />
          <span className="absolute -bottom-2 shape-pill bg-ink px-5 py-1 font-display text-3xl font-extrabold text-paper">404</span>
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
