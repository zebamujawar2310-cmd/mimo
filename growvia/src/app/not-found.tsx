import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-mist px-4 py-20">
      <div className="max-w-md text-center">
        <p className="eyebrow text-teal-600">404</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">
          Page not found
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-charcoal/75">
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved. Let&apos;s get you back on track.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild>
            <Link href="/">Back to Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/#contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
