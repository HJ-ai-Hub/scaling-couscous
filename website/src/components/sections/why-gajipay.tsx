import { Layers, ShieldCheck, MapPinned } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/section-reveal";

const pillarIcons = [Layers, ShieldCheck, MapPinned];

export async function WhyGajiPay() {
  const t = await getTranslations("home.whyGajipay");
  const pillars = t.raw("pillars") as { title: string; description: string }[];

  return (
    <section className="py-24 lg:py-32">
      <div className="container-page">
        <SectionReveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("eyebrow")}</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-balance text-lg leading-relaxed text-ink-soft">{t("description")}</p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {pillars.map((pillar, index) => {
            const Icon = pillarIcons[index];
            return (
              <SectionReveal
                key={pillar.title}
                delay={index * 0.08}
                className="rounded-card border border-border bg-white p-8 shadow-soft transition-transform duration-250 ease-out hover:-translate-y-1"
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-mint/50 to-blue/20 text-ink">
                  <Icon className="size-6" />
                </span>
                <h3 className="mt-6 font-brand text-xl font-semibold text-ink">{pillar.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{pillar.description}</p>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
