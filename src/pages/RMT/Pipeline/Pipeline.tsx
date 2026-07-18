import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/useAuthStore';
import { useContextStore } from '../../../store/useContextStore';
import { Search } from 'lucide-react';
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
  created_at: string;
}

export default function Pipeline() {
  const { user } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept } = useContextStore();
  const navigate = useNavigate();
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [counts, setCounts] = useState({ interested: 0, future: 0, onboarding: 0, active: 0, all: 0 });
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Interested');
  const [activeType, setActiveType] = useState('All Types');
  const [activeRole, setActiveRole] = useState('All Roles');
  const [isProcessing, setIsProcessing] = useState<string | null>(null);
  
  const { types: dynamicTypes, roles: dynamicRoles } = getClientOptions(activeOrg, activeDept, activeSubDept);

  useEffect(() => {
    if (user) {
      fetchCalls();
      fetchCounts();
    }
  }, [user, activeOrg, activeDept, activeSubDept]);

  const fetchCalls = async () => {
    let query = supabase
      .from('rmt_bde_calls')
      .select('*')
      .eq('user_id', user?.id)
      .eq('is_trashed', false)
      .eq('organization', activeOrg)
      .eq('department', activeDept)
      .in('status', ['Interested', 'Future Potential']);
      
    if (activeSubDept) {
      query = query.eq('sub_department', activeSubDept);
    }

    const { data } = await query.order('created_at', { ascending: false });
    if (data) setCalls(data);
  };

  const fetchCounts = async () => {
    let bdeQuery = supabase.from('rmt_bde_calls').select('status').eq('user_id', user?.id).eq('is_trashed', false).eq('organization', activeOrg).eq('department', activeDept).in('status', ['Interested', 'Future Potential']);
    let clientsQuery = supabase.from('rmt_clients').select('status').eq('user_id', user?.id).eq('organization', activeOrg).eq('department', activeDept);
    
    if (activeSubDept) {
      bdeQuery = bdeQuery.eq('sub_department', activeSubDept);
      clientsQuery = clientsQuery.eq('sub_department', activeSubDept);
    }
    
    const { data: bdeData } = await bdeQuery;
    const { data: clientsData } = await clientsQuery;
    
    const interested = bdeData?.filter(c => c.status === 'Interested').length || 0;
    const future = bdeData?.filter(c => c.status === 'Future Potential').length || 0;
    const onboarding = clientsData?.filter(c => c.status === 'Onboarding').length || 0;
    const active = clientsData?.filter(c => c.status === 'Active Client').length || 0;
    
    setCounts({
      interested, future, onboarding, active, all: interested + future + onboarding + active
    });
  };

  const handleAction = async (call: CallRecord, action: 'Onboarding' | 'Future Potential' | 'Interested') => {
    setIsProcessing(call.id);
    
    const { error } = await supabase
      .from('rmt_bde_calls')
      .update({ status: action, updated_at: new Date().toISOString() })
      .eq('id', call.id);
      
    if (!error) {
      if (action === 'Onboarding') {
        if (user) {
          // Copy to rmt_clients
          await supabase.from('rmt_clients').insert([{
            original_lead_id: call.id,
            user_id: user.id,
            organization: activeOrg,
            department: activeDept,
            sub_department: activeSubDept,
            company_name: call.company_name,
            client_name: call.client_name,
            contact_number: call.contact_number,
            email: call.email,
            address: call.address,
            city_state: call.city_state,
            client_type: call.client_type,
            business_role: call.business_role,
            status: 'Onboarding'
          }]);
        }
        setCalls(calls.filter(c => c.id !== call.id));
      } else {
        // For Future Potential, just update the status so it moves to that tab
        setCalls(calls.map(c => c.id === call.id ? { ...c, status: action } : c));
      }
      fetchCounts(); // refresh counts
    } else {
      console.error(error);
      alert('Failed to process action.');
    }
    setIsProcessing(null);
  };

  const filteredCalls = calls.filter(c => {
    if (activeFilter !== 'All' && c.status !== activeFilter) return false;
    if (search && !c.company_name.toLowerCase().includes(search.toLowerCase()) && !c.client_name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeType !== 'All Types' && c.client_type !== activeType) return false;
    if (activeRole !== 'All Roles' && c.business_role !== activeRole) return false;
    return true;
  });

  const handleTabClick = (tab: string) => {
    if (tab === 'Onboarding' || tab === 'Active Clients') {
      navigate('/pipeline/onboarded');
    } else {
      setActiveFilter(tab);
    }
  };

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
            cursor: pointer;
            transition: transform 0.2s;
          }
          .kpi-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
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
          }
        `}
      </style>
      <div className="kpi-grid">
        {[
          { label: 'All', value: counts.all, bg: activeFilter === 'All' ? 'var(--text-emerald)' : '#f8fafc', color: activeFilter === 'All' ? 'white' : 'var(--text-main)', path: 'All' },
          { label: 'Interested', value: counts.interested, bg: activeFilter === 'Interested' ? 'var(--text-emerald)' : '#eff6ff', color: activeFilter === 'Interested' ? 'white' : '#3b82f6', path: 'Interested' },
          { label: 'Onboarding', value: counts.onboarding, bg: '#ecfeff', color: '#0891b2', path: 'Onboarding' },
          { label: 'Active Clients', value: counts.active, bg: '#dcfce7', color: '#16a34a', path: 'Active Clients' },
          { label: 'Future Potential', value: counts.future, bg: activeFilter === 'Future Potential' ? 'var(--text-emerald)' : '#fefce8', color: activeFilter === 'Future Potential' ? 'white' : '#eab308', path: 'Future Potential' }
        ].map(kpi => (
          <div key={kpi.label} className="kpi-card" onClick={() => handleTabClick(kpi.path)} style={{ background: kpi.bg, borderColor: activeFilter === kpi.path ? 'var(--text-emerald)' : 'var(--border-light)' }}>
             <div className="kpi-value" style={{ color: kpi.color }}>{kpi.value}</div>
             <div className="kpi-label" style={{ color: activeFilter === kpi.path ? 'rgba(255,255,255,0.9)' : 'var(--text-muted)' }}>{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {['All', 'Interested', 'Future Potential'].map(f => (
          <button 
            key={f} 
            onClick={() => setActiveFilter(f)}
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '20px', 
              fontSize: '0.9rem', 
              cursor: 'pointer', 
              transition: 'all 0.2s', 
              border: '1px solid',
              whiteSpace: 'nowrap',
              background: activeFilter === f ? 'var(--text-emerald)' : 'white', 
              color: activeFilter === f ? 'white' : 'var(--text-main)', 
              borderColor: activeFilter === f ? 'var(--text-emerald)' : 'var(--border-light)'
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '250px', background: 'var(--surface-bg)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
          <input 
            placeholder="Search active pipeline..." 
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '250px' }}>
          <select value={activeType} onChange={e => setActiveType(e.target.value)} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--surface-bg)', outline: 'none' }}>
            <option>All Types</option>
            {dynamicTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          
          <select value={activeRole} onChange={e => setActiveRole(e.target.value)} style={{ flex: 1, padding: '0.6rem', borderRadius: '8px', border: '1px solid var(--border-light)', background: 'var(--surface-bg)', outline: 'none' }}>
            <option>All Roles</option>
            {dynamicRoles.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
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
              <th style={{ padding: '1rem', color: 'var(--text-muted)', fontWeight: '600', fontSize: '0.85rem' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCalls.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No clients currently in pipeline.</td>
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
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', background: '#eff6ff', color: '#3b82f6', fontWeight: '600' }}>{c.status}</span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      {activeFilter === 'Future Potential' ? (
                        <button 
                          disabled={isProcessing === c.id}
                          onClick={() => handleAction(c, 'Interested')} 
                          style={{ background: 'white', border: '1px solid var(--text-emerald)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', color: 'var(--text-emerald)', opacity: isProcessing === c.id ? 0.5 : 1 }}
                        >
                          Re-engage
                        </button>
                      ) : (
                        <>
                          <button 
                            disabled={isProcessing === c.id}
                            onClick={() => handleAction(c, 'Future Potential')} 
                            style={{ background: 'white', border: '1px solid var(--border-light)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer', color: 'var(--text-main)', opacity: isProcessing === c.id ? 0.5 : 1 }}
                          >
                            Future Potential
                          </button>
                          <button 
                            disabled={isProcessing === c.id}
                            onClick={() => handleAction(c, 'Onboarding')} 
                            style={{ background: 'var(--text-emerald)', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '500', cursor: 'pointer', color: 'white', opacity: isProcessing === c.id ? 0.5 : 1 }}
                          >
                            Onboard Client
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
