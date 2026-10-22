import Link from "next/link";
import { Stamp } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
import { Logo } from "@/components/layout/header";
import { site } from "@/config/site";
import { t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { routes } from "@/i18n/routes";
import { phoneLink } from "@/lib/contact/telegram";

const copy = {
  about: {
    uk: "Ваш надійний партнер у світі подорожей. Від першого повідомлення до щасливого повернення додому.",
    cs: "Váš spolehlivý partner pro cestování. Od první zprávy až po šťastný návrat domů.",
  },
  nav: { uk: "Навігація", cs: "Navigace" },
  contacts: { uk: "Контакти", cs: "Kontakty" },
  privacy: { uk: "Конфіденційність", cs: "Ochrana osobních údajů" },
  terms: { uk: "Умови", cs: "Obchodní podmínky" },
};

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const links = [
    { href: routes.tours(locale), label: dict.nav.tours },
    { href: routes.hot(locale), label: dict.nav.hot },
    { href: routes.destinations(locale), label: dict.nav.destinations },
    { href: routes.services(locale), label: dict.nav.services },
    { href: routes.blog(locale), label: dict.nav.blog },
    { href: routes.about(locale), label: dict.nav.about },
    { href: routes.contact(locale), label: dict.nav.contact },
  ];
  return (
    <footer className="px-1.5 pb-1.5 pt-10 sm:px-3 sm:pb-3 sm:pt-16">
      <div className="relative isolate overflow-hidden rounded-[1.5rem] bg-ice px-5 pb-8 pt-10 text-ink sm:rounded-[2.25rem] sm:px-10 sm:pt-12">
        <div className="grid gap-10 md:grid-cols-[1.3fr_1fr_1fr] lg:grid-cols-[auto_1.3fr_1fr_1fr]">
          <Stamp
            size={150}
            top="ANANAS TOUR • TRAVEL"
            bottom={`SINCE ${site.owner.since}`}
            above={["FINEST", "HOLIDAYS"]}
            word="ANANAS"
            below={["FROM", "CZECHIA"]}
            className="hidden lg:block"
          />
          <div>
            <Logo locale={locale} />
            <p className="mt-4 max-w-sm text-sm text-ink/80">{t(copy.about, locale)}</p>
            <TelegramButton locale={locale} source="footer" size="md" className="mt-5" />
          </div>
          <nav aria-label={t(copy.nav, locale)}>
            <p className="eyebrow text-ink/75">{t(copy.nav, locale)}</p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 text-sm font-semibold md:grid-cols-1">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="inline-flex min-h-9 items-center hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="text-sm">
            <p className="eyebrow text-ink/75">{t(copy.contacts, locale)}</p>
            <ul className="mt-3 space-y-1 font-semibold">
              <li>
                <a href={phoneLink()} className="inline-flex min-h-9 items-center hover:underline">
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.contact.email}`} className="inline-flex min-h-9 items-center break-all hover:underline">
                  {site.contact.email}
                </a>
              </li>
              <li className="py-1.5 font-normal text-ink/80">{t(site.contact.hours, locale)}</li>
              <li className="font-normal text-ink/80">{t(site.contact.address, locale)}</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-ink/15 pt-5 text-xs text-ink/80">
          <p>
            © 2011–{new Date().getFullYear()} {site.name} · {site.company.legalName} · IČO {site.company.ico}
          </p>
          <p className="flex gap-4">
            <Link href={routes.privacy(locale)} className="inline-flex min-h-9 items-center underline-offset-2 hover:underline">
              {t(copy.privacy, locale)}
            </Link>
            <Link href={routes.terms(locale)} className="inline-flex min-h-9 items-center underline-offset-2 hover:underline">
              {t(copy.terms, locale)}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
