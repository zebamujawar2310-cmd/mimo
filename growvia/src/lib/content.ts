/**
 * Site content for Growvia.
 *
 * All portfolio entries below are clearly labelled SAMPLE projects and must
 * be replaced with verified client work. No performance outcomes are
 * invented — "outcomes" fields stay null until real, verified results
 * exist, and are rendered as an honest placeholder state on the site.
 */

import {
  Bot,
  Briefcase,
  Gauge,
  LayoutTemplate,
  Megaphone,
  Palette,
  Search,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  description: string;
  benefit: string;
  icon: LucideIcon;
};

export const SERVICES: Service[] = [
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    description:
      "Responsive, modern, user-friendly business websites and landing pages built to load fast and look sharp on every screen.",
    benefit: "A credible online home that turns visitors into enquiries.",
    icon: LayoutTemplate,
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing",
    description:
      "Campaign planning, lead generation, and digital growth strategies tailored to your audience and budget.",
    benefit: "Consistent, measurable channels that keep your pipeline full.",
    icon: Megaphone,
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    description:
      "Technical SEO, on-page optimization, and search visibility improvements so the right people can find you.",
    benefit: "Sustainable organic visibility that compounds over time.",
    icon: Search,
  },
  {
    slug: "branding-graphic-design",
    title: "Branding & Graphic Design",
    description:
      "Brand identity, logo design, marketing creatives, and visual consistency across every touchpoint.",
    benefit: "A distinctive, professional identity customers remember.",
    icon: Palette,
  },
  {
    slug: "social-media-management",
    title: "Social Media Management",
    description:
      "Content planning, creative development, and social media strategy that keeps your brand active and relevant.",
    benefit: "A steady presence that builds trust and community.",
    icon: Users,
  },
  {
    slug: "ecommerce-solutions",
    title: "E-commerce Solutions",
    description:
      "Professional online stores and improved shopping experiences designed to reduce friction and encourage repeat orders.",
    benefit: "A storefront that makes buying simple on any device.",
    icon: ShoppingBag,
  },
  {
    slug: "ai-automation",
    title: "AI Automation",
    description:
      "Workflow automation and practical AI-powered business solutions that remove repetitive manual work.",
    benefit: "Hours saved every week with fewer manual errors.",
    icon: Bot,
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    description:
      "Intuitive digital experiences focused on usability and conversion, from wireframes to polished interfaces.",
    benefit: "Interfaces that guide users smoothly towards action.",
    icon: Gauge,
  },
  {
    slug: "business-consulting",
    title: "Business Consulting",
    description:
      "Digital strategy and technology recommendations for business growth, matched to your stage and goals.",
    benefit: "Clear priorities so you invest in what actually moves the needle.",
    icon: Briefcase,
  },
];

export type PortfolioCategory =
  | "Websites"
  | "E-commerce"
  | "Marketing"
  | "Branding"
  | "AI Automation";

