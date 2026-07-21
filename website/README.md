# GajiPay Website

Marketing site for GajiPay Sdn Bhd — a Malaysian payroll technology platform covering
Advance Pay (Earned Wage Access), Payroll, HR Portal, Company Secretary, and Audit &
Accounting referral.

## Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Framer Motion · GSAP ·
Lenis smooth scroll · Lucide icons · React Hook Form + Zod

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build + type-check + lint
npm run start   # serve the production build
npm run lint    # lint only
```

## Structure

```
src/
  app/                 Routes (App Router) — pages, api/, sitemap.ts, robots.ts, icon.tsx, opengraph-image.tsx
  components/
    ui/                Hand-built shadcn-style primitives (Radix + CVA + Tailwind)
    layout/            Navbar, Footer, smooth scroll, section reveal
    brand/              Logo mark + the animated MotionLogo intro
    marketing/          Dashboard mock, Advance Pay mock, charts, page hero
    sections/            Homepage sections (Hero, Features, FAQ, ...)
    forms/               Contact + Book Demo forms (React Hook Form + Zod)
  content/              Typed content data (products, solutions, FAQ, pricing, resources, legal)
  lib/                  cn() helper, site config, structured data (JSON-LD), zod schemas
```

## Content and copy notes

- **Testimonials and the "trusted by" strip are intentionally not fake.** GajiPay is
  pre-launch, so `src/content/perspectives.ts` uses role-based value statements rather
  than invented customer quotes or logos. Swap in real testimonials once the pilot
  cohort is live.
- **Legal pages** (`/legal/*`) are working drafts with an on-page disclaimer — they need
  sign-off from qualified Malaysian legal counsel before going live.
- **Pricing** (`/pricing`) shows tiers and Advance Pay's flat-fee model without
  committing to specific numbers publicly — final figures are quoted after a discovery
  call, since pricing wasn't finalized at time of writing.
- `siteConfig.url` in `src/lib/site.ts` is a placeholder (`https://www.gajipay.my`) —
  update it once the real domain is live; it feeds `metadataBase`, the sitemap, and
  structured data.
- The `/api/contact` and `/api/book-demo` routes validate and log submissions but are
  not yet wired to a real CRM or email provider — see the `TODO` in each route.

## Brand

Brand palette, type system and motion timeline live in `src/app/globals.css` (`@theme`
tokens) and `src/components/brand/`. The original uploaded logo/brand-board reference
images are kept in `public/brand/` for reference; the working logo is a hand-authored
SVG recreation (`logo-paths.ts`) so it can be animated and recolored without a raster
dependency.
