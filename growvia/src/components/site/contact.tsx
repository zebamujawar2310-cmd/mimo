import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SITE, SOCIAL_LINKS } from "@/lib/config";
import { SectionHeading } from "@/components/site/section-heading";
import { InquiryForm } from "@/components/site/inquiry-form";

const CONTACT_ITEMS = [
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phone.replace(/[^\d+]/g, "")}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat on WhatsApp", href: SITE.whatsapp },
  { icon: MapPin, label: "Location", value: SITE.location, href: null },
];

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-anchor bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Start the Conversation"
          id="contact-heading"
          intro="Fill in the form and tell us where you'd like to go next — or reach out directly using the details below."
        />

        <div className="mt-12 grid gap-8 lg:grid-cols-5">
          {/* Contact details */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-slate-line bg-mist p-6 sm:p-7">
              <h3 className="text-lg font-semibold">Reach Us Directly</h3>

              <ul className="mt-5 space-y-5">
                {CONTACT_ITEMS.map((item) => (
                  <li key={item.label} className="flex items-start gap-3.5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white border border-slate-line">
                      <item.icon
                        className="h-4.5 w-4.5 text-teal-600"
                        aria-hidden="true"
                      />
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="block truncate text-sm font-medium text-navy transition-colors hover:text-teal-600"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-navy">
                          {item.value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <p className="mt-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2.5 text-[12px] leading-relaxed text-amber-800">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Placeholder contact details — replace with your live email,
                phone, and WhatsApp before publishing.
              </p>

              {/* Social links */}
              <div className="mt-6 border-t border-slate-line pt-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/60">
                  Follow Growvia
                </p>
                <ul className="mt-2.5 flex flex-wrap gap-2">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block rounded-full border border-slate-line bg-white px-3.5 py-1.5 text-[13px] font-medium text-charcoal transition-colors hover:border-teal hover:text-teal-600"
                      >
                        {social.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[11px] text-charcoal/55">
                  Placeholder social links — update in{" "}
                  <code className="text-charcoal/70">src/lib/config.ts</code>.
                </p>
              </div>
            </div>
          </div>

          {/* Inquiry form */}
          <div className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-line bg-white p-6 shadow-lg shadow-navy/5 sm:p-8">
              <InquiryForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
