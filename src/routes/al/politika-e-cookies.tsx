import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";
import { LegalPage } from "@/components/site/LegalPage";

const COOKIE_TYPES = [
  { name: "Thelbësore", body: "Të nevojshme që faqja të funksionojë si duhet — për shembull, për të mbajtur mend preferencën tuaj të gjuhës (anglisht ose shqip) ndërsa shfletoni. Këto nuk mund të çaktivizohen." },
  { name: "Analitike", body: "Na ndihmojnë të kuptojmë si e përdorin vizitorët faqen — cilat faqe shihen më shumë, modelet e përgjithshme të trafikut — që ta përmirësojmë. Ngarkohen vetëm nëse jepni pëlqimin." },
];

export const Route = createFileRoute("/al/politika-e-cookies")({
  head: () => buildHead({
    title: "Politika e cookies | Alpha Worldwide",
    description: "Cilat cookies dhe teknologji të ngjashme përdor Alpha Worldwide në këtë faqe dhe si t'i menaxhoni preferencat tuaja.",
    path: "/al/politika-e-cookies",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/cookie-policy" }, { lang: "sq", path: "/al/politika-e-cookies" }],
    xDefault: "/cookie-policy",
  }),
  component: () => (
    <LegalPage
      crumb="Politika e cookies"
      title="Politika e cookies"
      updated="Përditësuar së fundi: gusht 2026"
      intro="Cookies janë skedarë të vegjël teksti që ruhen në pajisjen tuaj dhe i ndihmojnë faqet të funksionojnë e, kur lejohet, na ndihmojnë të kuptojmë si përdoret faqja. Kjo faqe shpjegon çfarë përdorim në alphaworldwidealbania.com."
      sections={[
        { h: "Çfarë përdorim", body: <div className="space-y-4">{COOKIE_TYPES.map((c) => <div key={c.name} className="rounded-xl border border-border bg-card p-4"><div className="text-sm font-semibold text-navy">{c.name}</div><p className="mt-1.5 text-sm text-slate-body">{c.body}</p></div>)}</div> },
        { h: "Mjetet analitike që mund të përdorim", body: <p>Kur janë aktive, përdorim mjete analitike standarde dhe të njohura gjerësisht si Google Analytics dhe Microsoft Clarity për të kuptuar sjelljen e përgjithshme të vizitorëve. Ato ngarkohen vetëm pasi të keni dhënë pëlqimin dhe nuk janë kurrë aktive si parazgjedhje.</p> },
        { h: "Menaxhimi i preferencave", body: <p>Mund t'i kontrolloni cookies përmes cilësimeve të shfletuesit, përfshirë bllokimin ose fshirjen e tyre në çdo kohë. Bllokimi i cookies thelbësore mund të ndikojë në funksionimin e faqes, si p.sh. mbajtja mend e preferencës së gjuhës.</p> },
        { h: "Lidhje me palë të treta", body: <p>Lidhjet për WhatsApp, Instagram dhe platforma të ngjashme ju çojnë te shërbime me praktikat e tyre të veçanta për cookies dhe privatësinë, të cilat kjo politikë nuk i mbulon. Shihni <Link to="/al/politika-e-privatesise" className="text-teal hover:underline">Politikën e privatësisë</Link> për mënyrën si trajtojmë informacionin që na dërgoni drejtpërdrejt.</p> },
        { h: "Na kontaktoni", body: <p>Pyetjet për këtë politikë mund t'i dërgoni në <a href={`mailto:${CONTACT.email}`} className="text-teal hover:underline">{CONTACT.email}</a>.</p> },
      ]}
    />
  ),
});
