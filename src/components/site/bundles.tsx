"use client";

import { Check } from "lucide-react";

import { BUNDLES, UNIT_PRICE } from "@/lib/config";
import { calcBundle, formatMoney } from "@/lib/pricing";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSite } from "@/components/site/site-provider";

export function Bundles() {
  const { openOrder } = useSite();

  return (
    <section id="bundles" className="border-t border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4 text-black/50">Bundles</p>
          <h2 className="text-3xl sm:text-4xl">
            Own more. Save more.
          </h2>
          <p className="mt-4 text-black/70">
            Discounts apply automatically at checkout — outfit one property
            or the whole crew and keep the savings.
          </p>
          {UNIT_PRICE.isPlaceholder && (
            <p className="mx-auto mt-6 inline-block border border-black/20 px-4 py-2 text-xs text-black/60">
              Store demo — unit price placeholder. Set{" "}
              <code className="font-mono">UNIT_PRICE</code> in{" "}
              <code className="font-mono">src/lib/config.ts</code> to display
              live prices here.
            </p>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {BUNDLES.map((tier) => {
            const priceLabel =
              UNIT_PRICE.amount !== null
                ? formatMoney(
                    calcBundle(UNIT_PRICE.amount, tier.qty, BUNDLES).total,
                    UNIT_PRICE.currency
                  )
                : null;
            const isPopular = tier.qty === 2;
            const isBest = tier.qty === 3;

            return (
              <div
                key={tier.qty}
                className={`relative flex flex-col border p-8 text-center transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(0,0,0,0.12)] ${
                  isBest ? "border-black bg-black text-white" : "border-black/15"
                }`}
              >
                {isPopular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}
                {isBest && (
                  <Badge
                    variant="inverse"
                    className="absolute -top-3 left-1/2 -translate-x-1/2"
                  >
                    Best Value
                  </Badge>
                )}

                <h3 className="text-lg">{tier.label}</h3>
                <p className="mt-1 text-sm opacity-70">
                  {tier.qty} × Trimmer&nbsp;Boss™ head
                </p>

                <div className="mt-6">
                  {tier.discountPercent > 0 ? (
                    <Badge
                      variant={isBest ? "inverse" : "default"}
                      className="mx-auto"
                    >
                      Save {tier.discountPercent}%
                    </Badge>
                  ) : (
                    <Badge
                      variant={isBest ? "inverse" : "outline"}
                      className="mx-auto"
                    >
                      Standard price
                    </Badge>
                  )}
                </div>

                <p className="mt-6 text-3xl">
                  {UNIT_PRICE.amount !== null ? (
                    priceLabel
                  ) : (
                    <span className="text-xl opacity-60">Price TBA</span>
                  )}
                </p>
                {UNIT_PRICE.amount !== null && tier.discountPercent > 0 && (
                  <p className="mt-1 text-sm line-through opacity-50">
                    {formatMoney(
                      UNIT_PRICE.amount * tier.qty,
                      UNIT_PRICE.currency
                    )}
                  </p>
                )}

                <ul className="mt-6 flex flex-col gap-2 text-sm opacity-80">
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Durable metal trimmer head
                  </li>
                  {tier.qty > 1 && (
                    <li className="flex items-center justify-center gap-2">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Bundle discount applied automatically
                    </li>
                  )}
                  <li className="flex items-center justify-center gap-2">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {tier.perk}
                  </li>
                </ul>

                <Button
                  variant={isBest ? "inverse" : "default"}
                  className="mt-8 w-full"
                  onClick={() => openOrder(tier.qty)}
                >
                  Order {tier.qty > 1 ? `${tier.qty}` : "Now"}
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
