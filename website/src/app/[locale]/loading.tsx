import { getTranslations } from "next-intl/server";

import { LogoMark } from "@/components/brand/logo-mark";

export default async function Loading() {
  const t = await getTranslations("loading");

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4" role="status" aria-live="polite">
      <LogoMark className="h-16 w-auto animate-pulse" />
      <p className="text-sm font-medium text-ink-faint">{t("text")}</p>
    </div>
  );
}
