"use client";

import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: React.ReactNode;
  subtitle?: string;
  trend?: { label: string; value: number; positive: boolean };
  icon: React.ElementType;
  variant?: "default" | "gold";
}

export function StatCard({ title, value, subtitle, trend, icon: Icon, variant = "default" }: StatCardProps) {
  return (
    <div className={cn(
      "rounded-2xl p-5 border border-border bg-card text-foreground shadow-sm",
      variant === "gold" ? "border-gold/40 bg-gold-50/40" : ""
    )}>
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={cn("h-8 w-8 rounded-xl flex items-center justify-center", variant === "gold" ? "bg-gold text-charcoal-900" : "bg-accent text-accent-foreground")}>
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
        {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
      </div>
      <div className="text-2xl font-serif font-bold">{value}</div>
      {trend && (
        <div className={cn("mt-2 flex items-center gap-1 text-sm font-medium", trend.positive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400")}>
          {trend.positive ? <span className="h-3 w-3 bg-emerald-600 dark:bg-emerald-400 rounded-full" /> : <span className="h-3 w-3 bg-rose-600 dark:bg-rose-400 rounded-full" />}
          {trend.label}
        </div>
      )}
    </div>
  </div>
  );
}
