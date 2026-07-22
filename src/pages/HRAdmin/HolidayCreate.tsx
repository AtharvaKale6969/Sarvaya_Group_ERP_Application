import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronsUpDown, ChevronDown, MoreVertical, ChevronLeft, Search, X as XIcon, Calendar as CalendarIcon, Edit2, Trash2 } from 'lucide-react';

export default function HolidayCreate() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // View states
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false);
  const [isEditingTemplate, setIsEditingTemplate] = useState<string | null>(null);
  
  // Action menu & Modals
  const [actionMenuOpen, setActionMenuOpen] = useState<number | null>(null);
  const [templateToDelete, setTemplateToDelete] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  
  // Drawer states
  const [drawerState, setDrawerState] = useState<{ isOpen: boolean, editIndex: number | null }>({ isOpen: false, editIndex: null });
  const [drawerHolidayName, setDrawerHolidayName] = useState('');
  const [drawerStartDate, setDrawerStartDate] = useState('');
  const [drawerEndDate, setDrawerEndDate] = useState('');

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActionMenuOpen(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Data for list view
  const [templates, setTemplates] = useState([
    { name: 'Optional Holidays', count: 0, assigned: 13, created: '28 May 2026 by HR', modified: '28 May 2026 by HR' },
    { name: 'Holidays', count: 12, assigned: 0, created: '21 April 2026 by HR', modified: '21 April 2026 by HR' }
  ]);

  // Data for detail view (mocking Holidays template)
  const defaultHolidays = [
    { date: '15 January 2027', day: 'Friday', name: 'Makar Sankranti' },
    { date: '01 January 2027', day: 'Friday', name: 'New Year' },
    { date: '25 December 2026', day: 'Friday', name: 'Christmas' },
    { date: '11 November 2026', day: 'Wednesday', name: 'Bhaiduj' },
    { date: '03 November 2026', day: 'Monday', name: 'Balipratipada' },
    { date: '01 November 2026', day: 'Sunday', name: 'LakshmiPujan' },
    { date: '20 October 2026', day: 'Tuesday', name: 'Dussehra' },
    { date: '02 October 2026', day: 'Friday', name: 'Gandhi Jayanti' },
    { date: '14 September 2026', day: 'Monday', name: 'Ganesh Chaturthi' },
    { date: '28 August 2026', day: 'Friday', name: 'Rakshabandhan' },
  ];

  const [holidayDetails, setHolidayDetails] = useState(defaultHolidays);

  const openDrawerForAdd = () => {
    setDrawerHolidayName('');
    setDrawerStartDate('');
    setDrawerEndDate('');
    setDrawerState({ isOpen: true, editIndex: null });
  };

  const openDrawerForEdit = (idx: number) => {
    const holiday = holidayDetails[idx];
    setDrawerHolidayName(holiday.name);
    
    // Attempt to parse '15 January 2027' back to YYYY-MM-DD for the input
    const d = new Date(holiday.date);
    if (!isNaN(d.getTime())) {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      setDrawerStartDate(`${yyyy}-${mm}-${dd}`);
      setDrawerEndDate(`${yyyy}-${mm}-${dd}`);
    } else {
      setDrawerStartDate('');
      setDrawerEndDate('');
    }
    
    setDrawerState({ isOpen: true, editIndex: idx });
  };

  const handleSaveHoliday = () => {
    if (!drawerHolidayName || !drawerStartDate) return; // Basic validation

    const start = new Date(drawerStartDate);
    const end = drawerEndDate ? new Date(drawerEndDate) : new Date(drawerStartDate);
    
    const newHolidays: typeof holidayDetails = [];
    
    // Generate a holiday for each day in the range
    let current = new Date(start);
    while (current <= end) {
      newHolidays.push({
        date: current.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }),
        day: current.toLocaleDateString('en-US', { weekday: 'long' }),
        name: drawerHolidayName
      });
      current.setDate(current.getDate() + 1);
    }

    setHolidayDetails(prev => {
      let next = [...prev];
      if (drawerState.editIndex !== null && newHolidays.length > 0) {
        // Edit existing: replace the edited index with the first new holiday (ignoring ranges for edits to keep it simple)
        next[drawerState.editIndex!] = newHolidays[0];
      } else {
        // Add new
        next = [...next, ...newHolidays];
      }
      
      // Sort descending by date
      return next.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    });
    
    setDrawerState({ isOpen: false, editIndex: null });
  };

  if (activeTemplate) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', minHeight: '800px' }}>
        {/* Detail View Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <button 
            onClick={() => setActiveTemplate(null)}
            style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#374151', padding: 0 }}
          >
            <ChevronLeft size={20} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Template Name*</span>
            <input 
              type="text" 
              value={activeTemplate} 
              readOnly
              style={{ padding: '0.5rem 0.75rem', border: '1px solid #e5e7eb', borderRadius: '6px', fontSize: '0.875rem', color: '#111827', outline: 'none', width: '100%', minWidth: '250px' }}
            />
          </div>
        </div>

        {/* Detail Table */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flex: 1 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Date <ChevronsUpDown size={14} /></div>
                </th>
                <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Day <ChevronsUpDown size={14} /></div>
                </th>
                <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Name <ChevronsUpDown size={14} /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {holidayDetails.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                    No holidays defined in this template yet.
                  </td>
                </tr>
              ) : (
                holidayDetails.map((hd, idx) => (
                  <tr key={idx} style={{ borderBottom: idx === holidayDetails.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{hd.date}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{hd.day}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{hd.name}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Detail Pagination Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Showing <span style={{ fontWeight: '600', color: '#374151' }}>{holidayDetails.length === 0 ? 0 : 1}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{holidayDetails.length}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{holidayDetails.length}</span> Results
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

  if (isCreatingTemplate || isEditingTemplate) {
    const isEditing = !!isEditingTemplate;
    const templateName = isEditing ? isEditingTemplate : '';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', minHeight: '800px', position: 'relative' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <button 
            onClick={() => { setIsCreatingTemplate(false); setIsEditingTemplate(null); }}
            style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer', color: '#1e3a8a', padding: 0 }}
          >
            <ChevronLeft size={18} />
          </button>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>
            {isEditing ? 'Template Name*' : 'Create Template'}
          </h2>
        </div>

        {/* Action Row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {!isEditing && <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Template Name*</span>}
            <input 
              type="text" 
              defaultValue={templateName}
              placeholder="Write Template Name Here"
              style={{ padding: '0.5rem 0.75rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none', width: '100%', minWidth: '250px' }}
            />
          </div>
          <button 
            onClick={openDrawerForAdd}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Add Holiday
          </button>
        </div>

        {/* Table */}
        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#eff6ff' }}>
                <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', width: '30%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Date <ChevronsUpDown size={14} /></div>
                </th>
                <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', width: '25%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Day <ChevronsUpDown size={14} /></div>
                </th>
                <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', width: '30%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Name <ChevronsUpDown size={14} /></div>
                </th>
                <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a', width: '15%', textAlign: 'center' }}>
                  Action
                </th>
              </tr>
            </thead>
            {isEditing && (
              <tbody>
                {holidayDetails.length === 0 ? (
                  <tr>
                    <td colSpan={4} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                      No holidays defined in this template yet.
                    </td>
                  </tr>
                ) : (
                  holidayDetails.map((hd, idx) => (
                    <tr key={idx} style={{ borderBottom: idx === holidayDetails.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{hd.date}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{hd.day}</td>
                      <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{hd.name}</td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                          <button 
                            onClick={() => openDrawerForEdit(idx)}
                            style={{ padding: '0.375rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Edit Holiday"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button 
                            onClick={() => setHolidayDetails(prev => prev.filter((_, i) => i !== idx))}
                            style={{ padding: '0.375rem', backgroundColor: 'white', border: '1px solid #ef4444', borderRadius: '4px', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            title="Delete Holiday"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            )}
          </table>
          
          {!isEditing && (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', color: '#1e3a8a', minHeight: '300px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Search size={20} color="#3b82f6" />
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500' }}>No Data Found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        {isEditing && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Showing <span style={{ fontWeight: '600', color: '#374151' }}>{holidayDetails.length === 0 ? 0 : 1}</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{holidayDetails.length}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{holidayDetails.length}</span> Results
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
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: isEditing ? 'none' : '1px solid #e5e7eb' }}>
          <button style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
            Save Details
          </button>
        </div>

        {/* Add/Edit Holiday Drawer */}
        {drawerState.isOpen && (
          <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ width: '400px', backgroundColor: 'white', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out forwards' }}>
              
              {/* Drawer Header */}
              <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#eff6ff' }}>
                <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1e3a8a', margin: 0 }}>
                  {drawerState.editIndex !== null ? 'Edit Holiday' : 'Add Holiday'}
                </h2>
                <button onClick={() => setDrawerState({ isOpen: false, editIndex: null })} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                  <XIcon size={20} />
                </button>
              </div>

              {/* Drawer Body */}
              <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Name<span style={{ color: '#ef4444' }}>*</span></label>
                  <input 
                    type="text" 
                    value={drawerHolidayName}
                    onChange={(e) => setDrawerHolidayName(e.target.value)}
                    placeholder="Enter Holiday Name"
                    style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.875rem', outline: 'none' }} 
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', position: 'relative' }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: '4px', overflow: 'hidden' }}>
                    <input 
                      type="date" 
                      value={drawerStartDate}
                      onChange={(e) => setDrawerStartDate(e.target.value)}
                      style={{ padding: '0.625rem', border: 'none', fontSize: '0.875rem', outline: 'none', flex: 1, backgroundColor: 'transparent', cursor: 'pointer' }} 
                    />
                    <span style={{ color: '#9ca3af', fontSize: '0.875rem', padding: '0 0.25rem' }}>→</span>
                    <input 
                      type="date" 
                      value={drawerEndDate}
                      onChange={(e) => setDrawerEndDate(e.target.value)}
                      min={drawerStartDate}
                      style={{ padding: '0.625rem', border: 'none', fontSize: '0.875rem', outline: 'none', flex: 1, backgroundColor: 'transparent', cursor: 'pointer' }} 
                    />
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#eff6ff' }}>
                <button 
                  onClick={handleSaveHoliday} 
                  style={{ padding: '0.5rem 1.5rem', backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '4px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
                >
                  {drawerState.editIndex !== null ? 'Update Holiday' : 'Add Holiday'}
                </button>
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '1rem', minHeight: '800px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#111827' }}>
          Holiday Create
        </h2>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => navigate('/hr-admin/holiday-assign')}
            style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Assign Holiday
          </button>
          <button 
            onClick={() => setIsCreatingTemplate(true)}
            style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', borderRadius: '6px', padding: '0.5rem 1rem', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}
          >
            Create Template
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', flex: 1 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#eff6ff' }}>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Template Name <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Holiday Count <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>No. Of Assigned Employee <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Created On <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>Last Modified <ChevronsUpDown size={14} /></div>
              </th>
              <th style={{ padding: '1rem', fontSize: '0.75rem', fontWeight: '600', color: '#1e3a8a' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((tpl, idx) => (
              <tr key={idx} style={{ borderBottom: idx === templates.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{tpl.name}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{tpl.count}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{tpl.assigned}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{tpl.created}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151' }}>{tpl.modified}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button 
                      onClick={() => {
                        setHolidayDetails(tpl.name === 'Optional Holidays' ? [] : defaultHolidays);
                        setActiveTemplate(tpl.name);
                      }}
                      style={{ padding: '0.375rem 0.75rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', fontSize: '0.75rem', color: '#374151', cursor: 'pointer' }}
                    >
                      View Template
                    </button>
                    <div style={{ position: 'relative' }}>
                      <button 
                        onClick={() => setActionMenuOpen(actionMenuOpen === idx ? null : idx)}
                        style={{ padding: '0.375rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '4px', color: '#6b7280', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <MoreVertical size={16} />
                      </button>
                      
                      {actionMenuOpen === idx && (
                        <div 
                          ref={menuRef}
                          style={{ position: 'absolute', right: 0, top: '100%', marginTop: '0.25rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '6px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', zIndex: 10, minWidth: '120px', padding: '0.25rem 0' }}
                        >
                          <button 
                            onClick={() => {
                              setActionMenuOpen(null);
                              setHolidayDetails(tpl.name === 'Optional Holidays' ? [] : defaultHolidays);
                              setIsEditingTemplate(tpl.name);
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem 1rem', background: 'none', border: 'none', fontSize: '0.875rem', color: '#374151', cursor: 'pointer', textAlign: 'left' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <Edit2 size={14} /> Edit
                          </button>
                          <button 
                            onClick={() => {
                              setActionMenuOpen(null);
                              setTemplateToDelete(idx);
                            }}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', width: '100%', padding: '0.5rem 1rem', background: 'none', border: 'none', fontSize: '0.875rem', color: '#ef4444', cursor: 'pointer', textAlign: 'left' }}
                            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                          >
                            <Trash2 size={14} /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '1px solid #e5e7eb' }}>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          Showing <span style={{ fontWeight: '600', color: '#374151' }}>1</span> to <span style={{ fontWeight: '600', color: '#374151' }}>{templates.length}</span> of <span style={{ fontWeight: '600', color: '#374151' }}>{templates.length}</span> Results
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
            <button style={{ background: 'white', border: 'none', borderLeft: '1px solid #d1d5db', padding: '0.375rem 0.75rem', fontSize: '0.875rem', color: '#d1d5db', cursor: 'default' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {templateToDelete !== null && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '400px', backgroundColor: 'white', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)', display: 'flex', flexDirection: 'column', gap: '1rem', animation: 'fadeIn 0.2s ease-out' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#fef2f2', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Trash2 color="#ef4444" size={20} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>Delete Template</h3>
                </div>
              </div>
              <button onClick={() => setTemplateToDelete(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af', padding: '0.25rem' }}>
                <XIcon size={20} />
              </button>
            </div>
            
            <p style={{ margin: '0.5rem 0 1rem 0', fontSize: '0.875rem', color: '#4b5563', lineHeight: '1.5' }}>
              Are you sure you want to delete the <strong>{templates[templateToDelete].name}</strong> template? This action cannot be undone and will affect any assigned employees.
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button 
                onClick={() => setTemplateToDelete(null)} 
                style={{ padding: '0.5rem 1rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: '#374151', cursor: 'pointer' }}
              >
                No, Cancel
              </button>
              <button 
                onClick={() => {
                  setTemplates(templates.filter((_, idx) => idx !== templateToDelete));
                  setTemplateToDelete(null);
                }} 
                style={{ padding: '0.5rem 1rem', backgroundColor: '#ef4444', border: 'none', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', color: 'white', cursor: 'pointer' }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
