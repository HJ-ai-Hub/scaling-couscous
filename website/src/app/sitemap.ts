import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { routing } from "@/i18n/routing";
import { getProducts } from "@/content/products";
import { getSolutions } from "@/content/solutions";
import { getResources } from "@/content/resources";

function localizedUrl(route: string, locale: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${route}`;
}

function alternates(route: string) {
  return Object.fromEntries(routing.locales.map((locale) => [locale, localizedUrl(route, locale)]));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/products", "/solutions", "/pricing", "/resources", "/about", "/contact", "/book-demo"];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of staticRoutes) {
      entries.push({
        url: localizedUrl(route, locale),
        lastModified: now,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : 0.7,
        alternates: { languages: alternates(route) },
      });
    }

    for (const product of getProducts(locale)) {
      const route = `/products/${product.slug}`;
      entries.push({
        url: localizedUrl(route, locale),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: { languages: alternates(route) },
      });
    }

    for (const solution of getSolutions(locale)) {
      const route = `/solutions/${solution.slug}`;
      entries.push({
        url: localizedUrl(route, locale),
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
        alternates: { languages: alternates(route) },
      });
    }

    for (const resource of getResources(locale)) {
      const route = `/resources/${resource.slug}`;
      entries.push({
        url: localizedUrl(route, locale),
        lastModified: now,
        changeFrequency: "yearly",
        priority: 0.5,
        alternates: { languages: alternates(route) },
      });
    }
  }

  return entries;
}
