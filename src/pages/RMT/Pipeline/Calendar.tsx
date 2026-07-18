import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useAuthStore } from '../../../store/useAuthStore';
import { Calendar as CalendarIcon, Clock, Building, User, Phone } from 'lucide-react';

interface CallRecord {
  id: string;
  company_name: string;
  client_name: string;
  contact_number: string;
  reschedule_date: string;
}

export default function PipelineCalendar() {
  const { user } = useAuthStore();
  const [scheduledCalls, setScheduledCalls] = useState<CallRecord[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    if (user) fetchScheduledCalls();
  }, [user]);

  const fetchScheduledCalls = async () => {
    const { data } = await supabase
      .from('rmt_bde_calls')
      .select('id, company_name, client_name, contact_number, reschedule_date')
      .eq('user_id', user?.id)
      .eq('status', 'Reschedule')
      .not('reschedule_date', 'is', null)
      .order('reschedule_date', { ascending: true });
      
    if (data) setScheduledCalls(data as CallRecord[]);
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    // Empty slots before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} style={{ padding: '1rem' }}></div>);
    }

    // Days of month
    for (let i = 1; i <= daysInMonth; i++) {
      const cellDate = new Date(year, month, i);
      
      // Check if any calls scheduled on this date
      const callsOnDate = scheduledCalls.filter(call => {
        if (!call.reschedule_date) return false;
        const callDate = new Date(call.reschedule_date);
        return callDate.getFullYear() === cellDate.getFullYear() &&
               callDate.getMonth() === cellDate.getMonth() &&
               callDate.getDate() === cellDate.getDate();
      });

      const hasCalls = callsOnDate.length > 0;
      const todayDate = new Date();
      const isToday = todayDate.getFullYear() === cellDate.getFullYear() &&
                      todayDate.getMonth() === cellDate.getMonth() &&
                      todayDate.getDate() === cellDate.getDate();

      days.push(
        <div key={`day-${i}`} style={{ 
          padding: '1rem 0.5rem', 
          border: '1px solid var(--border-light)', 
          borderRadius: '8px',
          textAlign: 'center',
          background: isToday ? '#eff6ff' : 'white',
          position: 'relative'
        }}>
          <span style={{ 
            fontWeight: isToday ? 'bold' : '500', 
            color: isToday ? 'var(--text-emerald)' : 'var(--text-main)' 
          }}>
            {i}
          </span>
          {hasCalls && (
            <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'center', gap: '0.25rem', flexWrap: 'wrap' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-emerald)' }} />
              {callsOnDate.length > 1 && <span style={{ fontSize: '0.7rem', color: 'var(--text-emerald)', fontWeight: '600' }}>+{callsOnDate.length - 1}</span>}
            </div>
          )}
        </div>
      );
    }
    return days;
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + offset));
    setCurrentDate(new Date(newDate));
  };

  // Upcoming calls this week (just show all upcoming for now from today onwards)
  const today = new Date();
  today.setHours(0,0,0,0);
  const upcomingCalls = scheduledCalls.filter(c => new Date(c.reschedule_date) >= today);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* Calendar Section */}
      <div style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-heading)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CalendarIcon size={20} color="var(--text-emerald)" /> 
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h2>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={() => changeMonth(-1)} style={{ background: 'var(--surface-bg)', border: '1px solid var(--border-light)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Prev</button>
            <button onClick={() => setCurrentDate(new Date())} style={{ background: 'var(--surface-bg)', border: '1px solid var(--border-light)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Today</button>
            <button onClick={() => changeMonth(1)} style={{ background: 'var(--surface-bg)', border: '1px solid var(--border-light)', padding: '0.5rem 1rem', borderRadius: '8px', cursor: 'pointer' }}>Next</button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', marginBottom: '0.5rem' }}>
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} style={{ textAlign: 'center', fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-muted)' }}>{day}</div>
          ))}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
          {renderCalendar()}
        </div>
      </div>

      {/* Upcoming Calls List */}
      <div style={{ background: 'white', border: '1px solid var(--border-light)', borderRadius: '12px', padding: '1.5rem' }}>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', color: 'var(--text-heading)' }}>Upcoming Scheduled Calls</h3>
        
        {upcomingCalls.length === 0 ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem 0' }}>
            No upcoming scheduled calls.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {upcomingCalls.map(call => {
              const callDate = new Date(call.reschedule_date);
              return (
                <div key={call.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid var(--border-light)', borderRadius: '8px', background: 'var(--surface-bg)' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <span style={{ fontWeight: '600', color: 'var(--text-emerald)', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Building size={16} /> {call.company_name}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <User size={14} /> {call.client_name}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Phone size={14} /> {call.contact_number}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#ecfeff', padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid #a5f3fc' }}>
                    <Clock size={18} color="#0891b2" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.1rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#0891b2', fontWeight: '600' }}>
                        {callDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                      </span>
                      <span style={{ fontSize: '0.75rem', color: '#164e63', fontWeight: '500' }}>
                        {callDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
}
