"use client";

import * as React from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

import { CASE_STUDIES, CATEGORIES, type PortfolioCategory } from "@/lib/content";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { SectionHeading } from "@/components/site/section-heading";
import { ConsultationButton } from "@/components/site/consultation-button";

type Filter = "All" | PortfolioCategory;

export function Portfolio() {
  const [filter, setFilter] = React.useState<Filter>("All");

  const visible =
    filter === "All"
      ? CASE_STUDIES
      : CASE_STUDIES.filter((c) => c.category === filter);

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="section-anchor bg-mist py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Portfolio & Case Studies"
          title="See How We Think and Work"
          id="portfolio-heading"
          intro="A selection of sample projects that show our approach to real business challenges. Each one is clearly labelled until verified client work is published."
        />

        {/* Sample notice */}
        <p className="mx-auto mt-5 max-w-2xl rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-center text-[13px] leading-relaxed text-amber-800">
          <strong className="font-semibold">Sample projects:</strong> the case
          studies below are illustrative examples created to demonstrate our
          capabilities — not completed client work.
        </p>

        {/* Filters */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map((cat) => {
            const active = filter === cat;
            return (
              <button
                key={cat}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(cat)}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all duration-200",
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-slate-line bg-white text-charcoal hover:border-teal hover:text-teal-600"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Project grid */}
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => (
            <li key={project.slug}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-navy/5">
                <ProjectMockup category={project.category} title={project.title} />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="sample">Sample Project</Badge>
                    <Badge variant="outline">{project.category}</Badge>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold leading-snug text-navy">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-[13px] text-charcoal/60">
                    {project.industry}
                  </p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-charcoal/75">
                    {project.summary}
                  </p>
                  <a
                    href={`/case-studies/${project.slug}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal-600 transition-colors hover:text-navy"
                  >
                    View Case Study
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </article>
            </li>
          ))}
        </ul>

        {visible.length === 0 && (
          <p className="mt-10 text-center text-sm text-charcoal/60">
            No sample projects in this category yet.
          </p>
        )}

        {/* CTA */}
        <div className="mt-12 flex flex-col items-center gap-4 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Have a Project in Mind? Let&apos;s Build It.
          </h3>
          <ConsultationButton size="lg">
            Start Your Project
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ConsultationButton>
        </div>
      </div>
    </section>
  );
}


/** Decorative category-themed mockup header (no external images). */
function ProjectMockup({
  category,
  title,
}: {
  category: PortfolioCategory;
  title: string;
}) {
  const tones: Record<PortfolioCategory, string> = {
    Websites: "from-navy to-navy-700",
    "E-commerce": "from-navy-700 to-teal-600",
    Marketing: "from-teal-600 to-navy",
    Branding: "from-navy to-navy-700",
    "AI Automation": "from-navy-800 to-teal-600",
  };

  return (
    <div
      aria-hidden="true"
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-gradient-to-br",
        tones[category]
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#FFFFFF10_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
      {/* Browser-frame skeleton */}
      <div className="absolute inset-x-6 top-6 rounded-xl bg-white/95 p-3 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-red-400" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-green-400" />
          <span className="ml-2 h-2 flex-1 rounded-full bg-mist" />
        </div>
        <div className="mt-3 space-y-2">
          <div className="h-3 w-2/3 rounded bg-navy/80" />
          <div className="h-2 w-full rounded bg-slate-line" />
          <div className="h-2 w-5/6 rounded bg-slate-line" />
          <div className="flex gap-2 pt-1">
            <div className="h-5 w-16 rounded bg-teal/70" />
            <div className="h-5 w-12 rounded bg-mist" />
          </div>
        </div>
      </div>
      {/* Mobile skeleton */}
      <div className="absolute bottom-4 right-5 w-16 rounded-lg border-2 border-white/80 bg-white/95 p-1.5 shadow-lg">
        <div className="h-1.5 w-full rounded bg-navy/70" />
        <div className="mt-1 h-1 w-full rounded bg-slate-line" />
        <div className="mt-1 h-1 w-2/3 rounded bg-slate-line" />
        <div className="mt-1.5 h-3 w-full rounded bg-teal/70" />
      </div>
      <span className="sr-only">{title}</span>
    </div>
  );
}
