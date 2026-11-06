import { PageHero } from "@/components/site/PageHero";
import { BROWN_PORSCHE_YARD } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Globe2, ShieldCheck, Gavel, Package, Plane, Users, Eye, MessageCircle, Calculator, MapPin } from "lucide-react";
import { buildHead, SITE_URL } from "@/lib/seo";
import { CONTACT, OFFICES } from "@/lib/site-data";
import { trackEvent } from "@/lib/analytics";
import { KeywordText } from "@/components/site/KeywordText";

export const Route = createFileRoute("/al/pse-alpha-worldwide")({
  head: () => {
    const base = buildHead({
      title: "Pse Alpha Worldwide | Transport ndërkombëtar automjetesh",
      description: "Mbi 10 vjet duke gjetur, inspektuar dhe transportuar automjete në mbarë botën — seli në Dubai, operacione në Durrës dhe një proces transparent i bazuar në përvojë të verifikuar, jo në pretendime të ekzagjeruara.",
      path: "/al/pse-alpha-worldwide",
      lang: "sq",
      hreflang: [{ lang: "en", path: "/why-alpha-worldwide" }, { lang: "sq", path: "/al/pse-alpha-worldwide" }],
      xDefault: "/why-alpha-worldwide",
    });
    return {
      ...base,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Gjetje, inspektim dhe transport ndërkombëtar automjetesh",
            description: "Gjetje automjetesh, akses në ankande, koordinim inspektimi, transport me kontenier/RoRo/ajror dhe koordinim i dokumenteve doganore, nga Dubai dhe Durrësi.",
            provider: { "@type": "Organization", name: "Alpha Worldwide", url: SITE_URL },
            areaServed: ["Albania", "Netherlands", "Germany", "Italy"],
            url: `${SITE_URL}/al/pse-alpha-worldwide`,
            inLanguage: "sq",
          }),
        },
      ],
    };
  },
  component: PseAlpha,
});

const SECTIONS = [
  { icon: Users, title: "Kush jemi", body: "Alpha Worldwide është një kompani ndërkombëtare për gjetje, inspektim dhe logjistikë automjetesh. U ndihmojmë klientëve të blejnë automjete nga ankandet dhe tregtarë të përzgjedhur jashtë vendit dhe menaxhojmë të gjithë procesin deri te dorëzimi — pa pasur nevojë për llogari, adresë apo marrëdhënie bankare në vendin e origjinës.", cta: { label: "Merr një ofertë në WhatsApp", to: "whatsapp" } },
  { icon: Globe2, title: "Operacione globale", body: "Operacionet tona përfshijnë gjetjen e automjeteve në SHBA, Kore të Jugut, EBA, Kanada dhe Evropë, me transport të koordinuar me kontenier, RoRo dhe ajror drejt Shqipërisë dhe në të gjithë Evropën Perëndimore.", cta: { label: "Shihni si funksionon", to: "/al/si-funksionon" } },
  { icon: MapPin, title: "Selia në Dubai", body: "Selia jonë në Dubai mundëson koordinim vendas të gjetjes në tregun e EBA-së, komunikim direkt me shitësit dhe tregtarët, si dhe përgatitjen e eksportit pa vonesat e punës në distancë.", cta: { label: "Operacionet në Dubai", to: "/al/vendndodhjet/dubai" } },
  { icon: MapPin, title: "Operacionet në Durrës", body: "Operacionet tona në Evropë dhe Shqipëri janë në Durrës, pranë portit kryesor të vendit — ku koordinojmë trajtimin në port, dokumentet doganore dhe dorëzimin përfundimtar.", cta: { label: "Operacionet në Durrës", to: "/al/vendndodhjet/durres" } },
  { icon: Gavel, title: "Ekspertizë në ankande", body: "I asistojmë klientët në blerjen e automjeteve përmes Copart, IAAI, Manheim, ADESA, Encar, Autowini, KB Chachacha dhe tregtarëve të përzgjedhur — pa pretenduar partneritet zyrtar me asnjërën prej këtyre platformave.", cta: { label: "Krahasoni platformat e ankandeve", to: "/al/ankande-amerikane" } },
  { icon: Eye, title: "Procesi i inspektimit", body: "Kur është e mundur operacionalisht, koordinojmë inspektimin para blerjes me foto, video dhe kontrolle teknike. Mundësia e inspektimit varet nga shitësi, ankandi dhe aksesi te automjeti — nuk garantohet kurrë për çdo shpallje.", cta: { label: "Shihni çfarë përfshin inspektimi", to: "/al/inspektim-makinash" } },
  { icon: Package, title: "Logjistikë me kontenier", body: "Organizojmë transport me kontenier të përbashkët ose të dedikuar, me automjetet të siguruara sipas praktikave standarde të ngarkimit për të gjithë udhëtimin detar.", cta: { label: "Detaje për transportin me kontenier", to: "/al/transport-me-kontenier" } },
  { icon: Plane, title: "Kapacitet për transport ajror", body: "Për automjete urgjente ose me vlerë jashtëzakonisht të lartë, koordinojmë transport ajror përmes një rrjeti të verifikuar aeroportesh evropiane të mallrave, përfshirë Amsterdam Schiphol, Milano Malpensa dhe Leipzig/Halle.", cta: { label: "Opsionet e transportit ajror", to: "/al/transport-ajror-makinash" } },
  { icon: ShieldCheck, title: "Transparencë", body: "Japim përllogaritje reale dhe të detajuara të kostove, jo premtime të paqarta — detyrimet doganore dhe taksat në destinacion tregohen gjithmonë veçmas nga tarifa jonë e shërbimit, dhe nuk e paraqesim kurrë një përllogaritje si çmim përfundimtar të garantuar.", cta: { label: "Provoni kalkulatorin e transportit", to: "/al/kalkulator-transporti" } },
];

