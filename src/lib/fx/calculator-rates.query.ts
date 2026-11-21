import { queryOptions } from "@tanstack/react-query";
import { getCalculatorRates } from "./calculator-rates.functions";
export const calculatorRatesQuery = queryOptions({
  queryKey: ['calculator-fx-rates'], queryFn: () => getCalculatorRates(), staleTime: 3600000,
  refetchInterval: 3600000,
});