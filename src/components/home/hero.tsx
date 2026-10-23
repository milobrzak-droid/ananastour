import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PineappleSlice, Stamp } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { SearchBox } from "@/components/tours/search-box";
import { ArrowIcon, Container, Notch } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { glue } from "./typo";

const C = {
  kicker: { uk: "Альона · тури українською", cs: "Aljona · česky i ukrajinsky" },
  line1: { uk: "Ваше море", cs: "Vaše moře" },
  line2: { uk: "з Чехії", cs: "z Česka" },
  lead: {
    uk: "Вам — море, а на нас — решта. Тури застрахованих чеських туроператорів, 3 готелі під ваші побажання й відповідь у Telegram зазвичай за 15 хвилин.",
    cs: "Vám moře – a na nás zbytek. Porovnám nabídky pojištěných českých CK, vyberu 3 hotely, které vám sednou, a na Telegramu odpovídám obvykle do 15 minut.",
  },
  cta: { uk: "Хочу на море", cs: "Chci k moři" },
  search: { uk: "Знайти тур", cs: "Najít zájezd" },
  replies: {
    uk: "На сайті нічого не платите · чеські CK застраховані від банкрутства",
    cs: "Na webu nic neplatíte · české CK jsou pojištěné proti úpadku",
  },
  photoAlt: { uk: "Море на заході сонця", cs: "Moře při západu slunce" },
  // Stamp: one sentence read top to bottom — "Ananas Tour from Czechia · checked by the pineapple · since 2011 · 22 countries in person".
  stampTop: { uk: "ANANAS TOUR • З ЧЕХІЇ", cs: "ANANAS TOUR • Z ČESKA" },
  stampAbove: { uk: ["ПЕРЕВІРЕНО"], cs: ["PROVĚŘENO"] },
  stampWord: { uk: "АНАНАСОМ", cs: "ANANASEM" },
  stampBelow: { uk: ["З 2011"], cs: ["OD 2011"] },
  stampBottom: { uk: "22 КРАЇНИ ОСОБИСТО", cs: "22 ZEMÍ OSOBNĚ" },
};

export function Hero({ locale }: { locale: Locale }) {
  return (
    <section className="relative pb-6 pt-2 sm:pt-4">
      <Container>
        {/* Photo card with the notched CTA cut out of its bottom-left corner */}
        <div className="relative isolate overflow-hidden rounded-[1.75rem] bg-ink text-white sm:rounded-[2.5rem]">
          {/* TODO(client): replace with Aljona's own hero photo. */}
          <Image
            src={ananasPhotos.hero.overwaterSunset}
            alt={t(C.photoAlt, locale)}
            fill
            priority
            sizes="(min-width: 1344px) 1300px, 100vw"
            className="-z-10 object-cover"
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/60 via-ink/15 to-ink/60" />
          {/* Scrim behind the headline: the white H1 sits on the bright sunset sky (brightest 10% behind the letters
              was 2.7:1). Holding ink/35 down to the horizon lifts it to ~4.7:1+, then fades out above the lead. */}
          <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-3/4 bg-gradient-to-b from-ink/40 via-ink/35 via-55% to-transparent" />

          <div className="flex min-h-[38rem] flex-col p-5 pb-24 sm:min-h-[40rem] sm:p-8 sm:pb-32 lg:min-h-[44rem] lg:p-10">
            <p className="inline-flex w-fit max-w-full items-center gap-2 whitespace-nowrap shape-pill bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-md max-[380px]:px-3 max-[380px]:text-[0.68rem] max-[380px]:tracking-[0.06em] sm:text-sm sm:normal-case sm:tracking-normal">
              <PineappleSlice kind="ring" size={18} texture={false} seed={2} />
              {glue(t(C.kicker, locale))}
            </p>

            {/* Giant headline, Reference 1: tight, uppercase, second line bleeding to the edges.
                Czech "Z ČESKA" (háčky) sets wider than "З ЧЕХІЇ", so it gets a smaller clamp.
                Accented caps (Č Ř Š, Ї) rise ~1em above the baseline in Unbounded: the second, bigger line
                keeps a tight leading but gets its own top padding so the accents clear the line above.
                On small phones line 1 wraps ("VAŠE / MOŘE"), so it needs a full 1.06 leading there. */}
            <h1 className="mt-6 font-display font-black uppercase leading-[0.96] tracking-[-0.035em] drop-shadow-[0_4px_30px_rgba(30,34,53,0.35)]">
              <span className="block text-[clamp(2.6rem,8.2vw,7.6rem)] max-sm:leading-[1.06]">{t(C.line1, locale)}</span>
              <span
                className={`-ml-[0.04em] block whitespace-nowrap pt-[0.2em] leading-[0.84] ${
                  locale === "cs"
                    ? "text-[clamp(2.4rem,13.2vw,12rem)] max-sm:text-[11.8vw]"
                    : "text-[clamp(2.6rem,15.4vw,14.6rem)] max-sm:text-[13.4vw]"
                }`}
              >
                {t(C.line2, locale)}
              </span>
            </h1>

            <div className="mt-auto flex flex-col items-start gap-4 pt-8 lg:ml-auto lg:max-w-md">
              <TelegramButton locale={locale} source="home-hero" size="md" label={t(C.cta, locale)} tone="white" className="sm:hidden" />
              <p className="rounded-3xl bg-ink/45 p-4 text-[0.95rem] leading-relaxed text-white backdrop-blur-md sm:text-base lg:p-5">
                {glue(t(C.lead, locale))}
              </p>
            </div>
          </div>

          {/* Notch with the main CTAs */}
          <Notch radius="2rem" className="pr-3 pt-3 sm:pr-4 sm:pt-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <a
                href="#search"
                className="group inline-flex min-h-14 items-center justify-between gap-4 shape-pill bg-red py-2 pl-7 pr-2 text-lg font-bold text-white shadow-[0_14px_30px_-14px_rgba(217,50,25,0.9)] transition hover:bg-red-dark"
              >
                {t(C.search, locale)}
                <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-ink transition group-hover:translate-x-0.5">
                  <ArrowIcon size={18} rotate={45} />
                </span>
              </a>
              <span className="hidden sm:block">
                <TelegramButton locale={locale} source="home-hero" size="lg" label={t(C.cta, locale)} />
              </span>
            </div>
          </Notch>

          <div className="absolute right-10 top-10 hidden xl:block">
            <Stamp
              size={150}
              top={t(C.stampTop, locale)}
              bottom={t(C.stampBottom, locale)}
              above={t(C.stampAbove, locale)}
              word={t(C.stampWord, locale)}
              below={t(C.stampBelow, locale)}
              className="drop-shadow-xl"
            />
          </div>
        </div>

        <div id="search" className="relative z-10 mt-4 scroll-mt-28 sm:mt-5">
          <SearchBox locale={locale} variant="hero" />
          <p className="mt-3 px-2 text-center text-sm text-ink/75">{t(C.replies, locale)}</p>
        </div>
      </Container>
    </section>
  );
}
