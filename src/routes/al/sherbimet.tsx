import { PageHero } from "@/components/site/PageHero";
import { LAMBORGHINI_HANDOVER } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { HowItWorks } from "@/components/site/HowItWorks";
import { QuoteForm } from "@/components/site/QuoteForm";
import { PlatformBadges } from "@/components/site/PlatformBadges";
import { SERVICES, localPath } from "@/lib/site-data";

const SERVICE_COPY_SQ: Record<string, { title: string; body: string }> = {
  sourcing: { title: "Gjetja e automjetit", body: "Gjejmë automjetin e saktë që kërkoni në ankande, te tregtarë dhe në shpallje private në mbarë botën." },
  "auction-access": { title: "Akses në ankande", body: "Akses i licencuar në Copart, IAAI, Manheim, Encar dhe platforma të tjera kryesore — ne bëjmë ofertën në emrin tuaj." },
  "dealer-purchasing": { title: "Asistencë për blerje nga tregtarët", body: "Negociim direkt me tregtarët për çmimin, kushtet dhe dokumentet." },
  inspection: { title: "Inspektim para blerjes", body: "Inspektim me 155 pika me foto, video, skanim OBD dhe matje të bojës para se të blini." },
  "inland-transport": { title: "Transport tokësor", body: "Marrje dhe dorëzim i siguruar deri në portin më të afërt të eksportit në vendin e origjinës." },
  "container-shipping": { title: "Transport me kontenier", body: "Transport detar plotësisht i mbyllur për automjete me vlerë të lartë ose të modifikuara." },
  "roro-shipping": { title: "Transport RoRo", body: "Transport detar roll-on/roll-off — rruga ekonomike për automjetet standarde." },
  airfreight: { title: "Transport ajror i automjeteve", body: "Transport ajror premium për dërgesa urgjente ose me vlerë jashtëzakonisht të lartë." },
  "airport-handling": { title: "Trajtimi në aeroportet evropiane", body: "Koordinim i mbërritjes, trajtim në terminalin e mallrave dhe lirim në aeroportet kryesore evropiane të mallrave." },
  customs: { title: "Koordinim doganor", body: "Koordinojmë dokumentet dhe procedurat doganore me agjentë vendas të licencuar në pikën e hyrjes." },
  transit: { title: "Mbështetje për tranzit T1", body: "Koordinim i dokumenteve të tranzitit për automjetet që lëvizin nën regjim doganor mes pikave doganore të BE-së." },
  carnet: { title: "Trajtimi i Carnet de Passage", body: "Mbështetje koordinimi për pranimin e përkohshëm të automjetit me Carnet de Passage." },
  "port-handling": { title: "Trajtimi në port", body: "Shkarkim, koordinim në terminal dhe lirim në Durrës dhe në portet kryesore evropiane." },
  "final-mile": { title: "Dorëzimi deri në adresë", body: "Dorëzim nga porti ose aeroporti deri në adresën tuaj të saktë, kudo në Shqipëri ose Evropë." },
};

const FAQS = [
  { q: "Sa zgjat transporti?", a: "Si orientim i përgjithshëm, rrugët SHBA–Durrës zgjasin zakonisht disa javë me kontenier dhe pak më shumë me RoRo; rrugët nga Koreja dhe EBA janë përafërsisht të ngjashme. Këto janë përllogaritje, jo garanci — e konfirmojmë kohën e saktë pasi të rezervohen porti i nisjes dhe anija." },
  { q: "Çfarë përfshin inspektimi para blerjes?", a: "Verifikimin e titullit, kontrollin e VIN-it, historikun e aksidenteve dhe të servisit, vlerësimin mekanik, gjendjen e gomave dhe të brendshmes, si dhe një raport me foto/video para se të angazhohemi për blerjen." },
  { q: "Si llogariten kostot totale?", a: "Çmimi i automjetit + inspektimi + transporti tokësor + transporti ndërkombëtar + sigurimi + detyrimet doganore + tarifa jonë e shërbimit. Ju japim që në fillim një ofertë plotësisht të detajuar — pa surpriza." },
  { q: "A përfshihet koordinimi doganor në tarifën e shërbimit?", a: "Koordinimi doganor me agjentë vendas të licencuar është pjesë e shërbimit tonë të plotë. Detyrimet doganore, taksat dhe tarifat e vetë autoritetit doganor janë të ndara nga tarifa jonë e shërbimit dhe janë përgjegjësi e klientit." },
];

