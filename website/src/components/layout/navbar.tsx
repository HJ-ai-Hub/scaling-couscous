"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/brand/logo-mark";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { productsNavGroup, simpleNavLinks, solutionsNavGroup, type NavGroup } from "@/content/nav";

function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openNow = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div className="relative" onMouseEnter={openNow} onMouseLeave={closeSoon}>
      <button
        className={cn(
          "flex items-center gap-1 rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:bg-surface-alt",
          open && "bg-surface-alt",
        )}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {group.label}
        <ChevronDown className={cn("size-4 transition-transform duration-200", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 top-full z-50 mt-3 w-[min(90vw,640px)] -translate-x-1/2 rounded-card border border-border bg-white p-6 shadow-lift"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-ink-faint">
              {group.description}
            </p>
            <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="block rounded-control p-3 transition-colors hover:bg-surface-alt">
                    <p className="text-[0.95rem] font-semibold text-ink">{item.label}</p>
                    <p className="mt-0.5 text-sm text-ink-soft">{item.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile sheet on route change. Adjusted during render (rather
  // than in an effect) per https://react.dev/learn/you-might-not-need-an-effect
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-300 ease-out",
        scrolled ? "bg-white/85 shadow-soft backdrop-blur-md" : "bg-transparent",
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center" aria-label="GajiPay home">
          <LogoMark className="h-11 w-auto" priority />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          <NavDropdown group={solutionsNavGroup} />
          <NavDropdown group={productsNavGroup} />
          {simpleNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink transition-colors hover:bg-surface-alt"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link href="/contact" className="px-3 text-[0.95rem] font-medium text-ink transition-colors hover:text-blue-deep">
            Contact
          </Link>
          <Button asChild variant="secondary" size="sm">
            <Link href="/book-demo">Book Demo</Link>
          </Button>
          <Button asChild variant="primary" size="sm">
            <Link href="/contact">Get Started</Link>
          </Button>
        </div>

        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors hover:bg-surface-alt lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </SheetTrigger>
          <SheetContent>
            <Link href="/" className="flex items-center" aria-label="GajiPay home">
              <LogoMark className="h-9 w-auto" />
            </Link>
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto" aria-label="Mobile">
              <MobileGroup title={solutionsNavGroup.label} href={solutionsNavGroup.href} items={solutionsNavGroup.items} />
              <MobileGroup title={productsNavGroup.label} href={productsNavGroup.href} items={productsNavGroup.items} />
              {simpleNavLinks.map((link) => (
                <SheetClose asChild key={link.href}>
                  <Link href={link.href} className="rounded-control px-3 py-3 text-base font-medium text-ink hover:bg-surface-alt">
                    {link.label}
                  </Link>
                </SheetClose>
              ))}
              <SheetClose asChild>
                <Link href="/contact" className="rounded-control px-3 py-3 text-base font-medium text-ink hover:bg-surface-alt">
                  Contact
                </Link>
              </SheetClose>
            </nav>
            <div className="flex flex-col gap-3">
              <Button asChild variant="secondary">
                <Link href="/book-demo">Book Demo</Link>
              </Button>
              <Button asChild variant="primary">
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function MobileGroup({
  title,
  href,
  items,
}: {
  title: string;
  href: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="border-b border-border py-2">
      <SheetClose asChild>
        <Link href={href} className="block rounded-control px-3 py-2 text-base font-semibold text-ink">
          {title}
        </Link>
      </SheetClose>
      <ul className="pl-3">
        {items.map((item) => (
          <li key={item.href}>
            <SheetClose asChild>
              <Link href={item.href} className="block rounded-control px-3 py-2 text-sm text-ink-soft hover:text-ink">
                {item.label}
              </Link>
            </SheetClose>
          </li>
        ))}
      </ul>
    </div>
  );
}
