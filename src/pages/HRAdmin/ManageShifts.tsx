import { useState } from 'react';
import { ChevronsUpDown, MoreVertical, ChevronDown, X, Check } from 'lucide-react';

export default function ManageShifts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const [isShiftDrawerOpen, setIsShiftDrawerOpen] = useState(false);
  const [editingShift, setEditingShift] = useState<any>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isWorkingHoursModalOpen, setIsWorkingHoursModalOpen] = useState(false);
  const [isAdvancedShift, setIsAdvancedShift] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const shifts = [
    { id: '1', name: 'Default Shift', isDefault: true, startTime: '10:00 AM', endTime: '07:00 PM', employees: 4, createdOn: '2025-10-29' },
    { id: '2', name: 'Daily Shift', isDefault: false, startTime: '10:30 AM', endTime: '06:30 PM', employees: 15, createdOn: '2025-10-31' },
    { id: '3', name: 'Open Shift', isDefault: false, startTime: 'N/A', endTime: '', employees: 0, createdOn: '2026-07-21' },
  ];

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Shifts <span style={{ color: '#0ea5e9' }}>({shifts.length})</span>
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          <button 
            onClick={() => {
              setIsAdvancedShift(!isAdvancedShift);
              setShowToast(true);
              setTimeout(() => setShowToast(false), 3000);
            }}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', transition: 'background-color 0.2s' }}
          >
            {isAdvancedShift ? 'Switch To Basic Shift' : 'Switch To Advanced Shift'}
          </button>
          <button 
            onClick={() => setIsAssignModalOpen(true)}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Assign Shift
          </button>
          <button 
            onClick={() => setIsWorkingHoursModalOpen(true)}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Set Working Hours
          </button>
          <button 
            onClick={() => { setEditingShift(null); setIsShiftDrawerOpen(true); }}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Create Shift
          </button>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem', minHeight: '400px' }}>
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.875rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '6px 0 0 6px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Shift Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                <th key={day} style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center' }}>
                  {day}
                </th>
              ))}
              <th style={{ padding: '0.875rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', justifyContent: 'center' }}>
                  Assigned
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer', justifyContent: 'center' }}>
                  Created On
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center', borderRadius: '0 6px 6px 0', width: '60px' }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                    {shift.name}
                    {shift.isDefault && (
                      <span style={{ fontSize: '0.7rem', fontWeight: '600', color: '#0ea5e9', backgroundColor: '#e0f2fe', padding: '0.125rem 0.375rem', borderRadius: '4px' }}>
                        Default
                      </span>
                    )}
                  </div>
                </td>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <td key={day} style={{ padding: '0.75rem 0.25rem', fontSize: '0.75rem', color: '#6b7280', textAlign: 'center' }}>
                    {shift.startTime === 'N/A' ? (
                      <span style={{ color: '#9ca3af', fontWeight: '500' }}>N/A</span>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.125rem' }}>
                        <span style={{ fontWeight: '500', color: '#4b5563', whiteSpace: 'nowrap' }}>{shift.startTime}</span>
                        <span style={{ fontSize: '0.65rem', color: '#9ca3af' }}>to</span>
                        <span style={{ fontWeight: '500', color: '#4b5563', whiteSpace: 'nowrap' }}>{shift.endTime}</span>
                      </div>
                    )}
                  </td>
                ))}
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#111827', textAlign: 'center' }}>
                  {shift.employees}
                </td>
                <td style={{ padding: '1rem 0.75rem', fontSize: '0.875rem', color: '#6b7280', whiteSpace: 'nowrap', textAlign: 'center' }}>
                  {shift.createdOn}
                </td>
                <td style={{ padding: '1rem 0.5rem', textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button 
                      onClick={() => toggleDropdown(`action-${shift.id}`)}
                      style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.375rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex' }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === `action-${shift.id}` && (
                      <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '120px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
                        <button 
                          onClick={() => {
                            setEditingShift(shift);
                            setIsShiftDrawerOpen(true);
                            setActiveDropdown(null);
                          }}
                          style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}
                        >
                          Edit
                        </button>
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
      </div>

      {/* Footer / Pagination */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>3</span> of <span style={{ fontWeight: '600', color: '#374151' }}>3</span> Results
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
              style={{ background: 'white', border: 'none', borderRight: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#d1d5db', cursor: 'default' }}
            >
              Previous
            </button>
            <button 
              style={{ backgroundColor: '#0ea5e9', border: 'none', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: 'white', fontWeight: '500', cursor: 'pointer' }}
            >
              1
            </button>
            <button 
              style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#d1d5db', cursor: 'default' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div style={{ position: 'fixed', top: '2rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', zIndex: 9999, animation: 'fadeInOut 3s forwards' }}>
          <Check size={18} />
          <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>View updated successfully</span>
        </div>
      )}

      {/* Create / Edit Shift Drawer */}
      {isShiftDrawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '450px', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out' }}>
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>{editingShift ? 'Edit Shift' : 'Create Shift'}</h2>
              <button onClick={() => setIsShiftDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Shift Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" defaultValue={editingShift?.name || ''} placeholder="E.g., Morning Shift" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="isDefault" defaultChecked={editingShift?.isDefault || false} style={{ width: '1rem', height: '1rem', cursor: 'pointer' }} />
                <label htmlFor="isDefault" style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>Set as Default Shift</label>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                <input type="checkbox" id="sameTiming" defaultChecked={true} style={{ width: '1rem', height: '1rem', cursor: 'pointer' }} />
                <label htmlFor="sameTiming" style={{ fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>Apply same timing for all days</label>
              </div>

              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Start Time <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="time" defaultValue={editingShift?.startTime === 'N/A' ? '' : '10:00'} style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>End Time <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="time" defaultValue={editingShift?.endTime === 'N/A' ? '' : '19:00'} style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Working Days</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <input type="checkbox" id={`day-${day}`} defaultChecked={day !== 'Sunday'} style={{ cursor: 'pointer' }} />
                      <label htmlFor={`day-${day}`} style={{ fontSize: '0.875rem', color: '#4b5563', cursor: 'pointer' }}>{day}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ padding: '1.25rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setIsShiftDrawerOpen(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsShiftDrawerOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: '#0ea5e9', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'white', cursor: 'pointer' }}>Save Changes</button>
            </div>
          </div>
        </div>
      )}

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
                  {['Atharva Kale', 'Himanshu Dhote', 'Vedant Lonare', 'Pratik Wankhede'].map(emp => (
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

      {/* Set Working Hours Modal */}
      {isWorkingHoursModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '450px', display: 'flex', flexDirection: 'column', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Set Global Working Hours</h3>
              <button onClick={() => setIsWorkingHoursModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Total Working Hours Per Day (HH:MM)</label>
                <input type="time" defaultValue="09:00" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>

              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Minimum for Half Day</label>
                  <input type="time" defaultValue="04:30" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Minimum for Full Day</label>
                  <input type="time" defaultValue="08:00" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Grace Period for Late Arrival (Minutes)</label>
                <input type="number" defaultValue="15" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            </div>

            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', borderRadius: '0 0 8px 8px' }}>
              <button onClick={() => setIsWorkingHoursModalOpen(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsWorkingHoursModalOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: '#0ea5e9', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'white', cursor: 'pointer' }}>Save Settings</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translate(-50%, -10px); }
          10% { opacity: 1; transform: translate(-50%, 0); }
          90% { opacity: 1; transform: translate(-50%, 0); }
          100% { opacity: 0; transform: translate(-50%, -10px); }
        }
      `}</style>
    </div>
  );
}
