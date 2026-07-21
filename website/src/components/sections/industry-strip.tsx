import { SectionReveal } from "@/components/layout/section-reveal";
import { industryStrip, marketStats } from "@/content/perspectives";

export function IndustryStrip() {
  const loopedIndustries = [...industryStrip, ...industryStrip];

  return (
    <section className="border-y border-border bg-surface-alt py-12">
      <SectionReveal className="container-page">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint lg:text-left">
              Built for the sectors that carry Malaysia&apos;s SME economy
            </p>
            <div className="group relative mt-5 overflow-hidden">
              <div className="flex w-max animate-marquee gap-10 group-hover:[animation-play-state:paused]">
                {loopedIndustries.map((industry, index) => (
                  <span
                    key={`${industry}-${index}`}
                    className="whitespace-nowrap font-brand text-xl font-semibold text-ink-faint/70"
                  >
                    {industry}
                  </span>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-surface-alt to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-surface-alt to-transparent" />
            </div>
          </div>

          <dl className="grid grid-cols-3 gap-8 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {marketStats.map((stat) => (
              <div key={stat.label} className="min-w-[7rem]">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-brand text-2xl font-bold text-ink sm:text-3xl">{stat.value}</dd>
                <p className="mt-1 max-w-[9rem] text-xs leading-snug text-ink-faint">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </SectionReveal>
    </section>
  );
}
