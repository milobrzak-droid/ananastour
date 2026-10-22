import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/config";

const COOKIE = "NEXT_LOCALE";
const YEAR = 60 * 60 * 24 * 365;

/**
 * Ukrainian is the primary language: locale-less URLs always go to /uk, unless
 * the visitor explicitly switched to Czech before (remembered in a cookie).
 * Browser Accept-Language is deliberately ignored — Ukrainians living in
 * Czechia often have Czech browser settings.
 */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";

  if (isLocale(first)) {
    const res = NextResponse.next();
    // Remember the language the visitor is actually reading.
    if (req.cookies.get(COOKIE)?.value !== first) {
      res.cookies.set(COOKIE, first, { path: "/", maxAge: YEAR, sameSite: "lax" });
    }
    return res;
  }

  const saved = req.cookies.get(COOKIE)?.value ?? "";
  const locale = isLocale(saved) ? saved : defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
