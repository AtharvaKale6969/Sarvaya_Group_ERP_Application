import { Outlet, Navigate, useLocation } from 'react-router-dom';

export default function PipelineWrapper() {
  const location = useLocation();

  // Auto redirect to all-calls if at root
  if (location.pathname === '/pipeline' || location.pathname === '/pipeline/') {
    return <Navigate to="all-calls" replace />;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.75rem', color: 'var(--text-heading)', margin: '0 0 0.25rem 0' }}>Calling Pipeline</h1>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem' }}>RMT - Plastroots waste management and solutions private limited</p>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}
