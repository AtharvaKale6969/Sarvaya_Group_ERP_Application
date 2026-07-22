import { useState } from 'react';
import { ChevronsUpDown, ChevronLeft, ChevronDown, X, MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ShiftAssignment() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState<any>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const assignments = [
    { id: '1', empId: 'EMP0034', name: 'Shipali Raut', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'RMT', designation: 'Account Executive', shift: 'Default Shift' },
    { id: '2', empId: 'SFS003', name: 'Vrushabh Raut', branch: 'Shetahit Farm Solutions', dept: 'MPD', designation: 'Business Development Associate', shift: 'Default Shift' },
    { id: '3', empId: '23', name: 'Prajwal Wankhede', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'Government Services', designation: 'Intern', shift: 'Default Shift' },
    { id: '4', empId: 'SFS002', name: 'Sarang Talmale', branch: 'Shetahit Farm Solutions', dept: 'MPD', designation: 'Business Development Associate', shift: 'Default Shift' },
    { id: '5', empId: '20', name: 'Sahil Pusdekar', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'Government Services', designation: 'Intern', shift: 'Daily Shift' },
    { id: '6', empId: '5', name: 'Ekta Satghare', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'Government Services', designation: 'Intern - Data Analyst', shift: 'Daily Shift' },
    { id: '7', empId: 'SFS001', name: 'Ankita Kathe', branch: 'Shetahit Farm Solutions', dept: 'FVF', designation: 'Business Development Associate', shift: 'Daily Shift' },
    { id: '8', empId: 'GC002', name: 'Rakesh Karmakar', branch: 'Geoclaim Energy Private Limited.', dept: 'PMS', designation: 'Business Intelligence Analyst', shift: 'Daily Shift' },
    { id: '9', empId: 'EMP031', name: 'Bhushan Chilange', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'RMT', designation: 'Business Development Associate', shift: 'Daily Shift' },
    { id: '10', empId: 'GC001', name: 'Praful Bhalerao', branch: 'Geoclaim Energy Private Limited.', dept: 'Biogas', designation: 'Business Development Associate', shift: 'Daily Shift' },
  ];

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(assignments.map(emp => emp.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
            <Link to="/hr-admin/shifts" style={{ color: '#111827', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <ChevronLeft size={20} />
            </Link>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: '#111827' }}>
              Assign Shifts To Employees
            </h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginLeft: '2rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <span>Assigned: <span style={{ color: '#374151', fontWeight: '500' }}>19</span></span>
            <span style={{ width: '1px', height: '12px', backgroundColor: '#d1d5db' }}></span>
            <span>Unassigned: <span style={{ color: '#374151', fontWeight: '500' }}>0</span></span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsAssignModalOpen(true)}
          style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
        >
          Assign Shift
        </button>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem', minHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.75rem 1rem', width: '40px', borderRadius: '6px 0 0 6px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === assignments.length && assignments.length > 0}
                  onChange={handleSelectAll}
                  style={{ width: '1rem', height: '1rem', cursor: 'pointer', accentColor: '#0ea5e9' }} 
                />
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee ID
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Branch
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Department
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Designation
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Shifts
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center', borderRadius: '0 6px 6px 0', width: '60px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: selectedRows.includes(emp.id) ? '#f0f9ff' : 'transparent' }}>
                <td style={{ padding: '0.75rem 1rem', width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(emp.id)}
                    onChange={() => handleSelectRow(emp.id)}
                    style={{ width: '1rem', height: '1rem', cursor: 'pointer', accentColor: '#0ea5e9' }} 
                  />
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                  {emp.empId}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                  {emp.name}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {emp.branch}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {emp.dept}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {emp.designation}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                  {emp.shift}
                </td>
                <td style={{ padding: '0.5rem 1rem', textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button 
                      onClick={() => toggleDropdown(`action-${emp.id}`)}
                      style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.375rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex' }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === `action-${emp.id}` && (
                      <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '120px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                        <button 
                          onClick={() => {
                            setEditingAssignment(emp);
                            setActiveDropdown(null);
                          }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}
                        >
                          Edit
                        </button>
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
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>10</span> of <span style={{ fontWeight: '600', color: '#374151' }}>19</span> Results
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <select 
              value={pageSize} 
              onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
              style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2.5rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer', backgroundColor: 'white' }}
            >
              <option value={10}>10 / Page</option>
              <option value={20}>20 / Page</option>
              <option value={50}>50 / Page</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
          </div>
          
          <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
            <button style={{ background: 'white', border: 'none', borderRight: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#d1d5db', cursor: 'default' }}>Previous</button>
            <button style={{ backgroundColor: '#0ea5e9', border: 'none', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: 'white', fontWeight: '500', cursor: 'pointer' }}>1</button>
            <button style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#6b7280', cursor: 'pointer' }}>2</button>
            <button style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#0ea5e9', cursor: 'pointer' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Assign Shift Modal */}
      {isAssignModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Assign Shift</h3>
              <button onClick={() => setIsAssignModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Select Shift <span style={{ color: '#ef4444' }}>*</span></label>
                <select style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <option value="">Select a shift</option>
                  <option value="1">Default Shift</option>
                  <option value="2">Daily Shift</option>
                  <option value="3">Open Shift</option>
                </select>
              </div>

              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Select Organization</label>
                  <select style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <option value="">All Organizations</option>
                    <option value="1">Plastroots</option>
                    <option value="2">Geoclaim</option>
                  </select>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Select Department</label>
                  <select style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <option value="">All Departments</option>
                    <option value="1">Finance</option>
                    <option value="2">HR</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Select Employees <span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ border: '1px solid #d1d5db', borderRadius: '6px', maxHeight: '120px', overflowY: 'auto', padding: '0.5rem' }}>
                  {['Shipali Raut', 'Vrushabh Raut', 'Prajwal Wankhede', 'Sarang Talmale'].map(emp => (
                    <div key={emp} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0' }}>
                      <input type="checkbox" id={`emp-${emp}`} style={{ cursor: 'pointer' }} />
                      <label htmlFor={`emp-${emp}`} style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>{emp}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Effective Date <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="date" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderRadius: '0 0 8px 8px' }}>
              <button onClick={() => setIsAssignModalOpen(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsAssignModalOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: '#0ea5e9', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'white', cursor: 'pointer' }}>Assign</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Single Assignment Modal */}
      {editingAssignment && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Edit Shift Assignment</h3>
              <button onClick={() => setEditingAssignment(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Employee</span>
                <span style={{ fontSize: '1rem', fontWeight: '500', color: '#111827' }}>{editingAssignment.name} <span style={{ color: '#9ca3af', fontSize: '0.875rem', fontWeight: '400' }}>({editingAssignment.empId})</span></span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Update Shift <span style={{ color: '#ef4444' }}>*</span></label>
                <select defaultValue={editingAssignment.shift} style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <option value="Default Shift">Default Shift</option>
                  <option value="Daily Shift">Daily Shift</option>
                  <option value="Open Shift">Open Shift</option>
                </select>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Effective Date <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="date" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderRadius: '0 0 8px 8px' }}>
              <button onClick={() => setEditingAssignment(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setEditingAssignment(null)} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: '#0ea5e9', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'white', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
