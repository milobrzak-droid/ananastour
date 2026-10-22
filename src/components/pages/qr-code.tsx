import "server-only";
import QRCode from "qrcode";

/**
 * QR code rendered on the server as inline SVG (no images, no client JS).
 * Built from the raw module matrix so the markup is plain React, not innerHTML.
 */
export function QrCode({
  value,
  size = 180,
  color = "var(--c-ink)",
  background = "#ffffff",
  label,
  className = "",
}: {
  value: string;
  size?: number;
  color?: string;
  background?: string;
  /** Accessible description, e.g. "QR code: Telegram @Ananas_tours". */
  label: string;
  className?: string;
}) {
  const { modules } = QRCode.create(value, { errorCorrectionLevel: "M" });
  const n = modules.size;
  const quiet = 2;
  let d = "";
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (modules.get(y, x)) d += `M${x + quiet} ${y + quiet}h1v1h-1z`;
    }
  }
  const box = n + quiet * 2;
  return (
    <svg
      viewBox={`0 0 ${box} ${box}`}
      width={size}
      height={size}
      role="img"
      aria-label={label}
      shapeRendering="crispEdges"
      className={className}
    >
      <rect width={box} height={box} fill={background} />
      <path d={d} fill={color} />
    </svg>
  );
}
