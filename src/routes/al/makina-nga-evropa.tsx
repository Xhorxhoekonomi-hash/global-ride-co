import { JourneySteps } from "@/components/site/JourneySteps";
import { PageHero } from "@/components/site/PageHero";
import { FERRARI_CAR_CARRIER } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/al/makina-nga-evropa")({
  head: () => buildHead({
    title: "Importo makinë nga Evropa në Shqipëri | Alpha Worldwide",
    description: "Transport ndërkufitar automjetesh nga AutoScout24 dhe tregtarët evropianë drejt Shqipërisë — gjetje, koordinim i blerjes dhe dorëzim.",
    path: "/al/makina-nga-evropa",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/import-europe" }, { lang: "sq", path: "/al/makina-nga-evropa" }],
    xDefault: "/import-europe",
  }),
  component: MakinaNgaEvropa,
});

const STEPS = [
  { n: 1, title: "Gjeni automjetin", body: "Shfletoni AutoScout24, një tregtar evropian ose një shpallje private kudo në kontinent." },
  { n: 2, title: "Na dërgoni linkun", body: "Ndani shpalljen. Konfirmojmë automjetin dhe ju japim një përllogaritje gjithëpërfshirëse të transportit." },
  { n: 3, title: "Inspektimi", body: "Inspektim i pavarur opsional para blerjes, kudo që të ndodhet automjeti." },
  { n: 4, title: "Koordinimi i blerjes", body: "Koordinojmë blerjen dhe dokumentet drejtpërdrejt me shitësin ose tregtarin." },
  { n: 5, title: "Transport ndërkufitar", body: "Transport rrugor ose detar RoRo, në varësi të vendit të origjinës dhe distancës." },
  { n: 6, title: "Dorëzimi", body: "Dorëzimi përfundimtar te dera juaj në Shqipëri, Kosovë ose diku tjetër në Evropë." },
];

function MakinaNgaEvropa() {
  return (
    <>
      <PageHero scene={FERRARI_CAR_CARRIER.sq} breadcrumbs={[{ label: "Shërbimet", to: "/al/sherbimet" }, { label: "Import nga Evropa" }]} eyebrow="Import nga · Evropa" title="Gjetje dhe transport ndërkufitar automjetesh në të gjithë Evropën" description="Keni gjetur një makinë në AutoScout24 ose te një tregtar evropian? Ne koordinojmë blerjen, transportin dhe dorëzimin në Shqipëri ose Kosovë.">
        <Button asChild><Link to="/al/kontakt">Merr një ofertë</Link></Button>
        <Button asChild variant="outline"><Link to="/al/kalkulator-transporti">Llogarit koston</Link></Button>
      </PageHero>
      <section className="bg-background">
        <div className="container-page section-y">
          <div className="max-w-2xl">
            <div className="eyebrow">Proces me 6 hapa</div>
            <h2 className="mt-3 text-navy">Nga kudo në Evropë deri te shtëpia juaj</h2>
          </div>
          <JourneySteps steps={STEPS} />
        </div>
      </section>
      <section className="section-dark">
        <div className="container-page grid gap-12 section-y lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="mt-3 text-white">Na dërgoni një shpallje evropiane</h2>
            <p className="mt-5 max-w-md text-white/70">Ndani linkun — ne koordinojmë blerjen, transportin dhe dorëzimin në Shqipëri ose Kosovë.</p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" />
        </div>
      </section>
    </>
  );
}
