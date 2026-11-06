import { Link } from "@tanstack/react-router";
import { JourneySteps } from "@/components/site/JourneySteps";

export function AirfreightSupplement({ sq = false }: { sq?: boolean }) {
  const steps = sq ? [
    { n: 1, title: "Dërgoni të dhënat", body: "Na tregoni automjetin, aeroportin, destinacionin përfundimtar dhe nëse fluturimi është rezervuar." },
    { n: 2, title: "Konfirmojmë mundësinë", body: "Verifikojmë kërkesat e kompanisë ajrore, terminalit, dokumentacionit dhe gjendjes së automjetit." },
    { n: 3, title: "Koordinojmë transportin", body: "Organizojmë rezervimin ose trajtimin në mbërritje, dokumentet e ngarkesës dhe koordinimin doganor." },
    { n: 4, title: "Organizojmë dorëzimin", body: "Koordinojmë marrjen nga aeroporti dhe transportin tokësor deri në destinacionin e konfirmuar." },
  ] : [
    { n: 1, title: "Share the details", body: "Tell us the vehicle, airport, final destination and whether a flight has already been booked." },
    { n: 2, title: "Confirm feasibility", body: "We check airline, terminal, documentation and vehicle-condition requirements before booking." },
    { n: 3, title: "Coordinate the shipment", body: "We arrange booking or arrival handling, cargo documents and customs coordination." },
    { n: 4, title: "Arrange delivery", body: "We coordinate airport collection and onward road transport to the confirmed destination." },
  ];
  return <>
    <section className="bg-muted"><div className="container-page py-12 md:py-20">
      <h2 className="text-3xl font-semibold text-secondary">{sq ? "Transport ajror, kontenier apo RoRo?" : "Airfreight, container or RoRo?"}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">{sq ? "Transporti ajror është një alternativë kur afati kohor dhe kujdesi për një automjet me vlerë të lartë janë përparësi. Kontenieri ofron transport të mbyllur; RoRo është një alternativë për automjete standarde që lëvizin vetë. Ekipi konfirmon përshtatshmërinë dhe ofertën për automjetin tuaj." : "Airfreight is an option when timing and care for a high-value vehicle take priority. Container shipping offers enclosed transport; RoRo is an alternative for standard, driveable vehicles. Our team confirms suitability and a vehicle-specific quote."}</p>
      <div className="mt-6 flex flex-wrap gap-6"><Link className="inline-flex min-h-11 items-center text-primary underline" to={sq ? "/al/transport-me-kontenier" : "/container-shipping"}>{sq ? "Transport me kontenier" : "Container shipping"}</Link><Link className="inline-flex min-h-11 items-center text-primary underline" to={sq ? "/al/transport-roro" : "/roro-shipping"}>{sq ? "Transport RoRo" : "RoRo shipping"}</Link></div>
    </div></section>
    <section className="bg-background"><div className="container-page py-12 md:py-20"><h2 className="text-3xl font-semibold text-secondary">{sq ? "Procesi në katër hapa" : "The four-step process"}</h2><JourneySteps steps={steps} stepLabel={sq ? "Hapi" : "Step"} /></div></section>
  </>;
}