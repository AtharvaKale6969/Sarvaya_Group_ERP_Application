import { useState } from 'react';
import { ChevronsUpDown, ChevronDown, X as XIcon } from 'lucide-react';

export default function LeaveBalance() {
  const [pageSize, setPageSize] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeContext, setActiveContext] = useState<{ emp: any, leaveKey: string, leaveName: string } | null>(null);
  const [newBalance, setNewBalance] = useState('');
  const [remarks, setRemarks] = useState('');

  type Employee = {
    id: string;
    name: string;
    org: string;
    dept: string;
    designation: string;
    leaves: {
      oh: string | null;
      pl: string | null;
      sl: string | null;
      cl: string | null;
      co: string | null;
    };
  };

  const [employees, setEmployees] = useState<Employee[]>([
    { id: 'EMP0034', name: 'Shipali Raut', org: 'Shetahit Farm Solutions', dept: 'FVF', designation: 'Account Executive', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: 'SFS003', name: 'Vrushabh Raut', org: 'Shetahit Farm Solutions', dept: 'MPD', designation: 'Business Development Associate', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: '23', name: 'Prajwal Wankhede', org: 'Shetahit Farm Solutions', dept: 'FVF', designation: 'Intern', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: 'SFS002', name: 'Sarang Talmale', org: 'Shetahit Farm Solutions', dept: 'FVF', designation: 'Business Development Associate', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: '20', name: 'Sahil Pusdekar', org: 'Shetahit Farm Solutions', dept: 'FVF', designation: 'Intern', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: '5', name: 'Ekta Satghare', org: 'Shetahit Farm Solutions', dept: 'MPD', designation: 'Intern - Data Analyst', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetahit Farm Solutions', dept: 'MPD', designation: 'Business Development Associate', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
    { id: 'GC002', name: 'Rakesh Karmakar', org: 'Geoclaim Energy Private Limited.', dept: 'Biomass', designation: 'Business Intelligence Analyst', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Shetahit Farm Solutions', dept: 'MPD', designation: 'Business Development Associate', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
    { id: 'GC001', name: 'Praful Bhalera', org: 'Geoclaim Energy Private Limited.', dept: 'Shredding Unit', designation: 'Business Development Associate', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
  ]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedEmployees(employees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  const handleSelectOne = (id: string) => {
    if (selectedEmployees.includes(id)) {
      setSelectedEmployees(selectedEmployees.filter(empId => empId !== id));
    } else {
      setSelectedEmployees([...selectedEmployees, id]);
    }
  };

  const handleAdjustClick = (emp: any, leaveKey: string, leaveName: string) => {
    setActiveContext({ emp, leaveKey, leaveName });
    setNewBalance('');
    setRemarks('');
    setIsDrawerOpen(true);
  };

  const handleUpdateBalance = () => {
    if (!activeContext) return;
    if (!newBalance) {
      alert("Please enter a new balance");
      return;
    }
    
    setEmployees(prev => prev.map(emp => {
      if (emp.id === activeContext.emp.id) {
        return {
          ...emp,
          leaves: {
            ...emp.leaves,
            [activeContext.leaveKey]: newBalance
          }
        };
      }
      return emp;
    }));
    
    setIsDrawerOpen(false);
  };

  const renderLeaveStatus = (val: string | null, emp: any, leaveKey: string, leaveName: string) => {
    if (val === null) {
      return <span style={{ color: '#6b7280' }}>Not Assigned</span>;
    }
    return (
      <span 
        onClick={() => handleAdjustClick(emp, leaveKey, leaveName)}
        style={{ color: '#111827', textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer', fontWeight: '500' }}
      >
        {val}
      </span>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', minHeight: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#111827' }}>
          Leave Balance
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Bulk Leave Update
          </button>
          <button style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Assign Leaves
          </button>
          <button style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Bulk Adjust
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#e0f2fe' }}>
              <th style={{ padding: '0.75rem 1rem', width: '40px' }}>
                <input 
                  type="checkbox" 
                  style={{ width: '1rem', height: '1rem', cursor: 'pointer', accentColor: '#0ea5e9' }} 
                  checked={selectedEmployees.length === employees.length && employees.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Employee ID <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Employee Name <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Organization <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Department <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Designation <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Optional Holidays</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Privilege Leave</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Sick Leaves</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Casual Leave</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Comp Off</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => {
              const isSelected = selectedEmployees.includes(emp.id);
              return (
                <tr key={emp.id} style={{ borderBottom: idx === employees.length - 1 ? 'none' : '1px solid #e5e7eb', backgroundColor: isSelected ? '#f0f9ff' : 'transparent' }}>
                  <td style={{ padding: '1rem' }}>
                    <input 
                      type="checkbox" 
                      style={{ width: '1rem', height: '1rem', cursor: 'pointer', accentColor: '#0ea5e9' }} 
                      checked={isSelected}
                      onChange={() => handleSelectOne(emp.id)}
                    />
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.id}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.name}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.org}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.dept}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.designation}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{renderLeaveStatus(emp.leaves.oh, emp, 'oh', 'Optional Holidays')}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{renderLeaveStatus(emp.leaves.pl, emp, 'pl', 'Privilege Leave')}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{renderLeaveStatus(emp.leaves.sl, emp, 'sl', 'Sick Leaves')}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{renderLeaveStatus(emp.leaves.cl, emp, 'cl', 'Casual Leave')}</td>
                  <td style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem' }}>{renderLeaveStatus(emp.leaves.co, emp, 'co', 'Comp Off')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>10</span> of <span style={{ fontWeight: '600', color: '#374151' }}>19</span> Results
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <select 
              value={pageSize} 
              onChange={(e) => { setPageSize(Number(e.target.value)); }}
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

      {/* Adjust Balance Drawer */}
      {isDrawerOpen && activeContext && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '400px', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out forwards' }}>
            
            {/* Drawer Header */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', backgroundColor: '#eff6ff' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>
                  Adjust: {activeContext.leaveName}
                </h2>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                  {activeContext.emp.id}-{activeContext.emp.name}
                </p>
              </div>
              <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                <XIcon size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Current Leave Balance</label>
                <input 
                  type="text" 
                  readOnly
                  value={activeContext.emp.leaves[activeContext.leaveKey] || '0'} 
                  style={{ padding: '0.625rem', border: '1px solid #e5e7eb', borderRadius: '4px', fontSize: '0.875rem', outline: 'none', backgroundColor: '#f9fafb', color: '#6b7280' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Update Leave Balance Count<span style={{ color: '#ef4444' }}>*</span></label>
                <input 
                  type="text" 
                  value={newBalance}
                  onChange={(e) => setNewBalance(e.target.value)}
                  placeholder="Update Leave Balance Count"
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Remarks<span style={{ color: '#ef4444' }}>*</span></label>
                <textarea 
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Remarks"
                  rows={4}
                  style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none', resize: 'vertical' }} 
                />
              </div>

            </div>

            {/* Drawer Footer */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#eff6ff', alignItems: 'center' }}>
              <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', color: '#0ea5e9', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', padding: '0.5rem' }}>
                Close
              </button>
              <button onClick={handleUpdateBalance} style={{ padding: '0.5rem 1.5rem', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                Update Balance
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
