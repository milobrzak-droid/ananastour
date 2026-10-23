import { PineappleSlice } from "@/components/brand/pineapple";
import { typeset, typesetDisplay } from "@/components/content/typeset";

export type FaqItem = { q: string; a: string };

/** Accordion built on native <details> — works without JS. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    // No overflow-hidden: nothing inside paints to the corners, and clipping only cut the (closed, collapsed) last answer.
    <div className="divide-y divide-ink/10 rounded-[2rem] bg-white sm:rounded-[2.5rem]">
      {items.map((item, i) => (
        <details key={i} className="group px-5 py-5 sm:px-8" open={i === 0}>
          {/* 18px from ~390px up; a touch smaller on narrower phones so a long word ("домашньому") can share its line. */}
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-[length:clamp(1rem,4.6vw,1.125rem)] font-bold [&::-webkit-details-marker]:hidden">
            {/* Balanced and glued ("s tím?", "v Římě?"): a short question never leaves one word alone on its last line. */}
            <span className="min-w-0 text-balance">{typesetDisplay(item.q)}</span>
            <span className="mt-0.5 shrink-0 transition group-open:rotate-90">
              <PineappleSlice kind="wedge" size={26} texture={false} rotate={90} />
            </span>
          </summary>
          <p className="mt-3 max-w-3xl text-pretty leading-relaxed text-ink/75">{typeset(item.a)}</p>
        </details>
      ))}
    </div>
  );
}

/** schema.org FAQPage payload for <JsonLd>. */
export function faqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
