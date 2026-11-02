import { Lock, ShieldCheck, Truck } from "lucide-react";

import { TRUST } from "@/lib/config";

const items = [
  {
    icon: Truck,
    label: "Free Shipping Worldwide",
    confirmed: TRUST.freeWorldwideShipping,
  },
  {
    icon: ShieldCheck,
    label: "30 Day Money-Back Guarantee",
    confirmed: TRUST.moneyBackGuarantee,
  },
  {
    icon: Lock,
    label: "100% Secure Checkout",
    confirmed: TRUST.secureCheckout,
  },
];

export function TrustStrip() {
  const anyUnconfirmed = items.some((item) => !item.confirmed);

  return (
    <section aria-label="Store assurances" className="border-b border-black/10 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 text-center sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <item.icon className="h-6 w-6" aria-hidden="true" />
              <p className="text-sm tracking-[0.12em] uppercase">
                {item.label}
                {!item.confirmed && (
                  <sup className="ml-1" title="To be confirmed">
                    *
                  </sup>
                )}
              </p>
            </div>
          ))}
        </div>
        {anyUnconfirmed && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-black/50">
            *marked items are planned store offers and will be presented as
            active guarantees once our shipping, refund and payment providers
            are confirmed. See our{" "}
            <a href="/shipping-policy" className="underline underline-offset-2">
              Shipping
            </a>{" "}
            and{" "}
            <a href="/returns-refunds" className="underline underline-offset-2">
              Returns
            </a>{" "}
            pages for current details.
          </p>
        )}
      </div>
    </section>
  );
}
