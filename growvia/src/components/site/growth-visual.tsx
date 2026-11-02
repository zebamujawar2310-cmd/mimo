import { ArrowUpRight, Globe, MousePointerClick, Zap } from "lucide-react";

/**
 * Abstract "digital growth" dashboard visual for the hero.
 * Decorative only — contains no statistics or performance claims.
 */
export function GrowthVisual() {
  return (
    <div className="relative mx-auto max-w-lg">
      {/* Floating chips */}
      <div className="float-slow absolute -left-3 top-6 z-10 hidden rounded-xl border border-slate-line bg-white px-3.5 py-2.5 shadow-lg shadow-navy/10 sm:block">
        <span className="flex items-center gap-2 text-xs font-semibold text-navy">
          <Globe className="h-4 w-4 text-teal-600" aria-hidden="true" />
          Responsive by default
        </span>
      </div>
      <div
        className="float-slow delay-300 absolute -right-2 bottom-16 z-10 hidden rounded-xl border border-slate-line bg-white px-3.5 py-2.5 shadow-lg shadow-navy/10 sm:block"
        style={{ animationDelay: "1.6s" }}
      >
        <span className="flex items-center gap-2 text-xs font-semibold text-navy">
          <MousePointerClick className="h-4 w-4 text-teal-600" aria-hidden="true" />
          Built to convert
        </span>
      </div>

      {/* Main dashboard card */}
      <div className="rounded-3xl border border-slate-line bg-white p-5 shadow-xl shadow-navy/10 sm:p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" aria-hidden="true" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400" aria-hidden="true" />
          </div>
          <span className="rounded-full bg-mist px-3 py-1 text-[11px] font-semibold text-charcoal/70">
            growth.growvia / overview
          </span>
        </div>

        {/* Chart */}
        <div className="mt-5 rounded-2xl bg-navy p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-teal-400">
                Digital Growth
              </p>
              <p className="mt-1 text-sm font-semibold text-white">
                Your next stage
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-teal/20 px-2.5 py-1 text-[11px] font-semibold text-teal-400">
              Trending up
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
          </div>

          <svg
            viewBox="0 0 320 120"
            className="mt-4 h-32 w-full"
            role="img"
            aria-label="Illustrative upward growth trend graphic"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="growthFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#16B8A6" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#16B8A6" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* grid lines */}
            {[24, 52, 80, 108].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="320"
                y2={y}
                stroke="#FFFFFF"
                strokeOpacity="0.08"
                strokeWidth="1"
              />
            ))}
            {/* area */}
            <path
              d="M0 104 C 40 96, 70 92, 100 80 C 140 64, 165 72, 195 54 C 230 34, 265 40, 320 14 L 320 120 L 0 120 Z"
              fill="url(#growthFill)"
            />
            {/* line */}
            <path
              d="M0 104 C 40 96, 70 92, 100 80 C 140 64, 165 72, 195 54 C 230 34, 265 40, 320 14"
              fill="none"
              stroke="#4FCFBA"
              strokeWidth="3"
              strokeLinecap="round"
              className="draw-line"
              style={{ strokeDasharray: 600 }}
            />
            <circle cx="320" cy="14" r="5" fill="#4FCFBA" />
          </svg>

          <div className="mt-3 flex items-center justify-between text-[10px] font-medium uppercase tracking-widest text-white/40">
            <span>Discover</span>
            <span>Design</span>
            <span>Build</span>
            <span>Grow</span>
          </div>
        </div>

        {/* Bottom stat-style tiles (illustrative, no metrics) */}
        <div className="mt-4 grid grid-cols-3 gap-3">
          {[
            { icon: Zap, label: "Fast" },
            { icon: Globe, label: "Global-ready" },
            { icon: MousePointerClick, label: "Focused" },
          ].map((tile) => (
            <div
              key={tile.label}
              className="flex flex-col items-center gap-1.5 rounded-xl border border-slate-line bg-mist px-2 py-3 text-center"
            >
              <tile.icon className="h-4 w-4 text-teal-600" aria-hidden="true" />
              <span className="text-[11px] font-semibold text-navy">
                {tile.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
