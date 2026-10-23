import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PHOTOS } from "@/components/brand/photos";
import { ananasPhotos } from "@/content/ananas-photos";
import { CircleBadge, PineapplePattern, PineappleSlice, Stamp } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { ButtonLink, Container, Section } from "@/components/ui";
import { site } from "@/config/site";
import { isLocale, t, type Locale } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";

type L = Record<Locale, string>;

const copy = {
  metaTitle: { uk: "Про мене: Альона, 22 країни на власні очі", cs: "O mně: Aljona, 22 zemí na vlastní oči" },
  metaDescription: {
    uk: "Альона веде Ananas Tour особисто: з 2011 року в туризмі, 22 країни на власні очі, готелі регулярно перевіряє наживо. Напишіть їй у Telegram.",
    cs: "Ananas Tour vede Aljona osobně: v cestovním ruchu od roku 2011, 22 zemí na vlastní oči a hotely pravidelně kontroluje přímo na místě. Napište jí na Telegram.",
  },
  eyebrow: { uk: "Про мене", cs: "O mně" },
  title: { uk: "Привіт, я Альона", cs: "Těší mě, jsem Aljona" },
  lead: {
    uk: "Веду Ananas Tour особисто: з 2011 року в туризмі, 22 країни на власні очі. Раніше — Київ, тепер — Чехія. У Telegram відповідаю сама, без кол-\u2060центру.",
    cs: "V cestovním ruchu pracuju od roku 2011 a 22 zemí jsem viděla na vlastní oči. Dřív Kyjev, teď Česko. Ananas Tour vedu osobně, takže na Telegramu odpovídám já, ne call centrum.",
  },
  cta: { uk: "Написати Альоні", cs: "Napsat Aljoně" },
  prefill: {
    uk: "Добрий день, Альоно! Хочу на море.\nКуди: …\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: …",
    cs: "Dobrý den, Aljono! Chci k moři.\nKam: …\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: …",
  },
  services: { uk: "Усі послуги", cs: "Všechny služby" },
  photoAlt: { uk: "Альона, директорка Ananas Tour", cs: "Aljona, která vede Ananas Tour" },
  eventAlt: { uk: "Альона на заході туроператора Join UP!", cs: "Aljona na akci cestovní kanceláře Join UP!" },
  statYears: { uk: "років у туризмі — з 2011-го", cs: "let v oboru – od roku 2011" },
  statCountries: { uk: "країни на власні очі", cs: "zemí na vlastní oči" },
  statReply: { uk: "хвилин зазвичай чекаєте на відповідь (9:00–\u206021:00)", cs: "minut obvykle čekáte na odpověď (9–\u206021 h)" },
  storyTitle: { uk: "Каталог мовчить. Я — ні.", cs: "Katalog mlčí. Já ne." },
  values: { uk: "Мої правила", cs: "Moje pravidla" },
  valuesLead: { uk: "Їх лише три, і жодне не написане дрібним шрифтом.", cs: "Jsou jen tři a ani jedno není psané drobným písmem." },
  awardsTitle: { uk: "Визнання", cs: "Uznání" },
  awardsLead: {
    uk: "Мою роботу помітили й туроператори — ще в Україні.",
    cs: "Mé práce si všimly i cestovní kanceláře – ještě na Ukrajině.",
  },
  whyTitle: { uk: "А що на нас?", cs: "A co je na nás?" },
  finalTitle: { uk: "Ваша відпустка — моя візитівка", cs: "Vaše dovolená, moje vizitka" },
  finalText: {
    uk: "Напишіть, куди, коли й скільки вас, — я надішлю 3 готелі, які сама б обрала на вашому місці. З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин.",
    cs: "Napište mi kam, kdy a kolik vás je – pošlu 3 hotely, které bych na vašem místě vybrala sama. Od 9 do 21 h odpovídám obvykle do 15 minut.",
  },
} satisfies Record<string, L>;

// Portrait stamp, read top to bottom: "Ananas Tour · Aljona — 22 countries live, not from a catalogue — since 2011, now in Czechia".
const stamp = {
  top: { uk: "ANANAS TOUR • АЛЬОНА", cs: "ANANAS TOUR • ALJONA" },
  above: { uk: ["22 КРАЇНИ"], cs: ["22 ZEMÍ"] },
  word: { uk: "НАЖИВО", cs: "NAŽIVO" },
  below: { uk: ["НЕ", "З КАТАЛОГУ"], cs: ["NE", "Z KATALOGU"] },
  bottom: { uk: "З 2011 • ТЕПЕР У ЧЕХІЇ", cs: "OD 2011 • TEĎ V ČESKU" },
};

