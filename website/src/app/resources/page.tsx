import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { Badge } from "@/components/ui/badge";
import { resources } from "@/content/resources";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides on Malaysian payroll compliance, Earned Wage Access regulation, and company secretary requirements.",
};

export default function ResourcesPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Compliance, payroll and financial wellness, explained plainly"
        description="No jargon-first legal briefs — just straight answers to the questions Malaysian employers actually ask us."
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-2">
          {resources.map((resource, index) => (
            <SectionReveal key={resource.slug} delay={(index % 2) * 0.08}>
              <Link
                href={`/resources/${resource.slug}`}
                className="group flex h-full flex-col rounded-card border border-border bg-white p-8 shadow-soft transition-transform duration-250 ease-out hover:-translate-y-1"
              >
                <div className="flex items-center justify-between">
                  <Badge variant="blue">{resource.category}</Badge>
                  <span className="text-xs text-ink-faint">{resource.readTime}</span>
                </div>
                <h2 className="mt-5 font-brand text-xl font-semibold text-ink">{resource.title}</h2>
                <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{resource.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
                  Read the guide
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </SectionReveal>
          ))}
        </div>
      </section>
    </>
  );
}
