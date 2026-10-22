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
            return (
              <div key={i} className="overflow-x-auto rounded-[2rem] bg-white p-2">
                <table className="w-full min-w-[480px] text-left text-sm">
                  <thead className="text-xs uppercase tracking-wider text-ink/75">
                    <tr>
                      {b.head.map((h, j) => (
                        <th key={j} className="px-5 py-3 font-semibold">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-ink/5">
                    {b.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) => (
                          <td key={k} className={`px-5 py-3 ${k === 0 ? "font-semibold text-ink" : ""}`}>
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
                <PineappleSlice kind="half" size={120} rotate={160} className="absolute -right-6 -top-8" color="var(--c-yellow-light)" />
                {b.title && <p className="relative font-display text-lg font-bold text-ink">{b.title}</p>}
                <p className="relative mt-1 text-ink/85">{b.text}</p>
              </div>
            );
        }
      })}
    </div>
  );
}
