import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { Services } from "@/components/site/services";
import { Portfolio } from "@/components/site/portfolio";
import { WhyChoose } from "@/components/site/why-choose";
import { Process } from "@/components/site/process";
import { Testimonials } from "@/components/site/testimonials";
import { CtaSection } from "@/components/site/cta-section";
import { Contact } from "@/components/site/contact";
import { Faq } from "@/components/site/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <WhyChoose />
      <Process />
      <Testimonials />
      <CtaSection />
      <Contact />
      <Faq />
    </>
  );
}
