import { useState, useRef } from 'react';
import { Calendar, Maximize, Search, Download, Save, ChevronDown } from 'lucide-react';

export default function Roster() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const spreadsheetRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  const [selectedOrg, setSelectedOrg] = useState('All Organizations');
  const [activeFilterOrg, setActiveFilterOrg] = useState('All Organizations');

  // Sample data
  const allEmployees = [
    { code: 'GC001', name: 'Praful Bhalerao', branch: 'Geoclaim Energy Private Limited', dept: 'PMS', designation: 'Business Development Associate' },
    { code: 'EMP031', name: 'Bhushan Chilange', branch: 'Plastroots Waste Management & Solutions Private Limited', dept: 'RMT', designation: 'Business Development Associate' },
    { code: 'GC002', name: 'Rakesh Karmakar', branch: 'Geoclaim Energy Private Limited', dept: 'Biomass', designation: 'Business Intelligence Analyst' },
    { code: 'SFS001', name: 'Ankita Kathe', branch: 'Shetahit Farm Solutions Private Limited', dept: 'MPD', designation: 'Business Development Associate' },
  ];

  const employees = activeFilterOrg === 'All Organizations' 
    ? allEmployees 
    : allEmployees.filter(emp => emp.branch === activeFilterOrg);

  const dates = [
    { date: '23-Jul', day: 'Thu' },
    { date: '24-Jul', day: 'Fri' },
    { date: '25-Jul', day: 'Sat' },
    { date: '26-Jul', day: 'Sun' },
    { date: '27-Jul', day: 'Mon' },
    { date: '28-Jul', day: 'Tue' },
    { date: '29-Jul', day: 'Wed' },
  ];

  // Map of shifts with their background colors
  const shiftTypes = {
    'Daily Shift': '#fef08a', // Yellow-ish
    'Week Off': '#e0f2fe',    // Blue-ish
    'Default Shift': '#f3f4f6', // Gray-ish
  };

  // State to track the selected shift for each employee on each date
  // Key format: `${empCode}-${date}`
  const [rosterData, setRosterData] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    allEmployees.forEach(emp => {
      dates.forEach(date => {
        initial[`${emp.code}-${date.date}`] = date.day === 'Sun' ? 'Week Off' : 'Daily Shift';
      });
    });
    return initial;
  });

  const handleShiftChange = (empCode: string, date: string, shift: string) => {
    setRosterData(prev => ({
      ...prev,
      [`${empCode}-${date}`]: shift
    }));
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (spreadsheetRef.current) {
        spreadsheetRef.current.requestFullscreen().catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullscreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', height: '100%', minHeight: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: '#111827' }}>
          Roster Spreadsheet
        </h2>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Date Picker */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 0.5rem', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white' }}>
            <input type="date" defaultValue="2026-07-23" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', color: '#374151', fontSize: '0.875rem' }} />
            <span style={{ color: '#9ca3af' }}>→</span>
            <input type="date" defaultValue="2026-07-30" style={{ border: 'none', outline: 'none', backgroundColor: 'transparent', color: '#374151', fontSize: '0.875rem' }} />
          </div>

          {/* Org Dropdown */}
          <select 
            value={selectedOrg}
            onChange={(e) => setSelectedOrg(e.target.value)}
            style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 2.5rem 0.5rem 1rem', fontSize: '0.875rem', color: '#374151', appearance: 'none', backgroundColor: 'white', minWidth: '350px' }}
          >
            <option>All Organizations</option>
            <option>Plastroots Waste Management & Solutions Private Limited</option>
            <option>Plastroots Foundation</option>
            <option>Shetahit Farm Solutions Private Limited</option>
            <option>Geoclaim Energy Private Limited</option>
            <option>Aayuneer Enterprises</option>
            <option>Saravya Group</option>
          </select>

          <button 
            onClick={() => { setActiveFilterOrg(selectedOrg); setCurrentPage(1); }}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
          >
            Search
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Save
          </button>
          <button style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Export Excel
          </button>
          <button 
            onClick={toggleFullscreen}
            style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Enter Fullscreen
          </button>
        </div>
      </div>

      {/* Spreadsheet Table Container */}
      <div ref={spreadsheetRef} style={{ border: '1px solid #e5e7eb', borderRadius: '4px', overflow: 'auto', flex: 1, backgroundColor: '#f9fafb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '1500px', backgroundColor: 'white' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
            {/* Top Header Row */}
            <tr style={{ backgroundColor: '#e0f2fe' }}>
              <th colSpan={2} style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#1e3a8a' }}>Employees</th>
              <th colSpan={3} style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#1e3a8a' }}>Hierarchy</th>
              {dates.map((date) => (
                <th key={date.date} style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#1e3a8a', width: '150px' }}>
                  {date.date}
                </th>
              ))}
            </tr>
            {/* Sub Header Row */}
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', width: '80px' }}>Code</th>
              <th style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', width: '150px' }}>Name</th>
              <th style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', width: '200px' }}>Branch</th>
              <th style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', width: '150px' }}>Department</th>
              <th style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', width: '150px' }}>Designation</th>
              {dates.map((date) => (
                <th key={date.date} style={{ padding: '0.75rem 1rem', border: '1px solid #d1d5db', textAlign: 'left', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>
                  {date.day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr>
                <td colSpan={dates.length + 5} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                  No employees found for this organization.
                </td>
              </tr>
            ) : (
              employees.map((emp) => (
                <tr key={emp.code}>
                  <td style={{ padding: '1.5rem 1rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280', verticalAlign: 'middle' }}>{emp.code}</td>
                  <td style={{ padding: '1.5rem 1rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#374151', verticalAlign: 'middle' }}>{emp.name}</td>
                  <td style={{ padding: '1.5rem 1rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280', verticalAlign: 'middle' }}>{emp.branch}</td>
                  <td style={{ padding: '1.5rem 1rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280', verticalAlign: 'middle' }}>{emp.dept}</td>
                  <td style={{ padding: '1.5rem 1rem', border: '1px solid #e5e7eb', fontSize: '0.875rem', color: '#6b7280', verticalAlign: 'middle' }}>{emp.designation}</td>
                  {dates.map((date) => {
                    const shift = rosterData[`${emp.code}-${date.date}`];
                    const bgColor = shiftTypes[shift as keyof typeof shiftTypes] || '#ffffff';
                    return (
                      <td key={date.date} style={{ padding: '1rem 0.5rem', border: '1px solid #e5e7eb', verticalAlign: 'middle', textAlign: 'center' }}>
                        <div style={{ position: 'relative' }}>
                          <select 
                            value={shift}
                            onChange={(e) => handleShiftChange(emp.code, date.date, e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.5rem',
                              paddingRight: '1.5rem', // space for chevron
                              backgroundColor: bgColor,
                              border: 'none',
                              borderRadius: '4px',
                              fontSize: '0.75rem',
                              fontWeight: '500',
                              color: '#374151',
                              appearance: 'none',
                              outline: 'none',
                              cursor: 'pointer'
                            }}
                          >
                            {Object.keys(shiftTypes).map(type => (
                              <option key={type} value={type} style={{ backgroundColor: 'white' }}>{type}</option>
                            ))}
                          </select>
                          <ChevronDown size={12} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>{employees.length === 0 ? 0 : 1}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{Math.min(employees.length, pageSize)}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{employees.length}</span> Results
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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
            <button style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#6b7280', cursor: 'pointer' }}>2</button>
            <button style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#0ea5e9', cursor: 'pointer' }}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
