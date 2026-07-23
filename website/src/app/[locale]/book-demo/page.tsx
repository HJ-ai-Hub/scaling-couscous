import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { DemoForm } from "@/components/forms/demo-form";
import type { Locale } from "@/i18n/routing";

interface BookDemoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: BookDemoPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "bookDemoPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BookDemoPage({ params }: BookDemoPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations({ locale, namespace: "bookDemoPage" });
  const expectations = t.raw("expectations") as string[];

  return (
    <>
      <PageHero
        align="left"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        className="pb-10"
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionReveal>
            <div className="rounded-card border border-border bg-surface-alt p-8">
              <h2 className="font-brand text-lg font-semibold text-ink">{t("whatToExpect")}</h2>
              <ul className="mt-5 space-y-4">
                {expectations.map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-mint-deep" />
                    <span className="text-sm leading-relaxed text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <DemoForm />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
