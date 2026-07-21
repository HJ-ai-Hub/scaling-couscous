import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { DemoForm } from "@/components/forms/demo-form";

export const metadata: Metadata = {
  title: "Book a Demo",
  description: "See GajiPay's HR Portal, Payroll and Advance Pay in action — book a walkthrough with our team.",
};

const expectations = [
  "A 30-minute walkthrough of Payroll, HR Portal, Advance Pay and Company Secretary, tailored to your industry",
  "A straight answer on how Advance Pay is structured legally — no lending licence, no interest",
  "A rough pricing indication before you leave the call",
  "No pressure to sign anything on the spot",
];

export default function BookDemoPage() {
  return (
    <>
      <PageHero
        align="left"
        eyebrow="Book Demo"
        title="See GajiPay running with your kind of team"
        description="Tell us a bit about your company and we'll set up a walkthrough focused on what actually matters to you — payroll, HR, Advance Pay, or all three."
        className="pb-10"
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionReveal>
            <div className="rounded-card border border-border bg-surface-alt p-8">
              <h2 className="font-brand text-lg font-semibold text-ink">What to expect</h2>
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
