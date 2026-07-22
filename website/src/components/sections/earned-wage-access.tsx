import { ShieldCheck, PercentCircle, Landmark, ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { SectionReveal } from "@/components/layout/section-reveal";
import { AdvancePayMock } from "@/components/marketing/advance-pay-mock";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

const factIcons = [ShieldCheck, PercentCircle, Landmark];

export async function EarnedWageAccessSection() {
  const t = await getTranslations("home.ewa");
  const facts = t.raw("facts") as { title: string; description: string }[];

  return (
    <section className="bg-surface-alt py-24 lg:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <SectionReveal className="order-2 flex justify-center lg:order-1">
          <AdvancePayMock />
        </SectionReveal>

        <SectionReveal className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">{t("eyebrow")}</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">{t("description")}</p>

          <ul className="mt-8 space-y-5">
            {facts.map((fact, index) => {
              const Icon = factIcons[index];
              return (
                <li key={fact.title} className="flex gap-4">
                  <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
                    <Icon className="size-5 text-blue-deep" />
                  </span>
                  <div>
                    <p className="font-semibold text-ink">{fact.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{fact.description}</p>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-9">
            <Button asChild>
              <Link href="/products/earned-wage-access">
                {t("cta")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
