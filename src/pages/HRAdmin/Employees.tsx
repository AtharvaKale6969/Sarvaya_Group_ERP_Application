import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronsUpDown, MoreVertical, Search, Filter, X, User } from 'lucide-react';

const initialEmployeesData = [
  { id: 'EMP014', name: 'Pratik Wankhede', branch: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', role: 'Team Lead', date: '12 Nov 2022', status: 'Active' },
  { id: 'EMP003', name: 'Nikhil Tumsare', branch: 'Plastroots Foundation', dept: 'CSR', role: 'Business Development Associate', date: '01 Apr 2026', status: 'Active' },
  { id: 'EMP020', name: 'Shweta Wakodikar', branch: 'Shetahit Farm Solutions Private Limited', dept: 'FVF', role: 'Finance Executive', date: '-', status: 'Active' },
  { id: 'EMP026', name: 'Vedant Lonare', branch: 'Geoclaim Energy Private Limited', dept: 'Biogas', role: 'Executive Data Analyst', date: '-', status: 'Active' },
  { id: 'EMP024', name: 'Aditya Khandekar', branch: 'Aayuneer Enterprises', dept: 'Zoo Platform', role: 'Business Development Associate', date: '-', status: 'Active' },
  { id: 'PF003', name: 'Himanshu Dhote', branch: 'Saravya Group', dept: 'HQ / Operations', role: 'Business Development Associate', date: '01 Apr 2026', status: 'Active' },
  { id: 'EMP032', name: 'Atharva Kale', branch: 'Plastroots Waste Management & Solutions Private Limited', dept: 'RMT', role: 'Data Analyst', date: '11 Dec 2025', status: 'Active' },
  { id: 'EMP033', name: 'Faizan Sheikh', branch: 'Plastroots Foundation', dept: 'IEC', role: 'Business Analyst', date: '01 May 2026', status: 'Active' },
  { id: 'EMP007', name: 'Ankit Bhalerao', branch: 'Shetahit Farm Solutions Private Limited', dept: 'FVF', role: 'Operations Head', date: '01 Jul 2023', status: 'Active' },
  { id: 'EMP031', name: 'Bhushan Chilange', branch: 'Geoclaim Energy Private Limited', dept: 'Biomass', role: 'Business Development Associate', date: '06 Feb 2026', status: 'Active' },
];

export default function Employees() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orgParam = searchParams.get('org');
  const deptParam = searchParams.get('dept');

  const [employees, setEmployees] = useState(initialEmployeesData);

  useEffect(() => {
    setEmployees(initialEmployeesData.filter(emp => {
      let match = true;
      if (orgParam && emp.branch !== orgParam) match = false;
      if (deptParam && emp.dept !== deptParam) match = false;
      return match;
    }));
  }, [orgParam, deptParam]);

  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [viewingEmployee, setViewingEmployee] = useState<any>(null);
  const [deletingEmployee, setDeletingEmployee] = useState<any>(null);

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const toggleRowSelect = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === employees.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(employees.map(emp => emp.id));
    }
  };

  const changeStatus = (id: string, newStatus: string) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, status: newStatus } : emp));
    setActiveDropdown(null);
  };

  const handleDelete = () => {
    if (deletingEmployee) {
      setEmployees(employees.filter(emp => emp.id !== deletingEmployee.id));
      setDeletingEmployee(null);
    }
  };

  const openEditModal = (emp: any) => {
    setEditingEmployee(emp);
    setIsAddModalOpen(true);
    setActiveDropdown(null);
  };

  const openAddModal = () => {
    navigate('/hr-admin/onboarding');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Total Active Employees <span style={{ color: '#0ea5e9' }}>{employees.filter(e => e.status === 'Active').length}</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={openAddModal}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Add Employee
          </button>
          <button style={{ backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Edit Columns
          </button>
          <button style={{ backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Attendance Permission
          </button>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => toggleDropdown('main-actions')}
              style={{ backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              Actions <ChevronDown size={14} />
            </button>
            {activeDropdown === 'main-actions' && (
              <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '150px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>Export to CSV</button>
                <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>Bulk Delete</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem', minHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.75rem 1rem', width: '40px', borderRadius: '6px 0 0 6px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === employees.length && employees.length > 0}
                  onChange={toggleSelectAll}
                  style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer' }} 
                />
              </th>
              {[
                { label: 'Employee ID', sortable: true },
                { label: 'Employee Name', sortable: true },
                { label: 'Master Branch', sortable: true },
                { label: 'Department', sortable: true },
                { label: 'Designation', sortable: true },
                { label: 'Date Of Joining', sortable: true },
                { label: 'Tags', sortable: true },
              ].map((col) => (
                <th key={col.label} style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: col.sortable ? 'pointer' : 'default' }}>
                    {col.label}
                    {col.sortable && <ChevronsUpDown size={12} color="#94a3b8" />}
                  </div>
                </th>
              ))}
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center', borderRadius: '0 6px 6px 0' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: selectedRows.includes(emp.id) ? '#f0f9ff' : 'transparent' }}>
                <td style={{ padding: '0.875rem 1rem' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(emp.id)}
                    onChange={() => toggleRowSelect(emp.id)}
                    style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer' }} 
                  />
                </td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{emp.id}</td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500', whiteSpace: 'nowrap' }}>{emp.name}</td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                  <a href="#" style={{ color: '#0ea5e9', textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer' }}>
                    {emp.branch}
                  </a>
                </td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.dept}</td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#4b5563' }}>{emp.role}</td>
                <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.date}</td>
                <td style={{ padding: '0.875rem 1rem', whiteSpace: 'nowrap' }}>
                  <div style={{ position: 'relative' }}>
                    <div 
                      onClick={() => toggleDropdown(`status-${emp.id}`)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}
                    >
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: emp.status === 'Active' ? '#10b981' : '#ef4444' }}></div>
                      <span style={{ fontSize: '0.875rem', color: emp.status === 'Active' ? '#10b981' : '#ef4444', fontWeight: '500' }}>{emp.status}</span>
                      <ChevronDown size={14} color={emp.status === 'Active' ? '#10b981' : '#ef4444'} />
                    </div>
                    {activeDropdown === `status-${emp.id}` && (
                      <div style={{ position: 'absolute', top: '100%', left: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '100px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                        <button onClick={() => changeStatus(emp.id, 'Active')} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#10b981' }}>Active</button>
                        <button onClick={() => changeStatus(emp.id, 'Inactive')} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#ef4444' }}>Inactive</button>
                      </div>
                    )}
                  </div>
                </td>
                <td style={{ padding: '0.875rem 1rem', textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button 
                      onClick={() => toggleDropdown(`action-${emp.id}`)}
                      style={{ background: 'none', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.25rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex' }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === `action-${emp.id}` && (
                      <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '120px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                        <button onClick={() => { setViewingEmployee(emp); setActiveDropdown(null); }} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>View Profile</button>
                        <button onClick={() => openEditModal(emp)} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>Edit</button>
                        <button onClick={() => { setDeletingEmployee(emp); setActiveDropdown(null); }} style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#ef4444' }}>Delete</button>
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
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>{employees.length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{Math.min(currentPage * pageSize, employees.length)}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{employees.length}</span> Results
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
            
            {Array.from({ length: Math.ceil(employees.length / pageSize) || 1 }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx + 1)} 
                style={{ 
                  backgroundColor: currentPage === idx + 1 ? '#0ea5e9' : 'white', 
                  border: 'none', 
                  borderRight: idx < Math.ceil(employees.length / pageSize) - 1 ? '1px solid #d1d5db' : 'none', 
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
              onClick={() => setCurrentPage(Math.min(Math.ceil(employees.length / pageSize), currentPage + 1))} 
              style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: currentPage >= Math.ceil(employees.length / pageSize) ? '#d1d5db' : '#0ea5e9', cursor: currentPage >= Math.ceil(employees.length / pageSize) ? 'default' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Employee Modal */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '500px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="header-responsive">
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Employee ID</label>
                  <input type="text" defaultValue={editingEmployee?.id || ''} placeholder="e.g. EMP045" style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Employee Name</label>
                  <input type="text" defaultValue={editingEmployee?.name || ''} placeholder="e.g. Jane Doe" style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Master Branch</label>
                <select defaultValue={editingEmployee?.branch || 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd'} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <option>Plastroots Waste Management & Solutions Private Limited</option>
                  <option>Geoclaim Energy Private Limited</option>
                  <option>Shetahit Farm Solutions Private Limited</option>
                </select>
              </div>

              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Department</label>
                  <select defaultValue={editingEmployee?.dept || 'RM'} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <option>RM</option>
                    <option>Data</option>
                    <option>Finance</option>
                    <option>Aayuneer Enterprises</option>
                    <option>Operations</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Designation</label>
                  <input type="text" defaultValue={editingEmployee?.role || ''} placeholder="e.g. Data Analyst" style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Date Of Joining</label>
                <input type="date" style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', fontFamily: 'inherit' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
              <button onClick={() => setIsAddModalOpen(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem' }}>Cancel</button>
              <button onClick={() => setIsAddModalOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: '#0ea5e9', color: 'white', cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem' }}>
                {editingEmployee ? 'Save Changes' : 'Save Employee'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {viewingEmployee && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
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

      {/* Delete Confirmation Modal */}
      {deletingEmployee && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
                <X size={24} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Delete Employee?</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>
                Are you sure you want to delete <strong>{deletingEmployee.name}</strong>? This action cannot be undone.
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button onClick={() => setDeletingEmployee(null)} style={{ flex: 1, padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem' }}>No, Keep it</button>
              <button onClick={handleDelete} style={{ flex: 1, padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', background: '#ef4444', color: 'white', cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem' }}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
