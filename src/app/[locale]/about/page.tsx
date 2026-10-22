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
import { routes } from "@/i18n/routes";

type L = Record<Locale, string>;

const copy = {
  metaTitle: { uk: "Про нас — Альона та Ananas Tour", cs: "O nás — Aljona a Ananas Tour" },
  metaDescription: {
    uk: "Альона в туризмі з 2011 року, відвідала 22 країни й особисто перевіряє готелі. Тепер — турагенція для українців у Чехії.",
    cs: "Aljona působí v cestovním ruchu od roku 2011, navštívila 22 zemí a hotely prověřuje osobně. Nyní cestovní agentura v Česku.",
  },
  eyebrow: { uk: "Про нас", cs: "O nás" },
  title: { uk: "Привіт! Я — Альона", cs: "Dobrý den, jsem Aljona" },
  lead: {
    uk: "Директорка Ananas Tour. Моє життя пов'язане з туризмом з 2011 року — а тепер я допомагаю українцям у Чехії відпочивати так, як вони на це заслуговують.",
    cs: "Ředitelka Ananas Tour. Cestovnímu ruchu se věnuji od roku 2011 — a teď pomáhám Ukrajincům v Česku vyrazit na dovolenou, jakou si zaslouží.",
  },
  cta: { uk: "Написати Альоні", cs: "Napsat Aljoně" },
  prefill: { uk: "Добрий день, Альоно! Прочитав(-ла) про вас на сайті й хочу підібрати тур.", cs: "Dobrý den, Aljono! Četl(a) jsem o vás na webu a chci vybrat zájezd." },
  services: { uk: "Наші послуги", cs: "Naše služby" },
  photoAlt: { uk: "Альона, директорка Ananas Tour", cs: "Aljona, ředitelka Ananas Tour" },
  eventAlt: { uk: "Альона на заході туроператора Join UP!", cs: "Aljona na akci touroperátora Join UP!" },
  statYears: { uk: "років у туризмі", cs: "let v cestovním ruchu" },
  statCountries: { uk: "країни відвідано особисто", cs: "zemí navštíveno osobně" },
  statReply: { uk: "хвилин — типова відповідь у Telegram", cs: "minut — obvyklá odpověď na Telegramu" },
  storyTitle: { uk: "Туризм — це не професія, а стиль життя", cs: "Cestování není jen práce, je to životní styl" },
  values: { uk: "Наші цінності", cs: "Naše hodnoty" },
  valuesLead: { uk: "Нагороди — це результат незмінних принципів.", cs: "Ocenění jsou výsledkem neměnných zásad." },
  awardsTitle: { uk: "Нагороди та визнання", cs: "Ocenění a uznání" },
  awardsLead: {
    uk: "Нашу експертність визнають не лише клієнти, а й провідні туроператори.",
    cs: "Naši odbornost oceňují nejen klienti, ale i přední touroperátoři.",
  },
  whyTitle: { uk: "Чому нас обирають", cs: "Proč si nás vybírají" },
  finalTitle: { uk: "Ваша ідеальна відпустка — це наша репутація", cs: "Vaše vysněná dovolená je naše vizitka" },
  finalText: {
    uk: "Напишіть у Telegram, куди й коли хочете полетіти, — і отримаєте 3 найкращі варіанти від перевірених туроператорів.",
    cs: "Napište na Telegram, kam a kdy chcete letět — a dostanete 3 nejlepší varianty od prověřených cestovních kanceláří.",
  },
} satisfies Record<string, L>;

const story: L[] = [
  {
    uk: "Для мене туризм — це справжня пристрасть. За ці роки я особисто відвідала 22 країни, але ніколи не зупиняюся на досягнутому. Регулярно їжджу в професійні інформаційні тури, щоб на власні очі перевіряти готелі, вивчати нові курорти й знати ті важливі нюанси, про які ніколи не напишуть у каталогах.",
    cs: "Cestování je pro mě skutečná vášeň. Za ta léta jsem osobně navštívila 22 zemí a pořád mě to táhne dál. Pravidelně jezdím na odborné inspekční cesty, abych hotely viděla na vlastní oči, poznávala nová letoviska a znala detaily, které v katalogu nikdy nenajdete.",
  },
  {
    uk: "Наша агенція стала знаком якості та надійності на туристичному ринку України. Тепер ми працюємо в Чехії — для українців, які тут живуть: тури з вильотом із Праги, Брно, Острави та Пардубиць, ціни в кронах, спілкування рідною мовою.",
    cs: "Naše agentura se stala na ukrajinském trhu synonymem kvality a spolehlivosti. Nyní působíme v Česku — pro Ukrajince, kteří zde žijí: zájezdy s odletem z Prahy, Brna, Ostravy a Pardubic, ceny v korunách a komunikace v rodném jazyce.",
  },
  {
    uk: "Довірте свій відпочинок професіоналам — і ми організуємо подорож, яка залишить найтепліший слід у вашому серці.",
    cs: "Svěřte svou dovolenou profesionálům — a připravíme vám cestu, na kterou budete s úsměvem vzpomínat.",
  },
];

