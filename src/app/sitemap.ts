import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { defaultLocale, locales, type Locale } from "@/i18n/config";
import { routes } from "@/i18n/routes";
import { posts } from "@/content/blog";
import { destinations } from "@/content/destinations";

const DESTINATION_SLUGS = destinations.map((d) => d.slug);

type Entry = { path: (l: Locale) => string; priority: number; changeFrequency: "daily" | "weekly" | "monthly" | "yearly" };

const pages: Entry[] = [
  { path: routes.home, priority: 1, changeFrequency: "daily" },
  { path: (l) => routes.tours(l), priority: 0.9, changeFrequency: "daily" },
  { path: routes.hot, priority: 0.9, changeFrequency: "daily" },
  { path: routes.destinations, priority: 0.8, changeFrequency: "weekly" },
  ...DESTINATION_SLUGS.map<Entry>((slug) => ({
    path: (l) => routes.destination(l, slug),
    priority: 0.8,
    changeFrequency: "weekly",
  })),
  { path: routes.services, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.blog, priority: 0.6, changeFrequency: "weekly" },
  ...posts.map<Entry>((post) => ({
    path: (l) => routes.post(l, post.slug),
    priority: 0.5,
    changeFrequency: "monthly",
  })),
  { path: routes.about, priority: 0.6, changeFrequency: "monthly" },
  { path: routes.contact, priority: 0.7, changeFrequency: "monthly" },
  { path: routes.privacy, priority: 0.2, changeFrequency: "yearly" },
  { path: routes.terms, priority: 0.2, changeFrequency: "yearly" },
];

const abs = (path: string) => new URL(path, site.url).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap((page) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, abs(page.path(l))])),
      "x-default": abs(page.path(defaultLocale)),
    };
    return locales.map((locale) => ({
      url: abs(page.path(locale)),
      lastModified,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages },
    }));
  });
}
