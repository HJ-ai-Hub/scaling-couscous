import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { getProductBySlug, products } from "@/content/products";
import { faqJsonLd } from "@/lib/structured-data";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.shortName,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const otherProducts = products.filter((p) => p.slug !== product.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(product.faq)) }}
      />

      <PageHero
        align="left"
        eyebrow={product.eyebrow}
        title={product.name}
        description={product.description}
        className="pb-10"
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/book-demo">Book Demo</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>
      </PageHero>

      <section className="pb-20">
        <div className="container-page">
          <SectionReveal className="rounded-card border border-border bg-surface-alt p-8 sm:p-10">
            <h2 className="font-brand text-xl font-semibold text-ink">What you get</h2>
            <ul className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.bullets.map((bullet) => (
                <li key={bullet} className="flex gap-3">
                  <Check className="mt-0.5 size-5 shrink-0 text-mint-deep" />
                  <span className="text-[0.95rem] leading-relaxed text-ink-soft">{bullet}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <SectionReveal className="mx-auto max-w-xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">How it works</p>
            <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink">
              From setup to your first cycle
            </h2>
          </SectionReveal>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {product.howItWorks.map((step, index) => (
              <SectionReveal
                key={step.title}
                delay={index * 0.07}
                className="rounded-card border border-border bg-white p-6 shadow-soft"
              >
                <span className="font-brand text-2xl font-bold text-blue/60">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 font-brand text-lg font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {product.faq.length > 0 && (
        <section className="bg-surface-alt pb-24 lg:pb-32">
          <div className="container-page">
            <SectionReveal className="mx-auto max-w-xl text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">FAQ</p>
              <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink">
                Common questions about {product.shortName}
              </h2>
            </SectionReveal>
            <SectionReveal delay={0.1} className="mx-auto mt-12 max-w-2xl rounded-card border border-border bg-white px-6 shadow-soft sm:px-8">
              <Accordion type="single" collapsible>
                {product.faq.map((item, index) => (
                  <AccordionItem key={item.question} value={`faq-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SectionReveal>
          </div>
        </section>
      )}

      <section className="pb-24 lg:pb-32">
        <div className="container-page">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">Explore the rest of the platform</p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {otherProducts.map((other) => (
              <Link
                key={other.slug}
                href={`/products/${other.slug}`}
                className="group rounded-card border border-border bg-white p-5 shadow-soft transition-transform duration-250 hover:-translate-y-1"
              >
                <span className="flex size-9 items-center justify-center rounded-xl bg-surface-alt text-blue-deep">
                  <other.icon className="size-4.5" />
                </span>
                <p className="mt-4 font-semibold text-ink">{other.shortName}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-medium text-blue-deep opacity-0 transition-opacity group-hover:opacity-100">
                  Learn more <ArrowRight className="size-3.5" />
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FinalCta />
    </>
  );
}
