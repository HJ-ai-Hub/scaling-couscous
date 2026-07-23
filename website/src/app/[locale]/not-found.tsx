import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/brand/logo-mark";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

interface NotFoundProps {
  params?: Promise<{ locale: string }>;
}

export default async function NotFound({ params }: NotFoundProps) {
  const resolved = params ? await params.catch(() => null) : null;
  const locale = (resolved?.locale as Locale) ?? routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "notFound" });

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-32">
      <div className="text-center">
        <LogoMark className="mx-auto h-20 w-auto" />
        <p className="mt-8 font-brand text-6xl font-bold text-ink">{t("code")}</p>
        <h1 className="mt-3 text-balance font-brand text-2xl font-semibold text-ink">{t("title")}</h1>
        <p className="mx-auto mt-3 max-w-sm text-[0.95rem] leading-relaxed text-ink-soft">{t("description")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">
              {t("backHome")}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">{t("contactSupport")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
