import type { LucideIcon } from "lucide-react";
import { Wallet, FileSpreadsheet, Users, Stamp, Calculator } from "lucide-react";

export interface Product {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  bullets: string[];
  howItWorks: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
}

export const products: Product[] = [
  {
    slug: "earned-wage-access",
    name: "Advance Pay — Earned Wage Access",
    shortName: "Advance Pay (EWA)",
    eyebrow: "Flagship product",
    tagline: "Wages your people have already earned, available before payday.",
    description:
      "Advance Pay lets employees draw down a portion of wages they've already earned during the current pay cycle — after the 15th of each month — without touching your cash flow or your payroll cut-off. It is Earned Wage Access, not a loan: no interest, no credit check, no debt.",
    icon: Wallet,
    bullets: [
      "Employees access up to a conservative share of wages already earned to date — never more than what's been worked for",
      "A single flat processing fee per withdrawal. No interest, ever.",
      "Runs on real, reconciled attendance and payroll data from GajiPay's own payroll engine — not a bolt-on guess",
      "Disbursed through a licensed banking partner, never from GajiPay's own balance sheet",
      "Employers can absorb the fee as a benefit, or let employees opt in and pay it themselves",
    ],
    howItWorks: [
      {
        title: "Payroll runs as normal",
        description:
          "GajiPay's payroll engine tracks attendance and earnings continuously, so every employee has an accurate, up-to-date earned-wage balance.",
      },
      {
        title: "Employees request after the 15th",
        description:
          "Once past the mid-month mark, eligible employees can request an advance from the GajiPay app, capped well within wages already earned.",
      },
      {
        title: "Funds arrive, fee is flat",
        description:
          "Funds are disbursed through our banking partner within minutes. A single flat fee applies — never interest, never a credit assessment.",
      },
      {
        title: "Reconciled automatically at payday",
        description:
          "On payday, the advance is deducted from net pay automatically and reflected transparently on the payslip. No manual reconciliation for HR.",
      },
    ],
    faq: [
      {
        question: "Is this a loan?",
        answer:
          "No. Advance Pay is Earned Wage Access — employees are drawing down wages they have already earned for work already performed, not borrowing against future income. There is no interest, no credit check, and no debt created.",
      },
      {
        question: "Does GajiPay need a moneylending licence?",
        answer:
          "No. The service is structured within the exemption under the Moneylenders Act 1951 for employer-facilitated financial assistance to employees, and follows Sections 22 and 27 of the Employment Act 1955 — advances are capped at wages already earned, and no interest is charged.",
      },
      {
        question: "Where does the money come from?",
        answer:
          "Disbursement runs through a licensed banking or e-money partner, settled against the employer's payroll — never from GajiPay's own balance sheet.",
      },
    ],
  },
  {
    slug: "payroll",
    name: "Payroll Services",
    shortName: "Payroll",
    eyebrow: "Statutory core",
    tagline: "Full Malaysian statutory payroll, run right every single cycle.",
    description:
      "EPF, SOCSO, EIS, PCB/MTD and EA forms — calculated, filed and audit-ready every month. GajiPay's payroll engine is also the data source that makes Advance Pay accurate to the ringgit.",
    icon: FileSpreadsheet,
    bullets: [
      "Native EPF, SOCSO, EIS and PCB/MTD calculation, updated as statutory rates change",
      "Automatic EA form generation at year end",
      "Multiple salary structures, allowances and deductions per employee",
      "Full audit trail, ready for statutory inspection",
      "Direct data pipe into HR Portal and Advance Pay — enter data once",
    ],
    howItWorks: [
      { title: "Onboard your employees", description: "Import from spreadsheets or your current provider — no hard cutover required." },
      { title: "Run payroll monthly", description: "Attendance, leave and claims flow in automatically; approve and release in a few clicks." },
      { title: "Statutory filing handled", description: "EPF, SOCSO, EIS and PCB submissions are generated and filed on your behalf." },
      { title: "Payslips and EA forms", description: "Employees get digital payslips instantly; EA forms are ready at year end without a scramble." },
    ],
    faq: [
      {
        question: "Can you migrate us from our current payroll vendor?",
        answer: "Yes — our onboarding team handles data migration and runs a parallel cycle before cutover so nothing is missed.",
      },
      {
        question: "Do you handle multiple salary structures?",
        answer: "Yes, including shift differentials, commission structures, and allowances specific to your industry.",
      },
    ],
  },
  {
    slug: "hr-portal",
    name: "HR Portal",
    shortName: "HR Portal",
    eyebrow: "One home for your people",
    tagline: "Leave, attendance and employee self-service, without enterprise bloat.",
    description:
      "A clean, fast HR system of record for leave, attendance, and employee self-service — the data engine that makes Advance Pay's earned-wage balance accurate in real time.",
    icon: Users,
    bullets: [
      "Leave and attendance management with approval workflows",
      "Employee self-service: payslips, claims, personal details",
      "Org chart and team structure at a glance",
      "Mobile-first, so shift and floor staff actually use it",
      "Feeds attendance data directly into payroll and Advance Pay eligibility",
    ],
    howItWorks: [
      { title: "Set up your org", description: "Departments, reporting lines and leave policies, configured in a single session." },
      { title: "Employees self-serve", description: "Leave requests, claims and payslip access move off HR's inbox and onto the app." },
      { title: "Attendance flows through", description: "Clock-ins and approved leave sync automatically into payroll and Advance Pay eligibility." },
    ],
    faq: [
      {
        question: "Do we need Payroll to use the HR Portal?",
        answer: "The HR Portal works well on its own, but pairing it with GajiPay Payroll is what unlocks accurate, real-time Advance Pay eligibility for your team.",
      },
    ],
  },
  {
    slug: "company-secretary",
    name: "Company Secretary Services",
    shortName: "Company Secretary",
    eyebrow: "Statutory, from day one",
    tagline: "SSM-authorised company secretary services, digital-first.",
    description:
      "Every Sdn Bhd needs a company secretary within 30 days of incorporation. GajiPay pairs SSM-authorised secretarial service with a modern, e-signature-first client experience — flat fees, no surprises.",
    icon: Stamp,
    bullets: [
      "Incorporation and SSM-authorised secretarial appointment",
      "Annual return filing and statutory register maintenance",
      "Board resolutions and e-signatures, no physical paperwork required",
      "Flat, transparent retainer pricing",
      "Direct handoff into Payroll and HR Portal as you hire your first employees",
    ],
    howItWorks: [
      { title: "Incorporate or transfer in", description: "New company incorporation, or a smooth handover from your existing secretarial firm." },
      { title: "Stay compliant automatically", description: "Compliance calendar tracks annual returns, resolutions, and statutory deadlines for you." },
      { title: "Sign digitally", description: "Board resolutions and statutory documents are signed electronically — no notary trips." },
    ],
    faq: [
      {
        question: "Can you take over from our current company secretary?",
        answer: "Yes, we handle the transition and notify SSM of the change within the required timeframe.",
      },
    ],
  },
  {
    slug: "audit-accounting",
    name: "Audit & Accounting Referral",
    shortName: "Audit & Accounting",
    eyebrow: "Trusted referral network",
    tagline: "Licensed audit and accounting partners, one warm introduction away.",
    description:
      "GajiPay doesn't hold audit or accounting licences and never will — instead, we maintain a vetted referral network of licensed audit firms and chartered accountants for your statutory audit and accounting needs.",
    icon: Calculator,
    bullets: [
      "Warm introductions to licensed audit firms matched to your industry and size",
      "Chartered accountant referrals for management accounts and tax filing",
      "No conflict of interest — GajiPay earns a referral fee, never a service fee for work we don't perform",
      "Coordinated timing with your financial year-end and statutory filing deadlines",
    ],
    howItWorks: [
      { title: "Tell us your needs", description: "Statutory audit, tax filing, or management accounts — let us know your financial year-end." },
      { title: "We make the introduction", description: "We match you with a licensed partner firm suited to your size and industry." },
      { title: "You engage directly", description: "The engagement and fees are agreed directly between you and the licensed firm." },
    ],
    faq: [
      {
        question: "Does GajiPay perform the audit itself?",
        answer: "No — GajiPay is not a licensed audit or accounting firm. We refer you to vetted, independently licensed partners.",
      },
    ],
  },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}
