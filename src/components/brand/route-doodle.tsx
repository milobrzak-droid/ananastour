/**
 * Travel-route doodle (Reference 1): a dotted curvy line with map pins and
 * round photo bubbles, framing a centred tagline. Pure SVG + absolutely
 * positioned children, scales with its box (fixed aspect ratio).
 */
import Image from "next/image";
import type { ReactNode } from "react";

export type RoutePoint = [number, number];

/** Smooth path through points (Catmull-Rom → cubic Bézier). */
export function smoothPath(points: RoutePoint[], tension = 0.5): string {
  if (points.length < 2) return "";
  const p = [points[0], ...points, points[points.length - 1]];
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < p.length - 2; i++) {
    const [x0, y0] = p[i - 1];
    const [x1, y1] = p[i];
    const [x2, y2] = p[i + 1];
    const [x3, y3] = p[i + 2];
    const c1x = x1 + ((x2 - x0) / 6) * tension * 2;
    const c1y = y1 + ((y2 - y0) / 6) * tension * 2;
    const c2x = x2 - ((x3 - x1) / 6) * tension * 2;
    const c2y = y2 - ((y3 - y1) / 6) * tension * 2;
    d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${x2} ${y2}`;
  }
  return d;
}

/** Map pin glyph (navy drop with a yellow core). */
export function MapPin({ size = 34, tone = "ink" }: { size?: number; tone?: "ink" | "red" | "yellow" }) {
  const fill = { ink: "var(--c-ink)", red: "var(--c-red)", yellow: "var(--c-yellow)" }[tone];
  const core = tone === "yellow" ? "var(--c-ink)" : "var(--c-yellow)";
  return (
    <svg viewBox="0 0 32 40" width={size} height={size * 1.25} aria-hidden focusable="false">
      <ellipse cx="16" cy="38" rx="6" ry="1.6" fill="var(--c-ink)" opacity="0.18" />
      <path d="M16 1C8 1 2.5 6.9 2.5 14.3 2.5 24 16 37 16 37s13.5-13 13.5-22.7C29.5 6.9 24 1 16 1Z" fill={fill} />
      <circle cx="16" cy="14" r="5.4" fill={core} />
    </svg>
  );
}

export type RouteStop = {
  /** Position in viewBox units (box is `width × height`). */
  at: RoutePoint;
  kind: "pin" | "photo" | "dot";
  src?: string;
  /** Bubble diameter in % of the box width. */
  size?: number;
  tone?: "ink" | "red" | "yellow";
  label?: ReactNode;
  /** Where the label sits relative to the pin. */
  labelSide?: "top" | "bottom" | "left" | "right";
};

export function RouteDoodle({
  points,
  stops = [],
  width = 1200,
  height = 320,
  children,
  className = "",
  stroke = "var(--c-ink)",
}: {
  points: RoutePoint[];
  stops?: RouteStop[];
  width?: number;
  height?: number;
  children?: ReactNode;
  className?: string;
  stroke?: string;
}) {
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  return (
    <div className={`relative w-full ${className}`} style={{ aspectRatio: `${width} / ${height}` }}>
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full overflow-visible" aria-hidden focusable="false">
        <path d={smoothPath(points)} fill="none" stroke={stroke} strokeOpacity="0.55" strokeWidth="3.2" strokeLinecap="round" strokeDasharray="0.1 13" />
      </svg>
      {stops.map((s, i) => {
        const style = { left: pct(s.at[0], width), top: pct(s.at[1], height) };
        if (s.kind === "photo" && s.src) {
          const d = `${s.size ?? 8}%`;
          return (
            <span
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-grey shadow-lg ring-4 ring-paper"
              style={{ ...style, width: d, aspectRatio: "1" }}
              aria-hidden
            >
              <Image src={s.src} alt="" fill sizes="140px" className="object-cover" />
            </span>
          );
        }
        if (s.kind === "dot") {
          return <span key={i} aria-hidden className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-ink bg-yellow" style={style} />;
        }
        const side = s.labelSide ?? "top";
        const labelPos = {
          top: "bottom-full left-1/2 mb-1 -translate-x-1/2 text-center",
          bottom: "top-full left-1/2 mt-1 -translate-x-1/2 text-center",
          left: "right-full top-1/2 mr-2 -translate-y-1/2 text-right",
          right: "left-full top-1/2 ml-2 -translate-y-1/2 text-left",
        }[side];
        return (
          <span key={i} className="absolute -translate-x-1/2 -translate-y-full" style={style}>
            <MapPin tone={s.tone} />
            {s.label && <span className={`absolute w-max max-w-[11rem] ${labelPos}`}>{s.label}</span>}
          </span>
        );
      })}
      {children && <div className="absolute inset-0 grid place-items-center">{children}</div>}
    </div>
  );
}