export type CaseStudy = {
  slug: string;
  title: string;
  industry: string;
  category: PortfolioCategory;
  isSample: true;
  summary: string;
  challenge: string;
  solution: string;
  services: string[];
  /** Verified outcomes — null until real, approved results exist. */
  outcomes: string | null;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "sample-b2b-consulting-website",
    title: "B2B Consulting Firm Website",
    industry: "Professional Services",
    category: "Websites",
    isSample: true,
    summary:
      "A sample project showing how a clear, credible website can present a consulting firm's expertise and generate qualified enquiries.",
    challenge:
      "The sample brief imagines a consultancy whose online presence did not reflect its expertise, leaving prospective clients with no clear way to understand its services or get in touch.",
    solution:
      "A structured website concept with clear service pages, an approachable tone, prominent calls to action, and a mobile-first layout that builds trust quickly.",
    services: ["Website Design & Development", "UI/UX Design"],
    outcomes: null,
  },
  {
    slug: "sample-fashion-storefront",
    title: "Fashion Retail Online Store",
    industry: "Retail & E-commerce",
    category: "E-commerce",
    isSample: true,
    summary:
      "A sample e-commerce concept focused on a smooth browsing and checkout experience across mobile and desktop.",
    challenge:
      "The sample brief imagines a growing fashion label selling through social channels only, with no dedicated storefront to showcase its range.",
    solution:
      "A clean storefront concept with curated collections, clear product pages, a simplified checkout flow, and room to scale as the catalogue grows.",
    services: ["E-commerce Solutions", "Branding & Graphic Design"],
    outcomes: null,
  },
  {
    slug: "sample-saas-lead-campaign",
    title: "SaaS Product Lead Campaign",
    industry: "Technology / SaaS",
    category: "Marketing",
    isSample: true,
    summary:
      "A sample campaign plan demonstrating how landing pages, ad creative, and offer messaging can work together for lead generation.",
    challenge:
      "The sample brief imagines a software product with a strong tool but inconsistent inbound interest and no dedicated campaign infrastructure.",
    solution:
      "A focused campaign concept: a targeted landing page, a clear value proposition, structured ad creative, and conversion tracking to measure what works.",
    services: ["Digital Marketing", "SEO Optimization"],
    outcomes: null,
  },
  {
    slug: "sample-cafe-brand-identity",
    title: "Café Brand Identity",
    industry: "Food & Beverage",
    category: "Branding",
    isSample: true,
    summary:
      "A sample branding project covering logo design, visual identity, and packaging direction for an independent café.",
    challenge:
      "The sample brief imagines a new café with a name and concept but no visual identity, signage, or social presence to launch with.",
    solution:
      "A warm, modern identity concept: a flexible logo suite, a cohesive colour and type system, menu templates, and social media starting assets.",
    services: ["Branding & Graphic Design", "Social Media Management"],
    outcomes: null,
  },
  {
    slug: "sample-invoice-automation",
    title: "Invoice Processing Automation",
    industry: "Business Operations",
    category: "AI Automation",
    isSample: true,
    summary:
      "A sample automation project showing how repetitive invoice handling can be streamlined with practical AI-powered workflows.",
    challenge:
      "The sample brief imagines a small team spending hours each week manually copying invoice data between email, spreadsheets, and accounting software.",
    solution:
      "An automated flow concept: capture invoice details from email, validate and route them for approval, and sync records — with human review at key steps.",
    services: ["AI Automation", "Business Consulting"],
    outcomes: null,
  },
  {
    slug: "sample-clinic-website-refresh",
    title: "Healthcare Clinic Website Refresh",
    industry: "Healthcare",
    category: "Websites",
    isSample: true,
    summary:
      "A sample redesign concept making it easier for patients to find services, understand procedures, and book appointments.",
    challenge:
      "The sample brief imagines a clinic whose outdated website made services hard to find and offered no clear path to booking on mobile.",
    solution:
      "A calm, accessible redesign concept with service-led navigation, clear appointment prompts, and content structured for both patients and search engines.",
    services: ["Website Design & Development", "SEO Optimization"],
    outcomes: null,
  },
];

export const CATEGORIES: Array<"All" | PortfolioCategory> = [
  "All",
  "Websites",
  "E-commerce",
  "Marketing",
  "Branding",
  "AI Automation",
];
export type ProcessStep = {
  step: string;
  title: string;
  description: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    title: "Discover",
    description:
      "We learn your business, goals, audience, and requirements so every decision that follows is grounded in what you actually need.",
  },
  {
    step: "02",
    title: "Strategize",
    description:
      "We define the project scope, priorities, and the right solution — with clear deliverables and no assumptions left unspoken.",
  },
  {
    step: "03",
    title: "Design",
    description:
      "We create the visual direction and user experience, sharing work early so feedback shapes the outcome before build begins.",
  },
  {
    step: "04",
    title: "Build",
    description:
      "We develop, review, and refine the solution, keeping you updated at each milestone and testing across devices and browsers.",
  },
  {
    step: "05",
    title: "Launch & Improve",
    description:
      "We deliver the project, walk you through everything, and recommend practical next steps to keep improving after launch.",
  },
];

