import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CONTACT } from "@/lib/site-data";

export const Route = createFileRoute("/cookie-policy")({
  head: () =>
    buildHead({
      title: "Cookie Policy | Alpha Worldwide",
      description: "What cookies and similar technologies Alpha Worldwide uses on this website, and how to manage your preferences.",
      path: "/cookie-policy",
    }),
  component: CookiePolicy,
});

const COOKIE_TYPES = [
  { name: "Essential", body: "Required for the website to function correctly — for example, remembering your language preference (English or Albanian) as you browse. These cannot be switched off." },
  { name: "Analytics", body: "Help us understand how visitors use the site — which pages are most viewed, general traffic patterns — so we can improve it. Only loaded if you give consent." },
];

function CookiePolicy() {
  return (
    <>
      <Breadcrumbs items={[{ label: "Cookie Policy" }]} />
      <section className="bg-background">
        <div className="container-page py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="eyebrow">Legal</div>
            <h1 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Cookie Policy</h1>
            <p className="mt-3 text-sm text-slate-body">Last updated: August 2026</p>

            <div className="mt-10 space-y-8 text-sm leading-relaxed text-slate-body">
              <div className="rounded-2xl border border-border bg-card p-6">
                <p>Cookies are small text files stored on your device that help websites function and, where permitted, help us understand how the site is used. This page explains what we use on alphaworldwidealbania.com.</p>
              </div>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">What we use</h2>
                <div className="mt-4 space-y-4">
                  {COOKIE_TYPES.map((c) => (
                    <div key={c.name} className="rounded-xl border border-border bg-card p-4">
                      <div className="text-sm font-semibold text-navy">{c.name}</div>
                      <p className="mt-1.5 text-sm text-slate-body">{c.body}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Analytics tools we may use</h2>
                <p className="mt-3">When active, we use standard, widely recognized analytics tools such as Google Analytics and Microsoft Clarity to understand aggregate visitor behavior. These are only loaded after you've given consent, and are never active by default.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Managing your preferences</h2>
                <p className="mt-3">You can control cookies through your browser settings, including blocking or deleting them at any time. Blocking essential cookies may affect how the website functions, such as remembering your language preference.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Third-party links</h2>
                <p className="mt-3">Links to WhatsApp, Instagram, and similar platforms take you to services with their own separate cookie and privacy practices, which this policy does not cover. See our <Link to="/privacy-policy" className="text-teal hover:underline">Privacy Policy</Link> for how we handle information you submit directly to us.</p>
              </section>

              <section>
                <h2 className="font-display text-xl font-bold text-navy">Contact us</h2>
                <p className="mt-3">Questions about this policy can be sent to <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p>
              </section>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
