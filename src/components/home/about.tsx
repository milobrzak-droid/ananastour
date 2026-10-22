import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PineappleSlice, Stamp } from "@/components/brand/pineapple";
import { ButtonLink, Container, Eyebrow, Pill } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";

const C = {
  kicker: { uk: "Про мене", cs: "O mně" },
  hello: { uk: "Привіт! Я — Альона", cs: "Ahoj! Jsem Aljona" },
  p1: {
    uk: "Директорка агенції, і моє життя нерозривно пов'язане з туризмом з 2011 року. Для мене це не просто професія — це справжня пристрасть і стиль життя.",
    cs: "Ředitelka agentury a cestovní ruch je můj život už od roku 2011. Není to pro mě jen profese — je to opravdová vášeň a životní styl.",
  },
  p2: {
    uk: "Я особисто відвідала 22 країни і регулярно їжджу в рекламні тури, щоб на власні очі перевіряти готелі та знати ті нюанси, про які не напишуть у каталогах. Тепер я живу в Чехії і допомагаю українцям летіти у відпустку з Праги, Брно, Острави та Пардубіце.",
    cs: "Osobně jsem navštívila 22 zemí a pravidelně jezdím na inspekční cesty, abych hotely viděla na vlastní oči a znala detaily, které v katalozích nenajdete. Teď žiji v Česku a pomáhám Ukrajincům vyrazit na dovolenou z Prahy, Brna, Ostravy a Pardubic.",
  },
  awards: { uk: "Нагороди", cs: "Ocenění" },
  award1: { uk: "Премія Starway від Coral Travel", cs: "Ocenění Starway od Coral Travel" },
  award2: { uk: "ТОП-агенція продажів Join UP!", cs: "TOP prodejní agentura Join UP!" },
  more: { uk: "Більше про мене", cs: "Více o mně" },
  photoAlt: { uk: "Альона, засновниця Ananas Tour", cs: "Aljona, zakladatelka Ananas Tour" },
};

/** "About" mosaic (Reference 1): big portrait, grey text card, charcoal card, photo. */
export function AboutTeaser({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-[minmax(0,0.85fr)_1fr_1fr] md:grid-rows-[auto_auto]">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-grey sm:rounded-[2.5rem] md:row-span-2">
            <Image
              src={ananasPhotos.aljona.portrait}
              alt={t(C.photoAlt, locale)}
              fill
              sizes="(min-width: 768px) 30vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <Stamp
                size={128}
                top="ANANAS TOUR • ALJONA"
                bottom="SINCE 2011 • 22 COUNTRIES"
                above={["PERSONALLY", "CHECKED"]}
                word="HOTELS"
                below={["SINCE", "2011"]}
                className="drop-shadow-xl"
              />
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[2rem] bg-grey p-6 sm:rounded-[2.5rem] sm:p-9 md:col-span-2">
            <PineappleSlice kind="quarter" size={150} rotate={200} seed={8} className="absolute -right-10 -top-12 opacity-80" />
            <Eyebrow>{t(C.kicker, locale)}</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-black uppercase leading-[0.98] tracking-[-0.03em] sm:text-5xl">{t(C.hello, locale)}</h2>
            <p className="mt-5 text-lg font-medium text-ink/85">{t(C.p1, locale)}</p>
            <p className="mt-3 text-ink/75">{t(C.p2, locale)}</p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[2rem] bg-charcoal p-6 text-white sm:rounded-[2.5rem] sm:p-8">
            <div>
              <p className="eyebrow text-white/80">{t(C.awards, locale)}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="yellow">🏆 {t(C.award1, locale)}</Pill>
                <Pill tone="ice">★ {t(C.award2, locale)}</Pill>
              </div>
            </div>
            <ButtonLink href={routes.about(locale)} variant="light" className="self-start">
              {t(C.more, locale)} →
            </ButtonLink>
          </div>

          <div className="relative min-h-[14rem] overflow-hidden rounded-[2rem] bg-grey sm:rounded-[2.5rem]">
            <Image src={ananasPhotos.banner.resortPool} alt="" fill sizes="(min-width: 1024px) 22vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
