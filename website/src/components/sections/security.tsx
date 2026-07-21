import { SectionReveal } from "@/components/layout/section-reveal";
import { securityPillars } from "@/content/features";

export function Security() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page grid grid-cols-1 gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">Security &amp; trust</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Handled the way sensitive payroll data deserves
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Salary, attendance and banking data are some of the most sensitive information your
            company holds. GajiPay treats it that way from the first line of code.
          </p>
        </SectionReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {securityPillars.map((pillar, index) => (
            <SectionReveal
              key={pillar.title}
              delay={(index % 2) * 0.08}
              className="rounded-card border border-border bg-white p-6 shadow-soft"
            >
              <span className="flex size-10 items-center justify-center rounded-2xl bg-mint/25 text-[#0f5c50]">
                <pillar.icon className="size-5" />
              </span>
              <h3 className="mt-4 font-brand text-base font-semibold text-ink">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{pillar.description}</p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
