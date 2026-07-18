import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { useContextStore } from '../store/useContextStore';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday, isBefore, isWeekend, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function MiniCalendar({ isInteractive = false }: { isInteractive?: boolean }) {
  const { user } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept, activeRole } = useContextStore();
  const [logs, setLogs] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Month Picker State
  const [isMonthPickerOpen, setIsMonthPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    if (user) {
      fetchMonthLogs();
    }
  }, [user, currentDate, activeOrg, activeDept, activeSubDept, activeRole]);

  const fetchMonthLogs = async () => {
    const start = startOfMonth(currentDate).toISOString();
    const end = endOfMonth(currentDate).toISOString();

    let query = supabase
      .from('attendance_logs')
      .select('date, punch_in_time, punch_out_time')
      .eq('user_id', user?.id)
      .eq('organization', activeOrg)
      .eq('department', activeDept)
      .eq('role', activeRole)
      .gte('date', start)
      .lte('date', end);
      
    if (activeSubDept) {
      query = query.eq('sub_department', activeSubDept);
    }

    const { data } = await query;
    if (data) setLogs(data);
  };

  const days = eachDayOfInterval({ start: startOfMonth(currentDate), end: endOfMonth(currentDate) });
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const selectMonth = (index: number) => {
    setCurrentDate(new Date(pickerYear, index, 1));
    setIsMonthPickerOpen(false);
  };

  return (
    <div style={{
      background: 'var(--surface-bg)',
      border: '1px solid var(--border-light)',
      borderRadius: '20px',
      padding: '1.5rem',
      boxShadow: 'var(--glass-shadow)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      height: '100%'
    }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        {isInteractive ? (
          <button onClick={() => setCurrentDate(subMonths(currentDate, 1))} style={{ background: 'var(--surface-bg)', border: '1px solid var(--border-light)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronLeft size={18} color="var(--text-heading)" />
          </button>
        ) : <div style={{ width: '36px' }} />}
        
        {isInteractive ? (
          <h3 
            onClick={() => { setIsMonthPickerOpen(true); setPickerYear(currentDate.getFullYear()); }}
            style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-emerald)', margin: 0, cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'background 0.2s' }}
            onMouseOver={e => e.currentTarget.style.backgroundColor = 'rgba(35, 127, 112, 0.05)'}
            onMouseOut={e => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            {format(currentDate, 'MMMM yyyy')}
          </h3>
        ) : (
          <h3 style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-emerald)', margin: 0 }}>
            {format(currentDate, 'MMMM yyyy')}
          </h3>
        )}
        
        {isInteractive ? (
          <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} style={{ background: 'var(--surface-bg)', border: '1px solid var(--border-light)', cursor: 'pointer', padding: '0.5rem', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ChevronRight size={18} color="var(--text-heading)" />
          </button>
        ) : <div style={{ width: '36px' }} />}
      </div>

      {isMonthPickerOpen ? (
        // Month Picker Overlay
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <button onClick={() => setPickerYear(y => y - 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><ChevronLeft size={20} /></button>
            <h4 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-heading)' }}>{pickerYear}</h4>
            <button onClick={() => setPickerYear(y => y + 1)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><ChevronRight size={20} /></button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', flex: 1 }}>
            {months.map((m, i) => (
              <button 
                key={m} 
                onClick={() => selectMonth(i)}
                style={{
                  padding: '1rem',
                  border: '1px solid var(--border-light)',
                  borderRadius: '8px',
                  background: currentDate.getMonth() === i && currentDate.getFullYear() === pickerYear ? 'var(--text-emerald)' : 'white',
                  color: currentDate.getMonth() === i && currentDate.getFullYear() === pickerYear ? 'white' : 'var(--text-heading)',
                  cursor: 'pointer',
                  fontWeight: '600',
                  transition: 'all 0.2s ease'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>
      ) : (
        // Calendar Grid
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.25rem', textAlign: 'center' }}>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} style={{ fontSize: '0.75rem', color: 'var(--text-emerald)', fontWeight: '600', marginBottom: '0.5rem' }}>{d}</div>
            ))}
            
            {/* Empty slots for start of month alignment */}
            {Array.from({ length: days[0].getDay() }).map((_, i) => <div key={`empty-${i}`} />)}

            {days.map(day => {
              const log = logs.find(l => isSameDay(new Date(l.date), day));
              const past = isBefore(day, new Date()) && !isToday(day);
              const weekend = isWeekend(day);
              
              let statusColor = 'transparent';
              if (log) {
                statusColor = log.punch_out_time ? 'var(--text-emerald)' : '#eab308';
              } else if (past && !weekend) {
                statusColor = '#ef4444';
              }

              return (
                <div key={day.toISOString()} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  aspectRatio: '1',
                  borderRadius: '6px',
                  backgroundColor: isToday(day) ? 'rgba(35, 127, 112, 0.05)' : 'transparent',
                  border: isToday(day) ? '1px solid var(--accent-sage)' : '1px solid transparent',
                  cursor: 'default'
                }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: isToday(day) ? '600' : '400' }}>
                    {format(day, 'd')}
                  </span>
                  <div style={{
                    width: '4px', height: '4px', borderRadius: '50%',
                    backgroundColor: statusColor, marginTop: '2px'
                  }} />
                </div>
              )
            })}
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-light)', fontSize: '0.75rem', color: 'var(--text-muted)', justifyContent: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: 'var(--text-emerald)'}}/> Present</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#ef4444'}}/> Absent</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#eab308'}}/> Incomplete</div>
          </div>
        </>
      )}
    </div>
  );
}
