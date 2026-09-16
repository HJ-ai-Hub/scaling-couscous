# EZ4U Mobile — Website Handover

Everything a developer needs to work on **www.ez4u.co**. Read this before
touching anything; the site has some unusual constraints that are easy to
break silently.

Owner: HJ (EZ4U Mobile, Summit USJ Mall, Subang Jaya).
Last updated: 2026-09-16.

---

## 1. What this is

A **static, trilingual retail site** for a phone shop: new and pre-owned
phones, tablets, accessories, repair services, trade-in, and an optional
protection plan. It has a working shopping cart and live online card/FPX
payment through HitPay.

- **28 HTML pages**, ~29,700 lines total
- **No build step, no framework, no package.json** — the pages are hand-written
  HTML with inline `<style>` and `<script>`
- **One serverless function** (Node) for payments
- Languages: **English, Chinese, Malay**

There is no database and no user accounts. The cart lives in the visitor's
browser (`localStorage`).

---

## 2. Hosting and deployment

| | |
|---|---|
| **Host** | Netlify (site name `ez-4u`) |
| **Domain** | `www.ez4u.co` |
| **Deploy trigger** | Push to the production branch → Netlify builds automatically |
| **Build command** | None |
| **Publish directory** | `public` (set in `netlify.toml`) |
| **Functions directory** | `netlify/functions` (set in `netlify.toml`) |
| **Node version** | 20 (set in `netlify.toml`) |

`netlify.toml` **must stay at the repository root.** Netlify reads it relative
to the site's configured base directory; move it and the functions silently
stop deploying, which is exactly how the payment feature broke once before.

**Pull requests get their own preview URL.** Use those to show work for review
— you do not need a Netlify login to develop, and you should not push straight
to the production branch.

---

## 3. Secrets — read this before you write any payment code

**No credential belongs in this repository, ever.** Not in a file, not in a
commit, not in a comment.

Secrets live only in **Netlify → Site configuration → Environment variables**:

| Variable | Purpose |
|---|---|
| `HITPAY_API_KEY` | HitPay Business API key. Server-side only. |
| `HITPAY_ENV` | `live` or `sandbox`. Controls which HitPay API is called. |

`netlify.toml` in this repo forces `HITPAY_ENV=sandbox` for **deploy previews
and branch deploys**, so your test payments can never hit the real merchant
account. Do not remove that. Production is the only context that runs `live`.

If you need to test payments, ask the owner for a **sandbox** key. You will not
be given the live key.

---

## 4. Repository layout

```
.
├── netlify.toml                  # build config — MUST stay at repo root
├── HANDOVER.md                   # this file (outside public/, so not web-served)
├── netlify/functions/
│   └── create-payment.js         # creates a HitPay hosted payment page
└── public/                       # everything here is served publicly
    ├── index.html                # homepage
    ├── about.html                # why EZ4U + about
    ├── products.html             # full catalogue, tabbed by category
    ├── repair.html               # repair services + price ranges
    ├── tradein.html              # trade-in
    ├── payment.html              # payment methods + policy
    ├── payment-success.html      # HitPay redirect target (noindex)
    ├── delivery.html             # delivery & pickup
    ├── product-*.html            # 20 product detail pages
    ├── robots.txt
    ├── sitemap.xml
    └── assets/
        ├── logo-color.png        # full-colour mark, transparent
        ├── logo-white.png        # all-white mark (dark backgrounds)
        ├── logo-hero.png         # hero card artwork (white MOBILE wordmark)
        ├── og-image.png          # social share image
        ├── signage.jpg           # storefront photo (1548×525)
        └── products/<model>/*.jpg  # 98 product colour photos
```

---

## 5. The one thing that will bite you: every page is self-contained

There is **no shared CSS file, no shared JS file, and no templating.** All 28
pages carry their own duplicated copy of:

- the entire stylesheet (inline `<style>`)
- the header and navigation
- the footer
- the cart JavaScript (verified: all 28 pages)
- the `I18N` translation dictionary (verified: all 28 pages)

**Consequences:**

- Changing the nav, footer, cart, or any shared style means editing **28 files**,
  not one. Use a scripted find-and-replace and verify the count.
