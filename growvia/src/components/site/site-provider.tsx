"use client";

import * as React from "react";

type SiteContextValue = {
  consultationOpen: boolean;
  /** Optional service pre-selected when the modal opens. */
  preselectedService: string;
  openConsultation: (service?: string) => void;
  closeConsultation: () => void;
};

const SiteContext = React.createContext<SiteContextValue | null>(null);

export function SiteProvider({ children }: { children: React.ReactNode }) {
  const [consultationOpen, setConsultationOpen] = React.useState(false);
  const [preselectedService, setPreselectedService] = React.useState("");

  const openConsultation = React.useCallback((service?: string) => {
    setPreselectedService(service ?? "");
    setConsultationOpen(true);
  }, []);

  const closeConsultation = React.useCallback(
    () => setConsultationOpen(false),
    []
  );

  const value = React.useMemo(
    () => ({
      consultationOpen,
      preselectedService,
      openConsultation,
      closeConsultation,
    }),
    [consultationOpen, preselectedService, openConsultation, closeConsultation]
  );

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>;
}

export function useSite() {
  const ctx = React.useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within SiteProvider");
  return ctx;
}
