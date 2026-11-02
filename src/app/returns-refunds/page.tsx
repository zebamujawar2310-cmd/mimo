import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Returns & Refunds",
  description:
    "Draft returns and refunds policy for Trimmer Boss™ — final terms to be confirmed before launch.",
};

export default function ReturnsPage() {
  return (
    <LegalPage title="Returns & Refunds">
      <p>
        <strong>Status:</strong> draft placeholder — a 30-day money-back
        guarantee is planned and marked as “to be confirmed” throughout the
        site until the final policy is published.
      </p>
      <h2 className="pt-4 text-xl">What will be covered here</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>The return window and eligibility conditions</li>
        <li>Condition of returned items (unused, original packaging, etc.)</li>
        <li>How to request a return and who pays return shipping</li>
        <li>Refund timelines and original payment method</li>
        <li>Exchanges and damaged-on-arrival shipments</li>
      </ul>
      <p>
        Need help with an order? Use the{" "}
        <a href="/#contact" className="underline underline-offset-2">
          contact form
        </a>
        .
      </p>
    </LegalPage>
  );
}
