import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Draft terms and conditions for Trimmer Boss™ — final terms to be confirmed before launch.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms & Conditions">
      <p>
        <strong>Status:</strong> draft placeholder. These terms will be
        finalised together with the shipping, refund and privacy policies
        before the store accepts real orders.
      </p>
      <h2 className="pt-4 text-xl">What the final terms will cover</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>Use of this website and the Trimmer Boss™ brand</li>
        <li>Product information, pricing and availability</li>
        <li>Orders, payment and contract formation</li>
        <li>Shipping, returns and warranties</li>
        <li>Limitations of liability and governing law</li>
      </ul>
      <p>
        Questions about these terms? Use the{" "}
        <a href="/#contact" className="underline underline-offset-2">
          contact form
        </a>
        .
      </p>
    </LegalPage>
  );
}
