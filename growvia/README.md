# Growvia — Business & Digital Agency Website

Premium, conversion-focused marketing site for **Growvia** — a full-service
digital agency. Frontend-only: no backend, database, auth, or payments.

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS v4 · Radix UI · lucide-react

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (includes type checking)
npm run start    # serve the production build
node scripts/visual-check.mjs   # optional: Playwright smoke test (server must be running)
```

## Where to edit content

| What | File |
| --- | --- |
| Site name, tagline, URL, **placeholder contact details & social links** | `src/lib/config.ts` |
| Nav links, service dropdown & budget options | `src/lib/config.ts` |
| Services, case studies, process, values, FAQ copy | `src/lib/content.ts` |
| Page sections (order on the home page) | `src/app/page.tsx` |
| Metadata / Open Graph / JSON-LD | `src/app/layout.tsx` |
| Design tokens (brand colors, fonts) | `src/app/globals.css` |

## Before you launch — replace these placeholders

1. **Contact details** in `src/lib/config.ts`: `email`, `phone`, `whatsapp`,
   `location`, `url` (currently `growvia.example.com` and `+1 (000) 000-0000`).
   The site labels these as placeholders on-screen until you do.
2. **Social links** in `SOCIAL_LINKS` (they currently point to placeholder
   profile URLs).
3. **Portfolio**: all six case studies are explicitly labelled **sample
   projects**. Replace them in `src/lib/content.ts` with verified client work;
   set `outcomes` only when you have real, approved results.
4. **Testimonials**: the section renders an honest placeholder state. Add real,
   permissioned quotes to `src/lib/content.ts` when available.
5. **Legal pages**: `/privacy-policy` and `/terms` are starter templates and
   must be reviewed (ideally by a lawyer) before launch.

## Demo form behavior (intentional)

This project is frontend-only. The inquiry form (inline in the contact section
and inside the consultation modal) **validates in the browser only** — nothing
is transmitted or stored. Both the form notice and the success state say so
explicitly. To go live, connect a form service (e.g. Formspree, Web3Forms) or
your own API endpoint in `src/components/site/inquiry-form.tsx` (`handleSubmit`).

## Integrity rules baked into the site

- No invented clients, logos, awards, statistics, or performance claims
- Every portfolio item is badged “Sample Project”; outcomes render as an
  honest placeholder until verified
- Testimonials show a clearly labelled placeholder state
- Contact/social details are visibly marked as placeholders
