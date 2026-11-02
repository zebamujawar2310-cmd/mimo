import { PROCESS_STEPS } from "@/lib/content";
import { SectionHeading } from "@/components/site/section-heading";

export function Process() {
  return (
    <section
      id="process"
      aria-labelledby="process-heading"
      className="section-anchor bg-navy py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-teal-400">Our Working Process</p>
          <h2
            id="process-heading"
            className="mt-3 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl"
          >
            Five Steps from Idea to Launch
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            A clear, connected process so you always know what&apos;s happening
            — and what&apos;s next.
          </p>
        </div>

        <ol className="relative mt-14 grid gap-8 md:grid-cols-5 md:gap-5">
          {/* Connecting line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-teal/30 via-teal/60 to-teal/30 md:block"
          />

          {PROCESS_STEPS.map((step, i) => (
            <li key={step.step} className="fade-up relative" style={{ animationDelay: `${i * 90}ms` }}>
              {/* Step number badge */}
              <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/40 bg-navy-800 shadow-lg shadow-black/20">
                <span className="text-sm font-bold tracking-wide text-teal-400">
                  {step.step}
                </span>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 transition-colors hover:border-teal/40 hover:bg-white/10">
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
