import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/airfreight_/milan-malpensa")({
  head: () => airportHead(AIRPORTS[1], false),
  component: () => <AirportPage airport={AIRPORTS[1]} sq={false} />,
});
