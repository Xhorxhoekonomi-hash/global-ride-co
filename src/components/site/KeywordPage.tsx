import { Link } from "@tanstack/react-router";
import { Anchor, Globe2, Truck, ShieldCheck, FileText } from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Button } from "@/components/ui/button";
import { JourneySteps } from "@/components/site/JourneySteps";
import { EmailContact } from "@/components/site/EmailContact";
import { KEYWORD_PAGES, type KeywordPage as Page } from "@/lib/keyword-pages";
import { buildHead } from "@/lib/seo";
import { CONTACT, localPath } from "@/lib/site-data";

const PUBLIC_ORIGIN = "https://alphaworldwidealbania.com";
export function keywordHead(page: Page, sq: boolean) {
  const name = sq ? page.nameSq : page.name;
  const path = sq ? page.sq : page.en;
  const title = page.kind === "destination" ? (sq ? `Transport dhe import makinash në ${name} | Alpha Worldwide` : `Car Shipping and Import to ${name} | Alpha Worldwide`) : page.kind === "port" ? (sq ? `Transport makinash përmes portit ${name} | Alpha Worldwide` : `Car Shipping via ${name} Port | Alpha Worldwide`) : `${name} | Alpha Worldwide`;
  const description = sq ? page.detailSq : page.detail;
  const head = buildHead({ title, description, path, lang: sq ? "sq" : "en", hreflang: [{ lang: "en", path: page.en }, { lang: "sq", path: page.sq }], xDefault: page.en });
  return { ...head, meta: head.meta.map(m => m.property === "og:url" ? { ...m, content: `${PUBLIC_ORIGIN}${path}` } : m), links: head.links.map(l => ({ ...l, href: l.href?.replace("https://www.alphaworldwidealbania.com", PUBLIC_ORIGIN) })), scripts: [
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: title.split(" | ")[0], description, url: `${PUBLIC_ORIGIN}${path}`, provider: { "@type": "Organization", name: "Alpha Worldwide", url: PUBLIC_ORIGIN }, ...(page.kind !== "service" ? { areaServed: page.name } : {}) }) },
    { type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: sq ? "Kreu" : "Home", item: `${PUBLIC_ORIGIN}${sq ? "/al" : "/"}` }, { "@type": "ListItem", position: 2, name: sq ? "Shërbimet" : "Services", item: `${PUBLIC_ORIGIN}${sq ? "/al/sherbimet" : "/services"}` }, { "@type": "ListItem", position: 3, name, item: `${PUBLIC_ORIGIN}${path}` }] }) },
  ] };
}

