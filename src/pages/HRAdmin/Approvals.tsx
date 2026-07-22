import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Check, X, Calendar, TreePine } from 'lucide-react';

type ApprovalRequest = {
  id: string;
  type: string;
  subType: string;
  employee: string;
  org: string;
  designation: string;
  detailsType: 'single' | 'range';
  detailsData: any;
  status: 'Pending' | 'Approved' | 'Rejected';
  expandedData?: {
    appliedOn: string;
    oldData: string;
    newData: string;
    reason: string;
  };
};

export default function ApprovalRequests() {
  const [activeTab, setActiveTab] = useState('Pending');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState('Choose One');
  const [searchName, setSearchName] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({ type: 'Choose One', name: '' });

  const [mockData, setMockData] = useState<ApprovalRequest[]>([
    {
      id: '1',
      type: 'Attendance',
      subType: 'New Punch Added',
      employee: 'EMP033 - Faizan Sheikh',
      org: 'Shetahit Farm Solutions',
      designation: 'Business Analyst • RM',
      detailsType: 'single',
      detailsData: { label: 'Date', date: '16-07-2026' },
      status: 'Pending',
      expandedData: {
        appliedOn: '21-07-2026 13:33',
        oldData: '-',
        newData: '6:35 PM',
        reason: 'I forgot to logout.'
      }
    },
    {
      id: '2',
      type: 'Attendance',
      subType: 'New Punch Added',
      employee: 'EMP033 - Faizan Sheikh',
      org: 'Shetahit Farm Solutions',
      designation: 'Business Analyst • RM',
      detailsType: 'single',
      detailsData: { label: 'Date', date: '17-07-2026' },
      status: 'Pending'
    },
    {
      id: '3',
      type: 'Leave',
      subType: 'Sick Leaves',
      employee: 'EMP033 - Faizan Sheikh',
      org: 'Shetahit Farm Solutions',
      designation: 'Business Analyst • RM',
      detailsType: 'range',
      detailsData: { from: 'Mon 06 Jul', to: 'Mon 06 Jul', duration: '1 Day' },
      status: 'Pending'
    },
    {
      id: '4',
      type: 'Leave',
      subType: 'Optional Holidays',
      employee: 'EMP033 - Faizan Sheikh',
      org: 'Shetahit Farm Solutions',
      designation: 'Business Analyst • RM',
      detailsType: 'range',
      detailsData: { from: 'Thu 28 May', to: 'Thu 28 May', duration: '1 Day' },
      status: 'Pending'
    },
    {
      id: '5',
      type: 'Attendance',
      subType: 'New Punch Added',
      employee: '20 - Sahil Pusdekar',
      org: 'Shetahit Farm Solutions',
      designation: 'Intern • RM',
      detailsType: 'single',
      detailsData: { label: 'Date', date: '20-07-2026' },
      status: 'Pending'
    },
    {
      id: '6',
      type: 'Leave',
      subType: 'Optional Holidays',
      employee: 'EMPO26 - Vedant Lonare',
      org: 'Shetahit Farm Solutions',
      designation: 'Executive Data Analyst • Data',
      detailsType: 'range',
      detailsData: { from: 'Fri 26 Jun', to: 'Fri 26 Jun', duration: '1 Day' },
      status: 'Pending'
    },
    {
      id: '7',
      type: 'Leave',
      subType: 'Casual Leave',
      employee: 'EMP024 - Aditya Kandekar',
      org: 'Shetahit Farm Solutions',
      designation: 'Business Development Associate • Aayuneer Enterprises',
      detailsType: 'range',
      detailsData: { from: 'Tue 21 Jul', to: 'Tue 21 Jul', duration: '1 Day' },
      status: 'Pending'
    },
    {
      id: '8',
      type: 'Leave',
      subType: 'Sick Leaves',
      employee: 'GC002 - Rakesh Karmakar',
      org: 'Geoclaim Energy Private Limited.',
      designation: 'Business Intelligence Analyst • Geoclaim Energy Private Limited.',
      detailsType: 'range',
      detailsData: { from: 'Mon 20 Jul', to: 'Mon 20 Jul', duration: '1 Day' },
      status: 'Pending'
    },
    {
      id: '9',
      type: 'Leave',
      subType: 'Casual Leave',
      employee: 'SFS001 - Ankita Kothe',
      org: 'Shetahit Farm Solutions',
      designation: 'Business Development Associate • Shetahit Farm Solutions',
      detailsType: 'range',
      detailsData: { from: 'Mon 20 Jul', to: 'Mon 20 Jul', duration: '1 Day' },
      status: 'Pending'
    },
    {
      id: '10',
      type: 'Attendance',
      subType: 'New Punch Added',
      employee: 'EMP003 - Nikhil Tumsare',
      org: 'Shetahit Farm Solutions',
      designation: 'Business Development Associate • RM',
      detailsType: 'single',
      detailsData: { label: 'Date', date: '18-07-2026' },
      status: 'Pending'
    }
  ]);

  const toggleExpand = (id: string) => {
    setExpandedRow(prev => prev === id ? null : id);
  };

  const handleApprove = (id: string) => {
    setMockData(prev => prev.map(req => req.id === id ? { ...req, status: 'Approved' } : req));
  };

  const handleReject = (id: string) => {
    setMockData(prev => prev.map(req => req.id === id ? { ...req, status: 'Rejected' } : req));
  };

  const handleSearch = () => {
    setAppliedFilters({ type: selectedType, name: searchName });
  };

  const handleClear = () => {
    setSelectedType('Choose One');
    setSearchName('');
    setAppliedFilters({ type: 'Choose One', name: '' });
  };

  const filteredData = mockData.filter(req => {
    if (req.status !== activeTab) return false;
    if (appliedFilters.type !== 'Choose One' && req.type !== appliedFilters.type) return false;
    if (appliedFilters.name && !req.employee.toLowerCase().includes(appliedFilters.name.toLowerCase())) return false;
    return true;
  });
  
  const pendingCount = mockData.filter(req => req.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', minHeight: '800px', padding: '1.5rem' }}>
      
      {/* Header */}
      <div style={{ paddingBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>Approval Requests</h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', borderBottom: '1px solid #e5e7eb', marginBottom: '1rem' }}>
        <button 
          onClick={() => setActiveTab('Pending')}
          style={{ 
            padding: '0.75rem 0', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'Pending' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'Pending' ? '#0ea5e9' : '#6b7280',
            fontWeight: '500',
            fontSize: '0.875rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          Pending {pendingCount > 0 && <span style={{ backgroundColor: '#e0f2fe', color: '#0ea5e9', padding: '0.125rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>{pendingCount}</span>}
        </button>
        <button 
          onClick={() => setActiveTab('Approved')}
          style={{ 
            padding: '0.75rem 0', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'Approved' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'Approved' ? '#0ea5e9' : '#6b7280',
            fontWeight: '500',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Approved
        </button>
        <button 
          onClick={() => setActiveTab('Rejected')}
          style={{ 
            padding: '0.75rem 0', 
            background: 'none', 
            border: 'none', 
            borderBottom: activeTab === 'Rejected' ? '2px solid #0ea5e9' : '2px solid transparent',
            color: activeTab === 'Rejected' ? '#0ea5e9' : '#6b7280',
            fontWeight: '500',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Rejected
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ position: 'relative', width: '200px' }}>
          <select 
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            style={{ width: '100%', appearance: 'none', padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', color: '#374151', outline: 'none' }}
          >
            <option>Choose One</option>
            <option>Attendance</option>
            <option>Leave</option>
            <option>Login Reset</option>
          </select>
          <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
        </div>

        <div style={{ position: 'relative', width: '100%', minWidth: '250px' }}>
          <Search size={16} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input 
            type="text" 
            placeholder="Write Employee Name" 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={{ width: '100%', padding: '0.5rem 1rem 0.5rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', color: '#374151', outline: 'none' }}
          />
        </div>

        <button onClick={handleSearch} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
          Search
        </button>

        <button onClick={handleClear} style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 1.5rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
          Clear
        </button>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              <th style={{ padding: '1rem', width: '40px' }}>
                <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #d1d5db' }} />
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Type</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Organization</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Requested by</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Details</th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                  No {activeTab.toLowerCase()} requests found.
                </td>
              </tr>
            )}
            {filteredData.map((row, idx) => (
              <React.Fragment key={row.id}>
                <tr style={{ borderBottom: (expandedRow === row.id || idx === filteredData.length - 1) ? 'none' : '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <input type="checkbox" style={{ width: '16px', height: '16px', cursor: 'pointer', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                  </td>
                  
                  {/* Type Column */}
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: row.type === 'Attendance' ? '#eff6ff' : '#fef3c7', display: 'flex', justifyContent: 'center', alignItems: 'center', color: row.type === 'Attendance' ? '#3b82f6' : '#f59e0b' }}>
                        {row.type === 'Attendance' ? <Calendar size={18} /> : <TreePine size={18} />}
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{row.type}</span>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{row.subType}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Organization Column */}
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <span style={{ fontSize: '0.875rem', color: '#374151' }}>{row.org}</span>
                  </td>

                  {/* Requested by Column */}
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                      <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{row.employee}</span>
                      <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{row.designation}</span>
                    </div>
                  </td>

                  {/* Details Column */}
                  <td style={{ padding: '1.25rem 1rem' }}>
                    {row.detailsType === 'single' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{row.detailsData.label}</span>
                        <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{row.detailsData.date}</span>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>From</span>
                          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{row.detailsData.from}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', color: '#9ca3af', fontSize: '0.75rem' }}>
                          <span style={{ borderTop: '1px dashed #d1d5db', width: '24px' }}></span>
                          <span style={{ fontWeight: '500', color: '#0ea5e9' }}>{row.detailsData.duration}</span>
                          <span style={{ borderTop: '1px dashed #d1d5db', width: '24px' }}></span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.125rem' }}>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>To</span>
                          <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>{row.detailsData.to}</span>
                        </div>
                      </div>
                    )}
                  </td>

                  {/* Actions Column */}
                  <td style={{ padding: '1.25rem 1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                      <button 
                        onClick={() => toggleExpand(row.id)}
                        style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', padding: '0.375rem 0.75rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.75rem', color: '#374151', cursor: 'pointer' }}
                      >
                        {expandedRow === row.id ? 'View Less' : 'View More'}
                        {expandedRow === row.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      
                      <button 
                        onClick={() => handleReject(row.id)}
                        disabled={row.status !== 'Pending'}
                        style={{ padding: '0.375rem', backgroundColor: row.status !== 'Pending' ? '#f3f4f6' : 'white', border: '1px solid #ef4444', borderRadius: '4px', color: '#ef4444', cursor: row.status !== 'Pending' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: row.status !== 'Pending' ? 0.5 : 1 }}
                      >
                        <X size={14} />
                      </button>
                      <button 
                        onClick={() => handleApprove(row.id)}
                        disabled={row.status !== 'Pending'}
                        style={{ padding: '0.375rem', backgroundColor: row.status !== 'Pending' ? '#f3f4f6' : 'white', border: '1px solid #22c55e', borderRadius: '4px', color: '#22c55e', cursor: row.status !== 'Pending' ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: row.status !== 'Pending' ? 0.5 : 1 }}
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
                
                {/* Expanded Details Row */}
                {expandedRow === row.id && (
                  <tr style={{ borderBottom: idx === filteredData.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                    <td colSpan={6} style={{ padding: '0 1rem 1.25rem 1rem' }}>
                      <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', backgroundColor: '#f9fafb', padding: '0.75rem 1rem', borderBottom: '1px solid #e5e7eb' }}>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Applied On</span>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Old Data</span>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>New Data</span>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Employee's Reason</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1.5fr', padding: '1rem', backgroundColor: 'white' }}>
                          {row.expandedData ? (
                            <>
                              <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{row.expandedData.appliedOn}</span>
                              <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{row.expandedData.oldData}</span>
                              <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{row.expandedData.newData}</span>
                              <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{row.expandedData.reason}</span>
                            </>
                          ) : (
                            <span style={{ gridColumn: 'span 4', fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>No expanded details available for this request type yet.</span>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>{filteredData.length > 0 ? 1 : 0}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{filteredData.length}</span> Results
        </div>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ position: 'relative' }}>
            <select style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2.5rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', cursor: 'pointer', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <option value="10">10 / Page</option>
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
