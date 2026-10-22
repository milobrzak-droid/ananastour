import type { Metadata } from "next";
import { Montserrat, Roboto_Slab } from "next/font/google";
import { notFound } from "next/navigation";
import { ContactStrip, FloatingContact } from "@/components/contact/telegram";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { site } from "@/config/site";
import { isLocale, locales, t } from "@/i18n/config";
import "../globals.css";

const body = Montserrat({ subsets: ["latin", "latin-ext", "cyrillic"], variable: "--font-body" });
const display = Roboto_Slab({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
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
      <body className={`${body.variable} ${display.variable} antialiased`}>
        <ContactStrip locale={locale} />
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
        <FloatingContact locale={locale} />
      </body>
    </html>
  );
}
