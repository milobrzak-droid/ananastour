import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PineappleSlice, type SliceKind } from "@/components/brand/pineapple";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { fitLongestWord, glue, leadingFor } from "./typo";

const C = {
  // A·NA·NÁS pun, once on this screen — every tile below is the proof of what is "on us".
  title: { uk: "А що на нас?", cs: "A co je na nás?" },
};

const POINTS: Array<{ title: Record<Locale, string>; text: Record<Locale, string>; slice: Exclude<SliceKind, "ring"> }> = [
  {
    slice: "half",
    title: { uk: "Гроші під захистом", cs: "Peníze v suchu" },
    text: {
      uk: "Я продаю тури лише чеських туроператорів, а кожен за законом застрахований від банкрутства. Це закон, а не моя обіцянка.",
      cs: "Prodávám jen zájezdy českých CK a každá musí být ze zákona pojištěná proti úpadku. To není můj slib, to je zákon.",
    },
  },
  {
    slice: "quarter",
    title: { uk: "Людина, а не бот", cs: "Člověk, ne robot" },
    text: {
      uk: "Пишете в Telegram — відповідаю я, з 9:00 до 21:00 зазвичай за 15 хвилин. Пізно ввечері? Відповім зранку, за першою кавою.",
      cs: "Na Telegramu odpovídám já sama – od 9 do 21 h obvykle do 15 minut. Pozdě večer? Ráno u první kávy.",
    },
  },
  {
    slice: "wedge",
    title: { uk: "Бачила сама", cs: "Na vlastní oči" },
    text: {
      uk: "Регулярно їжджу перевіряти готелі. Тож скажу не лише, скільки в готелю зірок, а й чи заслужені вони.",
      cs: "Pravidelně jezdím kontrolovat hotely. Řeknu vám nejen, kolik má hotel hvězd, ale i jestli si je zaslouží.",
    },
  },
];

const TILE_PHOTOS = [ananasPhotos.services.flights, ananasPhotos.banner.beachUmbrella, ananasPhotos.banner.palmBeach];
const TONES = ["bg-grey text-ink", "bg-yellow text-ink", "bg-charcoal text-white"];

/** Itinerary-like tile mosaic (Reference 1): photo and text tiles in a checkerboard. */
export function WhyUs({ locale }: { locale: Locale }) {
  const tile = "relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]";
  const text = (i: number) => {
    const p = POINTS[i];
    const dark = i === 2;
    return (
      <li key={`t${i}`} className={`${tile} ${TONES[i]} @container flex min-h-[16rem] flex-col p-6 sm:p-8`}>
        <PineappleSlice
          kind={p.slice}
          size={84}
          seed={i * 7 + 3}
          rotate={i * 40 + 20}
          color={i === 1 ? "var(--c-paper)" : "var(--c-yellow)"}
          fibre={i === 1 ? "var(--c-yellow)" : "#fff"}
          className="absolute -right-3 -top-3"
        />
        <span className={`font-display text-sm font-extrabold ${dark ? "text-yellow" : "text-ink/75"}`}>0{i + 1}</span>
        {/* Sized to the tile: in the 3-column mosaic (~160px of text) "ЗАХИСТОМ" shrinks instead of splitting. */}
        <h3
          className="mt-auto text-balance pt-8 font-display text-[clamp(1.05rem,var(--fit),1.5rem)] font-extrabold uppercase leading-tight"
          style={fitLongestWord(t(p.title, locale))}
        >
          {glue(t(p.title, locale))}
        </h3>
        <p className={`mt-2 text-pretty text-[0.95rem] ${dark ? "text-white/85" : "text-ink/80"}`}>{glue(t(p.text, locale))}</p>
      </li>
    );
  };
  const photo = (i: number) => (
    <li key={`p${i}`} aria-hidden className={`${tile} hidden min-h-[16rem] bg-grey md:block`}>
      <Image src={TILE_PHOTOS[i]} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
    </li>
  );
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <h2
          className={`mb-8 max-w-3xl text-balance font-display text-[clamp(2rem,4.4vw,3.6rem)] font-black uppercase tracking-[-0.03em] ${leadingFor(t(C.title, locale))}`}
        >
          {glue(t(C.title, locale))}
        </h2>
        <ol className="grid gap-3 sm:gap-4 md:grid-cols-3">
          {photo(0)}
          {text(0)}
          {photo(1)}
          {text(1)}
          {photo(2)}
          {text(2)}
        </ol>
      </Container>
    </section>
  );
}
