CREATE TABLE public.fx_rates (
 pair text PRIMARY KEY CHECK (pair IN ('USD_EUR','EUR_KRW')),
 rate numeric NOT NULL,
 source text NOT NULL,
 fetched_at timestamptz NOT NULL,
 rate_date date NOT NULL,
 CHECK ((pair = 'USD_EUR' AND rate BETWEEN 0.6 AND 1.4) OR (pair = 'EUR_KRW' AND rate BETWEEN 1000 AND 2500))
);
GRANT SELECT ON public.fx_rates TO anon, authenticated;
GRANT ALL ON public.fx_rates TO service_role;
ALTER TABLE public.fx_rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY fx_rates_public_read ON public.fx_rates FOR SELECT TO anon, authenticated USING (true);