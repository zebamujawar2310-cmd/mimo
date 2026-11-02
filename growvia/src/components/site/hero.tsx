"use client";

import { ArrowRight, Check, LineChart, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { GrowthVisual } from "@/components/site/growth-visual";
import { useSite } from "@/components/site/site-provider";

const VALUE_PROPS = [
  {
    icon: LineChart,
    title: "Strategy-led execution",
    text: "Every project starts with your business goals, not a template.",
  },
  {
    icon: Sparkles,
    title: "Design that converts",
    text: "Modern, polished experiences built around clarity and usability.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent partnership",
    text: "Clear scope, honest updates, and no surprise deliverables.",
  },
];

export function Hero() {
  const { openConsultation } = useSite();

  return (
    <section id="home" className="section-anchor relative overflow-hidden bg-white">
      {/* Decorative background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute -left-24 top-40 h-80 w-80 rounded-full bg-navy/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#102A4308_1px,transparent_1px),linear-gradient(to_bottom,#102A4308_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" />
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:py-24">
        {/* Copy */}
        <div>
          <span className="eyebrow fade-up inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5 text-teal-600">
            Full-Service Digital Agency
          </span>

          <h1 className="fade-up delay-100 mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            Grow Your Business.{" "}
            <span className="relative text-teal-600">
              Elevate Your Digital Presence.
              <svg
                aria-hidden="true"
                viewBox="0 0 300 12"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-3 w-full text-teal/50"
              >
                <path
                  d="M4 8 C 80 2, 200 2, 296 7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  className="draw-line"
                  style={{ strokeDasharray: 600 }}
                />
              </svg>
            </span>
          </h1>

          <p className="fade-up delay-200 mt-7 max-w-xl text-base leading-relaxed text-charcoal/80 sm:text-lg">
            From high-performing websites to strategic digital marketing and
            AI-powered solutions, Growvia helps businesses turn ideas into
            meaningful digital growth.
          </p>

          <div className="fade-up delay-300 mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button size="lg" onClick={() => openConsultation()}>
              Start Your Project
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#portfolio">Explore Our Work</a>
            </Button>
          </div>

          {/* Value propositions */}
          <ul className="fade-up delay-400 mt-10 grid gap-4 sm:grid-cols-3">
            {VALUE_PROPS.map((prop) => (
              <li key={prop.title} className="rounded-xl bg-mist p-4">
                <prop.icon
                  className="h-5 w-5 text-teal-600"
                  aria-hidden="true"
                />
                <p className="mt-2.5 text-sm font-semibold text-navy">
                  {prop.title}
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-charcoal/70">
                  {prop.text}
                </p>
              </li>
            ))}
          </ul>

          {/* Trust microcopy */}
          <p className="fade-up delay-400 mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13px] text-charcoal/65">
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-teal-600" aria-hidden="true" />
              Free, no-obligation consultation
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Check className="h-4 w-4 text-teal-600" aria-hidden="true" />
              Clear scope before any work begins
            </span>
          </p>
        </div>

        {/* Digital growth visual */}
        <div className="fade-up delay-200 relative">
          <GrowthVisual />
        </div>
      </div>
    </section>
  );
}
