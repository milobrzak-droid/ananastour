import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { PineappleSlice, Stamp } from "@/components/brand/pineapple";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { AljonaAvatar, TelegramButton, TelegramIcon } from "@/components/contact/telegram";
import { PageHero } from "@/components/pages/page-hero";
import { QrCode } from "@/components/pages/qr-code";
import { Container } from "@/components/ui";
import { site } from "@/config/site";
import { isLocale, t, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";
import { languageAlternates, routes } from "@/i18n/routes";
import { phoneLink, telegramLink } from "@/lib/contact/telegram";

type L = Record<Locale, string>;

const copy = {
  metaTitle: { uk: "Контакти — напишіть Альоні в Telegram", cs: "Kontakt — napište Aljoně na Telegram" },
  metaDescription: {
    uk: "Найшвидший зв’язок — Telegram: відповідь протягом 15 хвилин. Також телефон, e-mail та Instagram турагенції Ananas Tour у Чехії.",
    cs: "Nejrychlejší kontakt je Telegram: odpověď do 15 minut. Dále telefon, e-mail a Instagram cestovní agentury Ananas Tour.",
  },
  eyebrow: { uk: "Контакти", cs: "Kontakt" },
  title: { uk: "Давайте сплануємо вашу відпустку", cs: "Pojďme naplánovat vaši dovolenou" },
  lead: {
    uk: "Найшвидше — написати в Telegram. Альона особисто відповідає на кожне повідомлення.",
    cs: "Nejrychleji to půjde přes Telegram. Aljona osobně odpovídá na každou zprávu.",
  },
  tgTitle: { uk: "Напишіть Альоні в Telegram", cs: "Napište Aljoně na Telegram" },
  tgReply: { uk: "Відповідь протягом 15 хвилин", cs: "Odpověď do 15 minut" },
  tgText: {
    uk: "Напишіть, куди, коли й скільки вас — і отримаєте 3 найкращі варіанти від перевірених чеських туроператорів.",
    cs: "Napište, kam, kdy a kolik vás pojede — a dostanete 3 nejlepší varianty od prověřených českých cestovních kanceláří.",
  },
  tgOpen: { uk: "Відкрити чат", cs: "Otevřít chat" },
  qrCaption: { uk: "Наведіть камеру телефону", cs: "Namiřte fotoaparát telefonu" },
  qrLabel: { uk: "QR-код: чат з Альоною в Telegram", cs: "QR kód: chat s Aljonou na Telegramu" },
  contactsTitle: { uk: "Наші контакти", cs: "Naše kontakty" },
  phone: { uk: "Телефон", cs: "Telefon" },
  email: { uk: "E-mail", cs: "E-mail" },
  hours: { uk: "Години роботи", cs: "Otevírací doba" },
  address: { uk: "Адреса", cs: "Adresa" },
  addressNote: {
    uk: "Зустрічі — за попередньою домовленістю",
    cs: "Schůzky po předchozí domluvě",
  },
  formTitle: { uk: "Або залиште повідомлення", cs: "Nebo nám nechte zprávu" },
  formLead: {
    uk: "Заявка миттєво надійде Альоні, і вона зв’яжеться з вами.",
    cs: "Zpráva okamžitě dorazí Aljoně a ona se vám ozve.",
  },
  social: { uk: "Ми в соцмережах", cs: "Najdete nás" },
} satisfies Record<string, L>;

function InstagramIcon({ size = 20 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function RoundIcon({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener" : undefined}
      className="grid h-12 w-12 place-items-center rounded-full bg-ink text-white transition hover:scale-105 hover:bg-charcoal"
    >
      {children}
    </a>
  );
}

function ContactRow({ label, icon, children }: { label: string; icon: ReactNode; children: ReactNode }) {
  return (
    <div className="relative min-h-[4.25rem] py-3 pl-[3.75rem]">
      <dt className="text-xs font-bold uppercase tracking-widest text-white">
        <span className="absolute left-0 top-3 grid h-11 w-11 place-items-center rounded-full bg-white text-red" aria-hidden>
          {icon}
        </span>
        {label}
      </dt>
      <dd className="mt-0.5 min-w-0 text-lg font-semibold">{children}</dd>
    </div>
  );
}

const ico = {
  phone: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
    </svg>
  ),
  mail: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth={2.2}>
      <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    title: t(copy.metaTitle, locale),
    description: t(copy.metaDescription, locale),
    alternates: { canonical: routes.contact(locale), languages: languageAlternates(routes.contact) },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = getDictionary(locale);
  const username = site.contact.telegramUsername;
  const instagramHandle = site.contact.instagram.replace(/^https?:\/\/(www\.)?instagram\.com\//, "").replace(/\/$/, "");

  return (
    <>
      <PageHero eyebrow={t(copy.eyebrow, locale)} title={t(copy.title, locale)} lead={t(copy.lead, locale)} />

      {/* Telegram — the primary option */}
      <Container className="pt-3">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-telegram p-6 text-white sm:rounded-[2.5rem] sm:p-12">
          <PineappleSlice kind="ring" size={340} color="rgba(255,255,255,0.10)" texture={false} className="absolute -bottom-32 -left-24 -z-10" />
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="inline-flex items-center gap-2 shape-pill bg-ink/30 px-4 py-1.5 text-sm font-bold text-white">
                <span className="relative flex h-2.5 w-2.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-300 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-300" />
                </span>
                {t(copy.tgReply, locale)}
              </span>
              <h2 className="mt-5 font-display text-[clamp(2rem,5vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.03em]">{t(copy.tgTitle, locale)}</h2>
              <div className="mt-5 flex items-center gap-4">
                <AljonaAvatar size={60} ring="white" />
                <a
                  href={telegramLink(dict.contact.prefillGeneral)}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-11 min-w-0 items-center gap-2 break-all font-display text-lg font-bold text-white hover:underline sm:gap-3 sm:text-3xl"
                >
                  <TelegramIcon size={30} />@{username}
                </a>
              </div>
              <p className="mt-4 max-w-xl text-white">{t(copy.tgText, locale)}</p>
              <TelegramButton locale={locale} source="contact-hero" size="lg" label={t(copy.tgOpen, locale)} tone="white" className="mt-8" />
            </div>
            <figure className="mx-auto rounded-[2rem] bg-white p-5 text-center text-ink shadow-xl">
              <QrCode value={telegramLink()} size={200} label={t(copy.qrLabel, locale)} />
              <figcaption className="mt-3 text-sm font-semibold text-ink/80">{t(copy.qrCaption, locale)}</figcaption>
            </figure>
          </div>
        </div>
      </Container>

      {/* Reference 1: red contacts card + social pill, grey form card */}
      <Container className="py-4 sm:py-6">
        <div className="grid gap-3 sm:gap-4 lg:grid-cols-[1fr_1.35fr]">
          <div className="flex flex-col gap-3 sm:gap-4">
            <div className="relative flex-1 overflow-hidden rounded-[2rem] bg-red p-7 text-white sm:rounded-[2.5rem] sm:p-10">
              <PineappleSlice kind="half" size={220} rotate={-120} color="rgba(255,255,255,0.12)" texture={false} className="absolute -right-16 -top-16" />
              <h2 className="relative font-display text-3xl font-black uppercase leading-tight sm:text-4xl">{t(copy.contactsTitle, locale)}</h2>
              <dl className="relative mt-6 divide-y divide-white/25">
                <ContactRow label="Telegram" icon={<TelegramIcon size={20} />}>
                  <a href={telegramLink()} target="_blank" rel="noopener" className="hover:underline">
                    @{username}
                  </a>
                </ContactRow>
                <ContactRow label={t(copy.phone, locale)} icon={ico.phone}>
                  <a href={phoneLink()} className="hover:underline">
                    {site.contact.phone}
                  </a>
                </ContactRow>
                <ContactRow label={t(copy.email, locale)} icon={ico.mail}>
                  <a href={`mailto:${site.contact.email}`} className="break-all hover:underline">
                    {site.contact.email}
                  </a>
                </ContactRow>
                <ContactRow label={t(copy.hours, locale)} icon={ico.clock}>
                  {t(site.contact.hours, locale)}
                </ContactRow>
                <ContactRow label={t(copy.address, locale)} icon={ico.pin}>
                  {t(site.contact.address, locale)}
                  <span className="mt-0.5 block text-sm font-normal text-white">{t(copy.addressNote, locale)}</span>
                </ContactRow>
              </dl>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-full bg-red py-3 pl-7 pr-3 text-white">
              <p className="text-xs font-bold uppercase tracking-widest">{t(copy.social, locale)}</p>
              <div className="flex gap-2">
                <RoundIcon href={telegramLink(dict.contact.prefillGeneral)} label="Telegram">
                  <TelegramIcon size={22} />
                </RoundIcon>
                <RoundIcon href={site.contact.instagram} label={`Instagram @${instagramHandle}`}>
                  <InstagramIcon size={22} />
                </RoundIcon>
                <RoundIcon href={phoneLink()} label={dict.contact.call}>
                  {ico.phone}
                </RoundIcon>
                <RoundIcon href={`mailto:${site.contact.email}`} label="E-mail">
                  {ico.mail}
                </RoundIcon>
              </div>
            </div>
          </div>

          <div className="relative [&>form]:h-full">
            <div className="pointer-events-none absolute -right-3 -top-3 z-10 hidden sm:block">
              <Stamp size={120} top="ANANAS TOUR • CONTACT" bottom="REPLY IN 15 MIN" above={["WRITE", "TO"]} word="ALJONA" below={["UA", "CZ"]} className="rotate-12 drop-shadow-lg" />
            </div>
            <InquiryForm
              locale={locale}
              kind="contact"
              fields={["email", "message"]}
              source="contact-page"
              variant="light"
              title={t(copy.formTitle, locale)}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
