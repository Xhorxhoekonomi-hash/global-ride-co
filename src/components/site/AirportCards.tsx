import { Link } from "@tanstack/react-router";
import { ArrowRight, Plane } from "lucide-react";
import { AIRPORTS, airportName, airportPath, airportStatus } from "@/lib/airports";

export function AirportCards({ sq = false, exclude }: { sq?: boolean; exclude?: string }) {
  return <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
    {AIRPORTS.filter(airport => airport.slug !== exclude).map(airport => <Link key={airport.slug} to={airportPath(airport, sq)} className="flex min-w-0 flex-col rounded-xl border border-border bg-muted p-6 transition-colors hover:border-primary">
      <Plane className="h-6 w-6 text-primary" aria-hidden="true" />
      <h3 className="mt-4 text-lg font-semibold text-secondary">{airportName(airport, sq)}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{airportStatus(airport, sq)}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary">{sq ? "Shërbimet në aeroport" : "Airport services"}<ArrowRight className="h-4 w-4" /></span>
    </Link>)}
  </div>;
}