import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Download, Filter } from 'lucide-react';

export default function OpsWrapper() {
  const location = useLocation();
  const navigate = useNavigate();

  const tabs = [
    { label: 'Inward', path: '/ops/inward' },
    { label: 'Outward', path: '/ops/outward' },
    { label: 'All Entries', path: '/ops/all-entries' },
    { label: 'Notes', path: '/ops/notes' }
  ];

  return (
    <div className="animate-entrance" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-heading)', fontSize: '2rem', letterSpacing: '-0.5px' }}>Operations Workspace</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)' }}>Manage incoming materials, dispatches, and financial adjustments.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <Filter size={18} /> Filter
          </button>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '0.75rem 1.25rem', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.02)' }}>
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-light)' }}>
        {tabs.map(tab => {
          const isActive = location.pathname.includes(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0 0 1rem 0',
                color: isActive ? 'var(--text-emerald)' : 'var(--text-muted)',
                fontWeight: isActive ? '600' : '500',
                fontSize: '1rem',
                cursor: 'pointer',
                borderBottom: isActive ? '3px solid var(--text-emerald)' : '3px solid transparent',
                transition: 'all 0.2s',
                marginBottom: '-1px'
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div>
        <Outlet />
      </div>

    </div>
  );
}
