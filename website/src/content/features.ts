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

import type { Locale } from "@/i18n/routing";

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

type FeatureCopy = Omit<Feature, "icon">;

const platformIcons: LucideIcon[] = [Users, FileSpreadsheet, Wallet, Smartphone, Stamp, BarChart3];
const securityIcons: LucideIcon[] = [ShieldCheck, Lock, Building2, FileCheck2, Clock];

const platformCopy: Record<Locale, FeatureCopy[]> = {
  en: [
    {
      title: "One employee record",
      description: "Payroll, leave, attendance and Advance Pay eligibility all read from the same source of truth — enter data once.",
    },
    {
      title: "Statutory calculations built in",
      description: "EPF, SOCSO, EIS and PCB/MTD are calculated natively and kept current as rates change.",
    },
    {
      title: "Real-time earned-wage ledger",
      description: "Advance Pay balances are computed from live attendance and payroll data, hard-capped to wages already earned.",
    },
    {
      title: "Mobile-first for every role",
      description: "Shift, floor and site staff get a fast mobile experience — not a desktop tool nobody opens.",
    },
    {
      title: "Company secretary, digitised",
      description: "Incorporation, annual returns and board resolutions handled with e-signatures, not physical paperwork.",
    },
    {
      title: "Clear reporting for finance",
      description: "Payroll cost, headcount and Advance Pay utilisation, visible in one dashboard for finance and HR alike.",
    },
  ],
  zh: [
    {
      title: "统一的员工数据档案",
      description: "薪资、请假、考勤与预支薪资资格审核均读取自同一份权威数据来源——只需输入一次。",
    },
    {
      title: "内建法定计算功能",
      description: "EPF、SOCSO、EIS及PCB/MTD均以原生方式计算，并随费率变动即时更新。",
    },
    {
      title: "实时已赚工资账本",
      description: "预支薪资余额根据实时考勤与薪资数据计算，并严格封顶于已赚取的工资金额。",
    },
    {
      title: "各角色皆以移动优先设计",
      description: "轮班、一线与现场员工都能获得快速的移动体验——而非一套没人愿意打开的桌面工具。",
    },
    {
      title: "公司秘书服务全面数字化",
      description: "公司注册、年度报表与董事会决议，皆以电子签署处理，无需纸本作业。",
    },
    {
      title: "财务部门一目了然的报表",
      description: "薪资成本、员工人数与预支薪资使用情况，财务与人力资源部门皆可在同一仪表板中清楚掌握。",
    },
  ],
  ms: [
    {
      title: "Satu rekod pekerja",
      description: "Penggajian, cuti, kehadiran dan kelayakan Advance Pay semuanya dibaca daripada satu sumber kebenaran yang sama — masukkan data sekali sahaja.",
    },
    {
      title: "Pengiraan statutori terbina dalam",
      description: "KWSP, PERKESO, SIP dan PCB/MTD dikira secara native dan dikemas kini apabila kadar berubah.",
    },
    {
      title: "Lejar gaji-diperoleh masa nyata",
      description: "Baki Advance Pay dikira daripada data kehadiran dan penggajian secara langsung, dihadkan dengan ketat kepada gaji yang telah diperoleh.",
    },
    {
      title: "Mudah-alih dahulu untuk setiap peranan",
      description: "Kakitangan shif, lapangan dan tapak mendapat pengalaman mudah alih yang pantas — bukan alat desktop yang tiada siapa buka.",
    },
    {
      title: "Setiausaha syarikat, didigitalkan",
      description: "Penubuhan, pulangan tahunan dan resolusi lembaga pengarah dikendalikan dengan e-tandatangan, bukan kerja kertas fizikal.",
    },
    {
      title: "Pelaporan jelas untuk kewangan",
      description: "Kos penggajian, bilangan kakitangan dan penggunaan Advance Pay, kelihatan dalam satu papan pemuka untuk kewangan dan HR.",
    },
  ],
};

const securityCopy: Record<Locale, FeatureCopy[]> = {
  en: [
    {
      title: "PDPA-aligned by design",
      description:
        "Salary, attendance and banking data are handled under a data protection framework aligned to the Personal Data Protection Act 2010 from day one — not retrofitted after launch.",
    },
    {
      title: "Encrypted at rest and in transit",
      description: "All sensitive payroll and banking data is encrypted end-to-end, with role-based access control and full audit logging.",
    },
    {
      title: "Bank-partner disbursement",
      description: "Advance Pay funds move through a licensed banking or e-money partner — GajiPay never holds or floats employee funds itself.",
    },
    {
      title: "Statutory-audit ready",
      description: "Every payroll run and Advance Pay transaction leaves a clean, timestamped audit trail suitable for statutory inspection.",
    },
    {
      title: "Employment Act guardrails",
      description: "Advance Pay is hard-capped against Section 22 of the Employment Act 1955 — it is structurally impossible to advance more than has been earned.",
    },
  ],
  zh: [
    {
      title: "从设计之初即符合PDPA规范",
      description: "薪资、考勤与银行数据自第一天起，即在符合《2010年个人数据保护法令》的数据保护框架下处理——而非上线后才临时补上。",
    },
    {
      title: "静止与传输过程均加密",
      description: "所有敏感的薪资与银行数据均采用端对端加密，并配备基于角色的访问控制与完整的审计日志记录。",
    },
    {
      title: "透过银行合作伙伴发放资金",
      description: "预支薪资资金透过持牌银行或电子货币合作伙伴发放——GajiPay本身绝不持有或垫付员工资金。",
    },
    {
      title: "随时可供法定审计",
      description: "每一次薪资运行与预支薪资交易，都会留下清晰、附带时间戳记的审计记录，可供法定检查使用。",
    },
    {
      title: "严守《雇佣法令》规范",
      description: "预支薪资严格封顶于《1955年雇佣法令》第22条规定——从架构上便杜绝了预支超过已赚工资的可能性。",
    },
  ],
  ms: [
    {
      title: "Selaras dengan PDPA sejak reka bentuk",
      description:
        "Data gaji, kehadiran dan perbankan dikendalikan di bawah rangka kerja perlindungan data yang selaras dengan Akta Perlindungan Data Peribadi 2010 sejak hari pertama — bukan ditambah selepas pelancaran.",
    },
    {
      title: "Disulitkan semasa disimpan dan dihantar",
      description: "Semua data penggajian dan perbankan yang sensitif disulitkan hujung ke hujung, dengan kawalan akses berasaskan peranan dan log audit yang lengkap.",
    },
    {
      title: "Pembayaran melalui rakan bank",
      description: "Dana Advance Pay bergerak melalui rakan kongsi perbankan atau e-wang berlesen — GajiPay tidak sekali-kali memegang atau mengapungkan dana pekerja sendiri.",
    },
    {
      title: "Sedia untuk audit statutori",
      description: "Setiap larian penggajian dan transaksi Advance Pay meninggalkan jejak audit yang bersih dan bercap masa, sesuai untuk pemeriksaan statutori.",
    },
    {
      title: "Pagar keselamatan Akta Kerja",
      description: "Advance Pay dihadkan dengan ketat mengikut Seksyen 22 Akta Kerja 1955 — secara struktur adalah mustahil untuk mendahulukan lebih daripada apa yang telah diperoleh.",
    },
  ],
};

export function getPlatformFeatures(locale: Locale): Feature[] {
  return platformCopy[locale].map((f, i) => ({ ...f, icon: platformIcons[i] }));
}

export function getSecurityPillars(locale: Locale): Feature[] {
  return securityCopy[locale].map((f, i) => ({ ...f, icon: securityIcons[i] }));
}
