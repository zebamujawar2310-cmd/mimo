import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => (
    <input
      type={type}
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg border border-slate-line bg-white px-4 py-2 text-sm text-charcoal placeholder:text-charcoal/45 transition-colors",
        "focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25",
        "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-200",
        className
      )}
      {...props}
    />
  )
);
Input.displayName = "Input";

export { Input };
