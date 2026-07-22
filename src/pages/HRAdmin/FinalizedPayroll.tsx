import React, { useState } from 'react';
import { ChevronsUpDown, Eye, X } from 'lucide-react';

export default function FinalizedPayroll() {
  const [selectedBatch, setSelectedBatch] = useState<any>(null);
  const finalizedData = [
    {
      id: '1',
      from: '01 Jan 2026',
      to: '31 Jan 2026',
      finalizedAmount: '₹ 12,50,000',
      finalizedOn: '03 Feb 2026',
      paidAmount: '₹ 12,50,000',
      paidOn: '05 Feb 2026',
      payrollModule: 'Regular',
      payrollGroup: 'Monthly Payroll (With Compliance)'
    },
    {
      id: '2',
      from: '01 Jan 2026',
      to: '31 Jan 2026',
      finalizedAmount: '₹ 3,20,000',
      finalizedOn: '03 Feb 2026',
      paidAmount: '₹ 3,20,000',
      paidOn: '05 Feb 2026',
      payrollModule: 'Regular',
      payrollGroup: 'Monthly Payroll (No Compliance)'
    },
    {
      id: '3',
      from: '15 Jan 2026',
      to: '31 Jan 2026',
      finalizedAmount: '₹ 1,15,000',
      finalizedOn: '04 Feb 2026',
      paidAmount: '₹ 1,15,000',
      paidOn: '06 Feb 2026',
      payrollModule: 'Arrears',
      payrollGroup: 'Monthly Payroll (With Compliance)'
    },
    {
      id: '4',
      from: '01 Feb 2026',
      to: '28 Feb 2026',
      finalizedAmount: '₹ 12,80,000',
      finalizedOn: '03 Mar 2026',
      paidAmount: '₹ 12,80,000',
      paidOn: '05 Mar 2026',
      payrollModule: 'Regular',
      payrollGroup: 'Monthly Payroll (With Compliance)'
    },
    {
      id: '5',
      from: '01 Feb 2026',
      to: '28 Feb 2026',
      finalizedAmount: '₹ 3,40,000',
      finalizedOn: '03 Mar 2026',
      paidAmount: '₹ 3,40,000',
      paidOn: '05 Mar 2026',
      payrollModule: 'Regular',
      payrollGroup: 'Monthly Payroll (No Compliance)'
    },
    {
      id: '6',
      from: '01 Mar 2026',
      to: '31 Mar 2026',
      finalizedAmount: '₹ 13,10,000',
      finalizedOn: '03 Apr 2026',
      paidAmount: '₹ 0',
      paidOn: 'Pending',
      payrollModule: 'Regular',
      payrollGroup: 'Monthly Payroll (With Compliance)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
      
      {/* Header section */}
      <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151' }}>
          Finalized Payroll Details
        </h2>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '1.5rem', minHeight: '400px' }}>
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#e0f2fe', borderRadius: '8px' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '6px 0 0 6px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  From
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  To
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', cursor: 'pointer' }}>
                  Finalized Amount
                  <ChevronsUpDown size={12} color="#94a3b8" />
                </div>
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                Finalized On
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                Paid Amount
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                Paid On
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                Payroll Module
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap' }}>
                Payroll Group
              </th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', whiteSpace: 'nowrap', borderRadius: '0 6px 6px 0', textAlign: 'center' }}>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {finalizedData.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: '4rem 1rem', textAlign: 'center' }}>
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
              finalizedData.map((row) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {row.from}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {row.to}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                    {row.finalizedAmount}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {row.finalizedOn}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#10b981', fontWeight: '500' }}>
                    {row.paidAmount}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: row.paidOn === 'Pending' ? '#f59e0b' : '#4b5563', fontWeight: row.paidOn === 'Pending' ? '500' : 'normal' }}>
                    {row.paidOn}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {row.payrollModule}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                    {row.payrollGroup}
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => setSelectedBatch(row)}
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
      </div>

      {/* Details Drawer */}
      {selectedBatch && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ 
            width: '100%', maxWidth: '800px', backgroundColor: 'white', height: '100%', 
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', backgroundColor: '#f0f9ff', borderBottom: '1px solid #e0f2fe' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>
                  Payroll Batch Details
                </h3>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: '#6b7280' }}>
                  {selectedBatch.from} - {selectedBatch.to} | {selectedBatch.payrollGroup}
                </p>
              </div>
              <button 
                onClick={() => setSelectedBatch(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Summary Cards */}
            <div style={{ padding: '1.5rem 1.5rem 0 1.5rem', display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Amount</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: '700' }}>{selectedBatch.finalizedAmount}</p>
              </div>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Paid Amount</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: '#10b981', fontWeight: '700' }}>{selectedBatch.paidAmount}</p>
              </div>
              <div style={{ flex: 1, backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '1rem' }}>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Employees Processed</p>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '1.25rem', color: '#0f172a', fontWeight: '700' }}>34</p>
              </div>
            </div>

            {/* Body / Employee List */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1 }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#374151' }}>Employee Breakdown</h4>
              <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Employee ID</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Name</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Net Pay</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Mock employee rows for this batch */}
                    {Array.from({ length: 8 }).map((_, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                          EMP{String(100 + idx).padStart(3, '0')}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                          {['Atharva Kale', 'Himanshu Dhote', 'Pratik Wankhede', 'Vedant Lonare'][idx % 4]}
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                          ₹ {(Math.floor(Math.random() * 40) + 20)},000
                        </td>
                        <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                          {selectedBatch.paidOn === 'Pending' ? (
                            <span style={{ backgroundColor: '#fef3c7', color: '#d97706', padding: '0.125rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '500' }}>Pending</span>
                          ) : (
                            <span style={{ backgroundColor: '#d1fae5', color: '#059669', padding: '0.125rem 0.5rem', borderRadius: '12px', fontSize: '0.75rem', fontWeight: '500' }}>Paid</span>
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
