import { useState } from 'react';
import { ChevronDown, MoreVertical, Smartphone, Fingerprint, Monitor, Pencil } from 'lucide-react';

const Toggle = ({ isOn, onChange }: { isOn: boolean; onChange: (val: boolean) => void }) => (
  <div 
    onClick={() => onChange(!isOn)}
    style={{
      width: '36px', height: '20px', borderRadius: '999px',
      backgroundColor: isOn ? '#0ea5e9' : '#e5e7eb',
      position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s'
    }}
  >
    <div style={{
      width: '16px', height: '16px', borderRadius: '50%', backgroundColor: 'white',
      position: 'absolute', top: '2px', left: isOn ? '18px' : '2px',
      transition: 'left 0.2s', boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
    }} />
  </div>
);

const SegmentedControl = ({ value, onChange }: { value: string; onChange: (val: string) => void }) => (
  <div style={{ display: 'flex', border: '1px solid #d1d5db', borderRadius: '6px', overflow: 'hidden' }}>
    <button 
      onClick={() => onChange('Enable')}
      style={{
        padding: '0.375rem 1rem', fontSize: '0.75rem', fontWeight: '500', border: 'none', cursor: 'pointer',
        backgroundColor: value === 'Enable' ? '#0ea5e9' : 'white',
        color: value === 'Enable' ? 'white' : '#374151',
        borderRight: '1px solid #d1d5db'
      }}
    >
      Enable
    </button>
    <button 
      onClick={() => onChange('Disable')}
      style={{
        padding: '0.375rem 1rem', fontSize: '0.75rem', fontWeight: '500', border: 'none', cursor: 'pointer',
        backgroundColor: value === 'Disable' ? '#f3f4f6' : 'white',
        color: value === 'Disable' ? '#374151' : '#6b7280'
      }}
    >
      Disable
    </button>
  </div>
);

