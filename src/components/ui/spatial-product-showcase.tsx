"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Leaf,
  ShieldCheck,
  Timer,
  Wrench,
  Zap,
} from "lucide-react";
import { useSite } from "@/components/site/site-provider";

type View = "traditional" | "trimmer-boss";

const views: Record<
  View,
  {
    eyebrow: string;
    title: string;
    description: string;
    points: string[];
    note: string;
  }
> = {
  traditional: {
    eyebrow: "The familiar routine",
    title: "A line that keeps asking for your time.",
    description:
      "Traditional string heads rely on replaceable line. It can wear down, snap, and need re-spooling while you are working.",
    points: [
      "Stop to replace or feed more line",
      "Keep spare trimmer line on hand",
      "Plastic line is consumed as you work",
    ],
    note: "The conventional string-head experience",
  },
  "trimmer-boss": {
    eyebrow: "Meet the metal alternative",
    title: "Less line. Less interruption. More time outside.",
    description:
      "Trimmer Boss replaces disposable line with a reusable metal trimmer head and includes an adapter kit designed to fit 99% of trimmers.",
    points: [
      "Durable metal construction",
      "Plastic-free head design",
      "Adapter kit included with the product",
    ],
    note: "Trimmer Boss metal trimmer head",
  },
};

function HeadIllustration({ metal }: { metal: boolean }) {
  return (
    <svg
      viewBox="0 0 520 360"
      role="img"
      aria-label={metal ? "Illustration of a metal trimmer head" : "Illustration of a traditional string trimmer head"}
      className="h-full w-full"
      fill="none"
    >
      <defs>
        <linearGradient id="tb-metal" x1="120" y1="70" x2="390" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8D4A2" />
          <stop offset="1" stopColor="#9B783B" />
        </linearGradient>
        <linearGradient id="tb-dark" x1="140" y1="60" x2="370" y2="300" gradientUnits="userSpaceOnUse">
          <stop stopColor="#77766F" />
          <stop offset="1" stopColor="#292A27" />
        </linearGradient>
      </defs>
      <ellipse cx="260" cy="292" rx="154" ry="18" fill="#000" opacity=".12" />
      <path d="M246 22h28v100h-28z" fill="#6B6B65" />
      <path d="M260 112v28" stroke="#B8B4A8" strokeWidth="12" strokeLinecap="round" />
      <circle cx="260" cy="205" r="92" fill={metal ? "url(#tb-metal)" : "url(#tb-dark)"} stroke={metal ? "#F3E4BE" : "#96958E"} strokeWidth="3" />
      <circle cx="260" cy="205" r="58" fill={metal ? "#51442C" : "#1A1B19"} stroke={metal ? "#D6B66D" : "#77766F"} strokeWidth="5" />
      <circle cx="260" cy="205" r="18" fill={metal ? "#E7D09B" : "#8D8B83"} />
      {metal ? (
        <>
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <g key={angle} transform={`rotate(${angle} 260 205)`}>
              <path d="M252 113h16l8-34h-32z" fill="#DCC38B" stroke="#8D6C34" strokeWidth="2" />
              <path d="M252 144h16" stroke="#F6E7C5" strokeWidth="3" strokeLinecap="round" />
            </g>
          ))}
          <circle cx="260" cy="205" r="8" fill="#4A3B22" />
        </>
      ) : (
        <>
          <path d="M188 205H76" stroke="#E6E3D8" strokeWidth="5" strokeLinecap="round" />
          <path d="M332 205h112" stroke="#E6E3D8" strokeWidth="5" strokeLinecap="round" />
          <path d="M188 205H76" stroke="#B8B5AB" strokeWidth="2" strokeDasharray="5 8" />
          <path d="M332 205h112" stroke="#B8B5AB" strokeWidth="2" strokeDasharray="5 8" />
        </>
      )}
      <path d="M260 296v18" stroke="#77766F" strokeWidth="8" strokeLinecap="round" />
    </svg>
  );
}

