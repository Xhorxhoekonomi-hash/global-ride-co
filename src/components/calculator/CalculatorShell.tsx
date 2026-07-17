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
  heroImgSrc,
  heroImgAlt,
  koreaIncludes,
}: {
  dict: CalculatorDict;
  faqs: CalculatorFAQ[];
  source: string;
  contactHref: string;
  heroImgSrc: string;
  heroImgAlt: string;
  koreaIncludes?: string[];
}) {
  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImgSrc} alt={heroImgAlt} width={1920} height={700} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[38vh] flex-col justify-end py-24">
          <div className="eyebrow text-teal-glow">{dict.hero.eyebrow}</div>
          <h1 className="font-display mt-4 max-w-2xl text-4xl font-bold leading-[1.05] md:text-6xl">
            {dict.hero.title}
          </h1>
          <p className="mt-4 max-w-xl text-white/75">{dict.hero.subtitle}</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-20">
          <Tabs defaultValue="usa" className="mx-auto max-w-4xl">
            <TabsList className="mx-auto grid h-auto w-full max-w-lg grid-cols-2 gap-1 rounded-xl bg-mist p-1.5">
              <TabsTrigger value="usa" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-navy data-[state=active]:text-white">
                {dict.tabs.usa}
              </TabsTrigger>
              <TabsTrigger value="korea" className="rounded-lg py-2.5 text-sm font-semibold data-[state=active]:bg-navy data-[state=active]:text-white">
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
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">{dict.howItWorks.heading}</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">{dict.howItWorks.usaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-body">{dict.howItWorks.usaBody}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">{dict.howItWorks.koreaTitle}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-body">{dict.howItWorks.koreaBody}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">{dict.included.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
                {dict.included.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-teal">•</span>{i}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-border bg-card p-7 shadow-card">
              <h3 className="font-display text-lg font-bold text-navy">{dict.excluded.title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm text-slate-body">
                {dict.excluded.items.map((i) => (
                  <li key={i} className="flex gap-2"><span className="text-navy/40">•</span>{i}</li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-slate-body">{dict.excluded.note}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">{dict.ports.eyebrow}</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">{dict.ports.heading}</h2>
          </div>
          <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
            {[dict.ports.durres, dict.ports.rotterdam, dict.ports.bremerhaven].map((p) => (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-6 text-center shadow-card">
                <h3 className="font-display text-base font-bold text-navy">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-slate-body">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">{dict.faq.eyebrow}</div>
            <h2 className="font-display mt-3 text-3xl font-bold text-navy md:text-4xl">{dict.faq.heading}</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {faqs.map((f) => (
              <details key={f.q} className="group p-5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">
                  {f.q}
                  <span className="text-teal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">{dict.relatedCta.eyebrow}</div>
          <h2 className="font-display mt-3 text-3xl font-bold text-white md:text-4xl">{dict.relatedCta.heading}</h2>
          <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-3">
            {dict.relatedCta.links.map((l) => (
              <Link key={l.to} to={l.to} className="rounded-full border border-white/15 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-white/85 transition-colors hover:border-teal hover:text-teal-glow">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
