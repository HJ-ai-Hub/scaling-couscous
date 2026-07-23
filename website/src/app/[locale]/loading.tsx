import { getTranslations } from "next-intl/server";

import { LogoMark } from "@/components/brand/logo-mark";
import { routing, type Locale } from "@/i18n/routing";

interface LoadingProps {
  params?: Promise<{ locale: string }>;
}

export default async function Loading({ params }: LoadingProps) {
  const resolved = params ? await params.catch(() => null) : null;
  const locale = (resolved?.locale as Locale) ?? routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "loading" });

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <LogoMark className="h-16 w-auto animate-pulse" />
      <p className="text-sm font-medium text-ink-faint">{t("text")}</p>
    </div>
  );
}