- A new UI string must be added to **three language dictionaries on that page**.
- Fixing a bug in the cart means fixing it 28 times.

This is the site's main technical debt. Consolidating it — into a static site
generator, or even just shared `.css`/`.js` files — is a sensible project, but
it is a **rewrite, not a tweak**. Scope and quote it separately; do not start it
as a side effect of a small task.

---

## 6. Translation system (EN / ZH / MS)

Each page has:

```js
const I18N = { en: {...}, zh: {...}, ms: {...} };
function applyLang(lang){ /* sets el.innerHTML = dict[key] for [data-i18n] */ }
```

- Markup opts in with `data-i18n="some_key"`.
- The chosen language persists in `localStorage` under **`ss_lang`**.
- A **missing key silently falls back** to whatever English text is already in
  the HTML. So a forgotten translation shows no error — it just stays English.
  Check all three languages before calling a task done.

### Trap: never put `data-i18n` on an element that contains a link

`applyLang` assigns **`innerHTML`**. If you tag a parent of an `<a>`, the
translation replaces the anchor and **the link disappears**. Put `data-i18n` on
the `<a>` itself so its `href` survives.

---

## 7. Shopping cart

- Stored in `localStorage` under **`ss_cart`** as an array of
  `{id, name, price, img, qty}`.
- An "Add to Cart" button is `<button data-addcart="<product-id>">`.

### Trap: prices are scraped from the DOM, not stored in data

On click, the handler walks up to the closest `.prod` (or the product-detail
container) and reads:

| Value | Read from |
|---|---|
| name | `.prod-name` or `.pd-info h1` |
| price | `.prod-price` or `.pd-price`, stripped to digits |
| image | `.thumb img` or `#pdMainImg` |

**Renaming any of those CSS classes silently sets the cart price to `0`.** There
is no validation and no error. If you restructure product markup, add an item to
the cart and confirm the price afterwards.

### Protection plan ("EZ4U Protect")

- Plan line items use the id `protect_<productId>`.
- Tiered by device price: `RM119 / 169 / 249 / 329` for
  `≤999 / ≤1999 / ≤2999 / above`.
- Accessories (`acc_*`) and plans themselves are not protectable
  (`isProtectable()`).
- `pruneOrphanPlans()` runs inside `saveCart()`: remove a phone and its plan
  is removed with it. Keep that invariant if you touch cart persistence.

### WhatsApp fallback

`WA_NUMBER = "601162283119"`. Links with a `data-wa` attribute are populated by
JavaScript at load time — their `href="#"` in the source is **intentional**, not
a bug. Each page has a `WA_MSG` map of pre-filled message templates
(e.g. `rep_screen`, `rep_battery` on the repair page).

---

## 8. Payment flow (HitPay)

```
Cart "Pay Online"
  → POST /.netlify/functions/create-payment  { amount, summary }
  → function calls HitPay POST {apiBase}/payment-requests
      header X-BUSINESS-API-KEY, form-encoded
      live:    https://api.hit-pay.com/v1
      sandbox: https://api.sandbox.hit-pay.com/v1
  → returns { url, id, reference }
  → browser redirects to HitPay's hosted page
  → HitPay redirects back to /payment-success.html
```

Notes:

- The endpoint path `/.netlify/functions/create-payment` is the **only
  root-absolute path in the site**; everything else is relative.
- On any failure the UI alerts *"Something went wrong. Please try WhatsApp
  checkout instead."* and re-enables the button. Failures are logged in
  **Netlify → Functions → create-payment**; check there first.
- **There is no webhook and no order record.** The site does not know whether a
  payment succeeded — the shop reconciles in the HitPay dashboard. Adding
  webhook verification and an order log is a known gap (see §11).
- **Do not enable HitPay IP whitelisting.** Netlify functions run from rotating
  IPs; whitelisting breaks payments.

---

## 9. Content rules agreed with the owner

Please don't change these without asking — they are commercial decisions, not
styling choices.

**Repair services** (`repair.html`) — 11 services in 4 groups:

- Show **market price ranges only**; the final quote is given over WhatsApp.
- No online payment for repairs. Payment is on confirmation of consultation.
- OEM / original parts; **30-day warranty**; turnaround **1 day or more**.

