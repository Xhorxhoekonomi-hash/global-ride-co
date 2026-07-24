import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, ShieldCheck, Ship, Plane, MessageCircle, MapPin } from "lucide-react";
import heroImg from "@/assets/hero-uae.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT, OFFICES } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/makina-nga-dubai")({
  head: () => {
    const base = buildHead({
      title: "Makina nga Dubai për Shqipëri | Import Automjetesh nga Emiratet",
      description: "Import automjetesh nga Dubai dhe Emiratet e Bashkuara Arabe — makina luksoze, supercars dhe SUV, me inspektim, dokumentacion dhe transport drejt Shqipërisë.",
      path: "/al/makina-nga-dubai",
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
            name: "Sigurimi dhe Transporti i Automjeteve nga Dubai",
            description: "Ndihmë për blerjen e automjeteve nga dealerë dhe shitës privatë në Dubai dhe Emiratet e Bashkuara Arabe, me eksport, dokumentacion dhe transport drejt Shqipërisë.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/makina-nga-dubai`,
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
  component: MakinaNgaDubai,
});

const INVENTORY_AL = [
  { title: "Makina luksoze", body: "Dubai njihet për një treg të gjerë automjetesh luksoze me kilometrazh të ulët dhe mirëmbajtje të kujdesshme." },
  { title: "Supercars", body: "Modele sportive dhe supercars, shpesh të disponueshme te dealerë të specializuar ose te shitës privatë." },
  { title: "SUV dhe automjete familjare", body: "Përveç segmentit luksoz, tregu i Dubait ka gjithashtu SUV dhe automjete standarde me çmime konkurruese." },
];

const WORKFLOW_AL = [
  { n: 1, title: "Zgjedhja e automjetit", body: "Na dërgoni një shpallje nga një dealer ose shitës privat në Dubai, ose na tregoni çfarë kërkoni." },
  { n: 2, title: "Verifikimi i shitësit", body: "Kontrollojmë besueshmërinë e dealerit ose shitësit privat përpara se të vazhdojmë." },
  { n: 3, title: "Mundësia e inspektimit", body: "Kontrollojmë nëse inspektimi është i mundur — kjo varet nga aksesi që na jep shitësi te automjeti." },
  { n: 4, title: "Blerja dhe eksporti", body: "Kryejmë blerjen dhe koordinojmë dokumentacionin e eksportit nga Emiratet e Bashkuara Arabe." },
  { n: 5, title: "Zgjedhja e transportit", body: "Rekomandojmë kontenier, RoRo (kur është operacionalisht i disponueshëm), ose transport ajror për automjete të përzgjedhura." },
  { n: 6, title: "Mbërritja në Shqipëri", body: "Koordinojmë dokumentacionin doganor dhe dorëzimin te ju." },
];

const FAQS_AL = [
  { q: "A janë të gjitha makinat nga Dubai luksoze?", a: "Jo. Ndonëse Dubai njihet për tregun e makinave luksoze dhe supercars, ka gjithashtu SUV dhe automjete standarde me çmime konkurruese nga dealerë dhe shitës privatë." },
  { q: "A mund të inspektohet çdo automjet nga Dubai?", a: "Jo automatikisht. Mundësia e inspektimit varet nga aksesi që na jep shitësi te automjeti. Ju konfirmojmë disponueshmërinë për automjetin specifik përpara blerjes." },
  { q: "Si transportohen automjetet nga Dubai në Shqipëri?", a: "Zakonisht me kontenier. Në disa raste RoRo mund të jetë i disponueshëm, dhe për automjete të përzgjedhura me vlerë të lartë ose urgjencë kohore, ofrojmë transport ajror." },
  { q: "Çfarë dokumentesh nevojiten për eksport nga Emiratet?", a: "Zakonisht kërkohen dokumentacioni i pronësisë, çregjistrimi dhe certifikata e eksportit — ju udhëzojmë hap pas hapi sipas kërkesave aktuale." },
  { q: "Pse të zgjedh zyrën tuaj në Dubai?", a: "Prania jonë në Dubai mundëson koordinim lokal të sigurimit, komunikim direkt me shitësit dhe dealerët, dhe përgatitje eksporti pa vonesa nga distanca." },
  { q: "Sa kohë zgjat transporti nga Dubai në Shqipëri?", a: "Koha varet nga metoda e transportit dhe orari i anijes ose fluturimit. Ju japim një afat të përafërt të konfirmuar përpara rezervimit." },
];

function MakinaNgaDubai() {
  const dubai = OFFICES[0];
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua të blej dhe transportoj një makinë nga Dubai.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Automjet luksoz në Dubai" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Import nga Dubai</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Makina nga Dubai, drejt Shqipërisë
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              Nga makina luksoze dhe supercars te SUV standarde — ju ndihmojmë të blini nga dealerë dhe shitës privatë në Dubai dhe të transportoni automjetin në mënyrë të sigurt.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-dubai-hero" })}
                className="btn-primary"
              >
                <MessageCircle className="h-4 w-4" /> Kontakto në WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Tregu i automjeteve në Dubai</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Më shumë se vetëm luks</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {INVENTORY_AL.map((i) => (
              <div key={i.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <Gem className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{i.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <MapPin className="mx-auto h-8 w-8 text-teal" />
            <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Prania jonë në {dubai.city}</h2>
            <p className="mt-4 text-slate-body">
              Selia jonë qendrore ndodhet në {dubai.city}, çka mundëson koordinim lokal të sigurimit, komunikim direkt me dealerët dhe shitësit, dhe përgatitje eksporti pa vonesa.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Si funksionon</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Nga Dubai deri te dera juaj</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {WORKFLOW_AL.map((s) => (
              <div key={s.n} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="font-display text-4xl font-bold text-teal">{String(s.n).padStart(2, "0")}</div>
                <h3 className="font-display mt-3 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Opsionet e transportit</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Kontenier, RoRo, ose ajror</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <Link to="/al/transport-me-kontenier" className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
              <Ship className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-3 text-lg font-bold text-navy">Transport me kontenier</h3>
              <p className="mt-2 text-sm text-slate-body">Zgjedhja standarde për mbrojtje të plotë të automjetit.</p>
            </Link>
            <Link to="/al/transport-roro" className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
              <ShieldCheck className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-3 text-lg font-bold text-navy">RoRo</h3>
              <p className="mt-2 text-sm text-slate-body">I disponueshëm operacionalisht sipas rrugës dhe automjetit.</p>
            </Link>
            <Link to="/al/transport-ajror-makinash" className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:border-teal">
              <Plane className="h-6 w-6 text-teal" />
              <h3 className="font-display mt-3 text-lg font-bold text-navy">Transport ajror</h3>
              <p className="mt-2 text-sm text-slate-body">Për automjete të përzgjedhura me vlerë të lartë ose urgjencë.</p>
            </Link>
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

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Dërgoni një shpallje nga Dubai
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Na tregoni automjetin që keni gjetur — do ju konfirmojmë mundësinë e inspektimit dhe opsionet e transportit.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-dubai" />
        </div>
      </section>
    </>
  );
}
