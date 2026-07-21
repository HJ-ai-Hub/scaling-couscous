import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { solutions } from "@/content/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "GajiPay built around how Malaysian SMEs actually staff up — retail & F&B, manufacturing, logistics, security services and construction.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="Built around how you actually staff up"
        description="Shift workers, factory floors, distributed riders, guards across many sites — GajiPay is shaped around the sectors that carry Malaysia's SME economy."
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-2">
          {solutions.map((solution, index) => (
            <SectionReveal
              key={solution.slug}
              delay={(index % 2) * 0.08}
              className="group flex flex-col rounded-card border border-border bg-white p-8 shadow-soft transition-transform duration-250 ease-out hover:-translate-y-1"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/50 to-blue/20 text-ink">
                <solution.icon className="size-6" />
              </span>
              <h2 className="mt-6 font-brand text-2xl font-semibold text-ink">{solution.name}</h2>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{solution.tagline}</p>
              <Link
                href={`/solutions/${solution.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep"
              >
                See how it fits
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>

      <FinalCta />
    </>
  );
}
