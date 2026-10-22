import { TelegramButton } from "@/components/contact/telegram";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";

const C = {
  title: { uk: "Часті запитання", cs: "Časté dotazy" },
  lead: { uk: "Не знайшли відповідь? Просто запитайте мене.", cs: "Nenašli jste odpověď? Prostě se mě zeptejte." },
  ask: { uk: "Поставити запитання", cs: "Položit dotaz" },
  askMsg: { uk: "Добрий день, Альоно! У мене запитання:", cs: "Dobrý den, Aljono! Mám dotaz:" },
};

const FAQ: Array<{ q: Record<Locale, string>; a: Record<Locale, string> }> = [
  {
    q: {
      uk: "Які документи потрібні українцям у Чехії для подорожі?",
      cs: "Jaké doklady potřebují Ukrajinci žijící v Česku na cestu?",
    },
    a: {
      uk: "Закордонний біометричний паспорт, дійсний щонайменше 6 місяців після повернення, і чинний документ про перебування в Чехії (дозвіл на проживання або тимчасовий захист), щоб без проблем повернутися. Для деяких країн (наприклад, Єгипту) потрібна віза, яку можна отримати в аеропорту. Перед бронюванням я перевірю вимоги саме для вашої ситуації.",
      cs: "Biometrický cestovní pas platný alespoň 6 měsíců po návratu a platný doklad o pobytu v Česku (povolení k pobytu nebo dočasná ochrana), abyste se bez potíží vrátili. Do některých zemí (např. Egypt) je potřeba víza, kterou lze získat na letišti. Před rezervací ověřím podmínky přesně pro vaši situaci.",
    },
  },
  {
    q: { uk: "Що входить у вартість пакетного туру?", cs: "Co je zahrnuto v ceně zájezdu?" },
    a: {
      uk: "Зазвичай: переліт з Праги, Брно, Острави чи Пардубіце в обидва боки, трансфер аеропорт–готель–аеропорт, проживання, обраний тип харчування (наприклад, All Inclusive), летовищні збори та паливний збір. Медичне страхування в Чехії часто оформлюється окремо — я підкажу вигідний варіант.",
      cs: "Obvykle: let z Prahy, Brna, Ostravy nebo Pardubic tam i zpět, transfer letiště–hotel–letiště, ubytování, zvolená strava (např. All Inclusive), letištní a palivové poplatky. Cestovní pojištění se v Česku často sjednává zvlášť — poradím výhodnou variantu.",
    },
  },
  {
    q: { uk: "За скільки часу краще бронювати тур?", cs: "Jak dlouho dopředu rezervovat?" },
    a: {
      uk: "Два варіанти: «Раннє бронювання» за 3–6 місяців — найкращі ціни в топових готелях і найбільший вибір; або «Гарячі тури» за 3–7 днів, якщо ви готові вилетіти миттєво за максимально низькою ціною.",
      cs: "Dvě možnosti: „First minute“ 3–6 měsíců předem — nejlepší ceny v top hotelech a největší výběr; nebo „Last minute“ 3–7 dní předem, pokud jste připraveni odletět hned za co nejnižší cenu.",
    },
  },
  {
    q: { uk: "Чи можна оплатити тур частинами?", cs: "Lze zájezd platit po částech?" },
    a: {
      uk: "Так. Зазвичай при бронюванні вноситься завдаток, а решта — приблизно за місяць до вильоту. Розмір завдатку та строки залежать від туроператора — я заздалегідь усе поясню.",
      cs: "Ano. Při rezervaci se obvykle platí záloha a doplatek zhruba měsíc před odletem. Výše zálohy a termíny závisí na cestovní kanceláři — vše vám předem vysvětlím.",
    },
  },
  {
    q: { uk: "Що таке страхування від невиїзду (storno)?", cs: "Co je pojištění storna zájezdu?" },
    a: {
      uk: "Це додатковий захист ваших коштів. Якщо поїздка скасовується з поважних причин (наприклад, хвороба), страхова компанія повертає більшу частину вартості туру. У Чехії його можна оформити разом із туром.",
      cs: "Je to dodatečná ochrana vašich peněz. Pokud cestu zrušíte ze závažných důvodů (např. nemoc), pojišťovna vám vrátí většinu ceny zájezdu. V Česku ho lze sjednat spolu se zájezdem.",
    },
  },
  {
    q: { uk: "Як дізнатися, чи підходить готель для відпочинку з дітьми?", cs: "Jak poznám, že je hotel vhodný pro děti?" },
    a: {
      uk: "Ми особисто перевіряємо готелі. Для дітей шукаємо дитяче меню, міні-клуб, пологий вхід у море та підігрівний басейн. Просто скажіть вік дитини — і я підберу ідеальний варіант.",
      cs: "Hotely osobně prověřujeme. Pro děti hledáme dětské menu, miniklub, pozvolný vstup do moře a vyhřívaný bazén. Stačí mi říct věk dítěte a vyberu ideální variantu.",
    },
  },
];

export function Faq({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="font-display text-4xl font-extrabold uppercase sm:text-5xl">{t(C.title, locale)}</h2>
          <p className="mt-4 text-ink/70">{t(C.lead, locale)}</p>
          <TelegramButton locale={locale} source="home-faq" label={t(C.ask, locale)} message={t(C.askMsg, locale)} className="mt-6" />
        </div>
        <div className="grid gap-3">
          {FAQ.map((f, i) => (
            <details
              key={i}
              name="home-faq"
              className="group rounded-[var(--radius-lg)] bg-white ring-1 ring-ink/5 transition open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                {t(f.q, locale)}
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-yellow text-2xl leading-none transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="px-6 pb-6 text-ink/75">{t(f.a, locale)}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
