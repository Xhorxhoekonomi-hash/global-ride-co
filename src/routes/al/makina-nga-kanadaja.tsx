import { JourneySteps } from "@/components/site/JourneySteps";
import { PageHero } from "@/components/site/PageHero";
import { LAMBORGHINI_IN_CONTAINER } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { buildHead } from "@/lib/seo";
import { QuoteForm } from "@/components/site/QuoteForm";

export const Route = createFileRoute("/al/makina-nga-kanadaja")({
  head: () => buildHead({
    title: "Importo makinë nga Kanadaja | Alpha Worldwide",
    description: "Gjetje, inspektim para blerjes dhe transport nga ankandet dhe tregtarët kanadezë drejt Durrësit dhe Evropës.",
    path: "/al/makina-nga-kanadaja",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/import-canada" }, { lang: "sq", path: "/al/makina-nga-kanadaja" }],
    xDefault: "/import-canada",
  }),
  component: MakinaNgaKanadaja,
});

const STEPS = [
  { n: 1, title: "Gjeni automjetin", body: "Zgjidhni një makinë nga një ankand, tregtar ose shpallje private në Kanada, ose na kërkoni ta gjejmë ne." },
  { n: 2, title: "Na dërgoni linkun", body: "Ndani shpalljen ose numrin e lotit. Konfirmojmë fizibilitetin dhe ju japim një përllogaritje gjithëpërfshirëse." },
  { n: 3, title: "Inspektimi", body: "Foto, video, skanim OBD dhe raport i plotë i gjendjes para se të vendosni për blerjen." },
  { n: 4, title: "Blerja", body: "Kujdesemi për blerjen ose ofertën në ankand në mënyrë të sigurt në emrin tuaj." },
  { n: 5, title: "Eksporti dhe transporti detar", body: "Transport tokësor deri në portin më të afërt të eksportit, pastaj transport me kontenier ose RoRo përtej Atlantikut." },
  { n: 6, title: "Koordinimi doganor dhe dorëzimi", body: "Koordinim i plotë doganor në Durrës dhe dorëzim përfundimtar kudo në Shqipëri ose Evropë." },
];

function MakinaNgaKanadaja() {
  return (
    <>
      <PageHero scene={LAMBORGHINI_IN_CONTAINER.sq} breadcrumbs={[{ label: "Shërbimet", to: "/al/sherbimet" }, { label: "Import nga Kanadaja" }]} eyebrow="Import nga · Kanadaja" title="Gjetje dhe transport automjetesh nga Kanadaja drejt Shqipërisë dhe Evropës" description="Gjejmë, inspektojmë, blejmë dhe transportojmë automjete nga ankandet dhe tregtarët në të gjithë Kanadanë — me menaxhim të plotë deri te dera juaj në Shqipëri ose Evropë.">
        <Button asChild><Link to="/al/kontakt">Merr një ofertë</Link></Button>
        <Button asChild variant="outline"><Link to="/al/kalkulator-transporti">Llogarit transportin</Link></Button>
      </PageHero>
      <section className="bg-background">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Proces me 6 hapa</div>
            <h2 className="mt-3 text-navy">Nga Kanadaja deri te shtëpia juaj</h2>
          </div>
          <JourneySteps steps={STEPS} />
        </div>
      </section>
      <section className="section-dark">
        <div className="container-page grid gap-12 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="eyebrow text-teal-glow">Filloni sot</div>
            <h2 className="mt-3 text-white">Na dërgoni linkun e një automjeti nga Kanadaja</h2>
            <p className="mt-5 max-w-md text-white/70">Ndani linkun e shpalljes ose numrin e lotit — ne kujdesemi për inspektimin, blerjen, eksportin dhe transportin deri në destinacionin tuaj.</p>
          </div>
          <QuoteForm variant="full" onDark locale="sq" />
        </div>
      </section>
    </>
  );
}
