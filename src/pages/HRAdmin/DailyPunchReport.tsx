import React, { useState } from 'react';
import { ChevronsUpDown, Calendar, ChevronDown, AlertTriangle, Circle } from 'lucide-react';

export default function DailyPunchReport() {
  const [orgFilter, setOrgFilter] = useState('');

  // Fixed columns (employee info)
  const mockFixedData = [
    { id: 'EMP0034', name: 'Shipali Raut', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Account Executive' },
    { id: 'SFS003', name: 'Vrushabh Raut', org: 'Shetahit Farm Solutions Private Limited', dept: 'MPD', designation: 'Business Development Associate' },
    { id: '23', name: 'Prajwal Wankhede', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern' },
    { id: 'SFS002', name: 'Sarang Talmale', org: 'Shetahit Farm Solutions Private Limited', dept: 'FVF', designation: 'Business Development Associate' },
    { id: '20', name: 'Sahil Pusdekar', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern' },
    { id: '5', name: 'Ekta Satghare', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern - Data Analyst' },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetahit Farm Solutions Private Limited', dept: 'FVF', designation: 'Business Development Associate' },
    { id: 'GC002', name: 'Rakesh Karmakar', org: 'Geoclaim Energy Private Limited', dept: 'PMS', designation: 'Business Intelligence Analyst' },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Business Development Associate' },
    { id: 'GC001', name: 'Praful Bhalero', org: 'Geoclaim Energy Private Limited', dept: 'Biogas', designation: 'Business Development Associate' },
  ];

  const fixedData = orgFilter === 'All Orgs' || orgFilter === '' 
    ? mockFixedData 
    : mockFixedData.filter(d => d.org === orgFilter);

  // Dynamic day columns (12 days mocked as per screenshot)
  const days = [
    { date: '01-07-2026', day: 'Wednesday' },
    { date: '02-07-2026', day: 'Thursday' },
    { date: '03-07-2026', day: 'Friday' },
    { date: '04-07-2026', day: 'Saturday' },
    { date: '05-07-2026', day: 'Sunday' },
    { date: '06-07-2026', day: 'Monday' },
    { date: '07-07-2026', day: 'Tuesday' },
    { date: '08-07-2026', day: 'Wednesday' },
    { date: '09-07-2026', day: 'Thursday' },
    { date: '10-07-2026', day: 'Friday' },
    { date: '11-07-2026', day: 'Saturday' },
    { date: '12-07-2026', day: 'Sunday' },
  ];

  // Mock punch data function to simulate the screenshot look
  const getPunchData = (empIndex: number, dayIndex: number) => {
    // Shipali, Vrushabh, Prajwal, Sarang are largely absent/no data '-'
    if (empIndex < 4) return { in: '-', out: '', icon: null };
    
    // Weekends (Saturday/Sunday) mostly '-'
    if (dayIndex === 3 || dayIndex === 4 || dayIndex === 10 || dayIndex === 11) {
      if (empIndex === 4 && dayIndex === 10) return { in: '12:47 PM', out: '', icon: 'warning' };
      return { in: '-', out: '', icon: null };
    }

    // Sahil Pusdekar
    if (empIndex === 4) {
      if (dayIndex === 0) return { in: '10:49 AM', out: '06:41 PM', icon: null };
      if (dayIndex === 1) return { in: '11:07 AM', out: '06:36 PM', icon: null };
      if (dayIndex === 2) return { in: '11:15 AM', out: '', icon: 'warning' };
      if (dayIndex === 5) return { in: '11:44 AM', out: '06:50 PM', icon: null };
      if (dayIndex === 7) return { in: '11:04 AM', out: '07:04 PM', icon: null };
      if (dayIndex === 8) return { in: '11:38 AM', out: '07:07 PM', icon: null };
    }

    // Ekta Satghare
    if (empIndex === 5) {
      if (dayIndex === 0) return { in: '10:43 AM', out: '06:59 PM', icon: null };
      if (dayIndex === 1) return { in: '10:45 AM', out: '06:41 PM', icon: null };
      if (dayIndex === 2) return { in: '10:46 AM', out: '07:05 PM', icon: null };
      if (dayIndex === 7) return { in: '11:03 AM', out: '07:00 PM', icon: null };
      if (dayIndex === 8) return { in: '10:43 AM', out: '07:03 PM', icon: null };
      if (dayIndex === 9) return { in: '10:54 AM', out: '06:51 PM', icon: null };
    }

    // Bhushan (index 8) has some circles
    if (empIndex === 8) {
      if (dayIndex === 0) return { in: '10:50 AM', out: '06:57 PM', icon: null };
      if (dayIndex === 2) return { in: '10:57 AM', out: '07:05 PM', icon: null };
      if (dayIndex === 5) return { in: '10:51 AM', out: '07:07 PM', icon: null };
      if (dayIndex === 6) return { in: '10:26 AM', out: '06:22 PM', icon: null };
      if (dayIndex === 7) return { in: '11:06 AM', out: '07:06 PM', icon: 'circle' };
      if (dayIndex === 8) return { in: '10:55 AM', out: '07:23 PM', icon: null };
      if (dayIndex === 9) return { in: '11:15 AM', out: '07:12 PM', icon: null };
    }

    // Praful (index 9)
    if (empIndex === 9) {
      if (dayIndex === 0) return { in: '10:35 AM', out: '07:41 PM', icon: null };
      if (dayIndex === 1) return { in: '10:55 AM', out: '', icon: 'circle' };
      if (dayIndex === 2) return { in: '10:44 AM', out: '08:01 PM', icon: null };
      if (dayIndex === 5) return { in: '10:35 AM', out: '', icon: 'circle' };
      if (dayIndex === 6) return { in: '-', out: '', icon: 'circle' };
      if (dayIndex === 7) return { in: '11:24 AM', out: '', icon: 'circle' };
      if (dayIndex === 8) return { in: '10:35 AM', out: '06:56 PM', icon: 'circle' };
      if (dayIndex === 9) return { in: '10:38 AM', out: '', icon: 'circle' };
    }

    // Default for others
    return { in: '10:30 AM', out: '06:30 PM', icon: null };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      {/* Title */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Daily Punch Report
        </h2>
      </div>

      {/* Top Filter Bar */}
      <div style={{ padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
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

        <div style={{ display: 'flex', gap: '0.5rem' }}>
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
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '1600px' }}>
          <thead style={{ backgroundColor: '#f0f9ff', borderBottom: '2px solid #e0f2fe' }}>
            <tr>
              {/* Fixed Columns */}
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee ID
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Org
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Department
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: '1px solid #e0f2fe' }}>
                Designation
              </th>

              {/* Dynamic Day Columns */}
              {days.map((day, idx) => (
                <th key={idx} style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRight: idx === days.length - 1 ? 'none' : '1px solid #e0f2fe', textAlign: 'center', minWidth: '100px' }}>
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
                
                {days.map((_, dayIdx) => {
                  const data = getPunchData(empIdx, dayIdx);
                  return (
                    <td key={dayIdx} style={{ padding: '1rem', fontSize: '0.75rem', color: '#4b5563', borderRight: '1px solid #f3f4f6', textAlign: 'center', verticalAlign: 'top' }}>
                      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', textAlign: 'center' }}>
                          <span style={{ color: data.in === '-' ? '#9ca3af' : '#1e40af', fontWeight: '500' }}>{data.in}</span>
                          {data.out && <span style={{ color: '#047857', fontWeight: '500' }}>{data.out}</span>}
                        </div>
                        {data.icon === 'warning' && <AlertTriangle size={14} color="#f59e0b" fill="#fef3c7" />}
                        {data.icon === 'circle' && <Circle size={14} color="#0ea5e9" strokeWidth={3} />}
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
