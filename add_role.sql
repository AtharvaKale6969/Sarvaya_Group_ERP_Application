-- Add role column to user_tasks
ALTER TABLE user_tasks 
ADD COLUMN role text;

-- Add role column to attendance_logs
ALTER TABLE attendance_logs 
ADD COLUMN role text;

-- Update existing tasks/attendance to a default role
UPDATE user_tasks 
SET role = 'BDE';

UPDATE attendance_logs 
SET role = 'BDE';
