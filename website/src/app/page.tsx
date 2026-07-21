import type { Metadata } from "next";

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
import { homeFaq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Modern Payroll Platform Built for Malaysian Businesses",
  description:
    "GajiPay simplifies HR, payroll and Earned Wage Access in one intelligent platform — plus company secretary and audit & accounting referral for Malaysian SMEs.",
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(homeFaq)) }}
      />
      <Hero />
      <IndustryStrip />
      <WhyGajiPay />
      <EarnedWageAccessSection />
      <DashboardSection />
      <Features />
      <Security />
      <Perspectives />
      <Faq />
      <FinalCta />
    </>
  );
}
