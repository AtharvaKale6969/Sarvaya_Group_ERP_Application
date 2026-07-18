-- RMT BDE Calling Pipeline Schema

CREATE TABLE IF NOT EXISTS rmt_bde_calls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  client_type text, -- e.g., Producer, Recycler, Trader
  business_role text, -- e.g., Buyer, Seller
  address text,
  city_state text,
  client_name text,
  contact_number text,
  email text,
  status text DEFAULT 'New (Not Called)', -- New (Not Called), Called, Interested, Not Interested, Reschedule, CNR / CNC
  reschedule_date timestamptz,
  is_trashed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE rmt_bde_calls ENABLE ROW LEVEL SECURITY;

-- Policies (For now, user can see and edit their own. Leads will be granted access later in RBAC phase)
CREATE POLICY "Users can view own calls"
  ON rmt_bde_calls FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own calls"
  ON rmt_bde_calls FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own calls"
  ON rmt_bde_calls FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own calls"
  ON rmt_bde_calls FOR DELETE USING (auth.uid() = user_id);
