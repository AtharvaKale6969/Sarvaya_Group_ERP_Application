-- Create RMT Ops Inward table
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
  material text NOT NULL,
  grade text NOT NULL,
  qty numeric NOT NULL,
  unit text NOT NULL DEFAULT 'Kg',
  price_per_kg numeric,
  total_amount numeric,
  freight numeric DEFAULT 0,
  labour numeric DEFAULT 0,
  other_expenses numeric DEFAULT 0,
  payment_status text DEFAULT 'Pending',
  status text DEFAULT 'In Transit',
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RMT Ops Outward table
CREATE TABLE IF NOT EXISTS public.rmt_ops_outward (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  organization text NOT NULL,
  department text NOT NULL,
  sub_department text,
  role text NOT NULL,
  
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  invoice_no text,
  sale_to text NOT NULL,
  material text NOT NULL,
  grade text NOT NULL,
  qty numeric NOT NULL,
  unit text NOT NULL DEFAULT 'Kg',
  sale_price_per_kg numeric,
  total_amount numeric,
  freight numeric DEFAULT 0,
  labour numeric DEFAULT 0,
  other_expenses numeric DEFAULT 0,
  payment_status text DEFAULT 'Pending',
  status text DEFAULT 'Dispatched',
  
  inward_link_id uuid REFERENCES public.rmt_ops_inward(id), -- To link purchase to sale for All Entries mapping
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create RMT Ops Notes (Debit/Credit) table
CREATE TABLE IF NOT EXISTS public.rmt_ops_notes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users NOT NULL,
  organization text NOT NULL,
  department text NOT NULL,
  sub_department text,
  role text NOT NULL,
  
  entry_date date NOT NULL DEFAULT CURRENT_DATE,
  invoice_no text,
  direction text NOT NULL, -- '↓ Received' or '↑ Sent'
  note_type text NOT NULL, -- 'Debit' or 'Credit'
  party text NOT NULL,
  amount numeric NOT NULL,
  reason text NOT NULL,
  linked_entry text,
  chain_id text,
  status text DEFAULT 'Awaiting Finance',
  
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.rmt_ops_inward ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rmt_ops_outward ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rmt_ops_notes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own inward entries" ON public.rmt_ops_inward FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own outward entries" ON public.rmt_ops_outward FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Users can manage their own notes entries" ON public.rmt_ops_notes FOR ALL USING (auth.uid() = user_id);
