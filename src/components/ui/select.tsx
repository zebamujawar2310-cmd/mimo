"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
  error?: string;
}

export function Select({ label, helperText, error, className, ...props }: SelectProps) {
  return (
    <div className={cn("space-y-1", className)}>
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
        </label>
      )}
      <select
        className={cn(
          "flex h-10 w-full rounded-xl border border-input bg-input px-3 py-2 text-sm outline-none transition-colors disabled:cursor-not-allowed disabled:opacity-50",
          error ? "border-destructive focus:border-destructive focus:ring-1 focus:ring-destructive" : "focus:border-ring focus:ring-1 focus:ring-ring",
          "data-[state=open]:bg-accent"
        )}
        {...props}
      />
      {error && <p className="text-xs text-destructive">{error}</p>}
      {!error && helperText && <p className="text-xs text-muted-foreground">{helperText}</p>}
    </div>
  );
}
