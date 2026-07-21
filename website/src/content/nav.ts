import { products } from "./products";
import { solutions } from "./solutions";

export interface NavLink {
  label: string;
  href: string;
}

export interface NavGroup extends NavLink {
  description: string;
  items: { label: string; href: string; description: string }[];
}

export const productsNavGroup: NavGroup = {
  label: "Products",
  href: "/products",
  description: "One platform, five connected services.",
  items: products.map((p) => ({
    label: p.shortName,
    href: `/products/${p.slug}`,
    description: p.tagline,
  })),
};

export const solutionsNavGroup: NavGroup = {
  label: "Solutions",
  href: "/solutions",
  description: "Built around how Malaysian SMEs actually staff up.",
  items: solutions.map((s) => ({
    label: s.name,
    href: `/solutions/${s.slug}`,
    description: s.tagline,
  })),
};

export const simpleNavLinks: NavLink[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  products: productsNavGroup.items,
  solutions: solutionsNavGroup.items,
  company: [
    { label: "About", href: "/about" },
    { label: "Resources", href: "/resources" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
    { label: "Book a demo", href: "/book-demo" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/legal/privacy-policy" },
    { label: "Terms of Service", href: "/legal/terms-of-service" },
    { label: "Advance Pay Terms", href: "/legal/advance-pay-terms" },
  ],
};
