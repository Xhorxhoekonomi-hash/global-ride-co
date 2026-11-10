import { Link } from "@tanstack/react-router";
import { Plane, Package, FileText, ShieldCheck, Truck, MapPin, Warehouse, MessageCircle, Mail } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { AirfreightGallery } from "@/components/site/AirfreightGallery";
import { AIRPORT_SCENES } from "@/lib/airfreight-photos";
import { Button } from "@/components/ui/button";
import { AirportCards } from "@/components/site/AirportCards";
import { AirfreightForm } from "@/components/site/AirfreightForm";
import { trackEvent } from "@/lib/analytics";
import { AirfreightSupplement } from "@/components/site/AirfreightSupplement";
import { airportName, airportPath, airportStatus, type Airport } from "@/lib/airports";
import { buildHead, SITE_URL } from "@/lib/seo";
import { CONTACT } from "@/lib/site-data";

const PUBLIC_ORIGIN = SITE_URL;
export function airportHead(airport: Airport, sq: boolean) {
  const name = airportName(airport, sq);
  const path = airportPath(airport, sq);
  const en = airportPath(airport, false);
  const al = airportPath(airport, true);
  const title = sq ? `Transport ajror përmes ${name} | Alpha Worldwide` : `Car Airfreight via ${name} | Alpha Worldwide`;
  const description = sq ? `Transport ajror automjetesh përmes ${name}, koordinim i ngarkesës dhe doganës, dokumentacion dhe dorëzim tokësor. ${airportStatus(airport, true)}; sipas konfirmimit të dërgesës.` : `Vehicle airfreight via ${name}, cargo and customs coordination, inspection documents, airport collection and onward delivery. ${airportStatus(airport, false)}; shipment confirmation required.`;
  const base = buildHead({ title, description, path, lang: sq ? "sq" : "en", hreflang: [{ lang: "en", path: en }, { lang: "sq", path: al }], xDefault: en });
  return { ...base,
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: title.split(" | ")[0], description, serviceType: sq ? "Koordinim i transportit ajror të automjeteve" : "Vehicle airfreight coordination", provider: { "@type": "Organization", name: "Alpha Worldwide", url: PUBLIC_ORIGIN }, areaServed: airport.country, url: `${PUBLIC_ORIGIN}${path}` }) },
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: sq ? "Kreu" : "Home", item: `${PUBLIC_ORIGIN}${sq ? "/al" : "/"}` }, { "@type": "ListItem", position: 2, name: sq ? "Transport ajror" : "Airfreight", item: `${PUBLIC_ORIGIN}${sq ? "/al/transport-ajror-makinash" : "/airfreight"}` }, { "@type": "ListItem", position: 3, name, item: `${PUBLIC_ORIGIN}${path}` }] }) }],
  };
}

