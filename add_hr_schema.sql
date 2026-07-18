-- 1. Leave Balances
create table public.leave_balances (
    user_id uuid references auth.users(id) on delete cascade primary key,
    casual_leave integer default 12,
    sick_leave integer default 7,
    privilege_leave integer default 15,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- 2. Leave Requests
create table public.leave_requests (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    leave_type text not null check (leave_type in ('Casual', 'Sick', 'Privilege', 'LWP')),
    start_date date not null,
    end_date date not null,
    status text default 'Pending' check (status in ('Pending', 'Approved', 'Rejected')),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 3. Asset Requests
create table public.asset_requests (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    asset_name text not null,
    justification text not null,
    required_till_date date,
    status text default 'Pending' check (status in ('Pending', 'Approved', 'Rejected', 'Returned')),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. Expense Claims
create table public.expense_claims (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    category text not null,
    amount numeric(10, 2) not null,
    expense_date date not null,
    description text,
    receipt_url text,
    status text default 'Pending' check (status in ('Pending', 'Approved', 'Rejected', 'Paid')),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 5. Payslips
create table public.payslips (
    id uuid default gen_random_uuid() primary key,
    user_id uuid references auth.users(id) on delete cascade not null,
    month_year text not null,
    amount numeric(10, 2) not null,
    file_url text,
    created_at timestamp with time zone default timezone('utc'::text, now())
);
