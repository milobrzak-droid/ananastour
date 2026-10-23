import Link from "next/link";
import { ArrowButton } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";

/** Compact pager: ← 1 … 4 5 6 … 12 →. `href(page)` builds each link. */
export function Pagination({
  locale,
  page,
  pages,
  href,
}: {
  locale: Locale;
  page: number;
  pages: number;
  href: (page: number) => string;
}) {
  if (pages <= 1) return null;
  const nums = [...new Set([1, page - 1, page, page + 1, pages])].filter((n) => n >= 1 && n <= pages).sort((a, b) => a - b);
  const items: Array<number | "gap"> = [];
  nums.forEach((n, i) => {
    if (i > 0 && n - nums[i - 1] > 1) items.push("gap");
    items.push(n);
  });

  return (
    <nav aria-label={t({ uk: "Сторінки результатів", cs: "Stránky výsledků" }, locale)} className="mt-10 flex items-center justify-center gap-2">
      {page > 1 ? (
        <ArrowButton href={href(page - 1)} direction="left" size={44} label={t({ uk: "Попередня сторінка", cs: "Předchozí stránka" }, locale)} />
      ) : (
        <span className="w-11" />
      )}
      <ul className="flex flex-wrap items-center gap-1">
        {items.map((it, i) =>
          it === "gap" ? (
            <li key={`g${i}`} className="px-1 text-ink/75">
              …
            </li>
          ) : (
            <li key={it}>
              <Link
                href={href(it)}
                aria-current={it === page ? "page" : undefined}
                className={`grid h-11 min-w-11 place-items-center shape-pill px-3 text-sm font-semibold transition ${
                  it === page ? "bg-ink text-paper" : "bg-white ring-1 ring-ink/10 hover:bg-grey"
                }`}
              >
                {it}
              </Link>
            </li>
          ),
        )}
      </ul>
      {page < pages ? (
        <ArrowButton href={href(page + 1)} size={44} label={t({ uk: "Наступна сторінка", cs: "Další stránka" }, locale)} />
      ) : (
        <span className="w-11" />
      )}
    </nav>
  );
}
