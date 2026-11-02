import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is Trimmer Boss™?",
    a: "Trimmer Boss™ is a metal trimmer head designed for demanding outdoor maintenance — a durable, plastic-free alternative to conventional disposable trimmer line that makes yard care easier.",
  },
  {
    q: "Is it compatible with my trimmer?",
    a: "Every Trimmer Boss™ ships with a free adapter kit designed to fit 99% of trimmers on the market. If you are unsure about your specific model, send us your trimmer make and model via the contact form and we will confirm fit before you order.",
  },
  {
    q: "What is included in the adapter kit?",
    a: "A free adapter kit is included with every order and is designed to fit 99% of trimmers on the market. The complete list of included adapters and hardware will be published here shortly — contact us to confirm your specific model first.",
  },
  {
    q: "Which applications is it suitable for?",
    a: "Trimmer Boss™ is perfect for concrete, driveways, patios, hedges, sidewalks and edges. It easily removes grass, moss, weeds, dirt and dust from the yard, patio and driveway — including hard-to-reach areas.",
  },
  {
    q: "How do the bundle discounts work?",
    a: "Buy one at 6,643/-, two and save 15% with free worldwide shipping, or three and save 27% with expedited shipping. Selecting a bundle in the order modal applies the correct discount automatically — the math is shown before you confirm.",
  },
  {
    q: "How does worldwide shipping work?",
    a: "We offer free worldwide shipping on every order. Bundle orders of three units additionally ship with expedited (faster) shipping at no extra cost.",
  },
  {
    q: "What is the refund policy?",
    a: "Every order is backed by our 30-day money-back guarantee. Full terms and the return process are summarised on our Returns & Refunds page.",
  },
  {
    q: "How do I track my order?",
    a: "Use the Track Order button in the navigation and enter your order ID. This storefront is running in demo mode, so it currently recognises demo IDs in the format TB-DEMO-#### only — a live tracking connection will be added before orders are fulfilled for real.",
  },
  {
    q: "What safety precautions should I follow?",
    a: "Read your trimmer's instruction manual before fitting any attachment. Wear eye protection and sturdy footwear, inspect the head before each use, let the engine cool before handling, keep bystanders and pets at a safe distance, and never run equipment with damaged guards.",
  },
  {
    q: "How can I contact customer support?",
    a: "Use the contact form on this page or email the support address listed there. We answer compatibility questions, order questions and everything in between.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="bg-white">
      <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="eyebrow mb-4 text-black/50">FAQ</p>
          <h2 className="text-3xl sm:text-4xl">Frequently asked questions</h2>
        </div>
        <Accordion type="single" collapsible className="mt-10">
          {faqs.map((item) => (
            <AccordionItem key={item.q} value={item.q}>
              <AccordionTrigger>{item.q}</AccordionTrigger>
              <AccordionContent>{item.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}