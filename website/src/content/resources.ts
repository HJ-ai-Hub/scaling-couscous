import type { Locale } from "@/i18n/routing";

export interface ResourceSection {
  heading?: string;
  paragraphs: string[];
}

export interface Resource {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  sections: ResourceSection[];
}

const resourcesCopy: Record<Locale, Resource[]> = {
  en: [
    {
      slug: "is-earned-wage-access-legal-in-malaysia",
      title: "Is Earned Wage Access legal in Malaysia without a moneylending licence?",
      excerpt:
        "Short answer: yes, when it's structured correctly. Here's the legal basis Earned Wage Access providers in Malaysia rely on.",
      category: "Compliance",
      readTime: "5 min read",
      sections: [
        {
          paragraphs: [
            "Earned Wage Access (EWA) lets employees draw down wages they've already earned before their scheduled payday. Because money changes hands early, it's a fair question: does an EWA provider need a moneylending licence in Malaysia?",
            "For a well-structured EWA product, the answer is no — and the legal basis is worth understanding if you're evaluating a provider for your company.",
          ],
        },
        {
          heading: "The Moneylenders Act 1951 exemption",
          paragraphs: [
            "The Moneylenders Act 1951 excludes from its scope arrangements where an employer provides financial assistance exclusively to its own employees, on a non-profit basis or at a reasonable fee — not interest. This is the exemption EWA providers structure their product around: the employer is facilitating early access to wages already earned by its own staff, not making a loan to a member of the public.",
          ],
        },
        {
          heading: "The Employment Act 1955 guardrails",
          paragraphs: [
            "Two sections of the Employment Act 1955 set the boundaries. Section 22(1) prohibits an employer from advancing wages beyond what has already been earned — meaning a properly built EWA product can never let an employee access more than they've actually worked for. Section 27 prohibits charging interest on a salary advance — which is why every credible EWA provider in Malaysia charges a flat processing fee, never interest.",
          ],
        },
        {
          heading: "What this means in practice",
          paragraphs: [
            "A compliant EWA product will: cap advances strictly at wages already earned, charge a flat fee rather than interest, and structure the employer as the party facilitating the assistance — with the EWA provider acting as the technology and servicing layer, not a direct lender to the public. If a provider can't clearly explain how their product fits this structure, that's worth asking about before you sign up.",
          ],
        },
      ],
    },
    {
      slug: "epf-socso-eis-pcb-employer-guide",
      title: "EPF, SOCSO, EIS and PCB: a quick guide for new employers",
      excerpt:
        "Four acronyms, one payroll cycle. Here's what each statutory contribution actually covers, and who's responsible for what.",
      category: "Payroll",
      readTime: "6 min read",
      sections: [
        {
          paragraphs: [
            "If you've just hired your first employee in Malaysia, four acronyms will show up on every payslip: EPF, SOCSO, EIS and PCB. Here's what each one means, in plain terms.",
          ],
        },
        {
          heading: "EPF (Employees Provident Fund)",
          paragraphs: [
            "A retirement savings scheme. Both employer and employee contribute a percentage of monthly wages, managed by the Employees Provident Fund (KWSP). Rates vary by employee age and citizenship status.",
          ],
        },
        {
          heading: "SOCSO (PERKESO)",
          paragraphs: [
            "Social security contributions covering employment injury and invalidity schemes, administered by PERKESO. Both employer and employee contribute, with the employer's share typically larger.",
          ],
        },
        {
          heading: "EIS (Employment Insurance System)",
          paragraphs: [
            "A smaller, separate contribution that funds support for employees who lose their jobs — job search allowances, training, and career counselling — administered alongside SOCSO.",
          ],
        },
        {
          heading: "PCB / MTD (Monthly Tax Deduction)",
          paragraphs: [
            "Potongan Cukai Bulanan — the mechanism by which income tax is deducted from an employee's salary each month and remitted to LHDN (the Inland Revenue Board), so employees aren't left with one large tax bill at year end.",
          ],
        },
        {
          heading: "Why this matters for your payroll setup",
          paragraphs: [
            "Rates and thresholds for all four change periodically, and getting them wrong creates real statutory risk. This is exactly why GajiPay Payroll calculates EPF, SOCSO, EIS and PCB natively, rather than as a bolt-on spreadsheet formula someone forgot to update.",
          ],
        },
      ],
    },
    {
      slug: "how-to-appoint-a-company-secretary-in-malaysia",
      title: "How to appoint a company secretary in Malaysia (and what it costs)",
      excerpt:
        "Every Sdn Bhd needs one within 30 days of incorporation. Here's what the role actually covers, and typical market pricing.",
      category: "Company Secretary",
      readTime: "4 min read",
      sections: [
        {
          paragraphs: [
            "Under the Companies Act 2016, every company incorporated in Malaysia must appoint at least one company secretary within 30 days of incorporation, and notify the Companies Commission of Malaysia (SSM) within 14 days of that appointment.",
          ],
        },
        {
          heading: "Who can be a company secretary",
          paragraphs: [
            "The secretary must be a natural person, ordinarily resident in Malaysia, and qualified under Section 235 of the Companies Act 2016 — typically a member of a prescribed professional body or licensed by SSM directly.",
          ],
        },
        {
          heading: "What the role actually covers",
          paragraphs: [
            "Beyond the initial appointment, a company secretary maintains statutory registers, files annual returns, prepares board resolutions, and keeps the company compliant with ongoing SSM requirements — work that's easy to overlook until a deadline is missed.",
          ],
        },
        {
          heading: "Typical pricing",
          paragraphs: [
            "Market rates for a basic monthly retainer typically run RM60–150, with incorporation professional fees around RM500–1,500 and annual return filing around RM200–500 (excluding SSM's own filing fee). Digital-first secretarial platforms increasingly offer flat, transparent pricing and e-signature workflows in place of physical paperwork.",
          ],
        },
      ],
    },
    {
      slug: "why-earned-wage-access-reduces-turnover",
      title: "Why Earned Wage Access reduces staff turnover",
      excerpt: "Cash-flow stress is one of the most common, least-discussed reasons frontline staff leave. Here's the mechanism.",
      category: "HR",
      readTime: "4 min read",
      sections: [
        {
          paragraphs: [
            "Turnover among shift, hourly and frontline staff is expensive to replace and hard to explain in exit interviews — people rarely cite \"cash-flow stress mid-month\" as their reason for leaving, even when it's a real factor.",
          ],
        },
        {
          heading: "The mid-month gap",
          paragraphs: [
            "Most Malaysian employees are paid once a month, but expenses don't arrive once a month. When an unexpected cost lands mid-cycle, employees without savings buffers turn to high-cost, informal borrowing — or start job-hunting for an employer who pays weekly.",
          ],
        },
        {
          heading: "What Earned Wage Access changes",
          paragraphs: [
            "By letting employees access a portion of wages they've already earned, Earned Wage Access removes the need to borrow at all — there's no interest, no debt, and no informal lender involved. Industry data across EWA providers consistently associates the benefit with meaningfully lower turnover among the workforce segments that use it most: retail, F&B, manufacturing, logistics and security services.",
          ],
        },
        {
          heading: "Why it has to be built on real payroll data",
          paragraphs: [
            "The catch is accuracy: an EWA balance is only as good as the attendance and payroll data behind it. That's why GajiPay builds Advance Pay directly on top of its own payroll engine, rather than estimating earned wages from a third-party integration.",
          ],
        },
      ],
    },
  ],
  zh: [
    {
      slug: "is-earned-wage-access-legal-in-malaysia",
      title: "在马来西亚，「已赚工资提取」在没有放贷执照的情况下合法吗？",
      excerpt: "简短回答：是的，只要架构设置正确。以下是马来西亚「已赚工资提取」服务商所依据的法律基础。",
      category: "合规",
      readTime: "阅读需5分钟",
      sections: [
        {
          paragraphs: [
            "「已赚工资提取」（Earned Wage Access，EWA）让员工能在预定发薪日之前，提取已经赚取的工资。既然资金提前易手，这确实是一个合理的问题：EWA服务商是否需要在马来西亚持有放贷执照？",
            "对于架构完善的EWA产品而言，答案是不需要——若您正在评估一家服务商，了解其背后的法律基础值得一读。",
          ],
        },
        {
          heading: "《1951年放债人法令》的豁免条款",
          paragraphs: [
            "《1951年放债人法令》将雇主专门向自身员工提供财务援助、且属非营利性质或仅收取合理费用（而非利息）的安排排除在其适用范围之外。这正是EWA服务商据以设计产品的豁免依据：雇主是在协助员工提前获取自身已赚取的工资，而非向公众成员提供贷款。",
          ],
        },
        {
          heading: "《1955年雇佣法令》的规范界限",
          paragraphs: [
            "《1955年雇佣法令》的两项条文界定了相关边界。第22(1)条禁止雇主预支超出员工已赚工资的金额——这意味着一款架构正确的EWA产品，绝不可能让员工提取超过其实际已完成工作对应的金额。第27条禁止对薪资预支收取利息——这正是为何马来西亚每一家可信的EWA服务商，收取的都是单一固定手续费，而非利息。",
          ],
        },
        {
          heading: "这在实务上意味着什么",
          paragraphs: [
            "一款合规的EWA产品应当：严格将预支金额封顶于已赚工资、收取固定手续费而非利息，并将雇主定位为提供该项援助的一方——EWA服务商则扮演技术与服务层的角色，而非直接向公众放贷的机构。若某家服务商无法清楚说明其产品如何符合这一架构，那么在您签约之前，这一点值得进一步询问。",
          ],
        },
      ],
    },
    {
      slug: "epf-socso-eis-pcb-employer-guide",
      title: "EPF、SOCSO、EIS与PCB：新雇主速览指南",
      excerpt: "四个缩写词，同一个薪资周期。以下是每项法定供款实际涵盖的内容，以及各自的责任归属。",
      category: "薪资",
      readTime: "阅读需6分钟",
      sections: [
        {
          paragraphs: ["如果您刚在马来西亚雇用了第一位员工，每张工资单上都会出现四个缩写词：EPF、SOCSO、EIS与PCB。以下用简单的方式说明每一项的含义。"],
        },
        {
          heading: "EPF（雇员公积金）",
          paragraphs: ["一项退休储蓄计划。雇主与员工双方均按月薪的一定比例供款，由雇员公积金局（KWSP）管理。费率会依员工年龄与公民身份而有所不同。"],
        },
        {
          heading: "SOCSO（社险，PERKESO）",
          paragraphs: ["涵盖职业伤害与残疾计划的社会保险供款，由社会保险机构（PERKESO）管理。雇主与员工双方均需供款，通常雇主的供款比例较高。"],
        },
        {
          heading: "EIS（就业保险制度）",
          paragraphs: ["一项金额较小、独立的供款，用于资助失业员工的求职津贴、培训与职业辅导，与SOCSO一并管理。"],
        },
        {
          heading: "PCB／MTD（月度预扣税）",
          paragraphs: ["即Potongan Cukai Bulanan——每月从员工薪资中预先扣除所得税并汇缴予内陆税收局（LHDN）的机制，让员工无需在年终一次性承担大笔税款。"],
        },
        {
          heading: "这对您的薪资系统设置为何重要",
          paragraphs: ["以上四项的费率与门槛会定期调整，一旦出错便会带来实际的法定风险。这正是GajiPay薪资系统以原生方式计算EPF、SOCSO、EIS与PCB的原因，而非依赖一份可能被遗忘更新的附加表格公式。"],
        },
      ],
    },
    {
      slug: "how-to-appoint-a-company-secretary-in-malaysia",
      title: "如何在马来西亚委任公司秘书（及其费用）",
      excerpt: "每家私人有限公司都必须在注册后30天内委任一名公司秘书。以下是该职位实际涵盖的工作内容，以及市场行情价格。",
      category: "公司秘书",
      readTime: "阅读需4分钟",
      sections: [
        {
          paragraphs: [
            "根据《2016年公司法令》，在马来西亚注册成立的每家公司，都必须在注册后30天内委任至少一名公司秘书，并在委任后14天内通知马来西亚公司委员会（SSM）。",
          ],
        },
        {
          heading: "谁有资格担任公司秘书",
          paragraphs: ["秘书必须为自然人，通常居住于马来西亚境内，并符合《2016年公司法令》第235条的资格要求——通常须为指定专业团体的会员，或直接获SSM发牌认证。"],
        },
        {
          heading: "该职位实际涵盖的工作内容",
          paragraphs: ["除了最初的委任程序外，公司秘书还负责维护法定登记册、提交年度报表、准备董事会决议，并持续确保公司符合SSM的各项规定要求——这些工作往往容易被忽略，直到错过截止期限才被发现。"],
        },
        {
          heading: "一般收费行情",
          paragraphs: [
            "基本月费的市场行情通常介于RM60至RM150之间，公司注册专业服务费约为RM500至RM1,500，年度报表申报费约为RM200至RM500（不含SSM自身的申报费用）。数字化优先的秘书服务平台，正日益提供固定、透明的收费方式，并以电子签署流程取代纸本作业。",
          ],
        },
      ],
    },
    {
      slug: "why-earned-wage-access-reduces-turnover",
      title: "为何「已赚工资提取」能降低员工流失率",
      excerpt: "现金流压力是一线员工离职最常见、却最少被提及的原因之一。以下说明其背后的作用机制。",
      category: "人力资源",
      readTime: "阅读需4分钟",
      sections: [
        {
          paragraphs: [
            "轮班、时薪与一线员工的流失，替补成本高昂，也难以在离职面谈中说清楚——人们很少会将「月中现金流压力」列为离职原因，即便它确实是真实存在的因素。",
          ],
        },
        {
          heading: "月中缺口",
          paragraphs: ["大多数马来西亚员工每月领薪一次，但支出却不会只在月初出现一次。当周期中途出现意外支出时，没有储蓄缓冲的员工便会转向高成本的非正规借贷——或开始寻找按周发薪的雇主。"],
        },
        {
          heading: "「已赚工资提取」改变了什么",
          paragraphs: [
            "让员工能够提取部分已赚取的工资，「已赚工资提取」彻底消除了借贷的需求——不涉及利息、不产生债务，也无需接触非正规放贷者。多家EWA服务商的行业数据均一致显示，此项福利与使用最频繁的员工群体（零售、餐饮、制造、物流与保安服务）流失率显著下降密切相关。",
          ],
        },
        {
          heading: "为何必须建立在真实薪资数据之上",
          paragraphs: ["关键在于准确性：EWA余额的可靠程度，完全取决于背后的考勤与薪资数据。这正是为何GajiPay将预支薪资直接建构于自身的薪资引擎之上，而非依赖第三方整合来估算已赚工资。"],
        },
      ],
    },
  ],
  ms: [
    {
      slug: "is-earned-wage-access-legal-in-malaysia",
      title: "Adakah Akses Gaji Yang Diperoleh sah di Malaysia tanpa lesen pemberi pinjam wang?",
      excerpt:
        "Jawapan ringkas: ya, apabila distrukturkan dengan betul. Berikut asas undang-undang yang menjadi sandaran penyedia Akses Gaji Yang Diperoleh di Malaysia.",
      category: "Pematuhan",
      readTime: "Bacaan 5 minit",
      sections: [
        {
          paragraphs: [
            "Akses Gaji Yang Diperoleh (Earned Wage Access, EWA) membolehkan pekerja mengeluarkan gaji yang telah mereka peroleh sebelum hari gaji yang dijadualkan. Oleh kerana wang bertukar tangan lebih awal, ini soalan yang wajar: adakah penyedia EWA memerlukan lesen pemberi pinjam wang di Malaysia?",
            "Bagi produk EWA yang distrukturkan dengan baik, jawapannya tidak — dan asas undang-undang ini wajar difahami jika anda sedang menilai penyedia untuk syarikat anda.",
          ],
        },
        {
          heading: "Pengecualian Akta Pemberi Pinjam Wang 1951",
          paragraphs: [
            "Akta Pemberi Pinjam Wang 1951 mengecualikan daripada skopnya susunan di mana majikan menyediakan bantuan kewangan secara eksklusif kepada pekerjanya sendiri, atas dasar bukan keuntungan atau dengan yuran yang munasabah — bukan faedah. Inilah pengecualian yang menjadi asas struktur produk penyedia EWA: majikan memudahkan akses awal kepada gaji yang telah diperoleh oleh kakitangannya sendiri, bukan memberikan pinjaman kepada ahli orang awam.",
          ],
        },
        {
          heading: "Pagar keselamatan Akta Kerja 1955",
          paragraphs: [
            "Dua seksyen Akta Kerja 1955 menetapkan sempadan ini. Seksyen 22(1) melarang majikan daripada mendahulukan gaji melebihi apa yang telah diperoleh — bermakna produk EWA yang dibina dengan betul tidak sekali-kali boleh membenarkan pekerja mengakses lebih daripada apa yang benar-benar telah dikerjakan. Seksyen 27 melarang pengenaan faedah ke atas pendahuluan gaji — sebab itulah setiap penyedia EWA yang boleh dipercayai di Malaysia mengenakan yuran pemprosesan rata, bukan faedah.",
          ],
        },
        {
          heading: "Apa maksudnya dalam praktikal",
          paragraphs: [
            "Produk EWA yang mematuhi peraturan akan: menghadkan pendahuluan dengan ketat kepada gaji yang telah diperoleh, mengenakan yuran rata dan bukan faedah, dan menstrukturkan majikan sebagai pihak yang memudahkan bantuan tersebut — dengan penyedia EWA bertindak sebagai lapisan teknologi dan perkhidmatan, bukan pemberi pinjam langsung kepada orang awam. Jika sesuatu penyedia tidak dapat menjelaskan dengan jelas bagaimana produk mereka menepati struktur ini, itu wajar ditanya sebelum anda mendaftar.",
          ],
        },
      ],
    },
    {
      slug: "epf-socso-eis-pcb-employer-guide",
      title: "KWSP, PERKESO, SIP dan PCB: panduan ringkas untuk majikan baharu",
      excerpt: "Empat singkatan, satu kitaran penggajian. Berikut apa yang sebenarnya diliputi oleh setiap caruman statutori, dan siapa bertanggungjawab untuk apa.",
      category: "Penggajian",
      readTime: "Bacaan 6 minit",
      sections: [
        {
          paragraphs: ["Jika anda baru sahaja mengambil pekerja pertama anda di Malaysia, empat singkatan akan muncul pada setiap slip gaji: KWSP, PERKESO, SIP dan PCB. Berikut maksud setiap satu, secara mudah."],
        },
        {
          heading: "KWSP (Kumpulan Wang Simpanan Pekerja)",
          paragraphs: ["Skim simpanan persaraan. Majikan dan pekerja sama-sama menyumbang peratusan gaji bulanan, diuruskan oleh Kumpulan Wang Simpanan Pekerja (KWSP). Kadar berbeza mengikut umur pekerja dan status kewarganegaraan."],
        },
        {
          heading: "PERKESO (SOCSO)",
          paragraphs: ["Caruman keselamatan sosial yang meliputi skim kecederaan pekerjaan dan hilang upaya, ditadbir oleh PERKESO. Majikan dan pekerja sama-sama menyumbang, dengan bahagian majikan biasanya lebih besar."],
        },
        {
          heading: "SIP (Sistem Insurans Pekerjaan)",
          paragraphs: ["Caruman berasingan yang lebih kecil yang membiayai sokongan untuk pekerja yang kehilangan pekerjaan — elaun mencari kerja, latihan, dan kaunseling kerjaya — ditadbir bersama PERKESO."],
        },
        {
          heading: "PCB / MTD (Potongan Cukai Bulanan)",
          paragraphs: ["Mekanisme di mana cukai pendapatan ditolak daripada gaji pekerja setiap bulan dan dikemukakan kepada LHDN (Lembaga Hasil Dalam Negeri), supaya pekerja tidak perlu menanggung satu bil cukai besar pada penghujung tahun."],
        },
        {
          heading: "Mengapa ini penting untuk persediaan penggajian anda",
          paragraphs: ["Kadar dan ambang bagi keempat-empatnya berubah secara berkala, dan kesilapan mengiranya mewujudkan risiko statutori sebenar. Inilah sebabnya Penggajian GajiPay mengira KWSP, PERKESO, SIP dan PCB secara native, bukan sebagai formula hamparan tambahan yang mungkin terlupa dikemas kini."],
        },
      ],
    },
    {
      slug: "how-to-appoint-a-company-secretary-in-malaysia",
      title: "Cara melantik setiausaha syarikat di Malaysia (dan kosnya)",
      excerpt: "Setiap Sdn Bhd memerlukan seorang dalam masa 30 hari selepas penubuhan. Berikut apa yang sebenarnya diliputi oleh peranan ini, dan harga pasaran biasa.",
      category: "Setiausaha Syarikat",
      readTime: "Bacaan 4 minit",
      sections: [
        {
          paragraphs: [
            "Di bawah Akta Syarikat 2016, setiap syarikat yang ditubuhkan di Malaysia mesti melantik sekurang-kurangnya seorang setiausaha syarikat dalam masa 30 hari selepas penubuhan, dan memberitahu Suruhanjaya Syarikat Malaysia (SSM) dalam masa 14 hari selepas pelantikan tersebut.",
          ],
        },
        {
          heading: "Siapa yang boleh menjadi setiausaha syarikat",
          paragraphs: ["Setiausaha mestilah seorang individu, bermastautin di Malaysia, dan layak di bawah Seksyen 235 Akta Syarikat 2016 — biasanya ahli badan profesional yang ditetapkan atau dilesenkan terus oleh SSM."],
        },
        {
          heading: "Apa yang sebenarnya diliputi oleh peranan ini",
          paragraphs: ["Selain pelantikan awal, setiausaha syarikat menyelenggara daftar statutori, memfailkan pulangan tahunan, menyediakan resolusi lembaga pengarah, dan memastikan syarikat mematuhi keperluan SSM yang berterusan — kerja yang mudah terlepas pandang sehingga tarikh akhir terlepas."],
        },
        {
          heading: "Harga pasaran biasa",
          paragraphs: [
            "Kadar pasaran bagi retainer bulanan asas biasanya antara RM60–150, dengan yuran profesional penubuhan sekitar RM500–1,500 dan pemfailan pulangan tahunan sekitar RM200–500 (tidak termasuk yuran pemfailan SSM sendiri). Platform kesetiausahaan digital-dahulu semakin banyak menawarkan harga rata yang telus dan aliran kerja e-tandatangan menggantikan kerja kertas fizikal.",
          ],
        },
      ],
    },
    {
      slug: "why-earned-wage-access-reduces-turnover",
      title: "Mengapa Akses Gaji Yang Diperoleh mengurangkan pusing ganti kakitangan",
      excerpt: "Tekanan aliran tunai adalah salah satu sebab paling biasa, namun paling jarang dibincangkan, kakitangan barisan hadapan berhenti kerja. Berikut mekanismenya.",
      category: "HR",
      readTime: "Bacaan 4 minit",
      sections: [
        {
          paragraphs: [
            "Pusing ganti dalam kalangan kakitangan shif, jam dan barisan hadapan mahal untuk digantikan dan sukar dijelaskan dalam temu bual keluar — orang jarang menyebut \"tekanan aliran tunai pertengahan bulan\" sebagai sebab mereka berhenti, walaupun ia faktor sebenar.",
          ],
        },
        {
          heading: "Jurang pertengahan bulan",
          paragraphs: ["Kebanyakan pekerja Malaysia dibayar sekali sebulan, tetapi perbelanjaan tidak datang sekali sebulan. Apabila kos tidak dijangka tiba pertengahan kitaran, pekerja tanpa penampan simpanan beralih kepada pinjaman tidak formal berkos tinggi — atau mula mencari majikan yang membayar mingguan."],
        },
        {
          heading: "Apa yang diubah oleh Akses Gaji Yang Diperoleh",
          paragraphs: [
            "Dengan membenarkan pekerja mengakses sebahagian gaji yang telah mereka peroleh, Akses Gaji Yang Diperoleh menghapuskan sepenuhnya keperluan untuk meminjam — tiada faedah, tiada hutang, dan tiada pemberi pinjam tidak formal terlibat. Data industri merentas penyedia EWA secara konsisten mengaitkan faedah ini dengan pusing ganti yang jauh lebih rendah dalam segmen tenaga kerja yang paling banyak menggunakannya: runcit, F&B, perkilangan, logistik dan perkhidmatan keselamatan.",
          ],
        },
        {
          heading: "Mengapa ia perlu dibina di atas data penggajian sebenar",
          paragraphs: ["Persoalannya ialah ketepatan: baki EWA hanya sebaik data kehadiran dan penggajian di sebaliknya. Itulah sebabnya GajiPay membina Advance Pay terus di atas enjin penggajiannya sendiri, bukan menganggarkan gaji yang diperoleh daripada integrasi pihak ketiga."],
        },
      ],
    },
  ],
};

export function getResources(locale: Locale): Resource[] {
  return resourcesCopy[locale];
}

export function getResourceBySlug(locale: Locale, slug: string): Resource | undefined {
  return resourcesCopy[locale].find((resource) => resource.slug === slug);
}
