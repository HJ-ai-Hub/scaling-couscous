import type { Metadata } from "next";
import { Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getPricingFaq, getPricingTiers } from "@/content/pricing";
import { cn } from "@/lib/utils";

interface PricingPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PricingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pricingPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function PricingPage({ params }: PricingPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("pricingPage");
  const pricingTiers = getPricingTiers(locale as Locale);
  const pricingFaq = getPricingFaq(locale as Locale);

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

      <section className="pb-20">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier, index) => (
            <SectionReveal
              key={tier.name}
              delay={index * 0.08}
              className={cn(
                "flex flex-col rounded-card border p-8 shadow-soft",
                tier.highlighted ? "border-ink bg-ink text-white shadow-lift lg:-translate-y-3" : "border-border bg-white",
              )}
            >
              {tier.highlighted ? (
                <span className="w-fit rounded-pill bg-mint/90 px-3 py-1 text-xs font-semibold text-[#0f5c50]">
                  {t("mostPopular")}
                </span>
              ) : null}
              <h2 className={cn("mt-4 font-brand text-2xl font-semibold", tier.highlighted ? "text-white" : "text-ink")}>
                {tier.name}
              </h2>
              <p className={cn("mt-2 text-sm", tier.highlighted ? "text-white/70" : "text-ink-soft")}>{tier.description}</p>
              <p className={cn("mt-4 text-xs font-semibold uppercase tracking-wide", tier.highlighted ? "text-mint" : "text-blue-deep")}>
                {tier.bestFor}
              </p>

              <ul className="mt-6 flex-1 space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-2.5 text-sm">
                    <Check className={cn("mt-0.5 size-4 shrink-0", tier.highlighted ? "text-mint" : "text-mint-deep")} />
                    <span className={tier.highlighted ? "text-white/85" : "text-ink-soft"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                asChild
                className="mt-8"
                variant={tier.highlighted ? "accent" : "secondary"}
              >
                <Link href="/contact">{t("getAQuote")}</Link>
              </Button>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2} className="container-page mt-6">
          <p className="text-center text-sm text-ink-faint">{t("disclaimer")}</p>
        </SectionReveal>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionReveal className="rounded-card border border-border bg-white p-8 shadow-soft">
            <h3 className="font-brand text-lg font-semibold text-ink">{t("advancePayTitle")}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{t("advancePayDescription")}</p>
          </SectionReveal>
          <SectionReveal delay={0.08} className="rounded-card border border-border bg-white p-8 shadow-soft">
            <h3 className="font-brand text-lg font-semibold text-ink">{t("csTitle")}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{t("csDescription")}</p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("faqEyebrow")}</p>
            <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink">
              {t("faqTitle")}
            </h2>
          </SectionReveal>
          <SectionReveal delay={0.1} className="rounded-card border border-border bg-white px-6 shadow-soft sm:px-8">
            <Accordion type="single" collapsible>
              {pricingFaq.map((item, index) => (
                <AccordionItem key={item.question} value={`pricing-faq-${index}`}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </SectionReveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
