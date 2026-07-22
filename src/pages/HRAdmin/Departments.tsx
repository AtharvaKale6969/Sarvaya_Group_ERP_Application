import { useState } from 'react';
import { ChevronDown, ChevronsUpDown, MoreVertical, Filter, X, User } from 'lucide-react';

export default function Departments() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedDeptForDrawer, setSelectedDeptForDrawer] = useState<any>(null);
  const [viewingEmployee, setViewingEmployee] = useState<any>(null);

  const initialDepartments = [
    // Plastroots Waste Management & Solutions Private Limited
    { id: '1', name: 'RMT', count: 12, org: 'Plastroots Waste Management & Solutions Private Limited' },
    { id: '2', name: 'Government Services', count: 4, org: 'Plastroots Waste Management & Solutions Private Limited' },
    { id: '3', name: 'Corporate Compliance', count: 7, org: 'Plastroots Waste Management & Solutions Private Limited' },
    // Plastroots Foundation
    { id: '4', name: 'CSR', count: 3, org: 'Plastroots Foundation' },
    { id: '5', name: 'IEC', count: 2, org: 'Plastroots Foundation' },
    { id: '6', name: 'RRC', count: 5, org: 'Plastroots Foundation' },
    // Shetahit Farm Solutions Private Limited
    { id: '7', name: 'FVF', count: 6, org: 'Shetahit Farm Solutions Private Limited' },
    { id: '8', name: 'MPD', count: 4, org: 'Shetahit Farm Solutions Private Limited' },
    // Geoclaim Energy Private Limited
    { id: '9', name: 'Biogas', count: 8, org: 'Geoclaim Energy Private Limited' },
    { id: '10', name: 'Biomass', count: 5, org: 'Geoclaim Energy Private Limited' },
    { id: '11', name: 'Shredding Unit', count: 3, org: 'Geoclaim Energy Private Limited' },
    { id: '12', name: 'PMS', count: 2, org: 'Geoclaim Energy Private Limited' },
    // Aayuneer Enterprises
    { id: '13', name: 'Flow Up', count: 4, org: 'Aayuneer Enterprises' },
    { id: '14', name: 'Zoo Platform', count: 6, org: 'Aayuneer Enterprises' },
    // Saravya Group
    { id: '15', name: 'HQ / Operations', count: 9, org: 'Saravya Group' }
  ];

  const organizations = [
    'All Organizations',
    'Plastroots Waste Management & Solutions Private Limited',
    'Plastroots Foundation',
    'Shetahit Farm Solutions Private Limited',
    'Geoclaim Energy Private Limited',
    'Aayuneer Enterprises',
    'Saravya Group'
  ];

  const filteredDepartments = selectedOrg === 'All Organizations' 
    ? initialDepartments 
    : initialDepartments.filter(d => d.org === selectedOrg);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Departments <span style={{ color: '#0ea5e9' }}>({filteredDepartments.length})</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Filter size={16} style={{ color: '#6b7280', position: 'absolute', left: '0.75rem' }} />
            <select 
              value={selectedOrg}
              onChange={(e) => { setSelectedOrg(e.target.value); setCurrentPage(1); }}
              style={{ 
                padding: '0.5rem 2rem 0.5rem 2.25rem', 
                border: '1px solid #d1d5db', 
                borderRadius: '6px', 
                fontSize: '0.875rem', 
                backgroundColor: 'white',
                color: '#374151',
                appearance: 'none',
                cursor: 'pointer',
                maxWidth: '250px',
                textOverflow: 'ellipsis'
              }}
            >
              {organizations.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', color: '#6b7280', pointerEvents: 'none' }} />
          </div>

          <button style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Add New
          </button>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem', minHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '6px 0 0 6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Department Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Count
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center', borderRadius: '0 6px 6px 0', width: '100px' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredDepartments.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((dept) => (
              <tr key={dept.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>
                  {dept.name}
                  {selectedOrg === 'All Organizations' && (
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.125rem' }}>{dept.org}</span>
                  )}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>
                  <span 
                    onClick={() => setSelectedDeptForDrawer(dept)}
                    style={{ color: '#0ea5e9', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }}
                  >
                    {dept.count}
                  </span>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button 
                      onClick={() => toggleDropdown(`action-${dept.id}`)}
                      style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.375rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex' }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === `action-${dept.id}` && (
                      <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '120px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                        <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>Edit</button>
                        <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#ef4444' }}>Delete</button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>{filteredDepartments.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{Math.min(currentPage * pageSize, filteredDepartments.length)}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{filteredDepartments.length}</span> Results
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <select 
              value={pageSize} 
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer', backgroundColor: 'white' }}
            >
              <option value={10}>10 / Page</option>
              <option value={20}>20 / Page</option>
              <option value={50}>50 / Page</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#374151' }} />
          </div>
          
          <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
            <button 
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} 
              style={{ background: 'white', border: 'none', borderRight: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: currentPage === 1 ? '#d1d5db' : '#6b7280', cursor: currentPage === 1 ? 'default' : 'pointer' }}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.ceil(filteredDepartments.length / pageSize) || 1 }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx + 1)} 
                style={{ 
                  backgroundColor: currentPage === idx + 1 ? '#0ea5e9' : 'white', 
                  border: 'none', 
                  borderRight: idx < Math.ceil(filteredDepartments.length / pageSize) - 1 ? '1px solid #d1d5db' : 'none', 
                  padding: '0.375rem 0.75rem', 
                  fontSize: '0.875rem', 
                  color: currentPage === idx + 1 ? 'white' : '#0ea5e9', 
                  fontWeight: currentPage === idx + 1 ? '500' : 'normal', 
                  cursor: 'pointer' 
                }}
              >
                {idx + 1}
              </button>
            ))}

            <button 
              onClick={() => setCurrentPage(Math.min(Math.ceil(filteredDepartments.length / pageSize), currentPage + 1))} 
              style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: currentPage >= Math.ceil(filteredDepartments.length / pageSize) ? '#d1d5db' : '#0ea5e9', cursor: currentPage >= Math.ceil(filteredDepartments.length / pageSize) ? 'default' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Employees Drawer Overlay */}
      {selectedDeptForDrawer && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 50, display: 'flex', justifyContent: 'flex-end' }}>
          
          {/* Drawer Panel */}
          <div style={{ 
            width: '100%', maxWidth: '600px', backgroundColor: 'white', height: '100%', 
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', backgroundColor: '#f0f9ff', borderBottom: '1px solid #e0f2fe' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0369a1' }}>
                {selectedDeptForDrawer.name} - Employees
              </h3>
              <button 
                onClick={() => setSelectedDeptForDrawer(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <span style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 0.75rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'inline-block' }}>
                  Active: {selectedDeptForDrawer.count}
                </span>
              </div>

              <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Employee ID</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Employee Name</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Employee Tag</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedDeptForDrawer.count === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: '2rem 1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                          No employees found in this department.
                        </td>
                      </tr>
                    ) : (
                      Array.from({ length: selectedDeptForDrawer.count }).map((_, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                            EMP{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                            {['Atharva Kale', 'Himanshu Dhote', 'Vedant Lonare', 'Pratik Wankhede'][idx % 4]}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                              <span style={{ color: '#10b981', fontWeight: '500' }}>Active</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                            <span 
                              onClick={() => setViewingEmployee({
                                id: `EMP${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
                                name: ['Atharva Kale', 'Himanshu Dhote', 'Vedant Lonare', 'Pratik Wankhede'][idx % 4],
                                dept: selectedDeptForDrawer.name,
                                role: 'Team Member',
                                status: 'Active',
                                date: '01 Jan 2026'
                              })}
                              style={{ color: '#0ea5e9', textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer' }}
                            >
                              View Profile
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {viewingEmployee && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setViewingEmployee(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                <User size={40} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>{viewingEmployee.name}</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{viewingEmployee.id}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Department</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{viewingEmployee.dept}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Designation</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{viewingEmployee.role}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Status</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: viewingEmployee.status === 'Active' ? '#10b981' : '#ef4444' }}>{viewingEmployee.status}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Date of Joining</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{viewingEmployee.date}</p>
              </div>
            </div>

            <button onClick={() => setViewingEmployee(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem' }}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
