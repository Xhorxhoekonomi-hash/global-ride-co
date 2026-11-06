import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/airfreight_/frankfurt")({
  head: () => airportHead(AIRPORTS[3], false),
  component: () => <AirportPage airport={AIRPORTS[3]} sq={false} />,
});