export type ValueItem = {
  title: string;
  description: string;
};

export const CORE_VALUES: ValueItem[] = [
  {
    title: "Client-first approach",
    description:
      "We start from your goals, not our assumptions. Your success defines the brief.",
  },
  {
    title: "Quality without shortcuts",
    description:
      "Every deliverable is reviewed carefully — design, code, and copy held to one standard.",
  },
  {
    title: "Transparent communication",
    description:
      "Plain language, honest timelines, and no surprises. You always know where things stand.",
  },
  {
    title: "Long-term partnership",
    description:
      "We build relationships, not one-off transactions — and we're here after launch too.",
  },
];

export type WhyItem = {
  title: string;
  description: string;
};

export const WHY_ITEMS: WhyItem[] = [
  {
    title: "Customized strategies",
    description:
      "No templates forced onto your business — recommendations shaped around your stage, audience, and goals.",
  },
  {
    title: "Modern design & technology",
    description:
      "Current frameworks, contemporary design, and tooling chosen for performance and maintainability.",
  },
  {
    title: "Clear communication",
    description:
      "You'll always know what's happening, what's next, and what we need from you.",
  },
  {
    title: "Transparent project processes",
    description:
      "Defined stages, agreed deliverables, and visible progress from kickoff to launch.",
  },
  {
    title: "Quality-focused delivery",
    description:
      "Work is reviewed against a clear checklist before handover — details matter to us.",
  },
  {
    title: "Scalable solutions",
    description:
      "We build foundations that grow with you, so your next stage doesn't mean starting over.",
  },
  {
    title: "Long-term client relationships",
    description:
      "Many clients stay after launch for ongoing improvements — we aim to be the team you keep.",
  },
];




export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQS: FaqItem[] = [
  {
    question: "What services does Growvia offer?",
    answer:
      "Growvia offers website design and development, digital marketing, SEO optimization, branding and graphic design, social media management, e-commerce solutions, AI automation, UI/UX design, and business consulting. You can combine services into a single engagement or hire us for one.",
  },
  {
    question: "Can I hire Growvia for a single service?",
    answer:
      "Absolutely. Many projects start with one service — for example a website or a brand refresh — and expand over time. Tell us what you need and we'll scope it accordingly.",
  },
  {
    question: "How does the project process work?",
    answer:
      "We work through five stages: Discover, Strategize, Design, Build, and Launch & Improve. You'll see work at each stage and give feedback before we move forward, so the project stays aligned with your expectations.",
  },
  {
    question: "How long does a website project take?",
    answer:
      "Timelines depend on the scope, the number of pages, and how quickly content and feedback come together. After the discovery stage we'll share a realistic schedule for your specific project rather than a one-size-fits-all estimate.",
  },
  {
    question: "How can I request a quote?",
    answer:
      "Send us an enquiry through the contact form or book a free consultation. We'll discuss your requirements, then prepare a written quote that outlines scope, deliverables, and pricing before any work begins.",
  },
  {
    question: "Does Growvia offer ongoing support?",
    answer:
      "Yes. After launch we can continue with maintenance, updates, campaign management, or further improvements. Support arrangements are agreed per project so you only take on what you need.",
  },
  {
    question: "Can Growvia help automate business workflows?",
    answer:
      "Yes. We review your repetitive processes, identify where automation or practical AI tools can help, and implement solutions that save time while keeping humans in control of important decisions.",
  },
];

export type TestimonialSlot = {
  id: number;
};

/** Three reserved slots for authentic client testimonials. */
export const TESTIMONIAL_SLOTS: TestimonialSlot[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
];

