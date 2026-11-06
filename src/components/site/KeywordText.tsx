import { Fragment } from "react";
import { Link } from "@tanstack/react-router";
import { KEYWORD_PAGES } from "@/lib/keyword-pages";
import { AIRPORTS, airportName, airportPath } from "@/lib/airports";

/** Inline keyword links keep list and card copy aligned with the bilingual page registry. */
export function KeywordText({ text, sq = false }: { text: string; sq?: boolean }) {
  const candidates = [
    ...AIRPORTS.map(a => ({ name: airportName(a, sq), path: airportPath(a, sq) })),
    ...KEYWORD_PAGES.map(p => ({ name: sq ? p.nameSq : p.name, path: sq ? p.sq : p.en })),
    { name: sq ? "SHBA" : "USA", path: sq ? "/al/makina-nga-amerika" : "/import-usa" },
    { name: sq ? "Koreja e Jugut" : "South Korea", path: sq ? "/al/makina-nga-korea" : "/import-korea" },
    { name: sq ? "Evropë" : "Europe", path: sq ? "/al/makina-nga-evropa" : "/import-europe" },
    { name: sq ? "Kanada" : "Canada", path: sq ? "/al/makina-nga-kanadaja" : "/import-canada" },
    { name: sq ? "Leipzig" : "Schiphol", path: airportPath(AIRPORTS[sq ? 2 : 0], sq) },
    ...[
      ["Complete Vehicle Airfreight", "Transport ajror i plotë i automjetit", "/airfreight", "/al/transport-ajror-makinash"],
      ["European Airport Handling Only", "Vetëm trajtim në aeroportin evropian", "/airport-handling", "/al/trajtim-ne-aeroport"],
      ["Customs-clearance coordination", "Koordinim doganor", "/customs-coordination", "/al/koordinim-doganor"],
      ["T1 transit support", "Mbështetje për tranzit T1", "/t1-transit", "/al/tranzit-t1"],
      ["Carnet de Passage handling", "Trajtimi i Carnet de Passage", "/carnet-de-passage", "/al/carnet-de-passage"],
      ["Shared Container", "Kontenier i përbashkët", "/container-shipping", "/al/transport-me-kontenier"],
      ["Full Container", "Kontenier i plotë", "/container-shipping", "/al/transport-me-kontenier"],
    ].map(([en, al, enPath, alPath]) => ({ name: sq ? al : en, path: sq ? alPath : enPath })),
  ].sort((a,b) => b.name.length-a.name.length);
  const escaped = candidates.map(c => c.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(?<![\\p{L}\\p{N}])(${escaped.join("|")})(?![\\p{L}\\p{N}])`, "gu");
  return <>{text.split(re).map((part,i) => {
    const match = candidates.find(c => c.name === part);
    return match ? <Link className="text-primary underline underline-offset-4" key={i} to={match.path}>{part}</Link> : <Fragment key={i}>{part}</Fragment>;
  })}</>;
}