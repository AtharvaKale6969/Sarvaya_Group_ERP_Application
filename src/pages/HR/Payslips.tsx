import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { FileText, Download } from 'lucide-react';

export default function Payslips() {
  const { user } = useAuthStore();
  const [payslips, setPayslips] = useState<any[]>([]);

  useEffect(() => {
    if (user) fetchPayslips();
  }, [user]);

  const fetchPayslips = async () => {
    const { data } = await supabase.from('payslips').select('*').eq('user_id', user?.id).order('created_at', { ascending: false });
    if (data) setPayslips(data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>Payslips</h2>
      </div>

      <div style={{ background: 'white', borderRadius: '16px', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
        <h3 style={{ padding: '1.5rem', margin: 0, borderBottom: '1px solid var(--border-light)' }}>Previous Months</h3>
        <div style={{ padding: '1.5rem' }}>
          {payslips.map(slip => (
            <div key={slip.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem', borderBottom: '1px solid var(--border-light)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ background: 'var(--surface-bg)', padding: '0.75rem', borderRadius: '12px' }}>
                  <FileText size={24} color="var(--text-emerald)" />
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>Payslip - {slip.month_year}</h4>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-emerald)', fontWeight: '600' }}>Amount: ${slip.amount}</div>
                </div>
              </div>
              <button 
                onClick={() => alert('Downloading: ' + slip.file_url)}
                style={{ padding: '0.75rem 1.5rem', background: 'transparent', color: 'var(--text-emerald)', border: '1px solid var(--text-emerald)', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', display: 'flex', gap: '0.5rem', alignItems: 'center' }}
              >
                <Download size={16} /> Download PDF
              </button>
            </div>
          ))}
          {payslips.length === 0 && <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No payslips available yet.</p>}
        </div>
      </div>

    </div>
  );
}
