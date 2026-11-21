import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';
export const Route = createFileRoute('/api/public/calculator-fx-refresh')({
  server: { handlers: {
    POST: async ({ request }) => {
      const { authenticateCronRequest } = await import('@/integrations/supabase/cron-auth');
      const denied = await authenticateCronRequest(request);
      if (denied) return denied;
      if (Number(request.headers.get('content-length') ?? 0) > 1024) return new Response('Invalid body', { status: 400 });
      try { z.object({}).strict().parse(await request.json()); } catch { return new Response('Invalid body', { status: 400 }); }
      try {
        const { refreshCalculatorRates } = await import('@/lib/fx/calculator-rates.server');
        return Response.json({ ok: true, rates: await refreshCalculatorRates() }, { headers: { 'Cache-Control': 'no-store' } });
      } catch {
        return Response.json({ ok: false, error: 'Daily exchange-rate refresh failed; previous rates retained.' }, { status: 502 });
      }
    },
  } },
});