import { CheckCircle2 } from "lucide-react";

import { WHY_ITEMS } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";

export function WhyChoose() {
  return (
    <section
      aria-labelledby="why-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Choose Growvia"
          title="Digital Solutions Built Around Your Business."
          id="why-heading"
          intro="We don't run a one-size-fits-all playbook. Here's what working with Growvia actually looks like."
        />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_ITEMS.map((item) => (
            <li
              key={item.title}
              className="flex gap-4 rounded-2xl border border-slate-line bg-mist/60 p-5 transition-colors hover:border-teal/40 hover:bg-white"
            >
              <CheckCircle2
                className="mt-0.5 h-5 w-5 shrink-0 text-teal-600"
                aria-hidden="true"
              />
              <div>
                <h3 className="font-semibold text-navy">{item.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-charcoal/75">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
          {/* Filler keeps the last row visually balanced on wide screens */}
          <li aria-hidden="true" className="hidden lg:block" />
        </ul>
      </div>
    </section>
  );
}
