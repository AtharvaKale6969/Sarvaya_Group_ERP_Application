import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/useAuthStore';
import { useContextStore } from '../../../store/useContextStore';
import { Search, Plus, Upload, Pencil, Trash2 } from 'lucide-react';
import { getClientOptions } from '../../../lib/constants';

interface CallRecord {
  id: string;
  company_name: string;
  client_type: string;
  business_role: string;
  address: string;
  city_state: string;
  client_name: string;
  contact_number: string;
  email: string;
  status: string;
  is_trashed: boolean;
  created_at?: string;
}

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", 
  "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", 
  "Lakshadweep", "Puducherry"
];

export default function AllCalls() {
  const { user } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept } = useContextStore();
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  
  // Log Call Modal State
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [showReschedulePicker, setShowReschedulePicker] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState('');

  const { types: dynamicTypes, roles: dynamicRoles } = getClientOptions(activeOrg, activeDept, activeSubDept);

  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [editingCallId, setEditingCallId] = useState<string | null>(null);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    company_name: '',
    client_name: '',
    contact_number: '',
    email: '',
    address: '',
    city_state: '',
    client_type: dynamicTypes[0],
    business_role: dynamicRoles[0]
  });

  const resetForm = () => {
    setFormData({
      company_name: '',
      client_name: '',
      contact_number: '',
      email: '',
      address: '',
      city_state: '',
      client_type: dynamicTypes[0],
      business_role: dynamicRoles[0]
    });
  };
  
  useEffect(() => {
    if (user) fetchCalls();
  }, [user, activeOrg, activeDept, activeSubDept]);

  const fetchCalls = async () => {
    let query = supabase
      .from('rmt_bde_calls')
      .select('*')
      .eq('user_id', user?.id)
      .eq('is_trashed', false)
      .eq('organization', activeOrg)
      .eq('department', activeDept);

    if (activeSubDept) {
      query = query.eq('sub_department', activeSubDept);
    }

    const { data } = await query.order('created_at', { ascending: false });
    if (data) setCalls(data);
  };

  const handleEditClick = (c: CallRecord) => {
    setFormData({
      company_name: c.company_name,
      client_name: c.client_name,
      contact_number: c.contact_number,
      email: c.email || '',
      address: c.address || '',
      city_state: c.city_state || '',
      client_type: c.client_type,
      business_role: c.business_role
    });
    setEditingCallId(c.id);
    setIsAddClientOpen(true);
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    
    if (editingCallId) {
      const { data, error } = await supabase
        .from('rmt_bde_calls')
        .update(formData)
        .eq('id', editingCallId)
        .select()
        .single();
        
      if (!error && data) {
        setCalls(calls.map(c => c.id === editingCallId ? data : c));
        setIsAddClientOpen(false);
        setEditingCallId(null);
        resetForm();
      } else {
        console.error(error);
        alert('Error updating client.');
      }
    } else {
      const { data, error } = await supabase
        .from('rmt_bde_calls')
        .insert([{
          user_id: user.id,
          organization: activeOrg,
          department: activeDept,
          sub_department: activeSubDept,
          ...formData
        }])
        .select()
        .single();

      if (!error && data) {
        setCalls([data, ...calls]);
        setIsAddClientOpen(false);
        resetForm();
      } else {
        console.error(error);
        alert('Error adding client.');
      }
    }
    setIsSubmitting(false);
  };

  const handleLogCall = async (outcome: string, date?: string) => {
    if (!selectedCallId) return;
    
    const updateData: any = { status: outcome, updated_at: new Date().toISOString() };
    if (outcome === 'Reschedule' && date) {
      updateData.reschedule_date = new Date(date).toISOString();
    }
    
    const { error } = await supabase
      .from('rmt_bde_calls')
      .update(updateData)
      .eq('id', selectedCallId);
      
    if (!error) {
      setCalls(calls.map(c => c.id === selectedCallId ? { ...c, status: outcome, reschedule_date: updateData.reschedule_date } : c));
      setSelectedCallId(null);
      setShowReschedulePicker(false);
      setRescheduleDate('');
    } else {
      console.error(error);
      alert('Failed to log call.');
    }
  };

  const handleTrashClient = async (id: string) => {
    const { error } = await supabase
      .from('rmt_bde_calls')
      .update({ is_trashed: true, updated_at: new Date().toISOString() })
      .eq('id', id);
      
    if (!error) {
      setCalls(calls.filter(c => c.id !== id));
      setClientToDelete(null);
    } else {
      console.error(error);
      alert('Failed to delete client.');
    }
  };

  // KPI Calculations
  const total = calls.length;
  const notCalled = calls.filter(c => c.status === 'New (Not Called)').length;
  const called = calls.filter(c => c.status !== 'New (Not Called)').length;
  const cnr = calls.filter(c => c.status === 'CNR / CNC').length;
  const reschedule = calls.filter(c => c.status === 'Reschedule').length;
  const interested = calls.filter(c => ['Interested', 'Future Potential', 'Onboarding', 'Active Client'].includes(c.status)).length;

  const filters = ['All', 'New (Not Called)', 'Called', 'Not Interested', 'Reschedule', 'CNR / CNC', 'Interested', 'Future Potential'];

  const filteredCalls = calls.filter(c => {
    if (activeFilter !== 'All' && c.status !== activeFilter) return false;
    if (search && !c.company_name.toLowerCase().includes(search.toLowerCase()) && !c.client_name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* KPI Cards Row */}
      <style>
        {`
          .kpi-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1rem;
          }
          .kpi-card {
            padding: 1.5rem;
            border-radius: 12px;
            text-align: center;
            border: 1px solid var(--border-light);
          }
          .kpi-value {
            font-size: 2rem;
            font-weight: 700;
          }
          .kpi-label {
            font-size: 0.85rem;
            color: var(--text-muted);
            font-weight: 500;
            margin-top: 0.25rem;
          }
          
          .filter-grid {
            display: flex;
            gap: 0.5rem;
            flex-wrap: wrap;
          }
          .filter-pill {
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.2s;
            border: 1px solid;
            white-space: nowrap;
          }

          .controls-container {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            align-items: center;
            background: white;
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid var(--border-light);
          }
          .search-bar {
            display: flex;
            align-items: center;
            flex: 1;
            min-width: 250px;
            background: var(--surface-bg);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            border: 1px solid var(--border-light);
          }
          .select-group {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            flex-wrap: wrap;
          }
          .select-group select {
            padding: 0.6rem;
            border-radius: 8px;
            border: 1px solid var(--border-light);
            background: var(--surface-bg);
            outline: none;
            flex: 1;
            min-width: 120px;
          }
          .action-buttons {
            display: flex;
            gap: 0.5rem;
            margin-left: auto;
            flex-wrap: wrap;
          }
          .action-buttons button {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.6rem 1rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 500;
          }

          @media (max-width: 768px) {
            .kpi-grid {
              grid-template-columns: repeat(3, 1fr);
              gap: 0.5rem;
            }
            .kpi-card {
              padding: 0.75rem;
              border-radius: 8px;
            }
            .kpi-value {
              font-size: 1.25rem;
            }
            .kpi-label {
              font-size: 0.7rem;
            }
            
            .filter-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 0.5rem;
            }
            .filter-pill {
              font-size: 0.75rem;
              padding: 0.4rem 0.5rem;
              text-align: center;
              display: flex;
              align-items: center;
              justify-content: center;
              white-space: normal;
            }

            .controls-container {
              flex-direction: column;
              align-items: stretch;
            }
            .search-bar {
              min-width: 100%;
            }
            .select-group {
              width: 100%;
              flex-direction: row;
            }
            .action-buttons {
              width: 100%;
              margin-left: 0;
              flex-direction: row;
            }
            .action-buttons button {
              flex: 1;
              justify-content: center;
            }
          }
        `}
      </style>
      <div className="kpi-grid">
        {[
          { label: 'Total', value: total, bg: '#f8fafc', color: 'var(--text-main)' },
          { label: 'Not Called', value: notCalled, bg: '#fef2f2', color: '#ef4444' },
          { label: 'Called', value: called, bg: '#f0fdf4', color: '#22c55e' },
          { label: 'CNR / CNC', value: cnr, bg: '#fff7ed', color: '#f97316' },
          { label: 'Reschedule', value: reschedule, bg: '#fefce8', color: '#eab308' },
          { label: 'Interested', value: interested, bg: '#eff6ff', color: '#3b82f6' }
        ].map(kpi => (
          <div key={kpi.label} className="kpi-card" style={{ background: kpi.bg }}>
             <div className="kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
             <div className="kpi-label">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Row 1 (Pills) */}
      <div className="filter-grid">
        {filters.map(f => (
          <button 
            key={f} 
            className="filter-pill"
            onClick={() => setActiveFilter(f)}
            style={{ 
              background: activeFilter === f ? 'var(--text-emerald)' : 'white', 
              color: activeFilter === f ? 'white' : 'var(--text-main)', 
              borderColor: activeFilter === f ? 'var(--text-emerald)' : 'var(--border-light)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Filter Row 2 (Controls) */}
      <div className="controls-container">
        
        <div className="search-bar">
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem', flexShrink: 0 }} />
          <input 
            placeholder="Search company, client, note..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
          />
        </div>

        <div className="select-group">
          <select>
            <option>All Types</option>
            {dynamicTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          
          <select>
            <option>All Roles</option>
            {dynamicRoles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        <div className="action-buttons">
          <button onClick={() => setIsAddClientOpen(true)} style={{ background: 'var(--text-emerald)', color: 'white', border: 'none' }}>
             <Plus size={16} /> Add Client
          </button>
          <button style={{ background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-light)' }}>
             <Upload size={16} /> Upload CSV
          </button>
        </div>
      </div>

      {/* Table */}
      <div style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-light)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Date</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Company Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Type</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Seller/Buyer</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Address</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>City/State</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Client Name</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Contact Number</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem', borderRight: '1px solid var(--border-light)' }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredCalls.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No calls found.</td>
              </tr>
            ) : (
              filteredCalls.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>
                    {new Date(c.created_at || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-emerald)', fontWeight: '500', borderRight: '1px solid var(--border-light)' }}>{c.company_name}</td>
                  <td style={{ padding: '1rem', borderRight: '1px solid var(--border-light)' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', background: '#eff6ff', color: '#3b82f6', fontWeight: '500' }}>{c.client_type}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.business_role}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.address}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.city_state}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.client_name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.contact_number}</td>
                  <td style={{ padding: '1rem', borderRight: '1px solid var(--border-light)' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'center' }}>
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', background: '#eff6ff', color: '#3b82f6', fontWeight: '600' }}>{c.status}</span>
                      {c.status === 'Interested' && <span style={{ fontSize: '0.7rem', color: '#8b5cf6' }}>→ Moved to Pipeline</span>}
                    </div>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                      <button onClick={() => handleEditClick(c)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }} title="Edit Client">
                        <Pencil size={16} />
                      </button>
                      <button onClick={() => setClientToDelete(c.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#ef4444', display: 'flex', alignItems: 'center' }} title="Delete Client">
                        <Trash2 size={16} />
                      </button>
                      {['Interested', 'Future Potential', 'Onboarding', 'Active Client'].includes(c.status) ? (
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Locked</span>
                      ) : (
                        <button onClick={() => setSelectedCallId(c.id)} style={{ background: 'white', border: '1px solid var(--border-light)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '500', cursor: 'pointer', color: 'var(--text-main)', transition: 'all 0.2s ease' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--text-emerald)'} onMouseOut={e => e.currentTarget.style.borderColor = 'var(--border-light)'}>
                          Log Call
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Client Modal */}
      {isAddClientOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', maxWidth: '900px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 2rem 0', color: 'var(--text-heading)', fontSize: '1.4rem' }}>{editingCallId ? 'Edit Client' : 'Add New Client'}</h3>
            <form onSubmit={handleAddClient} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Company Name</label>
                  <input required value={formData.company_name} onChange={e => setFormData({...formData, company_name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Contact Person</label>
                  <input required value={formData.client_name} onChange={e => setFormData({...formData, client_name: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Phone</label>
                  <input required value={formData.contact_number} onChange={e => setFormData({...formData, contact_number: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Email</label>
                  <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Address</label>
                  <input value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>State</label>
                  <select required value={formData.city_state} onChange={e => setFormData({...formData, city_state: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none', background: 'white' }}>
                    <option value="" disabled>Select State</option>
                    {INDIAN_STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Type</label>
                  <select value={formData.client_type} onChange={e => setFormData({...formData, client_type: e.target.value})} style={{ padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)', outline: 'none', background: 'white' }}>
                    {dynamicTypes.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-main)' }}>Role</label>
                  <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '0.75rem 0', flexWrap: 'wrap' }}>
                    {dynamicRoles.map(r => (
                      <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.95rem' }}>
                        <input type="radio" name="role" value={r} checked={formData.business_role === r} onChange={e => setFormData({...formData, business_role: e.target.value})} style={{ width: '18px', height: '18px', accentColor: 'var(--text-emerald)' }} />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1rem', borderTop: '1px solid var(--border-light)' }}>
                <button type="button" onClick={() => { setIsAddClientOpen(false); setEditingCallId(null); resetForm(); }} style={{ background: 'var(--surface-bg)', color: 'var(--text-main)', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isSubmitting} style={{ background: 'var(--text-emerald)', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', opacity: isSubmitting ? 0.7 : 1 }}>{isSubmitting ? 'Saving...' : (editingCallId ? 'Save Changes' : 'Add Client')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Call Modal */}
      {selectedCallId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 1.5rem 0', color: 'var(--text-heading)', fontSize: '1.25rem' }}>
              {showReschedulePicker ? 'Select Reschedule Date' : 'Log Call Outcome'}
            </h3>
            
            {!showReschedulePicker ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <button onClick={() => handleLogCall('Interested')} style={{ background: 'var(--surface-bg)', color: 'var(--text-emerald)', border: '1px solid var(--text-emerald)', padding: '0.875rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s ease', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  Interested <span>→ Pipeline</span>
                </button>
                <button onClick={() => handleLogCall('Not Interested')} style={{ background: 'var(--surface-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '0.875rem', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>Not Interested</button>
                <button onClick={() => setShowReschedulePicker(true)} style={{ background: 'var(--surface-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '0.875rem', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>Reschedule</button>
                <button onClick={() => handleLogCall('CNR / CNC')} style={{ background: 'var(--surface-bg)', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '0.875rem', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>CNR / CNC</button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input 
                  type="datetime-local" 
                  value={rescheduleDate}
                  onChange={(e) => setRescheduleDate(e.target.value)}
                  style={{ padding: '0.875rem', borderRadius: '8px', border: '1px solid var(--border-light)', fontSize: '1rem', outline: 'none' }}
                />
                <button 
                  onClick={() => handleLogCall('Reschedule', rescheduleDate)} 
                  disabled={!rescheduleDate}
                  style={{ background: 'var(--text-emerald)', color: 'white', border: 'none', padding: '0.875rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', opacity: rescheduleDate ? 1 : 0.5 }}
                >
                  Apply
                </button>
              </div>
            )}

            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <button 
                onClick={() => {
                  if (showReschedulePicker) {
                    setShowReschedulePicker(false);
                    setRescheduleDate('');
                  } else {
                    setSelectedCallId(null);
                  }
                }} 
                style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', fontWeight: '500', cursor: 'pointer' }}
              >
                {showReschedulePicker ? 'Back' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {clientToDelete && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', textAlign: 'center' }}>
            <h3 style={{ margin: '0 0 1rem 0', color: 'var(--text-heading)', fontSize: '1.25rem' }}>Are you sure?</h3>
            <p style={{ margin: '0 0 2rem 0', color: 'var(--text-muted)', fontSize: '0.95rem' }}>Do you really want to delete this client? This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => handleTrashClient(clientToDelete)} style={{ background: '#ef4444', color: 'white', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', flex: 1 }}>Yes</button>
              <button onClick={() => setClientToDelete(null)} style={{ background: 'var(--surface-bg)', color: 'var(--text-main)', border: 'none', padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', flex: 1 }}>No</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
