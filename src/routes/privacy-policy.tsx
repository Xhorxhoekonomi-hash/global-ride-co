import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/privacy-policy")({
  head: () =>
    buildHead({
      title: "Privacy Policy | Alpha Worldwide",
      description: "How Alpha Worldwide collects, uses, and protects the personal information you share with us through our website and quote forms.",
      path: "/privacy-policy",
    }),
  component: PrivacyPolicy,
});

function PrivacyPolicy() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Legal</div>
            <h1 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-slate-body">Last updated: August 2026</p>

            <div className="prose-legal mt-10 space-y-8 text-sm leading-relaxed text-slate-body">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p>This policy explains what information Alpha Worldwide collects when you use this website, why we collect it, and how it's handled. It applies to alphaworldwidealbania.com and its subpages, including the Albanian-language section.</p>
              </div>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Information we collect</h2>
                <p className="mt-3">When you submit a quote request, contact form, or WhatsApp inquiry through this website, we may collect:</p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5">
                  <li>Your name and contact details (phone number, email address)</li>
                  <li>Information about the vehicle or route you're inquiring about (origin, destination, vehicle model, a listing link)</li>
                  <li>Any message or notes you include with your inquiry</li>
                  <li>Basic technical and attribution data (the page you submitted from, referring site, and campaign source if you arrived via a tracked link)</li>
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">How we use this information</h2>
                <p className="mt-3">We use the information you provide solely to respond to your inquiry, prepare a quote, and coordinate the vehicle sourcing, inspection, shipping, and customs process you've contacted us about. We do not sell your personal information to third parties.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Where your information is stored</h2>
                <p className="mt-3">Quote and contact submissions are stored in a secure database. This data is not publicly accessible — it can only be read by Alpha Worldwide through our own internal systems, not by other visitors to the website.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">WhatsApp</h2>
                <p className="mt-3">Many of our contact options link directly to WhatsApp. Messages you send us through WhatsApp are subject to WhatsApp's own privacy policy in addition to this one, since that conversation takes place on WhatsApp's platform, not ours.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Cookies and analytics</h2>
                <p className="mt-3">We use limited analytics tools to understand how visitors use this website, only where and when you've given consent. See our <Link to="/cookie-policy" className="text-teal hover:underline">Cookie Policy</Link> for details on what's used and how to manage your preferences.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Data retention</h2>
                <p className="mt-3">We retain quote and contact submissions for as long as reasonably necessary to respond to your inquiry and, where a transaction proceeds, to support the sourcing and shipping process. If you'd like your information removed, contact us using the details below.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Your rights</h2>
                <p className="mt-3">You can ask us what information we hold about you, request a correction, or request deletion, subject to any legitimate business or legal reason we may need to retain certain records. Contact us using the details below to make a request.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Changes to this policy</h2>
                <p className="mt-3">We may update this policy from time to time to reflect changes in how the website operates. The "last updated" date at the top of this page reflects the most recent revision.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Contact us</h2>
                <p className="mt-3">For any question about this policy or your personal information, contact us at <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p>
              </section>

              <p className="text-xs text-slate-body">This policy is provided as general information about our data practices and is not a substitute for legal advice. If you require a legal assessment of your specific rights, please consult a qualified professional in your jurisdiction.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
