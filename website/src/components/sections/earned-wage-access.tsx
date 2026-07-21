import Link from "next/link";
import { ArrowRight, ShieldCheck, PercentCircle, Landmark } from "lucide-react";

import { SectionReveal } from "@/components/layout/section-reveal";
import { AdvancePayMock } from "@/components/marketing/advance-pay-mock";
import { Button } from "@/components/ui/button";

const facts = [
  {
    icon: ShieldCheck,
    title: "Not a loan",
    description: "No interest, no credit check, no debt — just wages already earned, released early.",
  },
  {
    icon: PercentCircle,
    title: "Capped, always",
    description: "Advances are hard-capped against wages already earned, in line with the Employment Act 1955.",
  },
  {
    icon: Landmark,
    title: "Bank-partner disbursement",
    description: "Funds move through a licensed banking partner — never from GajiPay's own balance sheet.",
  },
];

export function EarnedWageAccessSection() {
  return (
    <section className="bg-surface-alt py-24 lg:py-32">
      <div className="container-page grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <SectionReveal className="order-2 flex justify-center lg:order-1">
          <AdvancePayMock />
        </SectionReveal>

        <SectionReveal className="order-1 lg:order-2">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">Advance Pay</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Earned Wage Access, done the right way
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            After the 15th of every month, employees can draw down a share of the wages they&apos;ve
            already earned — directly from the GajiPay app, reconciled automatically at payday.
            No interest. No lending licence required. No debt created.
          </p>

          <ul className="mt-8 space-y-5">
            {facts.map((fact) => (
              <li key={fact.title} className="flex gap-4">
                <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-white shadow-soft">
                  <fact.icon className="size-5 text-blue-deep" />
                </span>
                <div>
                  <p className="font-semibold text-ink">{fact.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-ink-soft">{fact.description}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Button asChild>
              <Link href="/products/earned-wage-access">
                See how Advance Pay works
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
