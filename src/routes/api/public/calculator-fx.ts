import { createFileRoute } from '@tanstack/react-router';
export const Route = createFileRoute('/api/public/calculator-fx')({
  server: { handlers: { GET: async () => {
    const { loadCalculatorRates } = await import('@/lib/fx/calculator-rates.server');
    return Response.json(await loadCalculatorRates(), { headers: { 'Cache-Control': 'public, max-age=3600' } });
  } } },
});