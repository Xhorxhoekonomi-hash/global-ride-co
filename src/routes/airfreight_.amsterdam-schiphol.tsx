import { createFileRoute } from "@tanstack/react-router";
import { AIRPORTS } from "@/lib/airports";
import { AirportPage, airportHead } from "@/components/site/AirportPage";

export const Route = createFileRoute("/airfreight_/amsterdam-schiphol")({
  head: () => airportHead(AIRPORTS[0], false),
  component: () => <AirportPage airport={AIRPORTS[0]} sq={false} />,
});
