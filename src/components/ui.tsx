import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { PineappleSlice } from "@/components/brand/pineapple";

type Variant = "primary" | "dark" | "light" | "telegram" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-dark",
  dark: "bg-ink text-paper hover:bg-ink/85",
  light: "bg-white text-ink hover:bg-grey",
  telegram: "bg-telegram text-white hover:brightness-110",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
};

const base =
  "inline-flex items-center justify-center gap-2 shape-pill px-6 py-3 font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink disabled:opacity-50";

/** Pill button rendered as a link. External links open in a new tab. */
export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href: string; variant?: Variant; className?: string; children: ReactNode } & Omit<
  ComponentProps<"a">,
  "href"
>) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href.startsWith("http") || href.startsWith("tel:") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...rest
}: { variant?: Variant } & ComponentProps<"button">) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...rest} />;
}

/** Round "pineapple" arrow button — yellow slice with an arrow on top. */
export function ArrowButton({
  href,
  label,
  direction = "right",
  size = 48,
}: {
  href?: string;
  label: string;
  direction?: "right" | "left" | "down-right";
  size?: number;
}) {
  const rot = { right: 0, left: 180, "down-right": 45 }[direction];
  const inner = (
    <span className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <span className="absolute inset-0 rounded-full bg-yellow" />
      <PineappleSlice kind="ring" size={size} color="var(--c-yellow)" className="absolute inset-0 opacity-60" seed={11} />
      <svg viewBox="0 0 24 24" width={size * 0.45} height={size * 0.45} className="relative" style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
        <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="var(--c-ink)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
  return href ? (
    <Link href={href} className="inline-block transition hover:scale-105" aria-label={label}>
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>;
}

export function Section({
  title,
  lead,
  action,
  className = "",
  children,
}: {
  title?: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <Container>
        {(title || action) && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              {title && <h2 className="font-display text-3xl font-extrabold sm:text-4xl">{title}</h2>}
              {lead && <p className="mt-3 text-ink/70">{lead}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/** Small status pill, e.g. "last minute", "ověřeno online". */
export function Pill({ tone = "ice", children }: { tone?: "ice" | "red" | "yellow" | "grey"; children: ReactNode }) {
  const tones = {
    ice: "bg-ice text-ink",
    red: "bg-red text-white",
    yellow: "bg-yellow text-ink",
    grey: "bg-grey text-ink",
  };
  return <span className={`inline-flex items-center shape-pill px-3 py-1 text-xs font-semibold ${tones[tone]}`}>{children}</span>;
}
