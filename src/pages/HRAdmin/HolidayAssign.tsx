import { useState } from 'react';
import { ChevronsUpDown, ChevronDown } from 'lucide-react';

export default function HolidayAssign() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedEmployees, setSelectedEmployees] = useState<string[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('');

  // Mock data based on the screenshot
  const [employees, setEmployees] = useState([
    { id: 'EMP0034', name: 'Shipali Raut', org: 'Shetahit Farm Solutions', dept: 'Finance', designation: 'Account Executive', template: '-' },
    { id: 'SFS003', name: 'Vrushabh Raut', org: 'Shetahit Farm Solutions', dept: 'Shetahit Farm Solutions', designation: 'Business Development Associate', template: '-' },
    { id: '23', name: 'Prajwal Wankhede', org: 'Shetahit Farm Solutions', dept: 'Internship', designation: 'Intern', template: '-' },
    { id: 'SFS002', name: 'Sarang Talmale', org: 'Shetahit Farm Solutions', dept: 'Shetahit Farm Solutions', designation: 'Business Development Associate', template: '-' },
    { id: '20', name: 'Sahil Pusdekar', org: 'Shetahit Farm Solutions', dept: 'RM', designation: 'Intern', template: '-' },
    { id: '5', name: 'Ekta Satghare', org: 'Shetahit Farm Solutions', dept: 'Data', designation: 'Intern - Data Analyst', template: '-' },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetahit Farm Solutions', dept: 'Shetahit Farm Solutions', designation: 'Business Development Associate', template: 'Optional Holidays' },
    { id: 'GC002', name: 'Rakesh Karmakar', org: 'Geoclaim Energy Pvt Ltd.', dept: 'Geoclaim Energy Pvt Ltd.', designation: 'Business Intelligence Analyst', template: 'Optional Holidays' },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Shetahit Farm Solutions', dept: 'RM', designation: 'Business Development Associate', template: 'Optional Holidays' },
    { id: 'GC001', name: 'Praful Bhalera', org: 'Geoclaim Energy Pvt Ltd.', dept: 'Geoclaim Energy Pvt Ltd.', designation: 'Business Development Associate', template: 'Optional Holidays' },
  ]);

  const toggleSelectAll = () => {
    if (selectedEmployees.length === employees.length) {
      setSelectedEmployees([]);
    } else {
      setSelectedEmployees(employees.map(emp => emp.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedEmployees(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  const handleAssignTemplate = () => {
    if (!selectedTemplate) return;
    setEmployees(prev => prev.map(emp => {
      if (selectedEmployees.includes(emp.id)) {
        return { ...emp, template: selectedTemplate };
      }
      return emp;
    }));
    setIsAssignModalOpen(false);
    setSelectedEmployees([]);
    setSelectedTemplate('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', minHeight: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>Holiday Assign</h2>
        <button 
          disabled={selectedEmployees.length === 0}
          onClick={() => setIsAssignModalOpen(true)}
          style={{ 
            backgroundColor: selectedEmployees.length > 0 ? '#0ea5e9' : '#d1d5db', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px', 
            padding: '0.5rem 1rem', 
            fontSize: '0.875rem', 
            fontWeight: '500', 
            cursor: selectedEmployees.length > 0 ? 'pointer' : 'not-allowed',
            transition: 'all 0.2s'
          }}
        >
          Assign Template
        </button>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#eff6ff' }}>
              <th style={{ padding: '1rem', width: '40px' }}>
                <input 
                  type="checkbox" 
                  checked={selectedEmployees.length === employees.length && employees.length > 0}
                  onChange={toggleSelectAll}
                  style={{ width: '16px', height: '16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #d1d5db' }}
                />
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Employee ID <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Employee Name <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Organization <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Department <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Designation <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Template Assigned <ChevronsUpDown size={14} /></div>
              </th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, idx) => (
              <tr key={idx} style={{ borderBottom: idx === employees.length - 1 ? 'none' : '1px solid #e5e7eb', backgroundColor: selectedEmployees.includes(emp.id) ? '#eff6ff' : 'transparent' }}>
                <td style={{ padding: '1rem' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedEmployees.includes(emp.id)}
                    onChange={() => toggleSelect(emp.id)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #d1d5db' }}
                  />
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.name}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.org}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.dept}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.designation}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{emp.template}</td>
              </tr>
            ))}
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

      {/* Assign Template Modal (Drawer) */}
      {isAssignModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '400px', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out forwards' }}>
            
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eff6ff' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>
                Assign Template
              </h2>
              <button onClick={() => setIsAssignModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                ✕
              </button>
            </div>

            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Select Template<span style={{ color: '#ef4444' }}>*</span></label>
                <div style={{ position: 'relative' }}>
                  <select 
                    value={selectedTemplate}
                    onChange={(e) => setSelectedTemplate(e.target.value)}
                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none', appearance: 'none', backgroundColor: 'white' }} 
                  >
                    <option value="" disabled>Select a template</option>
                    <option value="Holidays">Holidays</option>
                    <option value="Optional Holidays">Optional Holidays</option>
                  </select>
                  <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
                </div>
              </div>
            </div>

            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#eff6ff' }}>
              <button 
                onClick={handleAssignTemplate}
                disabled={!selectedTemplate}
                style={{ padding: '0.5rem 1.5rem', backgroundColor: selectedTemplate ? '#0ea5e9' : '#9ca3af', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '500', cursor: selectedTemplate ? 'pointer' : 'not-allowed' }}
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
