import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { typeset } from "@/components/content/typeset";
import { fitLongestWord, glue } from "@/components/home/typo";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";

/** Circular badge text: the 15-minute promise always travels with "usually" and the hours (COPY-GUIDE rule 3). */
const badge = { uk: "ЗАЗВИЧАЙ ЗА 15 ХВ • 9:00–21:00 • ", cs: "OBVYKLE DO 15 MIN • 9–21 H • " };

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
            {/* @container + min-w-0: the title is sized to this column, never the column to the title. */}
            <div className="@container min-w-0 max-w-2xl">
              {/* leading 1.08: Czech accents (Á, Ř, Š) on line 2 must clear the caps of line 1.
                  Size: 1.8rem on phones and 4vw from 720px, but never above --fit (the longest glued word, e.g.
                  ДОМІНІКАНИ? or «Скільки вас?», fills the column at most), so no word splits or runs past the card. */}
              <h2
                className="text-balance font-display text-[length:clamp(1.25rem,min(var(--fit),max(1.8rem,4vw)),3.2rem)] font-black uppercase leading-[1.08] tracking-[-0.03em]"
                style={fitLongestWord(title)}
              >
                {glue(title)}
              </h2>
              <p className="mt-4 text-pretty text-lg text-white">{typeset(text)}</p>
              <TelegramButton locale={locale} source={source} message={message} label={label} size="lg" tone="white" className="mt-7" />
            </div>
            {/* The wrapper hides it below md: on the badge itself "hidden" lost to its own inline-grid. */}
            <div className="hidden md:flex">
              <CircleBadge size={170} color="#fff" text={t(badge, locale)} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
