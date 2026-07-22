import type { Locale } from "@/i18n/routing";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalDoc {
  slug: string;
  title: string;
  summary: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const legalDocsCopy: Record<Locale, LegalDoc[]> = {
  en: [
    {
      slug: "privacy-policy",
      title: "Privacy Policy",
      summary: "How GajiPay Sdn Bhd collects, uses, and protects personal and payroll data.",
      lastUpdated: "July 2026",
      sections: [
        {
          heading: "1. Scope",
          paragraphs: [
            "This policy covers personal data GajiPay Sdn Bhd (\"GajiPay\", \"we\") processes on behalf of employer clients and their employees through the HR Portal, Payroll, Advance Pay, Company Secretary and Audit & Accounting referral services, in accordance with the Personal Data Protection Act 2010 (PDPA).",
          ],
        },
        {
          heading: "2. What we collect",
          paragraphs: [
            "Employer account data (company registration details, billing contacts); employee data required to run payroll and HR functions (name, IC/passport number, bank details, salary, attendance, leave records); and Advance Pay transaction data (withdrawal amounts, timestamps, fees).",
          ],
        },
        {
          heading: "3. How we use it",
          paragraphs: [
            "To run payroll and statutory filings (EPF, SOCSO, EIS, PCB); to calculate accurate, capped Advance Pay eligibility; to provide HR Portal functionality; and to meet our own statutory and audit obligations. We do not sell personal data.",
          ],
        },
        {
          heading: "4. Data sharing",
          paragraphs: [
            "Data is shared only with parties necessary to deliver the service: statutory bodies (EPF, SOCSO, EIS, LHDN) as required by law, our licensed banking/e-money disbursement partner for Advance Pay, and — only with explicit client instruction — referred audit or accounting firms.",
          ],
        },
        {
          heading: "5. Security",
          paragraphs: [
            "Data is encrypted at rest and in transit, access is role-based and logged, and retention periods follow applicable statutory requirements.",
          ],
        },
        {
          heading: "6. Your rights",
          paragraphs: [
            "Under the PDPA, individuals may request access to, correction of, or withdrawal of consent for the processing of their personal data, subject to our statutory retention obligations. Requests can be made to the contact details on our Contact page.",
          ],
        },
      ],
    },
    {
      slug: "terms-of-service",
      title: "Terms of Service",
      summary: "The terms governing use of the GajiPay platform by employer clients.",
      lastUpdated: "July 2026",
      sections: [
        {
          heading: "1. Acceptance",
          paragraphs: [
            "By engaging GajiPay Sdn Bhd for any of Payroll, HR Portal, Advance Pay, Company Secretary or Audit & Accounting referral services, the client agrees to these Terms, which apply alongside any signed service agreement.",
          ],
        },
        {
          heading: "2. Scope of services",
          paragraphs: [
            "GajiPay provides payroll processing, HR administration tooling, Earned Wage Access facilitation, SSM-authorised company secretarial services, and referral introductions to licensed audit and accounting firms. GajiPay does not itself provide audit or accounting services, and is not a licensed moneylender.",
          ],
        },
        {
          heading: "3. Client responsibilities",
          paragraphs: [
            "Clients are responsible for the accuracy of data provided (employee details, attendance, salary structures), for funding payroll and Advance Pay settlement on schedule, and for their own compliance obligations as an employer under Malaysian law.",
          ],
        },
        {
          heading: "4. Fees",
          paragraphs: [
            "Fees are set out in the applicable service agreement or quote. Advance Pay fees are always a flat processing fee, never interest, as described in our Advance Pay Terms.",
          ],
        },
        {
          heading: "5. Termination",
          paragraphs: [
            "Either party may terminate service in accordance with the notice period set out in the applicable service agreement. GajiPay will support a reasonable transition period for payroll and statutory data handover.",
          ],
        },
        {
          heading: "6. Limitation of liability",
          paragraphs: [
            "GajiPay's liability is limited as set out in the applicable service agreement. Nothing in these Terms limits liability that cannot be excluded under Malaysian law.",
          ],
        },
      ],
    },
    {
      slug: "advance-pay-terms",
      title: "Advance Pay Terms",
      summary: "The specific terms governing Advance Pay (Earned Wage Access), including fees and eligibility.",
      lastUpdated: "July 2026",
      sections: [
        {
          heading: "1. What Advance Pay is",
          paragraphs: [
            "Advance Pay is an Earned Wage Access facility that allows eligible employees to draw down a portion of wages already earned during the current pay cycle, ahead of the employer's scheduled payday. It is not a loan, line of credit, or extension of credit of any kind, and GajiPay is not a licensed moneylender.",
          ],
        },
        {
          heading: "2. Eligibility and caps",
          paragraphs: [
            "Advances are available to eligible employees after the 15th of each calendar month (or the employer's configured cut-off), capped at a conservative percentage of wages already earned to date, calculated from the employer's payroll and attendance records. An advance can never exceed wages already earned, in accordance with Section 22 of the Employment Act 1955.",
          ],
        },
        {
          heading: "3. Fees",
          paragraphs: [
            "Advance Pay carries a flat processing fee per withdrawal, disclosed before the employee confirms the request. No interest is charged, in accordance with Section 27 of the Employment Act 1955. The fee may be paid by the employee or absorbed by the employer, depending on the employer's chosen plan.",
          ],
        },
        {
          heading: "4. Disbursement and reconciliation",
          paragraphs: [
            "Funds are disbursed through GajiPay's licensed banking or e-money partner. The advanced amount is deducted automatically from the employee's net pay at the next scheduled payday and reflected transparently on the payslip.",
          ],
        },
        {
          heading: "5. Legal basis",
          paragraphs: [
            "Advance Pay is structured within the exemption under the Moneylenders Act 1951 for employer-facilitated financial assistance to employees, provided on a non-profit, reasonable-fee basis exclusive to the employer's own staff.",
          ],
        },
      ],
    },
  ],
  zh: [
    {
      slug: "privacy-policy",
      title: "隐私政策",
      summary: "GajiPay Sdn Bhd如何收集、使用及保护个人与薪资数据。",
      lastUpdated: "2026年7月",
      sections: [
        {
          heading: "1. 适用范围",
          paragraphs: [
            "本政策涵盖GajiPay Sdn Bhd（「GajiPay」、「我们」）依据《2010年个人数据保护法令》（PDPA），透过人力资源门户、薪资服务、预支薪资、公司秘书以及审计与会计转介服务，代表雇主客户及其员工所处理的个人数据。",
          ],
        },
        {
          heading: "2. 我们收集的数据",
          paragraphs: [
            "雇主账户数据（公司注册详情、账单联络人）；执行薪资与人力资源功能所需的员工数据（姓名、身份证／护照号码、银行详情、薪资、考勤、请假记录）；以及预支薪资交易数据（提取金额、时间戳记、手续费）。",
          ],
        },
        {
          heading: "3. 我们如何使用这些数据",
          paragraphs: [
            "用于执行薪资处理与法定申报（EPF、SOCSO、EIS、PCB）；准确计算并封顶预支薪资资格；提供人力资源门户功能；以及履行我们自身的法定与审计义务。我们不会出售个人数据。",
          ],
        },
        {
          heading: "4. 数据共享",
          paragraphs: [
            "数据仅会与提供服务所必需的相关方共享：依法律要求提供予法定机构（EPF、SOCSO、EIS、LHDN）；提供予我们持牌的银行／电子货币发放合作伙伴以处理预支薪资；以及——仅在客户明确指示下——提供予受转介的审计或会计事务所。",
          ],
        },
        {
          heading: "5. 安全保障",
          paragraphs: ["数据在静止及传输过程中均经过加密，访问权限基于角色分配并留有记录，保留期限依适用的法定要求执行。"],
        },
        {
          heading: "6. 您的权利",
          paragraphs: [
            "依据PDPA，个人可要求查阅、更正其个人数据，或撤回处理其个人数据的同意，惟须受我们法定保留义务的约束。相关请求可透过我们「联络我们」页面上的联络方式提出。",
          ],
        },
      ],
    },
    {
      slug: "terms-of-service",
      title: "服务条款",
      summary: "规范雇主客户使用GajiPay平台的条款。",
      lastUpdated: "2026年7月",
      sections: [
        {
          heading: "1. 条款接受",
          paragraphs: [
            "凡委托GajiPay Sdn Bhd提供薪资处理、人力资源门户、预支薪资、公司秘书或审计与会计转介服务中的任一项，客户即同意本条款，本条款与任何已签署的服务协议一并适用。",
          ],
        },
        {
          heading: "2. 服务范围",
          paragraphs: [
            "GajiPay提供薪资处理、人力资源行政工具、已赚工资提取协助、SSM认证的公司秘书服务，以及向持牌审计与会计事务所的转介引荐服务。GajiPay本身不提供审计或会计服务，也并非持牌放贷机构。",
          ],
        },
        {
          heading: "3. 客户责任",
          paragraphs: [
            "客户须为所提供数据（员工详情、考勤、薪资结构）的准确性负责，须按时为薪资与预支薪资结算提供资金，并须履行其作为雇主在马来西亚法律下的合规义务。",
          ],
        },
        {
          heading: "4. 费用",
          paragraphs: ["费用列明于适用的服务协议或报价单中。预支薪资的费用一律为固定手续费，绝不收取利息，详见我们的《预支薪资条款》。"],
        },
        {
          heading: "5. 终止服务",
          paragraphs: ["任一方均可依据适用服务协议中列明的通知期终止服务。GajiPay将为薪资与法定数据的交接提供合理的过渡期支持。"],
        },
        {
          heading: "6. 责任限制",
          paragraphs: ["GajiPay的责任范围以适用服务协议中列明者为限。本条款中任何内容均不限制依马来西亚法律不得排除的责任。"],
        },
      ],
    },
    {
      slug: "advance-pay-terms",
      title: "预支薪资条款",
      summary: "规范预支薪资（已赚工资提取）的具体条款，包括费用与资格条件。",
      lastUpdated: "2026年7月",
      sections: [
        {
          heading: "1. 预支薪资是什么",
          paragraphs: [
            "预支薪资是一项「已赚工资提取」服务，让符合资格的员工能在雇主预定发薪日之前，提取本周期内已赚取工资的一部分。这并非贷款、信贷额度，或任何形式的信用延伸，且GajiPay并非持牌放贷机构。",
          ],
        },
        {
          heading: "2. 资格与封顶限制",
          paragraphs: [
            "符合资格的员工可在每月15日之后（或雇主设定的截止日期后）提取预支款项，其金额封顶于依雇主薪资与考勤记录计算出的、已赚工资的一个保守比例。依据《1955年雇佣法令》第22条，预支金额绝不得超过已赚取的工资。",
          ],
        },
        {
          heading: "3. 费用",
          paragraphs: [
            "预支薪资每次提取均收取单一固定手续费，并于员工确认申请前予以披露。依据《1955年雇佣法令》第27条，不收取任何利息。该费用可由员工支付，或由雇主承担，视雇主所选方案而定。",
          ],
        },
        {
          heading: "4. 资金发放与核对",
          paragraphs: ["资金透过GajiPay持牌的银行或电子货币合作伙伴发放。预支金额将于下一个预定发薪日自动从员工净薪资中扣除，并在工资单上透明列示。"],
        },
        {
          heading: "5. 法律依据",
          paragraphs: ["预支薪资依据《1951年放债人法令》中针对雇主协助员工财务援助的豁免条款设立，仅面向雇主自身员工，以非营利、合理收费为基础提供。"],
        },
      ],
    },
  ],
  ms: [
    {
      slug: "privacy-policy",
      title: "Dasar Privasi",
      summary: "Bagaimana GajiPay Sdn Bhd mengumpul, menggunakan, dan melindungi data peribadi dan penggajian.",
      lastUpdated: "Julai 2026",
      sections: [
        {
          heading: "1. Skop",
          paragraphs: [
            "Dasar ini meliputi data peribadi yang diproses oleh GajiPay Sdn Bhd (\"GajiPay\", \"kami\") bagi pihak klien majikan dan pekerja mereka melalui Portal HR, Penggajian, Advance Pay, Setiausaha Syarikat dan perkhidmatan rujukan Audit & Perakaunan, selaras dengan Akta Perlindungan Data Peribadi 2010 (PDPA).",
          ],
        },
        {
          heading: "2. Apa yang kami kumpul",
          paragraphs: [
            "Data akaun majikan (butiran pendaftaran syarikat, kenalan pengebilan); data pekerja yang diperlukan untuk menjalankan fungsi penggajian dan HR (nama, nombor IC/pasport, butiran bank, gaji, kehadiran, rekod cuti); dan data transaksi Advance Pay (jumlah pengeluaran, cap masa, yuran).",
          ],
        },
        {
          heading: "3. Bagaimana kami menggunakannya",
          paragraphs: [
            "Untuk menjalankan penggajian dan pemfailan statutori (KWSP, PERKESO, SIP, PCB); untuk mengira kelayakan Advance Pay yang tepat dan dihadkan; untuk menyediakan fungsi Portal HR; dan untuk memenuhi kewajipan statutori dan audit kami sendiri. Kami tidak menjual data peribadi.",
          ],
        },
        {
          heading: "4. Perkongsian data",
          paragraphs: [
            "Data dikongsi hanya dengan pihak yang perlu bagi menyampaikan perkhidmatan: badan statutori (KWSP, PERKESO, SIP, LHDN) seperti dikehendaki oleh undang-undang, rakan kongsi pembayaran perbankan/e-wang berlesen kami untuk Advance Pay, dan — hanya dengan arahan jelas daripada klien — firma audit atau perakaunan yang dirujuk.",
          ],
        },
        {
          heading: "5. Keselamatan",
          paragraphs: ["Data disulitkan semasa disimpan dan dihantar, akses adalah berasaskan peranan dan direkodkan, dan tempoh penyimpanan mengikut keperluan statutori yang berkenaan."],
        },
        {
          heading: "6. Hak anda",
          paragraphs: [
            "Di bawah PDPA, individu boleh meminta akses kepada, pembetulan, atau penarikan balik persetujuan untuk pemprosesan data peribadi mereka, tertakluk kepada kewajipan penyimpanan statutori kami. Permintaan boleh dibuat kepada butiran hubungan pada halaman Hubungi Kami kami.",
          ],
        },
      ],
    },
    {
      slug: "terms-of-service",
      title: "Terma Perkhidmatan",
      summary: "Terma yang mengawal penggunaan platform GajiPay oleh klien majikan.",
      lastUpdated: "Julai 2026",
      sections: [
        {
          heading: "1. Penerimaan",
          paragraphs: [
            "Dengan melibatkan GajiPay Sdn Bhd untuk mana-mana perkhidmatan Penggajian, Portal HR, Advance Pay, Setiausaha Syarikat atau rujukan Audit & Perakaunan, klien bersetuju dengan Terma ini, yang terpakai bersama mana-mana perjanjian perkhidmatan yang ditandatangani.",
          ],
        },
        {
          heading: "2. Skop perkhidmatan",
          paragraphs: [
            "GajiPay menyediakan pemprosesan penggajian, alat pentadbiran HR, kemudahan Akses Gaji Yang Diperoleh, perkhidmatan kesetiausahaan syarikat yang diberi kuasa SSM, dan pengenalan rujukan kepada firma audit dan perakaunan berlesen. GajiPay sendiri tidak menyediakan perkhidmatan audit atau perakaunan, dan bukan pemberi pinjam wang berlesen.",
          ],
        },
        {
          heading: "3. Tanggungjawab klien",
          paragraphs: [
            "Klien bertanggungjawab terhadap ketepatan data yang diberikan (butiran pekerja, kehadiran, struktur gaji), untuk membiayai penyelesaian penggajian dan Advance Pay mengikut jadual, dan untuk kewajipan pematuhan mereka sendiri sebagai majikan di bawah undang-undang Malaysia.",
          ],
        },
        {
          heading: "4. Yuran",
          paragraphs: ["Yuran dinyatakan dalam perjanjian perkhidmatan atau sebut harga yang berkenaan. Yuran Advance Pay sentiasa merupakan yuran pemprosesan rata, tidak sekali-kali faedah, seperti yang diterangkan dalam Terma Advance Pay kami."],
        },
        {
          heading: "5. Penamatan",
          paragraphs: ["Mana-mana pihak boleh menamatkan perkhidmatan mengikut tempoh notis yang dinyatakan dalam perjanjian perkhidmatan yang berkenaan. GajiPay akan menyokong tempoh peralihan yang munasabah untuk penyerahan data penggajian dan statutori."],
        },
        {
          heading: "6. Had liabiliti",
          paragraphs: ["Liabiliti GajiPay adalah terhad seperti yang dinyatakan dalam perjanjian perkhidmatan yang berkenaan. Tiada apa-apa dalam Terma ini menghadkan liabiliti yang tidak boleh dikecualikan di bawah undang-undang Malaysia."],
        },
      ],
    },
    {
      slug: "advance-pay-terms",
      title: "Terma Advance Pay",
      summary: "Terma khusus yang mengawal Advance Pay (Akses Gaji Yang Diperoleh), termasuk yuran dan kelayakan.",
      lastUpdated: "Julai 2026",
      sections: [
        {
          heading: "1. Apa itu Advance Pay",
          paragraphs: [
            "Advance Pay adalah kemudahan Akses Gaji Yang Diperoleh yang membolehkan pekerja yang layak mengeluarkan sebahagian daripada gaji yang telah diperoleh semasa kitaran gaji semasa, lebih awal daripada hari gaji yang dijadualkan oleh majikan. Ia bukan pinjaman, talian kredit, atau sebarang bentuk pelanjutan kredit, dan GajiPay bukan pemberi pinjam wang berlesen.",
          ],
        },
        {
          heading: "2. Kelayakan dan had",
          paragraphs: [
            "Pendahuluan tersedia kepada pekerja yang layak selepas 15hb setiap bulan kalendar (atau tarikh potongan yang dikonfigurasi oleh majikan), dihadkan kepada peratusan berhemat daripada gaji yang telah diperoleh setakat ini, dikira daripada rekod penggajian dan kehadiran majikan. Pendahuluan tidak sekali-kali boleh melebihi gaji yang telah diperoleh, selaras dengan Seksyen 22 Akta Kerja 1955.",
          ],
        },
        {
          heading: "3. Yuran",
          paragraphs: [
            "Advance Pay dikenakan yuran pemprosesan rata bagi setiap pengeluaran, didedahkan sebelum pekerja mengesahkan permintaan. Tiada faedah dikenakan, selaras dengan Seksyen 27 Akta Kerja 1955. Yuran boleh dibayar oleh pekerja atau ditanggung oleh majikan, bergantung pada pelan yang dipilih oleh majikan.",
          ],
        },
        {
          heading: "4. Pembayaran dan penyelarasan",
          paragraphs: ["Dana dibayar melalui rakan kongsi perbankan atau e-wang berlesen GajiPay. Jumlah yang didahulukan ditolak secara automatik daripada gaji bersih pekerja pada hari gaji berjadual seterusnya dan dicerminkan secara telus pada slip gaji."],
        },
        {
          heading: "5. Asas undang-undang",
          paragraphs: ["Advance Pay distrukturkan dalam pengecualian di bawah Akta Pemberi Pinjam Wang 1951 bagi bantuan kewangan yang difasilitasi majikan kepada pekerja, disediakan atas dasar bukan keuntungan, yuran munasabah, eksklusif kepada kakitangan majikan sendiri.",
          ],
        },
      ],
    },
  ],
};

export function getLegalDocs(locale: Locale): LegalDoc[] {
  return legalDocsCopy[locale];
}

export function getLegalDocBySlug(locale: Locale, slug: string): LegalDoc | undefined {
  return legalDocsCopy[locale].find((doc) => doc.slug === slug);
}
