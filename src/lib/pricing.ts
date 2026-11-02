/* ------------------------------------------------------------------
 * Pure bundle-pricing helpers (no framework imports on purpose so
 * they can be unit-verified with plain Node — see scripts/verify-pricing.mjs)
 * ------------------------------------------------------------------ */

export type PricingTier = {
  qty: number;
  discountPercent: number;
  label: string;
};

export function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Highest tier at or below the requested quantity (never below the first tier). */
export function tierForQuantity<T extends PricingTier>(
  qty: number,
  tiers: readonly T[]
): T {
  const safeQty = Math.max(1, Math.floor(qty));
  let match = tiers[0];
  for (const tier of tiers) {
    if (safeQty >= tier.qty) match = tier;
  }
  return match;
}

export function discountPercentFor(
  qty: number,
  tiers: readonly PricingTier[]
): number {
  return tierForQuantity(qty, tiers).discountPercent;
}

export type BundleCalculation = {
  qty: number;
  unitPrice: number;
  discountPercent: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  perUnitEffective: number;
};

/** All money values are rounded to 2 decimals (bankers-friendly EPSILON rounding). */
export function calcBundle(
  unitPrice: number,
  qty: number,
  tiers: readonly PricingTier[]
): BundleCalculation {
  const safeQty = Math.max(1, Math.floor(qty));
  const discountPercent = discountPercentFor(safeQty, tiers);
  const subtotal = round2(unitPrice * safeQty);
  const discountAmount = round2(subtotal * (discountPercent / 100));
  const total = round2(subtotal - discountAmount);
  const perUnitEffective = round2(total / safeQty);
  return {
    qty: safeQty,
    unitPrice: round2(unitPrice),
    discountPercent,
    subtotal,
    discountAmount,
    total,
    perUnitEffective,
  };
}

/** Formats an amount, e.g. "49.90 USD". Returns null when price is unknown. */
export function formatMoney(
  amount: number | null,
  currency: string = "USD"
): string | null {
  if (amount === null || Number.isNaN(amount)) return null;
  try {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${amount.toFixed(2)} ${currency}`;
  }
}
