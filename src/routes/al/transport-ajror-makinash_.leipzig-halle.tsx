import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/al/transport-ajror-makinash_/leipzig-halle")({
  head: () => airportHead(AIRPORTS[2], true),
  component: () => <AirportPage airport={AIRPORTS[2]} sq={true} />,
});
