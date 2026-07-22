import React, { useState } from 'react';
import { ChevronDown, ChevronsUpDown, X, User } from 'lucide-react';

export default function PayrollGroup() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedGroupForDrawer, setSelectedGroupForDrawer] = useState<any>(null);
  const [viewingEmployee, setViewingEmployee] = useState<any>(null);
  const [isCreateNewDrawerOpen, setIsCreateNewDrawerOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');
  const [newPayrollType, setNewPayrollType] = useState('');

  const groups = [
    { id: '1', name: 'Monthly Payroll (No Compliance)', count: 8, createdOn: '13 February 2026', editedOn: '13 February 2026' },
    { id: '2', name: 'Hourly Payroll', count: 0, createdOn: '13 February 2026', editedOn: '13 February 2026' },
    { id: '3', name: 'Monthly Payroll (With Compliance)', count: 11, createdOn: '13 February 2026', editedOn: '13 February 2026' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Payroll Group <span style={{ color: '#0ea5e9' }}>({groups.length})</span>
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Assign Group
          </button>
          <button 
            onClick={() => setIsCreateNewDrawerOpen(true)}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Create New
          </button>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem', minHeight: '400px' }}>
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '6px 0 0 6px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Group Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Count
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Created On
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Last Edited On
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '0 6px 6px 0' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {groups.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((group) => (
              <tr key={group.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>
                  {group.name}
                  <span style={{ backgroundColor: '#e0f2fe', color: '#0ea5e9', padding: '0.125rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '500', marginLeft: '0.5rem' }}>Default</span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>
                  <span 
                    onClick={() => setSelectedGroupForDrawer(group)}
                    style={{ color: '#0ea5e9', textDecoration: 'underline', cursor: 'pointer', fontWeight: '500' }}
                  >
                    {group.count}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {group.createdOn}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {group.editedOn}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  -
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </div>

      {/* Footer / Pagination */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>{groups.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{Math.min(currentPage * pageSize, groups.length)}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{groups.length}</span> Results
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
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
            
            {Array.from({ length: Math.ceil(groups.length / pageSize) || 1 }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx + 1)} 
                style={{ 
                  backgroundColor: currentPage === idx + 1 ? '#0ea5e9' : 'white', 
                  border: 'none', 
                  borderRight: idx < Math.ceil(groups.length / pageSize) - 1 ? '1px solid #d1d5db' : 'none', 
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
              onClick={() => setCurrentPage(Math.min(Math.ceil(groups.length / pageSize), currentPage + 1))} 
              style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: currentPage >= Math.ceil(groups.length / pageSize) ? '#d1d5db' : '#0ea5e9', cursor: currentPage >= Math.ceil(groups.length / pageSize) ? 'default' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Employees Drawer Overlay */}
      {selectedGroupForDrawer && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          
          {/* Drawer Panel */}
          <div style={{ 
            width: '100%', maxWidth: '600px', backgroundColor: 'white', height: '100%', maxHeight: '100%',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', backgroundColor: '#f0f9ff', borderBottom: '1px solid #e0f2fe' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0369a1' }}>
                {selectedGroupForDrawer.name} - Employees
              </h3>
              <button 
                onClick={() => setSelectedGroupForDrawer(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              <div style={{ marginBottom: '1rem' }}>
                <span style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 0.75rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'inline-block' }}>
                  Active: {selectedGroupForDrawer.count}
                </span>
              </div>

              <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
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
                    {selectedGroupForDrawer.count === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: '2rem 1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                          No employees found for this group.
                        </td>
                      </tr>
                    ) : (
                      Array.from({ length: selectedGroupForDrawer.count }).map((_, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                            EMP{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                            {['Atharva Kale', 'Himanshu Dhote', 'Vedant Lonare', 'Pratik Wankhede'][idx % 4]}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.375rem' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                              <span style={{ color: '#10b981', fontWeight: '500' }}>Active</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                            <span 
                              onClick={() => setViewingEmployee({
                                id: `EMP${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
                                name: ['Atharva Kale', 'Himanshu Dhote', 'Vedant Lonare', 'Pratik Wankhede'][idx % 4],
                                dept: 'Operations',
                                role: selectedGroupForDrawer.name,
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
        </div>
      )}

      {/* Create New Drawer Overlay */}
      {isCreateNewDrawerOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          
          <div style={{ 
            width: '100%', maxWidth: '500px', backgroundColor: 'white', height: '100%', maxHeight: '100%',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', backgroundColor: '#f0f9ff', borderBottom: '1px solid #e0f2fe' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>
                New Payroll Group
              </h3>
              <button 
                onClick={() => setIsCreateNewDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Group Name<span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input 
                  type="text" 
                  value={newGroupName}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder="Enter Name"
                  style={{ padding: '0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', color: '#111827', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>
                  Payroll Type<span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={newPayrollType}
                    onChange={(e) => setNewPayrollType(e.target.value)}
                    style={{ width: '100%', padding: '0.625rem 2.5rem 0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', color: newPayrollType ? '#111827' : '#9ca3af', outline: 'none', appearance: 'none', backgroundColor: 'white' }}
                  >
                    <option value="" disabled hidden>Select Payroll Type</option>
                    <option value="Monthly Without Compliance" style={{ color: '#111827' }}>Monthly Without Compliance</option>
                    <option value="Monthly With Compliance" style={{ color: '#111827' }}>Monthly With Compliance</option>
                    <option value="Hourly Payroll" style={{ color: '#111827' }}>Hourly Payroll</option>
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
                </div>
              </div>

            </div>

            {/* Footer */}
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f0f9ff', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                onClick={() => setIsCreateNewDrawerOpen(false)}
                style={{ padding: '0.5rem 1.5rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#374151', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
              >
                Close
              </button>
              <button 
                disabled={!newGroupName || !newPayrollType}
                style={{ padding: '0.5rem 1.5rem', border: 'none', borderRadius: '6px', backgroundColor: (!newGroupName || !newPayrollType) ? '#cbd5e1' : '#0ea5e9', color: (!newGroupName || !newPayrollType) ? '#f8fafc' : 'white', fontSize: '0.875rem', fontWeight: '500', cursor: (!newGroupName || !newPayrollType) ? 'not-allowed' : 'pointer' }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {viewingEmployee && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 110 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', animation: 'fadeIn 0.2s ease-out' }}>
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
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
