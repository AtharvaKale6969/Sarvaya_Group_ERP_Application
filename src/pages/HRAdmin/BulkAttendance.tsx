import React, { useState } from 'react';
import { ChevronDown, Calendar, Info, RefreshCw } from 'lucide-react';

export default function BulkAttendance() {
  // Generate dates from 01 Jul to 20 Jul (as requested)
  const dates = Array.from({ length: 20 }, (_, i) => {
    const dayNames = ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'];
    return {
      date: `${String(i + 1).padStart(2, '0')}-Jul`,
      day: dayNames[i % 7]
    };
  });

  const [mockData, setMockData] = useState([
    { id: 'EMP007', name: 'Ankit Bhalerao', org: 'Shetahit Farm Solutions', dept: 'MPD', desig: 'Operations Head', attendance: ['FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'A', 'A', 'A', 'A', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'EMP014', name: 'Pratik Wankhede', org: 'Shetahit Farm Solutions', dept: 'MPD', desig: 'Team Lead', attendance: ['FD', 'FD', 'FD', 'FD(blue)', 'WO', 'FD(blue)', 'FD', 'FD(blue)', 'FD', 'FD', 'FD(blue)', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'EMP003', name: 'Nikhil Tumsare', org: 'Shetahit Farm Solutions', dept: 'MPD', desig: 'Business Development Associate', attendance: ['FD(red)', 'FD', 'A(red)', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'A', 'FD', 'WO', 'FD'] },
    { id: 'EMP020', name: 'Shweta Wakodikar', org: 'Shetahit Farm Solutions', dept: 'MPD', desig: 'Finance Executive', attendance: ['FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'A(red)', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'A', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'EMP026', name: 'Vedant Lonare', org: 'Shetahit Farm Solutions', dept: 'MPD', desig: 'Executive Data Analyst', attendance: ['FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'HD(red)', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'EMP024', name: 'Aditya Kandekar', org: 'Shetahit Farm Solutions', dept: 'FVF', desig: 'Business Development Associate', attendance: ['FD', 'FD(blue)', 'FD', 'FD(blue)', 'WO', 'FD', 'FD', 'FD(blue)', 'FD(blue)', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'PF003', name: 'Himanshu Dhote', org: 'Plastroots Foundation', dept: 'RRC', desig: 'Business Development Associate', attendance: ['FD', 'FD', 'FD', 'FD(blue)', 'WO', 'FD', 'FD', 'A', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'EMP032', name: 'Atharva Kale', org: 'Shetahit Farm Solutions', dept: 'FVF', desig: 'Data Analyst', attendance: ['FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'EMP033', name: 'Faizan Sheikh', org: 'Shetahit Farm Solutions', dept: 'MPD', desig: 'Business Analyst', attendance: ['FD', 'FD', 'FD', 'FD', 'WO', 'A', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'GC001', name: 'Praful Bhalero', org: 'Geoclaim Energy Private Limited.', dept: 'PMS', desig: 'Business Development Associate', attendance: ['FD', 'FD(blue)', 'FD', 'FD', 'WO', 'FD(blue)', 'FD(blue)', 'FD(blue)', 'FD(blue)', 'FD', 'FD(blue)', 'WO', 'FD', 'FD(blue)', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Shetahit Farm Solutions', dept: 'FVF', desig: 'Business Development Associate', attendance: ['FD', 'SL', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD(blue)', 'FD', 'FD', 'FD', 'WO', 'FD', 'FD', 'FD', 'FD', 'FD', 'FD', 'WO', 'FD'] }
  ]);

  const [activeCell, setActiveCell] = useState<{ rowId: string, colIdx: number } | null>(null);
  const [selectedOrg, setSelectedOrg] = useState('All Orgs');
  const [appliedOrg, setAppliedOrg] = useState('All Orgs');

  const attendanceOptions = ['HD', 'FD', 'A', 'WO', 'CL', 'SL', 'PL', 'OH', 'LWP'];

  const orgOptions = [
    'All Orgs',
    'Shetahit Farm Solutions',
    'Geoclaim Energy Private Limited.',
    'Plastroots Foundation',
    'Plastroots Waste Management & Solutions Private Limited',
    'Aayuneer Enterprises'
  ];

  const handleCellChange = (rowId: string, colIdx: number, newValue: string) => {
    setMockData(prev => prev.map(row => {
      if (row.id === rowId) {
        const newAttendance = [...row.attendance];
        newAttendance[colIdx] = newValue;
        return { ...row, attendance: newAttendance };
      }
      return row;
    }));
    setActiveCell(null);
  };

  const handleSearch = () => {
    setAppliedOrg(selectedOrg);
  };

  const filteredData = mockData.filter(row => {
    if (appliedOrg !== 'All Orgs' && row.org !== appliedOrg) return false;
    return true;
  });

  const getStatusColor = (val: string) => {
    if (val.includes('(red)') || val === 'A') return '#ef4444';
    if (val.includes('(blue)')) return '#0ea5e9';
    return '#374151'; // Default
  };

  const getCleanVal = (val: string) => {
    return val.replace('(red)', '').replace('(blue)', '');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      
      {/* Title */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>Bulk Attendance Adjustments</h2>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#374151', fontSize: '0.875rem' }}>
            01 Jul 2026 <span style={{ color: '#9ca3af' }}>→</span> 20 Jul 2026 <Calendar size={16} color="#9ca3af" />
          </button>
          
          <div style={{ position: 'relative', width: '200px' }}>
            <select 
              value={selectedOrg}
              onChange={(e) => setSelectedOrg(e.target.value)}
              style={{ width: '100%', appearance: 'none', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white', outline: 'none' }}
            >
              {orgOptions.map(org => (
                <option key={org} value={org}>{org}</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
          </div>

          <button onClick={handleSearch} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Search
          </button>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <Info size={18} />
          </button>
          <button style={{ background: 'none', border: 'none', fontSize: '0.875rem', color: '#6b7280', cursor: 'pointer' }}>
            Save Changes
          </button>
          <button style={{ border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#374151', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Export Excel
          </button>
          
          <div style={{ position: 'relative' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#374151', padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              Reset Columns <ChevronDown size={14} color="#6b7280" />
            </button>
          </div>

          <button style={{ background: 'none', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', padding: '0.5rem', cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#6b7280' }}>
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Excel Table Wrapper */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: 'max-content', borderCollapse: 'collapse', textAlign: 'left', minWidth: '100%' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10, backgroundColor: '#eff6ff' }}>
            
            {/* Top Header Row */}
            <tr style={{ borderBottom: '1px solid #d1d5db' }}>
              <th colSpan={2} style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center', borderRight: '1px solid #d1d5db', borderBottom: '1px solid #d1d5db', position: 'sticky', left: 0, zIndex: 11, backgroundColor: '#eff6ff' }}>Employees</th>
              <th colSpan={3} style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center', borderRight: '1px solid #d1d5db', borderBottom: '1px solid #d1d5db', position: 'sticky', left: '260px', zIndex: 11, backgroundColor: '#eff6ff' }}>Hierarchy</th>
              
              {dates.map((d, i) => (
                <th key={i} style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', textAlign: 'center', borderRight: '1px solid #d1d5db', borderBottom: '1px solid #d1d5db' }}>
                  {d.date}
                </th>
              ))}
            </tr>

            {/* Sub Header Row */}
            <tr style={{ borderBottom: '1px solid #d1d5db' }}>
              <th style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #e5e7eb', width: '100px', position: 'sticky', left: 0, zIndex: 11, backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  Employee ID
                </div>
              </th>
              <th style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #d1d5db', width: '160px', position: 'sticky', left: '100px', zIndex: 11, backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  Employee Name
                </div>
              </th>
              <th style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #e5e7eb', width: '180px', position: 'sticky', left: '260px', zIndex: 11, backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  Organization
                </div>
              </th>
              <th style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #e5e7eb', width: '150px', position: 'sticky', left: '440px', zIndex: 11, backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  Department
                </div>
              </th>
              <th style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151', borderRight: '1px solid #d1d5db', width: '200px', position: 'sticky', left: '590px', zIndex: 11, backgroundColor: '#f9fafb' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                  Designation
                </div>
              </th>

              {dates.map((d, i) => (
                <th key={i} style={{ padding: '0.75rem', fontSize: '0.75rem', fontWeight: '600', color: d.day === 'Sun' ? '#ef4444' : (d.day === 'Sat' ? '#0ea5e9' : '#374151'), borderRight: '1px solid #e5e7eb', minWidth: '60px', backgroundColor: '#f9fafb' }}>
                  {d.day}
                </th>
              ))}
            </tr>
          </thead>
          
          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={24} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                  No employees found for the selected organization.
                </td>
              </tr>
            )}
            {filteredData.map((row, rIdx) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', position: 'sticky', left: 0, zIndex: 1, backgroundColor: 'white' }}>{row.id}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #d1d5db', position: 'sticky', left: '100px', zIndex: 1, backgroundColor: 'white' }}>{row.name}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', position: 'sticky', left: '260px', zIndex: 1, backgroundColor: 'white' }}>{row.org}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', position: 'sticky', left: '440px', zIndex: 1, backgroundColor: 'white' }}>{row.dept}</td>
                <td style={{ padding: '0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #d1d5db', position: 'sticky', left: '590px', zIndex: 1, backgroundColor: 'white' }}>{row.desig}</td>
                
                {row.attendance.map((val, cIdx) => (
                  <td key={cIdx} style={{ padding: 0, borderRight: '1px solid #e5e7eb', minWidth: '60px', height: '40px', position: 'relative' }}>
                    {activeCell?.rowId === row.id && activeCell?.colIdx === cIdx ? (
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', minWidth: '70px', zIndex: 50, backgroundColor: 'white', border: '1px solid #3b82f6', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid #e5e7eb', cursor: 'pointer' }} onClick={() => setActiveCell(null)}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: getStatusColor(val) }}>{getCleanVal(val)}</span>
                          <ChevronDown size={12} color="#9ca3af" style={{ transform: 'rotate(180deg)' }} />
                        </div>
                        <div style={{ maxHeight: '150px', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
                          {attendanceOptions.map(opt => (
                            <div 
                              key={opt} 
                              onClick={() => handleCellChange(row.id, cIdx, opt)}
                              style={{ padding: '0.5rem', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer', backgroundColor: getCleanVal(val) === opt ? '#0ea5e9' : 'white', color: getCleanVal(val) === opt ? 'white' : '#374151' }}
                            >
                              {opt}
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => setActiveCell({ rowId: row.id, colIdx: cIdx })}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', height: '100%', cursor: 'pointer', border: 'none' }}
                      >
                        <span style={{ fontSize: '0.75rem', fontWeight: '600', color: getStatusColor(val) }}>
                          {getCleanVal(val)}
                        </span>
                        <ChevronDown size={12} color="#9ca3af" />
                      </div>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </div>
    </div>
  );
}
