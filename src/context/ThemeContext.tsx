"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "arfa-theme";

interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (value: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [storedTheme, setStoredTheme] = useState<Theme | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = (localStorage.getItem(STORAGE_KEY) as Theme) || "system";
    setStoredTheme(saved);
  }, []);

  const resolvedTheme = useMemo(() => {
    if (!mounted) return "light";
    if (storedTheme === "system") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return storedTheme ?? "light";
  }, [mounted, storedTheme]);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.removeAttribute("data-theme");
    if (resolvedTheme === "dark") {
      root.setAttribute("data-theme", "dark");
    }
    root.style.colorScheme = resolvedTheme;
  }, [resolvedTheme, mounted]);

  const setTheme = (value: Theme) => {
    setStoredTheme(value);
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* noop */ }
  };

  const toggleTheme = () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  };

  const value = useMemo<ThemeContextType>(
    () => ({ theme: storedTheme ?? "system", resolvedTheme, setTheme, toggleTheme }),
    [storedTheme, resolvedTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within a ThemeProvider");
  return ctx;
}
