import Link from "next/link";
import { CircleBadge, PineapplePattern } from "@/components/brand/pineapple";
import { TelegramButton } from "@/components/contact/telegram";
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
  legal: { uk: "Правова інформація", cs: "Právní informace" },
  privacy: { uk: "Конфіденційність", cs: "Ochrana osobních údajů" },
  terms: { uk: "Умови", cs: "Obchodní podmínky" },
};

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  return (
    <footer className="relative mt-16 overflow-hidden bg-ink pb-24 pt-14 text-paper md:pb-14">
      <PineapplePattern preset="sparse" opacity={0.25} />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 md:grid-cols-[auto_1fr_1fr_1fr] lg:px-8">
        <CircleBadge size={120} color="var(--c-paper)" />
        <div>
          <p className="font-display text-2xl font-extrabold">{site.name}</p>
          <p className="mt-2 text-sm text-paper/70">{t(copy.about, locale)}</p>
          <TelegramButton locale={locale} source="footer" size="sm" className="mt-4" />
        </div>
        <ul className="space-y-2 text-sm text-paper/80">
          <li><Link href={routes.hot(locale)}>{dict.nav.hot}</Link></li>
          <li><Link href={routes.destinations(locale)}>{dict.nav.destinations}</Link></li>
          <li><Link href={routes.services(locale)}>{dict.nav.services}</Link></li>
          <li><Link href={routes.blog(locale)}>{dict.nav.blog}</Link></li>
          <li><Link href={routes.contact(locale)}>{dict.nav.contact}</Link></li>
        </ul>
        <div className="space-y-2 text-sm text-paper/80">
          <p><a href={phoneLink()}>{site.contact.phone}</a></p>
          <p><a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
          <p>{t(site.contact.address, locale)}</p>
          <p className="pt-2 text-paper/50">
            {site.company.legalName} · IČO {site.company.ico}
          </p>
          <p className="flex gap-3 text-paper/50">
            <Link href={routes.privacy(locale)}>{t(copy.privacy, locale)}</Link>
            <Link href={routes.terms(locale)}>{t(copy.terms, locale)}</Link>
          </p>
        </div>
      </div>
      <p className="relative mx-auto mt-10 max-w-7xl px-4 text-xs text-paper/40 sm:px-6 lg:px-8">
        © 2011–{new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
