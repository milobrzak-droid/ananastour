import { glue } from "@/components/home/typo";
import { t, type Locale } from "@/i18n/config";
import { formatDateRange } from "@/lib/format";
import type { Board, SearchParams, Transport } from "@/lib/tours/types";

/** Display labels for normalised domain codes (uk + cs). Pure — safe in server and client components. */

type L = Record<Locale, string>;

export const BOARD_ORDER: Board[] = ["UAI", "AI", "FB", "HB", "BB", "RO"];

export const boardLabels: Record<Board, L> = {
  RO: { uk: "Без харчування", cs: "Bez stravy" },
  BB: { uk: "Сніданки", cs: "Snídaně" },
  HB: { uk: "Напівпансіон", cs: "Polopenze" },
  FB: { uk: "Повний пансіон", cs: "Plná penze" },
  AI: { uk: "Все включено", cs: "All inclusive" },
  UAI: { uk: "Ультра все включено", cs: "Ultra all inclusive" },
};

export const transportLabels: Record<Transport, L> = {
  flight: { uk: "Літаком", cs: "Letecky" },
  bus: { uk: "Автобусом", cs: "Autobusem" },
  own: { uk: "Власним транспортом", cs: "Vlastní doprava" },
};

export const AIRPORTS = ["PRG", "BRQ", "OSR", "PED"] as const;

export const airportLabels: Record<string, L> = {
  PRG: { uk: "Прага", cs: "Praha" },
  BRQ: { uk: "Брно", cs: "Brno" },
  OSR: { uk: "Острава", cs: "Ostrava" },
  PED: { uk: "Пардубиці", cs: "Pardubice" },
};

export const sortLabels: Record<NonNullable<SearchParams["sort"]>, L> = {
  price_asc: { uk: "Спочатку дешевші", cs: "Od nejlevnějších" },
  price_desc: { uk: "Спочатку дорожчі", cs: "Od nejdražších" },
  date_asc: { uk: "Найближчі вильоти", cs: "Nejbližší odlety" },
  rating_desc: { uk: "Найвищий рейтинг", cs: "Nejlépe hodnocené" },
};

/** Our 12 destinations, keyed by `Hotel.countrySlug`. */
export const countryLabels: Record<string, L> = {
  turkey: { uk: "Туреччина", cs: "Turecko" },
  egypt: { uk: "Єгипет", cs: "Egypt" },
  greece: { uk: "Греція", cs: "Řecko" },
  bulgaria: { uk: "Болгарія", cs: "Bulharsko" },
  uae: { uk: "ОАЕ", cs: "SAE" },
  maldives: { uk: "Мальдіви", cs: "Maledivy" },
  vietnam: { uk: "В’єтнам", cs: "Vietnam" },
  spain: { uk: "Іспанія", cs: "Španělsko" },
  dominicana: { uk: "Домінікана", cs: "Dominikána" },
  italy: { uk: "Італія", cs: "Itálie" },
  indonesia: { uk: "Балі", cs: "Bali" },
  zanzibar: { uk: "Занзібар", cs: "Zanzibar" },
};

export const boardLabel = (b: Board, locale: Locale) => t(boardLabels[b], locale);
export const transportLabel = (tr: Transport, locale: Locale) => t(transportLabels[tr], locale);
export const airportLabel = (code: string, locale: Locale) =>
  airportLabels[code] ? `${t(airportLabels[code], locale)} (${code})` : code;
export const countryName = (slug: string, locale: Locale, fallback?: string) =>
  countryLabels[slug] ? t(countryLabels[slug], locale) : (fallback ?? slug);

/*
 * Provider texts (AnChoice, mock) arrive in Czech. The finite sets — resort regions, room types and amenities —
 * get a Ukrainian label here, keyed by the provider's exact Czech text. On `cs`, and for any text not listed yet,
 * the provider text is shown as is. Telegram prefills keep the raw provider text (Aljona looks it up at the CK).
 * TODO(anchoice): extend the maps with the real API values (or switch to their codes once documented).
 */
