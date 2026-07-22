import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FinalCta } from "@/components/sections/final-cta";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getProductBySlug, getProducts } from "@/content/products";
import { faqJsonLd } from "@/lib/structured-data";

interface ProductPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export function generateStaticParams() {
  return getProducts("en").map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = getProductBySlug(locale as Locale, slug);
  if (!product) return {};
  return {
    title: product.shortName,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale as Locale);
  const product = getProductBySlug(locale as Locale, slug);
  if (!product) notFound();

  const t = await getTranslations("productDetail");
  const otherProducts = getProducts(locale as Locale).filter((p) => p.slug !== product.slug);

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
            <Link href="/book-demo">{t("bookDemo")}</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/contact">{t("getStarted")}</Link>
          </Button>
        </div>
      </PageHero>

      <section className="pb-20">
        <div className="container-page">
          <SectionReveal className="rounded-card border border-border bg-surface-alt p-8 sm:p-10">
            <h2 className="font-brand text-xl font-semibold text-ink">{t("whatYouGet")}</h2>
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
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("howItWorksEyebrow")}</p>
            <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink">
              {t("howItWorksTitle")}
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
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("faqEyebrow")}</p>
              <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink">
                {t("faqTitle", { name: product.shortName })}
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
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">{t("exploreRest")}</p>
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
                  {t("learnMore")} <ArrowRight className="size-3.5" />
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
