"use client";

import { useParams } from "next/navigation";
import { PineappleSpinner } from "@/components/brand/pineapple";
import { Container } from "@/components/ui";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionary";

/** Route-level loading state (loading.tsx gets no params, so read the locale here). */
export function ToursLoading() {
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : defaultLocale;
  return (
    <Container className="grid min-h-[50vh] place-items-center py-24">
      <PineappleSpinner size={72} label={getDictionary(locale).common.loading} />
    </Container>
  );
}