const UK_REGIONS: Record<string, string> = {
  Alanya: "Аланія",
  "Antalya – Lara": "Анталія — Лара",
  "Atol Dhaalu": "Атол Даалу",
  "Atol Jižní Ari": "Атол Південний Арі",
  "Atol Noonu": "Атол Нуну",
  "Atol Severní Male": "Атол Північний Мале",
  "Bali – Jimbaran": "Балі — Джимбаран",
  "Bali – Legian": "Балі — Легіан",
  "Bali – Nusa Dua": "Балі — Нуса-Дуа",
  "Bali – Tanjung Benoa": "Балі — Танджунг-Беноа",
  Bayahibe: "Баяібе",
  Belek: "Белек",
  Bodrum: "Бодрум",
  Chalkidiki: "Халкідіки",
  "Costa Blanca": "Коста-Бланка",
  "Costa Dorada": "Коста-Дорада",
  "Da Nang": "Дананг",
  Dubaj: "Дубай",
  Fujairah: "Фуджейра",
  "Gran Canaria": "Гран-Канарія",
  Hurghada: "Хургада",
  Kalábrie: "Калабрія",
  Kemer: "Кемер",
  Kendwa: "Кендва",
  Kiwengwa: "Ківенгва",
  Korfu: "Корфу",
  Kos: "Кос",
  Kréta: "Крит",
  "Makadi Bay": "Макаді-Бей",
  Mallorca: "Майорка",
  "Marsa Alam": "Марса-Алам",
  "Mui Ne": "Муйне",
  Nesebar: "Несебр",
  "Nha Trang": "Нячанг",
  Nungwi: "Нунгві",
  "Phu Quoc": "Фукуок",
  "Punta Cana": "Пунта-Кана",
  "Ras Al Khaimah": "Рас-ель-Хайма",
  Rhodos: "Родос",
  "Sahl Hasheesh": "Сахл-Хашиш",
  Sardinie: "Сардинія",
  "Sharm El Sheikh": "Шарм-ель-Шейх",
  Sicílie: "Сицилія",
  Side: "Сіде",
  "Slunečné pobřeží": "Сонячний берег",
  Tenerife: "Тенерифе",
  Zakynthos: "Закінф",
  "Zlaté písky": "Золоті піски",
};

const UK_ROOM_TYPES: Record<string, string> = {
  "Dvoulůžkový pokoj Standard": "Двомісний номер Standard",
  "Dvoulůžkový pokoj s výhledem na moře": "Двомісний номер з видом на море",
  "Dvoulůžkový pokoj s výhledem do zahrady": "Двомісний номер з видом на сад",
  "Pokoj Superior": "Номер Superior",
  "Rodinný pokoj": "Сімейний номер",
  "Rodinný pokoj s výhledem na moře": "Сімейний номер з видом на море",
  "Junior suite": "Junior Suite",
  Bungalov: "Бунгало",
  "Pokoj se vstupem do bazénu (swim-up)": "Номер з виходом до басейну (swim-up)",
  "Vila s vlastním bazénem": "Вілла з власним басейном",
  "Pokoj Club": "Номер Club",
  "Pokoj Deluxe": "Номер Deluxe",
  "Pokoj Deluxe s výhledem na moře": "Номер Deluxe з видом на море",
  Studio: "Студіо",
  "Apartmán 1+1": "Апартаменти 1+1",
};

