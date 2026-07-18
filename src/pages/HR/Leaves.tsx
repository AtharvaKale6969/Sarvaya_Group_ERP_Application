import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { X, FileQuestion, Plus } from 'lucide-react';

export default function Leaves() {
  const { user } = useAuthStore();
  const [balances, setBalances] = useState({ casual_leave: 12, sick_leave: 7, privilege_leave: 15 });
  const [requests, setRequests] = useState<any[]>([]);
  const [historyTab, setHistoryTab] = useState<'Pending' | 'History'>('Pending');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLeaveType, setSelectedLeaveType] = useState('Casual');
  const [formData, setFormData] = useState({ start_date: '', end_date: '' });

  useEffect(() => {
    if (user) {
      fetchBalances();
      fetchRequests();
    }
  }, [user]);

  const fetchBalances = async () => {
    const { data } = await supabase.from('leave_balances').select('*').eq('user_id', user?.id).single();
    if (data) setBalances(data);
  };

  const fetchRequests = async () => {
    const { data } = await supabase.from('leave_requests').select('*').eq('user_id', user?.id).order('created_at', { ascending: false });
    if (data) setRequests(data);
  };

  const openForm = (type: string) => {
    setSelectedLeaveType(type);
    setIsModalOpen(true);
  };

  const submitLeave = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('leave_requests').insert({
      user_id: user?.id,
      leave_type: selectedLeaveType,
      start_date: formData.start_date,
      end_date: formData.end_date,
      status: 'Pending'
    });
    setIsModalOpen(false);
    setFormData({ start_date: '', end_date: '' });
    fetchRequests();
  };

  const solidCardStyle = (bgColor: string, borderColor: string) => ({
    background: bgColor,
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    borderRadius: 'clamp(12px, 3vw, 24px)',
    border: `1px solid ${borderColor}`,
    padding: 'clamp(1rem, 4vw, 2.5rem) clamp(0.5rem, 2vw, 1.5rem)',
    cursor: 'pointer',
    transition: 'all 0.2s ease-in-out',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.02)',
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative' as const,
    gap: '1rem'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
      
      {/* Balances Row */}
      <div style={{ width: '100%', paddingBottom: '0.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 'clamp(0.5rem, 2vw, 1.5rem)' }}>
        
        <div style={solidCardStyle('#ECFDF5', '#A7F3D0')} onClick={() => openForm('Casual')}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div className="desktop-only" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#059669', opacity: 0.8 }}><Plus size={20} /></div>
          <h3 style={{ margin: 0, color: '#065F46', fontSize: 'clamp(0.6rem, 1.5vw, 1.05rem)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Casual Leave</h3>
          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: '800', color: '#064E3B', letterSpacing: '-1px', lineHeight: '1.1' }}>
            {balances.casual_leave.toFixed(1)}
          </div>
        </div>

        <div style={solidCardStyle('#FFF7ED', '#FED7AA')} onClick={() => openForm('Sick')}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div className="desktop-only" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#D97706', opacity: 0.8 }}><Plus size={20} /></div>
          <h3 style={{ margin: 0, color: '#9A3412', fontSize: 'clamp(0.6rem, 1.5vw, 1.05rem)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Sick Leave</h3>
          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: '800', color: '#78350F', letterSpacing: '-1px', lineHeight: '1.1' }}>
            {balances.sick_leave.toFixed(1)}
          </div>
        </div>

        <div style={solidCardStyle('#F5F3FF', '#DDD6FE')} onClick={() => openForm('Privilege')}
          onMouseOver={e => e.currentTarget.style.transform = 'translateY(-6px)'}
          onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
          <div className="desktop-only" style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', color: '#7C3AED', opacity: 0.8 }}><Plus size={20} /></div>
          <h3 style={{ margin: 0, color: '#5B21B6', fontSize: 'clamp(0.6rem, 1.5vw, 1.05rem)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'center' }}>Privilege Leave</h3>
          <div style={{ fontSize: 'clamp(1.5rem, 5vw, 3.5rem)', fontWeight: '800', color: '#4C1D95', letterSpacing: '-1px', lineHeight: '1.1' }}>
            {balances.privilege_leave.toFixed(1)}
          </div>
        </div>

      </div>
      </div>



      {/* Pending / History Section */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ display: 'inline-flex', background: 'var(--surface-bg)', padding: '0.35rem', borderRadius: '999px', border: '1px solid var(--border-light)' }}>
            <button 
              onClick={() => setHistoryTab('Pending')}
              style={{ padding: '0.65rem 1.5rem', borderRadius: '999px', background: historyTab === 'Pending' ? 'white' : 'transparent', border: 'none', fontWeight: '600', cursor: 'pointer', color: historyTab === 'Pending' ? 'var(--text-heading)' : 'var(--text-muted)', boxShadow: historyTab === 'Pending' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s', fontSize: '0.95rem' }}
            >Pending Approvals</button>
            <button 
              onClick={() => setHistoryTab('History')}
              style={{ padding: '0.65rem 1.5rem', borderRadius: '999px', background: historyTab === 'History' ? 'white' : 'transparent', border: 'none', fontWeight: '600', cursor: 'pointer', color: historyTab === 'History' ? 'var(--text-heading)' : 'var(--text-muted)', boxShadow: historyTab === 'History' ? '0 2px 8px rgba(0,0,0,0.05)' : 'none', transition: 'all 0.2s', fontSize: '0.95rem' }}
            >Leave History</button>
          </div>
        </div>
        
        <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>

        <div style={{ padding: '1.5rem' }}>
          {requests
            .filter(r => historyTab === 'Pending' ? r.status === 'Pending' : r.status !== 'Pending')
            .map(req => (
              <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0' }}>{req.leave_type} Leave</h4>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{req.start_date} to {req.end_date}</div>
                </div>
                <div style={{ fontWeight: '600', color: req.status === 'Pending' ? '#eab308' : (req.status === 'Approved' ? 'var(--text-emerald)' : '#ef4444') }}>
                  {req.status}
                </div>
              </div>
          ))}
          {requests.filter(r => historyTab === 'Pending' ? r.status === 'Pending' : r.status !== 'Pending').length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '3rem 1rem', color: 'var(--text-muted)' }}>
              <FileQuestion size={48} color="#cbd5e1" style={{ marginBottom: '1rem' }} />
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-heading)', fontSize: '1.1rem' }}>Oops! We couldn't find anything to show</h4>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>You don't have any {historyTab.toLowerCase()} leave requests right now.</p>
            </div>
          )}
        </div>
        </div>
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Apply for Leave</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>
            <form onSubmit={submitLeave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Leave Type</label>
                <select 
                  value={selectedLeaveType} 
                  onChange={e => setSelectedLeaveType(e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}
                >
                  <option value="Casual">Casual Leave</option>
                  <option value="Sick">Sick Leave</option>
                  <option value="Privilege">Privilege Leave</option>
                  <option value="LWP">Leave Without Pay (LWP)</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Start Date</label>
                  <input type="date" required value={formData.start_date} onChange={e => setFormData({...formData, start_date: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>End Date</label>
                  <input type="date" required value={formData.end_date} onChange={e => setFormData({...formData, end_date: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                </div>
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
