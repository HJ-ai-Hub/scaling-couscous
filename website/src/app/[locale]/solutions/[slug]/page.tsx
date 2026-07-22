import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { Button } from "@/components/ui/button";
import { FinalCta } from "@/components/sections/final-cta";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getSolutionBySlug, getSolutions } from "@/content/solutions";

interface SolutionPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getSolutions("en").map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: SolutionPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const solution = getSolutionBySlug(locale as Locale, slug);
  if (!solution) return {};
  return {
    title: solution.name,
    description: solution.description,
  };
}

export default async function SolutionPage({ params }: SolutionPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const solution = getSolutionBySlug(locale as Locale, slug);
  if (!solution) notFound();

  const t = await getTranslations("solutionDetail");

  return (
    <>
      <PageHero
        align="left"
        eyebrow={`${t("eyebrowPrefix")} / ${solution.name}`}
        title={solution.tagline}
        description={solution.description}
        className="pb-10"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/book-demo">{t("bookDemo")}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">{t("getStarted")}</Link>
          </Button>
        </div>
      </PageHero>

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionReveal className="rounded-card border border-border bg-white p-8 shadow-soft">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-rose-50 text-rose-500">
              <AlertTriangle className="size-5" />
            </span>
            <h2 className="mt-5 font-brand text-xl font-semibold text-ink">{t("painPointsTitle")}</h2>
            <ul className="mt-5 space-y-4">
              {solution.painPoints.map((point) => (
                <li key={point} className="text-[0.95rem] leading-relaxed text-ink-soft">
                  {point}
                </li>
              ))}
            </ul>
          </SectionReveal>

          <SectionReveal delay={0.08} className="rounded-card border border-border bg-white p-8 shadow-soft">
            <span className="flex size-11 items-center justify-center rounded-2xl bg-mint/25 text-[#0f5c50]">
              <CheckCircle2 className="size-5" />
            </span>
            <h2 className="mt-5 font-brand text-xl font-semibold text-ink">{t("outcomesTitle")}</h2>
            <ul className="mt-5 space-y-4">
              {solution.outcomes.map((outcome) => (
                <li key={outcome} className="text-[0.95rem] leading-relaxed text-ink-soft">
                  {outcome}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
