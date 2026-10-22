/**
 * Pineapple brand motif: slices (ring, half ring, wedge) with fibre texture,
 * scattered patterns, circular badge and spinner. Pure SVG, no assets.
 */
import type { CSSProperties, ReactNode } from "react";

export type SliceKind = "ring" | "half" | "quarter" | "wedge";

const SPAN: Record<SliceKind, number> = { ring: 360, half: 180, quarter: 100, wedge: 38 };

/** Deterministic pseudo-random sequence so server and client render identically. */
function rng(seed: number) {
  let s = seed || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [50 + r * Math.cos(a), 50 + r * Math.sin(a)];
}

/** Annular sector path in a 100×100 box. */
function sectorPath(r0: number, r1: number, a0: number, a1: number): string {
  if (a1 - a0 >= 360) {
    return [
      `M ${50 - r1} 50 a ${r1} ${r1} 0 1 0 ${2 * r1} 0 a ${r1} ${r1} 0 1 0 ${-2 * r1} 0 Z`,
      r0 > 0 ? `M ${50 - r0} 50 a ${r0} ${r0} 0 1 1 ${2 * r0} 0 a ${r0} ${r0} 0 1 1 ${-2 * r0} 0 Z` : "",
    ].join(" ");
  }
  const large = a1 - a0 > 180 ? 1 : 0;
  const [x1, y1] = polar(r1, a0);
  const [x2, y2] = polar(r1, a1);
  const [x3, y3] = polar(r0, a1);
  const [x4, y4] = polar(r0, a0);
  return `M ${x1} ${y1} A ${r1} ${r1} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r0} ${r0} 0 ${large} 0 ${x4} ${y4} Z`;
}

type SliceProps = {
  kind?: SliceKind;
  size?: number | string;
  rotate?: number;
  color?: string;
  /** Fibre lines on/off — off for tiny sizes. */
  texture?: boolean;
  seed?: number;
  className?: string;
  style?: CSSProperties;
};

export function PineappleSlice({
  kind = "ring",
  size = 120,
  rotate = 0,
  color = "var(--c-yellow)",
  texture = true,
  seed = 7,
  className,
  style,
}: SliceProps) {
  const span = SPAN[kind];
  const a0 = -span / 2;
  const a1 = span / 2;
  const r0 = kind === "wedge" ? 14 : 17;
  const r1 = 48;
  const rand = rng(seed);
  const fibres = texture
    ? Array.from({ length: Math.round(span / 2.2) }, () => {
        const a = a0 + rand() * span;
        const start = r0 + 2 + rand() * (r1 - r0) * 0.6;
        const len = 4 + rand() * 12;
        const [x1, y1] = polar(start, a);
        const [x2, y2] = polar(Math.min(r1 - 1, start + len), a + (rand() - 0.5) * 2);
        return { x1, y1, x2, y2, w: 0.3 + rand() * 0.5 };
      })
    : [];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden
    >
      <path d={sectorPath(r0, r1, a0, a1)} fill={color} fillRule="evenodd" />
      {fibres.map((f, i) => (
        <line
          key={i}
          x1={f.x1}
          y1={f.y1}
          x2={f.x2}
          y2={f.y2}
          stroke="var(--c-paper)"
          strokeOpacity={0.75}
          strokeWidth={f.w}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

type Scatter = { kind: SliceKind; x: number; y: number; size: number; rotate: number };

const PRESETS: Record<"hero" | "section" | "sparse", Scatter[]> = {
  hero: [
    { kind: "ring", x: -4, y: 8, size: 22, rotate: 10 },
    { kind: "half", x: 82, y: -6, size: 26, rotate: 160 },
    { kind: "wedge", x: 70, y: 62, size: 12, rotate: 40 },
    { kind: "quarter", x: 4, y: 70, size: 16, rotate: -30 },
    { kind: "wedge", x: 45, y: 4, size: 9, rotate: 200 },
    { kind: "wedge", x: 28, y: 86, size: 10, rotate: 120 },
    { kind: "ring", x: 90, y: 78, size: 18, rotate: 0 },
  ],
  section: [
    { kind: "half", x: -8, y: 20, size: 18, rotate: 90 },
    { kind: "wedge", x: 88, y: 10, size: 9, rotate: 30 },
    { kind: "quarter", x: 92, y: 70, size: 14, rotate: 250 },
  ],
  sparse: [
    { kind: "wedge", x: 4, y: 10, size: 7, rotate: 15 },
    { kind: "wedge", x: 92, y: 80, size: 8, rotate: 210 },
  ],
};

/** Decorative scattered slices, absolutely positioned behind content. */
export function PineapplePattern({
  preset = "section",
  opacity = 1,
  className = "",
}: {
  preset?: keyof typeof PRESETS;
  opacity?: number;
  className?: string;
}) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} style={{ opacity }} aria-hidden>
      {PRESETS[preset].map((s, i) => (
        <PineappleSlice
          key={i}
          kind={s.kind}
          rotate={s.rotate}
          seed={i * 31 + 5}
          size={`${s.size}vmin`}
          style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%` }}
        />
      ))}
    </div>
  );
}

/** Round badge with text along the circle, like a fruit-crate stamp. */
export function CircleBadge({
  text = "ANANAS TOUR • TRAVEL AGENCY • SINCE 2011 • ",
  center,
  size = 140,
  spin = true,
  color = "var(--c-ink)",
  className = "",
}: {
  text?: string;
  center?: ReactNode;
  size?: number;
  spin?: boolean;
  color?: string;
  className?: string;
}) {
  const id = `badge-${text.length}-${size}`;
  return (
    <div className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className={`absolute inset-0 ${spin ? "animate-[spin_24s_linear_infinite]" : ""}`} aria-hidden>
        <defs>
          <path id={id} d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
        </defs>
        <text fill={color} fontSize="8.6" fontWeight={700} letterSpacing="2.2" className="font-display">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <div className="relative text-center" style={{ color }}>
        {center ?? <PineappleSlice kind="ring" size={size * 0.36} seed={3} />}
      </div>
    </div>
  );
}

/** Loading indicator: a slowly turning pineapple ring. */
export function PineappleSpinner({ size = 48, label }: { size?: number; label?: string }) {
  return (
    <div role="status" className="inline-flex flex-col items-center gap-2">
      <PineappleSlice kind="ring" size={size} className="animate-spin" />
      {label ? <span className="text-sm text-ink/70">{label}</span> : <span className="sr-only">Loading</span>}
    </div>
  );
}

/** Clip a photo into a slice shape: <SliceImage kind="half" src=… />. */
export function SliceMask({
  kind,
  children,
  className = "",
}: {
  kind: Exclude<SliceKind, "ring">;
  children: ReactNode;
  className?: string;
}) {
  const span = SPAN[kind];
  const d = sectorPath(kind === "wedge" ? 0 : 12, 50, -span / 2, span / 2);
  const id = `mask-${kind}`;
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg width="0" height="0" aria-hidden className="absolute">
        <clipPath id={id} clipPathUnits="objectBoundingBox" transform="scale(0.01)">
          <path d={d} />
        </clipPath>
      </svg>
      <div className="absolute inset-0" style={{ clipPath: `url(#${id})` }}>
        {children}
      </div>
    </div>
  );
}
