import React, { useState } from 'react';
import { ChevronDown, ChevronsUpDown, Calendar } from 'lucide-react';

const mockLogs = [
  { id: 1, module: 'Employee', subModule: 'Attendance Permission', empName: 'Shipali Raut', title: 'Attendance Permission changed for Shipali Raut', desc: 'Geo tag is enable for Shipali Raut by HR', payrollDate: '-', action: 'Assign', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:38 PM', actionFrom: 'Web App' },
  { id: 2, module: 'Employee', subModule: 'Employee', empName: 'Shipali Raut', title: 'Employee details updated', desc: 'Employee\'s below data has been changed - Designation changed from Account Excutieve to null by HR...', payrollDate: '-', action: 'Update', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:37 PM', actionFrom: 'Web App' },
  { id: 3, module: 'Employee', subModule: 'Designation', empName: '-', title: 'Designation created', desc: 'Designation (Account Executive) created while creating employee by HR', payrollDate: '-', action: 'Insert', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:37 PM', actionFrom: 'Web App' },
  { id: 4, module: 'Employee', subModule: 'Employee', empName: 'Shipali Raut', title: 'Employee created', desc: 'Employee Shipali Raut created by HR', payrollDate: '-', action: 'Insert', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:36 PM', actionFrom: 'Web App' },
  { id: 5, module: 'Employee', subModule: 'Designation', empName: '-', title: 'Designation created', desc: 'Designation (Account Excutieve) created while creating employee by HR', payrollDate: '-', action: 'Insert', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:36 PM', actionFrom: 'Web App' },
  { id: 6, module: 'Employee', subModule: 'Attendance Permission', empName: 'Vrushabh Raut', title: 'Attendance Permission changed for Vrushabh Raut', desc: 'Geo tag is enable for Vrushabh Raut by HR', payrollDate: '-', action: 'Assign', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:24 PM', actionFrom: 'Web App' },
  { id: 7, module: 'Employee', subModule: 'Employee', empName: 'Vrushabh Raut', title: 'Employee created', desc: 'Employee Vrushabh Raut created by HR', payrollDate: '-', action: 'Insert', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:24 PM', actionFrom: 'Web App' },
  { id: 8, module: 'Employee', subModule: 'Attendance Permission', empName: 'Prajwal Wankhede', title: 'Attendance Permission changed for Prajwal Wankhede', desc: 'Geo tag is enable for Prajwal Wankhede by HR', payrollDate: '-', action: 'Assign', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:19 PM', actionFrom: 'Web App' },
  { id: 9, module: 'Employee', subModule: 'Employee', empName: 'Prajwal Wankhede', title: 'Employee details updated', desc: 'Employee\'s below data has been changed - Employeement type changed from undefined to Full Time - Dat...', payrollDate: '-', action: 'Update', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:19 PM', actionFrom: 'Web App' },
  { id: 10, module: 'Employee', subModule: 'Employee', empName: 'Prajwal Wankhede', title: 'Employee created', desc: 'Employee Prajwal Wankhede created by HR', payrollDate: '-', action: 'Insert', actionBy: 'HR', logDate: '18-07-2026', logTime: '01:18 PM', actionFrom: 'Web App' }
];

export default function ActivityLogs() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Activity Logs <span style={{ color: '#0ea5e9', fontWeight: '600' }}>159</span>
        </h2>
      </div>

      {/* Action / Filter Bar */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 0.75rem', backgroundColor: 'white' }}>
            <span style={{ fontSize: '0.875rem', color: '#4b5563', marginRight: '0.5rem' }}>01 Jul 2026</span>
            <span style={{ fontSize: '0.875rem', color: '#9ca3af', marginRight: '0.5rem' }}>→</span>
            <span style={{ fontSize: '0.875rem', color: '#4b5563', marginRight: '0.75rem' }}>22 Jul 2026</span>
            <Calendar size={16} color="#9ca3af" />
          </div>

          <button onClick={() => alert('Searching...')} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.375rem 1.25rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        <div style={{ position: 'relative' }}>
          <button 
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.375rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
          >
            Actions <ChevronDown size={14} />
          </button>
          
          {dropdownOpen && (
            <div style={{ position: 'absolute', top: '100%', right: 0, marginTop: '0.25rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', minWidth: '120px', zIndex: 10, display: 'flex', flexDirection: 'column' }}>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>Export Excel</button>
              <button style={{ width: '100%', textAlign: 'left', padding: '0.5rem 1rem', border: 'none', background: 'none', cursor: 'pointer', fontSize: '0.875rem', color: '#374151' }}>Export PDF</button>
            </div>
          )}
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '1.5rem', minHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1400px' }}>
          <thead style={{ backgroundColor: '#f0f9ff', borderBottom: '2px solid #e0f2fe' }}>
            <tr>
              {[
                { label: 'Module', sortable: false },
                { label: 'Sub Module', sortable: true },
                { label: 'Employee Name', sortable: true },
                { label: 'Title', sortable: true },
                { label: 'Description', sortable: true },
                { label: 'Payroll Date', sortable: true },
                { label: 'Action', sortable: false },
                { label: 'Action By', sortable: true },
                { label: 'Log Date', sortable: true },
                { label: 'Log Time', sortable: false },
                { label: 'Action from', sortable: true }
              ].map((col, idx, arr) => (
                <th key={col.label} style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: col.sortable ? 'pointer' : 'default' }}>
                    {col.label}
                    {col.sortable && <ChevronsUpDown size={12} color="#94a3b8" />}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((log) => (
              <tr key={log.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.module}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.subModule}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.empName}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', maxWidth: '200px' }}>
                  <div style={{ textWrap: 'wrap' }}>{log.title}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563', maxWidth: '300px' }}>
                  <div style={{ textWrap: 'wrap' }}>{log.desc}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.payrollDate}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.action}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.actionBy}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.logDate}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.logTime}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{log.actionFrom}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
