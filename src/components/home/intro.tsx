import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PHOTOS } from "@/components/brand/photos";
import Link from "next/link";
import { PineappleSlice } from "@/components/brand/pineapple";
import { RouteDoodle, type RoutePoint, type RouteStop } from "@/components/brand/route-doodle";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { glue } from "./typo";

const C = {
  brand: { uk: "«Ananas Tour»", cs: "„Ananas Tour“" },
  // The only place on the site where the A·NA·NÁS pun is spelled out.
  tagline: {
    uk: "— бо «ананас» звучить як «а на нас».",
    cs: "– protože „ananas“ zní jako „a na nás“.",
  },
  sub: {
    uk: "Ви кажете, куди й коли. Порівняти пропозиції чеських туроператорів, перевірити готель і документи — це на нас.",
    cs: "Vy řeknete kam a kdy. Porovnat nabídky českých CK, prověřit hotel, pohlídat doklady – to všechno je na nás.",
  },
  airports: {
    uk: "Виліт: Прага · Брно · Острава · Пардубиці · до Болгарії та Італії — й автобусом",
    cs: "Odlet: Praha · Brno · Ostrava · Pardubice · do Bulharska a Itálie i autobusem",
  },
  we: { uk: "Один", cs: "Jeden" },
  love: { uk: "чат", cs: "chat" },
  sea: { uk: "море", cs: "moře" },
  sentence: { uk: "Один чат — і ви біля моря", cs: "Jeden chat a jste u moře" },
  seaAlt: { uk: "Море", cs: "Moře" },
};

const STATS = [
  { value: "2011", label: { uk: "у туризмі", cs: "v cestovním ruchu" } },
  { value: "22", label: { uk: "країни на власні очі", cs: "zemí na vlastní oči" } },
  { value: "Starway", label: { uk: "учасниця премії Coral Travel", cs: "účast v ocenění Coral Travel" } },
  { value: "TOP", label: { uk: "агенцій Join UP! в Україні", cs: "agentur Join UP! na Ukrajině" } },
];

const POINTS: RoutePoint[] = [
  [18, 300],
  [120, 150],
  [250, 70],
  [330, 210],
  [470, 330],
  [600, 352],
  [730, 330],
  [870, 210],
  [950, 70],
  [1080, 150],
  [1182, 300],
];

function StatLabel({ value, label, className = "" }: { value: string; label: string; className?: string }) {
  return (
    <span className={`block min-w-0 rounded-xl bg-paper/90 px-1.5 py-0.5 leading-tight ${className}`}>
      {/* A stat value is one short word (≤ 7 characters, COPY-GUIDE §8): it never wraps. "Starway" is 5.5em wide,
          so below 370px the size follows the viewport and still fits the 2-column grid at 320px. */}
      <span className="block whitespace-nowrap font-display text-[clamp(1rem,5.4vw,1.25rem)] font-extrabold">{value}</span>
      <span className="block text-pretty text-xs text-ink/75">{glue(label)}</span>
    </span>
  );
}

