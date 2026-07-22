import type { LucideIcon } from "lucide-react";
import { Wallet, FileSpreadsheet, Users, Stamp, Calculator } from "lucide-react";

import type { Locale } from "@/i18n/routing";

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

const icons: Record<string, LucideIcon> = {
  "earned-wage-access": Wallet,
  payroll: FileSpreadsheet,
  "hr-portal": Users,
  "company-secretary": Stamp,
  "audit-accounting": Calculator,
};

type ProductCopy = Omit<Product, "icon">;

const copy: Record<Locale, ProductCopy[]> = {
  en: [
    {
      slug: "earned-wage-access",
      name: "Advance Pay — Earned Wage Access",
      shortName: "Advance Pay (EWA)",
      eyebrow: "Flagship product",
      tagline: "Wages your people have already earned, available before payday.",
      description:
        "Advance Pay lets employees draw down a portion of wages they've already earned during the current pay cycle — after the 15th of each month — without touching your cash flow or your payroll cut-off. It is Earned Wage Access, not a loan: no interest, no credit check, no debt.",
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
  ],
  zh: [
    {
      slug: "earned-wage-access",
      name: "预支薪资 — 已赚工资提取服务",
      shortName: "预支薪资（EWA）",
      eyebrow: "旗舰产品",
      tagline: "员工已经赚取的工资，发薪日前即可支取。",
      description:
        "预支薪资让员工可以在每月15日之后，提取本薪资周期内已经赚取的部分工资——完全不影响您的现金流或发薪时间表。这是「已赚工资提取」（Earned Wage Access），不是贷款：无利息、无信用审查、不产生债务。",
      bullets: [
        "员工最多可提取迄今已赚工资中一个保守比例——绝不会超过已完成工作对应的金额",
        "每次提取仅收取单一固定手续费，绝无利息",
        "基于GajiPay自有薪资系统中真实、已核对的考勤与薪资数据运作，而非事后拼凑估算",
        "资金通过持牌银行合作伙伴发放，绝非来自GajiPay自身资产负债表",
        "雇主可选择承担手续费作为员工福利，或由员工自愿选用并自行支付",
      ],
      howItWorks: [
        {
          title: "薪资照常运作",
          description: "GajiPay的薪资引擎持续追踪考勤与薪酬，确保每位员工的已赚工资余额准确且实时更新。",
        },
        {
          title: "员工可于15日后提出申请",
          description: "过了月中，符合资格的员工即可通过GajiPay应用程序申请预支，金额严格控制在已赚工资范围内。",
        },
        {
          title: "资金到账，手续费固定",
          description: "资金通过我们的银行合作伙伴在数分钟内发放，只收取单一固定手续费——绝无利息，也无需信用审查。",
        },
        {
          title: "发薪日自动核对",
          description: "发薪日当天，预支金额会自动从实发工资中扣除，并清楚列示在工资单上，人力资源部门无需手动核对。",
        },
      ],
      faq: [
        {
          question: "这是贷款吗？",
          answer:
            "不是。预支薪资属于「已赚工资提取」——员工提取的是已完成工作所赚取的工资，而非预支未来收入。不收取利息、不进行信用审查，也不会产生任何债务。",
        },
        {
          question: "GajiPay需要放贷执照吗？",
          answer:
            "不需要。此服务依据《1951年放债人法令》中针对雇主协助员工的财务援助豁免条款设立，并遵循《1955年雇佣法令》第22及27条——预支金额严格封顶于已赚工资，且不收取利息。",
        },
        {
          question: "资金从哪里来？",
          answer: "资金发放通过持牌银行或电子货币合作伙伴处理，并与雇主薪资进行结算——绝非来自GajiPay自身的资产负债表。",
        },
      ],
    },
    {
      slug: "payroll",
      name: "薪资服务",
      shortName: "薪资管理",
      eyebrow: "法定核心服务",
      tagline: "完整的马来西亚法定薪资处理，每个周期都准确无误。",
      description:
        "公积金（EPF）、社会保险（SOCSO）、就业保险（EIS）、预扣所得税（PCB/MTD）及EA表格——每月计算、申报，随时可供审计。GajiPay的薪资引擎同时也是让预支薪资精确到令吉的数据来源。",
      bullets: [
        "原生支持EPF、SOCSO、EIS及PCB/MTD计算，法定费率变动时自动更新",
        "年终自动生成EA表格",
        "支持每位员工多种薪资结构、津贴与扣款项目",
        "完整审计追踪记录，随时应对法定检查",
        "数据直接对接人力资源门户与预支薪资系统——一次输入，全程共用",
      ],
      howItWorks: [
        { title: "员工资料导入", description: "可从电子表格或现有服务商导入资料，无需强制中断现有流程。" },
        { title: "每月运行薪资", description: "考勤、请假与报销数据自动流入系统；只需几次点击即可审批与发放。" },
        { title: "法定申报自动处理", description: "EPF、SOCSO、EIS及PCB申报表将自动生成并代为提交。" },
        { title: "工资单与EA表格", description: "员工即时获得电子工资单；年终EA表格提前备妥，无需手忙脚乱。" },
      ],
      faq: [
        {
          question: "可以协助我们从现有薪资服务商迁移吗？",
          answer: "可以——我们的入职团队会处理数据迁移，并在正式切换前并行运行一个周期，确保万无一失。",
        },
        {
          question: "是否支持多种薪资结构？",
          answer: "支持，包括轮班津贴、佣金结构，以及您所属行业特有的各类津贴。",
        },
      ],
    },
    {
      slug: "hr-portal",
      name: "人力资源门户",
      shortName: "人力资源门户",
      eyebrow: "员工的一站式平台",
      tagline: "请假、考勤与员工自助服务，没有大型企业系统的臃肿复杂。",
      description:
        "一套简洁高效的人力资源记录系统，涵盖请假、考勤与员工自助服务——正是让预支薪资的已赚工资余额实时精准的数据引擎。",
      bullets: [
        "请假与考勤管理，附带审批流程",
        "员工自助服务：工资单、报销申请、个人资料",
        "一目了然的组织架构与团队结构",
        "移动优先设计，让轮班与一线员工真正愿意使用",
        "考勤数据直接对接薪资系统与预支薪资资格审核",
      ],
      howItWorks: [
        { title: "设置您的组织架构", description: "部门、汇报关系与请假政策，一次会话即可完成配置。" },
        { title: "员工自助操作", description: "请假申请、报销与工资单查询，从人力资源部门的邮箱转移到应用程序上。" },
        { title: "考勤数据自动流转", description: "打卡记录与已批准的请假会自动同步至薪资系统与预支薪资资格审核。" },
      ],
      faq: [
        {
          question: "使用人力资源门户是否必须搭配薪资服务？",
          answer: "人力资源门户可单独使用，但搭配GajiPay薪资服务后，才能为您的团队解锁精准、实时的预支薪资资格审核。",
        },
      ],
    },
    {
      slug: "company-secretary",
      name: "公司秘书服务",
      shortName: "公司秘书",
      eyebrow: "从第一天起就合规",
      tagline: "SSM认证公司秘书服务，全面数字化。",
      description:
        "每家私人有限公司（Sdn Bhd）都必须在注册成立后30天内委任公司秘书。GajiPay将SSM认证的秘书服务，与现代化、以电子签署为先的客户体验相结合——收费固定透明，绝无意外。",
      bullets: [
        "公司注册及SSM认证秘书委任",
        "年度报表申报与法定登记册维护",
        "董事会决议与电子签署，无需纸本作业",
        "固定透明的服务费用",
        "当您开始聘请首批员工时，可直接无缝对接薪资服务与人力资源门户",
      ],
      howItWorks: [
        { title: "注册新公司或转移过来", description: "无论是新公司注册，还是从现有秘书公司平顺过渡，我们都能处理。" },
        { title: "自动保持合规", description: "合规日历将为您追踪年度报表、决议案与各项法定期限。" },
        { title: "电子签署", description: "董事会决议及法定文件均以电子方式签署——无需再跑公证处。" },
      ],
      faq: [
        {
          question: "可以接手我们现有的公司秘书服务吗？",
          answer: "可以，我们会处理交接事宜，并在规定期限内通知SSM变更。",
        },
      ],
    },
    {
      slug: "audit-accounting",
      name: "审计与会计转介服务",
      shortName: "审计与会计",
      eyebrow: "值得信赖的转介网络",
      tagline: "持牌审计与会计合作伙伴，一次引荐即可对接。",
      description:
        "GajiPay并未持有审计或会计执照，也无意持有——我们维护一个经过审核的持牌审计事务所与执业会计师转介网络，满足您的法定审计与会计需求。",
      bullets: [
        "根据您的行业与规模，引荐匹配的持牌审计事务所",
        "转介执业会计师，处理管理账目与税务申报",
        "杜绝利益冲突——GajiPay仅赚取转介费，绝不会为我们未实际执行的工作收取服务费",
        "配合您的财政年结与法定申报期限统一协调时间",
      ],
      howItWorks: [
        { title: "告诉我们您的需求", description: "法定审计、税务申报或管理账目——请告知我们您的财政年结日期。" },
        { title: "我们为您引荐", description: "我们会为您匹配一家适合您规模与行业的持牌合作事务所。" },
        { title: "您可直接接洽", description: "服务内容与费用由您与该持牌事务所直接协商确定。" },
      ],
      faq: [
        {
          question: "GajiPay会亲自执行审计工作吗？",
          answer: "不会——GajiPay并非持牌审计或会计事务所。我们会将您转介给经过审核、独立持牌的合作伙伴。",
        },
      ],
    },
  ],
  ms: [
    {
      slug: "earned-wage-access",
      name: "Advance Pay — Akses Gaji Yang Diperoleh",
      shortName: "Advance Pay (EWA)",
      eyebrow: "Produk unggulan",
      tagline: "Gaji yang telah diperoleh pekerja anda, boleh diakses sebelum hari gaji.",
      description:
        "Advance Pay membolehkan pekerja mengeluarkan sebahagian daripada gaji yang telah mereka peroleh dalam kitaran gaji semasa — selepas 15hb setiap bulan — tanpa menjejaskan aliran tunai atau tarikh cut-off penggajian syarikat anda. Ini adalah Akses Gaji Yang Diperoleh (Earned Wage Access), bukan pinjaman: tiada faedah, tiada semakan kredit, tiada hutang.",
      bullets: [
        "Pekerja boleh mengakses sehingga peratusan tertentu (secara berhemat) daripada gaji yang telah diperoleh setakat ini — tidak akan melebihi apa yang telah dikerjakan",
        "Satu yuran pemprosesan rata setiap pengeluaran. Tiada faedah, sama sekali.",
        "Beroperasi berdasarkan data kehadiran dan penggajian sebenar yang telah disemak daripada enjin penggajian GajiPay sendiri — bukan anggaran tampalan",
        "Dibayar melalui rakan kongsi perbankan berlesen, bukan daripada kunci kira-kira GajiPay sendiri",
        "Majikan boleh menanggung yuran ini sebagai faedah pekerja, atau membenarkan pekerja memilih sendiri dan membayarnya",
      ],
      howItWorks: [
        {
          title: "Penggajian berjalan seperti biasa",
          description:
            "Enjin penggajian GajiPay menjejak kehadiran dan pendapatan secara berterusan, supaya setiap pekerja mempunyai baki gaji-diperoleh yang tepat dan terkini.",
        },
        {
          title: "Pekerja memohon selepas 15hb",
          description:
            "Selepas melepasi pertengahan bulan, pekerja yang layak boleh memohon pendahuluan melalui aplikasi GajiPay, dihadkan dengan ketat dalam lingkungan gaji yang telah diperoleh.",
        },
        {
          title: "Dana tiba, yuran tetap rata",
          description:
            "Dana dibayar melalui rakan perbankan kami dalam masa beberapa minit. Satu yuran rata dikenakan — tiada faedah, tiada penilaian kredit.",
        },
        {
          title: "Diselaraskan secara automatik pada hari gaji",
          description:
            "Pada hari gaji, jumlah pendahuluan ditolak secara automatik daripada gaji bersih dan dipaparkan dengan telus pada slip gaji. Tiada penyelarasan manual diperlukan oleh pihak HR.",
        },
      ],
      faq: [
        {
          question: "Adakah ini satu pinjaman?",
          answer:
            "Tidak. Advance Pay adalah Akses Gaji Yang Diperoleh — pekerja mengeluarkan gaji yang telah mereka peroleh untuk kerja yang telah dilaksanakan, bukan meminjam daripada pendapatan masa hadapan. Tiada faedah, tiada semakan kredit, dan tiada hutang yang diwujudkan.",
        },
        {
          question: "Perlukah GajiPay memiliki lesen pemberi pinjam wang?",
          answer:
            "Tidak. Perkhidmatan ini distrukturkan dalam pengecualian di bawah Akta Pemberi Pinjam Wang 1951 bagi bantuan kewangan majikan kepada pekerja, dan mematuhi Seksyen 22 dan 27 Akta Kerja 1955 — pendahuluan dihadkan kepada gaji yang telah diperoleh sahaja, dan tiada faedah dikenakan.",
        },
        {
          question: "Dari mana datangnya wang tersebut?",
          answer:
            "Pembayaran dijalankan melalui rakan kongsi perbankan atau e-wang berlesen, diselaraskan dengan penggajian majikan — bukan daripada kunci kira-kira GajiPay sendiri.",
        },
      ],
    },
    {
      slug: "payroll",
      name: "Perkhidmatan Penggajian",
      shortName: "Penggajian",
      eyebrow: "Teras statutori",
      tagline: "Penggajian statutori Malaysia yang lengkap, dijalankan dengan betul setiap kitaran.",
      description:
        "KWSP, PERKESO, SIP, PCB/MTD dan borang EA — dikira, difailkan dan sedia untuk audit setiap bulan. Enjin penggajian GajiPay juga merupakan sumber data yang menjadikan Advance Pay tepat hingga ke sen.",
      bullets: [
        "Pengiraan KWSP, PERKESO, SIP dan PCB/MTD secara native, dikemas kini mengikut perubahan kadar statutori",
        "Penjanaan borang EA secara automatik pada penghujung tahun",
        "Pelbagai struktur gaji, elaun dan potongan bagi setiap pekerja",
        "Jejak audit yang lengkap, sedia untuk pemeriksaan statutori",
        "Saluran data terus ke Portal HR dan Advance Pay — masukkan data sekali sahaja",
      ],
      howItWorks: [
        { title: "Daftar masuk pekerja anda", description: "Import daripada hamparan atau pembekal semasa anda — tiada peralihan drastik diperlukan." },
        { title: "Jalankan penggajian bulanan", description: "Kehadiran, cuti dan tuntutan mengalir masuk secara automatik; luluskan dan lepaskan dengan beberapa klik sahaja." },
        { title: "Pemfailan statutori diuruskan", description: "Penyerahan KWSP, PERKESO, SIP dan PCB dijana dan difailkan bagi pihak anda." },
        { title: "Slip gaji dan borang EA", description: "Pekerja menerima slip gaji digital dengan segera; borang EA sedia pada penghujung tahun tanpa tergesa-gesa." },
      ],
      faq: [
        {
          question: "Bolehkah anda pindahkan kami daripada pembekal penggajian semasa?",
          answer: "Boleh — pasukan onboarding kami mengendalikan migrasi data dan menjalankan kitaran selari sebelum peralihan supaya tiada apa-apa terlepas pandang.",
        },
        {
          question: "Adakah anda menyokong pelbagai struktur gaji?",
          answer: "Ya, termasuk kadar shif berbeza, struktur komisen, dan elaun khusus mengikut industri anda.",
        },
      ],
    },
    {
      slug: "hr-portal",
      name: "Portal HR",
      shortName: "Portal HR",
      eyebrow: "Satu rumah untuk pekerja anda",
      tagline: "Cuti, kehadiran dan layan diri pekerja, tanpa kerumitan sistem korporat besar.",
      description:
        "Sistem rekod HR yang kemas dan pantas untuk cuti, kehadiran, dan layan diri pekerja — enjin data yang menjadikan baki gaji-diperoleh Advance Pay tepat secara masa nyata.",
      bullets: [
        "Pengurusan cuti dan kehadiran dengan aliran kerja kelulusan",
        "Layan diri pekerja: slip gaji, tuntutan, butiran peribadi",
        "Carta organisasi dan struktur pasukan sepintas lalu",
        "Reka bentuk mudah alih dahulu, supaya kakitangan shif dan lapangan benar-benar menggunakannya",
        "Data kehadiran mengalir terus ke penggajian dan kelayakan Advance Pay",
      ],
      howItWorks: [
        { title: "Sediakan organisasi anda", description: "Jabatan, struktur pelaporan dan polisi cuti, dikonfigurasi dalam satu sesi sahaja." },
        { title: "Pekerja layan diri sendiri", description: "Permohonan cuti, tuntutan dan akses slip gaji beralih daripada peti mel HR ke aplikasi." },
        { title: "Kehadiran mengalir terus", description: "Rekod masuk kerja dan cuti yang diluluskan disegerakkan secara automatik ke penggajian dan kelayakan Advance Pay." },
      ],
      faq: [
        {
          question: "Perlukah kami Penggajian untuk menggunakan Portal HR?",
          answer: "Portal HR berfungsi dengan baik secara bersendirian, tetapi menggandingkannya dengan Penggajian GajiPay yang membuka kelayakan Advance Pay yang tepat secara masa nyata untuk pasukan anda.",
        },
      ],
    },
    {
      slug: "company-secretary",
      name: "Perkhidmatan Setiausaha Syarikat",
      shortName: "Setiausaha Syarikat",
      eyebrow: "Statutori, sejak hari pertama",
      tagline: "Perkhidmatan setiausaha syarikat yang diberi kuasa SSM, digital dahulu.",
      description:
        "Setiap Sdn Bhd memerlukan setiausaha syarikat dalam masa 30 hari selepas penubuhan. GajiPay menggandingkan perkhidmatan setiausaha yang diberi kuasa SSM dengan pengalaman pelanggan moden yang mengutamakan e-tandatangan — yuran rata, tiada kejutan.",
      bullets: [
        "Penubuhan syarikat dan pelantikan setiausaha yang diberi kuasa SSM",
        "Pemfailan pulangan tahunan dan penyelenggaraan daftar statutori",
        "Resolusi lembaga pengarah dan e-tandatangan, tiada dokumen fizikal diperlukan",
        "Harga retainer yang rata dan telus",
        "Peralihan terus ke Penggajian dan Portal HR sebaik sahaja anda mengambil pekerja pertama",
      ],
      howItWorks: [
        { title: "Tubuhkan syarikat atau pindah masuk", description: "Penubuhan syarikat baharu, atau peralihan lancar daripada firma setiausaha semasa anda." },
        { title: "Kekal patuh secara automatik", description: "Kalendar pematuhan menjejak pulangan tahunan, resolusi, dan tarikh akhir statutori untuk anda." },
        { title: "Tandatangan secara digital", description: "Resolusi lembaga pengarah dan dokumen statutori ditandatangani secara elektronik — tiada lagi perjalanan ke pesuruhjaya sumpah." },
      ],
      faq: [
        {
          question: "Bolehkah anda mengambil alih daripada setiausaha syarikat kami yang sedia ada?",
          answer: "Boleh, kami mengendalikan peralihan dan memaklumkan SSM tentang perubahan tersebut dalam tempoh masa yang dikehendaki.",
        },
      ],
    },
    {
      slug: "audit-accounting",
      name: "Rujukan Audit & Perakaunan",
      shortName: "Audit & Perakaunan",
      eyebrow: "Rangkaian rujukan yang dipercayai",
      tagline: "Rakan kongsi audit dan perakaunan berlesen, hanya sejauh satu pengenalan mesra.",
      description:
        "GajiPay tidak memegang lesen audit atau perakaunan dan tidak akan sekali-kali — sebaliknya, kami menyelenggara rangkaian rujukan firma audit berlesen dan akauntan bertauliah yang disemak teliti untuk keperluan audit statutori dan perakaunan anda.",
      bullets: [
        "Pengenalan mesra kepada firma audit berlesen yang sepadan dengan industri dan saiz syarikat anda",
        "Rujukan akauntan bertauliah untuk akaun pengurusan dan pemfailan cukai",
        "Tiada konflik kepentingan — GajiPay hanya memperoleh yuran rujukan, tidak sekali-kali yuran perkhidmatan untuk kerja yang tidak kami laksanakan",
        "Penyelarasan masa dengan penghujung tahun kewangan dan tarikh akhir pemfailan statutori anda",
      ],
      howItWorks: [
        { title: "Beritahu kami keperluan anda", description: "Audit statutori, pemfailan cukai, atau akaun pengurusan — maklumkan kepada kami tarikh penghujung tahun kewangan anda." },
        { title: "Kami membuat pengenalan", description: "Kami memadankan anda dengan firma rakan kongsi berlesen yang sesuai dengan saiz dan industri anda." },
        { title: "Anda berurusan terus", description: "Penglibatan dan yuran dipersetujui terus antara anda dan firma berlesen tersebut." },
      ],
      faq: [
        {
          question: "Adakah GajiPay menjalankan audit itu sendiri?",
          answer: "Tidak — GajiPay bukan firma audit atau perakaunan berlesen. Kami merujuk anda kepada rakan kongsi yang disemak teliti dan berlesen secara berasingan.",
        },
      ],
    },
  ],
};

export function getProducts(locale: Locale): Product[] {
  return copy[locale].map((p) => ({ ...p, icon: icons[p.slug] }));
}

export function getProductBySlug(locale: Locale, slug: string) {
  return getProducts(locale).find((product) => product.slug === slug);
}