**EZ4U Protect** — 12 months, optional add-on at point of sale, **RM99 excess
per accidental-damage claim**, claim limits stated on the page.

> The plan's terms are EZ4U's **own wording** and include an explicit statement
> that EZ4U is not affiliated with Apple or any manufacturer. Do not copy
> AppleCare+ or any competitor's legal text into this site — that is a
> copyright and trademark problem, not a shortcut.

**Catalogue:** all iPhones and the Samsung A56 are categorised as
**Pre-owned**. The homepage shows 8 products spanning categories.

---

## 10. SEO and metadata

Every page has its own `<title>`, meta description, canonical URL, Open Graph
tags, and the homepage carries `LocalBusiness` JSON-LD (address, hours, phone,
email `ez4umobile@gmail.com`).

- Keep `<link rel="canonical">` pointing at the `www.ez4u.co` URL.
- `sitemap.xml` and `robots.txt` live in `public/`. Add new pages to the sitemap.
- `payment-success.html` is deliberately `noindex`.
- Contact details appear in many places (page text, footer, FAQ answers,
  JSON-LD). Changing the phone or email means a **repo-wide** search, not one
  edit — the last email change touched 89 occurrences across all 28 pages.

Current contacts: WhatsApp **011-6228 3119**, email **ez4umobile@gmail.com**.

---

## 11. Known issues and backlog

Open items, roughly in priority order:

1. **No payment webhook / order record.** The site cannot confirm a payment or
   reconcile it to a cart. Highest-value improvement.
2. **28× duplication** of CSS, nav, footer, cart and translations (§5).
3. **TikTok icon is a dead link** — `href="#"` in two places. Either supply the
   real profile URL or remove the icon.
4. **Instagram link still points to the old handle**
   `instagram.com/sunsmartenergytech`. That is the real account; the handle
   itself was never renamed after the EZ4U rebrand. Owner's decision.
5. **HitPay reference numbers are still prefixed `SS-`** (legacy "SUN SMART") in
   `create-payment.js`. Cosmetic, but it shows in the HitPay dashboard.
6. **Tagline "Smart Choice, Brighter Connection"** was written for the old brand
   name. Worth revisiting with the owner.
7. **Opening hours** are published as Monday–Saturday 10:00–20:00. Confirm
   against the mall's actual tenancy hours.
8. **Cart prices are DOM-scraped** (§7) — fragile by design.

---

## 12. How to verify your work (there are no tests)

There is no test suite and no linter. Verification is manual, so be systematic:

1. Serve the folder locally: `python3 -m http.server 8000 --directory public`
   then open `http://localhost:8000/`.
   (The payment function will not run this way — use `netlify dev` for that.)
2. On **every page you touched**, check: no console errors, no broken images,
   nav and footer links resolve.
3. Switch through **all three languages** and re-read your change.
4. Check **mobile width** (≤400px). Most visitors are on phones. Layout bugs
   here have shipped before precisely because only desktop was checked.
5. If you touched product markup: add to cart and **confirm the price is right**.
6. If you touched the cart: add a phone, add Protect, remove the phone, and
   confirm the plan is removed too.
7. Open a PR and check the Netlify preview before asking for review.

---

## 13. What is deliberately NOT in this repo

The owner runs other systems that are intentionally separate. You should not
need them, and access will not be granted as part of website work:

- **Daily operations app** — internal browser-based inventory, sales, purchases,
  expenses and daily cash closing. Separate codebase.
- **Finance models** — CAPEX/OPEX workbooks.
- **Other businesses' material** — unrelated ventures under NDA.

If a task seems to require any of these, stop and ask the owner rather than
requesting broader access.

---

## 14. Access and conventions

- **Branching:** work on a feature branch, open a pull request. Do not push to
  the production branch; that deploys straight to the live shop.
- **Commits:** one logical change per commit, with a message that says what and
  why.
- **Access you should have:** Write on this repository. That's it.
- **Access you should not have:** the live HitPay key, the Netlify account, or
  the domain registrar. Ask the owner if a task genuinely needs one and explain
  why.
- **Before the first commit:** NDA signed and IP ownership agreed in writing.
