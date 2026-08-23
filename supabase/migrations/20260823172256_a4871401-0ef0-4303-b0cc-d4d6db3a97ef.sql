CREATE POLICY "Authenticated can view leads" ON public.leads FOR SELECT TO authenticated USING (true);
GRANT SELECT ON public.leads TO authenticated;