import { createFileRoute, Link } from "@tanstack/react-router";
import { Gavel, Search, ShieldCheck, FileText, Truck, Ship, Landmark, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-usa.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/ankande-amerikane")({
  head: () => {
    const base = buildHead({
      title: "Ankande Makinash në Amerikë | Copart, IAAI, Manheim, ADESA",
      description: "Krahasim i platformave të ankandeve amerikane — Copart, IAAI, Manheim dhe ADESA — dhe si ju ndihmon Alpha Worldwide të blini e të transportoni automjetin e duhur në Shqipëri.",
      path: "/al/ankande-amerikane",
      lang: "sq",
      image: heroImg,
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Asistencë për Ankandet Amerikane të Automjeteve",
            description: "Ndihmë profesionale për blerjen e automjeteve nga Copart, IAAI, Manheim dhe ADESA, me krahasim platformash, verifikim historiku dhe transport drejt Shqipërisë.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/ankande-amerikane`,
            inLanguage: "sq",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS_AL.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: AnkandeAmerikane,
});

const PLATFORMS_AL = [
  { name: "Copart", inventory: "Automjete të dëmtuara, salvage, dhe tituj të pastër", suits: "Kërkues me buxhet, riparim, ose pjesë këmbimi" },
  { name: "IAAI", inventory: "Ngjashëm me Copart — salvage dhe run-and-drive, shpesh nga kompanitë e sigurimit", suits: "Blerës që kërkojnë gamë të gjerë kushtesh automjeti" },
  { name: "Manheim", inventory: "Kryesisht inventar dealer-i dhe automjete me qira të përfunduar, gjendje më e mirë mesatare", suits: "Blerës që kërkojnë automjete me titull të pastër dhe histori më të qartë" },
  { name: "ADESA", inventory: "Inventar dealer-i dhe korporativ, i ngjashëm me Manheim", suits: "Blerës që preferojnë automjete jo-salvage me dokumentacion të plotë" },
];

const WORKFLOW_AL = [
  { n: 1, icon: Search, title: "Zgjedhja e automjetit", body: "Na tregoni çfarë kërkoni, ose na dërgoni një lot specifik nga njëra prej platformave." },
  { n: 2, icon: FileText, title: "Shqyrtimi i platformës", body: "Krahasojmë çmimin, gjendjen dhe historikun mes Copart, IAAI, Manheim dhe ADESA." },
  { n: 3, icon: ShieldCheck, title: "Kontrolli i historikut", body: "Verifikojmë titullin, kilometrazhin dhe raportet e dëmtimit para se të vendosni." },
  { n: 4, icon: ShieldCheck, title: "Mundësia e inspektimit", body: "Kontrollojmë nëse inspektimi i pavarur është i mundur për lotin specifik." },
  { n: 5, icon: Gavel, title: "Ndihmë për ofertën", body: "Vendosim ofertën ose kryejmë blerjen sipas buxhetit dhe udhëzimeve tuaja." },
  { n: 6, icon: FileText, title: "Blerja", body: "Përfundojmë blerjen dhe fillojmë koordinimin e dokumentacionit." },
  { n: 7, icon: Truck, title: "Transporti tokësor", body: "Automjeti transportohet drejt terminalit të eksportit më të përshtatshëm." },
  { n: 8, icon: FileText, title: "Eksporti", body: "Përgatisim dokumentacionin e eksportit para ngarkimit." },
  { n: 9, icon: Ship, title: "Kontenieri", body: "Ngarkim në kontenier të përbashkët ose të dedikuar për transport detar." },
  { n: 10, icon: Landmark, title: "Mbërritja në Durrës", body: "Koordinojmë dokumentacionin doganor dhe dorëzimin te ju." },
];

const FAQS_AL = [
  { q: "Cila platformë është më e mirë për automjete me riparime?", a: "Copart dhe IAAI kanë zakonisht gamën më të gjerë të automjeteve salvage ose të dëmtuara, të përshtatshme për blerës që kërkojnë çmim më të ulët ose synojnë riparim. Manheim dhe ADESA priren drejt inventarit me titull të pastër." },
  { q: "A jeni partnerë zyrtarë të Copart, IAAI, Manheim ose ADESA?", a: "Jo. Ne asistojmë klientët në blerjen e automjeteve të listuara në këto platforma, por nuk pretendojmë partneritet zyrtar me asnjërën prej tyre." },
  { q: "Cila platformë ka automjete luksoze?", a: "Automjetet luksoze mund të shfaqen në të katërta platformat, por Manheim dhe ADESA priren të kenë më shumë inventar dealer-i me gjendje më të mirë, ndërsa Copart dhe IAAI mund të ofrojnë çmime më konkurruese për të njëjtin model me histori më komplekse." },
  { q: "A mund të inspektohet çdo automjet para blerjes?", a: "Jo automatikisht. Mundësia e inspektimit varet nga platforma, vendndodhja e automjetit dhe aksesi te ai. Ju konfirmojmë disponueshmërinë për lotin specifik përpara se të vendosni." },
  { q: "Si e zgjedh platformën e duhur për nevojat e mia?", a: "Na tregoni buxhetin, llojin e automjetit dhe qëllimin — përdorim personal, rishitje, apo pjesë këmbimi — dhe ju rekomandojmë platformën dhe listimet më të përshtatshme." },
  { q: "Sa kohë zgjat procesi nga oferta deri në mbërritjen në Durrës?", a: "Koha ndryshon sipas platformës, terminalit të eksportit dhe orarit të anijes. Ju japim një afat të përafërt të konfirmuar pasi blerja të jetë finalizuar." },
];

function AnkandeAmerikane() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua ndihmë për të zgjedhur platformën e duhur të ankandit amerikan.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Oborr ankandi automjetesh në Amerikë" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Ankandet amerikane</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Copart, IAAI, Manheim apo ADESA — cila platformë ju përshtatet?
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Ne asistojmë klientët në blerjen e automjeteve nga këto platforma dhe ju ndihmojmë të zgjidhni atë që i shkon më mirë nevojave tuaja.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-auctions-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Kontakto në WhatsApp
              </a>
              <Link
                to="/al/inspektim-makinash"
                onClick={() => trackEvent("inspection_requested", { source: "al-auctions-hero" })}
                className="btn-outline-light"
              >
                <ShieldCheck className="h-4 w-4" /> Shërbimi i inspektimit
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Krahasimi i platformave</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Cila platformë për cilën nevojë</h2>
          </div>
          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse overflow-hidden rounded-2xl border border-border text-left text-sm">
              <thead>
                <tr className="bg-mist">
                  <th className="p-4 font-display font-bold text-navy">Platforma</th>
                  <th className="p-4 font-display font-bold text-navy">Inventari tipik</th>
                  <th className="p-4 font-display font-bold text-navy">Kujt i përshtatet</th>
                </tr>
              </thead>
              <tbody>
                {PLATFORMS_AL.map((p) => (
                  <tr key={p.name} className="border-t border-border">
                    <td className="p-4 font-display font-bold text-navy">{p.name}</td>
                    <td className="p-4 text-slate-body">{p.inventory}</td>
                    <td className="p-4 text-slate-body">{p.suits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Si funksionon</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Nga zgjedhja e platformës te dera juaj</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW_AL.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-teal/10 text-teal">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="font-display mt-3 text-xs font-bold uppercase tracking-wider text-teal">Hapi {s.n}</div>
                <h3 className="font-display mt-1 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Pyetje</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Pyetje të shpeshta</h2>
          </div>
          <div className="mx-auto mt-10 max-w-2xl divide-y divide-border rounded-2xl border border-border bg-card">
            {FAQS_AL.map((f) => (
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

      <section className="section-mist">
        <div className="container-page py-16 text-center md:py-20">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/al/inspektim-makinash" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Shërbimi i inspektimit
            </Link>
            <a
              href="/al/kalkulator-transporti"
              onClick={() => trackEvent("calculator_started", { source: "al-auctions-crosslink" })}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
            >
              <Calculator className="mr-1.5 inline h-3.5 w-3.5" /> Kalkulatori i transportit
            </a>
            <Link to="/al/kontakt" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Na kontaktoni
            </Link>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Na tregoni çfarë kërkoni
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Përshkruani automjetin ose ndani një lot specifik — ju rekomandojmë platformën dhe hapat e mëtejshëm.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-auctions" />
        </div>
      </section>
    </>
  );
}
