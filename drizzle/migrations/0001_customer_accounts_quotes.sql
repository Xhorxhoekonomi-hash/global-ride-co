CREATE TABLE public.profiles (
 id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
 full_name text NOT NULL,
 email text NOT NULL,
 phone text NOT NULL,
 country text NOT NULL DEFAULT 'Albania',
 locale text NOT NULL DEFAULT 'en' CHECK (locale IN ('en','sq')),
 marketing_consent boolean NOT NULL DEFAULT false,
 marketing_consent_at timestamptz,
 marketing_consent_text text NOT NULL,
 privacy_accepted_at timestamptz NOT NULL,
 created_at timestamptz NOT NULL DEFAULT now(),
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE(full_name,phone,country,marketing_consent) ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY profiles_read ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid() OR EXISTS (SELECT 1 FROM public.staff_users s WHERE s.user_id = auth.uid()));
CREATE POLICY profiles_update ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid());
CREATE TABLE public.calculator_quotes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
 created_at timestamptz NOT NULL DEFAULT now(),
 tab text NOT NULL CHECK (tab IN ('usa','korea')),
 inputs jsonb NOT NULL,
 result jsonb NOT NULL,
 total numeric NOT NULL,
 currency text NOT NULL CHECK (currency IN ('USD','EUR')),
 input_fingerprint text NOT NULL,
 UNIQUE(user_id,tab,input_fingerprint)
);
GRANT SELECT ON public.calculator_quotes TO authenticated;
GRANT ALL ON public.calculator_quotes TO service_role;
ALTER TABLE public.calculator_quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY quotes_read ON public.calculator_quotes FOR SELECT TO authenticated USING (user_id = auth.uid() OR EXISTS (SELECT 1 FROM public.staff_users s WHERE s.user_id = auth.uid()));
CREATE INDEX calculator_quotes_user_date ON public.calculator_quotes(user_id,created_at DESC);
CREATE FUNCTION public.customer_consent_wording(l text) RETURNS text LANGUAGE sql IMMUTABLE SET search_path = public AS $$ SELECT CASE WHEN l='sq' THEN 'Më dërgoni herë pas here përditësime nga Alpha Worldwide (disa herë në vit). Mund të çregjistrohem në çdo kohë.' ELSE 'Email me occasional updates from Alpha Worldwide (a few times a year). Unsubscribe any time.' END $$;
REVOKE ALL ON FUNCTION public.customer_consent_wording(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.customer_consent_wording(text) TO authenticated,service_role;
CREATE FUNCTION public.validate_customer_profile() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 IF length(trim(NEW.full_name)) < 2 OR length(NEW.full_name)>100 OR NEW.phone !~ '^\+[0-9][0-9 ()-]{6,24}$' OR length(NEW.country)<2 OR length(NEW.country)>100 THEN RAISE EXCEPTION 'Invalid customer profile'; END IF;
 NEW.full_name := trim(NEW.full_name);
 NEW.updated_at := now();
 IF TG_OP='INSERT' OR NEW.marketing_consent IS DISTINCT FROM OLD.marketing_consent THEN
 NEW.marketing_consent_at := CASE WHEN NEW.marketing_consent THEN now() ELSE NULL END;
 NEW.marketing_consent_text := public.customer_consent_wording(NEW.locale);
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER validate_customer_profile BEFORE INSERT OR UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.validate_customer_profile();
CREATE FUNCTION public.create_customer_profile() RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE m jsonb := NEW.raw_user_meta_data; l text;
BEGIN
 IF m->>'customer_account' IS DISTINCT FROM 'true' THEN RETURN NEW; END IF;
 IF m->>'privacy_accepted' IS DISTINCT FROM 'true' THEN RAISE EXCEPTION 'Privacy and Terms agreement required'; END IF;
 l := CASE WHEN m->>'locale'='sq' THEN 'sq' ELSE 'en' END;
 INSERT INTO public.profiles(id,full_name,email,phone,country,locale,marketing_consent,marketing_consent_text,privacy_accepted_at)
 VALUES(NEW.id,m->>'full_name',NEW.email,m->>'phone',COALESCE(m->>'country','Albania'),l,COALESCE((m->>'marketing_consent')::boolean,false),public.customer_consent_wording(l),now());
 RETURN NEW;
END $$;
REVOKE ALL ON FUNCTION public.create_customer_profile() FROM PUBLIC;
CREATE TRIGGER create_customer_profile AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.create_customer_profile();