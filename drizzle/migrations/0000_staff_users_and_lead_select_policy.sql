CREATE TABLE IF NOT EXISTS public.staff_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT ON public.staff_users TO authenticated;
GRANT ALL ON public.staff_users TO service_role;

ALTER TABLE public.staff_users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Staff can view own row" ON public.staff_users;
CREATE POLICY "Staff can view own row"
ON public.staff_users
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

INSERT INTO public.staff_users (user_id)
SELECT id FROM auth.users WHERE email = 'info@alphaworldwidealbania.com'
ON CONFLICT (user_id) DO NOTHING;

DROP POLICY IF EXISTS "Authenticated users can view leads" ON public.leads;
DROP POLICY IF EXISTS "Authenticated can view leads" ON public.leads;
DROP POLICY IF EXISTS "Staff can view leads" ON public.leads;
CREATE POLICY "Staff can view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (EXISTS (SELECT 1 FROM public.staff_users s WHERE s.user_id = auth.uid()));
