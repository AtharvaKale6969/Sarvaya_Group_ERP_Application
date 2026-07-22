import React, { useState } from 'react';
import { ChevronDown, ChevronsUpDown, X } from 'lucide-react';

export default function AssignPayrollGroup() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [payrollTypeFilter, setPayrollTypeFilter] = useState('Monthly With Compliance');
  const [orgFilter, setOrgFilter] = useState('');

  const [assignModalEmployee, setAssignModalEmployee] = useState<any>(null);
  const [selectedNewGroup, setSelectedNewGroup] = useState('');

  // Sample data to match the screenshot
  const initialEmployees = [
    { id: 'EMP014', name: 'Pratik Wankhede', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Team Lead', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP003', name: 'Nikhil Tumsare', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Business Development Associate', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP020', name: 'Shweta Wakodikar', org: 'Plastroots Foundation', dept: 'RRC', designation: 'Finance Executive', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP026', name: 'Vedant Lonare', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Executive Data Analyst', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP024', name: 'Aditya Kandekar', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Business Development Associate', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'PF003', name: 'Himanshu Dhote', org: 'Plastroots Foundation', dept: 'CSR', designation: 'Business Development Associate', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP032', name: 'Atharva Kale', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Data Analyst', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP033', name: 'Faizan Sheikh', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Business Analyst', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP007', name: 'Ankit Bhalerao', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Government Services', designation: 'Operations Head', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'RMT', designation: 'Business Development Associate', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP034', name: 'John Doe', org: 'Geoclaim Energy Private Limited', dept: 'Biogas', designation: 'Developer', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP035', name: 'Jane Smith', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'HR Manager', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP036', name: 'Michael Brown', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Operations Manager', payrollGroup: 'Monthly Payroll (No Compliance)' },
    { id: 'EMP037', name: 'Emily Davis', org: 'Plastroots Foundation', dept: 'IEC', designation: 'Marketing Lead', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP038', name: 'Daniel Wilson', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Sales Executive', payrollGroup: 'Hourly Payroll' },
    { id: 'EMP039', name: 'Sarah Taylor', org: 'Geoclaim Energy Private Limited', dept: 'PMS', designation: 'Support Specialist', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP040', name: 'David Anderson', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Accountant', payrollGroup: 'Monthly Payroll (No Compliance)' },
    { id: 'EMP041', name: 'Laura Thomas', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Legal Advisor', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP042', name: 'James Jackson', org: 'Plastroots Foundation', dept: 'IEC', designation: 'Systems Administrator', payrollGroup: 'Hourly Payroll' },
    { id: 'EMP043', name: 'Anna White', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Government Services', designation: 'Recruiter', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP044', name: 'Robert Harris', org: 'Geoclaim Energy Private Limited', dept: 'Shredding Unit', designation: 'Logistics Coordinator', payrollGroup: 'Monthly Payroll (No Compliance)' },
    { id: 'EMP045', name: 'Linda Martin', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Operations Analyst', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP046', name: 'William Thompson', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Sales Manager', payrollGroup: 'Hourly Payroll' },
    { id: 'EMP047', name: 'Elizabeth Garcia', org: 'Plastroots Foundation', dept: 'CSR', designation: 'Content Creator', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP048', name: 'Richard Martinez', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Customer Success Manager', payrollGroup: 'Monthly Payroll (No Compliance)' },
    { id: 'EMP049', name: 'Barbara Robinson', org: 'Geoclaim Energy Private Limited', dept: 'Shredding Unit', designation: 'Financial Analyst', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP050', name: 'Joseph Clark', org: 'Saravya Group', dept: 'HQ / Operations', designation: 'Network Engineer', payrollGroup: 'Hourly Payroll' },
    { id: 'EMP051', name: 'Susan Rodriguez', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'Corporate Compliance', designation: 'Compliance Officer', payrollGroup: 'Monthly Payroll (With Compliance)' },
    { id: 'EMP052', name: 'Thomas Lewis', org: 'Plastroots Foundation', dept: 'IEC', designation: 'Operations Specialist', payrollGroup: 'Monthly Payroll (No Compliance)' },
    { id: 'EMP053', name: 'Jessica Lee', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'RMT', designation: 'Sales Representative', payrollGroup: 'Hourly Payroll' }
  ];
  
  const [employeesList, setEmployeesList] = useState(initialEmployees);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      
      {/* Header section */}
      <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Assign Payroll Group <span style={{ color: '#0ea5e9' }}>({employeesList.length})</span>
        </h2>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          <button style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Payroll Group
          </button>
          <button style={{ backgroundColor: '#cbd5e1', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'not-allowed' }}>
            Select Group
          </button>
        </div>
      </div>

      {/* Filter section */}
      <div style={{ padding: '0 1.5rem', display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Organization</label>
          <div style={{ position: 'relative', width: 'fit-content' }}>
            <select 
              value={orgFilter}
              onChange={(e) => { setOrgFilter(e.target.value); setCurrentPage(1); }}
              style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white', cursor: 'pointer', minWidth: '180px' }}
            >
              <option value="">All Orgs</option>
              <option value="Plastroots Waste Management & Solutions Private Limited">Plastroots Waste Management & Solutions Private Limited</option>
              <option value="Plastroots Foundation">Plastroots Foundation</option>
              <option value="Shetahit Farm Solutions Private Limited">Shetahit Farm Solutions Private Limited</option>
              <option value="Geoclaim Energy Private Limited">Geoclaim Energy Private Limited</option>
              <option value="Aayuneer Enterprises">Aayuneer Enterprises</option>
              <option value="Saravya Group">Saravya Group</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Payroll Type</label>
          {payrollTypeFilter ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', width: 'fit-content', height: '34px', boxSizing: 'border-box' }}>
              <span style={{ maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {payrollTypeFilter}
              </span>
              <X size={14} style={{ cursor: 'pointer', color: '#6b7280' }} onClick={() => setPayrollTypeFilter('')} />
              <ChevronDown size={14} style={{ color: '#6b7280' }} />
            </div>
          ) : (
            <div style={{ position: 'relative', width: 'fit-content' }}>
              <select 
                value={payrollTypeFilter}
                onChange={(e) => { setPayrollTypeFilter(e.target.value); setCurrentPage(1); }}
                style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white', cursor: 'pointer', minWidth: '150px' }}
              >
                <option value="">All</option>
                <option value="Monthly With Compliance">Monthly With Compliance</option>
                <option value="Monthly Without Compliance">Monthly Without Compliance</option>
                <option value="Hourly Payroll">Hourly Payroll</option>
              </select>
              <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
            </div>
          )}
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem', minHeight: '400px', marginTop: '0.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f0f9ff', borderRadius: '8px', border: '1px solid #e0f2fe' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', width: '40px' }}>
                <input type="checkbox" style={{ cursor: 'pointer' }} />
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
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
                  Payroll Group
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {employeesList
              .filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter))
              .slice((currentPage - 1) * pageSize, currentPage * pageSize).map((emp, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem' }}>
                  <input type="checkbox" style={{ cursor: 'pointer' }} />
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>
                  {emp.id}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>
                  {emp.name}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {emp.org}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {emp.dept}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {emp.designation}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  {emp.payrollGroup}
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  <button 
                    onClick={() => {
                      setAssignModalEmployee(emp);
                      setSelectedNewGroup(emp.payrollGroup);
                    }}
                    style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.375rem 0.75rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '500', cursor: 'pointer' }}
                  >
                    Assign Payroll Group
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>{employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length === 0 ? 0 : ((currentPage - 1) * pageSize) + 1}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{Math.min(currentPage * pageSize, employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length)}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length}</span> Results
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
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
            
            {Array.from({ length: Math.ceil(employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length / pageSize) || 1 }).map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentPage(idx + 1)} 
                style={{ 
                  backgroundColor: currentPage === idx + 1 ? '#0ea5e9' : 'white', 
                  border: 'none', 
                  borderRight: idx < Math.ceil(employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length / pageSize) - 1 ? '1px solid #d1d5db' : 'none', 
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
              onClick={() => setCurrentPage(Math.min(Math.ceil(employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length / pageSize), currentPage + 1))} 
              style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: currentPage >= Math.ceil(employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length / pageSize) ? '#d1d5db' : '#0ea5e9', cursor: currentPage >= Math.ceil(employeesList.filter(emp => (orgFilter === '' || emp.org === orgFilter) && (payrollTypeFilter === '' || emp.payrollGroup === payrollTypeFilter)).length / pageSize) ? 'default' : 'pointer' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Assign Modal */}
      {assignModalEmployee && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <div className="header-responsive">
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Assign Payroll Group</h3>
              <button onClick={() => setAssignModalEmployee(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Assigning to: <span style={{ fontWeight: '500', color: '#111827' }}>{assignModalEmployee.name} ({assignModalEmployee.id})</span></p>
              
              <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginTop: '0.5rem' }}>
                Select Payroll Group
              </label>
              <div style={{ position: 'relative' }}>
                <select 
                  value={selectedNewGroup}
                  onChange={(e) => setSelectedNewGroup(e.target.value)}
                  style={{ width: '100%', padding: '0.625rem 2.5rem 0.625rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', color: '#111827', outline: 'none', appearance: 'none', backgroundColor: 'white' }}
                >
                  <option value="Monthly Payroll (With Compliance)">Monthly Payroll (With Compliance)</option>
                  <option value="Monthly Payroll (No Compliance)">Monthly Payroll (No Compliance)</option>
                  <option value="Hourly Payroll">Hourly Payroll</option>
                </select>
                <ChevronDown size={16} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
              <button 
                onClick={() => setAssignModalEmployee(null)}
                style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#374151', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setEmployeesList(prev => prev.map(e => e.id === assignModalEmployee.id ? { ...e, payrollGroup: selectedNewGroup } : e));
                  setAssignModalEmployee(null);
                }}
                style={{ padding: '0.5rem 1rem', border: 'none', borderRadius: '6px', backgroundColor: '#0ea5e9', color: 'white', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
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
