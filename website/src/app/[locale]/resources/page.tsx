import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getResources } from "@/content/resources";

interface ResourcesPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ResourcesPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resourcesPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ResourcesPage({ params }: ResourcesPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("resourcesPage");
  const resources = getResources(locale as Locale);

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

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
                  {t("readTheGuide")}
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
