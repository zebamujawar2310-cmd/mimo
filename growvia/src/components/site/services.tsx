import { ArrowRight, MessagesSquare } from "lucide-react";

import { SERVICES } from "@/lib/content";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SectionHeading } from "@/components/site/section-heading";
import { ConsultationButton } from "@/components/site/consultation-button";

export function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="section-anchor bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Services"
          title="Everything You Need to Grow Online"
          id="services-heading"
          intro="Nine focused services that combine into one partnership — hire us for a single service or the full journey."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <Card
              key={service.slug}
              className="group flex flex-col hover:-translate-y-1 hover:border-teal/50 hover:shadow-lg hover:shadow-navy/5"
            >
              <CardHeader>
                <span className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-teal/10 transition-colors group-hover:bg-teal/15">
                  <service.icon
                    className="h-5.5 w-5.5 text-teal-600"
                    aria-hidden="true"
                  />
                </span>
                <CardTitle>{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-1 flex-col">
                <p className="mb-4 rounded-lg bg-mist px-3.5 py-2.5 text-[13px] font-medium text-navy">
                  {service.benefit}
                </p>
                <ConsultationButton
                  service={service.title}
                  variant="link"
                  size="sm"
                  className="justify-start p-0 h-auto self-start"
                >
                  Explore Service
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </ConsultationButton>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Not sure what you need CTA */}
        <div className="mt-12 flex flex-col items-center justify-between gap-5 rounded-2xl bg-navy px-6 py-8 text-center sm:flex-row sm:px-10 sm:text-left">
          <div className="flex items-center gap-4">
            <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-teal/15 sm:flex">
              <MessagesSquare className="h-6 w-6 text-teal-400" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-white">
                Not Sure What You Need?
              </h3>
              <p className="mt-1 text-sm text-white/70">
                Tell us where your business is today — we&apos;ll help you
                figure out the right next step.
              </p>
            </div>
          </div>
          <ConsultationButton
            variant="default"
            size="lg"
            className="w-full shrink-0 sm:w-auto"
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ConsultationButton>
        </div>
      </div>
    </section>
  );
}
