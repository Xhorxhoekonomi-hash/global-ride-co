import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/al/transport-ajror-makinash_/amsterdam-schiphol")({
  head: () => airportHead(AIRPORTS[0], true),
  component: () => <AirportPage airport={AIRPORTS[0]} sq={true} />,
});
