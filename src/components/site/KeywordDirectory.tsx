import { Link } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { AIRPORTS, airportName, airportPath } from "@/lib/airports";

/** A public, bilingual directory makes every confirmed keyword destination discoverable. */
export function KeywordDirectory({ sq, path }: { sq: boolean; path: string }) {
  const titles = sq ? { destination: "Destinacionet", port: "Portet", service: "Shërbimet" } : { destination: "Destinations", port: "Ports", service: "Services" };
  return <section className="bg-muted"><div className="container-page py-12 md:py-16"><h2 className="text-secondary">{sq ? "Itinerare, porte dhe shërbime" : "Routes, ports and services"}</h2><div className="mt-8 grid gap-10">
    {(["destination", "port", "service"] as const).map(kind => <div key={kind} className="chip-group"><h3>{titles[kind]}</h3><ul className="chip-list">{KEYWORD_PAGES.filter(p => p.kind === kind && (sq ? p.sq : p.en) !== path).map(p => <li key={p.en}><Link className="chip" to={sq ? p.sq : p.en}>{sq ? p.nameSq : p.name}</Link></li>)}</ul></div>)}
    <div className="chip-group"><h3>{sq ? "Aeroportet" : "Airports"}</h3><ul className="chip-list">{AIRPORTS.map(a => <li key={a.slug}><Link className="chip" to={airportPath(a,sq)}>{airportName(a,sq)}</Link></li>)}</ul></div>
  </div></div></section>;
}