// Order matches the layout: [0] grey tile "01", [1] yellow tile "02", [2] text under storyTitle.
const story: L[] = [
  {
    uk: "22 країни навчили мене читати готельні фото: ширококутний об’єктив, вигідний ракурс і «5 хвилин до моря», якщо бігти. А де не була сама — так і скажу.",
    cs: "22 zemí mě naučilo číst hotelové fotky: širokoúhlý objektiv, lichotivý úhel a „5 minut k moři“ – když poběžíte. A kde jsem sama nebyla, to vám řeknu na rovinu.",
  },
  {
    uk: "Тепер я живу в Чехії, як і ви, — і так само рахую дні до відпустки. Тож знаю, як тут усе влаштовано: ціни в кронах, договір чеською, а пояснення від мене — українською.",
    cs: "Teď žiju v Česku, stejně jako vy, a taky odpočítávám dny do dovolené. Vím, jak to tu chodí: ceny v korunách, smlouva o zájezdu, stornopodmínky. Všechno vám vysvětlím lidsky – česky i ukrajinsky.",
  },
  {
    uk: "Я регулярно їжджу перевіряти готелі — не на рендерах, а наживо: де тінь біля басейну, скільки насправді йти до моря й чи заслужені зірки. Як ананас, я колюча до готелів — щоб вам було солодко.",
    cs: "Pravidelně jezdím na inspekční cesty, protože hotely nesoudím podle vizualizací. Na místě zjišťuju, kde je u bazénu stín, kolik je to doopravdy k moři a jestli si hotel ty hvězdy zaslouží. Jako ananas: na hotely jsem pichlavá – abyste to vy měli sladké.",
  },
];

const values: Array<{ title: L; text: L }> = [
  {
    title: { uk: "Чесно", cs: "Poctivě" },
    text: {
      uk: "Якщо готель не вартий своїх грошей, так і скажу, — навіть якщо його легше продати.",
      cs: "Když hotel za ty peníze nestojí, řeknu vám to na rovinu. I kdyby se prodával sám.",
    },
  },
  {
    title: { uk: "Особисто", cs: "Osobně" },
    text: {
      uk: "Ви пишете мені, а не в кол-\u2060центр. Ваш тур веду сама — від першого повідомлення.",
      cs: "Píšete mně, ne call centru. O váš zájezd se starám sama, od první zprávy.",
    },
  },
  {
    title: { uk: "До повернення", cs: "Až do návratu" },
    text: {
      uk: "Щось пішло не так на відпочинку? Пишіть у той самий чат — розберемося разом із туроператором.",
      cs: "Něco se na dovolené pokazilo? Napište do stejného chatu, s CK to spolu vyřešíme.",
    },
  },
];

// TODO(client): confirm award years and add logos/certificate photos.
// Worded exactly: participant (not winner), repeatedly in the TOP — both still in Ukraine.
const awards: Array<{ title: L; text: L }> = [
  {
    title: { uk: "Starway від Coral Travel", cs: "Starway od Coral Travel" },
    text: {
      uk: "Учасниця премії Starway туроператора Coral Travel.",
      cs: "Účastnice ocenění Starway, které uděluje cestovní kancelář Coral Travel.",
    },
  },
  {
    title: { uk: "ТОП Join UP!", cs: "TOP Join UP!" },
    text: {
      uk: "Неодноразово серед ТОП-\u2060агенцій за продажами в туроператора Join\u00A0UP!",
      cs: "Opakovaně mezi TOP prodejními agenturami cestovní kanceláře Join\u00A0UP!",
    },
  },
];

// "A·NA·NÁS": what exactly is on me — money, price, documents.
const why: Array<{ title: L; text: L }> = [
  {
    title: { uk: "Гроші під захистом", cs: "Peníze v suchu" },
    text: {
      uk: "Продаю тури лише чеських туроператорів, а кожен із них обов’язково застрахований від банкрутства. Це закон, а не моя обіцянка.",
      cs: "Prodávám jen zájezdy českých CK – a každá musí být ze zákona pojištěná proti úpadku. To není můj slib, to je zákon.",
    },
  },
  {
    title: { uk: "Спершу перевірка", cs: "Nejdřív ověření" },
    text: {
      uk: "На сайті ви нічого не платите. Ціну й вільні місця я перевіряю в туроператора — і лише тоді ми переходимо до договору й оплати.",
      cs: "Na webu nic neplatíte. Cenu a volná místa si nejdřív ověřím u CK a teprve pak přijde na řadu smlouva a platba.",
    },
  },
  {
    title: { uk: "Документи наперед", cs: "Doklady předem" },
    text: {
      uk: "Документи й умови в’їзду перевірю ще до бронювання — щоб ви спокійно полетіли й так само спокійно повернулися.",
      cs: "Doklady a podmínky vstupu ověřím ještě před rezervací – abyste v klidu odletěli a v klidu se i vrátili.",
    },
  },
];

