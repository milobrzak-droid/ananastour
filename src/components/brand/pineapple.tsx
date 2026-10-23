/**
 * Pineapple brand motif (Reference 2): mustard slices — full rings, half rings,
 * quarter arcs, wedges — with fine white fibre lines radiating outward, the
 * scattered poster pattern, a navy circular stamp, a rotating badge and a
 * spinner. Pure SVG, no assets. Safe in server components (useId only).
 */
import { useId, type CSSProperties, type ReactNode } from "react";

export type SliceKind = "ring" | "half" | "quarter" | "wedge";

const SPAN: Record<SliceKind, number> = { ring: 360, half: 180, quarter: 90, wedge: 38 };

/** Deterministic pseudo-random sequence so server and client render identically. */
function rng(seed: number) {
  let s = Math.abs(Math.floor(seed)) % 2147483646 || 1;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

function polar(r: number, deg: number): [number, number] {
  const a = ((deg - 90) * Math.PI) / 180;
  return [r2(50 + r * Math.cos(a)), r2(50 + r * Math.sin(a))];
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
  if (r0 <= 0) return `M 50 50 L ${x1} ${y1} A ${r1} ${r1} 0 ${large} 1 ${x2} ${y2} Z`;
  return `M ${x1} ${y1} A ${r1} ${r1} 0 ${large} 1 ${x2} ${y2} L ${x3} ${y3} A ${r0} ${r0} 0 ${large} 0 ${x4} ${y4} Z`;
}

/**
 * Fibre texture: thin hand-printed scratches radiating from the core outward,
 * bundled into three stroke widths (three <path>s instead of hundreds of <line>s).
 */
function fibrePaths(kind: SliceKind, r0: number, r1: number, seed: number): string[] {
  const span = SPAN[kind];
  const a0 = -span / 2;
  const rand = rng(seed);
  const buckets: string[][] = [[], [], []];
  const margin = kind === "ring" ? 0 : 3; // keep fibres off the cut edges
  const count = Math.round(span * (kind === "ring" ? 0.75 : 0.95)) + 6;
  for (let i = 0; i < count; i++) {
    const a = a0 + margin + rand() * (span - 2 * margin);
    // Most fibres start near the core and run outward, a few are short rim flecks.
    const fleck = rand() < 0.22;
    const start = fleck ? r1 - 3 - rand() * 7 : r0 + 1.2 + Math.pow(rand(), 1.6) * (r1 - r0) * 0.55;
    const len = fleck ? 1.5 + rand() * 3 : 5 + rand() * (r1 - start - 3) * 0.85;
    const end = Math.min(r1 - 1.6, start + len);
    if (end - start < 1) continue;
    const bend = (rand() - 0.5) * 2.4;
    const [x1, y1] = polar(start, a);
    const [x2, y2] = polar(end, a + bend);
    const w = rand();
    buckets[w < 0.5 ? 0 : w < 0.85 ? 1 : 2].push(`M${x1} ${y1}L${x2} ${y2}`);
  }
  return buckets.map((b) => b.join(""));
}

const FIBRE_WIDTH = [0.28, 0.5, 0.8];
const FIBRE_OPACITY = [0.65, 0.8, 0.9];

type SliceProps = {
  kind?: SliceKind;
  size?: number | string;
  rotate?: number;
  color?: string;
  /** Fibre colour — white by default, like the printed poster. */
  fibre?: string;
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
  fibre = "#fff",
  texture = true,
  seed = 7,
  className,
  style,
}: SliceProps) {
  const span = SPAN[kind];
  const r0 = kind === "wedge" ? 9 : kind === "quarter" ? 15 : 16;
  const r1 = 48;
  const fibres = texture ? fibrePaths(kind, r0, r1, seed) : [];

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{ transform: rotate ? `rotate(${rotate}deg)` : undefined, ...style }}
      aria-hidden
      focusable="false"
    >
      <path d={sectorPath(r0, r1, -span / 2, span / 2)} fill={color} fillRule="evenodd" />
      {fibres.map((d, i) =>
        d ? (
          <path
            key={i}
            d={d}
            stroke={fibre}
            strokeOpacity={FIBRE_OPACITY[i]}
            strokeWidth={FIBRE_WIDTH[i]}
            strokeLinecap="round"
            fill="none"
          />
        ) : null,
      )}
    </svg>
  );
}

