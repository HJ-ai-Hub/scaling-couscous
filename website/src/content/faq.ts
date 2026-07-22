import type { Locale } from "@/i18n/routing";

export interface FaqItem {
  question: string;
  answer: string;
}

const copy: Record<Locale, FaqItem[]> = {
  en: [
    {
      question: "Is Advance Pay a loan?",
      answer:
        "No. Advance Pay is Earned Wage Access — employees draw down wages they have already earned for work already performed. There's no interest, no credit check, and no debt. GajiPay is not a lender and does not hold a moneylending licence.",
    },
    {
      question: "How is this legal without a moneylending licence?",
      answer:
        "Advance Pay is structured within the exemption under the Moneylenders Act 1951 for employer-facilitated financial assistance to employees, and follows Sections 22 and 27 of the Employment Act 1955 — advances are capped at wages already earned, and no interest is ever charged, only a flat processing fee.",
    },
    {
      question: "How much of their wage can an employee access?",
      answer:
        "A conservative share of wages already earned in the current cycle, available after the 15th of the month — never more than has actually been worked for, and reconciled automatically against payroll on payday.",
    },
    {
      question: "Do you replace our existing payroll provider?",
      answer:
        "You can adopt GajiPay Payroll fully, or start with the HR Portal and Company Secretary services and bring Advance Pay online once your payroll data is running on GajiPay. Our onboarding team handles migration either way.",
    },
    {
      question: "How is our payroll and salary data protected?",
      answer:
        "All payroll and banking data is encrypted at rest and in transit, access is role-based and logged, and our data handling follows the Personal Data Protection Act 2010 by design — not as an afterthought.",
    },
    {
      question: "Who actually disburses Advance Pay funds?",
      answer:
        "Disbursement runs through a licensed banking or e-money partner, settled against the employer's payroll — never from GajiPay's own balance sheet.",
    },
    {
      question: "Do you handle EPF, SOCSO, EIS and PCB?",
      answer:
        "Yes — GajiPay Payroll natively calculates and files EPF, SOCSO, EIS and PCB/MTD, and generates EA forms automatically at year end.",
    },
    {
      question: "What if we only need Company Secretary services?",
      answer:
        "That's a natural place to start. Every Sdn Bhd needs an SSM-authorised company secretary — many clients begin there and add Payroll, HR Portal and Advance Pay as they hire.",
    },
  ],
  zh: [
    {
      question: "预支薪资是贷款吗？",
      answer:
        "不是。预支薪资属于「已赚工资提取」——员工提取的是已完成工作所赚取的工资。不收取利息、不进行信用审查，也不会产生债务。GajiPay并非放贷机构，也未持有放贷执照。",
    },
    {
      question: "没有放贷执照，这怎么合法？",
      answer:
        "预支薪资依据《1951年放债人法令》中针对雇主协助员工财务援助的豁免条款设立，并遵循《1955年雇佣法令》第22及27条——预支金额封顶于已赚工资，绝不收取利息，只收取单一固定手续费。",
    },
    {
      question: "员工最多可以提取多少工资？",
      answer:
        "在本周期内已赚工资中一个保守比例，于每月15日之后开放提取——绝不会超过实际已完成工作对应的金额，并在发薪日自动与薪资系统核对。",
    },
    {
      question: "会取代我们现有的薪资服务商吗？",
      answer:
        "您可以完全采用GajiPay薪资服务，也可以先从人力资源门户与公司秘书服务开始，待薪资数据迁移至GajiPay系统后再启用预支薪资。无论哪种方式，我们的入职团队都会协助处理迁移工作。",
    },
    {
      question: "我们的薪资与工资数据如何受到保护？",
      answer:
        "所有薪资与银行数据在静止及传输过程中均经过加密，访问权限基于角色分配并留有记录，我们的数据处理方式从设计之初即遵循《2010年个人数据保护法令》，而非事后补救。",
    },
    {
      question: "预支薪资的资金究竟由谁发放？",
      answer: "资金发放通过持牌银行或电子货币合作伙伴处理，并与雇主薪资结算——绝非来自GajiPay自身的资产负债表。",
    },
    {
      question: "你们能处理EPF、SOCSO、EIS与PCB吗？",
      answer: "可以——GajiPay薪资系统原生支持EPF、SOCSO、EIS及PCB/MTD的计算与申报，并在年终自动生成EA表格。",
    },
    {
      question: "如果我们只需要公司秘书服务呢？",
      answer:
        "这是很自然的起点。每家私人有限公司都需要一位SSM认证的公司秘书——许多客户都是从这里开始，随后再随着招聘增加而加入薪资服务、人力资源门户与预支薪资。",
    },
  ],
  ms: [
    {
      question: "Adakah Advance Pay satu pinjaman?",
      answer:
        "Tidak. Advance Pay adalah Akses Gaji Yang Diperoleh — pekerja mengeluarkan gaji yang telah mereka peroleh untuk kerja yang telah dilaksanakan. Tiada faedah, tiada semakan kredit, dan tiada hutang. GajiPay bukan pemberi pinjam dan tidak memiliki lesen pemberi pinjam wang.",
    },
    {
      question: "Bagaimana ini sah tanpa lesen pemberi pinjam wang?",
      answer:
        "Advance Pay distrukturkan dalam pengecualian di bawah Akta Pemberi Pinjam Wang 1951 bagi bantuan kewangan majikan kepada pekerja, dan mematuhi Seksyen 22 dan 27 Akta Kerja 1955 — pendahuluan dihadkan kepada gaji yang telah diperoleh, dan tiada faedah sama sekali dikenakan, hanya satu yuran pemprosesan rata.",
    },
    {
      question: "Berapa banyak gaji yang boleh diakses oleh pekerja?",
      answer:
        "Peratusan yang berhemat daripada gaji yang telah diperoleh dalam kitaran semasa, tersedia selepas 15hb setiap bulan — tidak akan melebihi apa yang benar-benar telah dikerjakan, dan diselaraskan secara automatik dengan penggajian pada hari gaji.",
    },
    {
      question: "Adakah anda menggantikan pembekal penggajian kami yang sedia ada?",
      answer:
        "Anda boleh menggunakan Penggajian GajiPay sepenuhnya, atau bermula dengan Portal HR dan perkhidmatan Setiausaha Syarikat serta mengaktifkan Advance Pay sebaik sahaja data penggajian anda berjalan di atas GajiPay. Pasukan onboarding kami mengendalikan migrasi dalam kedua-dua cara.",
    },
    {
      question: "Bagaimana data penggajian dan gaji kami dilindungi?",
      answer:
        "Semua data penggajian dan perbankan disulitkan semasa disimpan dan dihantar, akses adalah berasaskan peranan dan direkodkan, dan pengendalian data kami mematuhi Akta Perlindungan Data Peribadi 2010 sejak dari reka bentuk — bukan sebagai renungan kemudian.",
    },
    {
      question: "Siapa sebenarnya yang membayar dana Advance Pay?",
      answer:
        "Pembayaran dijalankan melalui rakan kongsi perbankan atau e-wang berlesen, diselaraskan dengan penggajian majikan — bukan daripada kunci kira-kira GajiPay sendiri.",
    },
    {
      question: "Adakah anda mengendalikan KWSP, PERKESO, SIP dan PCB?",
      answer:
        "Ya — Penggajian GajiPay mengira dan memfailkan KWSP, PERKESO, SIP dan PCB/MTD secara native, serta menjana borang EA secara automatik pada penghujung tahun.",
    },
    {
      question: "Bagaimana jika kami hanya memerlukan perkhidmatan Setiausaha Syarikat?",
      answer:
        "Itu adalah permulaan yang sesuai. Setiap Sdn Bhd memerlukan setiausaha syarikat yang diberi kuasa SSM — ramai pelanggan bermula di situ dan menambah Penggajian, Portal HR dan Advance Pay apabila mereka mengambil pekerja.",
    },
  ],
};

export function getHomeFaq(locale: Locale): FaqItem[] {
  return copy[locale];
}
