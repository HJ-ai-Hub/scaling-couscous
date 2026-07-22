import type { Locale } from "@/i18n/routing";

// NOTE: GajiPay is pre-launch (Phase 0 pilot per the business strategy).
// Rather than fabricate customer testimonials that don't yet exist, this
// section frames the value proposition from each stakeholder's point of
// view. Swap in real, attributed customer quotes once the pilot cohort
// (Section 6 of the strategy doc) has gone live.

export interface Perspective {
  role: string;
  quote: string;
}

export interface MarketStat {
  value: string;
  label: string;
}

const perspectivesCopy: Record<Locale, Perspective[]> = {
  en: [
    {
      role: "For HR leads",
      quote:
        "One portal for leave, attendance and self-service — instead of a spreadsheet per outlet and a WhatsApp group for every query.",
    },
    {
      role: "For finance & founders",
      quote:
        "Payroll, statutory filing and company secretary compliance handled correctly every cycle, with a clear audit trail when you need one.",
    },
    {
      role: "For employees",
      quote:
        "Access to wages already earned, after the 15th, with a flat fee and no interest — a fair alternative to payday loans.",
    },
    {
      role: "For operations managers",
      quote:
        "Attendance-sensitive teams — retail, F&B, logistics, security — get a mobile-first tool their frontline staff actually open.",
    },
  ],
  zh: [
    {
      role: "致人力资源主管",
      quote: "一个门户即可处理请假、考勤与自助服务——不再需要每间门市一份表格，也不必为每个查询开一个WhatsApp群组。",
    },
    {
      role: "致财务与创办人",
      quote: "薪资处理、法定申报与公司秘书合规事务，每个周期都正确完成，需要时还有清晰的审计记录可查。",
    },
    {
      role: "致员工",
      quote: "可提取已赚取的工资，于每月15日之后开放，仅收取单一固定手续费、绝不收取利息——是发薪日贷款的公平替代方案。",
    },
    {
      role: "致营运经理",
      quote: "零售、餐饮、物流、保安等重视考勤的团队，都能获得一款一线员工真正愿意打开使用的移动优先工具。",
    },
  ],
  ms: [
    {
      role: "Untuk ketua HR",
      quote:
        "Satu portal untuk cuti, kehadiran dan layan diri — berbanding satu hamparan bagi setiap outlet dan satu kumpulan WhatsApp bagi setiap pertanyaan.",
    },
    {
      role: "Untuk kewangan & pengasas",
      quote:
        "Penggajian, pemfailan statutori dan pematuhan setiausaha syarikat dikendalikan dengan betul setiap kitaran, dengan jejak audit yang jelas apabila anda memerlukannya.",
    },
    {
      role: "Untuk pekerja",
      quote:
        "Akses kepada gaji yang telah diperoleh, selepas 15hb, dengan yuran rata dan tiada faedah — alternatif yang adil berbanding pinjaman gaji.",
    },
    {
      role: "Untuk pengurus operasi",
      quote:
        "Pasukan yang sensitif kepada kehadiran — runcit, F&B, logistik, keselamatan — mendapat alat mudah-alih dahulu yang benar-benar dibuka oleh kakitangan barisan hadapan mereka.",
    },
  ],
};

const industryStripCopy: Record<Locale, string[]> = {
  en: ["Retail & F&B", "Manufacturing", "Logistics & Delivery", "Security Services", "Construction & Facilities", "Healthcare Support"],
  zh: ["零售与餐饮", "制造业", "物流与配送", "保安服务", "建筑与设施", "医疗保健支援"],
  ms: ["Runcit & F&B", "Perkilangan", "Logistik & Penghantaran", "Perkhidmatan Keselamatan", "Pembinaan & Kemudahan", "Sokongan Penjagaan Kesihatan"],
};

const marketStatsCopy: Record<Locale, MarketStat[]> = {
  en: [
    { value: "97%", label: "of Malaysian businesses are MSMEs" },
    { value: "48%", label: "of national employment sits inside MSMEs" },
    { value: "RM652B", label: "MSME contribution to GDP in 2024" },
  ],
  zh: [
    { value: "97%", label: "的马来西亚企业属于中小微企业" },
    { value: "48%", label: "的全国就业岗位来自中小微企业" },
    { value: "RM652B", label: "为中小微企业2024年对GDP的贡献" },
  ],
  ms: [
    { value: "97%", label: "perniagaan Malaysia adalah PMKS" },
    { value: "48%", label: "guna tenaga negara berada dalam PMKS" },
    { value: "RM652B", label: "sumbangan PMKS kepada KDNK pada 2024" },
  ],
};

export function getPerspectives(locale: Locale): Perspective[] {
  return perspectivesCopy[locale];
}

export function getIndustryStrip(locale: Locale): string[] {
  return industryStripCopy[locale];
}

export function getMarketStats(locale: Locale): MarketStat[] {
  return marketStatsCopy[locale];
}
