import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Shipping Policy",
  description:
    "Draft shipping policy for Trimmer Boss™ — final terms to be confirmed before launch.",
};

export default function ShippingPolicyPage() {
  return (
    <LegalPage title="Shipping Policy">
      <p>
        <strong>Status:</strong> draft placeholder — free worldwide shipping is
        a planned offer and is marked as “to be confirmed” throughout the site
        until shipping arrangements are finalised.
      </p>
      <h2 className="pt-4 text-xl">What will be covered here</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Regions and countries we ship to</li>
        <li>Dispatch and delivery timeframes</li>
        <li>Shipping costs and any free-shipping thresholds</li>
        <li>Tracking information and delivery partners</li>
        <li>Customs, duties and import taxes</li>
      </ul>
      <p>
        Questions about shipping to your location? Use the{" "}
        <a href="/#contact" className="underline underline-offset-2">
          contact form
        </a>{" "}
        and we will confirm before you order.
      </p>
    </LegalPage>
  );
}
