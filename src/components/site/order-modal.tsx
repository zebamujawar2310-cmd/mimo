"use client";

import * as React from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

import { BUNDLES, DEMO, STOCK, UNIT_PRICE } from "@/lib/config";
import { calcBundle, formatMoney, tierForQuantity } from "@/lib/pricing";
import { generateDemoOrderId, saveDemoOrder } from "@/lib/demo-orders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSite } from "@/components/site/site-provider";

type Field = "name" | "email" | "address" | "city" | "country";
type Errors = Partial<Record<Field, string>>;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function OrderModal() {
  const { orderOpen, closeOrder, preselectQty, openTrack } = useSite();
  const [qty, setQty] = React.useState(1);
  const [form, setForm] = React.useState({
    name: "", email: "", address: "", city: "", country: "",
  });
  const [errors, setErrors] = React.useState<Errors>({});
  const [phase, setPhase] = React.useState<"form" | "loading" | "success">("form");
  const [orderId, setOrderId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (orderOpen) {
      setQty(preselectQty);
      setPhase("form");
      setErrors({});
    }
  }, [orderOpen, preselectQty]);

  const set = (key: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const validate = (): boolean => {
    const n: Errors = {};
    if (!form.name.trim()) n.name = "Please enter your full name.";
    if (!EMAIL_RE.test(form.email.trim()))
      n.email = "Please enter a valid email address.";
    if (!form.address.trim()) n.address = "Please enter your street address.";
    if (!form.city.trim()) n.city = "Please enter your city.";
    if (!form.country.trim()) n.country = "Please enter your country.";
    setErrors(n);
    return Object.keys(n).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setPhase("loading");
    window.setTimeout(() => {
      const id = generateDemoOrderId();
      const c = UNIT_PRICE.amount !== null
        ? calcBundle(UNIT_PRICE.amount, qty, BUNDLES) : null;
      saveDemoOrder({
        id, qty,
        discountPercent: c?.discountPercent ?? 0,
        total: c?.total ?? null,
        currency: UNIT_PRICE.currency,
        createdAt: new Date().toISOString(),
        status: "received",
      });
      setOrderId(id);
      setPhase("success");
    }, 1200);
  };

  const calc = UNIT_PRICE.amount !== null
    ? calcBundle(UNIT_PRICE.amount, qty, BUNDLES) : null;
  const tier = tierForQuantity(qty, BUNDLES);

  return (
    <Dialog open={orderOpen} onOpenChange={(o) => !o && closeOrder()}>
      <DialogContent aria-describedby="order-dialog-desc">
        {phase === "success" ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-12 w-12" aria-hidden="true" />
            <DialogTitle className="mt-4">Demo order created</DialogTitle>
            <p id="order-dialog-desc" className="mt-3 text-sm text-black/70">
              This storefront is a frontend demo. <strong>No payment was
              taken</strong> and nothing was transmitted to a fulfilment
              system. Your demo order was saved in this browser only.
            </p>
            <div className="mt-6 border border-black/15 p-4 text-left text-sm">
              <p>
                <span className="text-black/60">Order ID:&nbsp;</span>
                <strong>{orderId}</strong>
              </p>
              <p className="mt-1">
                <span className="text-black/60">Quantity:&nbsp;</span>
                {qty} × Trimmer&nbsp;Boss™ head
              </p>
              <p className="mt-1">
                <span className="text-black/60">Total:&nbsp;</span>
                {calc ? formatMoney(calc.total, UNIT_PRICE.currency) : "Price TBA"}
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <Button
                onClick={() => openTrack(orderId ?? undefined)}
                className="w-full sm:w-auto"
              >
                Track this demo order
              </Button>
              <Button
                variant="outline"
                onClick={closeOrder}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </div>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Order Trimmer&nbsp;Boss™</DialogTitle>
              <DialogDescription id="order-dialog-desc">
                Select your bundle, then enter delivery details. This is a
                demo checkout — no payment is processed.
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-3 gap-2" role="radiogroup" aria-label="Bundle">
              {BUNDLES.map((tier) => {
                const selected = qty === tier.qty;
                return (
                  <button
                    key={tier.qty}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setQty(tier.qty)}
                    className={`border p-3 text-center transition-all duration-200 ${
                      selected
                        ? "border-black bg-black text-white"
                        : "border-black/20 hover:border-black"
                    }`}
                  >
                    <span className="block text-lg">{tier.qty}</span>
                    <span className="block text-[0.65rem] tracking-[0.15em] uppercase opacity-80">
                      {tier.discountPercent > 0 ? `Save ${tier.discountPercent}%` : "Single"}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="border border-black/10 bg-black/[0.03] p-4 text-sm">
              {calc ? (
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between">
                    <span className="text-black/60">
                      {qty} × {formatMoney(calc.unitPrice, UNIT_PRICE.currency)}
                    </span>
                    <span>{formatMoney(calc.subtotal, UNIT_PRICE.currency)}</span>
                  </div>
                  {calc.discountPercent > 0 && (
                    <div className="flex justify-between">
                      <span className="text-black/60">
                        Bundle discount ({calc.discountPercent}%)
                      </span>
                      <span>
                        −{formatMoney(calc.discountAmount, UNIT_PRICE.currency)}
                      </span>
                    </div>
                  )}
                  <div className="mt-1 flex justify-between border-t border-black/10 pt-2">
                    <span className="text-black/60">Total</span>
                    <strong>{formatMoney(calc.total, UNIT_PRICE.currency)}</strong>
                  </div>
                </div>
              ) : (
                <p className="text-black/60">
                  Price to be announced — discount math activates automatically
                  once the unit price is configured.
                </p>
              )}
              <p className="mt-2 text-xs text-black/50">
                {tier.perk} · {STOCK.count} units in stock
              </p>
            </div>

            <form onSubmit={handleSubmit} noValidate className="grid gap-4">
              <FieldInput
                id="order-name" label="Full name" autoComplete="name"
                value={form.name} onChange={set("name")} error={errors.name}
              />
              <FieldInput
                id="order-email" label="Email" type="email" autoComplete="email"
                value={form.email} onChange={set("email")} error={errors.email}
              />
              <FieldInput
                id="order-address" label="Street address" autoComplete="street-address"
                value={form.address} onChange={set("address")} error={errors.address}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FieldInput
                  id="order-city" label="City" autoComplete="address-level2"
                  value={form.city} onChange={set("city")} error={errors.city}
                />
                <FieldInput
                  id="order-country" label="Country" autoComplete="country-name"
                  value={form.country} onChange={set("country")} error={errors.country}
                />
              </div>

              <Button
                type="submit"
                className="mt-2 h-auto w-full whitespace-normal py-3"
                disabled={phase === "loading"}
              >
                {phase === "loading" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Placing demo order…
                  </>
                ) : (
                  `Place demo order — ${qty} × Trimmer Boss™`
                )}
              </Button>
              <p className="text-center text-xs text-black/50">
                Demo checkout. No payment details are requested or stored.
                Sample demo id format: {DEMO.orderPrefix}####
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function FieldInput({
  id, label, value, onChange, error, type = "text", autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-err` : undefined}
      />
      {error && (
        <p id={`${id}-err`} className="text-xs text-black">
          {error}
        </p>
      )}
    </div>
  );
}
