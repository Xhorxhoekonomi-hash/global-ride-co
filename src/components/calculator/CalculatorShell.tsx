import { InnerPageHero } from "@/components/site/InnerPageHero";
import { Button } from "@/components/ui/button";
import { MotionConfig } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsaCalculator } from "./UsaCalculator";
import { KoreaCalculator } from "./KoreaCalculator";
import type { CalculatorDict, CalculatorFAQ } from "./dict";

export function CalculatorShell({
  dict,
  faqs,
  source,
  contactHref,
  koreaIncludes,
}: {
  dict: CalculatorDict;
  faqs: CalculatorFAQ[];
  source: string;
  contactHref: string;
  koreaIncludes?: string[];
}) {
  return (
    <MotionConfig reducedMotion="user">
      <InnerPageHero eyebrow={dict.hero.eyebrow} title={dict.hero.title} description={dict.hero.subtitle} />

      <section className="bg-background">
        <div className="container-page py-14 md:py-20">
          <Tabs defaultValue="usa" className="mx-auto max-w-6xl">
            <TabsList className="mx-auto grid h-auto w-full max-w-lg grid-cols-2 gap-1 rounded-lg bg-mist p-1.5">
              <TabsTrigger value="usa" className="rounded-lg min-h-12 py-3 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {dict.tabs.usa}
              </TabsTrigger>
              <TabsTrigger value="korea" className="rounded-lg min-h-12 py-3 text-sm font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                {dict.tabs.korea}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="usa" className="mt-10">
              <UsaCalculator dict={dict} source={source} contactHref={contactHref} />
            </TabsContent>
            <TabsContent value="korea" className="mt-10">
              <KoreaCalculator dict={dict} source={source} contactHref={contactHref} koreaIncludes={koreaIncludes} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">{dict.howItWorks.eyebrow}</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">{dict.howItWorks.heading}</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-secondary">{dict.howItWorks.usaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dict.howItWorks.usaBody}</p>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-secondary">{dict.howItWorks.koreaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{dict.howItWorks.koreaBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-secondary">{dict.included.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {dict.included.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-primary">•</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-secondary">{dict.excluded.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {dict.excluded.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-muted-foreground">•</span>{i}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">{dict.excluded.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">{dict.ports.eyebrow}</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">{dict.ports.heading}</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
            {[dict.ports.durres, dict.ports.rotterdam, dict.ports.bremerhaven].map((p) => (
              <div key={p.title} className="rounded-lg border border-border bg-card p-6 text-center shadow-card">
                <h3 className="font-display text-base font-bold text-secondary">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">{dict.faq.eyebrow}</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">{dict.faq.heading}</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-lg border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="min-h-11 flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-secondary">
                  {f.q}
                  <span className="text-primary transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-accent border-y border-border">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-primary">{dict.relatedCta.eyebrow}</div>
          <h2 className="font-display mt-3 text-3xl font-bold text-secondary md:text-4xl">{dict.relatedCta.heading}</h2>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {dict.relatedCta.links.map((l) => (
              <Button key={l.to} asChild variant="outline" className="min-h-11 h-auto whitespace-normal py-3"><Link to={l.to}>
                {l.label}
              </Link></Button>
            ))}
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
