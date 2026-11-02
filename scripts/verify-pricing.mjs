// Verifies the pure bundle-pricing math used across the site.
// Run with: npm run test:pricing   (Node 24+ strips types natively)
import {
  calcBundle,
  discountPercentFor,
  round2,
  tierForQuantity,
} from "../src/lib/pricing.ts";

const tiers = [
  { qty: 1, discountPercent: 0, label: "Single" },
  { qty: 2, discountPercent: 15, label: "Duo" },
  { qty: 3, discountPercent: 27, label: "Triple" },
];

let failures = 0;

function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (!ok) failures += 1;
  console.log(`${ok ? "PASS" : "FAIL"} ${name} — got ${JSON.stringify(actual)}, expected ${JSON.stringify(expected)}`);
}

// Tier selection
check("tier for qty 1", tierForQuantity(1, tiers).discountPercent, 0);
check("tier for qty 2", tierForQuantity(2, tiers).discountPercent, 15);
check("tier for qty 3", tierForQuantity(3, tiers).discountPercent, 27);
check("tier for qty 4 (keeps best tier)", tierForQuantity(4, tiers).discountPercent, 27);
check("tier for qty 0 clamps to 1", tierForQuantity(0, tiers).discountPercent, 0);
check("tier for non-integer 2.9 floors", tierForQuantity(2.9, tiers).discountPercent, 15);
check("percent helper matches", discountPercentFor(3, tiers), 27);

// Money math
check("1 × 49.90 = 49.90", calcBundle(49.9, 1, tiers).total, 49.9);
check("2 × 49.90 −15% = 84.83", calcBundle(49.9, 2, tiers).total, 84.83);
check("3 × 49.90 −27% = 109.28", calcBundle(49.9, 3, tiers).total, 109.28);
check(
  "discount amount 2-pack",
  calcBundle(49.9, 2, tiers).discountAmount,
  14.97
);
check(
  "per-unit effective 3-pack",
  calcBundle(49.9, 3, tiers).perUnitEffective,
  36.43
);
check("round2 half-cent", round2(10.005), 10.01);

if (failures > 0) {
  console.error(`\n${failures} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll pricing checks passed.");
