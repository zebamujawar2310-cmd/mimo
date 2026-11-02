import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

/**
 * Accessible native <select> wrapper. Uses the platform control for
 * keyboard/screen-reader support, restyled to match the design system.
 */
const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, children, ...props }, ref) => (
  <div className="relative">
    <select
      ref={ref}
      className={cn(
        "h-11 w-full appearance-none rounded-lg border border-slate-line bg-white px-4 pr-10 text-sm text-charcoal transition-colors",
        "focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25",
        "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-200",
        className
      )}
      {...props}
    >
      {children}
    </select>
    <ChevronDown
      aria-hidden="true"
      className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal/50"
    />
  </div>
));
Select.displayName = "Select";

export { Select };
