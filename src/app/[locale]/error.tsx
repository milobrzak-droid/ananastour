"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { TelegramIcon } from "@/components/contact/telegram";
import { Button, ButtonLink, Container } from "@/components/ui";
import { defaultLocale, isLocale, t, type Locale } from "@/i18n/config";
import { telegramLink } from "@/lib/contact/telegram";

const copy = {
  title: { uk: "Затримка рейсу", cs: "Zpoždění letu" },
  text: {
    uk: "Сторінка не завантажилася. Спробуйте ще раз — або напишіть Альоні: вона не затримується.",
    cs: "Stránka se nenačetla. Zkuste to znovu, nebo napište Aljoně – ta zpoždění nemá.",
  },
  retry: { uk: "Спробувати ще раз", cs: "Zkusit znovu" },
  telegram: { uk: "Написати Альоні", cs: "Napsat Aljoně" },
};

/**
 * Error boundary for everything under /[locale]. Renders inside the locale
 * layout (header/footer stay up), so design tokens and UI components work.
 * Locale comes from the URL — an error boundary gets no params.
 */
export default function LocaleError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const params = useParams<{ locale?: string }>();
  const locale: Locale = params?.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  useEffect(() => {
    // Server logs have the stack via the digest; this helps local debugging.
    console.error(error);
  }, [error]);

  return (
    <section className="py-16 sm:py-24">
      <Container className="max-w-2xl text-center">
        <p aria-hidden className="text-6xl">🍍</p>
        <h1 className="mt-6 font-display text-[clamp(1.8rem,4.5vw,3rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">
          {t(copy.title, locale)}
        </h1>
        <p className="mt-5 text-lg text-ink/80">{t(copy.text, locale)}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button variant="dark" onClick={() => reset()}>
            {t(copy.retry, locale)}
          </Button>
          <ButtonLink href={telegramLink()} variant="telegram">
            <TelegramIcon />
            {t(copy.telegram, locale)}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