type Scatter = { kind: SliceKind; x: number; y: number; size: number; rotate: number };

/** Positions in % of the box, sizes in vmin — mimics the printed poster. */
const PRESETS: Record<"hero" | "section" | "sparse" | "poster", Scatter[]> = {
  hero: [
    { kind: "ring", x: -6, y: 6, size: 24, rotate: 10 },
    { kind: "half", x: 80, y: -8, size: 28, rotate: 160 },
    { kind: "wedge", x: 70, y: 62, size: 12, rotate: 40 },
    { kind: "quarter", x: 4, y: 70, size: 18, rotate: -30 },
    { kind: "wedge", x: 45, y: 2, size: 9, rotate: 200 },
    { kind: "wedge", x: 28, y: 86, size: 10, rotate: 120 },
    { kind: "ring", x: 90, y: 76, size: 18, rotate: 0 },
  ],
  section: [
    { kind: "half", x: -8, y: 18, size: 18, rotate: 90 },
    { kind: "wedge", x: 88, y: 8, size: 9, rotate: 30 },
    { kind: "quarter", x: 92, y: 68, size: 14, rotate: 250 },
    { kind: "wedge", x: 40, y: 88, size: 7, rotate: 300 },
  ],
  sparse: [
    { kind: "wedge", x: 3, y: 10, size: 7, rotate: 15 },
    { kind: "wedge", x: 92, y: 78, size: 8, rotate: 210 },
  ],
  poster: [
    { kind: "ring", x: -5, y: -8, size: 22, rotate: 20 },
    { kind: "half", x: 30, y: -10, size: 16, rotate: 200 },
    { kind: "wedge", x: 58, y: 6, size: 8, rotate: 70 },
    { kind: "quarter", x: 80, y: -4, size: 18, rotate: 140 },
    { kind: "wedge", x: 18, y: 40, size: 7, rotate: 300 },
    { kind: "half", x: -8, y: 58, size: 18, rotate: 60 },
    { kind: "ring", x: 86, y: 44, size: 20, rotate: 0 },
    { kind: "wedge", x: 70, y: 74, size: 9, rotate: 160 },
    { kind: "quarter", x: 30, y: 80, size: 15, rotate: 20 },
    { kind: "wedge", x: 52, y: 92, size: 7, rotate: 240 },
  ],
};

/** Decorative scattered slices, absolutely positioned behind content. */
export function PineapplePattern({
  preset = "section",
  opacity = 1,
  color,
  fibre,
  className = "",
}: {
  preset?: keyof typeof PRESETS;
  opacity?: number;
  color?: string;
  fibre?: string;
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
          color={color}
          fibre={fibre}
          size={`${s.size}vmin`}
          style={{ position: "absolute", left: `${s.x}%`, top: `${s.y}%` }}
        />
      ))}
    </div>
  );
}