export default function AttendancePermission() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Globals
  const [mobileAttendance, setMobileAttendance] = useState('Enable');
  const [geoFencing, setGeoFencing] = useState('Enable');
  const [autoPunchOut, setAutoPunchOut] = useState('Disable');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Filter state
  const [selectedOrgFilter, setSelectedOrgFilter] = useState('All Organizations');
  const [selectedDeptFilter, setSelectedDeptFilter] = useState('All Departments');
  const [selectedDesigFilter, setSelectedDesigFilter] = useState('All Designations');

  const orgToDepts: Record<string, string[]> = {
    'Plastroots Waste Management & Solutions Private Limited': ['RMT', 'Government Services', 'Corporate Compliance'],
    'Plastroots Foundation': ['CSR', 'IEC', 'RRC'],
    'Shetahit Farm Solutions Private Limited': ['FVF', 'MPD'],
    'Geoclaim Energy Private Limited': ['Biogas', 'Biomass', 'Shredding Unit', 'PMS'],
    'Aayuneer Enterprises': ['Flow Up', 'Zoo Platform'],
    'Saravya Group': ['HQ / Operations']
  };

  const allDepts = Object.values(orgToDepts).flat();

  // Rows state
  const [employees, setEmployees] = useState([
    { id: 'EMP0034', name: 'Shipali Raut', org: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'Corporate Compliance', role: 'Account Executive', toggle1: true, toggle2: false, toggle3: false },
    { id: 'SFS003', name: 'Vrushabh Raut', org: 'Shetahit Farm Solutions Pvt Ltd', dept: 'HQ / Operations', role: 'Business Development Associate', toggle1: true, toggle2: false, toggle3: false },
    { id: '23', name: 'Prajwal Wankhede', org: 'Plastroots Foundation', dept: 'RRC', role: 'Intern', toggle1: true, toggle2: false, toggle3: false },
    { id: 'SFS002', name: 'Sarang Talmale', org: 'Shetahit Farm Solutions Pvt Ltd', dept: 'HQ / Operations', role: 'Business Development Associate', toggle1: true, toggle2: false, toggle3: false },
    { id: '20', name: 'Sahil Pusdekar', org: 'Saravya Group', dept: 'HQ / Operations', role: 'Intern', toggle1: true, toggle2: false, toggle3: false },
    { id: '5', name: 'Ekta Satghare', org: 'Aayuneer Enterprises', dept: 'Zoo Platform', role: 'Intern - Data Analyst', toggle1: true, toggle2: false, toggle3: false },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetahit Farm Solutions Pvt Ltd', dept: 'HQ / Operations', role: 'Business Development Associate', toggle1: true, toggle2: false, toggle3: false },
    { id: 'GC002', name: 'Rakesh Karmakar', org: 'Geoclaim Energy Private Limited.', dept: 'Biogas', role: 'Business Intelligence Analyst', toggle1: true, toggle2: false, toggle3: false },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Saravya Group', dept: 'HQ / Operations', role: 'Business Development Associate', toggle1: true, toggle2: false, toggle3: false },
    { id: 'GC001', name: 'Praful Bhalerao', org: 'Geoclaim Energy Private Limited.', dept: 'PMS', role: 'Business Development Associate', toggle1: true, toggle2: false, toggle3: false },
  ]);

  const toggleRowSelect = (id: string) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === employees.length) setSelectedRows([]);
    else setSelectedRows(employees.map(emp => emp.id));
  };

  const updateToggle = (id: string, toggleIndex: 1 | 2 | 3, val: boolean) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...emp, [`toggle${toggleIndex}`]: val } : emp));
  };

  const handleMobileAttendanceGlobal = (val: string) => {
    setMobileAttendance(val);
    setEmployees(prev => prev.map(emp => ({ ...emp, toggle1: val === 'Enable' })));
  };

  const handleGeoFencingGlobal = (val: string) => {
    setGeoFencing(val);
    setEmployees(prev => prev.map(emp => ({ ...emp, toggle2: val === 'Enable' })));
  };

  const handleAutoPunchOutGlobal = (val: string) => {
    setAutoPunchOut(val);
    setEmployees(prev => prev.map(emp => ({ ...emp, toggle3: val === 'Enable' })));
  };

  const toggleDropdown = (id: string) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Attendance Permission
        </h2>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Mobile Attendance</span>
            <SegmentedControl value={mobileAttendance} onChange={handleMobileAttendanceGlobal} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Geo Fencing</span>
            <SegmentedControl value={geoFencing} onChange={handleGeoFencingGlobal} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Auto Punch Out</span>
            <SegmentedControl value={autoPunchOut} onChange={handleAutoPunchOutGlobal} />
          </div>
        </div>
      </div>

      {/* Filters Row */}
      <div style={{ display: 'flex', gap: '1.5rem', padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1, maxWidth: '250px' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Choose Organization</label>
          <div style={{ position: 'relative' }}>
            <select 
              value={selectedOrgFilter}
              onChange={(e) => {
                setSelectedOrgFilter(e.target.value);
                setSelectedDeptFilter('All Departments');
              }}
              style={{ width: '100%', padding: '0.5rem 2rem 0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white', color: '#374151', appearance: 'none' }}
            >
              <option value="All Organizations">All Organizations</option>
              {Object.keys(orgToDepts).map(org => <option key={org} value={org}>{org}</option>)}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1, maxWidth: '250px' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Choose Department</label>
          <div style={{ position: 'relative' }}>
            <select 
              value={selectedDeptFilter}
              onChange={(e) => setSelectedDeptFilter(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 2rem 0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white', color: '#374151', appearance: 'none' }}
            >
              <option value="All Departments">All Departments</option>
              {(selectedOrgFilter === 'All Organizations' ? allDepts : orgToDepts[selectedOrgFilter]).map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', flex: 1, maxWidth: '250px' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Choose Designation</label>
          <div style={{ position: 'relative' }}>
            <select 
              value={selectedDesigFilter}
              onChange={(e) => setSelectedDesigFilter(e.target.value)}
              style={{ width: '100%', padding: '0.5rem 2rem 0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', backgroundColor: 'white', color: '#374151', appearance: 'none' }}
            >
              <option>All Designations</option>
              <option>Account Executive</option>
              <option>Senior Account Executive</option>
              <option>Intern</option>
              <option>Intern - Data Analyst</option>
              <option>Business Analyst</option>
              <option>Business Intelligence Analyst</option>
              <option>Data Analyst</option>
              <option>Executive Data Analyst</option>
              <option>Finance Executive</option>
              <option>Business Development Associate</option>
              <option>Team Lead</option>
              <option>Operations Head</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
          </div>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '1.5rem', minHeight: '400px' }}>
        <div style={{ backgroundColor: '#e0f2fe', height: '40px', borderRadius: '6px 6px 0 0', width: '100%' }}></div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginTop: '-40px' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', width: '40px', borderRadius: '6px 0 0 6px' }}>
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
                { label: 'Organization', sortable: true },
                { label: 'Department', sortable: true },
                { label: 'Designation', sortable: true },
              ].map((col) => (
                <th key={col.label} style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: col.sortable ? 'pointer' : 'default' }}>
                    {col.label}
                    {col.sortable && <ChevronDown size={12} color="#94a3b8" />}
                  </div>
                </th>
              ))}
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>Biometrics Registered</th>
              <th colSpan={2} style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center' }}>Attendance Method</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center' }}>Mobile Attendance</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center' }}>Geofencing</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center' }}>Auto Punch Out</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center', borderRadius: '0 6px 6px 0' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {employees.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: selectedRows.includes(emp.id) ? '#f0f9ff' : 'transparent' }}>
                <td style={{ padding: '1rem' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(emp.id)}
                    onChange={() => toggleRowSelect(emp.id)}
                    style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid #d1d5db', cursor: 'pointer' }} 
                  />
                </td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>{emp.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#111827', fontWeight: '500' }}>{emp.name}</td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>{emp.org}</td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>{emp.dept}</td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>{emp.role}</td>
                
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Fingerprint size={14} color="#9ca3af" /> Fingerprint
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Monitor size={14} color="#9ca3af" /> Hardware Device
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.75rem', color: '#6b7280' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Smartphone size={14} color="#9ca3af" /> Mobile App
                  </div>
                </td>

                <td style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}>
                  <Toggle isOn={emp.toggle1} onChange={(val) => updateToggle(emp.id, 1, val)} />
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Toggle isOn={emp.toggle2} onChange={(val) => updateToggle(emp.id, 2, val)} />
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Toggle isOn={emp.toggle3} onChange={(val) => updateToggle(emp.id, 3, val)} />
                  </div>
                </td>
                <td style={{ padding: '1rem', textAlign: 'center' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <button 
                      onClick={() => toggleDropdown(emp.id)}
                      style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.25rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex' }}
                    >
                      <MoreVertical size={16} />
                    </button>
                    {activeDropdown === emp.id && (
                      <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '180px', zIndex: 10, display: 'flex', flexDirection: 'column', padding: '0.5rem 0' }}>
                        <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#0056b3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Pencil size={16} color="#4b5563" /> Reset Mobile Login
                        </button>
                        <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#0056b3', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <Fingerprint size={16} color="#9ca3af" /> Edit Biometrics
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
    </div>
  );
}
