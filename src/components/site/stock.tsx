import { Package } from "lucide-react";

import { STOCK } from "@/lib/config";

export function Stock() {
  return (
    <section
      aria-label="Inventory notice"
      className="border-t border-black/10 bg-white"
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-3 px-4 py-10 text-center sm:px-6">
        <Package className="h-6 w-6 text-black/70" aria-hidden="true" />
        <p className="text-sm tracking-[0.12em] uppercase">
          In stock: {STOCK.count} units available
        </p>
        <p className="max-w-md text-xs text-black/50">
          Stock is updated by our team as units sell out — when it&apos;s
          gone, it&apos;s gone.
        </p>
      </div>
    </section>
  );
}