"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { InquiryForm } from "@/components/site/inquiry-form";
import { useSite } from "@/components/site/site-provider";

export function ConsultationModal() {
  const { consultationOpen, closeConsultation, preselectedService } =
    useSite();

  return (
    <Dialog open={consultationOpen} onOpenChange={(open) => !open && closeConsultation()}>
      <DialogContent aria-describedby="consultation-desc">
        <DialogHeader>
          <p className="eyebrow text-teal-600">Free Consultation</p>
          <DialogTitle>Tell Us About Your Project</DialogTitle>
          <DialogDescription id="consultation-desc">
            Share a few details and we&apos;ll be ready to discuss your goals,
            scope, and the right next step — no obligation.
          </DialogDescription>
        </DialogHeader>

        {preselectedService && (
          <p className="rounded-lg bg-mist px-4 py-2.5 text-[13px] text-charcoal/80">
            Enquiry about:{" "}
            <span className="font-semibold text-navy">
              {preselectedService}
            </span>
          </p>
        )}

        <InquiryForm />
      </DialogContent>
    </Dialog>
  );
}
