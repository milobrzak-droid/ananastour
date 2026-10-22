"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PineappleSlice } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { localeLabels, locales, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";

export function Logo({ locale }: { locale: Locale }) {
  return (
    <Link href={routes.home(locale)} className="flex items-center gap-2" aria-label="Ananas Tour">
      <PineappleSlice kind="ring" size={40} seed={3} />
      <span className="leading-none">
        <span className="block font-display text-2xl font-extrabold tracking-tight">Ananas</span>
        <span className="block text-[0.65rem] uppercase tracking-[0.3em] text-ink/60">travel agency</span>
      </span>
    </Link>
  );
}

function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <div className="flex shape-pill bg-grey p-1 text-xs font-semibold">
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname.replace(/^\/(uk|cs)/, `/${l}`)}
          title={localeLabels[l]}
          className={`shape-pill px-2.5 py-1 uppercase ${l === locale ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"}`}
        >
          {l === "uk" ? "UA" : "CZ"}
        </Link>
      ))}
    </div>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [menu, setMenu] = useState(false);
  const nav = [
    { href: routes.tours(locale), label: dict.nav.tours },
    { href: routes.hot(locale), label: dict.nav.hot },
    { href: routes.destinations(locale), label: dict.nav.destinations },
    { href: routes.services(locale), label: dict.nav.services },
    { href: routes.blog(locale), label: dict.nav.blog },
    { href: routes.about(locale), label: dict.nav.about },
    { href: routes.contact(locale), label: dict.nav.contact },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo locale={locale} />
        <nav className="hidden items-center gap-5 text-sm font-medium lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="hover:text-red">
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitch locale={locale} />
          <TelegramButton locale={locale} source="header" size="sm" className="hidden sm:inline-flex" />
          <button
            className="grid h-10 w-10 place-items-center shape-pill bg-grey lg:hidden"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-label="Menu"
          >
            <span className="text-xl leading-none">{menu ? "×" : "≡"}</span>
          </button>
        </div>
      </div>
      {menu && (
        <nav className="border-t border-ink/5 px-4 pb-4 lg:hidden">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setMenu(false)} className="block py-3 font-medium">
              {n.label}
            </Link>
          ))}
          <TelegramButton locale={locale} source="mobile-menu" className="mt-2 w-full" />
        </nav>
      )}
    </header>
  );
}
