"use client";

import Image from "next/image";
import { useRef } from "react";
import { ArrowIcon } from "@/components/ui";

/**
 * Full-width photo slider (Reference 1): scroll-snap strip of big rounded
 * photos with round white arrow buttons on the sides. Works without JS
 * (swipe / scroll); the buttons just scroll by one slide.
 */
export function PhotoSlider({
  images,
  alt,
  prevLabel,
  nextLabel,
  priority = false,
}: {
  images: string[];
  alt: string;
  prevLabel: string;
  nextLabel: string;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const go = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    el.scrollBy({ left: dir * ((slide?.offsetWidth ?? el.clientWidth) + 12), behavior: "smooth" });
  };
  const btn =
    "absolute top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white text-ink shadow-xl transition hover:scale-105 sm:h-14 sm:w-14";
  return (
    <div className="relative">
      <div
        ref={ref}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        tabIndex={0}
        role="region"
        aria-label={alt}
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative aspect-[4/3] w-[88%] shrink-0 snap-center overflow-hidden rounded-[2rem] bg-grey sm:aspect-[16/8] sm:w-[78%] sm:rounded-[2.5rem]"
          >
            <Image src={src} alt={`${alt} — ${i + 1}`} fill priority={priority && i === 0} sizes="(min-width: 640px) 78vw, 88vw" className="object-cover" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label={prevLabel} className={`${btn} left-3 sm:left-5`}>
            <ArrowIcon size={22} rotate={180} />
          </button>
          {/* On the first photo's right edge (slides are 88% / 78% wide), not the strip's: the strip bleeds to the
              panel edge, where the fixed Telegram button sits and would cover the arrow (1280×800). */}
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={nextLabel}
            className={`${btn} right-[calc(12%+0.75rem)] sm:right-[calc(22%+1.25rem)]`}
          >
            <ArrowIcon size={22} />
          </button>
        </>
      )}
    </div>
  );
}
