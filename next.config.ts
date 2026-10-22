import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Default ".next"; override so parallel dev/build runs don't clobber each other.
  ...(process.env.NEXT_DIST_DIR ? { distDir: process.env.NEXT_DIST_DIR } : {}),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Conservative hardening set. Deliberately NO Content-Security-Policy yet:
          // Next.js App Router relies on inline scripts (hydration, next/script),
          // so a strict static CSP breaks the site. When adding one later, generate
          // a per-request nonce in src/middleware.ts and pass it via headers
          // (https://nextjs.org/docs/app/guides/content-security-policy).
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  images: {
    // Serve modern formats; largest layout width is ~1300px (hero), so 3840 is never needed.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2560],
    remotePatterns: [
      // Mock data photos. TODO(anchoice): add AnChoice image CDN host.
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
