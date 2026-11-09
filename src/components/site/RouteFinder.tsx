import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { trackEvent } from "@/lib/analytics";
import { localPath } from "@/lib/site-data";
import { RF_DESTINATIONS, RF_ORIGINS, RF_VEHICLES, routeFinderTarget, type RfDestination, type RfOrigin, type RfVehicle } from "@/lib/route-finder";

const COPY = {
  en: {
    title: "Where is your car coming from?", from: "From", to: "To", vehicle: "Vehicle", submit: "See my cost",
    origins: ["USA", "South Korea", "Dubai / UAE", "Canada", "Europe"],
    destinations: ["Albania", "Kosovo", "Germany", "Netherlands", "Belgium", "France", "Italy", "Other"],
    vehicles: ["Car / SUV", "Pickup / Van", "Motorcycle", "Other"],
    note: "Estimates use our current rate tables. Your final quote is confirmed before booking.", disclaimer: "About shipping estimates",
  },
  sq: {
    title: "Nga vjen makina juaj?", from: "Nga", to: "Për në", vehicle: "Automjeti", submit: "Shiko koston",
    origins: ["Amerikë", "Koreja e Jugut", "Dubai / EBA", "Kanada", "Evropë"],
    destinations: ["Shqipëri", "Kosovë", "Gjermani", "Holandë", "Belgjikë", "Francë", "Itali", "Tjetër"],
    vehicles: ["Makinë / SUV", "Pickup / Furgon", "Motoçikletë", "Tjetër"],
    note: "Përllogaritjet përdorin tabelat tona aktuale të tarifave. Oferta përfundimtare konfirmohet para rezervimit.", disclaimer: "Rreth përllogaritjeve",
  },
};

export function RouteFinder({ locale }: { locale: "en" | "sq" }) {
  const c = COPY[locale];
  const L = (to: string) => localPath(to, locale === "sq");
  const navigate = useNavigate();
  const [from, setFrom] = useState<RfOrigin>("USA");
  const [to, setTo] = useState<RfDestination>("Albania");
  const [vehicle, setVehicle] = useState<RfVehicle>("Car / SUV");
  const [pulse, setPulse] = useState(0);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    trackEvent("route_finder_submitted", { from, to, vehicle });
    const target = routeFinderTarget(locale, from, to, vehicle);
    navigate({ to: target.to, search: target.search } as never);
  };
  const field = (id: string, label: string, value: string, set: (v: string) => void, values: readonly string[], labels: string[]) => (
    <div className="route-finder-field">
      <label htmlFor={id}>{label}</label>
      <select id={id} value={value} onChange={(e) => { set(e.target.value); setPulse((p) => p + 1); }}>
        {values.map((v, i) => <option key={v} value={v}>{labels[i]}</option>)}
      </select>
    </div>
  );
  return <section className="route-finder-wrap" aria-labelledby="route-finder-title"><div className="container-page">
    <form className="route-finder" onSubmit={submit}>
      <h2 id="route-finder-title">{c.title}</h2>
      <div className="route-finder-row">
        {field("rf-from", c.from, from, (v) => setFrom(v as RfOrigin), RF_ORIGINS, c.origins)}
        {field("rf-to", c.to, to, (v) => setTo(v as RfDestination), RF_DESTINATIONS, c.destinations)}
        {field("rf-vehicle", c.vehicle, vehicle, (v) => setVehicle(v as RfVehicle), RF_VEHICLES, c.vehicles)}
        <Button key={pulse} type="submit" className={`route-finder-submit${pulse ? " rf-pulse" : ""}`}>{c.submit}<ArrowRight /></Button>
      </div>
      <p className="route-finder-note">{c.note} <Link to={L("/shipping-estimate-disclaimer")}>{c.disclaimer}</Link></p>
    </form>
  </div></section>;
}
