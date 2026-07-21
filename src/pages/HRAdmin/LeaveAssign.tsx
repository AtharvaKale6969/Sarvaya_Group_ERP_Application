import { useState } from 'react';
import { ChevronsUpDown, ChevronDown, Check, X as XIcon, Edit2 } from 'lucide-react';

export default function LeaveAssign() {
  const [pageSize, setPageSize] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'single' | 'bulk'>('single');
  const [activeEmployeeId, setActiveEmployeeId] = useState<string | null>(null);

  const [assignForm, setAssignForm] = useState({
    oh: false, pl: false, sl: false, cl: false, co: false
  });

  // Sample data from screenshot
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
    { id: 'EMP0034', name: 'Shipali Raut', org: 'Shetahit Farm Solutions', dept: 'Finance', designation: 'Account Executive', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: 'SFS003', name: 'Vrushabh Raut', org: 'Shetahit Farm Solutions', dept: 'Shetahit Farm Solutions', designation: 'Business Development Associate', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: '23', name: 'Prajwal Wankhede', org: 'Shetahit Farm Solutions', dept: 'Internship', designation: 'Intern', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: 'SFS002', name: 'Sarang Talmale', org: 'Shetahit Farm Solutions', dept: 'Shetahit Farm Solutions', designation: 'Business Development Associate', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: '20', name: 'Sahil Pusdekar', org: 'Shetahit Farm Solutions', dept: 'RM', designation: 'Intern', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: '5', name: 'Ekta Satghare', org: 'Shetahit Farm Solutions', dept: 'Data', designation: 'Intern - Data Analyst', leaves: { oh: null, pl: null, sl: null, cl: null, co: null } },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetahit Farm Solutions', dept: 'Shetahit Farm Solutions', designation: 'Business Development Associate', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
    { id: 'GC002', name: 'Rakesh Karmakar', org: 'Geoclaim Energy Pvt Ltd.', dept: 'Geoclaim Energy Pvt Ltd.', designation: 'Business Intelligence Analyst', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Shetahit Farm Solutions', dept: 'RM', designation: 'Business Development Associate', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
    { id: 'GC001', name: 'Praful Bhalera', org: 'Geoclaim Energy Pvt Ltd.', dept: 'Geoclaim Energy Pvt Ltd.', designation: 'Business Development Associate', leaves: { oh: '2', pl: '5', sl: '3', cl: '4', co: null } },
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

  const renderLeaveStatus = (val: string | null) => {
    if (val === null) {
      return <XIcon size={16} color="#ef4444" style={{ strokeWidth: 3 }} />;
    }
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', color: '#10b981', fontWeight: '500' }}>
        <Check size={16} style={{ strokeWidth: 3 }} />
        <span>({val})</span>
      </div>
    );
  };

  const handleEdit = (emp: typeof employees[0]) => {
    setActiveEmployeeId(emp.id);
    setDrawerMode('single');
    setAssignForm({
      oh: emp.leaves.oh !== null,
      pl: emp.leaves.pl !== null,
      sl: emp.leaves.sl !== null,
      cl: emp.leaves.cl !== null,
      co: emp.leaves.co !== null,
    });
    setIsDrawerOpen(true);
  };

  const handleBulkAssign = () => {
    if (selectedEmployees.length === 0) {
      alert("Please select at least one employee first.");
      return;
    }
    setActiveEmployeeId(null);
    setDrawerMode('bulk');
    setAssignForm({ oh: false, pl: false, sl: false, cl: false, co: false });
    setIsDrawerOpen(true);
  };

  const handleSave = () => {
    const defaultVals = { oh: '3', pl: '4', sl: '5', cl: '5', co: '0' };
    
    setEmployees(prev => prev.map(emp => {
      const shouldUpdate = drawerMode === 'single' ? emp.id === activeEmployeeId : selectedEmployees.includes(emp.id);
      if (!shouldUpdate) return emp;
      
      return {
        ...emp,
        leaves: {
          oh: assignForm.oh ? (emp.leaves.oh || defaultVals.oh) : null,
          pl: assignForm.pl ? (emp.leaves.pl || defaultVals.pl) : null,
          sl: assignForm.sl ? (emp.leaves.sl || defaultVals.sl) : null,
          cl: assignForm.cl ? (emp.leaves.cl || defaultVals.cl) : null,
          co: assignForm.co ? (emp.leaves.co || defaultVals.co) : null,
        }
      };
    }));
    
    setIsDrawerOpen(false);
    if (drawerMode === 'bulk') {
      setSelectedEmployees([]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', minHeight: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#111827' }}>
          Leave Assign
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={handleBulkAssign}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Bulk Assign
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Employee ID <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Employee Name <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Organization <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Department <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Designation <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Optional Holidays</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Privilege Leave</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Sick Leaves</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Casual Leave</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Comp Off</th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center' }}>Action</th>
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
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{renderLeaveStatus(emp.leaves.oh)}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{renderLeaveStatus(emp.leaves.pl)}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{renderLeaveStatus(emp.leaves.sl)}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{renderLeaveStatus(emp.leaves.cl)}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>{renderLeaveStatus(emp.leaves.co)}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleEdit(emp)}
                      style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.375rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      title="Edit Assignment"
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>10</span> of <span style={{ fontWeight: '600', color: '#374151' }}>19</span> Results
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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

      {/* Drawer Overlay */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '400px', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out forwards' }}>
            
            {/* Drawer Header */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>
                  {drawerMode === 'bulk' ? 'Bulk Assign Leaves' : 'Assign Leave'}
                </h2>
                {drawerMode === 'bulk' && (
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                    Assigning to {selectedEmployees.length} employee(s)
                  </p>
                )}
              </div>
              <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                <XIcon size={20} />
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#374151', marginBottom: '0.5rem' }}>
                Select the leave types to assign. This will apply the default auto-allocation values to the selected employees.
              </p>

              {[
                { key: 'oh', label: 'Optional Holidays' },
                { key: 'pl', label: 'Privilege Leave' },
                { key: 'sl', label: 'Sick Leaves' },
                { key: 'cl', label: 'Casual Leave' },
                { key: 'co', label: 'Comp Off' },
              ].map((leave) => (
                <label key={leave.key} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '6px', cursor: 'pointer', backgroundColor: assignForm[leave.key as keyof typeof assignForm] ? '#f0f9ff' : 'white' }}>
                  <input 
                    type="checkbox" 
                    checked={assignForm[leave.key as keyof typeof assignForm]}
                    onChange={(e) => setAssignForm(prev => ({ ...prev, [leave.key]: e.target.checked }))}
                    style={{ width: '1.25rem', height: '1.25rem', accentColor: '#0ea5e9', cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{leave.label}</span>
                </label>
              ))}
            </div>

            {/* Drawer Footer */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '1rem', backgroundColor: '#eff6ff' }}>
              <button onClick={() => setIsDrawerOpen(false)} style={{ padding: '0.5rem 1.25rem', backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                Cancel
              </button>
              <button onClick={handleSave} style={{ padding: '0.5rem 1.5rem', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                Save Assignment
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
