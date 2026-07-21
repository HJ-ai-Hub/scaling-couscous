import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AlertTriangle } from "lucide-react";

import { getLegalDocBySlug, legalDocs } from "@/content/legal";

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return legalDocs.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = getLegalDocBySlug(slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.summary,
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const doc = getLegalDocBySlug(slug);
  if (!doc) notFound();

  return (
    <article className="pb-24 pt-36 sm:pt-44">
      <div className="container-page max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">Legal</p>
        <h1 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-3 text-sm text-ink-faint">Last updated: {doc.lastUpdated}</p>

        <div className="mt-8 flex gap-3 rounded-card border border-amber-200 bg-amber-50 p-5">
          <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-600" />
          <p className="text-sm leading-relaxed text-amber-900">
            This document is a working draft prepared for launch planning. It should be reviewed
            and finalised by qualified Malaysian legal counsel before being relied upon as a
            binding agreement.
          </p>
        </div>

        <div className="mt-10 space-y-8">
          {doc.sections.map((section) => (
            <div key={section.heading}>
              <h2 className="font-brand text-lg font-semibold text-ink">{section.heading}</h2>
              <div className="mt-3 space-y-3">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-[0.98rem] leading-relaxed text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}
