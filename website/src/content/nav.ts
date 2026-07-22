import type { Locale } from "@/i18n/routing";
import { getProducts } from "./products";
import { getSolutions } from "./solutions";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup extends NavLink {
  description: string;
  items: { label: string; href: string; description: string }[];
}

const navLabels: Record<
  Locale,
  {
    products: string;
    productsDescription: string;
    solutions: string;
    solutionsDescription: string;
    pricing: string;
    resources: string;
    about: string;
    contact: string;
    bookDemo: string;
    privacyPolicy: string;
    termsOfService: string;
    advancePayTerms: string;
  }
> = {
  en: {
    products: "Products",
    productsDescription: "One platform, five connected services.",
    solutions: "Solutions",
    solutionsDescription: "Built around how Malaysian SMEs actually staff up.",
    pricing: "Pricing",
    resources: "Resources",
    about: "About",
    contact: "Contact",
    bookDemo: "Book a demo",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    advancePayTerms: "Advance Pay Terms",
  },
  zh: {
    products: "产品",
    productsDescription: "一个平台，五项互联服务。",
    solutions: "解决方案",
    solutionsDescription: "依据马来西亚中小企业实际的用工方式而设计。",
    pricing: "价格方案",
    resources: "资源中心",
    about: "关于我们",
    contact: "联络我们",
    bookDemo: "预约演示",
    privacyPolicy: "隐私政策",
    termsOfService: "服务条款",
    advancePayTerms: "预支薪资条款",
  },
  ms: {
    products: "Produk",
    productsDescription: "Satu platform, lima perkhidmatan yang berhubung.",
    solutions: "Penyelesaian",
    solutionsDescription: "Dibina berdasarkan cara PKS Malaysia sebenarnya mengurus kakitangan.",
    pricing: "Harga",
    resources: "Sumber",
    about: "Tentang Kami",
    contact: "Hubungi Kami",
    bookDemo: "Tempah demo",
    privacyPolicy: "Dasar Privasi",
    termsOfService: "Terma Perkhidmatan",
    advancePayTerms: "Terma Advance Pay",
  },
};

export function getProductsNavGroup(locale: Locale): NavGroup {
  const labels = navLabels[locale];
  return {
    label: labels.products,
    href: "/products",
    description: labels.productsDescription,
    items: getProducts(locale).map((p) => ({
      label: p.shortName,
      href: `/products/${p.slug}`,
      description: p.tagline,
    })),
  };
}

export function getSolutionsNavGroup(locale: Locale): NavGroup {
  const labels = navLabels[locale];
  return {
    label: labels.solutions,
    href: "/solutions",
    description: labels.solutionsDescription,
    items: getSolutions(locale).map((s) => ({
      label: s.name,
      href: `/solutions/${s.slug}`,
      description: s.tagline,
    })),
  };
}

export function getSimpleNavLinks(locale: Locale): NavLink[] {
  const labels = navLabels[locale];
  return [
    { label: labels.pricing, href: "/pricing" },
    { label: labels.resources, href: "/resources" },
    { label: labels.about, href: "/about" },
  ];
}

export function getFooterNav(locale: Locale) {
  const labels = navLabels[locale];
  return {
    products: getProductsNavGroup(locale).items,
    solutions: getSolutionsNavGroup(locale).items,
    company: [
      { label: labels.about, href: "/about" },
      { label: labels.resources, href: "/resources" },
      { label: labels.pricing, href: "/pricing" },
      { label: labels.contact, href: "/contact" },
      { label: labels.bookDemo, href: "/book-demo" },
    ],
    legal: [
      { label: labels.privacyPolicy, href: "/legal/privacy-policy" },
      { label: labels.termsOfService, href: "/legal/terms-of-service" },
      { label: labels.advancePayTerms, href: "/legal/advance-pay-terms" },
    ],
  };
}
