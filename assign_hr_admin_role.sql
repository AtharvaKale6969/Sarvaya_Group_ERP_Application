-- Assign the 'HR Admin' role to the specified user UID
-- Adjust the organization_id if necessary. This script defaults to the first organization found.

DO $$
DECLARE
    v_role_id uuid;
    v_org_id uuid;
    v_user_id uuid := 'ac3bf39a-f463-4c62-b2ee-cdbd4d26efc0';
BEGIN
    -- Get the ID for the HR Admin role
    SELECT id INTO v_role_id FROM public.roles WHERE name = 'HR Admin' LIMIT 1;
    
    -- Get the first organization ID (modify as needed)
    SELECT id INTO v_org_id FROM public.organizations LIMIT 1;
    
    IF v_role_id IS NOT NULL THEN
        -- Insert into user_roles
        INSERT INTO public.user_roles (user_id, role_id, organization_id)
        VALUES (v_user_id, v_role_id, v_org_id)
        ON CONFLICT DO NOTHING; -- Assuming no unique constraint issues, or handle duplicates if they exist
        
        RAISE NOTICE 'HR Admin role assigned successfully to user %.', v_user_id;
    ELSE
        RAISE EXCEPTION 'Role "HR Admin" not found in the roles table.';
    END IF;
END $$;