function PseAlpha() {
  const whatsappUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Përshëndetje Alpha Worldwide, dua të mësoj më shumë për procesin tuaj para se të kërkoj një ofertë.")}`;
  const dubai = OFFICES[0];
  const durres = OFFICES[1];
  return (
    <>
      <PageHero scene={BROWN_PORSCHE_YARD.sq} breadcrumbs={[{ label: "Pse Alpha Worldwide" }]} eyebrow="Pse Alpha Worldwide" title="Mbi 10 vjet duke gjetur dhe transportuar automjete në mbarë botën" description={<>Mbi 15,000 automjete të blera dhe të transportuara — nga lotet e ankandeve dhe shpalljet e tregtarëve deri te automjeti i dorëzuar te dera juaj, të koordinuara nga {dubai.city} dhe {durres.city}.</>}>
        <Button asChild><Link to="/al/kontakt">Merr një ofertë</Link></Button>
        <Button asChild variant="outline"><a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "why-alpha-worldwide-hero" })}>Na shkruani në WhatsApp</a></Button>
      </PageHero>

      {SECTIONS.map((s, i) => (
        <section key={s.title} className={i % 2 === 0 ? "bg-background" : "section-mist"}>
          <div className="container-page py-16 md:py-20">
            <div className="grid gap-8 md:grid-cols-[auto_1fr] md:items-start">
              <div className="grid h-12 w-12 place-items-center rounded-lg bg-teal/10 text-teal"><s.icon className="h-6 w-6" /></div>
              <div>
                <h2 className="text-navy">{s.title}</h2>
                <p className="mt-3 max-w-2xl text-slate-body"><KeywordText text={s.body} sq /></p>
                {s.cta.to === "whatsapp" ? (
                  <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: `why-section-${s.title}` })} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline">{s.cta.label} →</a>
                ) : (
                  <Link to={s.cta.to} onClick={() => trackEvent("quote_started", { source: `why-section-${s.title}` })} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-teal hover:underline">{s.cta.label} →</Link>
                )}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="section-dark">
        <div className="container-page py-20 text-center md:py-24">
          <div className="eyebrow text-teal-glow">Pse na zgjedhin klientët</div>
          <h2 className="mx-auto mt-3 max-w-2xl text-white">Një pikë kontakti, nga ankandi deri te shtëpia juaj</h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">Në vend që të koordinoheni veçmas me një ndërmjetës ankandi, një inspektor, një spedicion dhe një agjent doganor, punoni me një ekip të vetëm gjatë gjithë procesit — me përllogaritje reale kostosh, jo premtime të paqarta.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <a href={whatsappUrl} target="_blank" rel="noreferrer noopener" onClick={() => trackEvent("whatsapp_clicked", { source: "why-final-cta" })} className="btn-primary"><MessageCircle className="h-4 w-4" /> Filloni një bisedë</a>
            <Link to="/al/kalkulator-transporti" onClick={() => trackEvent("calculator_started", { source: "why-final-cta" })} className="btn-outline-light"><Calculator className="h-4 w-4" /> Llogarit koston e transportit</Link>
          </div>
        </div>
      </section>
    </>
  );
}
