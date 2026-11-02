import { cn } from "@/lib/utils";

/**
 * Growvia wordmark: growth-inspired mark (ascending bars + rising arrow)
 * paired with the brand name.
 */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 32 32"
        role="img"
        aria-label="Growvia logo mark"
        className="h-8 w-8 shrink-0"
      >
        <rect width="32" height="32" rx="9" fill="#102A43" />
        <rect x="7" y="17" width="4.5" height="8" rx="1.5" fill="#16B8A6" />
        <rect x="13.75" y="12.5" width="4.5" height="12.5" rx="1.5" fill="#16B8A6" />
        <rect x="20.5" y="8" width="4.5" height="17" rx="1.5" fill="#4FCFBA" />
        <path
          d="M7.5 12.5 L13 8.5 L18 11 L24.5 5.5"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20.5 5 L25 4.7 L24.7 9"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span
        className={cn(
          "text-lg font-bold tracking-tight",
          light ? "text-white" : "text-navy"
        )}
      >
        Growvia
      </span>
    </span>
  );
}
