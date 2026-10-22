import type { Metadata } from "next";
import { Montserrat, Roboto_Slab, Unbounded } from "next/font/google";
import { notFound } from "next/navigation";
import { ContactStrip, FloatingContact } from "@/components/contact/telegram";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { TravelAgencyJsonLd } from "@/components/seo/json-ld";
import { site } from "@/config/site";
import { isLocale, locales, t } from "@/i18n/config";
import "../globals.css";

const body = Montserrat({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-body" });
// Heavy geometric sans for headlines (Reference 1), slab for stamps (Reference 2).
const display = Unbounded({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
});
const slab = Roboto_Slab({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["700", "800", "900"],
  variable: "--font-slab",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const meta = {
  title: {
    uk: "Ananas Tour — турагенція в Чехії | Тури з Праги",
    cs: "Ananas Tour — cestovní agentura | Zájezdy z Prahy",
  },
  description: {
    uk: "Підбір турів від перевірених чеських туроператорів. Пишіть Альоні в Telegram — 3 найкращі варіанти за 15 хвилин.",
    cs: "Zájezdy od ověřených cestovních kanceláří. Napište Aljoně na Telegram — 3 nejlepší varianty do 15 minut.",
  },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(site.url),
    title: { default: t(meta.title, locale), template: `%s | ${site.name}` },
    description: t(meta.description, locale),
    alternates: { languages: { uk: "/uk", cs: "/cs" } },
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
      </body>
    </html>
  );
}
