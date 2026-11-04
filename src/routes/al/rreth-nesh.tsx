import { PageHero } from "@/components/site/PageHero";
import { BROWN_PORSCHE_YARD } from "@/lib/hero-scenes";
import { Button } from "@/components/ui/button";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Truck, ShoppingBag, Ship, ShieldCheck, FileText, Plane, Check, MapPin } from "lucide-react";
import { buildHead } from "@/lib/seo";
import { StatCounter } from "@/components/site/StatCounter";
import { OFFICES } from "@/lib/site-data";

export const Route = createFileRoute("/al/rreth-nesh")({
  head: () => buildHead({
    title: "Rreth Alpha Worldwide | Selia në Dubai, operacionet në Durrës",
    description: "Alpha Worldwide është një kompani ndërkombëtare logjistike automjetesh me seli në Dubai, EBA, dhe operacione evropiane në Durrës, Shqipëri. Mbi 10 vjet, mbi 15,000 automjete të transportuara.",
    path: "/al/rreth-nesh",
    lang: "sq",
    hreflang: [{ lang: "en", path: "/about" }, { lang: "sq", path: "/al/rreth-nesh" }],
    xDefault: "/about",
  }),
  component: RrethNesh,
});

const ROLE_SQ: Record<string, string> = { "Global Headquarters": "Selia qendrore", "European & Albanian Operations": "Operacionet në Evropë dhe Shqipëri" };
const COUNTRY_SQ: Record<string, string> = { "United Arab Emirates": "Emiratet e Bashkuara Arabe", Albania: "Shqipëri" };

const CAPABILITIES = [
  { icon: ShoppingBag, title: "Ndërmjetësim në ankande", body: "Akses i licencuar në Copart, IAAI, Manheim, Encar dhe platforma të tjera kryesore." },
  { icon: ShieldCheck, title: "Inspektim para blerjes", body: "Inspektim i pavarur me foto, video dhe raport të gjendjes mekanike." },
  { icon: Truck, title: "Transport tokësor", body: "Marrje dhe dorëzim i siguruar deri në portin më të afërt të eksportit në vendin e origjinës." },
  { icon: Ship, title: "Transport detar", body: "Transport me kontenier dhe RoRo në linjat e konsoliduara nga SHBA, Koreja, EBA dhe Kanadaja." },
  { icon: Plane, title: "Transport ajror automjetesh", body: "Transport ajror premium për dërgesa urgjente ose me vlerë jashtëzakonisht të lartë." },
  { icon: FileText, title: "Koordinim doganor dhe dokumente", body: "Koordinim doganor dhe dokumente eksporti të trajtuara me agjentë vendas të licencuar." },
];

const PRINCIPLES = [
  "Çdo automjet inspektohet para blerjes, jo pas saj.",
  "Çmimet janë të detajuara — pa tarifa të paketuara ose të fshehura.",
  "Një person i vetëm ndjek rastin tuaj nga kërkesa e parë deri te dorëzimi.",
  "Kontakt direkt në WhatsApp, jo radhë biletash.",
];

function RrethNesh() {
  return (
    <>
      <PageHero scene={BROWN_PORSCHE_YARD.sq} breadcrumbs={[{ label: "Rreth nesh" }]} eyebrow="Moving Cars Worldwide" title="Një kompani ndërkombëtare logjistike automjetesh" description="Me seli në Dubai, EBA, dhe operacione në Evropë dhe Shqipëri në Durrës — gjejmë, inspektojmë dhe transportojmë automjete nga SHBA, Koreja e Jugut, EBA dhe Kanadaja.">
        <Button asChild><Link to="/al/kontakt">Merr një ofertë</Link></Button>
        <Button asChild variant="outline"><Link to="/al/si-funksionon">Si funksionon</Link></Button>
      </PageHero>

      <section className="bg-background">
        <div className="container-page grid gap-14 py-20 md:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="eyebrow">Kush jemi</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Mbi 10 vjet duke transportuar automjete mes kontinenteve.</h2>
            <p className="mt-6 text-slate-body">Alpha Worldwide është një kompani ndërkombëtare për logjistikë, gjetje automjetesh dhe shërbime ankandesh. U ndihmojmë blerësve privatë, tregtarëve dhe bizneseve të automjeteve të gjejnë, inspektojnë, blejnë dhe transportojnë automjete nga tregjet kryesore globale — SHBA, Koreja e Jugut, EBA dhe Kanadaja — drejt Shqipërisë dhe në të gjithë Evropën.</p>
            <p className="mt-4 text-slate-body">Gjatë më shumë se 10 vjetëve, kemi blerë dhe transportuar mbi 15,000 automjete përmes rrjetit tonë ndërkombëtar.</p>
          </div>
          <div className="space-y-4">
            {OFFICES.map((office) => (
              <div key={office.id} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-teal" />
                  <div className="eyebrow">{ROLE_SQ[office.role] ?? office.role}</div>
                </div>
                <div className="font-display mt-2 text-2xl font-bold text-navy">{office.city}, {COUNTRY_SQ[office.country] ?? office.country}</div>
                <div className="mt-2 text-sm text-slate-body">
                  {"phone" in office
                    ? <a href={`tel:${office.phone.replace(/\s/g, "")}`} className="hover:text-teal">{office.phone}</a>
                    : office.phones.map((p, i) => (
                      <span key={p}>
                        <a href={`tel:${p.replace(/\s/g, "")}`} className="hover:text-teal">{p}</a>
                        {i < office.phones.length - 1 && ", "}
                      </span>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-mist">
        <div className="container-page py-20 md:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="eyebrow">Çfarë bëjmë</div>
            <h2 className="font-display mt-3 text-4xl font-bold text-navy md:text-5xl">Aftësitë kryesore</h2>
          </div>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((s) => (
              <div key={s.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                <div className="grid h-11 w-11 place-items-center rounded-lg bg-teal/10 text-teal"><s.icon className="h-5 w-5" /></div>
                <h3 className="font-display mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-slate-body">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-dark">
        <div className="container-page py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="eyebrow text-teal-glow">Si punojmë</div>
              <h2 className="font-display mt-3 text-4xl font-bold text-white md:text-5xl">Parimet tona të punës.</h2>
            </div>
            <ul className="space-y-3">
              {PRINCIPLES.map((w) => (
                <li key={w} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-5 text-white/85">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-teal text-white"><Check className="h-3.5 w-3.5" strokeWidth={3} /></span>
                  <span className="text-sm leading-relaxed">{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <StatCounter locale="sq" />
    </>
  );
}
