import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const ProtectedRoute = () => {
  const { user, loading, setUser, fetchUserRoles, roles } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      fetchUserRoles();
    });

    // Listen for changes on auth state (log in, log out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      fetchUserRoles();
    });

    return () => subscription.unsubscribe();
  }, [setUser, fetchUserRoles]);

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '20vh'}}>Loading application...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Redirect HR Admins away from standard protected routes if they land on the root or /home
  // This ensures they don't see the normal app layout.
  // TEMPORARY: Also checking email directly to bypass any database mapping issues.
  const isHRAdmin = roles.some(r => r.name === 'HR Admin') || user.email?.toLowerCase() === 'hr@test01.com';
  
  if (isHRAdmin && (location.pathname === '/home' || location.pathname === '/')) {
    return <Navigate to="/hr-admin/dashboard" replace />;
  }

  return <Outlet />;
};
