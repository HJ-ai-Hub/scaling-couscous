import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed, Factory, Truck, ShieldCheck, HardHat } from "lucide-react";

export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  painPoints: string[];
  outcomes: string[];
}

export const solutions: Solution[] = [
  {
    slug: "retail-fnb",
    name: "Retail & F&B",
    tagline: "Keep shift and outlet staff on payday, every day.",
    description:
      "High headcount, high turnover, and shift-based pay — retail and F&B chains feel cash-flow stress on the floor first. Advance Pay gives outlet staff a fair alternative to payday loans, while GajiPay's payroll keeps multi-outlet, multi-shift pay accurate.",
    icon: UtensilsCrossed,
    painPoints: [
      "High staff turnover across outlets, driven partly by mid-month cash-flow stress",
      "Shift-based and hourly pay structures that generic payroll tools handle poorly",
      "HR stretched thin across many outlet locations",
    ],
    outcomes: [
      "Lower turnover among outlet and shift staff with Advance Pay as a benefit",
      "Payroll that correctly handles shift differentials and multi-outlet structures",
      "One HR Portal for every outlet, not a spreadsheet per branch",
    ],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    tagline: "Factory-floor payroll and financial wellness, done right.",
    description:
      "Overtime, shift allowances, and a large hourly workforce make manufacturing payroll genuinely complex. GajiPay handles the calculation correctly and gives production staff fair, transparent access to wages they've already earned.",
    icon: Factory,
    painPoints: [
      "Complex overtime and shift-allowance calculations",
      "Large hourly workforce with limited access to traditional banking benefits",
      "Manual attendance-to-payroll reconciliation prone to error",
    ],
    outcomes: [
      "Accurate overtime and allowance calculation, every cycle",
      "Advance Pay as a retention lever for production-line staff",
      "Attendance data flows straight into payroll — no manual re-entry",
    ],
  },
  {
    slug: "logistics",
    name: "Logistics & Delivery",
    tagline: "Built for a distributed, always-moving workforce.",
    description:
      "Riders, drivers and warehouse staff rarely sit at a desk. GajiPay's mobile-first HR Portal and Advance Pay meet them where they are, while payroll keeps pace with variable routes, shifts and allowances.",
    icon: Truck,
    painPoints: [
      "Distributed workforce with little face time with HR",
      "Variable shifts, routes and allowance structures",
      "Cash-flow-sensitive workforce with thin financial buffers",
    ],
    outcomes: [
      "Mobile-first self-service that riders and drivers actually use",
      "Advance Pay to smooth mid-month cash-flow gaps",
      "Payroll that adapts to variable shift and allowance structures",
    ],
  },
  {
    slug: "security-services",
    name: "Security Services",
    tagline: "Multi-site guard payroll, without the paperwork.",
    description:
      "Security firms manage large, dispersed guard headcounts across many client sites. GajiPay consolidates attendance, payroll and financial wellness into one platform, cutting the administrative load on lean back offices.",
    icon: ShieldCheck,
    painPoints: [
      "Guards dispersed across many client sites, hard to track centrally",
      "Lean back-office teams managing disproportionately large headcounts",
      "High turnover sensitivity to pay timing and cash-flow stress",
    ],
    outcomes: [
      "Centralised attendance and payroll across every site",
      "Advance Pay to reduce turnover among guarding staff",
      "Company secretary and compliance handled alongside payroll",
    ],
  },
  {
    slug: "construction",
    name: "Construction & Facilities",
    tagline: "Project-based payroll for a project-based industry.",
    description:
      "Construction and facilities management run on project cycles, subcontracted crews, and variable site allowances. GajiPay keeps payroll compliant and gives site workers fair access to wages already earned.",
    icon: HardHat,
    painPoints: [
      "Project-based and subcontracted workforce structures",
      "Site allowances and variable pay across projects",
      "Workforce with limited access to conventional financial services",
    ],
    outcomes: [
      "Payroll structured around projects and sites, not just departments",
      "Advance Pay for site-based crews between project milestones",
      "Company secretary and statutory compliance handled centrally",
    ],
  },
];

export function getSolutionBySlug(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
