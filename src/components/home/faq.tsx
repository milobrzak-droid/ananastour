import { TelegramButton } from "@/components/contact/telegram";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";
import { glue, keepParticles, leadingFor } from "./typo";

const C = {
  title: { uk: "Без дрібного шрифту", cs: "Bez drobného písma" },
  lead: {
    uk: "Гроші, документи, діти — чесно й по суті. Не знайшли свого питання? Запитайте мене.",
    cs: "Peníze, doklady, děti – stručně a na rovinu. Nenašli jste svou otázku? Zeptejte se mě.",
  },
  ask: { uk: "Запитати Альону", cs: "Zeptat se Aljony" },
  askMsg: { uk: "Добрий день, Альоно! У мене питання:", cs: "Dobrý den, Aljono! Mám otázku:" },
};

// Ordered by how much the worry weighs: documents first, then money, then the rest.

const FAQ: Array<{ q: Record<Locale, string>; a: Record<Locale, string> }> = [
  {
    q: {
      uk: "Які документи потрібні, щоб полетіти й повернутися в Чехію?",
      cs: "S jakými doklady odletím a zase se vrátím do Česka?",
    },
    a: {
      uk: "Зазвичай — закордонний біометричний паспорт, дійсний щонайменше 6 місяців після повернення, і чинний документ про перебування в Чехії (дозвіл на проживання або тимчасовий захист). Для деяких країн, як-от Єгипту, потрібна віза — її оформлюють в аеропорту після прильоту. Перед бронюванням я перевірю вимоги саме для вашої ситуації.",
      cs: "Obvykle potřebujete biometrický cestovní pas s platností ještě aspoň 6 měsíců po návratu a platný doklad o pobytu v Česku (povolení k pobytu nebo dočasná ochrana). Do některých zemí, třeba do Egypta, je navíc potřeba vízum – vyřizuje se po příletu přímo na letišti. Před rezervací ověřím podmínky přesně pro vaši situaci.",
    },
  },
  {
    q: { uk: "Що буде з грошима, якщо туроператор збанкрутує?", cs: "Co když cestovní kancelář zkrachuje?" },
    a: {
      uk: "Кожен чеський туроператор (CK) за законом зобов’язаний мати страхування від банкрутства (закон № 159/1999 Sb.). Я продаю тури лише таких CK — тож ваші гроші й дорога назад захищені.",
      cs: "Každá česká CK musí mít ze zákona pojištění proti úpadku (zákon č. 159/1999 Sb.). Prodávám jen zájezdy takto pojištěných CK, takže vaše peníze i cesta zpět jsou kryté.",
    },
  },
  {
    q: { uk: "Чи треба щось платити на сайті?", cs: "Platím něco na webu?" },
    a: {
      uk: "Ні. На сайті ви лише надсилаєте запит. Я перевіряю ціну й місця в туроператора, усе пояснюю — і тільки тоді домовляємося про договір та оплату.",
      cs: "Ne. Na webu jen pošlete poptávku. Cenu a volná místa ověřím u CK, všechno vysvětlím – a teprve pak řešíme smlouvu a platbu.",
    },
  },
  {
    q: { uk: "Що входить у ціну пакетного туру?", cs: "Co je v ceně zájezdu?" },
    a: {
      uk: "Зазвичай — переліт із Чехії туди й назад, трансфер з аеропорту до готелю й назад, проживання, обране харчування (наприклад, все включено), а також аеропортові й паливні збори. Туристичну страховку часто оформлюють окремо — підкажу, яка підійде саме вам.",
      cs: "Obvykle let z Česka tam i zpět, transfer z letiště do hotelu a zpět, ubytování, zvolená strava (třeba all inclusive) a letištní i palivové poplatky. Cestovní pojištění se často sjednává zvlášť – poradím, jaké se hodí právě vám.",
    },
  },
  {
    q: { uk: "Чи можна платити за тур частинами?", cs: "Dá se zájezd platit po částech?" },
    a: {
      uk: "Так. Зазвичай під час бронювання ви вносите завдаток (záloha), а решту доплачуєте приблизно за місяць до вильоту. Розмір завдатку й строки залежать від туроператора — я все поясню заздалегідь.",
      cs: "Ano. Při rezervaci obvykle zaplatíte zálohu a zbytek doplatíte zhruba měsíc před odletem. Výši zálohy i termíny určuje CK – všechno vám vysvětlím předem.",
    },
  },
  {
    q: { uk: "Що таке страхування від невиїзду (storno)?", cs: "Co je pojištění storna zájezdu?" },
    a: {
      uk: "Це страховка на випадок, якщо поїздку доведеться скасувати з поважної причини, наприклад через хворобу. Тоді страхова компанія поверне більшу частину вартості туру. Оформити її можна разом із туром.",
      cs: "Je to pojištění pro případ, že musíte cestu zrušit ze závažného důvodu, třeba kvůli nemoci. Pojišťovna vám pak vrátí většinu ceny zájezdu. Sjednat si ho můžete rovnou se zájezdem.",
    },
  },
  {
    q: { uk: "Коли краще бронювати тур?", cs: "Kdy je nejlepší zájezd rezervovat?" },
    a: {
      uk: "Залежить від того, що для вас важливіше: вибір чи ціна. Раннє бронювання (first minute) за 3–6 місяців — це найбільший вибір готелів і часто вигідніші ціни. Гарячі тури за 3–7 днів до вильоту бувають дешевшими — якщо ви готові зібрати валізу за вечір і не тримаєтеся за конкретний готель.",
      cs: "Záleží na tom, co je pro vás důležitější: výběr, nebo cena. Při first minute 3–6 měsíců předem máte největší výběr hotelů a často i lepší ceny. Last minute 3–7 dní před odletem bývá levnější – pokud zvládnete sbalit kufr za jeden večer a nelpíte na konkrétním hotelu.",
    },
  },
  {
    q: { uk: "Як зрозуміти, чи підходить готель для дітей?", cs: "Jak poznám, že je hotel vhodný pro děti?" },
    a: {
      uk: "Я знаю, на що дивитися: дитяче меню, міні-клуб, пологий вхід у море й басейн із підігрівом. Скажіть вік дитини — і я підберу готель, де буде добре і їй, і вам.",
      cs: "Vím, na co se dívat: dětské menu, miniklub, pozvolný vstup do moře a vyhřívaný bazén. Řekněte mi, kolik je dítěti let, a vyberu hotel, kde bude dobře jemu i vám.",
    },
  },
  {
    q: { uk: "Ви працюєте лише з українцями?", cs: "Jste jen pro Ukrajince?" },
    a: {
      uk: "Ні. Я говорю українською й чеською — пишіть будь-якою з них, хоч разом із чеськими друзями чи колегами.",
      cs: "Vůbec ne. Mluvím česky i ukrajinsky a k moři ráda pošlu každého.",
    },
  },
];

export function Faq({ locale }: { locale: Locale }) {
  return (
    <section className="py-12 sm:py-16">
      <Container className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          {/* sm:text-5xl alone sets a line-height of 1, so the acute of "PÍSMA" touched "DROBNÉHO": accents get 1.06. */}
          <h2 className={`text-balance font-display text-4xl font-extrabold uppercase sm:text-5xl ${leadingFor(t(C.title, locale))}`}>
            {glue(t(C.title, locale))}
          </h2>
          <p className="mt-4 text-pretty text-ink/70">{glue(t(C.lead, locale))}</p>
          <TelegramButton locale={locale} source="home-faq" label={t(C.ask, locale)} message={t(C.askMsg, locale)} className="mt-6" />
        </div>
        <div className="grid gap-3">
          {FAQ.map((f, i) => (
            <details
              key={i}
              name="home-faq"
              className="group rounded-[var(--radius-lg)] bg-white ring-1 ring-ink/5 transition open:shadow-md"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-pretty px-6 py-5 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
                {keepParticles(glue(t(f.q, locale)))}
                <span
                  aria-hidden
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-yellow text-2xl leading-none transition group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="text-pretty px-6 pb-6 text-ink/75">{keepParticles(glue(t(f.a, locale)))}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
