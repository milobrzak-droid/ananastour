import { site } from "@/config/site";
import { t, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { telegramLink } from "@/lib/contact/telegram";

/** schema.org TravelAgency for the whole site — render once in the locale layout. */
export function TravelAgencyJsonLd({ locale }: { locale: Locale }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    url: new URL(routes.home(locale), site.url).toString(),
    // The app ships src/app/icon.svg (no favicon.ico exists).
    logo: new URL("/icon.svg", site.url).toString(),
    telephone: site.contact.phone.replace(/\s+/g, ""),
    email: site.contact.email,
    inLanguage: locale,
    foundingDate: String(site.owner.since),
    founder: { "@type": "Person", name: t(site.owner.name, locale) },
    sameAs: [site.contact.instagram, telegramLink()],
    address: {
      "@type": "PostalAddress",
      // TODO(client): street + postal code once the office address is known.
      addressLocality: t(site.contact.address, locale),
      addressCountry: "CZ",
    },
    areaServed: { "@type": "Country", name: "CZ" },
    availableLanguage: ["uk", "cs"],
  };

  return (
    <script
      type="application/ld+json"
      // Escape "<" so user-editable config can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
