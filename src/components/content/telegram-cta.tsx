import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { Container } from "@/components/ui";
import type { Locale } from "@/i18n/config";

/** Navy band with a pre-filled Telegram button — closes every content page. */
export function TelegramCta({
  locale,
  title,
  text,
  message,
  source,
  label,
}: {
  locale: Locale;
  title: string;
  text: string;
  message: string;
  source: string;
  label?: string;
}) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] bg-telegram px-6 py-12 text-white sm:rounded-[2.5rem] sm:px-12 sm:py-16">
          <PineapplePattern preset="section" opacity={0.16} color="#fff" />
          <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <h2 className="font-display text-[clamp(1.8rem,4vw,3.2rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">{title}</h2>
              <p className="mt-4 text-lg text-white">{text}</p>
              <TelegramButton locale={locale} source={source} message={message} label={label} size="lg" tone="white" className="mt-7" />
            </div>
            <CircleBadge
              className="hidden md:inline-grid"
              size={170}
              color="#fff"
              text="TELEGRAM • 15 MIN • ANANAS TOUR • "
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
