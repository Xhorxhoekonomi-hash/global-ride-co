import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, Battery, Fuel, Landmark, MessageCircle, Calculator } from "lucide-react";
import heroImg from "@/assets/hero-services.jpg";
import { buildHead, SITE_URL } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";
import { CONTACT } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";

export const Route = createFileRoute("/al/transport-roro")({
  head: () => {
    const base = buildHead({
      title: "Transport RoRo Automjetesh | Alpha Worldwide",
      description: "Si funksionon transporti RoRo (Roll-on/Roll-off) për automjete, kur është opsion i mirë krahasuar me kontenierin, dhe çfarë kërkohet për automjetin tuaj.",
      path: "/al/transport-roro",
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
            name: "Transport Automjetesh RoRo",
            description: "Transport detar RoRo (Roll-on/Roll-off) për automjete, i disponueshëm operacionalisht sipas rrugës dhe llojit të automjetit.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: "Albania",
            url: `${SITE_URL}/al/transport-roro`,
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
  component: TransportRoRo,
});

const REQUIREMENTS_AL = [
  { icon: Fuel, title: "Niveli i karburantit", body: "Automjeti duhet zakonisht të ketë nivel të ulët karburanti për transportin RoRo, sipas kërkesave të anijes." },
  { icon: Battery, title: "Bateria", body: "Bateria duhet të jetë e lidhur dhe funksionale, pasi automjeti ngaset drejtpërdrejt në anije." },
  { icon: Truck, title: "Gjendja funksionale", body: "Automjeti duhet të jetë në gjendje të ngiset vetë në rampën e anijes — automjetet jofunksionale zakonisht nuk pranohen për RoRo." },
];

const FAQS_AL = [
  { q: "Çfarë është transporti RoRo?", a: "RoRo (Roll-on/Roll-off) është një metodë transporti detar ku automjeti ngaset drejtpërdrejt në anije dhe zbret vetë në destinacion, pa u vendosur në kontenier." },
  { q: "A është RoRo më i lirë se kontenieri?", a: "Në shumë raste RoRo mund të jetë më ekonomik, por disponueshmëria varet nga rruga dhe operacionalisht nuk është gjithmonë e mundur — ju konfirmojmë opsionet reale për automjetin tuaj." },
  { q: "Çfarë kërkohet nga automjeti për transport RoRo?", a: "Automjeti duhet të jetë funksional dhe të ngiset vetë, me nivel karburanti të ulët dhe baterinë funksionale, sipas kërkesave të anijes dhe terminalit." },
  { q: "A mbrohet automjeti nga elementet gjatë transportit RoRo?", a: "Automjeti qëndron i ekspozuar ndaj elementeve gjatë tranzitit detar, ndryshe nga transporti me kontenier që ofron mbrojtje të plotë. Për automjete me vlerë të lartë, kontenieri mund të jetë opsioni më i përshtatshëm." },
  { q: "Kur preferohet kontenieri në vend të RoRo-s?", a: "Kontenieri preferohet për automjete me vlerë të lartë, automjete të modifikuara, ose kur RoRo nuk është operacionalisht i disponueshëm për rrugën tuaj specifike." },
  { q: "Si trajtohet automjeti në terminal para ngarkimit?", a: "Automjeti kalon nëpër procedura terminali — regjistrim, kontroll gjendjeje dhe përgatitje — përpara se të ngiset në anije për transportin RoRo." },
];

function TransportRoRo() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(
    "Përshëndetje Alpha Worldwide, dua informacion për transportin RoRo të automjetit tim.",
  )}`;

  return (
    <>
      <section className="relative isolate overflow-hidden text-white">
        <img src={heroImg} alt="Anije RoRo në terminal portual" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-navy/95 via-navy/85 to-graphite/90" />
        <div className="container-page flex min-h-[60vh] flex-col justify-end py-32">
          <div className="max-w-3xl animate-fade-up">
            <div className="eyebrow text-teal-glow">Transport RoRo</div>
            <h1 className="font-display mt-4 text-4xl font-bold leading-[1.05] md:text-6xl">
              Automjeti ngaset vetë — pa kontenier, pa ndërlikime
            </h1>
            <p className="mt-5 max-w-2xl text-lg text-white/75">
              RoRo është shpesh një opsion ekonomik për automjete standarde, kur është operacionalisht i disponueshëm për rrugën tuaj.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => trackEvent("whatsapp_clicked", { source: "al-roro-hero" })}
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
          <div className="mx-auto max-w-3xl text-center">
            <Landmark className="mx-auto h-8 w-8 text-teal" />
            <h2 className="font-display mt-4 text-3xl font-bold text-navy md:text-4xl">Si funksionon RoRo</h2>
            <p className="mt-4 text-slate-body">
              Automjeti ngaset drejtpërdrejt në anije nëpërmjet një rampe dhe zbret vetë në portin e destinacionit, pa u vendosur në kontenier. Kjo e bën procesin e ngarkimit dhe shkarkimit më të shpejtë krahasuar me transportin me kontenier.
            </p>
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Kërkesat për automjetin</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Çfarë duhet të plotësojë automjeti</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {REQUIREMENTS_AL.map((r) => (
              <div key={r.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-body">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Kur RoRo është zgjedhja e mirë</h2>
              <p className="mt-4 text-slate-body">
                Për automjete standarde, funksionale, dhe kur rruga e transportit e ofron këtë opsion, RoRo mund të jetë më i shpejtë dhe ekonomik se kontenieri.
              </p>
            </div>
            <div>
              <h2 className="font-display text-3xl font-bold text-navy md:text-4xl">Kur kontenieri është më i përshtatshëm</h2>
              <p className="mt-4 text-slate-body">
                Për automjete me vlerë të lartë, automjete të modifikuara, ose kur mbrojtja e plotë nga elementet është prioritet, transporti me kontenier është opsioni më i sigurt.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-mist">
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

      <section className="bg-background">
        <div className="container-page py-16 text-center md:py-20">
          <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3">
            <Link to="/al/transport-me-kontenier" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Transporti me kontenier
            </Link>
            <Link to="/al/transport-ajror-makinash" className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal">
              Transporti ajror
            </Link>
            <a
              href="/al/kalkulator-transporti"
              onClick={() => trackEvent("calculator_started", { source: "al-roro-crosslink" })}
              className="rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-navy transition-colors hover:border-teal hover:text-teal"
            >
              <Calculator className="mr-1.5 inline h-3.5 w-3.5" /> Kalkulatori i transportit
            </a>
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">
              Kontrolloni nëse RoRo është opsion për ju
            </h2>
            <p className="mt-5 max-w-md text-white/70">
              Na tregoni automjetin dhe rrugën — ju konfirmojmë nëse RoRo është operacionalisht i disponueshëm.
            </p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" source="al-roro" />
        </div>
      </section>
    </>
  );
}
