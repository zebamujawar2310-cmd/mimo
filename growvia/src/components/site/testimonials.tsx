import { Quote, Star } from "lucide-react";

import { TESTIMONIAL_SLOTS } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="section-anchor bg-mist py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Clients Say"
          id="testimonials-heading"
          intro="We only publish genuine feedback from real clients. Verified testimonials will appear here as soon as they're available."
        />

        {/* Honest placeholder state */}
        <div className="mx-auto mt-8 max-w-2xl rounded-lg border border-dashed border-slate-line bg-white px-5 py-3.5 text-center">
          <p className="text-[13px] leading-relaxed text-charcoal/70">
            <strong className="font-semibold text-navy">
              Placeholder state:
            </strong>{" "}
            no client testimonials have been collected yet. This area will be
            filled with authentic quotes, names, photos, and company details
            once permissioned feedback exists.
          </p>
        </div>

        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {TESTIMONIAL_SLOTS.map((slot) => (
            <li
              key={slot.id}
              className="flex flex-col rounded-2xl border border-dashed border-slate-line bg-white p-6"
              aria-label={`Testimonial slot ${slot.id} — awaiting authentic client feedback`}
            >
              <div className="flex items-center justify-between">
                <Quote
                  className="h-6 w-6 text-slate-line"
                  aria-hidden="true"
                />
                <span
                  className="flex gap-0.5"
                  role="img"
                  aria-label="Star rating placeholder — not yet awarded"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <Star
                      key={n}
                      className="h-4 w-4 text-slate-line"
                      aria-hidden="true"
                    />
                  ))}
                </span>
              </div>

              <div className="mt-5 space-y-2.5" aria-hidden="true">
                <div className="h-3 w-full rounded bg-mist" />
                <div className="h-3 w-[92%] rounded bg-mist" />
                <div className="h-3 w-[78%] rounded bg-mist" />
              </div>

              <div className="mt-6 flex items-center gap-3 border-t border-slate-line pt-5">
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-mist text-xs font-bold text-charcoal/50"
                >
                  ?
                </span>
                <div>
                  <p className="text-sm font-semibold text-charcoal/50">
                    Client name
                  </p>
                  <p className="text-xs text-charcoal/40">
                    Role, Company — to be added
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
