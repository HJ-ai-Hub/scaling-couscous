"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errorPage");

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6 py-32">
      <div className="max-w-md text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <AlertTriangle className="size-7" />
        </span>
        <h1 className="mt-6 font-brand text-2xl font-semibold text-ink">{t("title")}</h1>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{t("description")}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>{t("tryAgain")}</Button>
          <Button asChild variant="secondary">
            <Link href="/">{t("backHome")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
