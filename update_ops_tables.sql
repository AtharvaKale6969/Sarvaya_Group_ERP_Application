-- Drop old flat table if it exists (since we just created it and it is likely empty)
DROP TABLE IF EXISTS public.rmt_ops_inward CASCADE;

-- Create RMT Ops Inward (PARENT TABLE)
CREATE TABLE IF NOT EXISTS public.rmt_ops_inward (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  organization text NOT NULL,
  department text NOT NULL,
  sub_department text,
  role text NOT NULL,
  
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  invoice_no text,
  purchase_from text NOT NULL,
  sale_to text,
  payment_cycle text,
  
  labour numeric DEFAULT 0,
  other_expenses numeric DEFAULT 0,
  payment_status text DEFAULT 'Pending',
  remark text,
  status text DEFAULT 'In Transit',
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Inward Materials (CHILD TABLE)
CREATE TABLE IF NOT EXISTS public.rmt_ops_inward_materials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  inward_id uuid REFERENCES public.rmt_ops_inward(id) ON DELETE CASCADE NOT NULL,
  
  material_type text NOT NULL,
  grade text,
  colour_spec_note text,
  qty numeric NOT NULL,
  unit text NOT NULL DEFAULT 'Kg',
  price_per_kg numeric NOT NULL,
  total numeric NOT NULL,
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create Inward Trucks (CHILD TABLE)
CREATE TABLE IF NOT EXISTS public.rmt_ops_inward_trucks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  inward_id uuid REFERENCES public.rmt_ops_inward(id) ON DELETE CASCADE NOT NULL,
  
  vehicle_no text NOT NULL,
  freight numeric NOT NULL,
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.rmt_ops_inward ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rmt_ops_inward_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rmt_ops_inward_trucks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own inward entries" ON public.rmt_ops_inward FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own inward materials" ON public.rmt_ops_inward_materials FOR ALL USING (
  EXISTS (SELECT 1 FROM public.rmt_ops_inward WHERE id = rmt_ops_inward_materials.inward_id AND user_id = auth.uid())
);
CREATE POLICY "Users can manage their own inward trucks" ON public.rmt_ops_inward_trucks FOR ALL USING (
  EXISTS (SELECT 1 FROM public.rmt_ops_inward WHERE id = rmt_ops_inward_trucks.inward_id AND user_id = auth.uid())
);
