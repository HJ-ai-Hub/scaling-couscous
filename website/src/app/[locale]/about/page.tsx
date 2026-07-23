import type { Metadata } from "next";
import { Target, Compass, Handshake } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { FinalCta } from "@/components/sections/final-cta";
import type { Locale } from "@/i18n/routing";

const valueIcons = [Target, Compass, Handshake];

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const intro = t.raw("intro") as string[];
  const values = t.raw("values") as { title: string; description: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <SectionReveal className="mx-auto max-w-3xl text-lg leading-relaxed text-ink-soft">
            {intro.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-6" : undefined}>
                {paragraph}
              </p>
            ))}
          </SectionReveal>
        </div>
      </section>

      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-page">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("valuesEyebrow")}</p>
            <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {t("valuesTitle")}
            </h2>
          </SectionReveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value, index) => {
              const Icon = valueIcons[index];
              return (
                <SectionReveal
                  key={value.title}
                  delay={index * 0.08}
                  className="rounded-card border border-border bg-white p-8 shadow-soft"
                >
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/50 to-blue/20 text-ink">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="mt-6 font-brand text-xl font-semibold text-ink">{value.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{value.description}</p>
                </SectionReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-page">
          <SectionReveal className="mx-auto max-w-2xl rounded-card border border-border bg-white p-10 text-center shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("statusEyebrow")}</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("statusText")}</p>
          </SectionReveal>
        </div>
      </section>

      <FinalCta locale={locale as Locale} />
    </>
  );
}
