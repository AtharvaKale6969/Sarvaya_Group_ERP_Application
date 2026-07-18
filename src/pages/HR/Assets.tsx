import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { Monitor, X } from 'lucide-react';

export default function Assets() {
  const { user } = useAuthStore();
  const [requests, setRequests] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ asset_name: '', justification: '', required_till_date: '' });

  useEffect(() => {
    if (user) fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    const { data } = await supabase.from('asset_requests').select('*').eq('user_id', user?.id).order('created_at', { ascending: false });
    if (data) setRequests(data);
  };

  const submitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('asset_requests').insert({
      user_id: user?.id,
      ...formData,
      status: 'Pending'
    });
    setIsModalOpen(false);
    setFormData({ asset_name: '', justification: '', required_till_date: '' });
    fetchRequests();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>Asset Requests</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '0.75rem 1.5rem', background: 'var(--text-emerald)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <Monitor size={18} /> Apply for Asset
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
        <h3 style={{ padding: '1.5rem', margin: 0, borderBottom: '1px solid var(--border-light)' }}>Request History</h3>
        <div style={{ padding: '1.5rem' }}>
          {requests.map(req => (
            <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{req.asset_name}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Required Till: {req.required_till_date || 'N/A'}</div>
              </div>
              <div style={{ fontWeight: '600', color: req.status === 'Pending' ? '#eab308' : (req.status === 'Approved' ? 'var(--text-emerald)' : '#ef4444') }}>
                {req.status}
              </div>
            </div>
          ))}
          {requests.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No asset requests found.</p>}
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Asset Request</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>
            <form onSubmit={submitRequest} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Asset Requested (e.g., Work Laptop, Monitor)</label>
                <input type="text" required value={formData.asset_name} onChange={e => setFormData({...formData, asset_name: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Justification</label>
                <textarea required rows={3} value={formData.justification} onChange={e => setFormData({...formData, justification: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Required Till Date (Optional)</label>
                <input type="date" value={formData.required_till_date} onChange={e => setFormData({...formData, required_till_date: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              </div>
              
              <button type="submit" style={{ marginTop: '1rem', padding: '1rem', background: 'var(--text-emerald)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                Submit Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
