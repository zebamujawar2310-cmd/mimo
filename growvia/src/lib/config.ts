/**
 * Central configuration for the Growvia website.
 *
 * IMPORTANT: Replace the placeholder values below with real business
 * details before publishing. Email, phone, WhatsApp and social links
 * are intentionally placeholders and are labelled as such on the site.
 */

export const SITE = {
  name: "Growvia",
  tagline: "Built for Your Next Stage of Growth.",
  description:
    "Growvia is a full-service digital agency helping startups and established businesses build their online presence, attract customers, and grow through websites, digital marketing, and AI-powered solutions.",
  // Placeholder domain — replace with the real domain before launch.
  url: "https://growvia.example.com",
  email: "hello@growvia.example.com", // placeholder
  phone: "+1 (000) 000-0000", // placeholder
  whatsapp: "https://wa.me/0000000000", // placeholder
  location: "Remote-first — serving clients worldwide", // placeholder
} as const;

export const SOCIAL_LINKS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/growvia-placeholder" },
  { label: "X (Twitter)", href: "https://x.com/growvia_placeholder" },
  { label: "Instagram", href: "https://www.instagram.com/growvia_placeholder" },
  { label: "Facebook", href: "https://www.facebook.com/growvia-placeholder" },
] as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Our Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
] as const;

export const SERVICE_OPTIONS = [
  "Website Design & Development",
  "Digital Marketing",
  "SEO Optimization",
  "Branding & Graphic Design",
  "Social Media Management",
  "E-commerce Solutions",
  "AI Automation",
  "UI/UX Design",
  "Business Consulting",
  "Not sure yet",
] as const;

export const BUDGET_OPTIONS = [
  "Select a range (optional)",
  "Under $1,000",
  "$1,000 – $2,500",
  "$2,500 – $5,000",
  "$5,000 – $10,000",
  "$10,000+",
  "Not sure yet",
] as const;
