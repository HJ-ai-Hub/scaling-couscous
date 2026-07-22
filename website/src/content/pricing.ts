import type { Locale } from "@/i18n/routing";

export interface PricingTier {
  name: string;
  description: string;
  bestFor: string;
  features: string[];
  highlighted?: boolean;
}

export interface PricingFaqItem {
  question: string;
  answer: string;
}

const tiersCopy: Record<Locale, PricingTier[]> = {
  en: [
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
  ],
  zh: [
    {
      name: "入门方案",
      description: "从公司注册开始，就把法定合规做到位。",
      bestFor: "新成立及小型私人有限公司，员工人数约20人以内",
      features: [
        "SSM认证公司秘书服务",
        "法定薪资处理——EPF、SOCSO、EIS、PCB/MTD",
        "电子工资单与EA表格生成",
        "电邮支持服务",
      ],
    },
    {
      name: "成长方案",
      description: "为您的团队加入人力资源自助服务与预支薪资功能。",
      bestFor: "成长中的中小企业，约20至200名员工，含轮班或时薪员工",
      highlighted: true,
      features: [
        "涵盖入门方案所有功能",
        "人力资源门户——请假、考勤、自助服务",
        "为符合资格的员工提供预支薪资（已赚工资提取）",
        "多门市／多据点薪资结构",
        "优先支持服务",
      ],
    },
    {
      name: "企业方案",
      description: "完整服务套件，专属入职协助，以及转介服务覆盖。",
      bestFor: "较大型中小企业与多实体集团",
      features: [
        "涵盖成长方案所有功能",
        "审计与会计转介协调服务",
        "专属入职与数据迁移支持",
        "为财务与管理层提供定制报表",
        "专属客户经理",
      ],
    },
  ],
  ms: [
    {
      name: "Starter",
      description: "Pastikan pematuhan statutori betul, sejak penubuhan.",
      bestFor: "Sdn Bhd baharu dan kecil, sehingga ~20 pekerja",
      features: [
        "Setiausaha Syarikat yang diberi kuasa SSM",
        "Penggajian statutori — KWSP, PERKESO, SIP, PCB/MTD",
        "Slip gaji digital dan penjanaan borang EA",
        "Sokongan e-mel",
      ],
    },
    {
      name: "Growth",
      description: "Tambah layan diri HR dan Advance Pay untuk pasukan anda.",
      bestFor: "PKS yang sedang berkembang, ~20–200 pekerja, kakitangan shif atau jam",
      highlighted: true,
      features: [
        "Semua dalam Starter",
        "Portal HR — cuti, kehadiran, layan diri",
        "Advance Pay (Akses Gaji Yang Diperoleh) untuk pekerja yang layak",
        "Struktur penggajian pelbagai outlet / pelbagai tapak",
        "Sokongan keutamaan",
      ],
    },
    {
      name: "Enterprise",
      description: "Rangkaian penuh, onboarding khusus, dan liputan rujukan.",
      bestFor: "PKS lebih besar dan kumpulan berbilang entiti",
      features: [
        "Semua dalam Growth",
        "Penyelarasan rujukan Audit & Perakaunan",
        "Sokongan onboarding dan migrasi khusus",
        "Pelaporan tersuai untuk kewangan dan kepimpinan",
        "Pengurus akaun khusus",
      ],
    },
  ],
};

const faqCopy: Record<Locale, PricingFaqItem[]> = {
  en: [
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
  ],
  zh: [
    {
      question: "GajiPay如何计费？",
      answer:
        "公司秘书与薪资服务采用月费加每位员工计费的方式，依您的员工人数与所搭配的服务项目而定。经过简短的了解会议后，我们会为您提供确切报价——大多数中小企业能在一天内收到报价。",
    },
    {
      question: "预支薪资如何收费？",
      answer:
        "预支薪资绝不收取利息——每次提取仅收取单一固定手续费，依您所选方案通常介于RM2至RM5之间，可由公司作为员工福利承担，也可在提取时由员工自行支付。",
    },
    {
      question: "是否有设置费用？",
      answer: "公司秘书注册与薪资数据迁移，可能依复杂程度收取一次性设置费用——此费用一律事先确认，绝不会有意外收费。",
    },
    {
      question: "我们可以只从公司秘书服务开始吗？",
      answer: "可以。许多客户都是先从公司秘书与薪资服务开始，待招聘首批员工后，再加入人力资源门户与预支薪资功能。",
    },
  ],
  ms: [
    {
      question: "Bagaimana GajiPay dikenakan bayaran?",
      answer:
        "Setiausaha Syarikat dan Penggajian dikenakan bayaran sebagai retainer bulanan ditambah yuran setiap pekerja, berskala mengikut bilangan kakitangan dan berapa banyak perkhidmatan yang anda gabungkan. Kami akan berikan sebut harga tepat selepas panggilan penerokaan ringkas — kebanyakan PKS menerima harga dalam masa sehari.",
    },
    {
      question: "Bagaimana Advance Pay dikenakan bayaran?",
      answer:
        "Advance Pay tidak sekali-kali mengenakan faedah — ia adalah yuran pemprosesan rata setiap pengeluaran, biasanya dalam lingkungan RM2–5 bergantung pada pelan anda, sama ada ditanggung oleh syarikat anda sebagai faedah pekerja atau dibayar oleh pekerja semasa pengeluaran.",
    },
    {
      question: "Adakah terdapat yuran persediaan?",
      answer:
        "Penubuhan setiausaha syarikat dan migrasi penggajian mungkin dikenakan yuran persediaan sekali sahaja bergantung pada kerumitan — ini sentiasa disahkan terlebih dahulu, tidak pernah dibilkan secara mengejut.",
    },
    {
      question: "Bolehkah kami mulakan dengan Setiausaha Syarikat sahaja?",
      answer:
        "Boleh. Ramai pelanggan bermula dengan Setiausaha Syarikat dan Penggajian, kemudian menambah Portal HR dan Advance Pay sebaik sahaja mereka mengambil pekerja pertama.",
    },
  ],
};

export function getPricingTiers(locale: Locale): PricingTier[] {
  return tiersCopy[locale];
}

export function getPricingFaq(locale: Locale): PricingFaqItem[] {
  return faqCopy[locale];
}
