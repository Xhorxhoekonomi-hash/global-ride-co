import { createFileRoute, Link } from "@tanstack/react-router";
import { Search, ShieldAlert, Calculator, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { AuthorBox } from "@/components/guides/AuthorBox";
import { GuideMeta } from "@/components/guides/GuideMeta";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/guides/how-to-check-a-used-car-before-buying")({
  head: () => {
    const base = buildHead({
      title: "How to Check a Used Car Before Buying | Practical Checklist",
      description: "A practical checklist for evaluating a used vehicle before purchase — VIN, service history, mechanical checks, OBD scans, and where inspection limits genuinely are.",
      path: "/guides/how-to-check-a-used-car-before-buying",
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
            headline: "How to Check a Used Car Before Buying",
            description: "A practical checklist for evaluating a used vehicle before purchase, including VIN checks, mechanical checks, and the limits of any inspection.",
            author: { "@type": "Organization", name: "Alpha Worldwide" },
            publisher: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            mainEntityOfPage: `${SITE_URL}/guides/how-to-check-a-used-car-before-buying`,
            url: `${SITE_URL}/guides/how-to-check-a-used-car-before-buying`,
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
  component: GuideUsedCarCheck,
});

const CHECK_GROUPS = [
  { title: "Paper trail", body: "Before anything hands-on, the available documentation tells you a lot about a vehicle's past — and about how much can even be verified.", items: ["VIN decoded and cross-checked against the listing", "Auction or dealer history reviewed where available", "Service history checked for consistency", "Odometer readings checked for gaps or inconsistency"] },
  { title: "Damage history", body: "Reported damage history is only as complete as what's been recorded — but where it exists, it's worth reviewing carefully.", items: ["Accident history reviewed where reported", "Flood-damage indicators checked", "Fire-damage indicators checked", "Structural or frame damage assessed where visible"] },
  { title: "Mechanical", body: "This is the core of any inspection — the difference between a vehicle that looks fine in photos and one that actually runs well.", items: ["Engine checked for leaks, noise, and smoke on start", "Transmission behavior checked through the available gear range", "OBD scan for stored fault codes", "Cold-start behavior observed where possible"] },
  { title: "Body and interior", body: "Cosmetic and interior condition, plus the electronics that are increasingly central to a modern vehicle's value.", items: ["Paint checked for mismatched panels or overspray", "Airbags and safety systems checked for prior deployment", "Interior electronics and infotainment tested", "Cameras and sensors tested where fitted"] },
  { title: "Wear items", body: "Consumable parts that affect near-term cost even on an otherwise sound vehicle.", items: ["Tire wear and tread checked for uneven patterns", "Brakes checked for wear and responsiveness", "Keys and remotes confirmed present and functional"] },
];

const FAQS = [
  { q: "Can an inspection guarantee a vehicle has no hidden problems?", a: "No. An inspection reduces risk by checking visible and testable conditions at that point in time, but it cannot guarantee the absence of hidden defects, especially ones that aren't detectable without disassembly." },
  { q: "What if the seller won't allow full access to the vehicle?", a: "Access depends on the seller or auction yard's policy and isn't always full — some vehicles allow only photos and a limited walk-around, others allow a full mechanical check. We confirm what's realistic for a specific vehicle before recommending next steps." },
  { q: "Is an OBD scan enough to know the vehicle is mechanically sound?", a: "An OBD scan reveals stored fault codes at the time of the scan, but it doesn't catch every mechanical issue — some problems don't trigger a code, and some codes get cleared before a scan. It's one useful data point among several, not a complete diagnosis." },
  { q: "When should I walk away from a vehicle?", a: "Common red flags include inconsistent odometer history, unexplained structural repairs, persistent fault codes the seller can't explain, or a seller who won't allow any form of inspection or documentation review. None of these alone is automatically disqualifying, but they warrant caution." },
  { q: "Does mismatched paint always mean the vehicle was in an accident?", a: "Not necessarily — it can also result from routine panel replacement or minor cosmetic repair. It's a signal worth investigating further, not an automatic red flag on its own." },
  { q: "What can't be checked on a vehicle that's still at an auction yard?", a: "Depending on the yard's policy, a full test drive, a lift inspection of the underside, or extended diagnostic time may not be possible — availability varies by location and by the specific vehicle, and we confirm what's realistic before recommending next steps." },
];

function GuideUsedCarCheck() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello Alpha Worldwide, I'd like help evaluating a used vehicle before I commit to buying it.")}`;

  return (
    <>
      <Breadcrumbs items={[{ label: "Guides", to: "/guides" }, { label: "Checking a Used Car" }]} />
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Technician checking a used vehicle before purchase" width={1920} height={800} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[45vh] flex-col justify-end py-24">
          <GuideMeta category="inspection" readingTime="3 min" />
          <h1 className="font-display mt-4 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl">How to Check a Used Car Before Buying</h1>
          <p className="mt-4 max-w-2xl text-white/75">A practical, honest checklist — including where inspection limits genuinely are, not just what to look for.</p>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-12 md:py-14">
          <div className="mx-auto max-w-3xl rounded-2xl border border-border bg-card p-6 shadow-card">
            <p className="text-sm text-slate-body"><strong className="text-navy">Short answer:</strong> a thorough check combines a paper-trail review (VIN, history, odometer) with a hands-on mechanical and cosmetic check, plus an OBD scan where the vehicle is accessible. It meaningfully reduces risk — it doesn't eliminate it. Vehicle access always depends on what the seller or auction allows.</p>
          </div>
          <p className="mx-auto mt-4 max-w-3xl text-sm text-slate-body">Buying a vehicle you can't physically visit before purchase — which describes most auction and cross-border purchases — means leaning more heavily on documentation and whatever inspection access is available. The checklist below covers the areas worth reviewing systematically, organized the way an actual inspection typically proceeds: paperwork first, then damage history, then the hands-on mechanical and cosmetic check.</p>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            {CHECK_GROUPS.map((g) => (
              <div key={g.title}>
                <h2 className="font-display text-xl font-bold text-navy">{g.title}</h2>
                <p className="mt-2 text-sm text-slate-body">{g.body}</p>
                <div className="mt-4 space-y-2.5">
                  {g.items.map((item) => (
                    <div key={item} className="flex gap-2.5 text-sm text-slate-body"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{item}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-14 md:py-16">
          <div className="mx-auto max-w-3xl space-y-10">
            <div>
              <h2 className="font-display flex items-center gap-2 text-2xl font-bold text-navy"><ShieldAlert className="h-5 w-5 text-teal" /> Where inspection limits genuinely are</h2>
              <div className="mt-4 space-y-3 text-sm text-slate-body">
                <p>An inspection reduces risk — it does not eliminate it. Reports reflect visible and testable conditions at the time of inspection, not a lifetime guarantee. Hidden defects that aren't detectable without disassembly can remain undiscovered. Vehicle access depends entirely on what the seller or auction permits, and full access isn't always available.</p>
                <p>This is exactly why we're direct about what any inspection can and can't tell you, rather than presenting it as a certainty. See our related guide on <Link to="/vehicle-history-check" className="text-teal hover:underline">what vehicle history reports can and can't show</Link>.</p>
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">Weighing what you find</h2>
              <p className="mt-3 text-slate-body">Not every issue found during a check is a reason to walk away — the goal is an informed decision, not a perfect vehicle. Minor wear items are often negotiable in price or acceptable given the vehicle's age and use. Persistent, unexplained fault codes, inconsistent odometer history, or a seller unwilling to allow any documentation review are different — these point to unknowns that are harder to price in, and warrant more caution than a worn brake pad or a stone chip.</p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">How this fits into the wider buying process</h2>
              <p className="mt-3 text-slate-body">Inspection is one step in a larger process — see our <Link to="/guides/how-to-buy-a-car-from-usa-auctions" className="text-teal hover:underline">full auction buying guide</Link> for how it fits alongside bidding, shipping, and documentation, and our <Link to="/guides/common-car-import-mistakes" className="text-teal hover:underline">common import mistakes guide</Link> for the errors that tend to follow from skipping this step.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
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
      <section className="bg-background">
        <div className="container-page py-12 text-center md:py-14">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/inspection-service" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Inspection service</Link>
            <Link to="/vehicle-history-check" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Vehicle history check</Link>
            <Link to="/guides/how-to-buy-a-car-from-usa-auctions" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">Buying from US auctions</Link>
            <Link to="/guides" className="rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold text-navy transition-colors hover:border-teal hover:text-teal">All guides</Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-16 text-center md:py-20">
          <div className="eyebrow text-teal-glow">Have a vehicle in mind?</div>
          <h2 className="font-display mx-auto mt-3 max-w-xl text-3xl font-bold text-white md:text-4xl">Ask us to check it before you buy</h2>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "guide-used-car-inspection" })} className="btn-primary"><Search className="h-4 w-4" /> Ask About Inspection</a>
            <Link to="/calculator" onClick={() => trackEvent("calculator_started", { source: "guide-used-car-inspection" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Calculate Shipping Cost</Link>
          </div>
        </div>
      </section>
    </>
  );
}
