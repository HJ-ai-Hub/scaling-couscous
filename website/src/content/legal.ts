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

export const legalDocs: LegalDoc[] = [
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
];

export function getLegalDocBySlug(slug: string) {
  return legalDocs.find((doc) => doc.slug === slug);
}
