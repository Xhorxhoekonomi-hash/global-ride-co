import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/shipping-estimate-disclaimer")({
  head: () =>
    buildHead({
      title: "Shipping Estimate Disclaimer | Alpha Worldwide",
      description: "What our shipping calculator estimates include and exclude, and why figures shown are estimates rather than guaranteed final prices.",
      path: "/shipping-estimate-disclaimer",
    }),
  component: ShippingDisclaimer,
});

function ShippingDisclaimer() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Shipping Estimate Disclaimer" }]} />
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Legal</div>
            <h1 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Shipping Estimate Disclaimer</h1>
            <p className="mt-3 text-sm text-slate-body">Last updated: August 2026</p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-body">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p>Our <Link to="/calculator" className="text-teal hover:underline">shipping calculator</Link> gives you an itemized estimate for logistics costs based on the vehicle, route, and shipping method you select. This page explains exactly what that estimate covers, what it doesn't, and why it isn't a fixed, final price.</p>
              </div>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">What the calculator estimates</h2>
                <p className="mt-3">The calculator estimates logistics-related costs we can reasonably quote based on your inputs — inland transport, loading, ocean or air freight, and related handling. These figures are generated from current, general pricing data and are refined once we confirm the specific vehicle and booking details with you.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">What it does not include</h2>
                <p className="mt-3">The calculator does not include destination customs duties, VAT or equivalent taxes, registration fees, or homologation costs — these are set independently by the customs and tax authority at your destination, not by Alpha Worldwide, and vary by country and vehicle. It also does not include variable costs like demurrage, detention, or repairs identified after purchase. See our <Link to="/guides/car-shipping-costs-explained" className="text-teal hover:underline">shipping costs guide</Link> for the full breakdown of these categories.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Why figures can change</h2>
                <p className="mt-3">Freight rates, vessel schedules, and currency exchange rates can shift between when you receive an estimate and when a shipment is actually booked. We confirm current numbers at the point of booking rather than treating an early estimate as fixed indefinitely.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Transit time estimates</h2>
                <p className="mt-3">Any transit time shown alongside a cost estimate is a general range, not a guaranteed delivery date. See our <Link to="/guides/how-long-does-car-shipping-take" className="text-teal hover:underline">shipping timelines guide</Link> for what affects this.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Getting a confirmed quote</h2>
                <p className="mt-3">For a confirmed, itemized quote tied to a specific vehicle and route, contact us directly with your vehicle details — we'll verify current rates and provide a written breakdown before you commit to anything.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Contact us</h2>
                <p className="mt-3">Questions about an estimate you've received can be sent to <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
