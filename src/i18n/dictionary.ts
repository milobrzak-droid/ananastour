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
    about: "Про нас",
    contact: "Контакти",
  },
  contact: {
    telegramCta: "Написати Альоні",
    telegramShort: "Telegram",
    telegramLead: "Альона на зв'язку в Telegram — відповідає зазвичай за 15 хвилин",
    online: "онлайн",
    call: "Зателефонувати",
    askAboutTour: "Запитати про цей тур",
    floatingTitle: "Підберу тур за 15 хвилин",
    floatingText: "Напишіть мені в Telegram — пришлю 3 найкращі варіанти.",
    prefillGeneral: "Добрий день, Альоно! Шукаю тур.\nКуди: …\nКоли: …\nСкільки нас (діти — вік): …",
    prefillTour: "Добрий день, Альоно! Цікавить тур:",
  },
  actions: {
    search: "Знайти тур",
    showMore: "Показати більше",
    details: "Детальніше",
    send: "Надіслати",
    pickTour: "Підібрати тур",
  },
  common: {
    perPerson: "/ за особу",
    total: "разом",
    from: "від",
    nights: "ночей",
    loading: "Шукаємо найкращі пропозиції…",
  },
};

export type Dictionary = typeof uk;

const cs: Dictionary = {
  nav: {
    tours: "Hledat zájezd",
    hot: "Last minute",
    destinations: "Destinace",
    services: "Služby",
    blog: "Blog",
    about: "O nás",
    contact: "Kontakt",
  },
  contact: {
    telegramCta: "Napsat Aljoně",
    telegramShort: "Telegram",
    telegramLead: "Aljona je na Telegramu — odpovídá obvykle do 15 minut",
    online: "online",
    call: "Zavolat",
    askAboutTour: "Zeptat se na tento zájezd",
    floatingTitle: "Zájezd vyberu do 15 minut",
    floatingText: "Napište mi na Telegram — pošlu 3 nejlepší varianty.",
    prefillGeneral: "Dobrý den, Aljono! Hledám zájezd.\nKam: …\nKdy: …\nKolik nás je (děti — věk): …",
    prefillTour: "Dobrý den, Aljono! Mám zájem o zájezd:",
  },
  actions: {
    search: "Najít zájezd",
    showMore: "Zobrazit další",
    details: "Detail",
    send: "Odeslat",
    pickTour: "Vybrat zájezd",
  },
  common: {
    perPerson: "/ osoba",
    total: "celkem",
    from: "od",
    nights: "nocí",
    loading: "Hledáme nejlepší nabídky…",
  },
};

const dictionaries: Record<Locale, Dictionary> = { uk, cs };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
