import type { Locale } from "./config";

/**
 * Shared UI strings (navigation, contact, generic actions). Page-specific copy
 * stays next to the page as `{ uk, cs }` objects read with `t()`.
 */
const uk = {
  nav: {
    tours: "Пошук турів",
    hot: "Гарячі тури",
    destinations: "Країни",
    services: "Послуги",
    blog: "Блог",
    about: "Про Альону",
    contact: "Контакти",
  },
  contact: {
    telegramCta: "Написати Альоні",
    telegramShort: "Telegram",
    telegramLead: "Альона в Telegram · зазвичай відповідає за 15 хв (9:00–21:00)",
    online: "на зв’язку",
    call: "Подзвонити",
    askAboutTour: "Запитати Альону",
    floatingTitle: "Три готелі для вас?",
    floatingText: "Напишіть, куди й коли. З 9:00 до 21:00 зазвичай відповідаю за 15 хвилин, пізніше — зранку.",
    prefillGeneral: "Добрий день, Альоно! Хочу на море.\nКуди: …\nКоли: …\nСкільки нас (вік дітей): …\nБюджет: …",
    prefillTour: "Добрий день, Альоно! Цікавить цей тур — чи є ще місця?",
  },
  actions: {
    search: "Знайти тур",
    showMore: "Ще варіанти",
    details: "Деталі туру",
    send: "Надіслати Альоні",
    pickTour: "Хочу 3 готелі",
  },
  common: {
    perPerson: "/ за особу",
    total: "разом",
    from: "від",
    nights: "ночей",
    loading: "Чистимо ананас… шукаємо тури",
  },
};

export type Dictionary = typeof uk;

const cs: Dictionary = {
  nav: {
    tours: "Zájezdy",
    hot: "Last minute",
    destinations: "Destinace",
    services: "Služby",
    blog: "Blog",
    about: "O Aljoně",
    contact: "Kontakt",
  },
  contact: {
    telegramCta: "Napsat Aljoně",
    telegramShort: "Telegram",
    telegramLead: "Aljona na Telegramu · obvykle odpoví do 15 min (9–21 h)",
    online: "na příjmu",
    call: "Zavolat",
    askAboutTour: "Zeptat se Aljony",
    floatingTitle: "Poslat vám tři hotely?",
    floatingText: "Napište mi kam a kdy. Od 9 do 21 h odpovídám obvykle do 15 minut, na pozdější zprávy ráno.",
    prefillGeneral: "Dobrý den, Aljono! Chci k moři.\nKam: …\nKdy: …\nKolik nás je (věk dětí): …\nRozpočet: …",
    prefillTour: "Dobrý den, Aljono! Zajímá mě tenhle zájezd – jsou ještě volná místa?",
  },
  actions: {
    search: "Najít zájezd",
    showMore: "Další nabídky",
    details: "Detail zájezdu",
    send: "Poslat Aljoně",
    pickTour: "Chci 3 hotely",
  },
  common: {
    perPerson: "za osobu",
    total: "celkem",
    from: "od",
    nights: "nocí",
    loading: "Loupeme ananas… hledáme zájezdy",
  },
};

const dictionaries: Record<Locale, Dictionary> = { uk, cs };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
