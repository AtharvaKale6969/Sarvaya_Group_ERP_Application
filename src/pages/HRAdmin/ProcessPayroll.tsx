import React, { useState } from 'react';
import { ChevronDown, Calendar, Search, ArrowUpDown, Info, PlusSquare, Eye, X, ChevronUp, Search as SearchIcon } from 'lucide-react';

export default function ProcessPayroll() {
  const mockData = [
    { id: 'EMP007', name: 'Ankit Bhalerao', dept: 'Operations', desig: 'Operations Head', fd: 11, hd: 0, od: 3, pl: 0, paid: 14, unpaid: 7, dw: 1354.84, gw: 42000, ew: 18968, oe: 0, ot: 0, extras: 0, ge: 18968, sc: 0, tds: 0, pen: 0, oded: 0, fa: 18968, la: 0, arr: 0, tp: 18968, ba: 0, pm: '-' },
    { id: 'EMP014', name: 'Pratik Wankhede', dept: 'RM', desig: 'Team Lead', fd: 16, hd: 0, od: 3, pl: 0, paid: 19, unpaid: 2, dw: 806.45, gw: 25000, ew: 15323, oe: 0, ot: 0, extras: 0, ge: 15323, sc: 0, tds: 0, pen: 0, oded: 0, fa: 15323, la: 0, arr: 0, tp: 15323, ba: 0, pm: '-' },
    { id: 'EMP003', name: 'Nikhil Tumsare', dept: 'RM', desig: 'Business Development Associate', fd: 16, hd: 0, od: 3, pl: 0, paid: 19, unpaid: 2, dw: 580.65, gw: 18000, ew: 11032, oe: 0, ot: 0, extras: 0, ge: 11032, sc: 0, tds: 0, pen: 0, oded: 0, fa: 11032, la: 0, arr: 0, tp: 11032, ba: 0, pm: '-' },
    { id: 'EMP020', name: 'Shweta Wakodikar', dept: 'Finance', desig: 'Finance Executive', fd: 15, hd: 0, od: 3, pl: 0, paid: 18, unpaid: 3, dw: 758.06, gw: 23500, ew: 13645, oe: 0, ot: 0, extras: 0, ge: 13645, sc: 0, tds: 0, pen: 0, oded: 0, fa: 13645, la: 0, arr: 0, tp: 13645, ba: 0, pm: '-' },
    { id: 'EMPO26', name: 'Vedant Lonare', dept: 'Data', desig: 'Executive Data Analyst', fd: 16, hd: 1, od: 3, pl: 0, paid: 19.5, unpaid: 1.5, dw: 548.39, gw: 17000, ew: 10694, oe: 0, ot: 0, extras: 0, ge: 10694, sc: 0, tds: 0, pen: 0, oded: 0, fa: 10694, la: 0, arr: 0, tp: 10694, ba: 0, pm: '-' },
    { id: 'EMP024', name: 'Aditya Kandekar', dept: 'Aayuneer Enterprises', desig: 'Business Development Associate', fd: 17, hd: 0, od: 3, pl: 0, paid: 20, unpaid: 1, dw: 580.65, gw: 18000, ew: 11613, oe: 0, ot: 0, extras: 0, ge: 11613, sc: 0, tds: 0, pen: 0, oded: 0, fa: 11613, la: 0, arr: 0, tp: 11613, ba: 0, pm: '-' },
    { id: 'PF003', name: 'Himanshu Dhote', dept: 'Plastroots Foundation', desig: 'Business Development Associate', fd: 15, hd: 0, od: 3, pl: 0, paid: 18, unpaid: 3, dw: 322.58, gw: 10000, ew: 5806, oe: 0, ot: 0, extras: 0, ge: 5806, sc: 0, tds: 0, pen: 0, oded: 0, fa: 5806, la: 0, arr: 0, tp: 5806, ba: 0, pm: '-' },
    { id: 'EMP032', name: 'Atharva Kale', dept: 'Data', desig: 'Data Analyst', fd: 16, hd: 0, od: 3, pl: 0, paid: 19, unpaid: 2, dw: 322.58, gw: 10000, ew: 6129, oe: 0, ot: 0, extras: 0, ge: 6129, sc: 0, tds: 0, pen: 0, oded: 0, fa: 6129, la: 0, arr: 0, tp: 6129, ba: 0, pm: '-' },
    { id: 'EMP033', name: 'Faizan Sheikh', dept: 'RM', desig: 'Business Analyst', fd: 14, hd: 0, od: 3, pl: 0, paid: 17, unpaid: 4, dw: 0, gw: 0, ew: 0, oe: 0, ot: 0, extras: 0, ge: 0, sc: 0, tds: 0, pen: 0, oded: 0, fa: 0, la: 0, arr: 0, tp: 0, ba: 0, pm: '-' },
    { id: 'GC001', name: 'Praful Bhalero', dept: 'Geoclaim Energy Private Limited.', desig: 'Business Development Associate', fd: 16, hd: 0, od: 3, pl: 0, paid: 19, unpaid: 2, dw: 0, gw: 0, ew: 0, oe: 0, ot: 0, extras: 0, ge: 0, sc: 0, tds: 0, pen: 0, oded: 0, fa: 0, la: 0, arr: 0, tp: 0, ba: 0, pm: '-' }
  ];

  const [previewRow, setPreviewRow] = useState<any | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'Gross Earning': true
  });
  const [payrollType, setPayrollType] = useState('Monthly Payroll (With Compliance)');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // Simulate an API call
    setTimeout(() => {
      setIsSearching(false);
    }, 600);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const ThContent = ({ title, sortable = false, underline = false, icon = null }: any) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem', justifyContent: 'center' }}>
      <span style={{ textDecoration: underline ? 'underline' : 'none', cursor: underline ? 'pointer' : 'default' }}>{title}</span>
      {sortable && <ArrowUpDown size={12} color="#9ca3af" />}
      {icon}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
      
      {/* Title */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>Monthly Payroll</h2>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', flexDirection: 'column', padding: '1rem 1.5rem', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb', gap: '0.75rem' }}>
        <div className="header-responsive">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            
            <div style={{ position: 'relative', width: '100%', minWidth: '250px' }}>
              <select 
                value={payrollType}
                onChange={(e) => setPayrollType(e.target.value)}
                style={{ width: '100%', appearance: 'none', padding: '0.5rem 3rem 0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', color: '#374151', backgroundColor: 'white', outline: 'none', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
              >
                <option value="Monthly Payroll (With Compliance)">Monthly Payroll (With Compliance)</option>
                <option value="Hourly Payroll">Hourly Payroll</option>
                <option value="Monthly Payroll (No Compliance)">Monthly Payroll (No Compliance)</option>
              </select>
              <div style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <button onClick={() => setPayrollType('')} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', color: '#6b7280' }}>
                  <X size={14} />
                </button>
                <ChevronDown size={14} color="#6b7280" style={{ pointerEvents: 'none' }} />
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#374151', fontSize: '0.875rem' }}>
              <input type="date" defaultValue="2026-07-01" style={{ border: 'none', outline: 'none', color: '#374151', backgroundColor: 'transparent', fontFamily: 'inherit', fontSize: 'inherit' }} />
              <span style={{ color: '#9ca3af' }}>→</span>
              <input type="date" defaultValue="2026-07-21" style={{ border: 'none', outline: 'none', color: '#374151', backgroundColor: 'transparent', fontFamily: 'inherit', fontSize: 'inherit' }} />
            </div>
            
            <span style={{ fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>21 Days</span>

            <button 
              onClick={handleSearch}
              disabled={isSearching}
              style={{ backgroundColor: isSearching ? '#93c5fd' : '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1.5rem', fontSize: '0.875rem', fontWeight: '500', cursor: isSearching ? 'default' : 'pointer' }}
            >
              {isSearching ? 'Searching...' : 'Search'}
            </button>
          </div>

          <div style={{ position: 'relative' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#374151', padding: '0.5rem 1rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              Actions <ChevronDown size={14} color="#6b7280" />
            </button>
          </div>
        </div>

        <p style={{ margin: 0, fontSize: '0.75rem', color: '#4b5563', fontWeight: '500' }}>
          <strong>Note:</strong> Payroll dates marked as finalized can't be selected or included in any date range. Changes will only be possible on definalized data/records.
        </p>
      </div>

      <div style={{ padding: '0.75rem 1.5rem', textAlign: 'right', borderBottom: '1px solid #e5e7eb' }}>
        <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>
          <strong>Note:</strong> You can configure column settings by clicking column Title which have underline
        </p>
      </div>

      {/* Spreadsheet Table */}
      <div style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: 'max-content', borderCollapse: 'collapse', textAlign: 'center', minWidth: '100%' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 20, backgroundColor: '#f9fafb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <tr>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', position: 'sticky', left: 0, zIndex: 21, backgroundColor: '#f9fafb', textAlign: 'left', minWidth: '120px' }}><ThContent title="Employee ID" sortable /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', position: 'sticky', left: '120px', zIndex: 21, backgroundColor: '#f9fafb', textAlign: 'left', minWidth: '160px' }}><ThContent title="Employee Name" sortable /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', position: 'sticky', left: '280px', zIndex: 21, backgroundColor: '#f9fafb', textAlign: 'left', minWidth: '160px' }}><ThContent title="Department" sortable /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', position: 'sticky', left: '440px', zIndex: 21, backgroundColor: '#f9fafb', textAlign: 'left', minWidth: '200px' }}><ThContent title="Designation" sortable /></th>
              
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="Full Day" underline /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="Half Day" underline /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="Off Days" underline /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '90px' }}><ThContent title="Paid Leaves" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '90px' }}><ThContent title="Paid Days" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '90px' }}><ThContent title="Unpaid Days" /></th>
              
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '100px' }}><ThContent title="Daily Wage" underline /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '100px' }}><ThContent title="Gross Wages" underline /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '110px' }}><ThContent title="Earned Wages" underline icon={<Info size={12} color="#6b7280" />} /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}><ThContent title="Other Earnings" underline icon={<PlusSquare size={12} color="#6b7280" />} /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="Overtime" underline /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="Extras" underline /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}><ThContent title="Gross Earnings" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '150px' }}><ThContent title="Statutory Compliance" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="TDS" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '90px' }}><ThContent title="Penalties" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '130px' }}><ThContent title="Other Deductions" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}><ThContent title="Finalized Amount" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}><ThContent title="Loan & Advance" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="Arrears" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '100px' }}><ThContent title="To Pay" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}><ThContent title="Balance Arrears" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '120px' }}><ThContent title="Payment Method" /></th>
              <th style={{ padding: '1rem 0.75rem', fontSize: '0.75rem', fontWeight: '600', color: '#111827', borderRight: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', minWidth: '80px' }}><ThContent title="Preview" /></th>
            </tr>
          </thead>
          
          <tbody>
            {isSearching ? (
              <tr>
                <td colSpan={28} style={{ padding: '3rem', textAlign: 'center', color: '#6b7280' }}>
                  Processing data...
                </td>
              </tr>
            ) : (
              mockData.map((row, rIdx) => (
                <tr key={row.id} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: 'white' }}>
                  <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', position: 'sticky', left: 0, zIndex: 10, backgroundColor: 'white', textAlign: 'left' }}>{row.id}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', position: 'sticky', left: '120px', zIndex: 10, backgroundColor: 'white', textAlign: 'left' }}>{row.name}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', position: 'sticky', left: '280px', zIndex: 10, backgroundColor: 'white', textAlign: 'left' }}>{row.dept}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', position: 'sticky', left: '440px', zIndex: 10, backgroundColor: 'white', textAlign: 'left' }}>{row.desig}</td>
                
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.fd}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.hd}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.od}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.pl}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', backgroundColor: '#f0fdf4' }}>{row.paid}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb', backgroundColor: '#fef2f2' }}>{row.unpaid}</td>
                
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.dw}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.gw}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.ew}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.oe}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.ot}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.extras}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.ge}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.sc}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.tds}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.pen}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.oded}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.fa}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.la}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.arr}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.tp}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.ba}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>{row.pm}</td>
                <td style={{ padding: '1.25rem 0.75rem', fontSize: '0.75rem', color: '#374151', borderRight: '1px solid #e5e7eb' }}>
                  <button 
                    onClick={() => setPreviewRow(row)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6b7280', margin: '0 auto' }}
                  >
                    <Eye size={16} />
                  </button>
                </td>
              </tr>
              ))
            )}
          </tbody>
        </table>
