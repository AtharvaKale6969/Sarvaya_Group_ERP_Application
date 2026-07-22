import React, { useState } from 'react';
import { ChevronsUpDown, Eye, ChevronDown, X, History, Plus, CreditCard } from 'lucide-react';

export default function Arrears() {
  const [orgFilter, setOrgFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('Pending');
  
  const [selectedArrear, setSelectedArrear] = useState<any>(null);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);
  const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
  const [isPayDrawerOpen, setIsPayDrawerOpen] = useState(false);

  const mockData = [
    {
      id: 'EMP014',
      name: 'Pratik Wankhede',
      org: 'Plastroots Waste Management & Solutions Private Limited',
      arrearsCount: 1,
      createdAmount: '₹ 25,000',
      paidAmount: '₹ 0',
      outstandingAmount: '₹ 25,000',
    },
    {
      id: 'EMP020',
      name: 'Shweta Wakodikar',
      org: 'Plastroots Foundation',
      arrearsCount: 2,
      createdAmount: '₹ 15,000',
      paidAmount: '₹ 15,000',
      outstandingAmount: '₹ 0',
    },
    {
      id: 'EMP026',
      name: 'Vedant Lonare',
      org: 'Saravya Group',
      arrearsCount: 1,
      createdAmount: '₹ 10,000',
      paidAmount: '₹ 5,000',
      outstandingAmount: '₹ 5,000',
    },
    {
      id: 'EMP034',
      name: 'John Doe',
      org: 'Geoclaim Energy Private Limited',
      arrearsCount: 1,
      createdAmount: '₹ 50,000',
      paidAmount: '₹ 50,000',
      outstandingAmount: '₹ 0',
    },
    {
      id: 'EMP033',
      name: 'Faizan Sheikh',
      org: 'Plastroots Waste Management & Solutions Private Limited',
      arrearsCount: 3,
      createdAmount: '₹ 45,000',
      paidAmount: '₹ 15,000',
      outstandingAmount: '₹ 30,000',
    },
  ];

  const filteredData = mockData.filter(item => {
    if (orgFilter && item.org !== orgFilter) return false;
    if (statusFilter === 'Pending' && item.outstandingAmount === '₹ 0') return false;
    if (statusFilter === 'Paid' && item.outstandingAmount !== '₹ 0') return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      
      {/* Header section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Arrears ({filteredData.length})
        </h2>
        
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          
          <button 
            onClick={() => setIsLogsModalOpen(true)}
            style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.375rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <History size={16} />
            View Logs
          </button>
          
          <button 
            onClick={() => setIsAddDrawerOpen(true)}
            style={{ backgroundColor: 'white', color: '#0ea5e9', border: '1px solid #0ea5e9', padding: '0.375rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <Plus size={16} />
            Add Arrears
          </button>

          <button 
            onClick={() => setIsPayDrawerOpen(true)}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.375rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <CreditCard size={16} />
            Pay Arrears
          </button>
        </div>
      </div>

      {/* Filter Section */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb', display: 'flex', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: 'fit-content' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Organization</label>
          <div style={{ position: 'relative' }}>
            <select 
              value={orgFilter}
              onChange={(e) => setOrgFilter(e.target.value)}
              style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white', cursor: 'pointer', minWidth: '220px', outline: 'none' }}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', width: 'fit-content' }}>
          <label style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>Status</label>
          <div style={{ position: 'relative' }}>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ appearance: 'none', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 2rem 0.375rem 0.75rem', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white', cursor: 'pointer', minWidth: '150px', outline: 'none' }}
            >
              <option value="All">All</option>
              <option value="Pending">Pending (Unpaid)</option>
              <option value="Paid">Fully Paid</option>
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', right: '0.5rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#6b7280' }} />
          </div>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '1.5rem', minHeight: '400px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '6px 0 0 6px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee ID
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Employee Name
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                Org
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Arrears Created
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Arrears Paid
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Outstanding Arrears
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '0 6px 6px 0', textAlign: 'center' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={7} style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', color: '#6b7280' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      </svg>
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>No Data Found</span>
                  </div>
                </td>
              </tr>
            ) : (
              filteredData.map((row, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>
                    {row.id}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>
                    {row.name}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {row.org}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {row.createdAmount}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#10b981', fontWeight: '500' }}>
                    {row.paidAmount}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: row.outstandingAmount === '₹ 0' ? '#10b981' : '#ef4444', fontWeight: '500' }}>
                    {row.outstandingAmount}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => setSelectedArrear(row)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0ea5e9' }} 
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details Drawer */}
      {selectedArrear && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ 
            width: '100%', maxWidth: '800px', backgroundColor: 'white', height: '100%', 
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', backgroundColor: '#f0f9ff', borderBottom: '1px solid #e0f2fe' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Arrears Details</h3>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>{selectedArrear.name} ({selectedArrear.id}) | {selectedArrear.org}</p>
              </div>
              <button onClick={() => setSelectedArrear(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '1.5rem 1.5rem 0 1.5rem', display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Created</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: '700' }}>{selectedArrear.createdAmount}</p>
              </div>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Paid</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: '#10b981', fontWeight: '700' }}>{selectedArrear.paidAmount}</p>
              </div>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Outstanding</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: selectedArrear.outstandingAmount === '₹ 0' ? '#10b981' : '#ef4444', fontWeight: '700' }}>{selectedArrear.outstandingAmount}</p>
              </div>
            </div>

            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }}>Arrears History</h4>
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Date Created</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Amount</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Reason</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Applicable Month</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Array.from({ length: selectedArrear.arrearsCount }).map((_, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>10 Jan 2026</td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                          ₹ {Math.floor(parseInt(selectedArrear.createdAmount.replace(/[^0-9]/g, '')) / selectedArrear.arrearsCount).toLocaleString('en-IN')}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>Retroactive Pay Increase</td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>December 2025</td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                          {selectedArrear.outstandingAmount === '₹ 0' ? (
                            <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.125rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '500' }}>Paid</span>
                          ) : (
                            <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.125rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '500' }}>Pending</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Arrears Drawer */}
      {isAddDrawerOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ 
            width: '100%', maxWidth: '500px', backgroundColor: 'white', height: '100%', 
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Add Arrears</h3>
              <button onClick={() => setIsAddDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Employee Name/ID</label>
                <input type="text" placeholder="Search employee..." style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Amount (₹)</label>
                <input type="number" placeholder="Enter amount" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Applicable Month</label>
                <input type="month" style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Reason for Arrears</label>
                <textarea rows={3} placeholder="e.g., Retroactive salary hike..." style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none', resize: 'none' }} />
              </div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setIsAddDrawerOpen(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsAddDrawerOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: '#0ea5e9', color: 'white', borderRadius: '6px', fontWeight: '500', cursor: 'pointer' }}>Submit</button>
            </div>
          </div>
        </div>
      )}

      {/* Pay Arrears Drawer */}
      {isPayDrawerOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ 
            width: '100%', maxWidth: '500px', backgroundColor: 'white', height: '100%', 
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Process Arrears Payment</h3>
              <button onClick={() => setIsPayDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto' }}>
              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fef3c7', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', color: '#b45309' }}>You are about to process arrears payments. This will mark selected pending arrears as paid and reflect in the upcoming payroll.</p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Select Employee</label>
                <select style={{ padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', outline: 'none', backgroundColor: 'white' }}>
                  <option value="">Select an employee with pending arrears...</option>
                  <option value="EMP014">Pratik Wankhede (Outstanding: ₹ 25,000)</option>
                  <option value="EMP026">Vedant Lonare (Outstanding: ₹ 5,000)</option>
                  <option value="EMP033">Faizan Sheikh (Outstanding: ₹ 30,000)</option>
                </select>
              </div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button onClick={() => setIsPayDrawerOpen(false)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', backgroundColor: 'white', borderRadius: '6px', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
              <button onClick={() => setIsPayDrawerOpen(false)} style={{ padding: '0.5rem 1rem', border: 'none', backgroundColor: '#0ea5e9', color: 'white', borderRadius: '6px', fontWeight: '500', cursor: 'pointer' }}>Process Payment</button>
            </div>
          </div>
        </div>
      )}

      {/* Logs Modal */}
      {isLogsModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '600px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Arrears Activity Logs</h3>
              <button onClick={() => setIsLogsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '1.5rem', maxHeight: '400px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { time: 'Today, 10:30 AM', action: 'Added arrears of ₹ 25,000 for Pratik Wankhede', by: 'Super Admin' },
                  { time: 'Yesterday, 04:15 PM', action: 'Paid arrears of ₹ 15,000 for Shweta Wakodikar', by: 'HR' },
                  { time: '12 Feb 2026, 09:00 AM', action: 'Added arrears of ₹ 5,000 for Vedant Lonare', by: 'System' },
                ].map((log, i) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', borderBottom: i < 2 ? '1px solid #f3f4f6' : 'none', paddingBottom: i < 2 ? '1rem' : '0' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#0ea5e9', marginTop: '6px' }} />
                    <div>
                      <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{log.action}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>{log.time} • by {log.by}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
