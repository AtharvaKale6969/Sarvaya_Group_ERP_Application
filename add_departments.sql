-- Add organization, department, and sub_department columns to rmt_bde_calls
ALTER TABLE rmt_bde_calls 
ADD COLUMN organization text,
ADD COLUMN department text,
ADD COLUMN sub_department text;

-- Add organization, department, and sub_department columns to rmt_clients
ALTER TABLE rmt_clients 
ADD COLUMN organization text,
ADD COLUMN department text,
ADD COLUMN sub_department text;

-- Update existing records to the default RMT context so they don't disappear
UPDATE rmt_bde_calls 
SET organization = 'Plastroots Waste Management & Solutions Private Limited',
    department = 'RMT';

UPDATE rmt_clients 
SET organization = 'Plastroots Waste Management & Solutions Private Limited',
    department = 'RMT';
