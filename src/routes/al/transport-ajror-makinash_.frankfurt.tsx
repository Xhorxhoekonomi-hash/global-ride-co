import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/al/transport-ajror-makinash_/frankfurt")({
  head: () => airportHead(AIRPORTS[3], true),
  component: () => <AirportPage airport={AIRPORTS[3]} sq={true} />,
});
