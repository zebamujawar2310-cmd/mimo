import type { Metadata } from "next";

import { LegalPage } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Draft privacy policy for Trimmer Boss™ — final terms to be confirmed before launch.",
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        <strong>Status:</strong> draft placeholder. This demo storefront runs
        entirely in your browser: no accounts, no analytics, no payment
        processing and no servers. Demo orders you create are stored only in
        your browser&apos;s local storage and can be cleared at any time.
      </p>
      <h2 className="pt-4 text-xl">What the live policy will cover</h2>
      <ul className="list-disc space-y-2 pl-6">
        <li>What personal data we collect when you order or contact us</li>
        <li>How that data is used, stored and protected</li>
        <li>Payment providers and data processors involved</li>
        <li>Your rights regarding access, correction and deletion</li>
        <li>Contact details for privacy requests</li>
      </ul>
    </LegalPage>
  );
}
