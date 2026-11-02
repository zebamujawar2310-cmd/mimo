"use client";

import { ThemeProvider } from "@/context/ThemeContext";
import { HotelProvider } from "@/context/HotelContext";
import { ToastProvider } from "@/components/ui/toast";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <HotelProvider>
        <ToastProvider>{children}</ToastProvider>
      </HotelProvider>
    </ThemeProvider>
  );
}
