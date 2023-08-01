CREATE TABLE public.profiles(
  id uuid UNIQUE REFERENCES auth.users ON DELETE CASCADE,
  full_name text,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  PRIMARY KEY (id)
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT TO authenticated
    USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE TO authenticated
    USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  AS $$
BEGIN
  INSERT INTO public.profiles(id, full_name)
    VALUES(NEW.id, NEW.raw_user_meta_data ->> 'full_name');
  RETURN new;
END;
$$
LANGUAGE plpgsql
SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE public.handle_new_user();

