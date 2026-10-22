import Image from "next/image";
import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { ananasPhotos } from "@/content/ananas-photos";
import { AljonaAvatar, TelegramButton } from "@/components/contact/telegram";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { t, type Locale } from "@/i18n/config";

const C = {
  title: { uk: "Валіза вже чекає?", cs: "Kufr už čeká?" },
  lead: {
    uk: "Напишіть Альоні в Telegram: куди, коли і скільки вас. Решту я візьму на себе.",
    cs: "Napište Aljoně na Telegram: kam, kdy a kolik vás je. Zbytek zařídím já.",
  },
  cta: { uk: "Написати Альоні", cs: "Napsat Aljoně" },
  badge: { uk: "ВІДПОВІДЬ ЗА 15 ХВИЛИН • ", cs: "ODPOVĚĎ DO 15 MINUT • " },
};

export function FinalCta({ locale }: { locale: Locale }) {
  return (
    <section className="pb-12 pt-12 sm:pb-16 sm:pt-16">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-yellow p-3 text-ink sm:rounded-[2.75rem] sm:p-4">
          <PineapplePattern preset="hero" opacity={0.7} color="var(--c-yellow-light)" fibre="var(--c-yellow)" className="-z-10" />
          <div className="grid items-stretch gap-6 lg:grid-cols-[1.25fr_1fr]">
            <div className="px-4 py-10 sm:px-10 sm:py-14">
              <h2 className="font-display text-[clamp(2.6rem,7vw,6rem)] font-black uppercase leading-[0.88] tracking-[-0.04em]">{t(C.title, locale)}</h2>
              <p className="mt-6 max-w-xl text-lg text-ink/85">{t(C.lead, locale)}</p>
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
