import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/useAuthStore';
import { useContextStore } from '../../../store/useContextStore';
import { Search, UploadCloud, FileText, Phone, Briefcase, Calendar, CheckCircle2, TrendingUp, X } from 'lucide-react';
import { getClientOptions } from '../../../lib/constants';

interface OfficialClient {
  id: string;
  company_name: string;
  client_type: string;
  business_role: string;
  address: string;
  city_state: string;
  client_name: string;
  contact_number: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export default function Onboarded() {
  const { user } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept } = useContextStore();
  const [clients, setClients] = useState<OfficialClient[]>([]);
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All Types');
  const [activeRole, setActiveRole] = useState('All Roles');
  
  const { types: dynamicTypes, roles: dynamicRoles } = getClientOptions(activeOrg, activeDept, activeSubDept);
  
  // Upload Modal State
  const [uploadClientId, setUploadClientId] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadLater, setUploadLater] = useState(false);
  const [viewClient, setViewClient] = useState<OfficialClient | null>(null);

  useEffect(() => {
    if (user) fetchClients();
  }, [user, activeOrg, activeDept, activeSubDept]);

  const fetchClients = async () => {
    let query = supabase
      .from('rmt_clients')
      .select('*')
      .eq('user_id', user?.id)
      .eq('organization', activeOrg)
      .eq('department', activeDept);
      
    if (activeSubDept) {
      query = query.eq('sub_department', activeSubDept);
    }
    
    const { data } = await query.order('updated_at', { ascending: false });
    if (data) setClients(data);
  };

  const simulateUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadClientId) return;
    setIsUploading(true);
    
    // Simulate real file upload process
    await new Promise(r => setTimeout(r, 1500));
    
    const docStatus = uploadLater ? 'pending' : 'fake_url';
    
    const { error } = await supabase
      .from('rmt_clients')
      .update({ 
        status: 'Active Client', 
        doc_gst_certificate: docStatus,
        doc_cancelled_cheque: docStatus,
        doc_gst_6_months: docStatus,
        doc_other: docStatus,
        updated_at: new Date().toISOString()
      })
      .eq('id', uploadClientId);
      
    if (!error) {
      setClients(clients.map(c => c.id === uploadClientId ? { ...c, status: 'Active Client', updated_at: new Date().toISOString() } : c));
      setUploadClientId(null);
      setUploadLater(false);
    } else {
      alert('Error updating client status.');
    }
    setIsUploading(false);
  };

  const filtered = clients.filter(c => {
    if (search && !c.company_name.toLowerCase().includes(search.toLowerCase()) && !c.client_name.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeType !== 'All Types' && c.client_type !== activeType) return false;
    if (activeRole !== 'All Roles' && c.business_role !== activeRole) return false;
    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Controls Row */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', background: 'white', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-light)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: '250px', background: 'var(--surface-bg)', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
          <Search size={18} color="var(--text-muted)" style={{ marginRight: '0.5rem' }} />
          <input 
            placeholder="Search clients..." 
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

      {/* Table matches screenshot */}
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
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={10} style={{ padding: '3rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>No clients found in this section.</td>
              </tr>
            ) : (
              filtered.map(c => (
                <tr key={c.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>
                    {new Date(c.created_at || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-emerald)', fontWeight: '500', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.company_name}</td>
                  <td style={{ padding: '1rem', borderRight: '1px solid var(--border-light)' }}>
                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', background: '#eff6ff', color: '#3b82f6', fontWeight: '500' }}>{c.client_type}</span>
                  </td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.business_role}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.address}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.city_state}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.client_name}</td>
                  <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderRight: '1px solid var(--border-light)' }}>{c.contact_number}</td>
                  <td style={{ padding: '1rem', borderRight: '1px solid var(--border-light)' }}>
                    {c.status === 'Onboarding' ? (
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', background: '#ecfeff', color: '#0891b2', fontWeight: '600' }}>Onboarding</span>
                    ) : (
                      <span style={{ padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.75rem', background: '#dcfce7', color: '#16a34a', fontWeight: '600' }}>Active Client</span>
                    )}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    {c.status === 'Onboarding' ? (
                      <button onClick={() => setUploadClientId(c.id)} style={{ background: 'var(--text-emerald)', color: 'white', border: 'none', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: '500', fontSize: '0.8rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                        <UploadCloud size={14} /> Upload Docs
                      </button>
                    ) : (
                      <button onClick={() => setViewClient(c)} style={{ background: 'white', color: 'var(--text-main)', border: '1px solid var(--border-light)', padding: '0.4rem 0.8rem', borderRadius: '6px', fontWeight: '500', fontSize: '0.8rem', cursor: 'pointer' }}>
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Upload Docs Modal */}
      {uploadClientId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', padding: '2.5rem', borderRadius: '16px', maxWidth: '600px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-heading)', fontSize: '1.4rem' }}>Upload Compliance Documents</h3>
            <p style={{ margin: '0 0 1rem 0', color: 'var(--text-muted)' }}>Provide the required documents to verify this client.</p>
            
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', cursor: 'pointer', background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
              <input type="checkbox" checked={uploadLater} onChange={e => setUploadLater(e.target.checked)} style={{ width: '18px', height: '18px', accentColor: 'var(--text-emerald)' }} />
              <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '600' }}>I don't have the documents right now, proceed to make deal.</span>
            </label>
            
            <form onSubmit={simulateUpload} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: uploadLater ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16}/> GST Certificate *</label>
                <input required={!uploadLater} disabled={uploadLater} type="file" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px dashed var(--border-light)', background: 'var(--surface-bg)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: uploadLater ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16}/> Cancelled Cheque *</label>
                <input required={!uploadLater} disabled={uploadLater} type="file" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px dashed var(--border-light)', background: 'var(--surface-bg)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: uploadLater ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16}/> GST 6 Months Filing *</label>
                <input required={!uploadLater} disabled={uploadLater} type="file" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px dashed var(--border-light)', background: 'var(--surface-bg)' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', opacity: uploadLater ? 0.5 : 1, transition: 'opacity 0.2s' }}>
                <label style={{ fontSize: '0.95rem', fontWeight: '600', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FileText size={16}/> Other Document</label>
                <input disabled={uploadLater} type="file" style={{ padding: '0.75rem', borderRadius: '8px', border: '1px dashed var(--border-light)', background: 'var(--surface-bg)' }} />
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-light)' }}>
                <button type="button" onClick={() => { setUploadClientId(null); setUploadLater(false); }} style={{ background: 'var(--surface-bg)', color: 'var(--text-main)', border: 'none', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button type="submit" disabled={isUploading} style={{ background: '#0d9488', color: 'white', border: 'none', padding: '0.875rem 2rem', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', opacity: isUploading ? 0.7 : 1 }}>{isUploading ? 'Processing...' : (uploadLater ? 'Proceed without Docs' : 'Upload & Verify')}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Details Modal */}
      {viewClient && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem', backdropFilter: 'blur(4px)' }}>
          <div style={{ background: 'white', borderRadius: '16px', maxWidth: '800px', width: '100%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Premium Header */}
            <div style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)', borderBottom: '1px solid var(--border-light)', position: 'relative' }}>
              <button onClick={() => setViewClient(null)} style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', border: '1px solid var(--border-light)', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', zIndex: 10 }}>
                <X size={20} color="var(--text-muted)" />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'clamp(1rem, 3vw, 1.5rem)', flexWrap: 'wrap' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '16px', background: 'white', border: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: '700', color: 'var(--text-emerald)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', flexShrink: 0 }}>
                  {viewClient.company_name.charAt(0).toUpperCase()}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', paddingRight: '2rem' }}>
                    <h2 style={{ margin: 0, color: 'var(--text-heading)', fontSize: 'clamp(1.5rem, 5vw, 2.2rem)', fontWeight: '800', letterSpacing: '-0.5px' }}>{viewClient.company_name}</h2>
                    <span style={{ padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.85rem', background: '#eff6ff', color: '#3b82f6', fontWeight: '600', border: '1px solid #bfdbfe', whiteSpace: 'nowrap' }}>{viewClient.client_type}</span>
                  </div>
                  
                  <div style={{ display: 'flex', gap: 'clamp(1rem, 3vw, 2rem)', flexWrap: 'wrap', marginTop: '0.25rem', padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>
                      <div style={{ background: '#ecfdf5', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}><Briefcase size={16} color="#059669" /></div>
                      <span style={{ color: 'var(--text-muted)' }}>Contact:</span>
                      <span style={{ fontWeight: '600', wordBreak: 'break-word' }}>{viewClient.client_name}</span> 
                    </div>
                    <div className="desktop-only" style={{ width: '1px', height: '24px', background: 'var(--border-light)' }}></div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-main)', fontSize: 'clamp(0.9rem, 3vw, 1rem)' }}>
                      <div style={{ background: '#ecfdf5', padding: '0.4rem', borderRadius: '8px', display: 'flex' }}><Phone size={16} color="#059669" /></div>
                      <span style={{ color: 'var(--text-muted)' }}>Phone:</span>
                      <span style={{ fontWeight: '600' }}>{viewClient.contact_number}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: 'clamp(1rem, 4vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#f8fafc' }}>
              
              {/* Information Cards Row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.5rem' }}>
                
                {/* Business Info */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)', fontSize: '1.1rem' }}>
                    <Briefcase size={18} color="var(--text-emerald)" /> Business Details
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Role</span>
                      <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '0.9rem' }}>{viewClient.business_role}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Address</span>
                      <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '0.9rem', textAlign: 'right', maxWidth: '60%' }}>{viewClient.address || 'N/A'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Location</span>
                      <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '0.9rem' }}>{viewClient.city_state}</span>
                    </div>
                  </div>
                </div>

                {/* Onboarding Info */}
                <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                  <h4 style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)', fontSize: '1.1rem' }}>
                    <Calendar size={18} color="var(--text-emerald)" /> Onboarding Journey
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Lead Created</span>
                      <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '0.9rem' }}>{new Date(viewClient.created_at || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Became Active Client</span>
                      <span style={{ fontWeight: '500', color: 'var(--text-main)', fontSize: '0.9rem' }}>{new Date(viewClient.updated_at || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-light)' }}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Status</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#16a34a', fontWeight: '600', fontSize: '0.85rem' }}>
                        <CheckCircle2 size={14} /> Active & Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Deals Section */}
              <div style={{ background: 'white', borderRadius: '12px', border: '1px solid var(--border-light)', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
                <div style={{ padding: 'clamp(1rem, 3vw, 1.5rem)', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                  <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-heading)', fontSize: '1.1rem' }}>
                    <TrendingUp size={18} color="#3b82f6" /> Deals Hub
                  </h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: '500' }}>Total Deals Done: <span style={{ color: 'var(--text-main)', fontWeight: '700' }}>0</span></span>
                  </div>
                </div>
                
                <div style={{ padding: 'clamp(2rem, 6vw, 4rem) 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', background: '#f8fafc' }}>
                  <div style={{ width: '48px', height: '48px', background: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-light)', marginBottom: '1rem', color: 'var(--text-muted)' }}>
                    <TrendingUp size={24} />
                  </div>
                  <h5 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-heading)', fontSize: '1.1rem' }}>No deals found yet</h5>
                  <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '300px' }}>When you successfully close a deal with this client, it will appear here.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
