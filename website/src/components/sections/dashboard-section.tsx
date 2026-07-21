import { SectionReveal } from "@/components/layout/section-reveal";
import { PlatformDashboard } from "@/components/marketing/platform-dashboard";

export function DashboardSection() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">HR &amp; Payroll, in one view</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Everything HR and finance need to see, in one dashboard
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-soft">
            Payroll, employees, leave, attendance, Advance Pay and analytics — switch between them
            without switching tools.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="mt-14">
          <PlatformDashboard />
        </SectionReveal>
      </div>
    </section>
  );
}
