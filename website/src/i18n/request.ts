import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";

import { routing, type Locale } from "./routing";

// Static imports (rather than a template-literal `import(...)`) so
// serverless bundlers can trace and include every locale's messages in the
// deployed function — a dynamic path here works with `next start` locally
// but can silently get pruned from a traced serverless bundle (e.g. Netlify).
const messagesByLocale: Record<Locale, () => Promise<{ default: Record<string, unknown> }>> = {
  en: () => import("../../messages/en.json"),
  zh: () => import("../../messages/zh.json"),
  ms: () => import("../../messages/ms.json"),
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await messagesByLocale[locale]()).default,
  };
});
