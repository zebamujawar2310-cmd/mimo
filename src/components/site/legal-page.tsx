import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Badge } from "@/components/ui/badge";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-black/60 transition-colors hover:text-black"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to home
      </Link>
      <div className="mt-6 flex flex-col items-start gap-4">
        <h1 className="text-3xl sm:text-4xl">{title}</h1>
        <Badge variant="outline">Draft placeholder</Badge>
      </div>
      <p className="mt-4 text-sm text-black/60">
        This page is a placeholder and does not yet constitute a binding
        policy. Final business policies will replace it before launch.
      </p>
      <div className="mt-10 space-y-4 leading-relaxed text-black/80">
        {children}
      </div>
    </div>
  );
}