/** Safe id for SVG references (React ids contain characters CSS url() dislikes). */
function useSvgId(prefix: string) {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

/** Round badge with text running around the circle (optionally spinning). */
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
  const id = useSvgId("badge");
  return (
    <div className={`relative inline-grid place-items-center ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" className={`absolute inset-0 ${spin ? "animate-[spin_28s_linear_infinite]" : ""}`} aria-hidden>
        <defs>
          <path id={id} d="M 50 50 m -38 0 a 38 38 0 1 1 76 0 a 38 38 0 1 1 -76 0" />
        </defs>
        <text fill={color} fontSize="8.4" fontWeight={800} letterSpacing="2" style={{ fontFamily: "var(--font-slab), Georgia, serif" }}>
          <textPath href={`#${id}`} textLength={236} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      <div className="relative text-center" style={{ color }}>
        {center ?? <PineappleSlice kind="ring" size={size * 0.38} seed={3} />}
      </div>
    </div>
  );
}

/**
 * Advance widths (em) of the stamp fonts' capitals, measured in the browser and
 * grouped, rounding up. The stamp is server-rendered, so nothing can be measured
 * at render time: these estimates size the text so it never runs past the rings.
 * Unknown characters count as wide.
 */
function emCounter(groups: Array<[string, number]>, fallback: number) {
  const table = new Map<string, number>();
  for (const [chars, em] of groups) for (const ch of chars) table.set(ch, em);
  return (s: string) => [...s].reduce((sum, ch) => sum + (table.get(ch.toUpperCase()) ?? fallback), 0);
}

/** Roboto Slab 800 (arcs and the centre word). */
const slabEm = emCounter(
  [
    [" ’'.,:;·", 0.28],
    ["IÍІЇ•()!", 0.36],
    ["-1", 0.45],
    ["023456789+", 0.57],
    ["LJZŽSŠFГҐЗ", 0.62],
    ["EÉĚCČPBGЕЄРСВЬБЯ–", 0.67],
    ["TŤRŘDĎOÓQТУОК", 0.72],
    ["AÁXYÝVKUÚŮАХЛЧ", 0.76],
    ["HNŇДНИЙПЦФ—", 0.81],
    ["MWМЖШЩЮ", 1.09],
  ],
  0.82,
);

/** Montserrat 800 (the small caps lines above and below the word). */
const capsEm = emCounter(
  [
    [" ’'.,:;·", 0.32],
    ["IÍІЇ•()!-1", 0.4],
    ["023456789+–JLSŠTŤFZŽEÉĚYÝГҐТЗЕ", 0.7],
    ["CČPRŘXKЄРСЬБВУЧЯКХ", 0.75],
    ["ABGVUÚŮDĎOÓQHNŇАИЙНПЛДОЦ", 0.85],
    ["MWМФЖШЩЮ—", 1.18],
  ],
  0.9,
);

/** Text inside the inner ring (r 34.5) keeps this distance from the centre, leaving air before the ring. */
const STAMP_ROOM = 31.5;
/** Arc length the ring text may use: top arc is 122.5 long, bottom 133.8, minus air around the side dots. */
const ARC_ROOM = { top: 112, bottom: 120 };
/** The centre word may be condensed to this share of its natural width before it gets smaller. */
const WORD_SQUEEZE = 0.85;

/** Widest text that fits inside the inner ring between two heights of the 100×100 box. */
function ringChord(yTop: number, yBottom: number): number {
  const d = Math.max(Math.abs(yTop - 50), Math.abs(yBottom - 50));
  return d >= STAMP_ROOM ? 0 : 2 * Math.sqrt(STAMP_ROOM ** 2 - d ** 2);
}

/**
 * Navy fruit-crate stamp (Reference 2): text on the top and bottom arcs,
 * spaced caps inside and one heavy slab word in the middle. Every line is
 * fitted to the rings, so any copy length in either language stays readable:
 * long arcs shrink (both arcs together, so the ring reads as one), the word
 * condenses and then shrinks, long caps lines condense.
 */
export function Stamp({
  top = "ANANAS TOUR • TRAVEL",
  bottom = "SINCE 2011",
  above = ["FINEST", "QUALITY TOURS"],
  word = "ANANAS",
  below = ["FROM", "CZECHIA"],
  size = 180,
  tone = "navy",
  spin = false,
  className = "",
}: {
  top?: string;
  bottom?: string;
  above?: string[];
  word?: string;
  below?: string[];
  size?: number | string;
  tone?: "navy" | "paper" | "yellow";
  spin?: boolean;
  className?: string;
}) {
  const id = useSvgId("stamp");
  const bg = { navy: "var(--c-ink)", paper: "var(--c-paper)", yellow: "var(--c-yellow)" }[tone];
  const fg = tone === "navy" ? "var(--c-paper)" : "var(--c-ink)";
  const accent = tone === "navy" ? "var(--c-yellow)" : "var(--c-ink)";
  const slab = { fontFamily: "var(--font-slab), Georgia, serif" };
  const caps = { fontFamily: "var(--font-body), sans-serif" };
  const centerLines = above.length + below.length;
  const step = 6.4;
  const capsSize = 4.6;
  const capsSpacing = 1.1;
  // Word baseline for a given size, using the same layout maths as the render below.
  const wordBaseline = (fs: number) => 50 - (centerLines * step + fs) / 2 + 4.6 + above.length * step + fs * 0.72 - 2.6;
  const wordRoom = (fs: number) => ringChord(wordBaseline(fs) - fs * 0.72, wordBaseline(fs));
  const wordWidth = slabEm(word);
  let wordSize = 15;
  while (wordSize > 5 && wordWidth * wordSize * WORD_SQUEEZE > wordRoom(wordSize)) wordSize -= 0.25;
  const wordFit = wordRoom(wordSize) > 0 && wordWidth * wordSize > wordRoom(wordSize) ? r2(wordRoom(wordSize)) : undefined;
  // Both arcs share one scale so the ring text reads as one line of type.
  const arcLength = (s: string) => slabEm(s) * 6.6 + Math.max([...s].length - 1, 0) * 1.6;
  const arcScale = Math.min(1, ARC_ROOM.top / Math.max(arcLength(top), 1), ARC_ROOM.bottom / Math.max(arcLength(bottom), 1));
  const arcFont = { fontSize: r2(6.6 * arcScale), letterSpacing: r2(1.6 * arcScale) };
  // Caps lines: condense a line only when it would cross the ring at its height.
  const capsFit = (l: string, baseline: number) => {
    const room = ringChord(baseline - capsSize * 0.72, baseline);
    return room > 0 && capsEm(l) * capsSize + Math.max([...l].length - 1, 0) * capsSpacing > room ? r2(room) : undefined;
  };
  const blockH = centerLines * step + wordSize;
  let y = 50 - blockH / 2 + 4.6;
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={className} role="img" aria-label={`${top} ${word} ${bottom}`}>
      <defs>
        <path id={`${id}t`} d="M 11 50 A 39 39 0 0 1 89 50" />
        <path id={`${id}b`} d="M 7.4 50 A 42.6 42.6 0 0 0 92.6 50" />
      </defs>
      <circle cx="50" cy="50" r="49.5" fill={bg} />
      <g className={spin ? "origin-center animate-[spin_40s_linear_infinite]" : undefined}>
        <circle cx="50" cy="50" r="47" fill="none" stroke={fg} strokeWidth="0.5" />
        <circle cx="50" cy="50" r="34.5" fill="none" stroke={fg} strokeWidth="0.5" />
        <text fill={fg} fontSize={arcFont.fontSize} fontWeight={800} letterSpacing={arcFont.letterSpacing} style={slab}>
          <textPath href={`#${id}t`} startOffset="50%" textAnchor="middle">
            {top}
          </textPath>
        </text>
        <text fill={fg} fontSize={arcFont.fontSize} fontWeight={800} letterSpacing={arcFont.letterSpacing} style={slab}>
          <textPath href={`#${id}b`} startOffset="50%" textAnchor="middle">
            {bottom}
          </textPath>
        </text>
        <circle cx="8.6" cy="52" r="1.3" fill={accent} />
        <circle cx="91.4" cy="52" r="1.3" fill={accent} />
      </g>
      {above.map((l) => {
        const el = (
          <text
            key={`a${l}`}
            x="50"
            y={y}
            textAnchor="middle"
            fill={fg}
            fontSize={capsSize}
            fontWeight={800}
            letterSpacing={capsSpacing}
            textLength={capsFit(l, y)}
            lengthAdjust="spacingAndGlyphs"
            style={caps}
          >
            {l}
          </text>
        );
        y += step;
        return el;
      })}
      <text
        x="50"
        y={y + wordSize * 0.72 - 2.6}
        textAnchor="middle"
        fill={accent}
        fontSize={wordSize}
        fontWeight={900}
        textLength={wordFit}
        lengthAdjust="spacingAndGlyphs"
        style={slab}
      >
        {word}
      </text>
      {(() => {
        y += wordSize + 1.4;
        return below.map((l) => {
          const el = (
            <text
              key={`b${l}`}
              x="50"
              y={y}
              textAnchor="middle"
              fill={fg}
              fontSize={capsSize}
              fontWeight={800}
              letterSpacing={capsSpacing}
              textLength={capsFit(l, y)}
              lengthAdjust="spacingAndGlyphs"
              style={caps}
            >
              {l}
            </text>
          );
          y += step;
          return el;
        });
      })()}
    </svg>
  );
}

/** Loading indicator: a slowly turning pineapple ring. */
export function PineappleSpinner({ size = 48, label }: { size?: number; label?: string }) {
  return (
    <div role="status" className="inline-flex flex-col items-center gap-2">
      <PineappleSlice kind="ring" size={size} className="animate-spin [animation-duration:2.4s]" />
      {label ? <span className="text-sm text-ink/70">{label}</span> : <span className="sr-only">Loading</span>}
    </div>
  );
}

/** Clip a photo into a slice shape: <SliceMask kind="half"><Image …/></SliceMask>. */
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
  const id = useSvgId("mask");
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