const mosaic = [
  { src: PHOTOS.vanRoad },
  { src: ananasPhotos.banner.maldivesAerial },
  { src: ananasPhotos.banner.beachUmbrella },
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(copy.metaTitle, locale),
    description: t(copy.metaDescription, locale),
    alternates: { canonical: routes.about(locale), languages: languageAlternates(routes.about) },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const years = new Date().getFullYear() - site.owner.since;
  const prefill = t(copy.prefill, locale);

  return (
    <>
      {/* Hero + photo mosaic */}
      <section className="relative overflow-hidden pb-8 pt-10 sm:pt-16">
        <PineapplePattern preset="sparse" opacity={0.6} />
        <Container className="relative grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-4 inline-flex items-center gap-2 text-ink/75"><span aria-hidden className="h-2 w-2 rounded-full bg-yellow" />{t(copy.eyebrow, locale)}</p>
            {/* Sized so "JSEM ALJONA" / "Я АЛЬОНА" stays on one line: full width below lg, half column from lg. */}
            <h1 className="text-balance font-display text-[clamp(2.1rem,9.2vw,4.6rem)] font-black uppercase leading-[1.08] tracking-[-0.035em] lg:text-[clamp(2.6rem,4.4vw,4rem)]">{t(copy.title, locale)}</h1>
            <p className="mt-5 max-w-xl text-lg text-ink/80">{t(copy.lead, locale)}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TelegramButton locale={locale} source="about-hero" message={prefill} label={t(copy.cta, locale)} size="lg" />
              <ButtonLink href={routes.services(locale)} variant="outline">
                {t(copy.services, locale)}
              </ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="grid h-[460px] grid-cols-[1.15fr_1fr] grid-rows-2 gap-4 sm:h-[540px]">
              <div className="relative row-span-2 overflow-hidden rounded-[2rem] bg-grey sm:rounded-[2.5rem]">
                <Image
                  src={ananasPhotos.aljona.portrait}
                  alt={t(copy.photoAlt, locale)}
                  fill
                  priority
                  sizes="(min-width: 1024px) 28vw, 55vw"
                  className="object-cover object-top"
                />
              </div>
              {mosaic.slice(1).map((m) => (
                <div key={m.src} className={`relative overflow-hidden rounded-[2.5rem] bg-grey`}>
                  <Image src={m.src} alt="" fill sizes="(min-width: 1024px) 22vw, 45vw" className="object-cover" />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
              <Stamp size={140} top={t(stamp.top, locale)} bottom={t(stamp.bottom, locale)} above={t(stamp.above, locale)} word={t(stamp.word, locale)} below={t(stamp.below, locale)} className="drop-shadow-xl" />
            </div>
          </div>
        </Container>
      </section>

      {/* Stats */}
      <Container className="mt-16">
        <dl className="grid gap-4 sm:grid-cols-3">
          {[
            { n: `${years}+`, label: t(copy.statYears, locale), cls: "bg-yellow" },
            { n: String(site.owner.countriesVisited), label: t(copy.statCountries, locale), cls: "bg-ice" },
            { n: "15", label: t(copy.statReply, locale), cls: "bg-grey" },
          ].map((s) => (
            <div key={s.label} className={`rounded-[2rem] sm:rounded-[2.5rem] ${s.cls} p-6 sm:p-8`}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-5xl font-extrabold">{s.n}</span>
                <span className="mt-1 block text-ink/75">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      {/* Story — Reference 1 "О нас": big photo, then a mosaic of photos and text tiles */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-grey sm:aspect-[21/8] sm:rounded-[2.5rem]">
            <Image src={ananasPhotos.banner.resortPool} alt="" fill sizes="(min-width: 1344px) 1300px, 100vw" className="object-cover" />
          </div>
          <div className="mt-3 grid gap-3 sm:mt-4 sm:gap-4 md:grid-cols-3">
            <div className="relative hidden min-h-[16rem] overflow-hidden rounded-[2.5rem] bg-grey md:block">
              <Image src={mosaic[0].src} alt="" fill sizes="33vw" className="object-cover" />
            </div>
            <div className="rounded-[2rem] bg-grey p-6 sm:rounded-[2.5rem] sm:p-8">
              <span className="font-display text-sm font-extrabold text-ink/75">01</span>
              <p className="mt-3 leading-relaxed text-ink/85">{t(story[0], locale)}</p>
            </div>
            <div className="relative hidden min-h-[16rem] overflow-hidden rounded-[2.5rem] bg-grey md:block">
              <Image src={PHOTOS.travelMap} alt="" fill sizes="33vw" className="object-cover" />
            </div>
            <div className="relative overflow-hidden rounded-[2rem] bg-charcoal p-7 text-white sm:rounded-[2.5rem] sm:p-10 md:col-span-2">
              {/* The slice keeps to the top-right corner; h2 and text reserve that corner (pr-*) so white type never sits on yellow. */}
              <PineappleSlice kind="quarter" size={180} rotate={160} seed={17} className="absolute -right-10 -top-10 h-28 w-28 sm:h-[180px] sm:w-[180px]" />
              <h2 className="relative max-w-2xl text-balance pr-12 font-display text-[clamp(1.5rem,13.9vw_-_1.3rem,2.25rem)] font-black uppercase leading-[1.08] tracking-[-0.03em] sm:pr-28 sm:text-[clamp(1.8rem,3.6vw,3rem)]">
                {t(copy.storyTitle, locale)}
              </h2>
              <p className="relative mt-5 max-w-2xl text-white/85 sm:pr-28">{t(story[2], locale)}</p>
            </div>
            <div className="rounded-[2rem] bg-yellow p-6 sm:rounded-[2.5rem] sm:p-8">
              <span className="font-display text-sm font-extrabold">02</span>
              <p className="mt-3 leading-relaxed">{t(story[1], locale)}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <Section title={t(copy.values, locale)} lead={t(copy.valuesLead, locale)} className="pt-0">
        {/* 3 columns only from lg: at md a third of the width is too narrow for "До повернення". */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title.uk} className={`relative min-w-0 overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white p-8 ring-1 ring-ink/5 sm:last:col-span-2 lg:last:col-span-1`}>
              <PineappleSlice kind={(["wedge", "quarter", "half"] as const)[i]} size={90} seed={i + 4} rotate={i * 60} className="absolute -right-6 -top-6 opacity-70" />
              <span className="font-display text-sm font-bold text-red">0{i + 1}</span>
              <h3 className="mt-2 text-balance font-display text-2xl font-extrabold lg:text-[clamp(1.3rem,2.1vw,1.5rem)]">{t(v.title, locale)}</h3>
              <p className="mt-3 text-ink/70">{t(v.text, locale)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Awards — dark navy block */}
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-ink p-8 text-paper sm:p-12">
          <PineapplePattern preset="section" opacity={0.3} />
          <div className="relative grid items-center gap-8 md:grid-cols-[minmax(0,16rem)_1fr] lg:gap-12">
            <div className="relative mx-auto w-full max-w-[16rem]">
              <div className="relative aspect-[3/4] overflow-hidden rounded-full bg-paper/10">
                <Image src={ananasPhotos.aljona.event} alt={t(copy.eventAlt, locale)} fill sizes="256px" className="object-cover object-top" />
              </div>
              <div className="absolute -bottom-4 -right-6">
                <CircleBadge size={120} color="var(--c-paper)" text="STARWAY • CORAL TRAVEL • TOP JOIN UP! • " className="rounded-full bg-ink" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-3xl font-black uppercase leading-[1.08] sm:text-4xl">{t(copy.awardsTitle, locale)}</h2>
              <p className="mt-3 text-paper/70">{t(copy.awardsLead, locale)}</p>
              {/* Stacked at md, where the photo column leaves ~260px for both cards. */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
                {awards.map((a) => (
                  <div key={a.title.uk} className="min-w-0 rounded-[2rem] sm:rounded-[2.5rem] bg-paper/10 p-6">
                    <h3 className="text-balance font-display text-xl font-bold text-yellow">{t(a.title, locale)}</h3>
                    <p className="mt-2 hyphens-auto text-sm text-paper/80">{t(a.text, locale)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Why us */}
      <Section title={t(copy.whyTitle, locale)}>
        <div className="grid gap-6 md:grid-cols-3">
          {why.map((w) => (
            <div key={w.title.uk} className="rounded-[2rem] bg-ice p-8 sm:rounded-[2.5rem]">
              <h3 className="font-display text-xl font-extrabold">{t(w.title, locale)}</h3>
              <p className="mt-3 text-ink/75">{t(w.text, locale)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Final CTA */}
      <Container className="pb-20">
        <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-yellow p-8 sm:p-14">
          <PineappleSlice kind="ring" size={260} color="var(--c-yellow-light)" seed={21} className="absolute -bottom-20 -right-16" />
          <div className="relative max-w-2xl">
            {/* Phone size keeps "МОЯ ВІЗИТІВКА" / "MOJE VIZITKA" together on the last line. */}
            <h2 className="text-balance font-display text-[clamp(1.2rem,9.2vw_-_0.7rem,2.25rem)] font-black uppercase leading-[1.08] sm:text-4xl">{t(copy.finalTitle, locale)}</h2>
            <p className="mt-3 text-ink/80">{t(copy.finalText, locale)}</p>
            <TelegramButton locale={locale} source="about-final" message={prefill} size="lg" className="mt-7" />
          </div>
        </div>
      </Container>
    </>
  );
}
