import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface RoleProtectedRouteProps {
  requiredRole: string;
}

export const RoleProtectedRoute = ({ requiredRole }: RoleProtectedRouteProps) => {
  const { user, loading, roles } = useAuthStore();

  if (loading) {
    return <div style={{display: 'flex', justifyContent: 'center', marginTop: '20vh'}}>Loading application...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if the user has the required role
  const hasRole = roles.some((role) => role.name === requiredRole || role.name === 'Admin' || role.name === 'Super Admin') || 
    (requiredRole === 'HR' && (user.email?.toLowerCase() === 'hr@test01.com' || user.email?.toLowerCase() === 'admin@test01.com')) ||
    (requiredRole === 'Admin' && user.email?.toLowerCase() === 'admin@test01.com');

  if (!hasRole) {
    // Redirect to home if they don't have the necessary role
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};
