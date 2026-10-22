import type { ReactNode } from "react";
import { PineappleSlice } from "@/components/brand/pineapple";
import { Container } from "@/components/ui";
import { t, type Locale } from "@/i18n/config";

export type LegalSection = {
  id: string;
  heading: string;
  paragraphs?: ReactNode[];
  list?: ReactNode[];
  after?: ReactNode[];
};

type L = Record<Locale, string>;

/** Bilingual source of a legal section, see `localize()`. */
export type LegalSource = { id: string; heading: L; paragraphs?: L[]; list?: L[]; after?: L[] };

export function localize(src: LegalSource[], locale: Locale): LegalSection[] {
  return src.map((s) => ({
    id: s.id,
    heading: t(s.heading, locale),
    paragraphs: s.paragraphs?.map((p) => t(p, locale)),
    list: s.list?.map((p) => t(p, locale)),
    after: s.after?.map((p) => t(p, locale)),
  }));
}

/** Long-form legal document: numbered sections with a sticky table of contents. */
export function LegalDocument({
  title,
  updated,
  intro,
  sections,
  tocLabel,
}: {
  title: string;
  updated: string;
  intro?: ReactNode;
  sections: LegalSection[];
  tocLabel: string;
}) {
  return (
    <Container className="pb-10 pt-2 sm:pb-16 sm:pt-4">
      <header className="relative mb-10 overflow-hidden rounded-[2rem] bg-grey px-6 py-10 sm:rounded-[2.5rem] sm:px-12 sm:py-14">
        <PineappleSlice kind="half" size={220} rotate={200} seed={9} className="absolute -right-12 -top-16 opacity-80" />
        <h1 className="relative font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.98] tracking-[-0.03em]">{title}</h1>
        <p className="relative mt-4 text-sm text-ink/80">{updated}</p>
      </header>
      <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
        <nav aria-label={tocLabel} className="lg:sticky lg:top-28 lg:self-start">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-ink/75">{tocLabel}</p>
          <ol className="space-y-2 text-sm">
            {sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-ink/70 hover:text-ink hover:underline">
                  {i + 1}. {s.heading}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article className="max-w-3xl space-y-10 leading-relaxed">
          {intro && <div className="rounded-[2rem] bg-ice p-6 text-ink/85">{intro}</div>}
          {sections.map((s, i) => (
            <section key={s.id} id={s.id} className="scroll-mt-28">
              <h2 className="font-display text-2xl font-black uppercase">
                {i + 1}. {s.heading}
              </h2>
              {s.paragraphs?.map((p, j) => (
                <p key={j} className="mt-3 text-ink/80">
                  {p}
                </p>
              ))}
              {s.list && (
                <ul className="mt-3 space-y-2">
                  {s.list.map((item, j) => (
                    <li key={j} className="flex gap-3 text-ink/80">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-yellow" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
              {s.after?.map((p, j) => (
                <p key={j} className="mt-3 text-ink/80">
                  {p}
                </p>
              ))}
            </section>
          ))}
        </article>
      </div>
    </Container>
  );
}
