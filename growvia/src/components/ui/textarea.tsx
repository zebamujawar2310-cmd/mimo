import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[120px] w-full rounded-lg border border-slate-line bg-white px-4 py-3 text-sm text-charcoal placeholder:text-charcoal/45 transition-colors",
      "focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/25",
      "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:ring-red-200",
      className
    )}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export { Textarea };
