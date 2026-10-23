import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PineappleSlice, Stamp } from "@/components/brand/pineapple";
import { ButtonLink, Container, Eyebrow, Pill } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { fitLongestWord, glue, hasAccents } from "./typo";

const C = {
  kicker: { uk: "Про мене", cs: "O mně" },
  hello: { uk: "Привіт, я Альона", cs: "Těší mě, jsem Aljona" },
  p1: {
    uk: "З 2011 року відправляю людей на море. Побувала в 22 країнах і досі регулярно їжджу перевіряти готелі — щоб радити те, що бачила сама, а не те, що гарно виглядає в каталозі.",
    cs: "Lidi k moři posílám od roku 2011. Navštívila jsem 22 zemí a dodnes pravidelně jezdím hotely kontrolovat – abych doporučovala to, co jsem viděla sama, a ne to, co jen hezky vypadá v katalogu.",
  },
  p2: {
    uk: "Тепер я теж живу в Чехії — і знаю, як хочеться до моря. Пишіть українською чи чеською: поясню все простими словами.",
    cs: "Teď žiju v Česku a vím, jak moc se odsud chce k moři. Psát mi můžete česky i ukrajinsky – všechno vysvětlím lidsky.",
  },
  // Recognition, worded exactly: participant (not winner), repeatedly in the TOP, both still in Ukraine.
  awards: { uk: "Визнання · ще в Україні", cs: "Uznání · ještě na Ukrajině" },
  award1: { uk: "Учасниця Starway · Coral Travel", cs: "Účastnice Starway · Coral Travel" },
  // Short form of the canonical pill "ТОП Join UP!" (COPY-GUIDE §7.2) so it stays one line in the narrow card.
  award2: { uk: "Неодноразово в ТОП Join UP!", cs: "Opakovaně v TOP Join UP!" },
  more: { uk: "Більше про мене", cs: "Víc o mně" },
  photoAlt: { uk: "Альона, директорка Ananas Tour", cs: "Aljona, která vede Ananas Tour" },
  // Stamp on the portrait: "Ananas Tour • Aljona / The catalogue is silent. I'm not. / I've seen the hotels myself".
  // The bottom arc stays ≤ 18 characters so it reads at 128px without running into the top arc.
  stampTop: { uk: "ANANAS TOUR • АЛЬОНА", cs: "ANANAS TOUR • ALJONA" },
  stampAbove: { uk: ["КАТАЛОГ"], cs: ["KATALOG"] },
  stampWord: { uk: "МОВЧИТЬ", cs: "MLČÍ" },
  stampBelow: { uk: ["Я — НІ"], cs: ["JÁ NE"] },
  stampBottom: { uk: "ГОТЕЛІ БАЧИЛА САМА", cs: "HOTELY JSEM VIDĚLA" },
};

/**
 * "About" mosaic (Reference 1): big portrait, grey text card, charcoal card, photo.
 * md: two columns (portrait | text over charcoal, photo strip below); lg: the full three-column mosaic.
 */
export function AboutTeaser({ locale }: { locale: Locale }) {
  const hello = t(C.hello, locale);
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-3 sm:gap-4 md:grid-cols-2 lg:grid-cols-[minmax(0,0.85fr)_1fr_1fr] lg:grid-rows-[auto_auto]">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2rem] bg-grey sm:rounded-[2.5rem] md:row-span-2">
            <Image
              src={ananasPhotos.aljona.portrait}
              alt={t(C.photoAlt, locale)}
              fill
              sizes="(min-width: 1024px) 30vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <Stamp
                size={128}
                top={t(C.stampTop, locale)}
                bottom={t(C.stampBottom, locale)}
                above={t(C.stampAbove, locale)}
                word={t(C.stampWord, locale)}
                below={t(C.stampBelow, locale)}
                className="drop-shadow-xl"
              />
            </div>
          </div>

          <div className="@container relative isolate overflow-hidden rounded-[2rem] bg-grey p-6 sm:rounded-[2.5rem] sm:p-9 lg:col-span-2">
            {/* Decor sits in the corner and behind the text (isolate + -z-10), so it can never paint over the heading's accents. */}
            <PineappleSlice kind="quarter" size={150} rotate={200} seed={8} className="absolute -right-14 -top-16 -z-10 opacity-80" />
            <Eyebrow>{t(C.kicker, locale)}</Eyebrow>
            {/* From sm the size follows the card, so "АЛЬОНА" fits the half-width md card; accents get a full leading. */}
            <h2
              className={`mt-3 text-balance font-display text-3xl font-black uppercase tracking-[-0.03em] sm:text-[clamp(1.875rem,var(--fit),3rem)] ${hasAccents(hello) ? "leading-[1.06]" : "leading-[0.98]"}`}
              style={fitLongestWord(hello)}
            >
              {glue(hello)}
            </h2>
            <p className="mt-5 text-pretty text-lg font-medium text-ink/85">{glue(t(C.p1, locale))}</p>
            <p className="mt-3 text-pretty text-ink/75">{glue(t(C.p2, locale))}</p>
          </div>

          <div className="flex min-w-0 flex-col justify-between gap-6 rounded-[2rem] bg-charcoal p-6 text-white sm:rounded-[2.5rem] sm:p-8">
            <div>
              <p className="eyebrow text-balance text-white/80">{glue(t(C.awards, locale))}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Pill tone="yellow">{glue(t(C.award1, locale))}</Pill>
                <Pill tone="ice">{glue(t(C.award2, locale))}</Pill>
              </div>
            </div>
            <ButtonLink href={routes.about(locale)} variant="light" className="self-start whitespace-nowrap">
              {t(C.more, locale)} →
            </ButtonLink>
          </div>

          <div className="relative min-h-[14rem] overflow-hidden rounded-[2rem] bg-grey sm:rounded-[2.5rem] md:col-span-2 lg:col-span-1">
            <Image src={ananasPhotos.banner.resortPool} alt="" fill sizes="(min-width: 1024px) 22vw, 100vw" className="object-cover" />
          </div>
        </div>
      </Container>
    </section>
  );
}
