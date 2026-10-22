"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { PineapplePattern } from "@/components/brand/pineapple";
import { InquiryForm } from "@/components/contact/inquiry-form";
import { TelegramButton } from "@/components/contact/telegram";
import { Button } from "@/components/ui";
import type { Locale } from "@/i18n/config";
import { track } from "@/lib/analytics";

export type ServiceIcon = "insurance" | "flight" | "hotel" | "transfer" | "visa" | "excursion";

export type ServiceItem = {
  id: ServiceIcon;
  title: string;
  text: string;
  points: string[];
  orderLabel: string;
  telegramMessage: string;
  photo: string;
};

const ICONS: Record<ServiceIcon, string> = {
  insurance: "M12 3 4 6v6c0 4.4 3.4 8.3 8 9 4.6-.7 8-4.6 8-9V6l-8-3Zm-3 9 2 2 4-4",
  flight: "M2 16l20-6-2-2-7 2-5-5-2 1 3 5-4 1-2-2-1 1 2 4ZM3 21h18",
  hotel: "M3 21V7l9-4 9 4v14M9 21v-5h6v5M8 10h.01M12 10h.01M16 10h.01M8 13h.01M16 13h.01",
  transfer: "M5 17h14M5 17a2 2 0 1 0 4 0m6 0a2 2 0 1 0 4 0M3 17v-5l2-5h14l2 5v5M3 12h18",
  visa: "M6 3h9l4 4v14H6V3Zm9 0v4h4M9 12h6M9 16h6M9 8h3",
  excursion: "M3 20l6-12 4 7 3-4 5 9H3Zm13-13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
};

const TONES = ["bg-white", "bg-ice", "bg-grey"];

function Icon({ name }: { name: ServiceIcon }) {
  return (
    <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-yellow text-ink">
      <svg viewBox="0 0 24 24" width={26} height={26} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path d={ICONS[name]} />
      </svg>
    </span>
  );
}

/**
 * Services grid + one shared order form. "Order" selects the service, scrolls
 * to the form and passes the service name as inquiry context.
 */
export function ServiceOrder({
  locale,
  services,
  formTitle,
  formLead,
  chooseLabel,
  telegramLabel,
}: {
  locale: Locale;
  services: ServiceItem[];
  formTitle: string;
  formLead: string;
  chooseLabel: string;
  telegramLabel: string;
}) {
  const [selected, setSelected] = useState<ServiceIcon>(services[0].id);
  const formRef = useRef<HTMLDivElement>(null);
  const current = services.find((s) => s.id === selected) ?? services[0];

  function order(id: ServiceIcon) {
    setSelected(id);
    track("service_order_click", { service: id });
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => (
          <article key={s.id} className={`flex flex-col rounded-[2rem] p-2 sm:rounded-[2.5rem] ${TONES[i % 3]}`}>
            <div className="relative h-48 overflow-hidden rounded-[1.6rem] sm:rounded-[2rem]">
              <Image src={s.photo} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" />
              <div className="absolute bottom-3 left-3">
                <Icon name={s.id} />
              </div>
            </div>
            <div className="flex flex-1 flex-col p-4 pt-5 sm:p-6 sm:pt-6">
              <h2 className="font-display text-xl font-black uppercase leading-tight sm:text-2xl">{s.title}</h2>
              <p className="mt-2 text-ink/80">{s.text}</p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-red" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap gap-2 pt-6">
                <Button type="button" onClick={() => order(s.id)} aria-controls="service-order">
                  {s.orderLabel}
                </Button>
                <TelegramButton locale={locale} source={`services-${s.id}`} message={s.telegramMessage} label={telegramLabel} size="md" />
              </div>
            </div>
          </article>
        ))}
      </div>

      <div ref={formRef} id="service-order" className="relative mt-12 scroll-mt-28 overflow-hidden rounded-[2rem] bg-ink p-5 text-paper sm:rounded-[2.75rem] sm:p-12">
        <PineapplePattern preset="section" opacity={0.35} />
        <div className="relative grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="font-display text-3xl font-black uppercase sm:text-5xl">{formTitle}</h2>
            <p className="mt-3 text-paper/75">{formLead}</p>
            <p className="mt-8 text-sm font-semibold uppercase tracking-widest text-paper/75">{chooseLabel}</p>
            <div className="mt-3 flex flex-wrap gap-2" role="radiogroup" aria-label={chooseLabel}>
              {services.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  role="radio"
                  aria-checked={s.id === selected}
                  onClick={() => setSelected(s.id)}
                  className={`min-h-11 shape-pill px-4 py-2 text-sm font-semibold transition ${
                    s.id === selected ? "bg-yellow text-ink" : "bg-paper/10 text-paper hover:bg-paper/20"
                  }`}
                >
                  {s.title}
                </button>
              ))}
            </div>
            <TelegramButton
              locale={locale}
              source="services-form"
              message={current.telegramMessage}
              className="mt-8"
              size="lg"
            />
          </div>
          <InquiryForm
            key={current.id}
            locale={locale}
            kind="service"
            context={current.title}
            fields={["email", "message"]}
            source={`services-form-${current.id}`}
            variant="dark"
            title={current.title}
          />
        </div>
      </div>
    </>
  );
}