/** Centred tagline framed by a dotted travel route with pins and photo bubbles. */
export function RouteTagline({ locale }: { locale: Locale }) {
  // Doodle labels wrap at a fixed measure so a longer label grows down, never sideways off the panel.
  const pinLabel = (i: number, measure = "max-w-[8.5rem]") => (
    <StatLabel value={STATS[i].value} label={t(STATS[i].label, locale)} className={measure} />
  );
  const stops: RouteStop[] = [
    { at: [120, 150], kind: "pin", tone: "red", label: pinLabel(0), labelSide: "left" },
    { at: [250, 70], kind: "photo", src: PHOTOS.island, size: 9.5 },
    { at: [330, 210], kind: "pin", tone: "ink", label: pinLabel(1), labelSide: "left" },
    { at: [470, 330], kind: "dot" },
    { at: [600, 352], kind: "photo", src: PHOTOS.planeWing, size: 6.5 },
    { at: [730, 330], kind: "dot" },
    { at: [870, 210], kind: "pin", tone: "ink", label: pinLabel(2), labelSide: "right" },
    { at: [950, 70], kind: "photo", src: PHOTOS.diving, size: 9.5 },
    // The last pin sits near the right edge: its label hangs below it so it can never run off the panel.
    // A narrower measure keeps that centred label clear of the "Starway" label to its left (they read as one run at 1280).
    { at: [1080, 150], kind: "pin", tone: "yellow", label: pinLabel(3, "max-w-[7rem]"), labelSide: "bottom" },
  ];

  const text = (
    <div className="mx-auto max-w-xl px-4 text-center">
      <PineappleSlice kind="ring" size={54} seed={12} className="mx-auto" />
      {/* The brand never splits and the dash stays on its line (NBSP), so no line starts with "—".
          "«ANANAS TOUR» —" is ~12em wide: on phones the size follows the viewport so that unit always fits. */}
      <p className="mt-4 text-balance font-display text-[clamp(1.125rem,6vw,1.5rem)] font-extrabold uppercase leading-[1.1] sm:text-[2rem]">
        <span className="whitespace-nowrap">{t(C.brand, locale)}</span>
        {" "}
        <span className="normal-case">{glue(t(C.tagline, locale))}</span>
      </p>
      <p className="mx-auto mt-3 max-w-md text-pretty text-sm text-ink/75">{glue(t(C.sub, locale))}</p>
    </div>
  );

  return (
    <section className="py-10 sm:py-14">
      <Container>
        {/* Wide desktop: the route doodle wraps the tagline (below xl the pins would sit on the tagline). */}
        <div className="hidden xl:block">
          <RouteDoodle points={POINTS} stops={stops} width={1200} height={400}>
            <div className="-mt-16">{text}</div>
          </RouteDoodle>
        </div>

        {/* Mobile / tablet / small laptop: tagline + stats as a compact route */}
        <div className="xl:hidden">
          {text}
          <ol className="relative mx-auto mt-8 grid max-w-lg grid-cols-2 gap-x-3 gap-y-6 max-[359px]:gap-x-2 sm:max-w-xl md:max-w-3xl md:grid-cols-4">
            {STATS.map((s, i) => (
              <li key={s.value} className="flex min-w-0 items-center gap-3 max-[359px]:gap-2">
                <span className={`h-3.5 w-3.5 shrink-0 rounded-full border-[3px] border-ink ${i % 2 ? "bg-yellow" : "bg-red"}`} aria-hidden />
                <StatLabel value={s.value} label={t(s.label, locale)} />
              </li>
            ))}
          </ol>
        </div>
        {/* Each "·" is glued to the word before it, so it always ends a line and never starts one. */}
        <p className="mt-6 text-balance text-center text-xs font-bold uppercase tracking-[0.2em] text-ink/75">
          {glue(t(C.airports, locale)).replace(/ · /g, " · ")}
        </p>
      </Container>
    </section>
  );
}

/** "One · chat → sea": a sentence built from four big pills (Reference 1). */
export function PillSentence({ locale }: { locale: Locale }) {
  // In the md+ row the word pills never shrink below their word (flex-basis auto, shrink 0);
  // the arrow pill takes up the slack instead, and gets its fixed width back only on wide screens.
  const word =
    "font-display font-black uppercase tracking-[-0.03em] leading-none whitespace-nowrap max-md:text-[5.3vw] md:text-[clamp(1.3rem,3.4vw,3.9rem)]";
  const scrim = "shape-pill bg-ink/60 px-4 py-1.5 backdrop-blur-[2px] sm:px-6 sm:py-2 md:px-3 lg:px-5 xl:px-6";
  return (
    <section className="py-6 sm:py-10" aria-label={t(C.sentence, locale)}>
      <Container>
        <Link
          href={routes.destinations(locale)}
          className="group grid grid-cols-2 gap-2 sm:gap-3 md:flex md:h-32 lg:h-40"
          aria-label={t(C.sentence, locale)}
        >
          <span aria-hidden className={`grid h-24 place-items-center shape-pill bg-grey px-10 md:h-auto md:shrink-0 md:px-6 lg:px-10 xl:px-16 ${word}`}>
            {t(C.we, locale)}
          </span>
          <span aria-hidden className={`relative isolate grid h-24 place-items-center overflow-hidden shape-pill px-3 text-white md:h-auto md:flex-[1.6_0_auto] md:px-4 lg:px-6 xl:px-8 ${word}`}>
            <Image src={ananasPhotos.banner.palmBeach} alt="" fill sizes="(min-width: 768px) 30vw, 50vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
            {/* The word carries its own scrim so the photo stays visible around it. */}
            <span className={scrim}>{t(C.love, locale)}</span>
          </span>
          <span aria-hidden className="grid h-24 place-items-center shape-pill bg-yellow md:h-auto md:min-w-20 md:flex-[1_1_5rem] xl:w-56 xl:flex-none">
            <span className="transition duration-300 group-hover:translate-x-2">
              <svg viewBox="0 0 64 32" className="h-10 w-20 md:h-8 md:w-16 lg:h-12 lg:w-24 xl:h-14 xl:w-28" aria-hidden>
                <path d="M3 16h54M43 4l14 12-14 12" fill="none" stroke="var(--c-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
          <span aria-hidden className={`relative isolate grid h-24 place-items-center overflow-hidden shape-pill px-3 text-white md:h-auto md:flex-[1.5_0_auto] md:px-4 lg:px-6 xl:px-8 ${word}`}>
            <Image src={ananasPhotos.banner.maldivesAerial} alt="" fill sizes="(min-width: 768px) 35vw, 50vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
            <span className={scrim}>{t(C.sea, locale)}</span>
          </span>
        </Link>
      </Container>
    </section>
  );
}

