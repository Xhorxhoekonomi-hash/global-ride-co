import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/al/transport-ajror-makinash_/milan-malpensa")({
  head: () => airportHead(AIRPORTS[1], true),
  component: () => <AirportPage airport={AIRPORTS[1]} sq={true} />,
});
