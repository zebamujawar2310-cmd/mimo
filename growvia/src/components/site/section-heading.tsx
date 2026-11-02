import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "center",
  id,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
  align?: "center" | "left";
  id?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left"
      )}
    >
      <p className="eyebrow text-teal-600">{eyebrow}</p>
      <h2
        id={id}
        className="mt-3 text-3xl font-bold leading-tight tracking-tight sm:text-4xl"
      >
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-charcoal/75 sm:text-lg">
          {intro}
        </p>
      )}
    </div>
  );
}
