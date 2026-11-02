import { Compass, Eye, Handshake, MessageCircleHeart, Sparkles } from "lucide-react";

import { CORE_VALUES } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/site/section-heading";
import { ConsultationButton } from "@/components/site/consultation-button";

const VALUE_ICONS = [Handshake, Sparkles, MessageCircleHeart, Compass];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-anchor bg-mist py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="About Growvia"
          title="Your Partner in Digital Growth"
          id="about-heading"
          intro="Growvia brings strategy, design, technology, and creativity together to help businesses succeed online — whether you're launching something new or ready for the next stage."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {/* Story + mission/vision */}
          <div className="space-y-6">
            <article className="rounded-2xl border border-slate-line bg-white p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-lg font-semibold">
                <Compass className="h-5 w-5 text-teal-600" aria-hidden="true" />
                Our Story
              </h3>
              <p className="mt-3 leading-relaxed text-charcoal/80">
                Growvia was founded on a simple belief: growing a business
                online shouldn&apos;t require juggling five different agencies
                or guessing what to do next. We saw founders and teams with
                strong products being held back by confusing websites, scattered
                marketing, and tools that never quite talked to each other.
              </p>
              <p className="mt-3 leading-relaxed text-charcoal/80">
                So we built a single partner for the whole journey — one team
                that can shape the strategy, design the experience, build the
                technology, and keep improving it after launch.
              </p>
            </article>

            <div className="grid gap-6 sm:grid-cols-2">
              <article className="rounded-2xl border border-slate-line bg-white p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <Eye className="h-5 w-5 text-teal-600" aria-hidden="true" />
                  Our Mission
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
                  To make high-quality digital expertise accessible to
                  businesses at every stage — delivering work that is honest,
                  useful, and built to last.
                </p>
              </article>
              <article className="rounded-2xl border border-slate-line bg-white p-6">
                <h3 className="flex items-center gap-2 text-base font-semibold">
                  <Sparkles className="h-5 w-5 text-teal-600" aria-hidden="true" />
                  Our Vision
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/80">
                  To be the digital partner businesses trust for their next
                  stage of growth — known for craft, clarity, and results that
                  hold up over time.
                </p>
              </article>
            </div>
          </div>

          {/* Core values */}
          <div className="rounded-2xl border border-slate-line bg-white p-6 sm:p-8">
            <h3 className="text-lg font-semibold">Core Values</h3>
            <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
              The principles behind every project we take on.
            </p>
            <ul className="mt-6 space-y-5">
              {CORE_VALUES.map((value, i) => {
                const Icon = VALUE_ICONS[i] ?? Handshake;
                return (
                  <li key={value.title} className="flex gap-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-teal/10">
                      <Icon className="h-4.5 w-4.5 text-teal-600" aria-hidden="true" />
                    </span>
                    <div>
                      <p className="font-semibold text-navy">{value.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-charcoal/75">
                        {value.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="mt-8 rounded-xl bg-mist p-5">
              <p className="text-sm leading-relaxed text-charcoal/80">
                <span className="font-semibold text-navy">
                  A client-first approach.
                </span>{" "}
                We commit to quality and transparent communication on every
                engagement — you&apos;ll always know where your project stands
                and what comes next.
              </p>
              <ConsultationButton className="mt-4" variant="primary" size="sm">
                Work With Growvia
              </ConsultationButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
