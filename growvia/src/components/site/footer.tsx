import { Mail, MessageCircle, Phone } from "lucide-react";

import { NAV_LINKS, SITE, SOCIAL_LINKS } from "@/lib/config";
import { SERVICES } from "@/lib/content";
import { Logo } from "@/components/site/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo light />
            <p className="mt-3 text-sm font-medium italic text-teal-400">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-white/65">
              Growvia is a modern digital agency helping businesses build their
              online presence, attract customers, and grow through websites,
              marketing, and AI-powered solutions.
            </p>
          </div>

          {/* Services */}
          <nav aria-label="Services">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Services
            </h2>
            <ul className="mt-4 space-y-2.5">
              {SERVICES.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <a
                    href="#services"
                    className="text-sm text-white/65 transition-colors hover:text-teal-400"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#services"
                  className="text-sm text-teal-400 hover:underline"
                >
                  View all services →
                </a>
              </li>
            </ul>
          </nav>

          {/* Navigation */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h2>
            <ul className="mt-4 space-y-2.5">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-teal-400"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/case-studies/sample-b2b-consulting-website"
                  className="text-sm text-white/65 transition-colors hover:text-teal-400"
                >
                  Case Studies
                </a>
              </li>
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h2>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-teal-400"
                >
                  <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span className="truncate">{SITE.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}
                  className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-teal-400"
                >
                  <Phone className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-white/65 transition-colors hover:text-teal-400"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  WhatsApp
                </a>
              </li>
            </ul>

            <ul className="mt-5 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-full border border-white/20 px-3 py-1 text-xs text-white/75 transition-colors hover:border-teal-400 hover:text-teal-400"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-sm text-white/55">
            © {year} {SITE.name}. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <a
              href="/privacy-policy"
              className="text-sm text-white/55 transition-colors hover:text-teal-400"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-sm text-white/55 transition-colors hover:text-teal-400"
            >
              Terms of Service
            </a>
          </nav>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-white/40">
          Note: contact details and social links are placeholders pending real
          business information. Portfolio items shown on this site are labelled
          samples.
        </p>
      </div>
    </footer>
  );
}
