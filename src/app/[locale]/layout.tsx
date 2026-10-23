import type { Metadata } from "next";
import { Montserrat, Roboto_Slab, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import { ContactStrip, FloatingContact } from "@/components/contact/telegram";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TravelAgencyJsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { isLocale, locales, t } from "@/i18n/config";
import { languageAlternates, routes } from "@/i18n/routes";
import "../globals.css";

const body = Montserrat({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-body", display: "swap" });
// Heavy geometric sans for headlines (Reference 1), slab for stamps (Reference 2).
// Weights trimmed to what the UI actually uses: font-bold/extrabold/black with font-display,
// fontWeight 800 in the Stamp/CircleBadge SVGs with font-slab.
const display = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});
const slab = Roboto_Slab({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["800"],
  variable: "--font-slab",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/** GTM container id (optional analytics) — set NEXT_PUBLIC_GTM_ID to enable. */
const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

const meta = {
  title: {
    uk: "Ananas Tour — тури з Чехії українською",
    cs: "Ananas Tour – zájezdy z Česka, česky i ukrajinsky",
  },
  description: {
    uk: "Тури чеських туроператорів, застрахованих від банкрутства: Туреччина, Єгипет, Греція й ще 9 країн. Альона підбере в Telegram 3 готелі під ваші побажання.",
    cs: "Zájezdy českých CK pojištěných proti úpadku: Turecko, Egypt, Řecko a dalších 9 zemí. Aljona vám na Telegramu vybere 3 hotely podle vašich přání.",
  },
  // Share preview (Telegram groups are where recommendations travel): position + big idea.
  ogTitle: {
    uk: "Ваше море з Чехії — Ananas Tour",
    cs: "Vaše moře z Česka – Ananas Tour",
  },
  ogDescription: {
    uk: "Вам — море, а на нас — решта: порівняти пропозиції чеських туроператорів, перевірити готель і документи. Пишіть Альоні в Telegram.",
    cs: "Vám moře – a na nás zbytek: porovnat nabídky českých CK, prověřit hotel i doklady. Napište Aljoně na Telegram.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: t(meta.title, locale), template: `%s | ${site.name}` },
    description: t(meta.description, locale),
    // Serves the home page; every other page overrides `alternates` with its own path.
    alternates: { canonical: routes.home(locale), languages: languageAlternates(routes.home) },
    // Social defaults — pages with their own photo (destinations, blog, hotels) override.
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: locale === "uk" ? "uk_UA" : "cs_CZ",
      title: t(meta.ogTitle, locale),
      description: t(meta.ogDescription, locale),
      images: [{ url: "/img/ananas/hero-tropical-beach.jpg", width: 1920, height: 1283, alt: site.name }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html lang={locale}>
      <body className={`${body.variable} ${display.variable} ${slab.variable} antialiased`}>
        <ContactStrip locale={locale} />
        {/* Teal frame (Reference 1): the site sits on a rounded paper panel. */}
        <div className="mx-auto max-w-[1680px] px-1.5 pb-[4.75rem] sm:px-3 md:pb-4 lg:px-4">
          <div className="rounded-[1.5rem] bg-paper [overflow:clip] sm:rounded-[2.5rem]">
            <Header locale={locale} />
            <main>{children}</main>
            <Footer locale={locale} />
          </div>
        </div>
        <FloatingContact locale={locale} />
        <TravelAgencyJsonLd locale={locale} />
        {gtmId && (
          /* Google Tag Manager — only when a container is configured (NEXT_PUBLIC_GTM_ID).
             src/lib/analytics.ts pushes events into the dataLayer initialised here. */
          <Script id="gtm" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
var s=document.createElement('script');s.async=true;s.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(${JSON.stringify(gtmId)});
document.head.appendChild(s);`}
          </Script>
        )}
      </body>
    </html>
  );
}
