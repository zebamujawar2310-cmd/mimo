import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

import { CASE_STUDIES } from "@/lib/content";
import { SITE } from "@/lib/config";
import { Badge } from "@/components/ui/badge";
import { ConsultationButton } from "@/components/site/consultation-button";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) return { title: "Case study not found" };
  return {
    title: `${study.title} — Sample Case Study`,
    description: study.summary,
    alternates: { canonical: `/case-studies/${study.slug}` },
    openGraph: {
      title: `${study.title} | ${SITE.name}`,
      description: study.summary,
      url: `${SITE.url}/case-studies/${study.slug}`,
      siteName: SITE.name,
      type: "article",
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = CASE_STUDIES.find((c) => c.slug === slug);
  if (!study) notFound();

  const others = CASE_STUDIES.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <article className="bg-white">
      {/* Header */}
      <header className="border-b border-slate-line bg-mist py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/#portfolio"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-charcoal/70 transition-colors hover:text-teal-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to portfolio
          </Link>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge variant="sample">Sample Project</Badge>
            <Badge variant="outline">{study.category}</Badge>
            <Badge variant="navy">{study.industry}</Badge>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {study.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
            {study.summary}
          </p>
        </div>
      </header>

      {/* Sample notice */}
      <div className="mx-auto max-w-4xl px-4 pt-8 sm:px-6">
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-relaxed text-amber-800">
          <strong className="font-semibold">About this case study:</strong> this
          is a clearly labelled sample created to demonstrate Growvia&apos;s
          approach. It does not describe completed client work, and no results
          or outcomes are claimed.
        </p>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2">
          <section aria-labelledby="challenge-heading">
            <h2 id="challenge-heading" className="text-xl font-bold text-navy">
              The Challenge
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/80">
              {study.challenge}
            </p>
          </section>

          <section aria-labelledby="solution-heading">
            <h2 id="solution-heading" className="text-xl font-bold text-navy">
              The Solution
            </h2>
            <p className="mt-3 leading-relaxed text-charcoal/80">
              {study.solution}
            </p>
          </section>
        </div>

        {/* Services */}
        <section aria-labelledby="services-used-heading" className="mt-10">
          <h2 id="services-used-heading" className="text-xl font-bold text-navy">
            Services Applied
          </h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {study.services.map((s) => (
              <li key={s}>
                <Badge variant="default">{s}</Badge>
              </li>
            ))}
          </ul>
        </section>

        {/* Outcomes (honest placeholder) */}
        <section
          aria-labelledby="outcomes-heading"
          className="mt-10 rounded-2xl border border-slate-line bg-mist p-6"
        >
          <h2
            id="outcomes-heading"
            className="flex items-center gap-2 text-xl font-bold text-navy"
          >
            {study.outcomes ? (
              <CheckCircle2 className="h-5 w-5 text-teal-600" aria-hidden="true" />
            ) : (
              <HelpCircle className="h-5 w-5 text-charcoal/50" aria-hidden="true" />
            )}
            Outcomes
          </h2>
          {study.outcomes ? (
            <p className="mt-3 leading-relaxed text-charcoal/80">
              {study.outcomes}
            </p>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-charcoal/70">
              Verified results for this project have not been published yet.
              Because this is a sample case study, we don&apos;t report metrics
              or performance claims for it — real, client-approved outcomes will
              be added here as they become available.
            </p>
          )}
        </section>


        {/* CTA */}
        <div className="mt-12 flex flex-col items-start justify-between gap-5 rounded-2xl bg-navy p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h2 className="text-xl font-bold text-white">
              Have a Project in Mind?
            </h2>
            <p className="mt-1 text-sm text-white/70">
              Tell us what you&apos;re building — we&apos;ll help you map out
              the right approach.
            </p>
          </div>
          <ConsultationButton size="lg" className="w-full shrink-0 sm:w-auto">
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ConsultationButton>
        </div>

        {/* More case studies */}
        <nav
          aria-label="More case studies"
          className="mt-12 border-t border-slate-line pt-8"
        >
          <h2 className="text-sm font-bold uppercase tracking-wider text-charcoal/60">
            More Sample Work
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-3">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/case-studies/${other.slug}`}
                  className="block h-full rounded-xl border border-slate-line p-4 transition-colors hover:border-teal hover:bg-mist"
                >
                  <span className="block text-[11px] font-semibold uppercase tracking-wide text-teal-600">
                    {other.category}
                  </span>
                  <span className="mt-1 block font-semibold text-navy">
                    {other.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </article>
  );
}

