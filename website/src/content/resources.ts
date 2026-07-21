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

export const resources: Resource[] = [
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
    excerpt:
      "Cash-flow stress is one of the most common, least-discussed reasons frontline staff leave. Here's the mechanism.",
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
];

export function getResourceBySlug(slug: string) {
  return resources.find((resource) => resource.slug === slug);
}