export function AirportPage({ airport, sq = false }: { airport: Airport; sq?: boolean }) {
  const name = airportName(airport, sq);
  const hub = sq ? "/al/transport-ajror-makinash" : "/airfreight";
  const contact = sq ? "/al/kontakt" : "/contact";
  const whatsapp = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`${sq ? "Kërkesë për transport ajror" : "Vehicle airfreight enquiry"} — ${name}`)}`;
  const services = [
    { icon: Plane, title: sq ? "Transport ajror drejt dhe nga aeroporti" : "Vehicle airfreight to and from the airport", body: sq ? `Koordinojmë transportin e automjetit përmes ${name}. Fluturimi, pranimi i automjetit dhe trajtimi konfirmohen për çdo dërgesë.` : `We coordinate vehicle shipments via ${name}. Flight availability, vehicle acceptance and handling are confirmed for each shipment.` },
    { icon: Package, title: sq ? "Koordinim i ngarkesës në aeroport" : "Airport cargo handling coordination", body: sq ? "Për një fluturim të rezervuar, mund të kërkoni vetëm trajtimin në mbërritje: shkarkim, koordinim të terminalit dhe procedurat e lirimit." : "For an already-booked flight, request arrival handling only: unloading, terminal coordination and release procedures." },
    { icon: FileText, title: sq ? "Koordinim doganor" : "Customs coordination", body: sq ? "Koordinojmë dokumentet me agjentë të licencuar, përfshirë mbështetjen T1 dhe Carnet de Passage kur zbatohen. Vendimet, detyrimet dhe taksat përcaktohen nga autoritetet doganore." : "We coordinate paperwork with licensed agents, including T1 transit and Carnet de Passage support where applicable. Customs decisions, duties and taxes are determined by the authorities." },
    { icon: ShieldCheck, title: sq ? "Inspektim dhe dokumente para nisjes" : "Pre-shipment inspection and documentation", body: sq ? "Shqyrtojmë të dhënat e automjetit dhe koordinojmë inspektimin sipas aksesit. Konfirmojmë dokumentet, kërkesat për baterinë dhe karburantin përpara rezervimit." : "We review vehicle details and coordinate inspection subject to access. Documents, battery and fuel requirements are confirmed before booking." },
    { icon: Truck, title: sq ? "Marrje nga aeroporti dhe dorëzim në adresë" : "Airport collection and door-to-door delivery", body: sq ? "Koordinojmë marrjen pas procedurave përkatëse dhe transportin me kamion transportues makinash deri në adresën e konfirmuar." : "We coordinate collection after the relevant release procedures and delivery by car transporter to the confirmed address." },
    { icon: MapPin, title: sq ? "Dorëzim në Shqipëri, Kosovë dhe BE" : "Onward delivery to Albania, Kosovo and EU destinations", body: sq ? "Na tregoni destinacionin përfundimtar. Konfirmojmë itinerarin tokësor, dokumentet e tranzitit dhe mundësinë e dorëzimit për rastin tuaj." : "Tell us the final destination. We confirm road routing, transit documents and delivery feasibility for your shipment." },
    { icon: Warehouse, title: sq ? "Koordinim ruajtjeje kur zbatohet" : "Storage and holding coordination where applicable", body: sq ? "Nëse nevojitet qëndrim i përkohshëm, mundësia, kushtet dhe çdo tarifë konfirmohen për dërgesën. Nuk premtojmë hapësirë ose disponueshmëri pa konfirmim." : "If temporary holding is needed, availability, conditions and any charges must be confirmed for the shipment. Space or availability is not promised without confirmation." },
  ];
  return <>
    <PageHero scene={AIRPORT_SCENES[airport.slug]?.[sq ? "sq" : "en"]} tone="navy" icon={Plane} breadcrumbs={[{ label: sq ? "Transport ajror" : "Airfreight", to: hub }, { label: name }]} eyebrow={airportStatus(airport, sq)} title={sq ? `Transport ajror makinash përmes ${name}` : `Car airfreight via ${name}`} description={sq ? "Transport ajror, koordinim në aeroport dhe dorëzim tokësor — sipas kërkesave të automjetit dhe konfirmimit të dërgesës." : "Vehicle airfreight, airport coordination and onward delivery — subject to vehicle requirements and shipment confirmation."}>
      <Button asChild><a href="#airport-enquiry">{sq ? "Kërko ofertë" : "Request a quote"}</a></Button><Button asChild variant="outline"><Link to={hub}>{sq ? "Transporti ajror" : "Airfreight hub"}</Link></Button>
    </PageHero>
    <section className="bg-background"><div className="container-page py-12 md:py-20"><h2 className="text-secondary">{sq ? "Statusi i trajtimit" : "Handling status"}</h2><p className="mt-4 max-w-3xl text-muted-foreground leading-relaxed">{airport.verified ? (sq ? `Kemi përvojë të verifikuar koordinimi në ${name}. Pranimi dhe trajtimi varen nga kërkesat e kompanisë ajrore, terminalit, operatorit tokësor dhe automjetit.` : `We have verified handling experience at ${name}. Acceptance and handling remain subject to airline, cargo-terminal, ground-handler and vehicle-specific requirements.`) : (sq ? "Frankfurt është në dispozicion me kërkesë, në varësi të dërgesës. Nuk paraqitet si aeroport me trajtim të verifikuar. Na kërkoni të konfirmojmë mundësinë përpara rezervimit." : "Frankfurt is available on request depending on the shipment. It is not listed as verified handling. Ask us to confirm feasibility before booking.")}</p></div></section>
    <section className="bg-muted"><div className="container-page py-12 md:py-20"><h2 className="text-secondary">{sq ? `Shërbimet për automjete në ${name}` : `Vehicle services at ${name}`}</h2><div className="mt-8 grid gap-5 md:grid-cols-2">{services.map(s => <article key={s.title} className="rounded-xl border border-border bg-background p-6"><s.icon className="h-6 w-6 text-primary" /><h3 className="mt-4 text-secondary">{s.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p><Button asChild variant="link" className="mt-4 px-0"><a href="#airport-enquiry">{sq ? "Kërko këtë shërbim" : "Request this service"}</a></Button></article>)}</div></div></section>
    <AirfreightGallery sq={sq} />
    <AirfreightSupplement sq={sq} />
    <section id="airport-enquiry" className="scroll-mt-24 bg-muted"><div className="container-page grid grid-cols-[minmax(0,1fr)] gap-10 py-12 md:py-20 lg:grid-cols-2"><div><h2 className="text-secondary">{sq ? `Kërkoni ofertë për ${name}` : `Request a quote for ${name}`}</h2><p className="mt-4 text-muted-foreground leading-relaxed">{sq ? "Dërgoni automjetin, aeroportin, afatin e dëshiruar dhe destinacionin përfundimtar. Nëse fluturimi është rezervuar, tregoni të dhënat e Air Waybill. Konfirmojmë mundësinë dhe fushën e shërbimit përpara rezervimit." : "Share the vehicle, airport, requested timing and final destination. If the flight is booked, include the Air Waybill details. We confirm feasibility and service scope before booking."}</p><div className="mt-6 flex flex-wrap gap-3"><Button asChild variant="secondary"><a href={whatsapp} target="_blank" rel="noreferrer noopener"><MessageCircle />WhatsApp</a></Button><Button asChild variant="outline"><a href={`mailto:${CONTACT.email}`} onClick={() => trackEvent("email_clicked", { location: `airport-${airport.slug}` })}><Mail />{CONTACT.email}</a></Button><Button asChild variant="outline"><Link to={contact}>{sq ? "Kontaktoni ekipin" : "Contact our team"}</Link></Button></div></div><AirfreightForm initialAirport={name} locale={sq ? "sq" : "en"} /></div></section>
    <section className="bg-background"><div className="container-page py-12 md:py-20"><h2 className="text-secondary">{sq ? "Aeroporte të tjera" : "Other airports"}</h2><AirportCards sq={sq} exclude={airport.slug} /><div className="mt-8 flex flex-wrap gap-6">{[{ en: "/inspection-service", al: "/al/inspektim-makinash", label: sq ? "Inspektim" : "Inspection" }, { en: "/container-shipping", al: "/al/transport-me-kontenier", label: sq ? "Kontenier" : "Container shipping" }, { en: "/roro-shipping", al: "/al/transport-roro", label: "RoRo" }].map(l => <Link key={l.en} to={sq ? l.al : l.en} className="inline-flex min-h-11 items-center text-primary underline">{l.label}</Link>)}</div></div></section>
  </>;
}