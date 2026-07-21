import { SectionReveal } from "@/components/layout/section-reveal";
import { perspectives } from "@/content/perspectives";

export function Perspectives() {
  return (
    <section className="bg-surface-alt py-24 lg:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">Built around real workflows</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Designed for everyone touching payroll
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-soft">
            GajiPay is in early access with our first pilot partners across Malaysia. Here&apos;s
            who we&apos;re building it for.
          </p>
        </SectionReveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perspectives.map((perspective, index) => (
            <SectionReveal
              key={perspective.role}
              delay={index * 0.06}
              className="flex h-full flex-col rounded-card border border-border bg-white p-6 shadow-soft"
            >
              <p className="text-xs font-semibold uppercase tracking-wide text-blue-deep">{perspective.role}</p>
              <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink">&ldquo;{perspective.quote}&rdquo;</p>
            </SectionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