export function KeywordPage({ page, sq = false }: { page: Page; sq?: boolean }) {
  const name = sq ? page.nameSq : page.name;
  const L = (path: string) => localPath(path, sq);
  const title = page.kind === "destination" ? (sq ? `Transport dhe import makinash në ${name}` : `Car shipping and import to ${name}`) : page.kind === "port" ? (sq ? `Transport makinash përmes portit ${name}` : `Car shipping via ${name} port`) : name;
  const services = [
    { icon: Globe2, title: sq ? "Gjetje dhe blerje" : "Sourcing and purchase support", body: sq ? "Shqyrtojmë shpalljen dhe koordinojmë komunikimin me shitësin, blerjen dhe përgatitjen për eksport, sipas rastit." : "We review your listing and coordinate seller communication, purchasing and export preparation as applicable.", to: "/vehicle-sourcing" },
    { icon: ShieldCheck, title: sq ? "Inspektim dhe dokumentacion" : "Inspection and documentation", body: sq ? "Koordinojmë kontrollin para blerjes sipas aksesit në automjet. Dokumentet dhe kërkesat e pranimit konfirmohen para rezervimit." : "Pre-purchase inspection is coordinated subject to vehicle access. Documents and acceptance requirements are confirmed before booking.", to: "/inspection-service" },
    { icon: Anchor, title: sq ? "Transport dhe trajtim" : "Shipping and handling", body: sq ? "Kontenieri, RoRo ose transporti ajror vlerësohen sipas automjetit dhe itinerarit. Trajtimi në terminal koordinohet për dërgesën e konfirmuar." : "Container, RoRo or airfreight is assessed for the vehicle and route. Terminal handling is coordinated for the confirmed shipment.", to: "/port-handling" },
    { icon: FileText, title: sq ? "Koordinim doganor" : "Customs coordination", body: sq ? "Koordinojmë dokumentacionin me agjentë të licencuar. Vendimet, detyrimet dhe taksat i përcaktojnë autoritetet; regjistrimi dhe përshtatshmëria duhen kontrolluar lokalisht." : "We coordinate paperwork with licensed agents. Authorities determine decisions, duties and taxes; registration and vehicle eligibility must be checked locally.", to: "/customs-coordination" },
    { icon: Truck, title: sq ? "Marrje dhe dorëzim" : "Collection and onward delivery", body: sq ? "Organizojmë transportin me kamion transportues deri në destinacionin e konfirmuar. Mundësia, kushtet dhe kostot konfirmohen para rezervimit." : "We arrange car-transporter delivery to the confirmed destination. Availability, conditions and costs are confirmed before booking.", to: "/final-mile-delivery" },
  ];
  const ports = KEYWORD_PAGES.filter(p => p.kind === "port" && page.ports.includes(p.en.split("/").pop() ?? ""));
  const steps = sq ? [
    { n: 1, title: "Dërgoni kërkesën", body: "Na tregoni automjetin, origjinën dhe destinacionin përfundimtar." },
    { n: 2, title: "Konfirmojmë mundësinë", body: "Shqyrtojmë aksesin, dokumentet dhe kërkesat e itinerarit." },
    { n: 3, title: "Miratoni ofertën", body: "Ju japim fushën e shërbimit dhe kostot e konfirmuara para rezervimit." },
    { n: 4, title: "Koordinojmë dorëzimin", body: "Organizojmë transportin, koordinimin në mbërritje dhe hapat e mëtejshëm." },
  ] : [
    { n: 1, title: "Share your request", body: "Tell us the vehicle, origin and final destination." },
    { n: 2, title: "Confirm feasibility", body: "We review access, documents and route requirements." },
    { n: 3, title: "Approve the quote", body: "Receive the confirmed scope and costs before booking." },
    { n: 4, title: "Coordinate delivery", body: "We arrange transport, arrival coordination and onward steps." },
  ];
  return <>
    <PageHero icon={page.kind === "port" ? Anchor : Globe2} breadcrumbs={[{ label: sq ? "Shërbimet" : "Services", to: L("/services") }, { label: name }]} eyebrow="Alpha Worldwide" title={title} description={sq ? page.detailSq : page.detail}>
      <Button asChild><Link to={L("/contact")} search={{ from: "", to: page.kind === "destination" ? page.name : "", vehicle: "" }}>{sq ? "Merr një ofertë" : "Get a quote"}</Link></Button><Button asChild variant="outline"><Link to={L("/services")}>{sq ? "Shërbimet" : "All services"}</Link></Button>
    </PageHero>
    <section className="bg-muted"><div className="container-page py-12 md:py-20"><h2 className="text-3xl font-semibold text-secondary">{sq ? `Mbështetje për automjetin tuaj — ${name}` : `Support for your vehicle — ${name}`}</h2><div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map(s => <Link key={s.to} to={L(s.to)} className="rounded-xl border border-border bg-background p-6"><s.icon className="h-6 w-6 text-primary" /><h3 className="mt-4 text-xl font-semibold text-secondary">{s.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{s.body}</p><span className="mt-5 block text-primary">{sq ? "Shih shërbimin" : "View service"}</span></Link>)}</div></div></section>
    {ports.length > 0 && <section className="bg-background"><div className="container-page py-12 md:py-20"><h2 className="text-3xl font-semibold text-secondary">{sq ? "Portet e përmendura për këtë itinerar" : "Ports mentioned for this route"}</h2><p className="mt-4 text-muted-foreground">{sq ? "Porti konkret dhe disponueshmëria konfirmohen sipas dërgesës." : "The actual port and availability are confirmed for each shipment."}</p><div className="mt-6 flex flex-wrap gap-6">{ports.map(p => <Link key={p.en} className="inline-flex min-h-11 items-center text-primary underline" to={sq ? p.sq : p.en}>{sq ? p.nameSq : p.name}</Link>)}</div></div></section>}
    <section className="bg-background"><div className="container-page py-12 md:py-20"><h2 className="text-3xl font-semibold text-secondary">{sq ? "Si funksionon" : "How it works"}</h2><JourneySteps steps={steps} stepLabel={sq ? "Hapi" : "Step"} /></div></section>
    <section className="bg-muted"><div className="container-page py-12 md:py-20"><h2 className="text-3xl font-semibold text-secondary">{sq ? "Pyetje për këtë shërbim" : "Questions about this service"}</h2><details className="mt-6 border-b border-border py-4"><summary className="min-h-11 cursor-pointer font-semibold text-secondary">{sq ? "A është i konfirmuar çdo itinerar dhe shërbim?" : "Is every route and service confirmed?"}</summary><p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{sq ? "Jo. Disponueshmëria varet nga automjeti, aksesi, dokumentet, transportuesi dhe destinacioni. Ekipi konfirmon çfarë mund të organizohet para rezervimit; nuk garantohen vendime doganore ose afate." : "No. Availability depends on the vehicle, access, documents, carrier and destination. Our team confirms what can be arranged before booking; customs outcomes or timings are not guaranteed."}</p></details><details className="border-b border-border py-4"><summary className="min-h-11 cursor-pointer font-semibold text-secondary">{sq ? "Çfarë nevojitet për një ofertë?" : "What is needed for a quote?"}</summary><p className="mt-3 text-muted-foreground">{sq ? "Linku ose të dhënat e automjetit, gjendja, vendndodhja, destinacioni dhe shërbimet që kërkoni." : "The vehicle listing or details, condition, location, destination and requested services."}</p></details></div></section>
    <section className="bg-background"><div className="container-page py-12 md:py-20"><h2 className="text-3xl font-semibold text-secondary">{sq ? `Kërkoni ofertë — ${name}` : `Request a quote — ${name}`}</h2><p className="mt-4 max-w-3xl text-muted-foreground">{sq ? "Dërgoni të dhënat dhe destinacionin. Ekipi konfirmon fushën e shërbimit, dokumentet dhe kostot." : "Send the details and destination. Our team confirms the service scope, documents and costs."}</p><div className="mt-6 flex flex-wrap gap-4"><Button asChild><Link to={L("/contact")} search={{ from: "", to: page.kind === "destination" ? page.name : "", vehicle: "" }}>{sq ? "Kërko ofertë" : "Request a quote"}</Link></Button><Button asChild variant="secondary"><a href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`${sq ? "Kërkesë" : "Enquiry"}: ${name}`)}`} target="_blank" rel="noreferrer noopener">WhatsApp</a></Button></div><EmailContact className="mt-4" location={page.en} /><div className="mt-6 flex flex-wrap gap-6">{["/container-shipping", "/roro-shipping", "/airfreight"].map((to,i) => <Link key={to} to={L(to)} className="inline-flex min-h-11 items-center text-primary underline">{(sq ? ["Kontenier", "RoRo", "Transport ajror"] : ["Container shipping", "RoRo", "Airfreight"])[i]}</Link>)}</div></div></section>
  </>;
}