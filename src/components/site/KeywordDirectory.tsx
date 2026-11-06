import { Link } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { AIRPORTS, airportName, airportPath } from "@/lib/airports";

/** A public, bilingual directory makes every confirmed keyword destination discoverable. */
export function KeywordDirectory({ sq, path }: { sq: boolean; path: string }) {
  return <section className="bg-muted"><div className="container-page py-12 md:py-16"><h2 className="text-2xl font-semibold text-secondary">{sq ? "Itinerare, porte dhe shërbime" : "Routes, ports and services"}</h2><div className="mt-6 grid gap-8 md:grid-cols-3">
    {(["destination", "port", "service"] as const).map(kind => <div key={kind}><h3 className="text-lg font-semibold text-secondary">{(sq ? { destination: "Destinacionet", port: "Portet", service: "Shërbimet" } : { destination: "Destinations", port: "Ports", service: "Services" })[kind]}</h3><ul className="mt-3 flex flex-wrap gap-x-5">{KEYWORD_PAGES.filter(p => p.kind === kind && (sq ? p.sq : p.en) !== path).map(p => <li key={p.en}><Link className="inline-flex min-h-11 items-center text-sm text-primary underline" to={sq ? p.sq : p.en}>{sq ? p.nameSq : p.name}</Link></li>)}</ul></div>)}
  </div><h3 className="mt-8 text-lg font-semibold text-secondary">{sq ? "Aeroportet" : "Airports"}</h3><ul className="flex flex-wrap gap-x-5">{AIRPORTS.map(a => <li key={a.slug}><Link className="inline-flex min-h-11 items-center text-sm text-primary underline" to={airportPath(a,sq)}>{airportName(a,sq)}</Link></li>)}</ul></div></section>;
}