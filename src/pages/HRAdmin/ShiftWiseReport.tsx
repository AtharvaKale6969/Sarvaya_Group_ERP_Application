import React, { useState } from 'react';
import { ChevronsUpDown, Calendar, ChevronDown } from 'lucide-react';

export default function ShiftWiseReport() {
  const [orgFilter, setOrgFilter] = useState('');

  const mockData = [
    { id: 'EMP033', name: 'Faizan Sheikh', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Business Analyst', date: '01-07-2026', day: 'Wednesday', shift: 'Daily Shift', from: '10:30 AM', to: '06:30 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:21 AM', lastPunch: '06:58 PM', workingHours: '8h 37m', breakHours: '-' },
    { id: '20', name: 'Sahil Pusdekar', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern', date: '01-07-2026', day: 'Wednesday', shift: 'Default Shift', from: '10:00 AM', to: '07:00 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:49 AM', lastPunch: '06:41 PM', workingHours: '7h 52m', breakHours: '-' },
    { id: '5', name: 'Ekta Satghare', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Intern - Data Analyst', date: '01-07-2026', day: 'Wednesday', shift: 'Default Shift', from: '10:00 AM', to: '07:00 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:43 AM', lastPunch: '06:59 PM', workingHours: '8h 15m', breakHours: '-' },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetahit Farm Solutions Private Limited', dept: 'MPD', designation: 'Business Development Associate', date: '01-07-2026', day: 'Wednesday', shift: 'Default Shift', from: '10:00 AM', to: '07:00 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:35 AM', lastPunch: '06:59 PM', workingHours: '8h 24m', breakHours: '-' },
    { id: 'GC002', name: 'Rakesh Karmakar', org: 'Geoclaim Energy Private Limited', dept: 'Biogas', designation: 'Business Intelligence Analyst', date: '01-07-2026', day: 'Wednesday', shift: 'Default Shift', from: '10:00 AM', to: '07:00 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:21 AM', lastPunch: '06:41 PM', workingHours: '8h 20m', breakHours: '-' },
    { id: 'GC001', name: 'Praful Bhalero', org: 'Geoclaim Energy Private Limited', dept: 'Biogas', designation: 'Business Development Associate', date: '01-07-2026', day: 'Wednesday', shift: 'Daily Shift', from: '10:30 AM', to: '06:30 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:35 AM', lastPunch: '07:41 PM', workingHours: '9h 5m', breakHours: '-' },
    { id: 'EMP003', name: 'Nikhil Tumsare', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Business Development Associate', date: '01-07-2026', day: 'Wednesday', shift: 'Daily Shift', from: '10:30 AM', to: '06:30 PM', breakFrom: '-', breakTo: '-', firstPunch: '09:30 AM', lastPunch: '09:49 PM', workingHours: '10h 11m', breakHours: '2h 8m' },
    { id: 'PF003', name: 'Himanshu Dhote', org: 'Plastroots Foundation', dept: 'CSR', designation: 'Business Development Associate', date: '01-07-2026', day: 'Wednesday', shift: 'Daily Shift', from: '10:30 AM', to: '06:30 PM', breakFrom: '-', breakTo: '-', firstPunch: '09:34 AM', lastPunch: '07:12 PM', workingHours: '9h 37m', breakHours: '-' },
    { id: 'EMP014', name: 'Pratik Wankhede', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Team Lead', date: '01-07-2026', day: 'Wednesday', shift: 'Daily Shift', from: '10:30 AM', to: '06:30 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:34 AM', lastPunch: '08:45 PM', workingHours: '10h 10m', breakHours: '-' },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Business Development Associate', date: '01-07-2026', day: 'Wednesday', shift: 'Default Shift', from: '10:00 AM', to: '07:00 PM', breakFrom: '-', breakTo: '-', firstPunch: '10:50 AM', lastPunch: '06:57 PM', workingHours: '8h 7m', breakHours: '-' },
  ];

  const filteredData = orgFilter === 'All Orgs' || orgFilter === '' 
    ? mockData 
    : mockData.filter(d => d.org === orgFilter);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      {/* Title */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Shift Wise Report
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

      {/* Table Section */}
      <div style={{ overflowX: 'auto', padding: '1.5rem', minHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '6px 0 0 6px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee ID
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Org
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Department
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Designation
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Date
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>Day</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Shift
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>From</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>To</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>Break From</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>Break To</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>First Punch</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>Last Punch</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>Total Working Hours</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '0 6px 6px 0' }}>Total Break Hours</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((row, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{row.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>{row.name}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.org}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.dept}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.designation}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.date}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.day}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.shift}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.from}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.to}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.breakFrom}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.breakTo}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.firstPunch}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.lastPunch}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.workingHours}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>{row.breakHours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>10</span> of <span style={{ fontWeight: '600', color: '#374151' }}>354</span> Results
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
          <button style={{ backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db', width: '32px', height: '32px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            3
          </button>
          <button style={{ backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db', width: '32px', height: '32px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            4
          </button>
          <button style={{ backgroundColor: 'white', color: '#4b5563', border: '1px solid #d1d5db', width: '32px', height: '32px', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            5
          </button>

          <button style={{ backgroundColor: 'white', color: '#0ea5e9', border: '1px solid #d1d5db', padding: '0.375rem 0.75rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
