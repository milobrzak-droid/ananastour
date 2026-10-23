"use client";

import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { DESTINATIONS } from "@/components/home/destinations-data";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { DEFAULT_SEARCH, toQueryString } from "@/lib/tours/query";
import type { SearchParams } from "@/lib/tours/types";

const L = {
  destination: { uk: "Куди", cs: "Kam" },
  anyDestination: { uk: "Куди завгодно", cs: "Kamkoli" },
  dateFrom: { uk: "Виліт від", cs: "Odlet od" },
  dateTo: { uk: "Виліт до", cs: "Odlet do" },
  nights: { uk: "Ночей", cs: "Nocí" },
  anyNights: { uk: "Не важливо", cs: "Nezáleží" },
  travellers: { uk: "Хто їде", cs: "Kdo jede" },
  adults: { uk: "Дорослі", cs: "Dospělí" },
  adultsHint: { uk: "від 18 років", cs: "od 18 let" },
  children: { uk: "Діти", cs: "Děti" },
  childrenHint: { uk: "0–17 років", cs: "0–17 let" },
  childAge: { uk: "Вік дитини", cs: "Věk dítěte" },
  years: { uk: "р.", cs: "let" },
  done: { uk: "Готово", cs: "Hotovo" },
  submit: { uk: "Знайти тур", cs: "Najít zájezd" },
  less: { uk: "Прибрати", cs: "Ubrat" },
  more: { uk: "Додати", cs: "Přidat" },
};

const NIGHT_RANGES: Array<[number, number]> = [
  [3, 5],
  [6, 8],
  [7, 10],
  [10, 14],
  [14, 21],
];

const MAX_ADULTS = 6;
const MAX_CHILDREN = 4;

function plural(n: number, forms: Record<Locale, [string, string, string]>, locale: Locale): string {
  const [one, few, many] = forms[locale];
  if (locale === "uk") {
    const m10 = n % 10;
    const m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return one;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
    return many;
  }
  if (n === 1) return one;
  if (n >= 2 && n <= 4) return few;
  return many;
}

const ADULT_FORMS: Record<Locale, [string, string, string]> = {
  uk: ["дорослий", "дорослих", "дорослих"],
  cs: ["dospělý", "dospělí", "dospělých"],
};
const CHILD_FORMS: Record<Locale, [string, string, string]> = {
  uk: ["дитина", "дитини", "дітей"],
  cs: ["dítě", "děti", "dětí"],
};

function Field({
  label,
  htmlFor,
  children,
  compact,
}: {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  compact: boolean;
}) {
  return (
    <div
      className={`relative flex min-w-0 flex-col rounded-[1.25rem] bg-paper ring-1 ring-ink/5 xl:rounded-full transition focus-within:ring-2 focus-within:ring-ink ${
        compact ? "px-5 py-1.5 xl:px-4" : "px-5 py-2.5 xl:px-4"
      }`}
    >
      <label htmlFor={htmlFor} className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-ink/75">
        {label}
      </label>
      {children}
    </div>
  );
}

function Stepper({
  value,
  min,
  max,
  onChange,
  locale,
  label,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  locale: Locale;
  label: string;
}) {
  const btn =
    "grid h-9 w-9 place-items-center rounded-full border-2 border-ink/15 text-lg font-semibold leading-none transition hover:border-ink disabled:opacity-30 disabled:hover:border-ink/15";
  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`${t(L.less, locale)}: ${label}`}
      >
        −
      </button>
      <span className="w-5 text-center font-display text-lg font-bold" aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={btn}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`${t(L.more, locale)}: ${label}`}
      >
        +
      </button>
    </div>
  );
}

/**
 * Compact tour search. Navigates to /[locale]/tours?<query>. On the /tours page
 * pass the current params as `initial` — filters the box does not show
 * (board, stars, sort…) are preserved, paging is reset.
 */
