import React, { useState } from 'react';
import { ChevronsUpDown, Calendar, ChevronDown, AlertTriangle, Circle } from 'lucide-react';

export default function MusterReport() {
  const [orgFilter, setOrgFilter] = useState('');

  // Fixed columns (employee info)
  const mockFixedData = [
    { id: 'EMP007', name: 'Ankit Bhalerao', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Operations Head', fd: '12', hd: '0', a: '7.0', wo: '3', l: '0.0', h: '0' },
    { id: 'EMP014', name: 'Pratik Wankhede', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Team Lead', fd: '17', hd: '0', a: '2.0', wo: '3', l: '0.0', h: '0' },
    { id: 'EMP003', name: 'Nikhil Tumsare', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Business Development Associate', fd: '17', hd: '0', a: '2.0', wo: '3', l: '0.0', h: '0' },
    { id: 'EMP020', name: 'Shweta Wakodikar', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Finance Executive', fd: '16', hd: '0', a: '3.0', wo: '3', l: '0.0', h: '0' },
    { id: 'EMP026', name: 'Vedant Lonare', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Executive Data Analyst', fd: '17', hd: '1', a: '1.5', wo: '3', l: '0.0', h: '0' },
    { id: 'EMP024', name: 'Aditya Kandekar', org: 'Aayuneer Enterprises', dept: 'Zoo Platform', designation: 'Business Development Associate', fd: '17', hd: '0', a: '2.0', wo: '3', l: '0.0', h: '0' },
    { id: 'PF003', name: 'Himanshu Dhote', org: 'Plastroots Foundation', dept: 'CSR', designation: 'Business Development Associate', fd: '16', hd: '0', a: '3.0', wo: '3', l: '0.0', h: '0' },
    { id: 'EMP032', name: 'Atharva Kale', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Data Analyst', fd: '17', hd: '0', a: '2.0', wo: '3', l: '0.0', h: '0' },
    { id: 'EMP033', name: 'Faizan Sheikh', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Business Analyst', fd: '15', hd: '0', a: '4.0', wo: '3', l: '0.0', h: '0' },
    { id: 'GC001', name: 'Praful Bhalero', org: 'Geoclaim Energy Private Limited', dept: 'Biogas', designation: 'Business Development Associate', fd: '16', hd: '0', a: '3.0', wo: '3', l: '0.0', h: '0' },
  ];

  const fixedData = orgFilter === 'All Orgs' || orgFilter === '' 
    ? mockFixedData 
    : mockFixedData.filter(d => d.org === orgFilter);

  // Dynamic day columns (11 days mocked as per screenshot)
  const days = [
    { date: '01 July', day: 'Wednesday' },
    { date: '02 July', day: 'Thursday' },
    { date: '03 July', day: 'Friday' },
    { date: '04 July', day: 'Saturday' },
    { date: '05 July', day: 'Sunday' },
    { date: '06 July', day: 'Monday' },
    { date: '07 July', day: 'Tuesday' },
    { date: '08 July', day: 'Wednesday' },
    { date: '09 July', day: 'Thursday' },
    { date: '10 July', day: 'Friday' },
    { date: '11 July', day: 'Saturday' },
  ];

  // Mock data function to simulate the screenshot look
  const getMusterData = (empIndex: number, dayIndex: number) => {
    // Weekends (Sunday = dayIndex 4, Saturday = dayIndex 3/10)
    if (dayIndex === 4) return { status: 'WO', icon: null };
    
    // Ankit
    if (empIndex === 0) {
      if (dayIndex === 6) return { status: 'A', icon: 'warning' };
      if (dayIndex === 7) return { status: 'A', icon: 'warning' };
      if (dayIndex === 8) return { status: 'A', icon: null };
      if (dayIndex === 9) return { status: 'A', icon: 'warning' };
    }

    // Pratik
    if (empIndex === 1) {
      if (dayIndex === 3) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 6) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 7) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 10) return { status: 'FD', icon: 'circle' };
    }

    // Nikhil
    if (empIndex === 2) {
      if (dayIndex === 2) return { status: 'A', icon: 'warning' };
    }

    // Shweta
    if (empIndex === 3) {
      if (dayIndex === 6) return { status: 'A', icon: 'warning' };
    }

    // Vedant
    if (empIndex === 4) {
      if (dayIndex === 7) return { status: 'HD', icon: 'warning' };
    }

    // Aditya
    if (empIndex === 5) {
      if (dayIndex === 1) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 3) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 7) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 8) return { status: 'FD', icon: 'circle' };
    }

    // Himanshu
    if (empIndex === 6) {
      if (dayIndex === 3) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 7) return { status: 'A', icon: null };
    }
    
    // Faizan
    if (empIndex === 8) {
      if (dayIndex === 6) return { status: 'A', icon: null };
    }

    // Praful
    if (empIndex === 9) {
      if (dayIndex === 1) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 3) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 6) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 7) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 8) return { status: 'FD', icon: 'circle' };
      if (dayIndex === 10) return { status: 'FD', icon: 'circle' };
    }

    // Default 
    return { status: 'FD', icon: null };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'FD': return '#111827';
      case 'WO': return '#d1d5db';
      case 'A': return '#ef4444';
      case 'HD': return '#ef4444';
      default: return '#111827';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      {/* Title */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Muster Report
        </h2>
      </div>

      {/* Top Filter Bar */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 0.75rem', backgroundColor: 'white' }}>
            <span style={{ fontSize: '0.875rem', color: '#4b5563', marginRight: '0.5rem' }}>01 Jul 2026</span>
            <span style={{ fontSize: '0.875rem', color: '#9ca3af', marginRight: '0.5rem' }}>→</span>
            <span style={{ fontSize: '0.875rem', color: '#4b5563', marginRight: '0.75rem' }}>22 Jul 2026</span>
            <Calendar size={16} color="#9ca3af" />
          </div>

          <div style={{ position: 'relative' }}>
            <select 
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
              style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#6b7280', backgroundColor: 'white', cursor: 'pointer', minWidth: '180px', outline: 'none' }}
            >
              <option value="All Orgs">All Orgs</option>
              <option value="Plastroots Waste Management & Solutions Private Limited">Plastroots Waste Management & Solutions Private Limited</option>
              <option value="Plastroots Foundation">Plastroots Foundation</option>
              <option value="Shetahit Farm Solutions Private Limited">Shetahit Farm Solutions Private Limited</option>
              <option value="Geoclaim Energy Private Limited">Geoclaim Energy Private Limited</option>
              <option value="Aayuneer Enterprises">Aayuneer Enterprises</option>
              <option value="Saravya Group">Saravya Group</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#9ca3af' }} />
          </div>

          <button onClick={() => alert('Searching...')} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.375rem 1.25rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button onClick={() => alert('Exporting to Excel...')} style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.375rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Export Excel
          </button>
          <div style={{ display: 'flex', borderRadius: '6px', overflow: 'hidden', border: '1px solid #d1d5db' }}>
            <div style={{ padding: '0.375rem 1rem', backgroundColor: 'white', fontSize: '0.875rem', fontWeight: '500', color: '#374151', borderRight: '1px solid #d1d5db' }}>
              Muster Report
            </div>
            <div onClick={() => alert('Opening Attendance Report options...')} style={{ padding: '0.375rem 0.75rem', backgroundColor: 'white', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Attendance Report</span>
              <ChevronDown size={14} color="#6b7280" />
            </div>
          </div>
        </div>
      </div>

      {/* Table Section with Horizontal Scroll */}
      <div style={{ overflowX: 'auto', padding: '1.5rem', minHeight: '400px' }}>
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1700px' }}>
          <thead style={{ backgroundColor: '#f0f9ff', borderBottom: '2px solid #e0f2fe' }}>
            <tr>
              {/* Fixed Columns */}
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee ID
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Org
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Department
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Designation
              </th>
              <th style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Full<br/>Days
              </th>
              <th style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Half<br/>Days
              </th>
              <th style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Absent<br/>Days
              </th>
              <th style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Week Off
              </th>
              <th style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Leaves
              </th>
              <th style={{ padding: '0.875rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Holidays
              </th>

              {/* Dynamic Day Columns */}
              {days.map((day, idx) => (
                <th key={idx} style={{ padding: '0.875rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: idx === days.length - 1 ? 'none' : '1px solid #e0f2fe', textAlign: 'center', minWidth: '60px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span>{day.date}</span>
                    <span style={{ fontWeight: '400', color: '#64748b' }}>{day.day}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {fixedData.map((emp, empIdx) => (
              <tr key={empIdx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', borderRight: '1px solid #f3f4f6' }}>{emp.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500', borderRight: '1px solid #f3f4f6' }}>{emp.name}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563', borderRight: '1px solid #f3f4f6' }}>{emp.org}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563', borderRight: '1px solid #f3f4f6' }}>{emp.dept}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563', borderRight: '1px solid #f3f4f6' }}>{emp.designation}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', color: '#111827', borderRight: '1px solid #f3f4f6', textAlign: 'center' }}>{emp.fd}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', color: '#111827', borderRight: '1px solid #f3f4f6', textAlign: 'center' }}>{emp.hd}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', color: '#111827', borderRight: '1px solid #f3f4f6', textAlign: 'center' }}>{emp.a}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', color: '#111827', borderRight: '1px solid #f3f4f6', textAlign: 'center' }}>{emp.wo}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', color: '#111827', borderRight: '1px solid #f3f4f6', textAlign: 'center' }}>{emp.l}</td>
                <td style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', color: '#111827', borderRight: '1px solid #f3f4f6', textAlign: 'center' }}>{emp.h}</td>
                
                {days.map((_, dayIdx) => {
                  const data = getMusterData(empIdx, dayIdx);
                  return (
                    <td key={dayIdx} style={{ padding: '1rem 0.5rem', fontSize: '0.875rem', borderRight: '1px solid #f3f4f6', textAlign: 'center', verticalAlign: 'middle' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}>
                        <span style={{ color: getStatusColor(data.status), fontWeight: data.status === 'WO' ? '400' : '500' }}>
                          {data.status}
                        </span>
                        {data.icon === 'circle' && <Circle size={10} color="#0ea5e9" strokeWidth={3} />}
                        {data.icon === 'warning' && (
                          <div style={{ backgroundColor: '#fffbeb', padding: '2px', borderRadius: '4px' }}>
                            <AlertTriangle size={12} color="#f59e0b" fill="#fef3c7" />
                          </div>
                        )}
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>10</span> of <span style={{ fontWeight: '600', color: '#374151' }}>19</span> Results
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', marginRight: '1rem' }}>
            <select style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white', outline: 'none' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <option>10 / Page</option>
              <option>20 / Page</option>
              <option>50 / Page</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
          </div>

          <button style={{ backgroundColor: 'white', color: '#9ca3af', border: '1px solid #d1d5db', padding: '0.375rem 0.75rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'not-allowed' }}>
            Previous
          </button>
          
          <button style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', width: '32px', height: '32px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            1
          </button>
          <button style={{ backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db', width: '32px', height: '32px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            2
          </button>

          <button style={{ backgroundColor: 'white', color: '#0ea5e9', border: '1px solid #d1d5db', padding: '0.375rem 0.75rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
