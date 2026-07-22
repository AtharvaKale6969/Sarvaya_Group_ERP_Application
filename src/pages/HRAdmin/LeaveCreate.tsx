import { useState } from 'react';
import { ChevronsUpDown, MoreVertical, X, Trash2, Edit2, ChevronDown } from 'lucide-react';

export default function LeaveCreate() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'create' | 'edit'>('create');
  
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<any>(null);

  // Toggle state for the action menu dropdowns
  const [activeMenuId, setActiveMenuId] = useState<number | null>(null);

  const [leaves, setLeaves] = useState([
    { id: 1, name: 'Optional Holidays', alias: 'OH', allocation: 'Every Financial Year 3', carryForward: 'End Of Every Financial Year 0', createdOn: '13 Jul 2026' },
    { id: 2, name: 'Privilege Leave', alias: 'PL', allocation: 'Every Financial Year 18', carryForward: 'End Of Every Financial Year 0', createdOn: '21 Apr 2026' },
    { id: 3, name: 'Sick Leaves', alias: 'SL', allocation: 'Every Financial Year 7', carryForward: 'End Of Every Financial Year 0', createdOn: '21 Apr 2026' },
    { id: 4, name: 'Casual Leave', alias: 'CL', allocation: 'Every Financial Year 7', carryForward: 'End Of Every Financial Year 0', createdOn: '21 Apr 2026' },
    { id: 5, name: 'Comp Off', alias: 'CO', allocation: 'Every Month 0', carryForward: 'End Of Every Month 0', createdOn: '30 Oct 2025' },
    { id: 6, name: 'LWP', alias: '-', allocation: '-', carryForward: '-', createdOn: '-' },
  ]);

  const handleCreate = () => {
    setDrawerMode('create');
    setSelectedLeave(null);
    setIsDrawerOpen(true);
    setActiveMenuId(null);
  };

  const handleEdit = (leave: any) => {
    setDrawerMode('edit');
    setSelectedLeave(leave);
    setIsDrawerOpen(true);
    setActiveMenuId(null);
  };

  const handleDeleteClick = (leave: any) => {
    setSelectedLeave(leave);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null);
  };

  const confirmDelete = () => {
    setLeaves(leaves.filter(l => l.id !== selectedLeave?.id));
    setIsDeleteModalOpen(false);
    setSelectedLeave(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', minHeight: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#111827' }}>
          Leave Create
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button 
            onClick={handleCreate}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Create New Leave
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#e0f2fe' }}>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', width: '25%' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Leave Name <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>Alias</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>Auto Allocation</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>Carry Forward</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>Created On</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center', width: '80px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, idx) => (
              <tr key={leave.id} style={{ borderBottom: idx === leaves.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{leave.name}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{leave.alias}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{leave.allocation}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{leave.carryForward}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{leave.createdOn}</td>
                <td style={{ padding: '1rem', textAlign: 'center', position: 'relative' }}>
                  <button 
                    onClick={() => setActiveMenuId(activeMenuId === leave.id ? null : leave.id)}
                    style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.25rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex' }}
                  >
                    <MoreVertical size={16} />
                  </button>
                  
                  {activeMenuId === leave.id && (
                    <div style={{ position: 'absolute', right: '1rem', top: '2.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', zIndex: 50, minWidth: '120px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                      <button 
                        onClick={() => handleEdit(leave)}
                        style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'none', width: '100%', textAlign: 'left', fontSize: '0.875rem', color: '#374151', cursor: 'pointer', borderBottom: '1px solid #f3f4f6' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <Edit2 size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => handleDeleteClick(leave)}
                        style={{ padding: '0.5rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', border: 'none', background: 'none', width: '100%', textAlign: 'left', fontSize: '0.875rem', color: '#ef4444', cursor: 'pointer' }}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{leaves.length}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{leaves.length}</span> Results
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
            <button style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#6b7280', cursor: 'pointer' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Drawer Overlay for Create/Edit */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '450px', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out forwards' }}>
            {/* Drawer Header */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                {drawerMode === 'create' ? 'Create New Leave' : 'Edit Leave'}
              </h2>
              <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Leave Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  defaultValue={selectedLeave?.name} 
                  placeholder="Leave Name"
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Alias <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  defaultValue={selectedLeave?.alias !== '-' ? selectedLeave?.alias : ''} 
                  placeholder="Alias"
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Description</label>
                <input 
                  type="text" 
                  defaultValue={selectedLeave?.name === 'Optional Holidays' ? 'Employees are entitled to avail of up to three (3) Optional Holidays d' : ''} 
                  placeholder="Description"
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Number Of Auto Allocation Leaves <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  defaultValue={selectedLeave?.allocation?.match(/\d+/)?.[0] || ''} 
                  placeholder="Enter Number Of Leaves"
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  <input type="radio" name="allocationFreq" defaultChecked={selectedLeave?.allocation?.includes('Month')} style={{ accentColor: '#0ea5e9' }} /> Every Month
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  <input type="radio" name="allocationFreq" defaultChecked={selectedLeave?.allocation?.includes('Year')} style={{ accentColor: '#0ea5e9' }} /> Every Financial Year
                </label>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Carry Forward <span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  defaultValue={selectedLeave?.carryForward?.match(/\d+/)?.[0] || ''} 
                  placeholder="0"
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center', marginTop: '0.25rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  <input type="radio" name="carryForwardFreq" defaultChecked={selectedLeave?.carryForward?.includes('Month')} style={{ accentColor: '#0ea5e9' }} /> End Of Every Month
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                  <input type="radio" name="carryForwardFreq" defaultChecked={selectedLeave?.carryForward?.includes('Year')} style={{ accentColor: '#0ea5e9' }} /> End Of Every Financial Year
                </label>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', marginTop: '0.5rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Encashment Of Leave</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                    <input type="radio" name="encashment" defaultChecked={true} style={{ accentColor: '#0ea5e9' }} /> Off
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer' }}>
                    <input type="radio" name="encashment" style={{ accentColor: '#0ea5e9' }} /> On
                  </label>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#eff6ff' }}>
              <button onClick={() => setIsDrawerOpen(false)} style={{ padding: '0.5rem 1.5rem', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                {drawerMode === 'create' ? 'Create' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{ backgroundColor: '#fee2e2', color: '#ef4444', padding: '0.75rem', borderRadius: '50%' }}>
                <Trash2 size={24} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Delete Leave</h3>
                <p style={{ margin: '0.5rem 0 0 0', fontSize: '0.875rem', color: '#6b7280', lineHeight: '1.5' }}>
                  Are you sure you want to delete the <strong>{selectedLeave?.name}</strong> policy? This action cannot be undone.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => setIsDeleteModalOpen(false)} 
                style={{ padding: '0.5rem 1rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', color: '#374151', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={confirmDelete}
                style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', border: 'none', borderRadius: '6px', color: 'white', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
              >
                Delete
              </button>
            </div>
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
