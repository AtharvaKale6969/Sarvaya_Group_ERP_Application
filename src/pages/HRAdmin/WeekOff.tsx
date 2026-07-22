import { useState } from 'react';
import { ChevronsUpDown, ChevronLeft, ChevronDown, Check, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

type DayStatus = 'Working' | 'WeekOff' | 'Occasional';

export default function WeekOff() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  
  // Initial state matches the screenshot
  const [weekOffs, setWeekOffs] = useState<Record<string, Record<string, DayStatus>>>({
    '1': { Sun: 'Working', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '2': { Sun: 'Working', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '3': { Sun: 'Working', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '4': { Sun: 'Working', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '5': { Sun: 'WeekOff', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '6': { Sun: 'WeekOff', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '7': { Sun: 'WeekOff', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '8': { Sun: 'WeekOff', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '9': { Sun: 'WeekOff', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
    '10': { Sun: 'WeekOff', Mon: 'Working', Tue: 'Working', Wed: 'Working', Thu: 'Working', Fri: 'Working', Sat: 'Working' },
  });

  const assignments = [
    { id: '1', empId: 'EMP0034', name: 'Shipali Raut', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'Government Services' },
    { id: '2', empId: 'SFS003', name: 'Vrushabh Raut', branch: 'Shetahit Farm Solutions', dept: 'FVF' },
    { id: '3', empId: '23', name: 'Prajwal Wankhede', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'Corporate Compliance' },
    { id: '4', empId: 'SFS002', name: 'Sarang Talmale', branch: 'Shetahit Farm Solutions', dept: 'FVF' },
    { id: '5', empId: '20', name: 'Sahil Pusdekar', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'RMT' },
    { id: '6', empId: '5', name: 'Ekta Satghare', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'Government Services' },
    { id: '7', empId: 'SFS001', name: 'Ankita Kathe', branch: 'Shetahit Farm Solutions', dept: 'FVF' },
    { id: '8', empId: 'GC002', name: 'Rakesh Karmakar', branch: 'Geoclaim Energy Private Limited.', dept: 'Shredding Unit' },
    { id: '9', empId: 'EMP031', name: 'Bhushan Chilange', branch: 'Plastroots Waste Management & Solutions Private Limited Pvt Ltd', dept: 'RMT' },
    { id: '10', empId: 'GC001', name: 'Praful Bhalerao', branch: 'Geoclaim Energy Private Limited.', dept: 'Shredding Unit' },
  ];

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const fullDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const toggleDayStatus = (empId: string, day: string) => {
    setWeekOffs(prev => {
      const currentStatus = prev[empId]?.[day] || 'Working';
      let nextStatus: DayStatus = 'Working';
      if (currentStatus === 'Working') nextStatus = 'WeekOff';
      else if (currentStatus === 'WeekOff') nextStatus = 'Occasional';
      else nextStatus = 'Working';
      
      return {
        ...prev,
        [empId]: {
          ...(prev[empId] || {}),
          [day]: nextStatus
        }
      };
    });
  };

  const renderStatusIcon = (status: DayStatus) => {
    switch (status) {
      case 'Working':
        return <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#10b981' }} />; // Green circle
      case 'WeekOff':
        return <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#3b82f6' }}>WO</span>; // Blue WO text
      case 'Occasional':
        return <AlertTriangle size={14} color="#f59e0b" />; // Yellow triangle
      default:
        return null;
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedRows(assignments.map(emp => emp.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedRows(prev => 
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600', margin: 0, color: '#111827', marginBottom: '0.25rem' }}>
          Assign Week Off
        </h2>
        <span style={{ fontSize: '0.875rem', color: '#4b5563' }}>
          Click on the cell icon to handle week offs (WO)
        </span>
      </div>

      {/* Toolbar / Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', alignItems: 'center', padding: '0 1.5rem', gap: '1rem' }}>
        <button style={{ backgroundColor: 'white', color: '#6b7280', border: '1px solid #d1d5db', padding: '0.375rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
          Bulk Update
        </button>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', backgroundColor: '#f9fafb', padding: '0.375rem 1rem', borderRadius: '20px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>
            <span style={{ color: '#3b82f6' }}>WO</span> Week Off
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>
            <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981' }} /> Working Day
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>
            <AlertTriangle size={12} color="#f59e0b" /> Occasional Week Off
          </div>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem', minHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.75rem 1rem', width: '40px', borderRadius: '6px 0 0 6px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedRows.length === assignments.length && assignments.length > 0}
                  onChange={handleSelectAll}
                  style={{ width: '1rem', height: '1rem', cursor: 'pointer', accentColor: '#0ea5e9' }} 
                />
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee ID
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Branch
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Department
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              {fullDays.map((day, index) => (
                <th key={day} style={{ padding: '0.75rem 0.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', textAlign: 'center', borderRadius: index === 6 ? '0 6px 6px 0' : '0' }}>
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {assignments.map((emp) => (
              <tr key={emp.id} style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: selectedRows.includes(emp.id) ? '#f0f9ff' : 'transparent' }}>
                <td style={{ padding: '0.75rem 1rem', width: '40px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(emp.id)}
                    onChange={() => handleSelectRow(emp.id)}
                    style={{ width: '1rem', height: '1rem', cursor: 'pointer', accentColor: '#0ea5e9' }} 
                  />
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                  {emp.empId}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                  {emp.name}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {emp.branch}
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {emp.dept}
                </td>
                {days.map((day) => (
                  <td key={day} style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => toggleDayStatus(emp.id, day)}
                      style={{ 
                        background: 'none', border: 'none', cursor: 'pointer', 
                        display: 'flex', alignItems: 'center', justifyContent: 'center', 
                        width: '24px', height: '24px', margin: '0 auto', transition: 'transform 0.1s' 
                      }}
                      onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                      onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    >
                      {renderStatusIcon(weekOffs[emp.id]?.[day] || 'Working')}
                    </button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>10</span> of <span style={{ fontWeight: '600', color: '#374151' }}>19</span> Results
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
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
