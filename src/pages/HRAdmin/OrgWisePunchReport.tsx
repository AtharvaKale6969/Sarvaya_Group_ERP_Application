import React, { useState } from 'react';
import { ChevronsUpDown, Calendar, ChevronDown, AlertTriangle, Circle } from 'lucide-react';

export default function OrgWisePunchReport() {
  const [orgFilter, setOrgFilter] = useState('');

  // Fixed columns (employee info)
  const mockFixedData = [
    { id: 'EMP0034', name: 'Shipali Raut', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Account Executive', totalWorking: '17h 56m', totalBreak: '0h' },
    { id: 'SFS003', name: 'Vrushabh Raut', org: 'Shetahit Farm Solutions Private Limited', dept: 'MPD', designation: 'Business Development Associate', totalWorking: '24h 18m', totalBreak: '0h' },
    { id: '23', name: 'Prajwal Wankhede', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern', totalWorking: '15h 53m', totalBreak: '0h' },
    { id: 'SFS002', name: 'Sarang Talmale', org: 'Shetahit Farm Solutions Private Limited', dept: 'MPD', designation: 'Business Development Associate', totalWorking: '0h', totalBreak: '0h' },
    { id: '20', name: 'Sahil Pusdekar', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern', totalWorking: '63h 11m', totalBreak: '0h' },
    { id: '5', name: 'Ekta Satghare', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern - Data Analyst', totalWorking: '104h 5m', totalBreak: '0h' },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetahit Farm Solutions Private Limited', dept: 'FVF', designation: 'Business Development Associate', totalWorking: '142h 55m', totalBreak: '0h' },
    { id: 'GC002', name: 'Rakesh Karmakar', org: 'Geoclaim Energy Private Limited', dept: 'Biogas', designation: 'Business Intelligence Analyst', totalWorking: '149h 47m', totalBreak: '0h' },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Business Development Associate', totalWorking: '145h 14m', totalBreak: '0h' },
    { id: 'GC001', name: 'Praful Bhalero', org: 'Geoclaim Energy Private Limited', dept: 'PMS', designation: 'Business Development Associate', totalWorking: '136h 15m', totalBreak: '0h' },
  ];

  const fixedData = orgFilter === 'All Orgs' || orgFilter === '' 
    ? mockFixedData 
    : mockFixedData.filter(d => d.org === orgFilter);

  // Dynamic day columns (14 days mocked as per screenshot)
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
    { date: '12 July', day: 'Sunday' },
    { date: '13 July', day: 'Monday' },
    { date: '14 July', day: 'Tuesday' },
  ];

  // Mock data function to simulate the screenshot look
  const getWorkingHours = (empIndex: number, dayIndex: number) => {
    // Top users mostly 0h
    if (empIndex < 4) return { time: '0h', icon: null };
    
    // Weekends (Saturday/Sunday) mostly 0h
    if (dayIndex === 3 || dayIndex === 4 || dayIndex === 10 || dayIndex === 11) {
      if (empIndex === 4 && dayIndex === 3) return { time: '0h', icon: 'warning' };
      if (empIndex === 4 && dayIndex === 10) return { time: '0h', icon: 'warning' };
      return { time: '0h', icon: null };
    }

    // Sahil Pusdekar
    if (empIndex === 4) {
      if (dayIndex === 0) return { time: '7h 52m', icon: null };
      if (dayIndex === 1) return { time: '10h 28m', icon: null };
      if (dayIndex === 5) return { time: '7h 5m', icon: null };
      if (dayIndex === 6) return { time: '8h', icon: null };
      if (dayIndex === 7) return { time: '7h 28m', icon: null };
      if (dayIndex === 12) return { time: '0h', icon: 'warning' };
      return { time: '0h', icon: null };
    }

    // Ekta Satghare
    if (empIndex === 5) {
      if (dayIndex === 0) return { time: '8h 15m', icon: null };
      if (dayIndex === 1) return { time: '7h 55m', icon: null };
      if (dayIndex === 2) return { time: '8h 19m', icon: null };
      if (dayIndex === 5) return { time: '8h 22m', icon: null };
      if (dayIndex === 7) return { time: '7h 56m', icon: null };
      if (dayIndex === 8) return { time: '8h 19m', icon: null };
      if (dayIndex === 9) return { time: '7h 56m', icon: null };
      if (dayIndex === 12) return { time: '8h 14m', icon: null };
      return { time: '0h', icon: null };
    }

    // Bhushan (index 8) 
    if (empIndex === 8) {
      if (dayIndex === 0) return { time: '8h 7m', icon: null };
      if (dayIndex === 2) return { time: '8h 27m', icon: null };
      if (dayIndex === 5) return { time: '8h 15m', icon: null };
      if (dayIndex === 6) return { time: '9h 54m', icon: null };
      if (dayIndex === 7) return { time: '8h', icon: 'circle' };
      if (dayIndex === 8) return { time: '8h 28m', icon: null };
      if (dayIndex === 9) return { time: '8h 2m', icon: null };
      if (dayIndex === 12) return { time: '8h 39m', icon: null };
      if (dayIndex === 13) return { time: '8h 26m', icon: null };
    }

    // Praful (index 9)
    if (empIndex === 9) {
      if (dayIndex === 0) return { time: '9h 5m', icon: null };
      if (dayIndex === 1) return { time: '8h', icon: 'circle' };
      if (dayIndex === 2) return { time: '9h 16m', icon: null };
      if (dayIndex === 5) return { time: '10h 14m', icon: null };
      if (dayIndex === 6) return { time: '8h', icon: 'circle' };
      if (dayIndex === 7) return { time: '8h', icon: 'circle' };
      if (dayIndex === 8) return { time: '8h', icon: 'circle' };
      if (dayIndex === 9) return { time: '8h 10m', icon: null };
      if (dayIndex === 12) return { time: '8h', icon: 'circle' };
      if (dayIndex === 13) return { time: '8h 37m', icon: null };
    }

    // Default for others
    return { time: '8h 24m', icon: null };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      {/* Title */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Org Wise Punch Report
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
          <button onClick={() => alert('Exporting to PDF...')} style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.375rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Export PDF
          </button>
        </div>
      </div>

      {/* Table Section with Horizontal Scroll */}
      <div style={{ overflowX: 'auto', padding: '1.5rem', minHeight: '400px' }}>
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
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Designation
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Total<br/>Working Hours
              </th>

              {/* Dynamic Day Columns */}
              {days.map((day, idx) => (
                <th key={idx} style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: idx === days.length - 1 ? 'none' : '1px solid #e0f2fe', textAlign: 'center', minWidth: '70px' }}>
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
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', borderRight: '1px solid #f3f4f6' }}>{emp.totalWorking}</td>
                
                
                {days.map((_, dayIdx) => {
                  const data = getWorkingHours(empIdx, dayIdx);
                  return (
                    <td key={dayIdx} style={{ padding: '1rem', fontSize: '0.75rem', color: '#4b5563', borderRight: '1px solid #f3f4f6', textAlign: 'center', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', alignItems: 'center', gap: '0.35rem' }}>
                          <span style={{ color: data.time === '0h' ? '#111827' : '#1e40af', fontWeight: '500', borderBottom: data.time !== '0h' ? '1px solid #93c5fd' : '1px solid #e5e7eb', paddingBottom: '2px' }}>
                            {data.time}
                          </span>
                          {data.icon === 'circle' && <Circle size={12} color="#0ea5e9" strokeWidth={3} />}
                        </div>
                        {data.icon === 'warning' && (
                          <div style={{ backgroundColor: '#fffbeb', padding: '2px 4px', borderRadius: '4px', marginTop: '2px' }}>
                            <AlertTriangle size={14} color="#f59e0b" fill="#fef3c7" />
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
  );
}
