import { useId } from "react";

/**
 * Ananas Tour logo, vectorised from the client's logo sheet and recoloured to
 * the site palette (blue → navy ink, cream → paper, orange → red).
 * Mark: pineapple with three leaves and a negative-space "A" cut into the body.
 */
type Tone = "ink" | "paper" | "red" | "yellow";

const fill: Record<Tone, string> = {
  ink: "var(--c-ink)",
  paper: "var(--c-paper)",
  red: "var(--c-red)",
  yellow: "var(--c-yellow)",
};

const LEAF_CENTER =
  "M280 20C320 80 340 150 338 210C335 270 305 310 280 330C255 310 225 270 222 210C220 150 240 80 280 20Z";
const LEAF_LEFT = "M52 155C130 160 200 195 225 250C235 280 238 310 238 335C180 330 120 300 90 255C65 220 55 190 52 155Z";
const LEAF_RIGHT = "M508 155C430 160 360 195 335 250C325 280 322 310 322 335C380 330 440 300 470 255C495 220 505 190 508 155Z";
const BODY =
  "M28 560C28 430 120 345 250 345H310C440 345 532 430 532 560V700C532 745 520 775 505 802H55C40 775 28 745 28 700Z";
const A_CUT = "M266 412Q280 388 294 412L518 806H42Z";
const COUNTER = "M215 705C225 640 250 598 280 598C310 598 333 640 342 705C300 697 258 697 215 705Z";
const DOME = "M128 885C165 800 215 760 280 760C345 760 395 800 430 885C380 915 330 930 280 930C230 930 178 915 128 885Z";

export function LogoMark({
  size = 48,
  tone = "ink",
  className,
  title,
}: {
  /** Height in px; width follows the 520:920 aspect ratio. */
  size?: number;
  tone?: Tone;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const color = fill[tone];
  return (
    <svg
      viewBox="20 12 520 924"
      height={size}
      width={(size * 520) / 924}
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      <defs>
        <mask id={`a-${id}`} maskUnits="userSpaceOnUse">
          <rect x="0" y="0" width="560" height="960" fill="#fff" />
          <path d={A_CUT} fill="#000" />
        </mask>
      </defs>
      <g fill={color}>
        <path d={LEAF_LEFT} />
        <path d={LEAF_CENTER} />
        <path d={LEAF_RIGHT} />
        <path d={BODY} mask={`url(#a-${id})`} />
        <path d={COUNTER} />
        <path d={DOME} />
      </g>
    </svg>
  );
}

/** Mark + "ananas / TOUR" wordmark. `size` is the mark height in px. */
export function LogoFull({
  size = 48,
  tone = "ink",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center ${className}`} style={{ gap: size * 0.12, color: fill[tone] }}>
      <LogoMark size={size} tone={tone} />
      <span className="flex flex-col leading-none" style={{ paddingTop: size * 0.28 }}>
        <span className="font-display font-black lowercase" style={{ fontSize: size * 0.5, letterSpacing: "-0.04em" }}>
          ananas
        </span>
        <span
          className="font-sans font-extrabold uppercase"
          style={{ fontSize: size * 0.17, letterSpacing: "0.42em", marginTop: size * 0.05, paddingLeft: size * 0.02 }}
        >
          tour
        </span>
      </span>
    </span>
  );
}
