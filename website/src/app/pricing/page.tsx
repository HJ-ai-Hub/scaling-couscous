import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { pricingFaq, pricingTiers } from "@/content/pricing";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Transparent, bundled pricing for Company Secretary, Payroll, HR Portal and Advance Pay — scaled to your headcount, quoted after a short discovery call.",
};

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Pricing that scales with what you actually use"
        description="Every plan bundles statutory compliance with the fintech layer on top — priced by headcount and services, never by surprise."
      />

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
                  Most popular
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
                <Link href="/contact">Get a quote</Link>
              </Button>
            </SectionReveal>
          ))}
        </div>

        <SectionReveal delay={0.2} className="container-page mt-6">
          <p className="text-center text-sm text-ink-faint">
            Exact pricing depends on headcount and which services you bundle — we&apos;ll quote you after a short
            discovery call, usually within one business day.
          </p>
        </SectionReveal>
      </section>

      <section className="bg-surface-alt py-20">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionReveal className="rounded-card border border-border bg-white p-8 shadow-soft">
            <h3 className="font-brand text-lg font-semibold text-ink">Advance Pay pricing</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              Never interest — a flat processing fee per withdrawal, typically RM2–5 depending on your plan.
              Employers can absorb it as a benefit, or let employees opt to pay it themselves.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.08} className="rounded-card border border-border bg-white p-8 shadow-soft">
            <h3 className="font-brand text-lg font-semibold text-ink">Company Secretary pricing</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
              A flat monthly retainer plus statutory filing fees, in line with typical Malaysian market rates —
              confirmed exactly for your entity before you sign anything.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">Pricing FAQ</p>
            <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink">
              Before you talk to us
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
