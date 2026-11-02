"use client";
import { Bell, Menu, Moon, Search, Sun, User } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useTheme } from "@/context/ThemeContext";

export function TopNav({ toggleSidebar }: { toggleSidebar: () => void }) {
  const [query, setQuery] = useState("");
  const { resolvedTheme, toggleTheme } = useTheme();
  return <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/90 px-5 backdrop-blur-xl">
    <div className="flex items-center gap-3"><button className="rounded-lg p-2 hover:bg-accent md:hidden" aria-label="Open navigation" onClick={toggleSidebar}><Menu size={17}/></button><Link href="/dashboard" className="font-serif text-lg font-semibold tracking-[.16em]">ARFA</Link></div>
    <div className="flex items-center gap-2"><label className="relative hidden sm:block"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"/><input aria-label="Search guests and rooms" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search guests, rooms…" className="h-9 w-56 rounded-xl border border-input bg-card pl-9 pr-3 text-xs outline-none focus:border-ring"/></label><button aria-label="Notifications" className="rounded-full p-2 hover:bg-accent"><Bell size={16}/></button><button aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"} onClick={toggleTheme} className="rounded-full p-2 hover:bg-accent">{resolvedTheme === "dark" ? <Sun size={16}/> : <Moon size={16}/>}</button><button className="grid h-8 w-8 place-items-center rounded-full bg-accent" aria-label="User profile"><User size={15}/></button></div>
  </header>;
}
