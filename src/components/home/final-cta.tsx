import Image from "next/image";
import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { ananasPhotos } from "@/content/ananas-photos";
import { AljonaAvatar, TelegramButton } from "@/components/contact/telegram";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { t, type Locale } from "@/i18n/config";
import { glue, hasAccents } from "./typo";

const C = {
  // The reply "Я теж." / "Já taky." is one unit (NBSP): it never splits into a dangling "JÁ / TAKY.".
  title: { uk: "Море чекає. Я теж.", cs: "Moře čeká. Já taky." },
  lead: {
    uk: "Три рядки в Telegram: куди, коли і скільки вас. Решту беру на себе.",
    cs: "Stačí tři řádky na Telegram: kam, kdy a kolik vás pojede. Zbytek je na mně.",
  },
  cta: { uk: "Написати Альоні", cs: "Napsat Aljoně" },
  badge: { uk: "ЗАЗВИЧАЙ ЗА 15 ХВ • 9:00–21:00 • ", cs: "OBVYKLE DO 15 MIN • 9–21 H • " },
};

export function FinalCta({ locale }: { locale: Locale }) {
  const title = t(C.title, locale);
  return (
    <section className="pb-12 pt-12 sm:pb-16 sm:pt-16">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-yellow p-3 text-ink sm:rounded-[2.75rem] sm:p-4">
          <PineapplePattern preset="hero" opacity={0.7} color="var(--c-yellow-light)" fibre="var(--c-yellow)" className="-z-10" />
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="px-4 py-10 sm:px-10 sm:py-14">
              {/* Stacked accents (cs "MOŘE / ČEKÁ. / JÁ TAKY.") need a full leading; accent-free uk stays tight.
                  "JÁ TAKY." is ~5.45em wide: below 360px the size follows the viewport so that line still fits at 320. */}
              <h2
                className={`font-display text-[clamp(2.6rem,7vw,6rem)] font-black uppercase tracking-[-0.03em] max-[359px]:text-[11.5vw] ${hasAccents(title) ? "leading-[1.06]" : "leading-[0.9]"}`}
              >
                {glue(title)}
              </h2>
              <p className="mt-6 max-w-xl text-pretty text-lg text-ink/85">{glue(t(C.lead, locale))}</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <AljonaAvatar size={60} ring="white" />
                <TelegramButton locale={locale} source="home-final" size="lg" label={t(C.cta, locale)} />
                <span className="font-semibold">@{site.contact.telegramUsername}</span>
              </div>
            </div>
            <div className="relative min-h-[18rem] overflow-hidden rounded-[1.75rem] sm:rounded-[2.25rem] lg:min-h-0">
              <Image src={ananasPhotos.hero.tropicalBeach} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              <div className="absolute bottom-4 left-4 rounded-full bg-yellow p-1 shadow-xl sm:bottom-6 sm:left-6">
                <CircleBadge size={150} text={t(C.badge, locale)} />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
