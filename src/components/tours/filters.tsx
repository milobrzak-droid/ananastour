import Link from "next/link";
import type { ReactNode } from "react";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { toQueryString } from "@/lib/tours/query";
import type { Board, SearchParams, SearchResult, Transport } from "@/lib/tours/types";
import { AIRPORTS, BOARD_ORDER, airportLabel, boardLabel, transportLabel } from "./labels";

/**
 * Search filters as plain links + one GET form, so they work without JS.
 * Each option toggles one value in the query string (OR within a group).
 */

const tx = {
  board: { uk: "Харчування", cs: "Strava" },
  stars: { uk: "Зірковість", cs: "Hvězdičky" },
  transport: { uk: "Транспорт", cs: "Doprava" },
  airports: { uk: "Звідки летите", cs: "Odkud letíte" },
  price: { uk: "Бюджет на всіх, Kč", cs: "Celkový rozpočet, Kč" },
  apply: { uk: "Показати", cs: "Zobrazit" },
  operators: { uk: "Туроператор", cs: "Cestovní kancelář" },
  reset: { uk: "Скинути фільтри", cs: "Zrušit filtry" },
  any: { uk: "Будь-яка", cs: "Jakákoli" },
};

const toggle = <T,>(list: T[] | undefined, v: T): T[] =>
  list?.includes(v) ? list.filter((x) => x !== v) : [...(list ?? []), v];

/** Hidden inputs that carry the current search through a GET form, minus `omit`. */
export function HiddenSearchFields({ params, omit }: { params: SearchParams; omit: Array<keyof SearchParams> }) {
  const rest: Partial<SearchParams> = { ...params, page: undefined };
  for (const k of omit) delete rest[k];
  const entries = [...new URLSearchParams(toQueryString(rest)).entries()];
  return (
    <>
      {entries.map(([k, v]) => (
        <input key={k} type="hidden" name={k} value={v} />
      ))}
    </>
  );
}

export function activeFilterCount(p: SearchParams): number {
  return (
    (p.board?.length ?? 0) +
    (p.stars?.length ?? 0) +
    (p.transport?.length ?? 0) +
    (p.departureAirports?.length ?? 0) +
    (p.touroperators?.length ?? 0) +
    (p.priceMax ? 1 : 0)
  );
}

function Group({ title, children }: { title: string; children: ReactNode }) {
  return (
    <fieldset className="border-t border-ink/10 py-4 first:border-t-0 first:pt-0">
      <legend className="mb-2 pr-3 font-display text-sm font-bold uppercase tracking-wider text-ink/70">{title}</legend>
      <ul className="flex flex-col gap-1">{children}</ul>
    </fieldset>
  );
}

function Option({ href, active, label, count }: { href: string; active: boolean; label: ReactNode; count?: number }) {
  return (
    <li>
      <Link
        href={href}
        scroll={false}
        rel="nofollow"
        aria-current={active ? "true" : undefined}
        className={`flex items-center gap-3 rounded-xl px-2 py-1.5 text-sm transition hover:bg-grey ${
          count === 0 && !active ? "text-ink/75" : ""
        }`}
      >
        <span
          aria-hidden
          className={`grid h-5 w-5 shrink-0 place-items-center rounded-md border-2 text-[11px] font-bold ${
            active ? "border-ink bg-ink text-paper" : "border-ink/30"
          }`}
        >
          {active ? "✓" : ""}
        </span>
        <span className="flex-1">{label}</span>
        {count !== undefined && count > 0 && <span className="text-xs text-ink/75">{count}</span>}
      </Link>
    </li>
  );
}

export function Filters({
  locale,
  params,
  facets,
}: {
  locale: Locale;
  params: SearchParams;
  facets: SearchResult["facets"];
}) {
  const href = (patch: Partial<SearchParams>) => routes.tours(locale, toQueryString({ ...params, ...patch, page: undefined }));
  const f = facets ?? {};
  const operators = [...new Set([...Object.keys(f.touroperator ?? {}), ...(params.touroperators ?? [])])].sort();
  const transports: Transport[] = ["flight", "bus"];

  return (
    <div className="text-ink">
      <Group title={t(tx.board, locale)}>
        {BOARD_ORDER.map((b: Board) => (
          <Option
            key={b}
            href={href({ board: toggle(params.board, b) })}
            active={params.board?.includes(b) ?? false}
            label={
              <>
                {boardLabel(b, locale)} <span className="text-ink/75">{b}</span>
              </>
            }
            count={f.board ? (f.board[b] ?? 0) : undefined}
          />
        ))}
      </Group>

      <Group title={t(tx.stars, locale)}>
        {[5, 4, 3].map((s) => (
          <Option
            key={s}
            href={href({ stars: toggle(params.stars, s) })}
            active={params.stars?.includes(s) ?? false}
            label={<span className="tracking-widest text-yellow">{"★".repeat(s)}</span>}
            count={f.stars ? (f.stars[String(s)] ?? 0) : undefined}
          />
        ))}
      </Group>

      <Group title={t(tx.transport, locale)}>
        {transports.map((tr) => (
          <Option
            key={tr}
            href={href({ transport: toggle(params.transport, tr) })}
            active={params.transport?.includes(tr) ?? false}
            label={transportLabel(tr, locale)}
            count={f.transport ? (f.transport[tr] ?? 0) : undefined}
          />
        ))}
      </Group>

      <Group title={t(tx.airports, locale)}>
        {AIRPORTS.map((a) => (
          <Option
            key={a}
            href={href({ departureAirports: toggle(params.departureAirports, a) })}
            active={params.departureAirports?.includes(a) ?? false}
            label={airportLabel(a, locale)}
            count={f.departureAirport ? (f.departureAirport[a] ?? 0) : undefined}
          />
        ))}
      </Group>

      <fieldset className="border-t border-ink/10 py-4">
        <legend className="mb-2 text-balance pr-3 font-display text-sm font-bold uppercase tracking-wider text-ink/70">
          {t(tx.price, locale)}
        </legend>
        <form action={routes.tours(locale)} method="get" className="flex gap-2">
          <HiddenSearchFields params={params} omit={["priceMax"]} />
          <input
            type="number"
            name="pmax"
            min={0}
            step={1000}
            inputMode="numeric"
            defaultValue={params.priceMax}
            placeholder="60 000"
            aria-label={t(tx.price, locale)}
            className="w-full min-w-0 shape-pill border-2 border-ink/15 bg-white px-4 py-2 text-sm focus:border-ink focus:outline-none"
          />
          <button type="submit" className="shrink-0 shape-pill bg-ink px-4 py-2 text-sm font-semibold text-paper hover:bg-ink/85">
            {t(tx.apply, locale)}
          </button>
        </form>
      </fieldset>

      {operators.length > 0 && (
        <Group title={t(tx.operators, locale)}>
          {operators.map((op) => (
            <Option
              key={op}
              href={href({ touroperators: toggle(params.touroperators, op) })}
              active={params.touroperators?.includes(op) ?? false}
              label={op}
              count={f.touroperator ? (f.touroperator[op] ?? 0) : undefined}
            />
          ))}
        </Group>
      )}

      {activeFilterCount(params) > 0 && (
        <Link
          href={href({
            board: [],
            stars: [],
            transport: [],
            departureAirports: [],
            touroperators: [],
            priceMax: undefined,
          })}
          className="mt-2 inline-block text-sm font-semibold underline underline-offset-4 hover:text-red"
        >
          {t(tx.reset, locale)}
        </Link>
      )}
    </div>
  );
}
