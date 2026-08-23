import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/terms")({
  head: () =>
    buildHead({
      title: "Terms of Service | Alpha Worldwide",
      description: "The terms that apply to using the Alpha Worldwide website and engaging our vehicle sourcing, inspection, and shipping services.",
      path: "/terms",
    }),
  component: Terms,
});

function Terms() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Legal</div>
            <h1 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Terms of Service</h1>
            <p className="mt-3 text-sm text-slate-body">Last updated: August 2026</p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-body">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p>These terms govern your use of alphaworldwidealbania.com and your engagement of Alpha Worldwide's vehicle sourcing, inspection coordination, and shipping services. By using this website or engaging our services, you agree to the terms below.</p>
              </div>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Our role</h2>
                <p className="mt-3">Alpha Worldwide acts as a broker and logistics coordinator — sourcing vehicles, coordinating inspection where operationally possible, arranging shipping, and coordinating export and customs documentation. We assist customers purchasing through auction platforms such as Copart, IAAI, Manheim, ADESA, Encar, Autowini, and KB Chachacha, and through selected dealers, without being an official partner of any of these platforms unless separately and explicitly stated.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Estimates, not guarantees</h2>
                <p className="mt-3">Shipping costs, transit times, and delivery estimates provided through our <Link to="/calculator" className="text-teal hover:underline">calculator</Link> or in correspondence are estimates based on information available at the time. They are not a guaranteed final price or delivery date. Actual costs and timelines can be affected by freight rate changes, vessel schedules, customs processing, and other factors outside our control. See our <Link to="/guides/car-shipping-costs-explained" className="text-teal hover:underline">shipping costs guide</Link> for more detail.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Inspection limitations</h2>
                <p className="mt-3">Where operationally possible, we coordinate pre-purchase vehicle inspection. Inspection availability depends on the seller, the auction, and access to the vehicle, and is never guaranteed for every listing. An inspection reduces risk but cannot eliminate it, and reflects the vehicle's visible and testable condition at the time of inspection only.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Registration, customs, and homologation</h2>
                <p className="mt-3">We coordinate export and shipping documentation, and where relevant point customers toward the documentation typically required at the destination. We are not a law firm, tax advisor, or customs authority. Final decisions on registration approval, customs valuation, duties, taxes, and homologation are made by the relevant authority at your destination, not by Alpha Worldwide. Requirements vary by country and vehicle and should always be confirmed with the local authority before you commit to a purchase.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Payments</h2>
                <p className="mt-3">We provide an itemized cost breakdown before payment is requested for a purchase. Payment terms and schedules are confirmed directly with you as part of coordinating your specific order.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Limitation of liability</h2>
                <p className="mt-3">To the extent permitted by law, Alpha Worldwide is not liable for delays, losses, or costs arising from circumstances outside our reasonable control, including but not limited to shipping line schedule changes, port congestion, customs processing delays, or decisions made by third-party auction platforms or authorities.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Website content</h2>
                <p className="mt-3">Content on this website, including our <Link to="/guides" className="text-teal hover:underline">guides</Link>, is provided for general informational purposes and does not constitute legal, tax, or professional advice. See individual pages for specific qualifications.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Changes to these terms</h2>
                <p className="mt-3">We may update these terms from time to time. The "last updated" date at the top of this page reflects the most recent revision.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Contact us</h2>
                <p className="mt-3">Questions about these terms can be sent to <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p>
              </section>

              <p className="text-xs text-slate-body">These terms are provided as general information and are not a substitute for legal advice. If you require a legal assessment of your specific situation, please consult a qualified professional in your jurisdiction.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
