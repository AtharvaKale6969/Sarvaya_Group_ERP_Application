-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Organizations
create table public.organizations (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Departments
create table public.departments (
    id uuid default uuid_generate_v4() primary key,
    organization_id uuid references public.organizations(id) on delete cascade not null,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Sub Departments
create table public.sub_departments (
    id uuid default uuid_generate_v4() primary key,
    department_id uuid references public.departments(id) on delete cascade not null,
    name text not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Roles Reference Table
create table public.roles (
    id uuid default uuid_generate_v4() primary key,
    name text not null unique, -- e.g., 'Super Admin', 'HR Admin', 'Manager', 'Employee'
    description text
);

-- Insert Default Roles
insert into public.roles (name, description) values
    ('Super Admin', 'Has access to all organizations and settings'),
    ('HR Admin', 'Manages attendance, leave, and payroll for their organization'),
    ('Manager', 'Manages tracksheets and employees within their department'),
    ('Employee', 'Standard access for punching in and filling out their own tracksheets');

-- 5. User Roles (Many-to-Many mapping linking Auth Users to Roles & Orgs)
create table public.user_roles (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    role_id uuid references public.roles(id) on delete cascade not null,
    organization_id uuid references public.organizations(id) on delete cascade, -- Null if Super Admin
    department_id uuid references public.departments(id) on delete cascade,     -- Optional
    sub_department_id uuid references public.sub_departments(id) on delete cascade, -- Optional
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Attendance Logs (HR Module)
create table public.attendance_logs (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    punch_in_time timestamp with time zone default timezone('utc'::text, now()) not null,
    punch_out_time timestamp with time zone,
    punch_in_lat numeric,
    punch_in_lng numeric,
    punch_out_lat numeric,
    punch_out_lng numeric,
    date date not null default current_date
);

-- 7. Tracksheets
create table public.tracksheets (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    content text,
    organization_id uuid references public.organizations(id) on delete cascade not null,
    department_id uuid references public.departments(id) on delete cascade not null,
    created_by uuid references auth.users(id) on delete set null,
    status text default 'pending', -- pending, approved, rejected
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);
