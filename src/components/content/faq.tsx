import { PineappleSlice } from "@/components/brand/pineapple";

export type FaqItem = { q: string; a: string };

/** Accordion built on native <details> — works without JS. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="divide-y divide-ink/10 overflow-hidden rounded-[2rem] bg-white sm:rounded-[2.5rem]">
      {items.map((item, i) => (
        <details key={i} className="group px-6 py-5 sm:px-8" open={i === 0}>
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-display text-lg font-bold [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span className="mt-0.5 shrink-0 transition group-open:rotate-90">
              <PineappleSlice kind="wedge" size={26} texture={false} rotate={90} />
            </span>
          </summary>
          <p className="mt-3 max-w-3xl leading-relaxed text-ink/75">{item.a}</p>
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
