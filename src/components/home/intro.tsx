import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PHOTOS } from "@/components/brand/photos";
import Link from "next/link";
import { PineappleSlice } from "@/components/brand/pineapple";
import { RouteDoodle, type RoutePoint, type RouteStop } from "@/components/brand/route-doodle";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";

const C = {
  tagline: {
    uk: "— ваш ключ до незабутніх подорожей з Чехії!",
    cs: "— váš klíč k nezapomenutelným cestám z Česka!",
  },
  sub: {
    uk: "Тури від перевірених чеських туроператорів. Вильоти з Праги, Брно, Острави та Пардубіце.",
    cs: "Zájezdy od ověřených českých cestovních kanceláří. Odlety z Prahy, Brna, Ostravy a Pardubic.",
  },
  airports: { uk: "Виліт", cs: "Odlet" },
  we: { uk: "Ми", cs: "My" },
  love: { uk: "любимо", cs: "milujeme" },
  sea: { uk: "море", cs: "moře" },
  sentence: { uk: "Ми любимо море", cs: "Milujeme moře" },
  seaAlt: { uk: "Море", cs: "Moře" },
};

const STATS = [
  { value: "2011", label: { uk: "у туризмі", cs: "v cestovním ruchu" } },
  { value: "22", label: { uk: "країни особисто", cs: "zemí osobně" } },
  { value: "Starway", label: { uk: "премія Coral Travel", cs: "ocenění Coral Travel" } },
  { value: "TOP", label: { uk: "агенція Join UP!", cs: "agentura Join UP!" } },
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

function StatLabel({ value, label }: { value: string; label: string }) {
  return (
    <span className="block rounded-xl bg-paper/90 px-1.5 py-0.5 leading-tight">
      <span className="block font-display text-xl font-extrabold">{value}</span>
      <span className="block text-xs text-ink/75">{label}</span>
    </span>
  );
}

/** Centred tagline framed by a dotted travel route with pins and photo bubbles. */
export function RouteTagline({ locale }: { locale: Locale }) {
  const stops: RouteStop[] = [
    { at: [120, 150], kind: "pin", tone: "red", label: <StatLabel value={STATS[0].value} label={t(STATS[0].label, locale)} />, labelSide: "left" },
    { at: [250, 70], kind: "photo", src: PHOTOS.island, size: 9.5 },
    { at: [330, 210], kind: "pin", tone: "ink", label: <StatLabel value={STATS[1].value} label={t(STATS[1].label, locale)} />, labelSide: "left" },
    { at: [470, 330], kind: "dot" },
    { at: [600, 352], kind: "photo", src: PHOTOS.planeWing, size: 6.5 },
    { at: [730, 330], kind: "dot" },
    { at: [870, 210], kind: "pin", tone: "ink", label: <StatLabel value={STATS[2].value} label={t(STATS[2].label, locale)} />, labelSide: "right" },
    { at: [950, 70], kind: "photo", src: PHOTOS.diving, size: 9.5 },
    { at: [1080, 150], kind: "pin", tone: "yellow", label: <StatLabel value={STATS[3].value} label={t(STATS[3].label, locale)} />, labelSide: "right" },
  ];

  const text = (
    <div className="mx-auto max-w-xl px-4 text-center">
      <PineappleSlice kind="ring" size={54} seed={12} className="mx-auto" />
      <p className="mt-4 font-display text-2xl font-extrabold uppercase leading-[1.1] sm:text-[2rem]">
        «Ananas Tour» <span className="normal-case">{t(C.tagline, locale)}</span>
      </p>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink/75">{t(C.sub, locale)}</p>
    </div>
  );

  return (
    <section className="py-10 sm:py-14">
      <Container>
        {/* Desktop: the route doodle wraps the tagline */}
        <div className="hidden lg:block">
          <RouteDoodle points={POINTS} stops={stops} width={1200} height={400}>
            <div className="-mt-16">{text}</div>
          </RouteDoodle>
        </div>

        {/* Mobile / tablet: tagline + stats as a compact route */}
        <div className="lg:hidden">
          {text}
          <ol className="relative mx-auto mt-8 grid max-w-lg grid-cols-2 gap-x-4 gap-y-6 sm:grid-cols-4">
            {STATS.map((s, i) => (
              <li key={s.value} className="flex items-center gap-3">
                <span className={`h-3.5 w-3.5 shrink-0 rounded-full border-[3px] border-ink ${i % 2 ? "bg-yellow" : "bg-red"}`} aria-hidden />
                <StatLabel value={s.value} label={t(s.label, locale)} />
              </li>
            ))}
          </ol>
        </div>
        <p className="mt-6 text-center text-xs font-bold uppercase tracking-[0.2em] text-ink/75">
          {t(C.airports, locale)}: Praha PRG · Brno BRQ · Ostrava OSR · Pardubice PED
        </p>
      </Container>
    </section>
  );
}

/** "We love → sea": a sentence built from four big pills (Reference 1). */
export function PillSentence({ locale }: { locale: Locale }) {
  const word = "font-display font-black uppercase tracking-[-0.03em] text-[clamp(1.3rem,3.7vw,3.9rem)] max-md:text-[5.3vw] leading-none";
  return (
    <section className="py-6 sm:py-10" aria-label={t(C.sentence, locale)}>
      <Container>
        <Link
          href={routes.destinations(locale)}
          className="group grid grid-cols-2 gap-2 sm:gap-3 md:flex md:h-32 lg:h-40"
          aria-label={t(C.sentence, locale)}
        >
          <span aria-hidden className={`grid h-24 place-items-center shape-pill bg-grey px-10 md:h-auto lg:px-16 ${word}`}>
            {t(C.we, locale)}
          </span>
          <span aria-hidden className={`relative isolate grid h-24 place-items-center overflow-hidden shape-pill px-3 text-white md:px-8 md:h-auto md:flex-[1.6] ${word}`}>
            <Image src={ananasPhotos.banner.palmBeach} alt="" fill sizes="(min-width: 768px) 30vw, 50vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 -z-10 bg-ink/55" />
            {t(C.love, locale)}
          </span>
          <span aria-hidden className="grid h-24 place-items-center shape-pill bg-yellow md:h-auto md:w-44 lg:w-56">
            <span className="transition duration-300 group-hover:translate-x-2">
              <svg viewBox="0 0 64 32" className="h-10 w-20 lg:h-14 lg:w-28" aria-hidden>
                <path d="M3 16h54M43 4l14 12-14 12" fill="none" stroke="var(--c-ink)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </span>
          <span aria-hidden className={`relative isolate grid h-24 place-items-center overflow-hidden shape-pill px-3 text-white md:px-8 md:h-auto md:flex-[1.5] ${word}`}>
            <Image src={ananasPhotos.banner.maldivesAerial} alt="" fill sizes="(min-width: 768px) 35vw, 50vw" className="-z-10 object-cover transition duration-700 group-hover:scale-105" />
            <span className="absolute inset-0 -z-10 bg-ink/55" />
            {t(C.sea, locale)}
          </span>
        </Link>
      </Container>
    </section>
  );
}

