import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { FAQS } from "@/lib/site-data";
import { KeywordText } from "@/components/site/KeywordText";

export function Faq() {
  return (
    <section className="bg-background">
      <div className="container-page section-y">
        <div className="max-w-2xl">
          <div className="eyebrow">Questions</div>
          <h2 className="mt-3 text-navy">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-base text-slate-body">
            Shipping, auctions, inspection, customs and payments — answered directly.
          </p>
        </div>

        <div className="mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="font-display text-left text-base font-bold text-navy hover:no-underline md:text-lg">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-slate-body md:text-base">
                  <KeywordText text={f.a} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
