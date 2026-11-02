"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BedDouble,
  Users,
  Calendar,
  CheckCircle2,
  LogOut,
  FileText,
  Building2,
  Shield,
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  Menu,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Rooms", href: "/dashboard/rooms", icon: BedDouble },
  { name: "Guests", href: "/dashboard/guests", icon: Users },
  { name: "Reservations", href: "/dashboard/reservations", icon: Calendar },
  { name: "Check-In", href: "/dashboard/check-in", icon: CheckCircle2 },
  { name: "Check-Out", href: "/dashboard/check-out", icon: FileText },
  { name: "Billing", href: "/dashboard/billing", icon: Shield },
  { name: "Housekeeping", href: "/dashboard/housekeeping", icon: Building2 },
  { name: "Reviews", href: "/dashboard/reviews", icon: MessageSquare },
  { name: "Reports", href: "/dashboard/reports", icon: LayoutDashboard },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (c: boolean) => void;
}

export function Sidebar({ collapsed, setCollapsed }: SidebarProps) {
  const { theme, toggleTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-full border-r border-border bg-card text-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
      aria-label="Main navigation"
    >
      <div className="flex h-16 items-center justify-between px-4 border-b border-border">
        {!collapsed ? (
          <>
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gold flex items-center justify-center text-charcoal-900 font-serif text-xl font-bold">
                A
              </div>
              <span className="font-serif font-bold text-xl tracking-tight">ARFA</span>
            </Link>
            <button
              onClick={() => setCollapsed(true)}
              className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors md:hidden"
              aria-label="Close navigation"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          </>
        ) : (
          <button
            onClick={() => setCollapsed(false)}
            className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="h-4 w-4" />
          </button>
        )}
        <button
          onClick={toggleTheme}
          className="rounded-md p-1.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          title={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1" aria-label="Main navigation">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-gold text-charcoal-900 shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className={cn("h-4 w-4", isActive ? "text-charcoal-900" : "text-muted-foreground")} />
              <span className={cn("opacity-100 transition-opacity", collapsed && "opacity-0")}>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => {}}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span className={cn("opacity-100 transition-opacity", collapsed && "opacity-0")}>Sign out</span>
        </button>
      </div>
    </aside>
  );
}
