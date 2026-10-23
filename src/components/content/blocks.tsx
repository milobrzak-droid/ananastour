import { PineappleSlice } from "@/components/brand/pineapple";
import type { Block } from "@/content/blog";

/** Renders structured article blocks (headings, paragraphs, lists, tables, notes). */
export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/85">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2 key={i} className="pt-6 font-display text-2xl font-extrabold text-ink sm:text-3xl">
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="pt-2 font-display text-xl font-bold text-ink">
                {b.text}
              </h3>
            );
          case "p":
            return <p key={i}>{b.text}</p>;
          case "list": {
            const items = b.items.map((item, j) => (
              <li key={j} className="flex gap-3">
                {b.ordered ? (
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-yellow font-display text-sm font-bold text-ink">
                    {j + 1}
                  </span>
                ) : (
                  <PineappleSlice kind="wedge" size={22} texture={false} rotate={90} className="mt-1 shrink-0" />
                )}
                <span>{item}</span>
              </li>
            ));
            return b.ordered ? (
              <ol key={i} className="space-y-3">
                {items}
              </ol>
            ) : (
              <ul key={i} className="space-y-3">
                {items}
              </ul>
            );
          }
          case "table":
            // Phones: every row becomes a small card and each cell carries its column name (data-label),
            // so the last column is never cut at the card edge. From sm up it is a regular table that fits
            // the article column (no min-width, no hidden scroll). Explicit roles keep the table semantics
            // that some browsers drop once table parts are display:block.
            return (
              <div key={i} className="rounded-[2rem] bg-white p-2 sm:overflow-x-auto">
                <table role="table" className="w-full text-left text-sm max-sm:block">
                  <thead role="rowgroup" className="text-xs uppercase tracking-wider text-ink/75 max-sm:sr-only">
                    <tr role="row">
                      {b.head.map((h, j) => (
                        <th key={j} role="columnheader" scope="col" className="px-5 py-3 align-bottom font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody role="rowgroup" className="divide-y divide-ink/5 max-sm:block">
                    {b.rows.map((row, j) => (
                      <tr key={j} role="row" className="max-sm:block max-sm:px-4 max-sm:py-3.5">
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            role="cell"
                            data-label={b.head[k]}
                            className={`px-5 py-3 align-top max-sm:block max-sm:px-0 ${
                              k === 0
                                ? "font-semibold text-ink max-sm:pb-1.5 max-sm:pt-0 max-sm:font-display max-sm:text-base max-sm:font-bold"
                                : "max-sm:py-1 max-sm:before:block max-sm:before:text-[0.7rem] max-sm:before:font-semibold max-sm:before:uppercase max-sm:before:tracking-wider max-sm:before:text-ink/70 max-sm:before:content-[attr(data-label)]"
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "note":
            return (
              <div key={i} role="note" className="relative overflow-hidden rounded-[2rem] bg-yellow p-6 sm:p-8">
                <PineappleSlice kind="half" size={96} rotate={160} className="absolute -right-8 -top-10" color="var(--c-yellow-light)" />
                {/* Float keeps the first line(s) clear of the light slice in the corner; lines below run full width. */}
                <span aria-hidden className="float-right h-8 w-10 sm:h-6 sm:w-8" />
                {b.title && <p className="relative font-display text-lg font-bold text-ink">{b.title}</p>}
                <p className="relative mt-1 text-ink/85">{b.text}</p>
              </div>
            );
        }
      })}
    </div>
  );
}
