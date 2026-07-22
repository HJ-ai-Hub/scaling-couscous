import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed, Factory, Truck, ShieldCheck, HardHat } from "lucide-react";

import type { Locale } from "@/i18n/routing";

export interface Solution {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  painPoints: string[];
  outcomes: string[];
}

const icons: Record<string, LucideIcon> = {
  "retail-fnb": UtensilsCrossed,
  manufacturing: Factory,
  logistics: Truck,
  "security-services": ShieldCheck,
  construction: HardHat,
};

type SolutionCopy = Omit<Solution, "icon">;

const copy: Record<Locale, SolutionCopy[]> = {
  en: [
    {
      slug: "retail-fnb",
      name: "Retail & F&B",
      tagline: "Keep shift and outlet staff on payday, every day.",
      description:
        "High headcount, high turnover, and shift-based pay — retail and F&B chains feel cash-flow stress on the floor first. Advance Pay gives outlet staff a fair alternative to payday loans, while GajiPay's payroll keeps multi-outlet, multi-shift pay accurate.",
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
  ],
  zh: [
    {
      slug: "retail-fnb",
      name: "零售与餐饮业",
      tagline: "让轮班与门市员工每天都能安心迎接发薪日。",
      description:
        "高员工人数、高流动率、以班次计薪——零售与餐饮连锁企业往往最先在第一线感受到现金流压力。预支薪资为门市员工提供了发薪日贷款之外的公平选择，而GajiPay的薪资系统则确保多门市、多班次的薪资计算准确无误。",
      painPoints: [
        "各门市员工流动率偏高，部分原因是月中现金流压力所致",
        "以班次与时薪计算的薪资结构，一般薪资工具难以妥善处理",
        "人力资源团队需分身兼顾众多门市据点",
      ],
      outcomes: [
        "将预支薪资作为员工福利，降低门市与轮班员工的流动率",
        "薪资系统能正确处理班次津贴差异与多门市结构",
        "每个门市共用同一套人力资源门户，无需每间分店各自维护表格",
      ],
    },
    {
      slug: "manufacturing",
      name: "制造业",
      tagline: "工厂一线薪资与财务福利，妥善到位。",
      description:
        "加班费、轮班津贴，加上庞大的时薪员工群体，让制造业薪资计算格外复杂。GajiPay准确处理相关计算，并让生产线员工公平、透明地提取已经赚取的工资。",
      painPoints: [
        "复杂的加班费与轮班津贴计算",
        "庞大的时薪员工群体，较难享有传统银行服务",
        "考勤与薪资人工核对，容易出错",
      ],
      outcomes: [
        "每个周期都能准确计算加班费与津贴",
        "以预支薪资作为生产线员工的留任诱因",
        "考勤数据直接流入薪资系统——无需人工重复输入",
      ],
    },
    {
      slug: "logistics",
      name: "物流与配送",
      tagline: "专为分散、持续移动的员工团队而设计。",
      description:
        "骑手、司机与仓库员工鲜少坐在办公桌前。GajiPay以移动优先设计的人力资源门户与预支薪资，让他们随时随地都能使用，而薪资系统也能跟上多变的路线、班次与津贴安排。",
      painPoints: [
        "员工分散各处，与人力资源部门面对面接触的机会少",
        "多变的班次、路线与津贴结构",
        "员工财务缓冲薄弱，对现金流较为敏感",
      ],
      outcomes: [
        "移动优先的自助服务，让骑手与司机真正愿意使用",
        "以预支薪资缓解月中现金流缺口",
        "薪资系统能灵活适应多变的班次与津贴结构",
      ],
    },
    {
      slug: "security-services",
      name: "保安服务业",
      tagline: "多据点保安薪资管理，无需繁琐文书作业。",
      description:
        "保安公司需要管理分散在众多客户据点、人数庞大的保安人员。GajiPay将考勤、薪资与财务福利整合于同一平台，大幅减轻精简后勤团队的行政负担。",
      painPoints: [
        "保安人员分散于众多客户据点，难以集中追踪管理",
        "精简的后勤团队需管理规模庞大、不成比例的人力",
        "员工对发薪时间与现金流压力的流动率敏感度高",
      ],
      outcomes: [
        "跨所有据点的集中式考勤与薪资管理",
        "以预支薪资降低保安人员流动率",
        "公司秘书与合规事务与薪资一并处理",
      ],
    },
    {
      slug: "construction",
      name: "建筑与设施管理",
      tagline: "以项目为本的薪资方案，贴合项目导向的行业特性。",
      description:
        "建筑与设施管理行业以项目周期、外包团队及多变的现场津贴运作。GajiPay确保薪资合规无误，并让现场工人能公平提取已经赚取的工资。",
      painPoints: [
        "以项目为本、依赖外包的用工结构",
        "现场津贴与各项目间多变的薪酬安排",
        "员工较难享有传统金融服务",
      ],
      outcomes: [
        "薪资结构围绕项目与现场设置，而非仅按部门划分",
        "在项目里程碑之间，为现场团队提供预支薪资",
        "公司秘书与法定合规事务集中统一处理",
      ],
    },
  ],
  ms: [
    {
      slug: "retail-fnb",
      name: "Runcit & F&B",
      tagline: "Pastikan kakitangan shif dan outlet gembira setiap hari gaji.",
      description:
        "Bilangan kakitangan yang ramai, pusing ganti tinggi, dan gaji berasaskan shif — rangkaian runcit dan F&B merasai tekanan aliran tunai paling awal di peringkat operasi. Advance Pay memberikan kakitangan outlet alternatif yang adil berbanding pinjaman segera, manakala penggajian GajiPay memastikan bayaran pelbagai outlet dan pelbagai shif kekal tepat.",
      painPoints: [
        "Pusing ganti kakitangan yang tinggi merentasi outlet, sebahagiannya didorong oleh tekanan aliran tunai pertengahan bulan",
        "Struktur gaji berasaskan shif dan jam yang sukar ditangani oleh alat penggajian generik",
        "Pasukan HR terpaksa menguruskan terlalu banyak lokasi outlet",
      ],
      outcomes: [
        "Pusing ganti lebih rendah dalam kalangan kakitangan outlet dan shif dengan Advance Pay sebagai faedah",
        "Penggajian yang mengendalikan dengan betul kadar shif berbeza dan struktur pelbagai outlet",
        "Satu Portal HR untuk setiap outlet, bukan hamparan berasingan bagi setiap cawangan",
      ],
    },
    {
      slug: "manufacturing",
      name: "Pembuatan",
      tagline: "Penggajian lantai kilang dan kesejahteraan kewangan, dilaksanakan dengan betul.",
      description:
        "Kerja lebih masa, elaun shif, dan tenaga kerja bergaji jam yang ramai menjadikan penggajian pembuatan sememangnya kompleks. GajiPay mengendalikan pengiraan dengan tepat dan memberikan kakitangan pengeluaran akses yang adil dan telus kepada gaji yang telah mereka peroleh.",
      painPoints: [
        "Pengiraan kerja lebih masa dan elaun shif yang kompleks",
        "Tenaga kerja bergaji jam yang ramai dengan akses terhad kepada faedah perbankan konvensional",
        "Penyelarasan manual kehadiran-ke-penggajian yang terdedah kepada kesilapan",
      ],
      outcomes: [
        "Pengiraan kerja lebih masa dan elaun yang tepat, setiap kitaran",
        "Advance Pay sebagai penggerak pengekalan untuk kakitangan barisan pengeluaran",
        "Data kehadiran mengalir terus ke penggajian — tiada kemasukan semula secara manual",
      ],
    },
    {
      slug: "logistics",
      name: "Logistik & Penghantaran",
      tagline: "Dibina untuk tenaga kerja yang bertaburan dan sentiasa bergerak.",
      description:
        "Rider, pemandu dan kakitangan gudang jarang duduk di meja pejabat. Portal HR mudah-alih-dahulu dan Advance Pay GajiPay bertemu mereka di mana sahaja mereka berada, manakala penggajian terus selari dengan laluan, shif dan elaun yang berubah-ubah.",
      painPoints: [
        "Tenaga kerja bertaburan dengan sedikit masa bersemuka dengan HR",
        "Struktur shif, laluan dan elaun yang berubah-ubah",
        "Tenaga kerja sensitif aliran tunai dengan penampan kewangan yang nipis",
      ],
      outcomes: [
        "Layan diri mudah-alih-dahulu yang benar-benar digunakan oleh rider dan pemandu",
        "Advance Pay untuk melancarkan jurang aliran tunai pertengahan bulan",
        "Penggajian yang menyesuaikan diri dengan struktur shif dan elaun yang berubah-ubah",
      ],
    },
    {
      slug: "security-services",
      name: "Perkhidmatan Keselamatan",
      tagline: "Penggajian pengawal pelbagai tapak, tanpa kerja kertas.",
      description:
        "Firma keselamatan menguruskan bilangan pengawal yang besar dan bertaburan merentasi banyak tapak pelanggan. GajiPay menyatukan kehadiran, penggajian dan kesejahteraan kewangan dalam satu platform, mengurangkan beban pentadbiran pejabat sokongan yang kecil.",
      painPoints: [
        "Pengawal bertaburan merentasi banyak tapak pelanggan, sukar dijejaki secara berpusat",
        "Pasukan pejabat sokongan yang kecil menguruskan bilangan kakitangan yang besar secara tidak berkadar",
        "Sensitiviti pusing ganti yang tinggi terhadap masa bayaran dan tekanan aliran tunai",
      ],
      outcomes: [
        "Kehadiran dan penggajian berpusat merentasi setiap tapak",
        "Advance Pay untuk mengurangkan pusing ganti dalam kalangan kakitangan pengawalan",
        "Setiausaha syarikat dan pematuhan diuruskan bersama penggajian",
      ],
    },
    {
      slug: "construction",
      name: "Pembinaan & Fasiliti",
      tagline: "Penggajian berasaskan projek untuk industri berasaskan projek.",
      description:
        "Pengurusan pembinaan dan fasiliti beroperasi mengikut kitaran projek, kru subkontrak, dan elaun tapak yang berubah-ubah. GajiPay memastikan penggajian kekal patuh dan memberikan pekerja tapak akses yang adil kepada gaji yang telah mereka peroleh.",
      painPoints: [
        "Struktur tenaga kerja berasaskan projek dan subkontrak",
        "Elaun tapak dan gaji yang berubah-ubah merentasi projek",
        "Tenaga kerja dengan akses terhad kepada perkhidmatan kewangan konvensional",
      ],
      outcomes: [
        "Penggajian distrukturkan mengikut projek dan tapak, bukan sekadar jabatan",
        "Advance Pay untuk kru berasaskan tapak antara pencapaian projek",
        "Setiausaha syarikat dan pematuhan statutori diuruskan secara berpusat",
      ],
    },
  ],
};

export function getSolutions(locale: Locale): Solution[] {
  return copy[locale].map((s) => ({ ...s, icon: icons[s.slug] }));
}

export function getSolutionBySlug(locale: Locale, slug: string) {
  return getSolutions(locale).find((solution) => solution.slug === slug);
}
