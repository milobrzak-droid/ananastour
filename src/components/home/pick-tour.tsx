import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { AljonaAvatar, TelegramButton, TelegramIcon } from "@/components/contact/telegram";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { t, type Locale } from "@/i18n/config";
import { glue, leadingFor } from "./typo";

const C = {
  title: { uk: "Три готелі. Не сотні.", cs: "Tři hotely. Ne stovky." },
  lead: {
    uk: "Напишіть, куди, коли і скільки вас. Я порівняю пропозиції чеських туроператорів і надішлю 3 готелі, які сама б обрала на вашому місці, — з поясненням чому.",
    cs: "Napište mi, kam a kdy chcete jet a kolik vás pojede. Porovnám nabídky českých CK a pošlu 3 hotely, které bych na vašem místě vybrala sama – i s tím, proč zrovna ty.",
  },
  tgCta: { uk: "Хочу 3 готелі", cs: "Chci 3 hotely" },
  tgMsg: {
    uk: "Добрий день, Альоно! Хочу 3 готелі на вибір.\nКуди: …\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: …",
    cs: "Dobrý den, Aljono! Prosím 3 hotely na výběr.\nKam: …\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: …",
  },
  // The 15 minutes are the reply time, never the time to pick hotels — always with "usually" and the hours.
  fast: {
    uk: "З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин, пізніше — зранку.",
    cs: "Od 9 do 21 h odpovídám obvykle do 15 minut, na pozdější zprávy ráno.",
  },
  steps: {
    uk: ["Ви пишете одне повідомлення", "Я порівнюю пропозиції", "Ви обираєте з трьох"],
    cs: ["Napíšete jednu zprávu", "Já porovnám nabídky", "Vy vyberete ze tří"],
  },
  or: { uk: "або", cs: "nebo" },
  formTitle: { uk: "Не любите писати? Залиште номер — передзвоню", cs: "Radši telefon? Nechte číslo, zavolám vám" },
  formSubmit: { uk: "Передзвоніть мені", cs: "Zavolejte mi" },
  badge: { uk: "3 ГОТЕЛІ • 1 ПОВІДОМЛЕННЯ • ", cs: "3 HOTELY • 1 ZPRÁVA • " },
};

export function PickTour({ locale }: { locale: Locale }) {
  return (
    <section id="pick" className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-2">
          {/* Telegram — primary */}
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-telegram p-7 text-white sm:rounded-[2.5rem] sm:p-12">
            {/* The slices stay on the right edge only: the mask clears the text column (left half-slice, bottom wedge). */}
            <PineapplePattern
              preset="section"
              opacity={0.16}
              color="#fff"
              className="-z-10 [mask-image:linear-gradient(to_right,transparent_60%,black_88%)]"
            />
            {/* Decorative badge in the bottom-right corner. Hidden at lg (1024–1279), where the half-width card has no
                corner left beside the CTA row; from xl the row reserves the corner instead. */}
            <div className="absolute -bottom-12 -right-12 -z-10 hidden opacity-90 sm:block lg:hidden xl:block">
              <CircleBadge size={230} text={t(C.badge, locale)} color="white" center={<TelegramIcon size={64} />} />
            </div>
            <h2 className={`text-balance font-display text-[clamp(2rem,4.4vw,3.6rem)] font-black uppercase tracking-[-0.03em] ${leadingFor(t(C.title, locale))}`}>
              {t(C.title, locale)}
            </h2>
            <p className="mt-5 max-w-xl text-pretty text-lg text-white">{glue(t(C.lead, locale))}</p>
            <ol className="mt-7 grid max-w-xl gap-3">
              {t(C.steps, locale).map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white font-display font-extrabold text-telegram">
                    {i + 1}
                  </span>
                  <span className="min-w-0 font-semibold">{glue(s)}</span>
                </li>
              ))}
            </ol>
            {/* pr-36 keeps the row clear of the CircleBadge, which reaches ~134px into the bottom-right corner. */}
            <div className="mt-9 flex flex-wrap items-center gap-4 sm:pr-36 lg:pr-0 xl:pr-36">
              <AljonaAvatar size={64} ring="white" />
              <TelegramButton locale={locale} source="home-pick-telegram" size="lg" label={t(C.tgCta, locale)} message={t(C.tgMsg, locale)} tone="white" />
              <span className="min-w-0 text-pretty text-sm font-medium text-white">
                @{site.contact.telegramUsername} · {glue(t(C.fast, locale))}
              </span>
            </div>
          </div>

          {/* Callback form — secondary */}
          <div className="relative [&>form]:h-full">
            {/* lg: centred in the 1rem column gap at title height, where neither card has fields. */}
            <span className="absolute -top-3 left-8 z-10 shape-pill bg-ink px-3 py-1 text-xs font-bold uppercase tracking-widest text-paper lg:left-[-0.5rem] lg:top-12 lg:-translate-x-1/2">
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
