import Image from "next/image";
import { ananasPhotos } from "@/content/ananas-photos";
import { PineappleSlice, type SliceKind } from "@/components/brand/pineapple";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";

const C = {
  title: { uk: "Чому нас обирають?", cs: "Proč si vybrat nás?" },
};

const POINTS: Array<{ title: Record<Locale, string>; text: Record<Locale, string>; slice: Exclude<SliceKind, "ring"> }> = [
  {
    slice: "half",
    title: { uk: "Надійність", cs: "Spolehlivost" },
    text: {
      uk: "Працюємо лише з перевіреними чеськими туроператорами за офіційними договорами. Кожна CK в Чехії зобов'язана мати страхування від банкрутства — ваші кошти та відпочинок у безпеці.",
      cs: "Spolupracujeme jen s prověřenými českými cestovními kancelářemi na základě oficiálních smluv. Každá CK v Česku musí mít pojištění proti úpadku — vaše peníze i dovolená jsou v bezpečí.",
    },
  },
  {
    slice: "quarter",
    title: { uk: "Підтримка 24/7", cs: "Podpora 24/7" },
    text: {
      uk: "Ми завжди на зв'язку в Telegram. Супроводжуємо вас від вильоту з аеропорту до щасливого повернення додому — українською чи чеською.",
      cs: "Jsme stále na Telegramu. Provázíme vás od odletu z letiště až po šťastný návrat domů — ukrajinsky i česky.",
    },
  },
  {
    slice: "wedge",
    title: { uk: "Експертність", cs: "Odbornost" },
    text: {
      uk: "Особисто інспектуємо курорти і жили в більшості готелів, які пропонуємо. Рекомендуємо лише найкраще.",
      cs: "Letoviska osobně prověřujeme a ve většině nabízených hotelů jsme sami bydleli. Doporučujeme jen to nejlepší.",
    },
  },
];

const TILE_PHOTOS = [ananasPhotos.services.flights, ananasPhotos.banner.beachUmbrella, ananasPhotos.banner.resortPool];
const TONES = ["bg-grey text-ink", "bg-yellow text-ink", "bg-charcoal text-white"];

/** Itinerary-like tile mosaic (Reference 1): photo and text tiles in a checkerboard. */
export function WhyUs({ locale }: { locale: Locale }) {
  const tile = "relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem]";
  const text = (i: number) => {
    const p = POINTS[i];
    const dark = i === 2;
    return (
      <li key={`t${i}`} className={`${tile} ${TONES[i]} flex min-h-[16rem] flex-col p-6 sm:p-8`}>
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
        <h3 className="mt-auto pt-8 font-display text-2xl font-extrabold uppercase">{t(p.title, locale)}</h3>
        <p className={`mt-2 text-[0.95rem] ${dark ? "text-white/85" : "text-ink/80"}`}>{t(p.text, locale)}</p>
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
        <h2 className="mb-8 max-w-3xl font-display text-[clamp(2rem,4.4vw,3.6rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">
          {t(C.title, locale)}
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
