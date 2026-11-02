import { ArrowRight, CalendarCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ConsultationButton } from "@/components/site/consultation-button";

export function CtaSection() {
  return (
    <section
      aria-labelledby="cta-heading"
      className="relative overflow-hidden bg-navy py-16 sm:py-20"
    >
      {/* Decorative glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute -left-20 top-0 h-64 w-64 rounded-full bg-teal/20 blur-3xl" />
        <div className="absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-navy-700/60 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal/15">
          <CalendarCheck className="h-7 w-7 text-teal-400" aria-hidden="true" />
        </span>
        <h2
          id="cta-heading"
          className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
        >
          Ready to Take Your Business Further?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
          Let&apos;s discuss your goals and find the right digital solutions to
          move your business forward.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ConsultationButton size="lg" className="w-full sm:w-auto">
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ConsultationButton>
          <Button size="lg" variant="outlineInverse" className="w-full sm:w-auto" asChild>
            <a href="#contact">Tell Us About Your Project</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
