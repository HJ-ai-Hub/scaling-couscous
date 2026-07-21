import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SectionReveal } from "@/components/layout/section-reveal";
import { Badge } from "@/components/ui/badge";
import { FinalCta } from "@/components/sections/final-cta";
import { getResourceBySlug, resources } from "@/content/resources";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return resources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: ResourcePageProps): Promise<Metadata> {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return {
    title: resource.title,
    description: resource.excerpt,
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  const related = resources.filter((r) => r.slug !== resource.slug).slice(0, 2);

  return (
    <>
      <article className="pb-16 pt-36 sm:pt-44">
        <div className="container-page max-w-3xl">
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft hover:text-ink">
            <ArrowLeft className="size-4" /> Back to resources
          </Link>

          <SectionReveal className="mt-8">
            <div className="flex items-center gap-3">
              <Badge variant="blue">{resource.category}</Badge>
              <span className="text-xs text-ink-faint">{resource.readTime}</span>
            </div>
            <h1 className="mt-5 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              {resource.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">{resource.excerpt}</p>
          </SectionReveal>

          <SectionReveal delay={0.1} className="mt-12 space-y-10">
            {resource.sections.map((section, index) => (
              <div key={section.heading ?? index}>
                {section.heading ? (
                  <h2 className="font-brand text-xl font-semibold text-ink">{section.heading}</h2>
                ) : null}
                <div className="mt-3 space-y-4">
                  {section.paragraphs.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-[1.05rem] leading-relaxed text-ink-soft">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </SectionReveal>
        </div>
      </article>

      {related.length > 0 ? (
        <section className="border-t border-border bg-surface-alt py-16">
          <div className="container-page max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-faint">Keep reading</p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  href={`/resources/${item.slug}`}
                  className="group rounded-card border border-border bg-white p-6 shadow-soft transition-transform hover:-translate-y-1"
                >
                  <p className="font-semibold text-ink">{item.title}</p>
                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-blue-deep">
                    Read
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <FinalCta />
    </>
  );
}
