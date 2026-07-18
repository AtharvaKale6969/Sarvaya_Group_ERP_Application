-- RMT Clients Schema (Graduated from BDE Pipeline)

CREATE TABLE IF NOT EXISTS rmt_clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  original_lead_id uuid REFERENCES rmt_bde_calls(id) ON DELETE SET NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Core Client Info
  company_name text NOT NULL,
  client_name text NOT NULL,
  contact_number text NOT NULL,
  email text,
  address text,
  city_state text,
  client_type text,
  business_role text,
  
  -- Document Storage Paths (URLs / Keys)
  doc_gst_certificate text,
  doc_cancelled_cheque text,
  doc_gst_6_months text,
  doc_other text,
  
  status text DEFAULT 'Onboarding', -- 'Onboarding' or 'Active Client'
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rmt_clients ENABLE ROW LEVEL SECURITY;

-- Basic Policies
CREATE POLICY "Users can view own clients"
  ON rmt_clients FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own clients"
  ON rmt_clients FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own clients"
  ON rmt_clients FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own clients"
  ON rmt_clients FOR DELETE USING (auth.uid() = user_id);
