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
  ].sort((a,b) => b.name.length-a.name.length);
  const escaped = candidates.map(c => c.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const re = new RegExp(`(${escaped.join("|")})`, "g");
  return <>{text.split(re).map((part,i) => {
    const match = candidates.find(c => c.name === part);
    return match ? <Link className="text-primary underline underline-offset-4" key={i} to={match.path}>{part}</Link> : <Fragment key={i}>{part}</Fragment>;
  })}</>;
}