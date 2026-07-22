import { useTranslations, useLocale } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";

import { LogoMark } from "@/components/brand/logo-mark";
import { LinkedInIcon, FacebookIcon, InstagramIcon } from "@/components/icons/social";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getFooterNav } from "@/content/nav";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  const locale = useLocale() as Locale;
  const t = useTranslations("footer");
  const footerNav = getFooterNav(locale);

  return (
    <footer className="border-t border-border bg-surface-alt">
      <div className="container-page grid grid-cols-1 gap-12 py-16 sm:grid-cols-2 lg:grid-cols-5 lg:py-24">
        <div className="sm:col-span-2 lg:col-span-2">
          <Link href="/" className="flex items-center" aria-label="GajiPay home">
            <LogoMark className="h-11 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-ink-soft">
            {t("description")}
          </p>
          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-ink-faint">
            {t("tagline")}
          </p>
          <div className="mt-6 flex flex-col gap-2.5 text-sm text-ink-soft">
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 hover:text-ink">
              <Mail className="size-4" /> {siteConfig.contact.email}
            </a>
            <a href={`tel:${siteConfig.contact.phone.replace(/[^+\d]/g, "")}`} className="flex items-center gap-2 hover:text-ink">
              <Phone className="size-4" /> {siteConfig.contact.phone}
            </a>
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0" /> {siteConfig.contact.address}
            </p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GajiPay on LinkedIn"
              className="flex size-10 items-center justify-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              <LinkedInIcon className="size-4.5" />
            </a>
            <a
              href={siteConfig.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GajiPay on Facebook"
              className="flex size-10 items-center justify-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              <FacebookIcon className="size-4.5" />
            </a>
            <a
              href={siteConfig.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GajiPay on Instagram"
              className="flex size-10 items-center justify-center rounded-full border border-border-strong text-ink-soft transition-colors hover:border-ink hover:text-ink"
            >
              <InstagramIcon className="size-4.5" />
            </a>
          </div>
        </div>

        <FooterColumn title={productsTitle(locale)} links={footerNav.products} />
        <FooterColumn title={solutionsTitle(locale)} links={footerNav.solutions} />
        <FooterColumn title={companyTitle(locale)} links={footerNav.company} />
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col-reverse items-center justify-between gap-4 py-6 sm:flex-row">
          <p className="text-xs text-ink-faint">
            &copy; {year} {siteConfig.legalName}. {t("rights")}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerNav.legal.map((item) => (
              <Link key={item.href} href={item.href} className="text-xs text-ink-faint hover:text-ink">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

const columnTitles: Record<Locale, { products: string; solutions: string; company: string }> = {
  en: { products: "Products", solutions: "Solutions", company: "Company" },
  zh: { products: "产品", solutions: "解决方案", company: "公司" },
  ms: { products: "Produk", solutions: "Penyelesaian", company: "Syarikat" },
};

function productsTitle(locale: Locale) {
  return columnTitles[locale].products;
}
function solutionsTitle(locale: Locale) {
  return columnTitles[locale].solutions;
}
function companyTitle(locale: Locale) {
  return columnTitles[locale].company;
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-faint">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-sm text-ink-soft transition-colors hover:text-ink">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
