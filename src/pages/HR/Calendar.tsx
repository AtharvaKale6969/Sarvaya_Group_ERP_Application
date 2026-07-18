import { useState, useEffect } from 'react';
import MiniCalendar from '../../components/MiniCalendar';
import { supabase } from '../../lib/supabase';
import { useAuthStore } from '../../store/useAuthStore';
import { startOfMonth, endOfMonth } from 'date-fns';
import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';

export default function CalendarView() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({ present: 0, incomplete: 0, leaves: 0 });

  useEffect(() => {
    if (user) fetchStats();
  }, [user]);

  const fetchStats = async () => {
    const start = startOfMonth(new Date()).toISOString();
    const end = endOfMonth(new Date()).toISOString();

    // Fetch Attendance for current month
    const { data: logs } = await supabase
      .from('attendance_logs')
      .select('punch_out_time')
      .eq('user_id', user?.id)
      .gte('date', start)
      .lte('date', end);

    let present = 0;
    let incomplete = 0;
    if (logs) {
      logs.forEach(log => {
        if (log.punch_out_time) present++;
        else incomplete++;
      });
    }

    // Fetch Approved Leaves for current month
    const { data: leaves } = await supabase
      .from('leave_requests')
      .select('*')
      .eq('user_id', user?.id)
      .eq('status', 'Approved')
      .gte('start_date', start)
      .lte('start_date', end);

    let leaveDays = 0;
    if (leaves) {
      leaveDays = leaves.length; // Simplified: 1 request = 1 day for this summary, can be expanded to date diff later
    }

    setStats({ present, incomplete, leaves: leaveDays });
  };

  const statCardStyle = {
    background: 'white',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    padding: '1rem 1.25rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
    transition: 'transform 0.2s',
    cursor: 'default'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', minHeight: 'calc(100vh - 260px)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-heading)', margin: 0 }}>Attendance & Leave Calendar</h2>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'start', flex: 1 }}>
        
        {/* Left Side: Calendar */}
        <div style={{ width: '100%', maxWidth: '500px', height: '600px' }}>
          <MiniCalendar isInteractive={true} />
        </div>

        {/* Right Side: Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-heading)' }}>Current Month Summary</h3>
          
          <div style={statCardStyle} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '0.8rem', borderRadius: '12px', color: 'var(--text-emerald)' }}>
              <CheckCircle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Days Present</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-heading)', lineHeight: '1' }}>{stats.present}</div>
            </div>
          </div>

          <div style={statCardStyle} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '0.8rem', borderRadius: '12px', color: '#3b82f6' }}>
              <Clock size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Approved Leaves</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-heading)', lineHeight: '1' }}>{stats.leaves}</div>
            </div>
          </div>

          <div style={statCardStyle} onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
            <div style={{ background: 'rgba(245, 158, 11, 0.1)', padding: '0.8rem', borderRadius: '12px', color: '#f59e0b' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>Incomplete Shifts</div>
              <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-heading)', lineHeight: '1' }}>{stats.incomplete}</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
