import { Layers, ShieldCheck, MapPinned } from "lucide-react";

import { SectionReveal } from "@/components/layout/section-reveal";

const pillars = [
  {
    icon: Layers,
    title: "One platform, not five vendors",
    description:
      "HR, payroll, statutory compliance and financial wellness usually mean five logins and five invoices. GajiPay runs them on one employee record, so nothing gets re-entered twice.",
  },
  {
    icon: ShieldCheck,
    title: "Compliance-first, so fintech follows",
    description:
      "We start with what every company must have — a company secretary, correct statutory payroll — then use that same data to power Advance Pay accurately. Trust before transactions.",
  },
  {
    icon: MapPinned,
    title: "Built for Malaysia, not adapted to it",
    description:
      "EPF, SOCSO, EIS, PCB and the Employment Act aren't an afterthought bolted onto a regional template — they're the foundation the whole platform is built on.",
  },
];

export function WhyGajiPay() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">Why GajiPay</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Your back office, finally working as one system
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-soft">
            Most Malaysian SMEs stitch together a payroll tool, an HR spreadsheet, a company
            secretary retainer and a salary-advance app. GajiPay replaces the stitching.
          </p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => (
            <SectionReveal
              key={pillar.title}
              delay={index * 0.08}
              className="rounded-card border border-border bg-white p-8 shadow-soft transition-transform duration-250 ease-out hover:-translate-y-1"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/50 to-blue/20 text-ink">
                <pillar.icon className="size-6" />
              </span>
              <h3 className="mt-6 font-brand text-xl font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{pillar.description}</p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
