import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LayoutDashboard, Users, Briefcase, FileText, ListTodo, ChevronDown, ChevronRight, LogOut } from 'lucide-react';

export default function HRAdminWrapper() {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const navItems = [
    { name: 'Dashboard', path: '/hr-admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { isSeparator: true },
    { name: 'Employees', icon: <Users size={20} />, children: [
        { name: 'Employees', path: '/hr-admin/employees' },
        { name: 'Departments', path: '/hr-admin/departments' },
        { name: 'Designations', path: '/hr-admin/designations' },
        { name: 'Attendance Permission', path: '/hr-admin/attendance-permission' },
        { name: 'Manage Branch', path: '/hr-admin/manage-branch' }
    ]},
    { name: 'Manage Shifts', icon: <Briefcase size={20} />, children: [
        { name: 'Shifts', path: '/hr-admin/shifts' },
        { name: 'Shift Assignment', path: '/hr-admin/shift-assignment' },
        { name: 'Week Off', path: '/hr-admin/week-off' },
        { name: 'Roster', path: '/hr-admin/roster' }
    ]},
    { name: 'Leaves & Holidays', icon: <FileText size={20} />, children: [
        { name: 'Leave Create', path: '/hr-admin/leave-create' },
        { name: 'Leave Assign', path: '/hr-admin/leave-assign' },
        { name: 'Leave Balance', path: '/hr-admin/leave-balance' },
        { name: 'Holiday Create', path: '/hr-admin/holiday-create' },
        { name: 'Holiday Assign', path: '/hr-admin/holiday-assign' }
    ]},
    { name: 'Approval Requests', path: '/hr-admin/approvals', icon: <ListTodo size={20} /> },
    { name: 'Payroll', icon: <Briefcase size={20} />, children: [
        { name: 'Bulk Attendance', path: '/hr-admin/bulk-attendance' },
        { name: 'Process Payroll', path: '/hr-admin/process-payroll' },
        { name: 'Payroll Group', path: '/hr-admin/payroll-group' },
        { name: 'Assign Payroll Group', path: '/hr-admin/assign-payroll-group' },
        { name: 'Finalized Details', path: '/hr-admin/finalized-payroll' }
    ]},
    { name: 'Settlements', icon: <Briefcase size={20} />, children: [
        { name: 'Loan & Advance', path: '/hr-admin/loan-advance' },
        { name: 'Arrears', path: '/hr-admin/arrears' }
    ]},
    { name: 'Reports', icon: <FileText size={20} />, children: [
        { name: 'Attendance Master', path: '/hr-admin/attendance-master' },
        { name: 'Shift Wise Report', path: '/hr-admin/shift-wise-report' },
        { name: 'Daily Punch Report', path: '/hr-admin/daily-punch-report' },
        { name: 'Working Hours Report', path: '/hr-admin/working-hours-report' },
        { name: 'Muster Report', path: '/hr-admin/muster-report' },
        { name: 'Branch Wise Punch', path: '/hr-admin/branch-wise-punch' }
    ]},
    { name: 'Activity Logs', path: '/hr-admin/activity-logs', icon: <ListTodo size={20} /> },
  ];

  return (
    <div className="dashboard-bg" style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      
      {/* Top Header */}
      <header style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', 
        backgroundColor: 'var(--card-bg)', zIndex: 20 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '14rem' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700', color: 'var(--primary)' }}>HR PAYROLL</h2>
        </div>

        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', lineHeight: 1.2 }}>
                {user?.email?.split('@')[0]}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>HR Admin</span>
            </div>
            <div style={{ 
              width: '2.5rem', height: '2.5rem', borderRadius: '50%', 
              backgroundColor: 'var(--primary)', display: 'flex', alignItems: 'center', 
              justifyContent: 'center', color: 'white', fontWeight: 'bold' 
            }}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout Area */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Sidebar */}
        <aside style={{ 
          width: '16rem', backgroundColor: 'var(--card-bg)', 
          borderRight: '1px solid var(--border-color)', display: 'flex', 
          flexDirection: 'column', paddingTop: '1.5rem', overflowY: 'auto' 
        }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, padding: '0 1rem' }}>
            {navItems.map((item, index) => {
              if (item.isSeparator) {
                return <div key={`sep-${index}`} style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0.5rem 0' }} />;
              }
              
              const isActive = item.path ? location.pathname.startsWith(item.path) : false;
              
              if (item.children) {
                const isOpen = openMenus[item.name] || false;
                
                return (
                  <div key={item.name} style={{ display: 'flex', flexDirection: 'column' }}>
                    <button 
                      onClick={() => toggleMenu(item.name)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.875rem 1rem', borderRadius: '12px', border: 'none',
                        backgroundColor: 'transparent',
                        color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                        fontWeight: isActive ? '600' : '500', cursor: 'pointer',
                        textAlign: 'left', transition: 'all 0.2s', width: '100%',
                        justifyContent: 'space-between', fontSize: '0.875rem'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        {item.icon} {item.name}
                      </div>
                      {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                    
                    {isOpen && (
                      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2.5rem', marginTop: '0.5rem', gap: '0.25rem' }}>
                        {item.children.map(subItem => {
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <Link 
                              key={subItem.path} 
                              to={subItem.path}
                              style={{
                                padding: '0.5rem', textDecoration: 'none',
                                color: isSubActive ? 'var(--text-color)' : 'var(--text-muted)',
                                fontWeight: isSubActive ? '600' : '500',
                                fontSize: '0.875rem', transition: 'all 0.2s'
                              }}
                            >
                              {subItem.name}
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link 
                  key={item.path} 
                  to={item.path || ''}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.875rem 1rem', borderRadius: '12px', textDecoration: 'none',
                    backgroundColor: isActive ? 'rgba(0, 163, 114, 0.05)' : 'transparent',
                    color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                    fontWeight: isActive ? '600' : '500', transition: 'all 0.2s',
                    fontSize: '0.875rem'
                  }}
                >
                  {item.icon}
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <button 
            onClick={signOut}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem',
              padding: '0.875rem 1rem', borderRadius: '12px', backgroundColor: 'var(--surface-color)',
              color: 'var(--text-color)', fontWeight: '500', cursor: 'pointer',
              marginTop: 'auto', border: '1px solid var(--border-color)',
              margin: '0 1rem 1.5rem', fontSize: '0.875rem'
            }}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <main style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
