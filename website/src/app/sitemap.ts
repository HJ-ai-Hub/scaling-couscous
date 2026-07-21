import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/site";
import { products } from "@/content/products";
import { solutions } from "@/content/solutions";
import { resources } from "@/content/resources";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/products",
    "/solutions",
    "/pricing",
    "/resources",
    "/about",
    "/contact",
    "/book-demo",
  ];

  const now = new Date();

  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  for (const product of products) {
    entries.push({
      url: `${siteConfig.url}/products/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    });
  }

  for (const solution of solutions) {
    entries.push({
      url: `${siteConfig.url}/solutions/${solution.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
  }

  for (const resource of resources) {
    entries.push({
      url: `${siteConfig.url}/resources/${resource.slug}`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return entries;
}
