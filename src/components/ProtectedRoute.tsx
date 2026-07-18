import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';

export const ProtectedRoute = () => {
  const { user, loading, setUser, fetchUserRoles } = useAuthStore();

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

  return <Outlet />;
};