</div>
      </div>

      {/* Preview Overlay Drawer */}
      {previewRow && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: '450px', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideInRight 0.3s ease-out' }}>
            
            {/* Drawer Header */}
            <div style={{ padding: '1.5rem', backgroundColor: '#eff6ff', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>{previewRow.name}</h2>
                <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Preview</span>
              </div>
              <button onClick={() => setPreviewRow(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                <X size={20} />
              </button>
            </div>

            {/* Drawer Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white' }}>
              
              {/* Gross Earning Section */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>Gross Earning</h3>
                  <button onClick={() => toggleSection('Gross Earning')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#0ea5e9', fontWeight: '500', cursor: 'pointer' }}>
                    {expandedSections['Gross Earning'] ? 'View Less' : 'View More'} {expandedSections['Gross Earning'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <tr>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Heads</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Payment Type</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Amount (PM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expandedSections['Gross Earning'] ? (
                        <>
                          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '1rem', color: '#4b5563' }}>Basic Salary</td>
                            <td style={{ padding: '1rem', color: '#4b5563' }}>50% of {previewRow.fa}</td>
                            <td style={{ padding: '1rem', color: '#4b5563' }}>{(previewRow.fa * 0.5).toFixed(2)}</td>
                          </tr>
                          <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                            <td style={{ padding: '1rem', color: '#4b5563' }}>Residual Pay</td>
                            <td style={{ padding: '1rem', color: '#4b5563' }}>Fixed Amount</td>
                            <td style={{ padding: '1rem', color: '#4b5563' }}>{(previewRow.fa * 0.5).toFixed(2)}</td>
                          </tr>
                          <tr>
                            <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>Gross Income</td>
                            <td style={{ padding: '1rem' }}></td>
                            <td style={{ padding: '1rem', color: '#4b5563' }}>{previewRow.fa}</td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>Gross Income</td>
                          <td style={{ padding: '1rem' }}></td>
                          <td style={{ padding: '1rem', color: '#4b5563' }}>{previewRow.fa}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
</div>
                </div>
              </div>

              {/* Other Earnings Section */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>Other Earnings</h3>
                  <button onClick={() => toggleSection('Other Earnings')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#0ea5e9', fontWeight: '500', cursor: 'pointer' }}>
                    {expandedSections['Other Earnings'] ? 'View Less' : 'View More'} {expandedSections['Other Earnings'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <tr>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Heads</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Payment Type</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Amount (PM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expandedSections['Other Earnings'] && (
                        <tr>
                          <td colSpan={3} style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcon size={20} color="#3b82f6" />
                              </div>
                              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>No Data Found</span>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr style={{ borderTop: expandedSections['Other Earnings'] ? '1px solid #e5e7eb' : 'none' }}>
                        <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>Total Other Earnings</td>
                        <td style={{ padding: '1rem' }}></td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>-</td>
                      </tr>
                    </tbody>
                  </table>
</div>
                </div>
              </div>

              {/* Statutory Compliance Section */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>Statutory Compliance</h3>
                  <button onClick={() => toggleSection('Statutory Compliance')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#0ea5e9', fontWeight: '500', cursor: 'pointer' }}>
                    {expandedSections['Statutory Compliance'] ? 'View Less' : 'View More'} {expandedSections['Statutory Compliance'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <tr>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Heads</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Payment Type</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Amount (PM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expandedSections['Statutory Compliance'] && (
                        <tr>
                          <td colSpan={3} style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcon size={20} color="#3b82f6" />
                              </div>
                              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>No Data Found</span>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr style={{ borderTop: expandedSections['Statutory Compliance'] ? '1px solid #e5e7eb' : 'none' }}>
                        <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>Total Statutory Compliance</td>
                        <td style={{ padding: '1rem' }}></td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>-</td>
                      </tr>
                    </tbody>
                  </table>
</div>
                </div>
              </div>

              {/* Deductions Section */}
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600', color: '#1f2937' }}>Deductions</h3>
                  <button onClick={() => toggleSection('Deductions')} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: '#0ea5e9', fontWeight: '500', cursor: 'pointer' }}>
                    {expandedSections['Deductions'] ? 'View Less' : 'View More'} {expandedSections['Deductions'] ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>
                </div>
                
                <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                  <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.75rem' }}>
                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <tr>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Heads</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Payment Type</th>
                        <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#111827' }}>Amount (PM)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {expandedSections['Deductions'] && (
                        <tr>
                          <td colSpan={3} style={{ padding: '3rem 1rem', textAlign: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
                              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <SearchIcon size={20} color="#3b82f6" />
                              </div>
                              <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>No Data Found</span>
                            </div>
                          </td>
                        </tr>
                      )}
                      <tr style={{ borderTop: expandedSections['Deductions'] ? '1px solid #e5e7eb' : 'none' }}>
                        <td style={{ padding: '1rem', fontWeight: '600', color: '#111827' }}>Total Deductions</td>
                        <td style={{ padding: '1rem' }}></td>
                        <td style={{ padding: '1rem', color: '#4b5563' }}>-</td>
                      </tr>
                    </tbody>
                  </table>
</div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
