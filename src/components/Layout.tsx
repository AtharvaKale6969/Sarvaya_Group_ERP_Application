import { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { useContextStore, ORGANIZATIONS, ROLES } from '../store/useContextStore';
import { LayoutDashboard, Briefcase, Users, FileText, LogOut, Menu, ChevronDown, ChevronRight, Building, Shield, ListTodo, Kanban } from 'lucide-react';

export default function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHrOpen, setIsHrOpen] = useState(false);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const { user, roles: userRoles, signOut } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept, activeRole, setActiveOrg, setActiveDept, setActiveSubDept, setActiveRole } = useContextStore();
  const location = useLocation();

  const currentOrg = ORGANIZATIONS.find(o => o.name === activeOrg);
  const currentDept = currentOrg?.departments.find(d => d.name === activeDept);

  const isHR = userRoles.some(r => r.name === 'HR Admin' || r.name === 'Super Admin');
  const hasTracksheets = userRoles.some(r => r.name === 'Employee' || r.name === 'Manager' || r.name === 'Super Admin');

  const hrSubItems = [
    { name: 'Leaves', path: '/hr/leaves' },
    { name: 'Calendar', path: '/hr/calendar' },
    { name: 'Assets', path: '/hr/assets' },
    { name: 'Expenses', path: '/hr/expenses' },
    { name: 'Payslips', path: '/hr/payslips' }
  ];

  const navItems = [
    { name: 'Home', path: '/home', icon: <LayoutDashboard size={20} /> },
    { name: 'Workline', path: '/workline', icon: <ListTodo size={20} /> },
    { name: 'HR', path: '/hr', icon: <Briefcase size={20} />, children: hrSubItems },
    { isSeparator: true },
    ...(activeRole === 'BDE' ? [{ 
      name: 'Workspace', 
      path: '/pipeline', 
      icon: <Kanban size={20} />,
      children: [
        { name: 'All Calls', path: '/pipeline/all-calls' },
        { name: 'Pipeline', path: '/pipeline/pipeline' },
        { name: 'Onboarded', path: '/pipeline/onboarded' },
        { name: 'Calendar', path: '/pipeline/calendar' }
      ]
    }] : []),
    ...(activeRole === 'Ops' ? [{ 
      name: 'Operations', 
      path: '/ops', 
      icon: <Kanban size={20} />,
      children: [
        { name: 'Inward', path: '/ops/inward' },
        { name: 'Outward', path: '/ops/outward' },
        { name: 'All Entries', path: '/ops/all-entries' },
        { name: 'Notes', path: '/ops/notes' }
      ]
    }] : []),
    ...(hasTracksheets ? [{ name: 'Tracksheets', path: '/tracksheets', icon: <FileText size={20} /> }] : []),
    ...(isHR ? [{ name: 'Admin', path: '/admin', icon: <Users size={20} /> }] : []),
  ];

  return (
    <div className="dashboard-bg" style={{ display: 'flex', flexDirection: 'column', height: '100vh', position: 'relative' }}>
      
      {/* Mobile Hamburger Header */}
      <div className="mobile-only" style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '4rem',
        background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', padding: '0 1rem',
        borderBottom: '1px solid var(--border-light)', zIndex: 50,
        boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
      }}>
        <button onClick={() => setIsMobileMenuOpen(true)} style={{ background: 'none', border: 'none', color: 'var(--text-emerald)', cursor: 'pointer', padding: '0.5rem', display: 'flex', alignItems: 'center' }}>
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

      {/* Top Desktop Header (Full Width) */}
      <header className="desktop-only" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '1rem 2rem', borderBottom: '1px solid var(--border-light)',
        background: 'white', zIndex: 20
      }}>
        {/* Left Side: Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '220px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <img src="/logo.png" alt="Helix Synapse Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }} />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700', margin: 0, color: 'var(--text-emerald)' }}>Helix Synapse</h2>
        </div>

        {/* Middle/Right: Organization Details & Avatar */}
        <div style={{ display: 'flex', gap: '3rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
               <Building size={16} color="var(--text-emerald)" style={{ flexShrink: 0 }} /> 
               <select value={activeOrg} onChange={e => setActiveOrg(e.target.value)} style={{ width: '220px', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer', textOverflow: 'ellipsis' }}>
                 {ORGANIZATIONS.map(org => <option key={org.name} value={org.name}>{org.name}</option>)}
               </select>
             </div>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
               <Briefcase size={16} color="var(--text-emerald)" style={{ flexShrink: 0 }} />
               <select value={activeDept} onChange={e => setActiveDept(e.target.value)} style={{ width: '130px', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer', textOverflow: 'ellipsis' }}>
                 {currentOrg?.departments.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
               </select>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: currentDept?.subDepartments ? 'var(--surface-bg)' : '#f1f5f9', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', opacity: currentDept?.subDepartments ? 1 : 0.6 }}>
               <Briefcase size={16} color={currentDept?.subDepartments ? 'var(--text-emerald)' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
               <select disabled={!currentDept?.subDepartments} value={activeSubDept || ''} onChange={e => setActiveSubDept(e.target.value)} style={{ width: '130px', border: 'none', background: 'transparent', outline: 'none', color: currentDept?.subDepartments ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: '600', cursor: currentDept?.subDepartments ? 'pointer' : 'not-allowed', textOverflow: 'ellipsis' }}>
                 {currentDept?.subDepartments 
                   ? currentDept.subDepartments.map(sd => <option key={sd} value={sd}>{sd}</option>)
                   : <option value="">No Sub-Depts</option>}
               </select>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg)', padding: '0.4rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
               <Shield size={16} color="var(--text-emerald)" style={{ flexShrink: 0 }} />
               <select value={activeRole} onChange={e => setActiveRole(e.target.value)} style={{ width: '80px', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer', textOverflow: 'ellipsis' }}>
                 {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
               </select>
             </div>

          </div>
          
          <Link to="/profile" style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-light)' }}>
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)', lineHeight: '1.2' }}>{user?.email?.split('@')[0]}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-emerald)' }}>Active</span>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--text-emerald)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 'bold' }}>
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          </Link>
        </div>
      </header>

      {/* Main Layout Area below Header */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        
        {/* Sidebar */}
        <aside className={`sidebar ${isMobileMenuOpen ? 'open' : ''}`} style={{ paddingTop: '1.5rem' }}>
          
          <div className="mobile-only" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <img src="/logo.png" alt="Helix Synapse Logo" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }} />
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: 'var(--text-emerald)' }}>Helix Synapse</h2>
          </div>

          {/* Mobile Context Switcher */}
          <div className="mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
               <Building size={16} color="var(--text-emerald)" style={{ flexShrink: 0 }} /> 
               <select value={activeOrg} onChange={e => setActiveOrg(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer', textOverflow: 'ellipsis' }}>
                 {ORGANIZATIONS.map(org => <option key={org.name} value={org.name}>{org.name}</option>)}
               </select>
             </div>
             
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
               <Briefcase size={16} color="var(--text-emerald)" style={{ flexShrink: 0 }} />
               <select value={activeDept} onChange={e => setActiveDept(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer', textOverflow: 'ellipsis' }}>
                 {currentOrg?.departments.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
               </select>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: currentDept?.subDepartments ? 'var(--surface-bg)' : '#f1f5f9', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)', opacity: currentDept?.subDepartments ? 1 : 0.6 }}>
               <Briefcase size={16} color={currentDept?.subDepartments ? 'var(--text-emerald)' : 'var(--text-muted)'} style={{ flexShrink: 0 }} />
               <select disabled={!currentDept?.subDepartments} value={activeSubDept || ''} onChange={e => setActiveSubDept(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: currentDept?.subDepartments ? 'var(--text-main)' : 'var(--text-muted)', fontWeight: '600', cursor: currentDept?.subDepartments ? 'pointer' : 'not-allowed', textOverflow: 'ellipsis' }}>
                 {currentDept?.subDepartments 
                   ? currentDept.subDepartments.map(sd => <option key={sd} value={sd}>{sd}</option>)
                   : <option value="">No Sub-Depts</option>}
               </select>
             </div>

             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-bg)', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
               <Shield size={16} color="var(--text-emerald)" style={{ flexShrink: 0 }} />
               <select value={activeRole} onChange={e => setActiveRole(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', color: 'var(--text-main)', fontWeight: '600', cursor: 'pointer', textOverflow: 'ellipsis' }}>
                 {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
               </select>
             </div>
          </div>

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
            {navItems.map((item, index) => {
              if (item.isSeparator) {
                return <div key={`sep-${index}`} style={{ height: '1px', background: 'var(--border-light)', margin: '0.5rem 0' }} />;
              }
              
              const isActive = location.pathname.startsWith(item.path || '');
              
              if (item.children) {
                const isOpen = item.name === 'HR' ? isHrOpen : isWorkspaceOpen;
                const toggle = () => item.name === 'HR' ? setIsHrOpen(!isHrOpen) : setIsWorkspaceOpen(!isWorkspaceOpen);
                
                return (
                  <div key={item.path} style={{ display: 'flex', flexDirection: 'column' }}>
                    <button 
                      onClick={toggle}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.75rem',
                        padding: '0.875rem 1rem',
                        borderRadius: '12px', border: 'none', background: 'transparent',
                        color: isActive ? 'var(--text-emerald)' : 'var(--text-muted)',
                        fontWeight: isActive ? '600' : '500',
                        cursor: 'pointer', textAlign: 'left',
                        transition: 'all 0.2s ease',
                        width: '100%', justifyContent: 'space-between',
                        fontSize: '1rem',
                        fontFamily: 'inherit'
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
                              onClick={() => setIsMobileMenuOpen(false)}
                              style={{
                                padding: '0.5rem', textDecoration: 'none',
                                color: isSubActive ? 'var(--text-heading)' : 'var(--text-muted)',
                                fontWeight: isSubActive ? '600' : '500',
                                fontSize: '0.9rem',
                                transition: 'all 0.2s ease'
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
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.875rem 1rem',
                    borderRadius: '12px',
                    textDecoration: 'none',
                    color: isActive ? 'var(--text-emerald)' : 'var(--text-muted)',
                    background: isActive ? 'var(--surface-bg)' : 'transparent',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.2s ease'
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
              padding: '0.875rem 1rem',
              borderRadius: '12px',
              background: 'var(--surface-bg)',
              color: 'var(--text-main)',
              fontWeight: '500',
              cursor: 'pointer',
              marginTop: 'auto',
              border: '1px solid var(--border-light)',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'var(--accent-sage)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'var(--surface-bg)'}
          >
            <LogOut size={20} />
            Sign Out
          </button>
        </aside>

        {/* Main Content Area */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <main className="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
