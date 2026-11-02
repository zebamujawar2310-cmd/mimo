import type { Metadata } from "next";

import { SITE } from "@/lib/config";
import { LegalPage, LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${SITE.name} handles personal information submitted through this website.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2026">
      <LegalSection heading="Who we are">
        <p>
          This website is operated by {SITE.name} (“we”, “our”). This policy
          explains what information we collect through this site and how it is
          handled.
        </p>
      </LegalSection>

      <LegalSection heading="Information you submit">
        <p>
          If you fill in a contact or consultation form, we may receive the
          details you enter: your name, email address, phone number, company
          name, the service you&apos;re interested in, your indicative budget,
          and your project description.
        </p>
        <p>
          <strong>Important:</strong> this site is currently a frontend-only
          demonstration. Form submissions are validated in your browser but are{" "}
          <strong>not transmitted to, or stored by, any server</strong> until a
          backend or third-party form service is connected.
        </p>
      </LegalSection>

      <LegalSection heading="How we use information">
        <p>
          When a live form service is connected, information you submit will be
          used only to respond to your enquiry and to prepare any quotes or
          proposals you request. We do not sell personal information.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies and analytics">
        <p>
          This site does not set advertising cookies. If analytics tools are
          added later, this policy will be updated to describe them.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Depending on your location, you may have the right to request access
          to, correction of, or deletion of personal information we hold. To
          make a request, contact us using the details on the contact section
          of this site.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this policy">
        <p>
          We may update this policy as the site and applicable requirements
          change. The “last updated” date at the top of this page reflects the
          most recent revision.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
