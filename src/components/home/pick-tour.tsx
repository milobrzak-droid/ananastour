import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { AljonaAvatar, TelegramButton, TelegramIcon } from "@/components/contact/telegram";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { t, type Locale } from "@/i18n/config";

const C = {
  title: { uk: "Не знаєте, що обрати?", cs: "Nevíte, co vybrat?" },
  lead: {
    uk: "Напишіть, куди й коли хочете полетіти — я підберу 3 найкращі готелі за вашими побажаннями, щойно знайду найвигідніші пропозиції.",
    cs: "Napište, kam a kdy chcete letět — vyberu 3 nejlepší hotely podle vašich přání, jakmile najdu nejvýhodnější nabídky.",
  },
  tgCta: { uk: "Отримати 3 готелі в Telegram", cs: "Získat 3 hotely na Telegramu" },
  tgMsg: {
    uk: "Добрий день, Альоно! Підберіть, будь ласка, 3 найкращі готелі. Куди: … Коли: … Скільки нас: …",
    cs: "Dobrý den, Aljono! Vyberte mi prosím 3 nejlepší hotely. Kam: … Kdy: … Kolik nás je: …",
  },
  fast: { uk: "Відповідь зазвичай за 15 хвилин", cs: "Odpověď obvykle do 15 minut" },
  steps: {
    uk: ["Пишете в Telegram", "Я шукаю серед усіх чеських туроператорів", "Отримуєте 3 найкращі варіанти"],
    cs: ["Napíšete na Telegram", "Hledám u všech českých cestovních kanceláří", "Dostanete 3 nejlepší varianty"],
  },
  or: { uk: "або", cs: "nebo" },
  formTitle: { uk: "Залиште номер — я передзвоню", cs: "Nechte mi číslo — zavolám vám" },
  formSubmit: { uk: "Отримати підбірку", cs: "Získat výběr" },
  badge: { uk: "3 НАЙКРАЩІ ГОТЕЛІ • ЗА 15 ХВИЛИН • ", cs: "3 NEJLEPŠÍ HOTELY • DO 15 MINUT • " },
};

export function PickTour({ locale }: { locale: Locale }) {
  return (
    <section id="pick" className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          {/* Telegram — primary */}
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-telegram p-7 text-white sm:rounded-[2.5rem] sm:p-12">
            <PineapplePattern preset="section" opacity={0.16} color="#fff" className="-z-10" />
            <div className="absolute -bottom-12 -right-12 -z-10 hidden opacity-90 sm:block">
              <CircleBadge size={230} text={t(C.badge, locale)} color="white" center={<TelegramIcon size={64} />} />
            </div>
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.6rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">{t(C.title, locale)}</h2>
            <p className="mt-5 max-w-xl text-lg text-white">{t(C.lead, locale)}</p>
            <ol className="mt-7 grid max-w-xl gap-3">
              {t(C.steps, locale).map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white font-display font-extrabold text-telegram">
                    {i + 1}
                  </span>
                  <span className="font-semibold">{s}</span>
                </li>
              ))}
            </ol>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <AljonaAvatar size={64} ring="white" />
              <TelegramButton locale={locale} source="home-pick-telegram" size="lg" label={t(C.tgCta, locale)} message={t(C.tgMsg, locale)} tone="white" />
              <span className="text-sm font-medium text-white">
                @{site.contact.telegramUsername} · {t(C.fast, locale)}
              </span>
            </div>
          </div>

          {/* Callback form — secondary */}
          <div className="relative [&>form]:h-full">
            <span className="absolute -top-3 left-8 z-10 shape-pill bg-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-paper lg:-left-6 lg:top-1/2">
              {t(C.or, locale)}
            </span>
            <InquiryForm
              locale={locale}
              kind="pick-tour"
              source="home-pick"
              variant="light"
              fields={["destination", "dates"]}
              title={t(C.formTitle, locale)}
              submitLabel={t(C.formSubmit, locale)}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
