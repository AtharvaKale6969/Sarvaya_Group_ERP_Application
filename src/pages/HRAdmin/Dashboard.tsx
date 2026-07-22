import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Briefcase, Clock, Coffee, Calendar, ChevronRight } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedDate, setSelectedDate] = useState('2026-07-14');
  const [isExpanded, setIsExpanded] = useState(false);
  const kpis = [
    { title: 'Total Employees', value: '15', icon: <Users size={20} />, color: '#0ea5e9', bg: '#e0f2fe' },
    { title: 'Currently Working', value: '12', icon: <Briefcase size={20} />, color: '#10b981', bg: '#d1fae5' },
    { title: 'On Leave', value: '0', icon: <Coffee size={20} />, color: '#8b5cf6', bg: '#ede9fe' },
    { title: 'Havent logged in', value: '3', icon: <Clock size={20} />, color: '#ef4444', bg: '#fee2e2' },
  ];

  const attendanceTabs = [
    { name: 'All', count: 15 },
    { name: 'Open Shift' },
    { name: 'Daily Shift' },
    { name: 'Default Shift' },
  ];

  const summaryStats = [
    { label: 'Checked In', value: '13', color: '#0ea5e9' },
    { label: 'Not in Yet', value: '2', color: '#ef4444' },
    { label: 'Time Off', value: '0', color: '#8b5cf6' },
  ];

  const employees = [
    { id: 'EMP032', name: 'Atharva Kale', org: 'Saravya Group', dept: 'HQ / Operations', role: 'Data Analyst', firstPunch: '11:01 AM', lastPunch: '-', working: '04h 43m' },
    { id: 'GC001', name: 'Praful Bhalera', org: 'Geoclaim', dept: 'PMS', role: 'Business Development Associate', firstPunch: '10:55 AM', lastPunch: '-', working: '04h 48m' },
    { id: 'EMP031', name: 'Bhushan Chilange', org: 'Saravya Group', dept: 'HQ / Operations', role: 'Business Development Associate', firstPunch: '10:46 AM', lastPunch: '-', working: '04h 58m' },
    { id: 'EMP026', name: 'Vedant Lonare', org: 'Saravya Group', dept: 'HQ / Operations', role: 'Executive Data Analyst', firstPunch: '10:46 AM', lastPunch: '-', working: '04h 58m' },
    { id: 'EMP007', name: 'Ankit Bhalerao', org: 'Saravya Group', dept: 'HQ / Operations', role: 'Operations Head', firstPunch: '10:35 AM', lastPunch: '-', working: '05h 08m' },
    { id: 'EMP020', name: 'Shweta Wakadikar', org: 'Saravya Group', dept: 'HQ / Operations', role: 'Finance Executive', firstPunch: '10:25 AM', lastPunch: '10:35 AM', working: '00h 10m' },
    { id: 'SFS001', name: 'Ankita Kothe', org: 'Shetohit', dept: 'HQ / Operations', role: 'Business Development Associate', firstPunch: '10:34 AM', lastPunch: '-', working: '05h 10m' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: 0, color: 'var(--text-color)' }}>Dashboard</h1>
      
      {/* KPI Cards */}
      <div className="responsive-cards">
        {kpis.map((kpi, idx) => (
          <div key={idx} style={{ 
            flex: 1, backgroundColor: 'white', borderRadius: '8px', 
            padding: '1.25rem', border: '1px solid #e5e7eb',
            display: 'flex', alignItems: 'center', gap: '1rem',
            boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
          }}>
            <div style={{ 
              width: '2.5rem', height: '2.5rem', borderRadius: '8px', 
              backgroundColor: kpi.bg, color: kpi.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {kpi.icon}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: '500' }}>{kpi.title}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827' }}>{kpi.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Attendance Summary section */}
      <div style={{ 
        backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column'
      }}>
        {/* Header & Tabs */}
        <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#374151' }}>Quick Attendance Summary</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '0.875rem', color: '#4b5563', position: 'relative' }}>
            <Calendar size={16} /> 
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ border: 'none', outline: 'none', background: 'transparent', color: '#4b5563', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.875rem' }} 
            />
          </div>
        </div>

        <div style={{ padding: '0 1.5rem', borderBottom: '1px solid #e5e7eb', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {attendanceTabs.map(tab => (
            <button 
              key={tab.name} 
              onClick={() => setActiveTab(tab.name)}
              style={{
                background: 'none', border: 'none', padding: '1rem 0',
                borderBottom: activeTab === tab.name ? '2px solid #0ea5e9' : '2px solid transparent',
                color: activeTab === tab.name ? '#0ea5e9' : '#6b7280',
                fontWeight: activeTab === tab.name ? '600' : '500', fontSize: '0.875rem',
                display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab.name}
              {tab.count && (
                <span style={{ 
                  backgroundColor: activeTab === tab.name ? '#e0f2fe' : '#f3f4f6', 
                  color: activeTab === tab.name ? '#0ea5e9' : '#9ca3af',
                  padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem',
                  transition: 'all 0.2s'
                }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Stats Blocks */}
        <div className="responsive-cards" style={{ padding: '1.5rem' }}>
          {summaryStats.map(stat => (
            <div key={stat.label} style={{
              flex: 1, border: '1px solid #e5e7eb', borderRadius: '8px', padding: '1rem',
              display: 'flex', alignItems: 'center', gap: '0.75rem'
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: stat.color }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#111827', lineHeight: '1' }}>{stat.value}</span>
                <span style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>{stat.label}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
              <tr>
                {['Employee ID', 'Employee Name', 'Organization', 'Department', 'Designation', 'First Punch', 'Last Punch', 'Total Working Hours'].map(header => (
                  <th key={header} style={{ padding: '0.75rem 1.5rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', whiteSpace: 'nowrap' }}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(isExpanded ? employees : employees.slice(0, 4)).map((emp, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#374151', whiteSpace: 'nowrap' }}>{emp.id}</td>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500', whiteSpace: 'nowrap' }}>{emp.name}</td>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.org}</td>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.dept}</td>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.role}</td>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.firstPunch}</td>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.lastPunch}</td>
                  <td style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem', color: '#4b5563', whiteSpace: 'nowrap' }}>{emp.working}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div style={{ padding: '0.75rem 1.5rem', borderTop: '1px solid #e5e7eb', textAlign: 'right', backgroundColor: '#f9fafb', borderBottomLeftRadius: '8px', borderBottomRightRadius: '8px' }}>
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', textDecoration: 'none' }}
          >
            {isExpanded ? 'View Less' : 'View More'} <ChevronRight size={16} style={{ transform: isExpanded ? 'rotate(-90deg)' : 'none', transition: 'transform 0.2s' }} />
          </button>
        </div>
      </div>

      {/* Bottom Summary Cards */}
      <div className="responsive-stack">
        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', margin: '0 0 1rem 0' }}>Today's Shift Wise Attendance Summary</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead style={{ backgroundColor: '#eff6ff' }}>
              <tr>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af', borderRadius: '6px 0 0 6px' }}>Shift</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af' }}>Checked In</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af' }}>Not In Yet</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af', borderRadius: '0 6px 6px 0' }}>Time Off</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563' }}>Open Shift</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>0</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>0</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>0</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', color: '#4b5563' }}>Daily Shift</td>
                <td style={{ padding: '1rem', color: '#111827' }}>12</td>
                <td style={{ padding: '1rem', color: '#111827' }}>1</td>
                <td style={{ padding: '1rem', color: '#111827' }}>2</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div style={{ flex: 1, backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 2px rgba(0,0,0,0.05)', padding: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#374151', margin: '0 0 1rem 0' }}>Today's Department Wise Attendance Summary</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.875rem' }}>
            <thead style={{ backgroundColor: '#eff6ff' }}>
              <tr>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af', borderRadius: '6px 0 0 6px' }}>Department</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af' }}>Checked In</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af' }}>Not In Yet</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#1e40af', borderRadius: '0 6px 6px 0' }}>Time Off</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563' }}>Shetohit Form Solutions</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>1</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>0</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>0</td>
              </tr>
              <tr>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#4b5563' }}>Geoclaim Energy Private Limited.</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>2</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>0</td>
                <td style={{ padding: '1rem', borderBottom: '1px solid #f3f4f6', color: '#111827' }}>0</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
