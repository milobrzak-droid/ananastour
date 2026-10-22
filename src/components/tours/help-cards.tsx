import Link from "next/link";
import { PineapplePattern, PineappleSlice } from "@/components/brand/pineapple";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { TelegramButton } from "@/components/contact/telegram";
import { t, type Locale } from "@/i18n/config";

/**
 * Telegram prompts used inside tour listings: an inline "let Aljona pick it"
 * card between results, and the empty state.
 */

export function PickForMeCard({
  locale,
  message,
  context,
  source,
  className = "",
}: {
  locale: Locale;
  message: string;
  /** Search summary passed to the inquiry form. */
  context?: string;
  source: string;
  className?: string;
}) {
  return (
    <aside aria-label={t({ uk: "Підбір туру", cs: "Výběr zájezdu" }, locale)} className={`relative overflow-hidden rounded-[2rem] bg-ice p-5 sm:rounded-[2.5rem] sm:p-10 ${className}`}>
      <PineapplePattern preset="sparse" opacity={0.5} />
      <div className="relative grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-center">
        <div>
          <h2 className="font-display text-2xl font-black uppercase leading-tight sm:text-3xl">
            {t(
              {
                uk: "Важко обрати? Альона підбере 3 найкращі варіанти за 15 хвилин",
                cs: "Nemůžete si vybrat? Aljona vybere 3 nejlepší varianty do 15 minut",
              },
              locale,
            )}
          </h2>
          <p className="mt-3 max-w-xl text-ink/75">
            {t(
              {
                uk: "Ми працюємо з усіма великими чеськими туроператорами, знаємо готелі особисто й підкажемо, де справді добре. Підбір безкоштовний.",
                cs: "Spolupracujeme se všemi velkými českými cestovkami, hotely známe osobně a poradíme, kde je opravdu dobře. Výběr je zdarma.",
              },
              locale,
            )}
          </p>
          <TelegramButton
            locale={locale}
            source={source}
            size="lg"
            message={message}
            label={t({ uk: "Підібрати в Telegram", cs: "Vybrat přes Telegram" }, locale)}
            className="mt-6"
          />
        </div>
        <InquiryForm
          locale={locale}
          kind="pick-tour"
          context={context}
          fields={["dates", "travellers", "message"]}
          source={`${source}-form`}
          variant="light"
          title={t({ uk: "Або залиште номер — передзвоню", cs: "Nebo nechte číslo — zavolám vám" }, locale)}
        />
      </div>
    </aside>
  );
}

export function NoResults({
  locale,
  message,
  resetHref,
  source,
}: {
  locale: Locale;
  message: string;
  resetHref?: string;
  source: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] bg-grey p-8 text-center sm:rounded-[2.5rem] sm:p-14">
      <PineappleSlice kind="half" size={96} rotate={180} className="mx-auto" />
      <h2 className="mt-4 font-display text-2xl font-black uppercase sm:text-3xl">
        {t({ uk: "За цими параметрами турів не знайшлося", cs: "Pro tyto parametry jsme nic nenašli" }, locale)}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-ink/70">
        {t(
          {
            uk: "Не всі пропозиції туроператорів потрапляють в онлайн-пошук. Напишіть мені — перевірю вручну в усіх системах і пришлю варіанти.",
            cs: "Ne všechny nabídky cestovních kanceláří jsou v online vyhledávání. Napište mi — ručně prověřím všechny systémy a pošlu varianty.",
          },
          locale,
        )}
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <TelegramButton
          locale={locale}
          source={source}
          size="lg"
          message={message}
          label={t({ uk: "Знайду для вас вручну", cs: "Najdu vám to ručně" }, locale)}
        />
        {resetHref && (
          <Link href={resetHref} className="text-sm font-semibold underline underline-offset-4 hover:text-red">
            {t({ uk: "Скинути фільтри", cs: "Zrušit filtry" }, locale)}
          </Link>
        )}
      </div>
    </div>
  );
}
