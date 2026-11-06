import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/airfreight_/leipzig-halle")({
  head: () => airportHead(AIRPORTS[2], false),
  component: () => <AirportPage airport={AIRPORTS[2]} sq={false} />,
});
