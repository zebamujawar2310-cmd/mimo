import { FAQS } from "@/lib/content";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionHeading } from "@/components/site/section-heading";

export function Faq() {
  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-white py-16 sm:py-24"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, Answered"
          id="faq-heading"
          intro="Quick answers to the things clients ask us most. If yours isn't here, just get in touch."
        />

        <div className="mt-10 rounded-2xl border border-slate-line bg-white px-5 sm:px-7">
          <Accordion type="single" collapsible defaultValue="item-0">
            {FAQS.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
