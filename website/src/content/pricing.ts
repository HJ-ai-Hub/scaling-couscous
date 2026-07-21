export interface PricingTier {
  name: string;
  description: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
}

export const pricingTiers: PricingTier[] = [
  {
    name: "Starter",
    description: "Get statutory compliance right, from incorporation.",
    bestFor: "New and small Sdn Bhd, up to ~20 employees",
    features: [
      "SSM-authorised Company Secretary",
      "Statutory payroll — EPF, SOCSO, EIS, PCB/MTD",
      "Digital payslips and EA form generation",
      "Email support",
    ],
  },
  {
    name: "Growth",
    description: "Add HR self-service and Advance Pay for your team.",
    bestFor: "Growing SMEs, ~20–200 employees, shift or hourly staff",
    highlighted: true,
    features: [
      "Everything in Starter",
      "HR Portal — leave, attendance, self-service",
      "Advance Pay (Earned Wage Access) for eligible employees",
      "Multi-outlet / multi-site payroll structures",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "Full suite, dedicated onboarding, and referral coverage.",
    bestFor: "Larger SMEs and multi-entity groups",
    features: [
      "Everything in Growth",
      "Audit & Accounting referral coordination",
      "Dedicated onboarding and migration support",
      "Custom reporting for finance and leadership",
      "Dedicated account manager",
    ],
  },
];

export const pricingFaq = [
  {
    question: "How is GajiPay priced?",
    answer:
      "Company Secretary and Payroll are priced as a monthly retainer plus a per-employee fee, scaled to your headcount and how many services you bundle. We'll give you an exact quote after a short discovery call — most SMEs get pricing back within a day.",
  },
  {
    question: "How is Advance Pay priced?",
    answer:
      "Advance Pay is never interest — it's a flat processing fee per withdrawal, typically in the RM2–5 range depending on your plan, either absorbed by your company as an employee benefit or paid by the employee at the point of withdrawal.",
  },
  {
    question: "Is there a setup fee?",
    answer:
      "Company secretary incorporation and payroll migration may carry a one-time setup fee depending on complexity — this is always confirmed up front, never billed as a surprise.",
  },
  {
    question: "Can we start with just Company Secretary?",
    answer:
      "Yes. Many clients start with Company Secretary and Payroll, then add HR Portal and Advance Pay once they've hired their first employees.",
  },
];
