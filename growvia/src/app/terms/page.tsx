import type { Metadata } from "next";

import { SITE } from "@/lib/config";
import { LegalPage, LegalSection } from "@/components/site/legal-page";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that govern use of the ${SITE.name} website.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 2026">
      <LegalSection heading="Using this website">
        <p>
          By using this website you agree to use it lawfully and not attempt to
          disrupt, damage, or gain unauthorized access to the site or its
          related systems.
        </p>
      </LegalSection>

      <LegalSection heading="Information on this site">
        <p>
          We aim to keep the information on this site accurate and current.
          Service descriptions, pricing discussions, and timelines are
          indicative until confirmed in a written proposal or agreement for
          your specific project.
        </p>
        <p>
          Nothing on this site constitutes a binding offer, a guaranteed
          result, or professional legal, financial, or tax advice.
        </p>
      </LegalSection>

      <LegalSection heading="Sample portfolio content">
        <p>
          Case studies shown on this site are clearly labelled samples created
          to demonstrate our approach. They do not represent completed client
          work, and no performance claims are made about them.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          Unless otherwise stated, the content, design, graphics, and branding
          on this site belong to {SITE.name}. You may not reproduce or
          distribute them without written permission.
        </p>
      </LegalSection>

      <LegalSection heading="External links">
        <p>
          This site may contain links to third-party websites. We are not
          responsible for the content or practices of those sites.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          This site is provided “as is” without warranties of any kind. To the
          fullest extent permitted by law, {SITE.name} will not be liable for
          any loss or damage arising from use of this site.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to these terms">
        <p>
          We may update these terms from time to time. Continued use of the
          site after changes are posted constitutes acceptance of the revised
          terms.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these terms can be sent to {SITE.email} (placeholder
          address — replace before launch).
        </p>
      </LegalSection>
    </LegalPage>
  );
}
