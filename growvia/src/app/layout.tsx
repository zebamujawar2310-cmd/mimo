import type { Metadata } from "next";

import { SITE } from "@/lib/config";
import { SiteProvider } from "@/components/site/site-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { ConsultationModal } from "@/components/site/consultation-modal";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | Digital Agency — Websites, Marketing & AI Solutions`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "digital agency",
    "web design",
    "web development",
    "digital marketing",
    "SEO",
    "e-commerce",
    "AI automation",
    "UI/UX design",
    "branding",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary",
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#102A43",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE.name,
  description: SITE.description,
  url: SITE.url,
  slogan: SITE.tagline,
  // Contact details are placeholders; no address, ratings, reviews or
  // founding date are declared because they have not been verified.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <ConsultationModal />
        </SiteProvider>
      </body>
    </html>
  );
}
