import { SectionReveal } from "@/components/layout/section-reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { homeFaq } from "@/content/faq";

export function Faq() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-deep">FAQ</p>
          <h2 className="mt-4 text-balance font-brand text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Questions we get asked first
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            Especially about how Advance Pay works, and why it isn&apos;t a loan.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1} className="rounded-card border border-border bg-white px-6 shadow-soft sm:px-8">
          <Accordion type="single" collapsible className="w-full">
            {homeFaq.map((item, index) => (
              <AccordionItem key={item.question} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </SectionReveal>
      </div>
    </section>
  );
}
