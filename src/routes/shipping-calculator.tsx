import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/shipping-calculator")({
  beforeLoad: () => {
    throw redirect({ to: "/calculator", statusCode: 301 });
  },
});
