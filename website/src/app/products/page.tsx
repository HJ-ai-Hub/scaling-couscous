import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { FinalCta } from "@/components/sections/final-cta";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Advance Pay (EWA), Payroll, HR Portal, Company Secretary and Audit & Accounting referral — five connected services on one GajiPay platform.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products"
        title="One platform, five connected services"
        description="Every product reads from the same employee record, so nothing gets entered twice — and Advance Pay stays accurate because it's built on GajiPay's own payroll data."
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid grid-cols-1 gap-6 md:grid-cols-2">
          {products.map((product, index) => (
            <SectionReveal
              key={product.slug}
              delay={(index % 2) * 0.08}
              className="group flex flex-col rounded-card border border-border bg-white p-8 shadow-soft transition-transform duration-250 ease-out hover:-translate-y-1"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/50 to-blue/20 text-ink">
                <product.icon className="size-6" />
              </span>
              <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-blue-deep">{product.eyebrow}</p>
              <h2 className="mt-2 font-brand text-2xl font-semibold text-ink">{product.shortName}</h2>
              <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-soft">{product.tagline}</p>
              <Link
                href={`/products/${product.slug}`}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep"
              >
                Learn more
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
