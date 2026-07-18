import { Outlet } from 'react-router-dom';

export default function HR() {
  return (
    <div className="animate-entrance" style={{ maxWidth: '1200px', margin: '0 auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-heading)', margin: '0 0 0.25rem 0' }}>
          HR Services
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
          Manage your leaves, track asset requests, file expenses, and view payslips.
        </p>
      </header>

      {/* Tab Content populated by React Router Outlet */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <Outlet />
      </div>
    </div>
  );
}