const UK_AMENITIES: Record<string, string> = {
  "Wi-Fi zdarma": "Безкоштовний Wi-Fi",
  Klimatizace: "Кондиціонер",
  "Venkovní bazén": "Відкритий басейн",
  "Krytý bazén": "Критий басейн",
  "Aquapark s tobogány": "Аквапарк із гірками",
  "Vlastní písečná pláž": "Власний піщаний пляж",
  "Oblázková pláž": "Гальковий пляж",
  "Molo do moře": "Пірс у море",
  "Korálový útes u hotelu": "Кораловий риф біля готелю",
  "Potápěčské centrum": "Дайвінг-центр",
  "Vodní sporty": "Водні види спорту",
  "Spa a wellness": "Спа й велнес",
  "Hamam (turecké lázně)": "Хамам (турецька лазня)",
  "Fitness centrum": "Фітнес-центр",
  "Dětský klub": "Дитячий клуб",
  "Dětský bazén": "Дитячий басейн",
  "Animační programy": "Анімація",
  "Restaurace à la carte": "Ресторани à la carte",
  "Tenisové kurty": "Тенісні корти",
  "Golfové hřiště": "Поле для гольфу",
  "Jen pro dospělé": "Лише для дорослих",
  "Plážový bar": "Пляжний бар",
  "Kyvadlová doprava na pláž": "Шатл до пляжу",
  "Služby butlera": "Послуги батлера",
  "Jóga a pilates": "Йога й пілатес",
  "Parkoviště zdarma": "Безкоштовна парковка",
  Diskotéka: "Дискотека",
  "Transfer hydroplánem": "Трансфер гідролітаком",
  "Minibar zdarma": "Безкоштовний мінібар",
  "Centrum a obchody na dosah": "Центр і магазини поруч",
};

// Looked up with plain spaces: some provider texts already carry a no-break space ("u hotelu").
const fromProvider = (uk: Record<string, string>) => (text: string, locale: Locale) =>
  locale === "uk" ? (uk[text.replace(/ /g, " ")] ?? text) : text;

/** Resort region as plain text ("Slunečné pobřeží" → «Сонячний берег» on uk), for titles and meta. */
export const regionName = fromProvider(UK_REGIONS);
/**
 * Resort region for visible text: glued (the " — " in «Балі — Нуса-Дуа» never starts a line) and with a word joiner
 * after each hyphen, so a place name such as «Шарм-ель-Шейх» / «Танджунг-Беноа» wraps whole, never at its hyphen.
 */
export const regionLabel = (text: string, locale: Locale) => glue(regionName(text, locale)).replace(/-(?=\S)/g, "-⁠");
/** Room type ("Rodinný pokoj" → «Сімейний номер» on uk). */
export const roomTypeLabel = fromProvider(UK_ROOM_TYPES);
/** Hotel amenity ("Klimatizace" → «Кондиціонер» on uk). */
export const amenityLabel = fromProvider(UK_AMENITIES);

/** 300 → "300 m", 25000 → "25 km". */
export function formatDistance(metres: number, locale: Locale): string {
  if (metres < 1000) return `${metres} ${locale === "uk" ? "м" : "m"}`;
  const km = Math.round(metres / 100) / 10;
  return `${km.toLocaleString(locale === "uk" ? "uk-UA" : "cs-CZ")} ${locale === "uk" ? "км" : "km"}`;
}

/** "2 dospělí + 1 dítě (7)" — written out in full, same word forms as the search box. */
export function travellersLabel(adults: number, childrenAges: number[], locale: Locale): string {
  const adultWord = t(
    adults === 1 ? { uk: "дорослий", cs: "dospělý" } : adults <= 4 ? { uk: "дорослих", cs: "dospělí" } : { uk: "дорослих", cs: "dospělých" },
    locale,
  );
  const a = `${adults} ${adultWord}`;
  if (!childrenAges.length) return a;
  const n = childrenAges.length;
  const k = t(n === 1 ? { uk: "дитина", cs: "dítě" } : n <= 4 ? { uk: "дитини", cs: "děti" } : { uk: "дітей", cs: "dětí" }, locale);
  return `${a} + ${n} ${k} (${childrenAges.join(", ")})`;
}

/**
 * Date range for visible text that wraps only after the dash, never inside a date:
 * "1 трав. – 13 трав. 2027 р." keeps "13 трав." and "2027 р." whole, "18. 11. – 28. 11. 2026"
 * keeps each date whole. Not for Telegram prefills.
 */
export function dateRangeLabel(from: string, to: string, locale: Locale): string {
  return formatDateRange(from, to, locale)
    .replace(/(\d\.?) (?=[\p{L}\d])/gu, "$1 ")
    .replace(/ ([–—]) /g, " $1 ");
}
