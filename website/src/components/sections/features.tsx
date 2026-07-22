import { getTranslations, getLocale } from "next-intl/server";

import { SectionReveal } from "@/components/layout/section-reveal";
import type { Locale } from "@/i18n/routing";
import { getPlatformFeatures } from "@/content/features";

export async function Features() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("home.features");
  const platformFeatures = getPlatformFeatures(locale);

  return (
    <section className="bg-surface-alt py-24 lg:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("eyebrow")}</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-soft">{t("description")}</p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {platformFeatures.map((feature, index) => (
            <SectionReveal
              key={feature.title}
              delay={(index % 3) * 0.07}
              className="rounded-card border border-border bg-white p-7 shadow-soft transition-transform duration-250 ease-out hover:-translate-y-1"
            >
              <span className="flex size-11 items-center justify-center rounded-2xl bg-surface-alt text-blue-deep">
                <feature.icon className="size-5" />
              </span>
              <h3 className="mt-5 font-brand text-lg font-semibold text-ink">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
