import type { Metadata } from "next";
import { Target, Compass, Handshake } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { FinalCta } from "@/components/sections/final-cta";

export const metadata: Metadata = {
  title: "About",
  description:
    "GajiPay is building the compliance and financial wellness platform Malaysian SMEs have had to stitch together themselves — company secretary, payroll, HR and Earned Wage Access, in one place.",
};

const values = [
  {
    icon: Target,
    title: "Compliance first, always",
    description:
      "We start with what Malaysian law actually requires — a company secretary, correct statutory payroll — before we build anything that touches money.",
  },
  {
    icon: Compass,
    title: "Built for Malaysia specifically",
    description:
      "Not a regional template with local logos swapped in. EPF, SOCSO, EIS, PCB and the Employment Act are the foundation, not an add-on.",
  },
  {
    icon: Handshake,
    title: "No debt, ever",
    description:
      "Advance Pay only ever releases wages already earned. We are not a lender, we don't hold a moneylending licence, and we never will pretend otherwise.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About GajiPay"
        title="The back office Malaysian SMEs have had to stitch together themselves"
        description="GajiPay Sdn Bhd exists because 97% of Malaysian businesses are MSMEs, and almost none of them can afford — or want — five separate vendors for payroll, HR, compliance and financial wellness."
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <SectionReveal className="mx-auto max-w-3xl text-lg leading-relaxed text-ink-soft">
            <p>
              Most SMEs run payroll through one tool, HR through a spreadsheet, a company secretary
              through a retainer they barely think about, and — if their employees are lucky — a
              bolted-on salary-advance app from a fourth provider entirely. None of these systems
              talk to each other, and none of them were built around the reality of Malaysian
              statutory compliance.
            </p>
            <p className="mt-6">
              GajiPay starts from the compliance every Sdn Bhd already needs — a company secretary,
              correct EPF/SOCSO/EIS/PCB payroll — and builds outward from there. Once payroll and
              attendance data lives in one place, we can do something no bolted-on app can: calculate
              exactly how much of an employee&apos;s wage has actually been earned, in real time, and let
              them access it early, fairly, and without debt.
            </p>
          </SectionReveal>
        </div>
      </section>

      <section className="bg-surface-alt py-24 lg:py-32">
        <div className="container-page">
          <SectionReveal className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">What we believe</p>
            <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Three things we won&apos;t compromise on
            </h2>
          </SectionReveal>

          <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value, index) => (
              <SectionReveal
                key={value.title}
                delay={index * 0.08}
                className="rounded-card border border-border bg-white p-8 shadow-soft"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/50 to-blue/20 text-ink">
                  <value.icon className="size-6" />
                </span>
                <h3 className="mt-6 font-brand text-xl font-semibold text-ink">{value.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{value.description}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32">
        <div className="container-page">
          <SectionReveal className="mx-auto max-w-2xl rounded-card border border-border bg-white p-10 text-center shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">Where we are today</p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              GajiPay is in early access, onboarding our first pilot partners across retail, F&amp;B,
              manufacturing, logistics and security services in Malaysia. If that sounds like your
              business, we&apos;d like to hear from you.
            </p>
          </SectionReveal>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
