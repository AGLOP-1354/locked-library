import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getPublishedBooks } from "@/content/books";
import { bookHref } from "@/lib/books";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    ...getPublishedBooks().map((b) => ({
      url: `${site.url}${bookHref(b)}`,
      lastModified: b.publishedAt,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