export const Route = createFileRoute("/al/sherbimet")({
  head: () => {
    const base = buildHead({
      title: "Shërbime importi automjetesh | Alpha Worldwide",
      description: "Akses në ankande, inspektim para blerjes, transport me kontenier dhe RoRo, transport ajror dhe koordinim doganor — shërbim i plotë për importin e automjetit.",
      path: "/al/sherbimet",
      lang: "sq",
      hreflang: [{ lang: "en", path: "/services" }, { lang: "sq", path: "/al/sherbimet" }],
      xDefault: "/services",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Shërbime importi automjetesh",
            description: "Gjetje automjetesh, akses në ankande, inspektim para blerjes, transport me kontenier dhe RoRo, transport ajror dhe koordinim doganor.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Albania", "Kosovo", "Italy", "Germany", "Belgium", "Netherlands", "France"],
            url: `${SITE_URL}/al/sherbimet`,
            inLanguage: "sq",
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage: "sq",
            mainEntity: FAQS.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        },
      ],
    };
  },
  component: Sherbimet,
});

function Sherbimet() {
  return (
    <>
      <PageHero scene={LAMBORGHINI_HANDOVER.sq} breadcrumbs={[{ label: "Shërbimet" }]} eyebrow="Shërbimet" title="Shërbime të plota për gjetjen, inspektimin dhe transportin e automjetit" description="Merrni një vendim blerjeje me siguri dhe informacion të plotë — ne kujdesemi për të gjithë procesin me efikasitet dhe profesionalizëm.">
        <Button asChild><Link to="/al/kontakt">Merr një ofertë</Link></Button>
        <Button asChild variant="outline"><Link to="/al/kalkulator-transporti">Llogarit transportin</Link></Button>
      </PageHero>

      <PlatformBadges locale="sq" />

      <section className="bg-background">
        <div className="container-page py-14 md:py-18">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const copy = SERVICE_COPY_SQ[s.slug] ?? { title: s.title, body: s.body };
              return (
                <Link key={s.slug} to={localPath(s.to, true)} className="group border-t border-border py-8 pr-6 transition-colors hover:border-primary">
                  <h3 className="text-secondary">{copy.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{copy.body}</p>
                  <div className="mt-4 flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors">
                    {s.hasDedicatedPage ? "Mëso më shumë" : "Na pyesni"} <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-14 md:py-18">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Import sipas tregut</div>
            <h2 className="mt-3 text-secondary">Tregjet tona kryesore të origjinës</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { to: "/al/makina-nga-amerika", name: "SHBA", body: "Copart, IAAI, Manheim dhe rrjeti i tregtarëve — oferta në ankand, transport brenda SHBA-së, transport me kontenier/RoRo drejt Evropës." },
              { to: "/al/makina-nga-korea", name: "Koreja e Jugut", body: "Gjetje përmes Encar dhe Autowini, inspektim vendas, eksport nga Busan/Incheon, dorëzim në Durrës ose në portet e BE-së." },
              { to: "/al/makina-nga-dubai", name: "EBA", body: "Gjetje përmes Dubizzle, Emirates Auction dhe tregtarëve, zhdoganim eksporti RTA, transport direkt drejt Evropës." },
            ].map((m) => (
              <Link key={m.name} to={m.to} className="border-t border-border py-8 pr-6 transition-colors hover:border-primary">
                <div className="eyebrow">Import nga</div>
                <h3 className="mt-2 text-secondary">{m.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                <div className="mt-4 text-sm font-semibold text-primary">Mëso më shumë →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <HowItWorks variant="light" locale="sq" />

      <section className="bg-background">
        <div className="container-page grid gap-12 py-14 md:py-18 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow">Filloni importin sot</div>
            <h2 className="mt-3 text-secondary">Një ofertë. Çdo hap i mbuluar.</h2>
            <p className="mt-5 text-muted-foreground">Na dërgoni linkun e automjetit, numrin e lotit ose shpalljen e tregtarit — do t'ju kthejmë një ofertë të plotë e të detajuar dhe kohën e parashikuar për importin.</p>
            <div className="mt-10">
              <h3 className="text-secondary">Pyetje të shpeshta</h3>
              <div className="mt-5 divide-y divide-border rounded-lg border border-border bg-card">
                {FAQS.map((f) => (
                  <details key={f.q} className="group p-5">
                    <summary className="min-h-11 flex cursor-pointer items-center justify-between gap-4 text-sm font-semibold text-secondary">
                      {f.q}
                      <span className="text-primary transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
          <QuoteForm variant="full" locale="sq" />
        </div>
      </section>
    </>
  );
}
