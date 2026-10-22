import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, locales } from "@/i18n/config";

/** Redirect locale-less URLs to /uk or /cs based on Accept-Language. */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const first = pathname.split("/")[1] ?? "";
  if (isLocale(first)) return NextResponse.next();

  const accept = req.headers.get("accept-language")?.toLowerCase() ?? "";
  const preferred = locales.find((l) => accept.startsWith(l) || accept.includes(`,${l}`)) ?? defaultLocale;
  const url = req.nextUrl.clone();
  url.pathname = `/${preferred}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
