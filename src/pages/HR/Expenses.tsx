import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { Receipt, X } from 'lucide-react';

export default function Expenses() {
  const { user } = useAuthStore();
  const [claims, setClaims] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ category: 'Travel', amount: '', expense_date: '', description: '', receipt_url: '' });

  const categories = ['Travel', 'Meals', 'Office Supplies', 'Client Entertainment', 'Other'];

  useEffect(() => {
    if (user) fetchClaims();
  }, [user]);

  const fetchClaims = async () => {
    const { data } = await supabase.from('expense_claims').select('*').eq('user_id', user?.id).order('created_at', { ascending: false });
    if (data) setClaims(data);
  };

  const submitClaim = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('expense_claims').insert({
      user_id: user?.id,
      ...formData,
      status: 'Pending'
    });
    setIsModalOpen(false);
    setFormData({ category: 'Travel', amount: '', expense_date: '', description: '', receipt_url: '' });
    fetchClaims();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>Expense Claims</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{ padding: '0.75rem 1.5rem', background: 'var(--text-emerald)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
        >
          <Receipt size={18} /> File Expense
        </button>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
        <h3 style={{ padding: '1.5rem', margin: 0, borderBottom: '1px solid var(--border-light)' }}>Claim History</h3>
        <div style={{ padding: '1.5rem' }}>
          {claims.map(claim => (
            <div key={claim.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', borderBottom: '1px solid var(--border-light)' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0' }}>{claim.category} - ${claim.amount}</h4>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Date: {claim.expense_date} | {claim.description}</div>
              </div>
              <div style={{ fontWeight: '600', color: claim.status === 'Pending' ? '#eab308' : (claim.status === 'Approved' || claim.status === 'Paid' ? 'var(--text-emerald)' : '#ef4444') }}>
                {claim.status}
              </div>
            </div>
          ))}
          {claims.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)' }}>No expense claims found.</p>}
        </div>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: 'white', padding: '2rem', borderRadius: '16px', width: '450px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>File New Expense</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X /></button>
            </div>
            <form onSubmit={submitClaim} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Category</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }}>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Amount</label>
                  <input type="number" required step="0.01" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Date</label>
                  <input type="date" required value={formData.expense_date} onChange={e => setFormData({...formData, expense_date: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Description</label>
                <input type="text" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Receipt URL (Optional)</label>
                <input type="text" value={formData.receipt_url} onChange={e => setFormData({...formData, receipt_url: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid var(--border-light)' }} placeholder="https://..." />
              </div>
              
              <button type="submit" style={{ marginTop: '1rem', padding: '1rem', background: 'var(--text-emerald)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>
                Submit Claim
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
