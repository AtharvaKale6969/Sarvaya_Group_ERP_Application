-- Add organization, department, and sub_department columns to user_tasks
ALTER TABLE user_tasks 
ADD COLUMN organization text,
ADD COLUMN department text,
ADD COLUMN sub_department text;

-- Add organization, department, and sub_department columns to attendance_logs
ALTER TABLE attendance_logs 
ADD COLUMN organization text,
ADD COLUMN department text,
ADD COLUMN sub_department text;

-- Optional: Update existing tasks/attendance to a default so they don't disappear
UPDATE user_tasks 
SET organization = 'Plastroots Waste Management & Solutions Private Limited',
    department = 'RMT';

UPDATE attendance_logs 
SET organization = 'Plastroots Waste Management & Solutions Private Limited',
    department = 'RMT';
