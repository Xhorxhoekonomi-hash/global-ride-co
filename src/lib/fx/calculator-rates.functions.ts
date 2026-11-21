import { createServerFn } from "@tanstack/react-start";
export const getCalculatorRates = createServerFn({ method: "GET" }).handler(async () => {
  const { loadCalculatorRates } = await import('./calculator-rates.server');
  return loadCalculatorRates();
});