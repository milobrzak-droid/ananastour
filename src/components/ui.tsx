import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "dark" | "light" | "telegram" | "outline" | "yellow";

const variants: Record<Variant, string> = {
  primary: "bg-red text-white hover:bg-red-dark shadow-[0_10px_24px_-12px_rgba(217,50,25,0.8)]",
  dark: "bg-ink text-paper hover:bg-ink/85",
  light: "bg-white text-ink hover:bg-grey",
  telegram: "bg-telegram text-white hover:bg-telegram-dark",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-paper",
  yellow: "bg-yellow text-ink hover:brightness-105",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 shape-pill px-6 py-3 font-semibold transition disabled:opacity-50";

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

export function ArrowIcon({ size = 20, rotate = 0, color = "currentColor" }: { size?: number; rotate?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined }} aria-hidden focusable="false">
      <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Round arrow button (Reference 1): lemon/pineapple circle with a black arrow. */
export function ArrowButton({
  href,
  label,
  direction = "right",
  size = 48,
  tone = "yellow",
}: {
  href?: string;
  label: string;
  direction?: "right" | "left" | "down-right" | "up-right";
  size?: number;
  tone?: "yellow" | "white" | "ink";
}) {
  const rot = { right: 0, left: 180, "down-right": 45, "up-right": -45 }[direction];
  const bg = { yellow: "bg-yellow text-ink", white: "bg-white text-ink", ink: "bg-ink text-paper" }[tone];
  // Without href it is decoration inside a larger link, so it stays silent.
  const inner = (
    <span className={`relative inline-grid shrink-0 place-items-center rounded-full ${bg}`} style={{ width: size, height: size }} aria-hidden={href ? undefined : true}>
      <ArrowIcon size={size * 0.44} rotate={rot} />
      {href && <span className="sr-only">{label}</span>}
    </span>
  );
  return href ? (
    <Link href={href} className="inline-block rounded-full transition hover:scale-105" aria-label={label}>
      {inner}
    </Link>
  ) : (
    inner
  );
}

export function Container({ className = "", children }: { className?: string; children: ReactNode }) {
  // A max-w-* in className replaces the default width (no class-order fights).
  const width = /(^|\s)max-w-/.test(className) ? "" : "max-w-[84rem]";
  return <div className={`mx-auto w-full ${width} px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}

/** Small uppercase label above a heading, with a pineapple-yellow dot. */
export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow inline-flex items-center gap-2 text-ink/75 ${className}`}>
      <span aria-hidden className="h-2 w-2 rounded-full bg-yellow" />
      {children}
    </p>
  );
}

export function Section({
  title,
  lead,
  action,
  eyebrow,
  className = "",
  children,
}: {
  title?: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  eyebrow?: ReactNode;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={`py-12 sm:py-16 ${className}`}>
      <Container>
        {(title || action) && (
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-3xl">
              {eyebrow && <Eyebrow className="mb-3">{eyebrow}</Eyebrow>}
              {/* 1.1, not tighter: when the title wraps, Ř Č Ě Á and Ї rise ~1.05em above the baseline and touched the
                  line above at 1.02 ("ODLETY Z ČESKA / DO ŘECKA", "ВИЛЬОТИ / З ЧЕХІЇ"); 1.1 keeps ~2px between them. */}
              {title && <h2 className="font-display text-3xl font-extrabold uppercase leading-[1.1] sm:text-5xl">{title}</h2>}
              {lead && <p className="mt-4 max-w-2xl text-ink/75">{lead}</p>}
            </div>
            {action}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}

/** Small status pill, e.g. "дні є" (ice), "мало місць" (red). */
export function Pill({ tone = "ice", children }: { tone?: "ice" | "red" | "yellow" | "grey" | "white" | "ink"; children: ReactNode }) {
  const tones = {
    ice: "bg-ice text-ink",
    red: "bg-red text-white",
    yellow: "bg-yellow text-ink",
    grey: "bg-grey text-ink",
    white: "bg-white text-ink",
    ink: "bg-ink text-paper",
  };
  return <span className={`inline-flex items-center gap-1 shape-pill px-3 py-1 text-xs font-bold ${tones[tone]}`}>{children}</span>;
}

/** Concave notch cut out of the bottom-left corner of a rounded photo card. */
export function Notch({ children, bg = "var(--c-paper)", radius = "2rem", className = "" }: { children: ReactNode; bg?: string; radius?: string; className?: string }) {
  return (
    <div
      className={`absolute bottom-0 left-0 z-10 ${className}`}
      style={{ background: bg, borderTopRightRadius: radius, ["--notch-bg" as string]: bg, ["--fillet" as string]: radius }}
    >
      <span aria-hidden className="fillet absolute bottom-full left-0" />
      <span aria-hidden className="fillet absolute bottom-0 left-full" />
      {children}
    </div>
  );
}
