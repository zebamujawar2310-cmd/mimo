/* ------------------------------------------------------------------
 * Trimmer Boss™ — central site configuration
 * All business data (price, stock, offers) lives here.
 * ------------------------------------------------------------------ */

export const SITE = {
  name: "Trimmer Boss™",
  legalName: "Trimmer Boss™",
  domain: "trimmerboss.shop",
  url: "https://trimmerboss.shop",
  tagline: "Less hassle. More power. Smarter yard care.",
  /** Confirm this mailbox exists before launch. */
  supportEmail: "support@trimmerboss.shop",
} as const;

export const PRODUCT = {
  name: "Trimmer Boss™ Metal Trimmer Head",
  shortName: "Trimmer Boss™",
  headline: "DITCH THE PLASTIC. FEEL THE POWER OF METAL.",
  subheadline:
    "The indestructible metal trimmer head that outcuts, outlasts and outperforms string — permanently.",
  description:
    "Plastic line frays on concrete, snaps in thick weeds, and keeps you re-spooling mid-job. Trimmer Boss™ replaces that whole fragile system with one durable metal head — built for grass, moss, weeds, dirt and driveway grime, and fitted to 99% of trimmers with the free adapter kit included.",
} as const;

/* ------------------------------------------------------------------
 * PRICING — real store data (6643/- per unit)
 * Change `currency` if you sell in a different currency
 * (e.g. "INR", "USD", "AED"...).
 * ------------------------------------------------------------------ */
export const UNIT_PRICE: {
  amount: number | null;
  currency: "PKR" | "INR" | "USD" | "EUR" | "GBP";
  isPlaceholder: boolean;
} = {
  amount: 6643,
  currency: "INR",
  isPlaceholder: false,
};

/** Bundle offers: buy more, save more. */
export const BUNDLES = [
  {
    qty: 1,
    discountPercent: 0,
    label: "Single",
    perk: "Free worldwide shipping",
  },
  {
    qty: 2,
    discountPercent: 15,
    label: "Duo",
    perk: "Free worldwide shipping",
  },
  {
    qty: 3,
    discountPercent: 27,
    label: "Triple",
    perk: "Expedited shipping",
  },
] as const;

export type BundleTier = (typeof BUNDLES)[number];

/* ------------------------------------------------------------------
 * INVENTORY — owner-maintained count (update manually as stock changes)
 * ------------------------------------------------------------------ */
export const STOCK = {
  count: 90,
  isDemo: false,
} as const;

/* ------------------------------------------------------------------
 * TRUST OFFERS — confirmed active store benefits
 * ------------------------------------------------------------------ */
export const TRUST = {
  freeWorldwideShipping: true,
  moneyBackGuarantee: true,
  secureCheckout: true,
} as const;

/* ------------------------------------------------------------------
 * DEMO DATA — clearly labelled, never presented as real.
 * ------------------------------------------------------------------ */
export const DEMO = {
  sampleOrderId: "TB-DEMO-0001",
  orderPrefix: "TB-DEMO-",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Product", href: "#product" },
  { label: "Benefits", href: "#benefits" },
  { label: "Our Mission", href: "#mission" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact Us", href: "#contact" },
] as const;