"use client";

import * as React from "react";
import { Loader2, PackageSearch } from "lucide-react";

import { DEMO } from "@/lib/config";
import { resolveTracking, type TrackResult } from "@/lib/demo-orders";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSite } from "@/components/site/site-provider";

const SAMPLE_STEPS = [
  { label: "Order placed", note: "Demo milestone" },
  { label: "Packed", note: "Demo milestone" },
  { label: "Shipped", note: "Demo milestone" },
  { label: "Delivered", note: "Demo milestone" },
];

export function TrackModal() {
  const { trackOpen, closeTrack, trackPrefill } = useSite();
  const [orderId, setOrderId] = React.useState("");
  const [phase, setPhase] = React.useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = React.useState<TrackResult | null>(null);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!trackOpen) return;
    setOrderId(trackPrefill);
    setResult(null);
    setError(null);
    if (trackPrefill.trim()) {
      // Opened with an ID (e.g. from the order success screen) — run the
      // lookup automatically so the customer sees their status immediately.
      setPhase("loading");
      const t = window.setTimeout(() => {
        setResult(resolveTracking(trackPrefill.trim()));
        setPhase("done");
      }, 900);
      return () => window.clearTimeout(t);
    }
    setPhase("idle");
  }, [trackOpen, trackPrefill]);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = orderId.trim();
    if (!trimmed) {
      setError("Enter an order ID to continue.");
      return;
    }
    setError(null);
    setPhase("loading");
    window.setTimeout(() => {
      setResult(resolveTracking(trimmed));
      setPhase("done");
    }, 900);
  };

  return (
    <Dialog open={trackOpen} onOpenChange={(o) => !o && closeTrack()}>
      <DialogContent aria-describedby="track-dialog-desc">
        <DialogHeader>
          <DialogTitle>Track your order</DialogTitle>
          <DialogDescription id="track-dialog-desc">
            Enter the order ID from your confirmation. Demo mode: only demo
            IDs (format {DEMO.orderPrefix}####) resolve — no live shipping
            system is connected.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleTrack} className="flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder={`e.g. ${DEMO.sampleOrderId}`}
            value={orderId}
            onChange={(e) => {
              setOrderId(e.target.value);
              setError(null);
            }}
            aria-label="Order ID"
            aria-invalid={!!error}
            className="flex-1"
          />
          <Button type="submit" disabled={phase === "loading"}>
            {phase === "loading" ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : (
              <PackageSearch className="h-4 w-4" aria-hidden="true" />
            )}
            Track
          </Button>
        </form>
        {error && <p className="text-xs text-black">{error}</p>}

        {phase === "done" && result && (
          <div className="border border-black/15 p-5">
            {result.kind === "not-found" && (
              <div className="text-center">
                <p className="text-lg">No demo order found.</p>
                <p className="mt-2 text-sm text-black/60">
                  Check the ID and try again. Try the sample ID{" "}
                  <button
                    type="button"
                    className="underline underline-offset-2"
                    onClick={() => setOrderId(DEMO.sampleOrderId)}
                  >
                    {DEMO.sampleOrderId}
                  </button>{" "}
                  to preview the tracking experience.
                </p>
              </div>
            )}

            {result.kind === "sample" && (
              <div>
                <p className="text-center text-sm text-black/60">
                  Sample demo order — milestones below are illustrative.
                </p>
                <ol className="mt-4 flex flex-col gap-3">
                  {SAMPLE_STEPS.map((step, i) => (
                    <li key={step.label} className="flex items-center gap-3">
                      <span
                        className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-black text-xs"
                        aria-hidden="true"
                      >
                        {i + 1}
                      </span>
                      <span className="text-sm">
                        {step.label}
                        <span className="ml-2 text-xs text-black/50">
                          {step.note}
                        </span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {result.kind === "stored" && (
              <div className="text-center">
                <p className="text-lg">
                  Order {result.order.id} — received
                </p>
                <p className="mt-2 text-sm text-black/60">
                  Status: <strong>Received (demo)</strong>. This order lives
                  in your browser only; shipping updates will appear here
                  once a real order system is connected.
                </p>
                <p className="mt-2 text-xs text-black/50">
                  Placed: {new Date(result.order.createdAt).toLocaleString()}
                  {" · "}Quantity: {result.order.qty}
                </p>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
