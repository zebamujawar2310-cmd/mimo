"use client";

import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useSite } from "@/components/site/site-provider";

/**
 * Button that opens the consultation modal, optionally pre-selecting a
 * service in the inquiry form.
 */
export function ConsultationButton({
  service,
  children,
  ...props
}: ButtonProps & { service?: string; children: React.ReactNode }) {
  const { openConsultation } = useSite();
  return (
    <Button
      type="button"
      onClick={() => openConsultation(service)}
      {...props}
    >
      {children}
    </Button>
  );
}
