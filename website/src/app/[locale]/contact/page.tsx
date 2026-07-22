import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { PageHero } from "@/components/marketing/page-hero";
import { SectionReveal } from "@/components/layout/section-reveal";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/i18n/routing";

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contactPage" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations("contactPage");

  return (
    <>
      <PageHero
        align="left"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
        className="pb-10"
      />

      <section className="pb-24 lg:pb-32">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionReveal className="flex flex-col gap-6">
            <ContactDetail icon={Mail} label={t("labels.email")} value={siteConfig.contact.email} href={`mailto:${siteConfig.contact.email}`} />
            <ContactDetail icon={Phone} label={t("labels.phone")} value={siteConfig.contact.phone} href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} />
            <ContactDetail icon={MapPin} label={t("labels.office")} value={siteConfig.contact.address} />
            <ContactDetail icon={Clock} label={t("labels.responseTime")} value={t("labels.responseTimeValue")} />
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <ContactForm />
          </SectionReveal>
        </div>
      </section>
    </>
  );
}

function ContactDetail({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex gap-4 rounded-card border border-border bg-white p-6 shadow-soft">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-surface-alt text-blue-deep">
        <Icon className="size-5" />
      </span>
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-ink-faint">{label}</p>
        <p className="mt-1 text-[0.95rem] font-medium text-ink">{value}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="transition-transform hover:-translate-y-0.5">
        {content}
      </a>
    );
  }

  return content;
}