const values: Array<{ title: L; text: L }> = [
  {
    title: { uk: "Чесний підбір турів", cs: "Poctivý výběr" },
    text: {
      uk: "Рекомендуємо лише ті готелі, у яких впевнені на 100%.",
      cs: "Doporučujeme jen hotely, za kterými si stoprocentně stojíme.",
    },
  },
  {
    title: { uk: "Глибока експертність", cs: "Hluboká odbornost" },
    text: {
      uk: "Наші знання базуються на реальних подорожах і постійному навчанні.",
      cs: "Naše znalosti stojí na skutečných cestách a neustálém vzdělávání.",
    },
  },
  {
    title: { uk: "Тотальна турбота", cs: "Péče od A do Z" },
    text: {
      uk: "Супроводжуємо вас від першого повідомлення до щасливого повернення додому.",
      cs: "Provázíme vás od první zprávy až po šťastný návrat domů.",
    },
  },
];

// TODO(client): confirm award years and add logos/certificate photos.
const awards: Array<{ title: L; text: L }> = [
  {
    title: { uk: "Starway від Coral Travel", cs: "Starway od Coral Travel" },
    text: {
      uk: "Почесні учасники престижної щорічної премії туроператора Coral Travel.",
      cs: "Čestní účastníci prestižního každoročního ocenění touroperátora Coral Travel.",
    },
  },
  {
    title: { uk: "ТОП-агенція Join UP!", cs: "TOP agentura Join UP!" },
    text: {
      uk: "Стабільно входимо до числа агентств-лідерів із продажів туроператора Join UP!.",
      cs: "Dlouhodobě patříme mezi nejprodávanější agentury touroperátora Join UP!.",
    },
  },
];

const why: Array<{ title: L; text: L }> = [
  {
    title: { uk: "Надійність", cs: "Spolehlivost" },
    text: {
      uk: "Працюємо лише з ліцензованими чеськими туроператорами, застрахованими від банкрутства. Ваші кошти та відпочинок у безпеці.",
      cs: "Spolupracujeme jen s licencovanými českými cestovními kancelářemi pojištěnými proti úpadku. Vaše peníze i dovolená jsou v bezpečí.",
    },
  },
  {
    title: { uk: "Підтримка 24/7", cs: "Podpora 24/7" },
    text: {
      uk: "Ми завжди на зв'язку в Telegram — від вильоту з аеропорту до повернення додому.",
      cs: "Jsme stále k zastižení na Telegramu — od odletu až po návrat domů.",
    },
  },
  {
    title: { uk: "Експертність", cs: "Odbornost" },
    text: {
      uk: "Особисто інспектуємо курорти й жили в більшості готелів, які пропонуємо.",
      cs: "Letoviska osobně prověřujeme a ve většině nabízených hotelů jsme sami bydleli.",
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
    alternates: { languages: { uk: routes.about("uk"), cs: routes.about("cs") } },
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
            <h1 className="font-display text-[clamp(2.3rem,5.6vw,4.6rem)] font-black uppercase leading-[0.95] tracking-[-0.035em]">{t(copy.title, locale)}</h1>
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
              <Stamp size={140} top="ANANAS TOUR • ALJONA" bottom={`SINCE ${site.owner.since} • ${site.owner.countriesVisited} COUNTRIES`} above={["FINEST", "HOLIDAYS"]} word="ANANAS" below={["FROM", "CZECHIA"]} className="drop-shadow-xl" />
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
              <PineappleSlice kind="quarter" size={180} rotate={160} seed={17} className="absolute -right-10 -top-10" />
              <h2 className="relative max-w-2xl font-display text-[clamp(1.8rem,3.6vw,3rem)] font-black uppercase leading-[1] tracking-[-0.03em]">
                {t(copy.storyTitle, locale)}
              </h2>
              <p className="relative mt-5 max-w-2xl text-white/85">{t(story[2], locale)}</p>
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
        <div className="grid gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <div key={v.title.uk} className={`relative overflow-hidden rounded-[2rem] sm:rounded-[2.5rem] bg-white p-8 ring-1 ring-ink/5`}>
              <PineappleSlice kind={(["wedge", "quarter", "half"] as const)[i]} size={90} seed={i + 4} rotate={i * 60} className="absolute -right-4 -top-4 opacity-70" />
              <span className="font-display text-sm font-bold text-red">0{i + 1}</span>
              <h3 className="mt-2 font-display text-2xl font-extrabold">{t(v.title, locale)}</h3>
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
              <h2 className="font-display text-3xl font-black uppercase leading-[1] sm:text-4xl">{t(copy.awardsTitle, locale)}</h2>
              <p className="mt-3 text-paper/70">{t(copy.awardsLead, locale)}</p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {awards.map((a) => (
                  <div key={a.title.uk} className="rounded-[2rem] sm:rounded-[2.5rem] bg-paper/10 p-6">
                    <h3 className="font-display text-xl font-bold text-yellow">{t(a.title, locale)}</h3>
                    <p className="mt-2 text-sm text-paper/80">{t(a.text, locale)}</p>
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
            <h2 className="font-display text-3xl font-black uppercase leading-[1] sm:text-4xl">{t(copy.finalTitle, locale)}</h2>
            <p className="mt-3 text-ink/80">{t(copy.finalText, locale)}</p>
            <TelegramButton locale={locale} source="about-final" message={prefill} size="lg" className="mt-7" />
          </div>
        </div>
      </Container>
    </>
  );
}
