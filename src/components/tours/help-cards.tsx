import Link from "next/link";
import { PineapplePattern, PineappleSlice } from "@/components/brand/pineapple";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { TelegramButton } from "@/components/contact/telegram";
import { glue } from "@/components/home/typo";
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
    // @container: the card sits in a ~600px results column at 1024–1190px (filters sidebar beside it) and spans the
    // full page elsewhere, so the copy|form split follows the card's own width, not the viewport. Below 48rem it
    // stacks; side by side the copy column always keeps ≥ 20rem, so the H2 and the pill never get squeezed.
    <aside aria-label={t({ uk: "Три готелі на вибір", cs: "Tři hotely na výběr" }, locale)} className={`@container relative overflow-hidden rounded-[2rem] bg-ice p-5 sm:rounded-[2.5rem] sm:p-10 ${className}`}>
      <PineapplePattern preset="sparse" opacity={0.5} />
      <div className="relative grid gap-8 @3xl:grid-cols-[1fr_minmax(0,26rem)] @3xl:items-center">
        <div>
          <h2 className="font-display text-2xl font-black uppercase leading-tight sm:text-3xl">
            {t(
              {
                uk: "Важко обрати?",
                cs: "Nemůžete si vybrat?",
              },
              locale,
            )}
          </h2>
          <p className="mt-3 max-w-xl text-pretty text-ink/75">
            {glue(
              t(
                {
                  //  : glue() only joins "9 do" and "21 h"; these keep the whole hour range on one line
                  // (no "Od / 9 do 21 h" or "Od 9 do / 21 h").
                  uk: "Замість сотні вкладок надішлю 3 готелі під ваші побажання — і поясню, чому саме ці. З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин.",
                  cs: "Místo stovky záložek v prohlížeči vám pošlu 3 hotely podle vašich přání – i s tím, proč zrovna tyhle. Od 9 do 21 h odpovídám obvykle do 15 minut.",
                },
                locale,
              ),
            )}
          </p>
          <TelegramButton
            locale={locale}
            source={source}
            size="lg"
            message={message}
            label={t({ uk: "Хочу 3 готелі", cs: "Chci 3 hotely" }, locale)}
            className="mt-6 whitespace-nowrap"
          />
        </div>
        <InquiryForm
          locale={locale}
          kind="pick-tour"
          context={context}
          fields={["dates", "travellers", "message"]}
          source={`${source}-form`}
          variant="light"
          title={t({ uk: "Не любите писати? Залиште номер — передзвоню", cs: "Radši telefon? Nechte číslo, zavolám vám" }, locale)}
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
        {t({ uk: "Тут ананаси не ростуть", cs: "Tady ananas neroste" }, locale)}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-balance text-ink/70">
        {glue(
          t(
            {
              uk: "З такими параметрами нічого не знайшлося. Але онлайн-пошук бачить не все — напишіть, і я пошукаю вручну.",
              cs: "S těmito parametry jsme nic nenašli. Online vyhledávání ale nevidí všechno – napište mi a podívám se ručně.",
            },
            locale,
          ),
        )}
      </p>
      <div className="mt-8 flex flex-col items-center gap-4">
        <TelegramButton
          locale={locale}
          source={source}
          size="lg"
          message={message}
          label={t({ uk: "Пошукайте за мене", cs: "Najděte to za mě" }, locale)}
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
