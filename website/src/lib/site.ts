export const siteConfig = {
  name: "GajiPay",
  legalName: "GajiPay Sdn Bhd",
  tagline: "Pay Earned. Live Empowered.",
  description:
    "GajiPay is a modern payroll technology platform for Malaysian businesses — HR Portal, Payroll, Earned Wage Access, Company Secretary and Audit & Accounting referral in one intelligent platform.",
  url: "https://www.gajipay.my",
  ogImage: "/opengraph-image.png",
  locale: "en_MY",
  keywords: [
    "GajiPay",
    "Malaysia payroll software",
    "Earned Wage Access Malaysia",
    "EWA Malaysia",
    "HR portal Malaysia",
    "payroll outsourcing Malaysia",
    "company secretary Malaysia",
    "SME payroll platform",
  ],
  links: {
    linkedin: "https://www.linkedin.com/company/gajipay",
    facebook: "https://www.facebook.com/gajipay.my",
    instagram: "https://www.instagram.com/gajipay.my",
  },
  contact: {
    email: "hello@gajipay.my",
    supportEmail: "support@gajipay.my",
    phone: "+60 3-2789 4400",
    address: "Level 12, Menara GajiPay, Jalan Kerinchi, 59200 Kuala Lumpur, Malaysia",
  },
} as const;

export type SiteConfig = typeof siteConfig;
