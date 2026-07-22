import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {  LayoutDashboard, Users, Briefcase, FileText, ListTodo, ChevronDown, ChevronRight, LogOut, UserPlus , Menu } from 'lucide-react';

export default function HRAdminWrapper() {
  const { user, signOut } = useAuthStore();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setOpenMenus(prev => ({ ...prev, [name]: !prev[name] }));
  };

    const navItems: any[] = [
    { isHeader: true, name: 'Core' },
    { name: 'Dashboard', path: '/hr-admin/dashboard', icon: <LayoutDashboard size={20} /> },
    
    { isHeader: true, name: 'Onboarding & Setup' },
    { name: 'Onboarding', path: '/hr-admin/onboarding', icon: <UserPlus size={20} color="#0ea5e9" /> },
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
    { name: 'Payroll', icon: <Briefcase size={20} />, children: [
        { name: 'Bulk Attendance', path: '/hr-admin/bulk-attendance' },
        { name: 'Process Payroll', path: '/hr-admin/process-payroll' },
        { name: 'Payroll Group', path: '/hr-admin/payroll-group' },
        { name: 'Assign Payroll Group', path: '/hr-admin/assign-payroll-group' },
        { name: 'Finalized Details', path: '/hr-admin/finalized-payroll' }
    ]},
    
    { isHeader: true, name: 'Employee Management' },
    { name: 'Employees', icon: <Users size={20} />, children: [
        { name: 'Employees', path: '/hr-admin/employees' },
        { name: 'Departments', path: '/hr-admin/departments' },
        { name: 'Designations', path: '/hr-admin/designations' },
        { name: 'Attendance Permission', path: '/hr-admin/attendance-permission' },
        { name: 'Manage Branch', path: '/hr-admin/manage-branch' }
    ]},
    { name: 'Approval Requests', path: '/hr-admin/approvals', icon: <ListTodo size={20} /> },
    { name: 'Settlements', icon: <Briefcase size={20} />, children: [
        { name: 'Loan & Advance', path: '/hr-admin/loan-advance' },
        { name: 'Arrears', path: '/hr-admin/arrears' }
    ]},
    
    { isHeader: true, name: 'Administration' },
    { name: 'Reports', icon: <FileText size={20} />, children: [
        { name: 'Attendance Master', path: '/hr-admin/attendance-master' },
        { name: 'Shift Wise Report', path: '/hr-admin/shift-wise-report' },
        { name: 'Daily Punch Report', path: '/hr-admin/daily-punch-report' },
        { name: 'Working Hours Report', path: '/hr-admin/working-hours-report' },
        { name: 'Muster Report', path: '/hr-admin/muster-report' },
        { name: 'Org Wise Punch', path: '/hr-admin/org-wise-punch' }
    ]},
    { name: 'Activity Logs', path: '/hr-admin/activity-logs', icon: <ListTodo size={20} /> },

  ];

  if (user?.email === 'admin@test01.com') {
    navItems.push(
      { isHeader: true, name: 'Admin Management' },
      { name: 'HR Approval', path: '/hr-admin/hr-approval', icon: <ListTodo size={20} /> },
      { name: 'User Management', path: '/hr-admin/user-management', icon: <Users size={20} /> }
    );
  }

  return (
    <div className="dashboard-bg" style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      
      {/* Mobile Hamburger Header */}
      <div className="mobile-only" style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '4rem',
        background: '#FFFFFF',
        display: 'flex', alignItems: 'center', padding: '0 1rem',
        borderBottom: '1px solid var(--border-light)', zIndex: 50,
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--text-emerald)', cursor: 'pointer', padding: '0.625rem 1rem', display: 'flex', alignItems: 'center' }}>
          <Menu size={24} />
        </button>
        <span style={{ marginLeft: '0.75rem', fontWeight: '700', color: 'var(--text-emerald)', fontSize: '1.2rem', flex: 1 }}>Helix Synapse</span>
        <Link to="/profile" style={{ textDecoration: 'none' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--text-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold', fontSize: '0.85rem' }}>
            {user?.email?.charAt(0).toUpperCase()}
          </div>
        </Link>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="mobile-only"
          onClick={() => setIsMobileMenuOpen(false)}
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', zIndex: 900, backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }} 
        />
      )}
      
      {/* Top Header */}
      <header className="desktop-only" style={{ 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '1rem 2rem', borderBottom: '1px solid var(--border-color)', 
        background: 'var(--sidebar-bg)', zIndex: 20 
      }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', width: '14rem' }}>
          <img src="/logo.png" alt="Logo" style={{ width: '2.5rem', height: '2.5rem', objectFit: 'contain', borderRadius: '8px' }} />
          <h2 style={{ fontSize: '1.25rem', margin: 0, fontWeight: '700', color: 'var(--primary)' }}>HR PAYROLL</h2>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-color)' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-color)', lineHeight: 1.2 }}>
                {user?.email?.split('@')[0]}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--primary)' }}>HR</span>
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
        <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`} style={{ 
          width: '16rem', backgroundColor: 'var(--sidebar-bg)', 
          borderRight: '1px solid var(--border-color)', display: 'flex', 
          flexDirection: 'column', paddingTop: '1.5rem', overflowY: 'auto' 
        }}>
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingLeft: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src="/logo.png" alt="Helix Synapse Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: 'var(--text-emerald)' }}>Helix Synapse</h2>
          </div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, padding: '0 1rem' }}>
            {navItems.map((item, index) => {
              
              if (item.isHeader) {
                return (
                  <div key={`header-${index}`} style={{ 
                    marginTop: index === 0 ? '0' : '1.5rem', 
                    paddingTop: index === 0 ? '0' : '1.5rem',
                    borderTop: index === 0 ? 'none' : '1px solid #e5e7eb',
                    marginBottom: '0.5rem', 
                    paddingLeft: '1rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '700', 
                    color: '#9ca3af', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em' 
                  }}>
                    {item.name}
                  </div>
                );
              }
              
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
                        color: isActive ? 'var(--text-emerald)' : 'var(--text-muted)', fontWeight: isActive ? '600' : '500', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s ease', width: '100%', justifyContent: 'space-between', fontSize: '1rem', fontFamily: 'inherit'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
                        <div style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</div> 
                        <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.name}</span>
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex' }}>
                        {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      </div>
                    </button>
                    
                    {isOpen && (
                      <div style={{ display: 'flex', flexDirection: 'column', marginLeft: '2.5rem', marginTop: '0.5rem', gap: '0.25rem' }}>
                        {item.children.map((subItem: any) => {
                          const isSubActive = location.pathname === subItem.path;
                          return (
                            <Link 
                              key={subItem.path} 
                              to={subItem.path}
                              style={{
                                padding: '0.625rem 1rem', textDecoration: 'none',
                                background: isSubActive ? 'var(--text-emerald)' : 'transparent', color: isSubActive ? 'white' : 'var(--text-main)', fontWeight: isSubActive ? '600' : '400', fontSize: '0.9rem', transition: 'all 0.2s ease', boxShadow: isSubActive ? '0 4px 12px rgba(35, 127, 112, 0.2)' : 'none', borderRadius: '8px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                              }}
                             onClick={() => setIsMobileMenuOpen(false)}>
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
                    background: isActive ? 'var(--text-emerald)' : 'transparent', color: isActive ? 'white' : 'var(--text-main)', fontWeight: isActive ? '600' : '400', transition: 'all 0.2s ease', fontSize: '1rem', boxShadow: isActive ? '0 4px 12px rgba(35, 127, 112, 0.2)' : 'none'
                  }}
                 onClick={() => setIsMobileMenuOpen(false)}>
                  <div style={{ flexShrink: 0, display: 'flex' }}>{item.icon}</div>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{item.name}</span>
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
