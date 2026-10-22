"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LogoFull } from "@/components/brand/logo";
import { TelegramButton } from "@/components/contact/telegram";
import { localeLabels, locales, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";

const tx = {
  menu: { uk: "Меню", cs: "Menu" },
  closeMenu: { uk: "Закрити меню", cs: "Zavřít menu" },
  search: { uk: "Пошук турів", cs: "Hledat zájezdy" },
  main: { uk: "Головна навігація", cs: "Hlavní navigace" },
  mobile: { uk: "Мобільна навігація", cs: "Mobilní navigace" },
  lang: { uk: "Мова", cs: "Jazyk" },
};

export function Logo({ locale, tone = "ink", size = 48 }: { locale: Locale; tone?: "ink" | "paper"; size?: number }) {
  return (
    <Link href={routes.home(locale)} className="group flex min-h-11 shrink-0 items-center" aria-label="Ananas Tour">
      <LogoFull size={size} tone={tone} className="transition duration-300 group-hover:-rotate-2" />
    </Link>
  );
}

function LocaleSwitch({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  return (
    <div className="flex shape-pill bg-grey p-1 text-xs font-bold" role="group" aria-label={t(tx.lang, locale)}>
      {locales.map((l) => (
        <Link
          key={l}
          href={pathname.replace(/^\/(uk|cs)/, `/${l}`)}
          title={localeLabels[l]}
          hrefLang={l}
          aria-current={l === locale ? "true" : undefined}
          className={`grid h-9 min-w-10 place-items-center shape-pill px-2.5 uppercase ${l === locale ? "bg-ink text-paper" : "text-ink/75 hover:text-ink"}`}
        >
          {l === "uk" ? "UA" : "CZ"}
        </Link>
      ))}
    </div>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname();
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
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-10">
        <Logo locale={locale} />
        <nav aria-label={t(tx.main, locale)} className="hidden items-center gap-1 text-[0.82rem] font-semibold xl:flex">
          {nav.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              aria-current={isActive(n.href) ? "page" : undefined}
              className={`inline-flex min-h-11 items-center shape-pill px-3 transition ${
                isActive(n.href) ? "bg-ink text-paper" : "text-ink/80 hover:bg-grey hover:text-ink"
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LocaleSwitch locale={locale} />
          <Link
            href={routes.tours(locale)}
            aria-label={t(tx.search, locale)}
            className="hidden h-11 w-11 place-items-center rounded-full bg-grey transition hover:bg-yellow sm:grid"
          >
            <svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" strokeLinecap="round" />
            </svg>
          </Link>
          <span className="hidden sm:block">
            <TelegramButton locale={locale} source="header" size="sm" />
          </span>
          <button
            className="grid h-11 w-11 place-items-center rounded-full bg-ink text-paper xl:hidden"
            onClick={() => setMenu((v) => !v)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? t(tx.closeMenu, locale) : t(tx.menu, locale)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden>
              {menu ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h10" />}
            </svg>
          </button>
        </div>
      </div>
      {menu && (
        <nav id="mobile-menu" aria-label={t(tx.mobile, locale)} className="mx-3 mb-3 rounded-[1.75rem] bg-white p-3 shadow-xl xl:hidden">
          <ul className="grid gap-1 sm:grid-cols-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setMenu(false)}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`flex min-h-12 items-center justify-between rounded-2xl px-4 font-display text-base font-bold ${
                    isActive(n.href) ? "bg-ink text-paper" : "hover:bg-grey"
                  }`}
                >
                  {n.label}
                  <span aria-hidden>→</span>
                </Link>
              </li>
            ))}
          </ul>
          <TelegramButton locale={locale} source="mobile-menu" className="mt-3 w-full" />
        </nav>
      )}
    </header>
  );
}
