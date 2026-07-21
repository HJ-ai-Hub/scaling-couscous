import type { LucideIcon } from "lucide-react";
import {
  Wallet,
  FileSpreadsheet,
  Users,
  Stamp,
  ShieldCheck,
  Lock,
  Clock,
  BarChart3,
  Smartphone,
  Building2,
  FileCheck2,
} from "lucide-react";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const platformFeatures: Feature[] = [
  {
    title: "One employee record",
    description: "Payroll, leave, attendance and Advance Pay eligibility all read from the same source of truth — enter data once.",
    icon: Users,
  },
  {
    title: "Statutory calculations built in",
    description: "EPF, SOCSO, EIS and PCB/MTD are calculated natively and kept current as rates change.",
    icon: FileSpreadsheet,
  },
  {
    title: "Real-time earned-wage ledger",
    description: "Advance Pay balances are computed from live attendance and payroll data, hard-capped to wages already earned.",
    icon: Wallet,
  },
  {
    title: "Mobile-first for every role",
    description: "Shift, floor and site staff get a fast mobile experience — not a desktop tool nobody opens.",
    icon: Smartphone,
  },
  {
    title: "Company secretary, digitised",
    description: "Incorporation, annual returns and board resolutions handled with e-signatures, not physical paperwork.",
    icon: Stamp,
  },
  {
    title: "Clear reporting for finance",
    description: "Payroll cost, headcount and Advance Pay utilisation, visible in one dashboard for finance and HR alike.",
    icon: BarChart3,
  },
];

export const securityPillars: { title: string; description: string; icon: LucideIcon }[] = [
  {
    title: "PDPA-aligned by design",
    description:
      "Salary, attendance and banking data are handled under a data protection framework aligned to the Personal Data Protection Act 2010 from day one — not retrofitted after launch.",
    icon: ShieldCheck,
  },
  {
    title: "Encrypted at rest and in transit",
    description: "All sensitive payroll and banking data is encrypted end-to-end, with role-based access control and full audit logging.",
    icon: Lock,
  },
  {
    title: "Bank-partner disbursement",
    description: "Advance Pay funds move through a licensed banking or e-money partner — GajiPay never holds or floats employee funds itself.",
    icon: Building2,
  },
  {
    title: "Statutory-audit ready",
    description: "Every payroll run and Advance Pay transaction leaves a clean, timestamped audit trail suitable for statutory inspection.",
    icon: FileCheck2,
  },
  {
    title: "Employment Act guardrails",
    description: "Advance Pay is hard-capped against Section 22 of the Employment Act 1955 — it is structurally impossible to advance more than has been earned.",
    icon: Clock,
  },
];
