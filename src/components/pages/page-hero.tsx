import type { ReactNode } from "react";
import { PineapplePattern } from "@/components/brand/pineapple";
import { Container, Eyebrow } from "@/components/ui";

/** Intro block for content pages: eyebrow, giant uppercase headline, lead, optional actions. */
export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  /** Buttons under the lead. */
  children?: ReactNode;
  /** Right column (badge, photo…) on large screens. */
  aside?: ReactNode;
}) {
  return (
    <section className="pb-4 pt-2 sm:pt-4">
      <Container>
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-grey px-5 py-10 sm:rounded-[2.5rem] sm:px-10 sm:py-14 lg:px-14">
          <PineapplePattern preset="sparse" className="-z-10" />
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
            <div className="max-w-4xl">
              {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
              <h1 className="font-display text-[clamp(2.1rem,5.6vw,4.6rem)] font-black uppercase leading-[0.95] tracking-[-0.035em]">{title}</h1>
              {lead && <p className="mt-5 max-w-2xl text-lg text-ink/80">{lead}</p>}
              {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
            </div>
            {aside && <div className="hidden lg:block">{aside}</div>}
          </div>
        </div>
      </Container>
    </section>
  );
}
