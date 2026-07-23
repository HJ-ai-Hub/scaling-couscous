import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/section-reveal";
import { PlatformDashboard } from "@/components/marketing/platform-dashboard";
import type { Locale } from "@/i18n/routing";

export async function DashboardSection({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "home.dashboard" });

  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("eyebrow")}</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-soft">{t("description")}</p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-14">
          <PlatformDashboard />
        </SectionReveal>
      </div>
    </section>
  );
}
