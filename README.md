# Trimmer Boss™ — Storefront (trimmerboss.shop)

A professional, conversion-focused ecommerce storefront for the Trimmer
Boss™ metal trimmer head. Built with **Next.js 16 + React 19 + TypeScript +
Tailwind CSS 4 + shadcn/ui + Lucide icons**.

> **Demo storefront.** There is no backend: orders, tracking and contact
> messages are simulated in the browser and clearly labelled as such. No
> payment is ever processed.

## Getting started

```bash
npm install
npm run dev        # development server → http://localhost:3000
npm run build      # production build
npm start          # serve the production build
npm run test:pricing   # verify bundle discount math (13 checks)
npm run test:e2e       # full browser test suite (27 checks) — start the
                       # production server on :3100 first; needs Chromium
                       # via `npx playwright install chromium`
```

The e2e suite covers: modal open/close, bundle discount display, form
validation, demo order + tracking flows, FAQ accordion, contact form,
console/page errors, horizontal-overflow checks at 320 / 375 / 768 / 1024 /
1440 px, and the mobile hamburger menu. Full-page screenshots are saved to
`screenshots/`.

Node.js 20.9+ is required (tested with Node 24 / npm 11).

## Store configuration (already set)

| Setting | Value | Where |
|---|---|---|
| Unit price | 6,643 INR | `UNIT_PRICE` in `src/lib/config.ts` |
| 2-pack offer | 15% off + free worldwide shipping | `BUNDLES` |
| 3-pack offer | 27% off + expedited shipping | `BUNDLES` |
| Stock count | 90 units | `STOCK.count` (update manually) |
| Trust benefits | All three active | `TRUST` |
| Assets | `hero-bg.webp` + `product-video.mp4` installed | `public/` |

Sell in a different currency? Change `UNIT_PRICE.currency` (e.g. `"INR"`,
`"USD"`).

## Before launch — owner checklist

1. **Support email** — confirm `SITE.supportEmail` is a monitored mailbox.
2. **Policies** — replace the four placeholder policy pages
   (`src/app/shipping-policy`, `returns-refunds`, `privacy-policy`,
   `terms-and-conditions`) with final legal text.
3. **Forms, orders & reviews** — connect a form service and a real
   checkout/tracking/moderation system to replace the clearly-labelled demo
   flows (contact form, order + tracking modals, review submissions).
4. **Currency** — verify `UNIT_PRICE.currency` matches how you sell.

## Project structure

```
src/
  app/                 # App Router pages (home + 4 policy pages + SEO files)
  components/
    ui/                # shadcn/ui primitives (button, dialog, accordion…)
    site/              # page sections (hero, bundles, modals, footer…)
  lib/
    config.ts          # ← all editable business config lives here
    pricing.ts         # pure bundle/discount math (unit-tested)
    demo-orders.ts     # browser-only demo order storage
scripts/
  verify-pricing.mjs   # pricing math checks
```

## Design system

- **Typography:** Times New Roman throughout (system font — zero webfont cost)
- **Palette:** black & white only; black text on white, white text on dark
- **Layout:** center-aligned hero and section headings, mobile-first
  breakpoints (320 / 375 / 768 / 1024 / desktop)
- **Motion:** subtle hover/transition effects; all animation is disabled
  under `prefers-reduced-motion`

## Honesty rules encoded in the code

- No fabricated prices, reviews, ratings or scarcity — placeholders are
  labelled on-screen until real data is configured.
- Every demo interaction (order, tracking, contact) states explicitly that
  nothing was sent or charged.
