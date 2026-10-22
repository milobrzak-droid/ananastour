import "server-only";
import { AnchoiceTourProvider } from "./anchoice-provider";
import { MockTourProvider } from "./mock-provider";
import type { TourProvider } from "./provider";

export type { TourProvider } from "./provider";
export * from "./types";

let instance: TourProvider | undefined;

/** Single entry point for tour data. Select the source with TOUR_PROVIDER=mock|anchoice. */
export function tours(): TourProvider {
  if (!instance) {
    instance = process.env.TOUR_PROVIDER === "anchoice" ? new AnchoiceTourProvider() : new MockTourProvider();
  }
  return instance;
}
