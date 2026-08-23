import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale, AlertTriangle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/copart-vs-iaai")({
  head: () => {
    const base = buildHead({
      title: "Copart vs IAAI: A Neutral Comparison Guide",
      description: "Comparing Copart and IAAI on inventory, condition information, buyer access, fees, and pickup logistics — without claiming one platform is always cheaper or safer.",
      path: "/guides/copart-vs-iaai",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: "Copart vs IAAI: A Neutral Comparison",
            description: "A neutral comparison of Copart and IAAI covering inventory, condition information, buyer eligibility, fees, and logistics.",
            author: { "@type": "Organization", name: "Alpha Worldwide" },
            publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/guides/copart-vs-iaai`,
            url: `${SITE_URL}/guides/copart-vs-iaai`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
      ],
    };
  },
  component: GuideCopartVsIaai,
});

const COMPARISON = [
  { factor: "Inventory source", copart: "Insurance total-loss, salvage, and some clean-title vehicles", iaai: "Largely insurance total-loss and salvage, similar overall profile to Copart" },
  { factor: "Condition photos", copart: "Multiple angles, interior and exterior", iaai: "Multiple angles, interior and exterior" },
  { factor: "Damage description", copart: "Auction-assigned damage category and description", iaai: "Auction-assigned damage category and description" },
  { factor: "Run-and-drive labeling", copart: "Used where applicable, not a mechanical guarantee", iaai: "Used where applicable, not a mechanical guarantee" },
  { factor: "Buyer access", copart: "Public and dealer access varies by account type and region", iaai: "Public and dealer access varies by account type and region" },
  { factor: "Storage and pickup", copart: "Time-limited free storage, then daily fees apply", iaai: "Time-limited free storage, then daily fees apply" },
];

const FAQS = [
  { q: "Is Copart cheaper than IAAI, or the other way around?", a: "Neither platform is consistently cheaper — pricing depends on the specific vehicle, its condition, demand at that auction, and buyer fees for your account type. Comparing a specific listing on both is more useful than assuming one platform runs lower overall." },
  { q: "Which platform has better vehicle condition information?", a: "Both platforms provide auction-generated photos and damage descriptions using broadly similar formats. Neither publishes an independent mechanical inspection by default — that's a separate step you coordinate yourself." },
  { q: "Can the same vehicle appear on both platforms?", a: "No — a given vehicle is listed on one platform at a time, though similar vehicles (same make, model, and damage type) commonly appear on both." },
  { q: "Does one platform make pickup and storage easier?", a: "Both platforms operate on a similar model: a limited free storage window after the sale, followed by daily storage fees. Planning transport promptly after a win matters on either platform." },
];

function GuideCopartVsIaai() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'm deciding between Copart and IAAI for a vehicle and would like some guidance.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Copart vs IAAI" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Salvage auction vehicles ready for buyer inspection" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="auctions" readingTime="4 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">Copart vs IAAI: A Neutral Comparison</h1>
          <p className="mt-4 max-w-2xl text-white/75">Two of the largest US salvage auction platforms, compared honestly — including where they're more similar than different.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> Copart and IAAI are more alike than different — similar inventory profile, similar condition-reporting format, similar fee structure. Neither one is reliably cheaper or safer across the board. The better question is usually which platform has the specific vehicle you want, at a condition and price that make sense.</p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-2xl font-bold text-navy">Side-by-side comparison</h2>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse overflow-hidden rounded-2xl border border-border text-left text-sm">
                <thead>
                  <tr className="bg-card">
                    <th className="p-4 font-display font-bold text-navy">Factor</th>
                    <th className="p-4 font-display font-bold text-navy">Copart</th>
                    <th className="p-4 font-display font-bold text-navy">IAAI</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.factor} className="border-t border-border bg-background">
                      <td className="p-4 font-semibold text-navy">{row.factor}</td>
                      <td className="p-4 text-slate-body">{row.copart}</td>
                      <td className="p-4 text-slate-body">{row.iaai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-slate-body">Fee amounts vary by vehicle value, account type, and change periodically — we confirm the current fee schedule when reviewing a specific listing rather than quoting a fixed table here.</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Which platform suits which buyer</h2>
              <p className="mt-3 text-slate-body">Neither platform is the "better" choice in the abstract. Buyers focused on repairable damage at the lowest entry price will find comparable options on both. Buyers who want a slightly wider net for a specific make or model often check both platforms rather than committing to one. The deciding factor is usually the specific listing, not the platform brand.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Why neither platform eliminates purchase risk</h2>
              <p className="mt-3 text-slate-body">Auction condition reports and photos are generated by the auction itself, not an independent inspector, on both platforms. Run-and-drive labels indicate the vehicle moved under its own power during testing — not that it's mechanically sound. Where operationally possible, an independent inspection closes some of that gap; see our guide on <Link to="/guides/how-to-check-a-used-car-before-buying" className="text-teal hover:underline">checking a used car before buying</Link> and our <Link to="/inspection-service" className="text-teal hover:underline">inspection service</Link>.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Inspection availability</h2>
              <p className="mt-3 text-slate-body">Inspection access depends on the yard's individual policy and the specific vehicle, not just the platform overall. We check feasibility for a given lot before you commit rather than assuming access in advance.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display flex items-center gap-2 text-2xl font-bold text-navy"><AlertTriangle className="h-5 w-5 text-teal" /> A note on comparison sites</h2>
            <p className="mt-3 text-slate-body">Fee tables and "which is cheaper" claims circulate widely online, but auction fee schedules change and vary by account tier — a number that was accurate a year ago may not be now. We verify current terms for a specific listing rather than repeating a static table that could mislead you.</p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-display text-2xl font-bold text-navy">Frequently asked</h2>
            <div className="mt-6 divide-y divide-border rounded-2xl border border-border bg-card">
              {FAQS.map((f) => (
                <details key={f.q} className="group p-5">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-navy">{f.q}<span className="text-teal transition-transform group-open:rotate-45">+</span></summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-body">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14"><AuthorBox /></div>
      </section>
      <section className="section-mist">
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/import-usa" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">USA sourcing</Link>
            <Link to="/auction-access" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Auction access options</Link>
            <Link to="/guides/how-to-buy-a-car-from-usa-auctions" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Full auction buying guide</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Comparing a specific vehicle?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Send us both listings</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-copart-vs-iaai" })} className="btn-primary"><Scale className="h-4 w-4" /> Compare on WhatsApp</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-copart-vs-iaai" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