export function SpatialProductShowcase() {
  const [view, setView] = useState<View>("trimmer-boss");
  const { openOrder } = useSite();
  const active = views[view];
  const isBoss = view === "trimmer-boss";

  function showPrevious() {
    setView((current) => (current === "trimmer-boss" ? "traditional" : "trimmer-boss"));
  }

  function showNext() {
    setView((current) => (current === "traditional" ? "trimmer-boss" : "traditional"));
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f6f2] text-[#1c1c19]">
      <header className="border-b border-black/10 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="/" className="text-sm font-black uppercase tracking-[0.2em]">
            Trimmer <span className="text-[#a17b35]">Boss</span>
          </a>
          <a href="/" className="text-xs text-black/55 transition hover:text-black">
            Back to home
          </a>
        </div>
      </header>

      <section className="relative isolate bg-[#171815] text-white">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_20%,rgba(198,161,86,.22),transparent_48%)]" />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[.95fr_1.05fr] lg:items-center">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.28em] text-[#d7bd82]">
              <span className="h-px w-8 bg-[#d7bd82]" />
              A smarter way to trim
            </p>
            <h1 className="font-serif text-5xl font-medium leading-[1.04] tracking-tight sm:text-6xl lg:text-7xl">
              Stop feeding the line.
              <span className="mt-2 block text-[#d7bd82]">Start cutting with metal.</span>
            </h1>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/65 sm:text-base">
              Meet the Trimmer Boss metal trimmer head: a reusable alternative to traditional string heads, with a free adapter kit designed to fit 99% of trimmers.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <button
                onClick={() => openOrder()}
                className="inline-flex items-center gap-3 rounded-full bg-[#d5b878] px-7 py-4 text-xs font-bold text-[#171815] transition hover:-translate-y-0.5 hover:bg-[#e5ce98]"
              >
                Order Trimmer Boss <ArrowRight size={15} />
              </button>
              <a
                href="#showcase-video"
                className="rounded-full border border-white/25 px-7 py-4 text-xs text-white transition hover:border-white/60 hover:bg-white/5"
              >
                Watch the product demo
              </a>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-[11px] text-white/55">
              <span className="inline-flex items-center gap-2"><ShieldCheck size={15} className="text-[#d5b878]" /> 30-day money-back guarantee</span>
              <span className="inline-flex items-center gap-2"><Leaf size={15} className="text-[#d5b878]" /> Plastic-free head design</span>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-5 rounded-[2rem] bg-[#d5b878]/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#242520] p-4 shadow-2xl sm:p-6">
              <div className="flex items-center justify-between gap-4 px-1 pb-4">
                <span className="text-[10px] uppercase tracking-[.22em] text-white/45">Product close-up</span>
                <span className="rounded-full border border-[#d5b878]/40 px-3 py-1 text-[9px] uppercase tracking-[.16em] text-[#e4cf9e]">Metal build</span>
              </div>
              <div className="relative overflow-hidden rounded-xl bg-[#d9d5c9]">
                <video
                  className="aspect-[4/3] w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/hero-bg.webp"
                  aria-label="Trimmer Boss product demonstration"
                >
                  <source src="/product-video.mp4" type="video/mp4" />
                  Your browser does not support the video element.
                </video>
              </div>
              <p className="px-1 pt-4 text-[10px] leading-5 text-white/45">
                Watch the product demonstration. Use the controls to play the video.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[.28em] text-[#96743a]">The difference</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">Two approaches. One better-informed choice.</h2>
          <p className="mt-4 text-sm leading-6 text-black/55">
            Switch between the traditional string-head routine and the Trimmer Boss metal alternative.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[1.75rem] border border-black/10 bg-white shadow-[0_24px_80px_rgba(20,20,16,.08)]">
          <div className="flex flex-col border-b border-black/10 sm:flex-row">
            <button
              type="button"
              role="tab"
              aria-selected={view === "traditional"}
              onClick={() => setView("traditional")}
              className={`flex-1 px-5 py-5 text-left text-xs font-semibold uppercase tracking-[.16em] transition sm:px-8 ${view === "traditional" ? "bg-[#eceae3] text-black" : "bg-white text-black/45 hover:bg-[#f8f7f3]"}`}
            >
              01 / Traditional string head
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === "trimmer-boss"}
              onClick={() => setView("trimmer-boss")}
              className={`flex-1 px-5 py-5 text-left text-xs font-semibold uppercase tracking-[.16em] transition sm:px-8 ${view === "trimmer-boss" ? "bg-[#1b1c18] text-[#e1c98f]" : "bg-white text-black/45 hover:bg-[#f8f7f3]"}`}
            >
              02 / Trimmer Boss metal head
            </button>
          </div>

          <div className="grid min-h-[430px] lg:grid-cols-2">
            <div className={`flex items-center justify-center p-7 transition-colors duration-300 sm:p-12 ${isBoss ? "bg-[#22231e]" : "bg-[#efeee9]"}`}>
              <div className="w-full max-w-md">
                <div className="aspect-[1.3/1] overflow-hidden rounded-2xl bg-gradient-to-br from-[#dcd8cd] to-[#aaa69a] p-3">
                  <HeadIllustration metal={isBoss} />
                </div>
                <p className={`mt-4 text-center text-[9px] uppercase tracking-[.2em] ${isBoss ? "text-white/40" : "text-black/40"}`}>
                  Illustrative product comparison — not a technical drawing
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center p-7 sm:p-12">
              <p className="text-[10px] font-semibold uppercase tracking-[.25em] text-[#96743a]">{active.eyebrow}</p>
              <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">{active.title}</h3>
              <p className="mt-5 text-sm leading-7 text-black/60">{active.description}</p>
              <ul className="mt-7 space-y-4">
                {active.points.map((point) => (
                  <li key={point} className="flex items-start gap-3 text-sm text-black/75">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#eee8d9] text-[#8c6b32]">
                      <Check size={12} />
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-7 border-t border-black/10 pt-5 text-[10px] uppercase tracking-[.17em] text-black/40">{active.note}</p>
              <div className="mt-7 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={showPrevious}
                  aria-label="Show previous comparison"
                  className="grid h-11 w-11 place-items-center rounded-full border border-black/15 transition hover:border-black/40 hover:bg-black/5"
                >
                  <ArrowLeft size={17} />
                </button>
                <span className="text-[10px] font-semibold uppercase tracking-[.18em] text-black/40">
                  {isBoss ? "02" : "01"} <span className="mx-1">/</span> 02
                </span>
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Show next comparison"
                  className="grid h-11 w-11 place-items-center rounded-full bg-[#1b1c18] text-white transition hover:bg-[#9a793e]"
                >
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#eeece5]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 sm:py-20 md:grid-cols-3">
          <article className="border-t border-black/15 pt-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#94743b]"><Wrench size={19} /></span>
            <h3 className="mt-5 font-serif text-2xl">Adapter kit included</h3>
            <p className="mt-3 text-sm leading-6 text-black/55">The included adapter kit is stated to fit 99% of trimmers on the market. Check your trimmer model before ordering if you are unsure.</p>
          </article>
          <article className="border-t border-black/15 pt-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#94743b]"><Leaf size={19} /></span>
            <h3 className="mt-5 font-serif text-2xl">A plastic-free head</h3>
            <p className="mt-3 text-sm leading-6 text-black/55">Move away from disposable plastic trimmer line with a reusable metal-head design.</p>
          </article>
          <article className="border-t border-black/15 pt-5">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-[#94743b]"><Timer size={19} /></span>
            <h3 className="mt-5 font-serif text-2xl">Spend less time reloading</h3>
            <p className="mt-3 text-sm leading-6 text-black/55">The product's stated estimate is up to 8 hours a year saved on line replacement. Actual time saved depends on usage.</p>
          </article>
        </div>
      </section>

      <section className="bg-[#171815] px-5 py-16 text-center text-white sm:px-8 sm:py-20">
        <Zap className="mx-auto h-7 w-7 text-[#d5b878]" />
        <p className="mt-5 text-[10px] font-semibold uppercase tracking-[.28em] text-[#d5b878]">Ready for a different trimming routine?</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl leading-tight sm:text-5xl">Make the switch to Trimmer Boss.</h2>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/55">Explore the metal trimmer head and see whether it is right for your yard-care setup.</p>
        <button
          onClick={() => openOrder()}
          className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#d5b878] px-8 py-4 text-xs font-bold text-[#171815] transition hover:-translate-y-0.5 hover:bg-[#e5ce98]"
        >
          Order Now <ArrowRight size={15} />
        </button>
      </section>

      <footer className="bg-[#11120f] px-5 py-6 text-center text-[10px] text-white/40">
        © {new Date().getFullYear()} Trimmer Boss™. Product information is based on the supplied brand claims.
      </footer>
    </main>
  );
}
