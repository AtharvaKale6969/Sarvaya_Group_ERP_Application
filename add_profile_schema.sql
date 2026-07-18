create table public.profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    full_name text,
    avatar_url text,
    bio text,
    phone_number text,
    date_of_birth date,
    updated_at timestamp with time zone default timezone('utc'::text, now())
);
