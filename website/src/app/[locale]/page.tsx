import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { Hero } from "@/components/sections/hero";
import { IndustryStrip } from "@/components/sections/industry-strip";
import { WhyGajiPay } from "@/components/sections/why-gajipay";
import { EarnedWageAccessSection } from "@/components/sections/earned-wage-access";
import { DashboardSection } from "@/components/sections/dashboard-section";
import { Features } from "@/components/sections/features";
import { Security } from "@/components/sections/security";
import { Perspectives } from "@/components/sections/perspectives";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { faqJsonLd } from "@/lib/structured-data";
import { getHomeFaq } from "@/content/faq";
import type { Locale } from "@/i18n/routing";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("defaultTitle"),
    description: t("description"),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const typedLocale = locale as Locale;
  setRequestLocale(typedLocale);
  const homeFaq = getHomeFaq(typedLocale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaq)) }}
      />
      <Hero />
      <IndustryStrip locale={typedLocale} />
      <WhyGajiPay locale={typedLocale} />
      <EarnedWageAccessSection locale={typedLocale} />
      <DashboardSection locale={typedLocale} />
      <Features locale={typedLocale} />
      <Security locale={typedLocale} />
      <Perspectives locale={typedLocale} />
      <Faq locale={typedLocale} />
      <FinalCta locale={typedLocale} />
    </>
  );
}
