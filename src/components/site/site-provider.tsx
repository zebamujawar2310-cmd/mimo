"use client";

import * as React from "react";

type SiteContextValue = {
  orderOpen: boolean;
  trackOpen: boolean;
  preselectQty: number;
  trackPrefill: string;
  openOrder: (qty?: number) => void;
  closeOrder: () => void;
  openTrack: (orderId?: string) => void;
  closeTrack: () => void;
};

const SiteContext = React.createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [trackOpen, setTrackOpen] = React.useState(false);
  const [preselectQty, setPreselectQty] = React.useState(1);
  const [trackPrefill, setTrackPrefill] = React.useState("");

  const openOrder = React.useCallback((qty?: number) => {
    setPreselectQty(qty ?? 1);
    setTrackOpen(false);
    setOrderOpen(true);
  }, []);

  const closeOrder = React.useCallback(() => setOrderOpen(false), []);

  const openTrack = React.useCallback((orderId?: string) => {
    setTrackPrefill(orderId ?? "");
    setOrderOpen(false);
    setTrackOpen(true);
  }, []);

  const closeTrack = React.useCallback(() => setTrackOpen(false), []);

  const value = React.useMemo(
    () => ({
      orderOpen,
      trackOpen,
      preselectQty,
      trackPrefill,
      openOrder,
      closeOrder,
      openTrack,
      closeTrack,
    }),
    [
      orderOpen,
      trackOpen,
      preselectQty,
      trackPrefill,
      openOrder,
      closeOrder,
      openTrack,
      closeTrack,
    ]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = React.useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
