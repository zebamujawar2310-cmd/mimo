import type { Metadata } from "next";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="bg-white">
      <header className="border-b border-slate-line bg-mist py-12 sm:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-charcoal/60">Last updated: {updated}</p>
          <p className="mt-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] leading-relaxed text-amber-800">
            <strong className="font-semibold">Placeholder document:</strong>{" "}
            this page is a starter template and must be reviewed and replaced
            with legally reviewed wording before launch.
          </p>
        </div>
      </header>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">{children}</div>
    </article>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8 first:mt-0">
      <h2 className="text-xl font-bold text-navy">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-charcoal/80">
        {children}
      </div>
    </section>
  );
}

export type { Metadata };
