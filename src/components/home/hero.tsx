import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PineappleSlice, Stamp } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { SearchBox } from "@/components/tours/search-box";
import { ArrowIcon, Container, Notch } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";

const C = {
  kicker: { uk: "Турагенція для українців у Чехії", cs: "Cestovní agentura pro Ukrajince v Česku" },
  line1: { uk: "Ваше море", cs: "Vaše moře" },
  line2: { uk: "з Праги", cs: "z Prahy" },
  lead: {
    uk: "Тури від перевірених чеських туроператорів з вильотом із Праги, Брна, Острави та Пардубиць. Напишіть Альоні — 3 найкращі варіанти за 15 хвилин.",
    cs: "Zájezdy od ověřených českých cestovních kanceláří s odletem z Prahy, Brna, Ostravy a Pardubic. Napište Aljoně — 3 nejlepší varianty do 15 minut.",
  },
  cta: { uk: "Підберіть мені тур", cs: "Vyberte mi zájezd" },
  search: { uk: "Знайти тур", cs: "Najít zájezd" },
  replies: { uk: "Відповідаю українською та чеською", cs: "Odpovídám ukrajinsky i česky" },
  photoAlt: { uk: "Пляж і море", cs: "Pláž a moře" },
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

          <div className="flex min-h-[38rem] flex-col p-5 pb-24 sm:min-h-[40rem] sm:p-8 sm:pb-32 lg:min-h-[44rem] lg:p-10">
            <p className="inline-flex w-fit items-center gap-2 shape-pill bg-white/15 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] backdrop-blur-md sm:text-sm sm:normal-case sm:tracking-normal">
              <PineappleSlice kind="ring" size={18} texture={false} seed={2} />
              {t(C.kicker, locale)}
            </p>

            {/* Giant headline, Reference 1: tight, uppercase, second line bleeding to the edges.
                Czech "Z PRAHY" sets wider than "З ПРАГИ", so it gets a smaller clamp. */}
            <h1 className="mt-6 font-display font-black uppercase leading-[0.86] tracking-[-0.045em] drop-shadow-[0_4px_30px_rgba(30,34,53,0.35)]">
              <span className="block text-[clamp(2.6rem,8.2vw,7.6rem)]">{t(C.line1, locale)}</span>
              <span
                className={`-ml-[0.04em] block whitespace-nowrap ${
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
                {t(C.lead, locale)}
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
              top="ANANAS TOUR • TRAVEL"
              bottom="SINCE 2011 • 22 COUNTRIES"
              above={["FINEST", "HOLIDAYS"]}
              word="ANANAS"
              below={["FROM", "PRAGUE"]}
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