export function SearchBox({
  locale,
  initial,
  variant = "hero",
}: {
  locale: Locale;
  initial?: Partial<SearchParams>;
  variant?: "hero" | "bar";
}) {
  const router = useRouter();
  const uid = useId();
  const compact = variant === "bar";

  const [destination, setDestination] = useState(initial?.destination ?? "");
  const [dateFrom, setDateFrom] = useState(initial?.dateFrom ?? "");
  const [dateTo, setDateTo] = useState(initial?.dateTo ?? "");
  const initialNights = initial?.nightsMin && initial?.nightsMax ? `${initial.nightsMin}-${initial.nightsMax}` : "";
  const [nights, setNights] = useState(initialNights);
  const [adults, setAdults] = useState(initial?.adults ?? DEFAULT_SEARCH.adults);
  const [childrenAges, setChildrenAges] = useState<number[]>(initial?.childrenAges ?? []);
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState<string>();
  const popRef = useRef<HTMLDivElement>(null);

  // Computed after mount so server and client markup match.
  useEffect(() => setToday(new Date().toISOString().slice(0, 10)), []);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (popRef.current && !popRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const nightOptions = NIGHT_RANGES.map(([a, b]) => `${a}-${b}`);
  if (initialNights && !nightOptions.includes(initialNights)) nightOptions.push(initialNights);

  const setChildren = (n: number) =>
    setChildrenAges((prev) => (n > prev.length ? [...prev, ...Array(n - prev.length).fill(7)] : prev.slice(0, n)));

  const travellersLabel =
    `${adults} ${plural(adults, ADULT_FORMS, locale)}` +
    (childrenAges.length ? `, ${childrenAges.length} ${plural(childrenAges.length, CHILD_FORMS, locale)}` : "");

  function submit(e: FormEvent) {
    e.preventDefault();
    const [nMin, nMax] = nights ? nights.split("-").map(Number) : [undefined, undefined];
    const params: Partial<SearchParams> = {
      ...initial,
      destination: destination || undefined,
      dateFrom: dateFrom || undefined,
      dateTo: dateTo || undefined,
      nightsMin: nMin,
      nightsMax: nMax,
      adults,
      childrenAges,
      page: undefined,
    };
    router.push(routes.tours(locale, toQueryString(params)));
  }

  const control = "w-full min-w-0 bg-transparent font-semibold text-ink outline-none";
  const id = (k: string) => `${uid}-${k}`;

  // One row from xl. The date columns have a floor of 10.25rem: a native date field needs ~8.1rem for an empty
  // "mm/dd/yyyy" / "дд.мм.рррр" plus its calendar icon, and at 1280px plain fr shares left it ~7.4rem ("mm/dd/yyy").
  // The space comes from destination and travellers, which have room to spare.
  return (
    <form
      onSubmit={submit}
      role="search"
      className={`grid gap-2 sm:grid-cols-2 xl:grid-cols-[1.15fr_minmax(10.25rem,1fr)_minmax(10.25rem,1fr)_1fr_1.25fr_auto] ${
        compact ? "rounded-[1.75rem] bg-white p-2 xl:rounded-full" : "rounded-[2rem] bg-white p-3 shadow-[0_20px_50px_-30px_rgba(30,34,53,0.5)] sm:p-3 xl:rounded-full"
      }`}
    >
      <Field label={t(L.destination, locale)} htmlFor={id("dest")} compact={compact}>
        <select id={id("dest")} value={destination} onChange={(e) => setDestination(e.target.value)} className={`${control} cursor-pointer`}>
          <option value="">{t(L.anyDestination, locale)}</option>
          {DESTINATIONS.map((d) => (
            <option key={d.slug} value={d.slug}>
              {t(d.name, locale)}
            </option>
          ))}
        </select>
      </Field>

      <Field label={t(L.dateFrom, locale)} htmlFor={id("from")} compact={compact}>
        <input
          id={id("from")}
          type="date"
          value={dateFrom}
          min={today}
          onChange={(e) => {
            setDateFrom(e.target.value);
            if (dateTo && e.target.value > dateTo) setDateTo("");
          }}
          className={control}
        />
      </Field>

      <Field label={t(L.dateTo, locale)} htmlFor={id("to")} compact={compact}>
        <input
          id={id("to")}
          type="date"
          value={dateTo}
          min={dateFrom || today}
          onChange={(e) => setDateTo(e.target.value)}
          className={control}
        />
      </Field>

      <Field label={t(L.nights, locale)} htmlFor={id("nights")} compact={compact}>
        <select id={id("nights")} value={nights} onChange={(e) => setNights(e.target.value)} className={`${control} cursor-pointer`}>
          <option value="">{t(L.anyNights, locale)}</option>
          {nightOptions.map((o) => (
            <option key={o} value={o}>
              {o.replace("-", "–")}
            </option>
          ))}
        </select>
      </Field>

      <div ref={popRef} className="relative">
        <Field label={t(L.travellers, locale)} htmlFor={id("trav")} compact={compact}>
          <button
            id={id("trav")}
            type="button"
            aria-expanded={open}
            aria-controls={id("pop")}
            onClick={() => setOpen((o) => !o)}
            className={`${control} truncate text-left`}
          >
            {travellersLabel}
          </button>
        </Field>
        {open && (
          <div
            id={id("pop")}
            className="absolute right-0 z-30 mt-2 w-full min-w-72 rounded-[var(--radius-lg)] bg-white p-5 shadow-2xl ring-1 ring-ink/10"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{t(L.adults, locale)}</p>
                <p className="text-xs text-ink/75">{t(L.adultsHint, locale)}</p>
              </div>
              <Stepper value={adults} min={1} max={MAX_ADULTS} onChange={setAdults} locale={locale} label={t(L.adults, locale)} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold">{t(L.children, locale)}</p>
                <p className="text-xs text-ink/75">{t(L.childrenHint, locale)}</p>
              </div>
              <Stepper
                value={childrenAges.length}
                min={0}
                max={MAX_CHILDREN}
                onChange={setChildren}
                locale={locale}
                label={t(L.children, locale)}
              />
            </div>
            {childrenAges.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-2">
                {childrenAges.map((age, i) => (
                  <label key={i} className="flex flex-col rounded-[var(--radius-md)] bg-paper px-3 py-2 text-[0.65rem] font-semibold uppercase tracking-wider text-ink/75">
                    {t(L.childAge, locale)} {i + 1}
                    <select
                      value={age}
                      onChange={(e) =>
                        setChildrenAges((prev) => prev.map((a, j) => (j === i ? Number(e.target.value) : a)))
                      }
                      className="mt-0.5 bg-transparent text-sm font-semibold normal-case tracking-normal text-ink outline-none"
                    >
                      {Array.from({ length: 18 }, (_, n) => (
                        <option key={n} value={n}>
                          {n} {t(L.years, locale)}
                        </option>
                      ))}
                    </select>
                  </label>
                ))}
              </div>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="mt-5 w-full shape-pill bg-ink py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/85"
            >
              {t(L.done, locale)}
            </button>
          </div>
        )}
      </div>

      <button
        type="submit"
        className={`inline-flex items-center justify-center gap-2 shape-pill bg-red px-7 font-semibold text-white transition hover:bg-red-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:col-span-2 xl:col-span-1 ${
          compact ? "py-3" : "py-4 text-lg"
        }`}
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" strokeLinecap="round" />
        </svg>
        {t(L.submit, locale)}
      </button>
    </form>
  );
}
