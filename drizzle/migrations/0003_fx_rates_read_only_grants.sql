REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER ON public.fx_rates FROM anon, authenticated;
GRANT SELECT ON public.fx_rates TO anon, authenticated;
GRANT ALL ON public.fx_rates TO service_role;