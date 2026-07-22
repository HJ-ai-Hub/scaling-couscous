import { defineRouting } from "next-intl/routing";

export const locales = ["en", "zh", "ms"] as const;
export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, string> = {
  en: "English",
  zh: "中文",
  ms: "Bahasa Malaysia",
};

export const routing = defineRouting({
  locales,
  defaultLocale: "en",
  localePrefix: "as-needed",
});
