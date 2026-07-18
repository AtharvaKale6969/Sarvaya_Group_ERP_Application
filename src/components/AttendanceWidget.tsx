import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { useContextStore } from '../store/useContextStore';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { format } from 'date-fns';

export default function AttendanceWidget() {
  const { user } = useAuthStore();
  const { activeOrg, activeDept, activeSubDept, activeRole } = useContextStore();
  const [loading, setLoading] = useState(false);
  const [todayLog, setTodayLog] = useState<any>(null);
  const [error, setError] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchTodayLog();
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, [user, activeOrg, activeDept, activeSubDept, activeRole]);

  const fetchTodayLog = async () => {
    if (!user) return;
    
    let query = supabase
      .from('attendance_logs')
      .select('*')
      .eq('user_id', user.id)
      .eq('organization', activeOrg)
      .eq('department', activeDept)
      .eq('role', activeRole)
      .eq('date', new Date().toISOString().split('T')[0]);
      
    if (activeSubDept) {
      query = query.eq('sub_department', activeSubDept);
    }
    
    const { data } = await query.single();
    if (data) {
      setTodayLog(data);
    } else {
      setTodayLog(null);
    }
  };

  const handlePunch = async (type: 'in' | 'out') => {
    setLoading(true);
    setError('');
    
    try {
      const position = await Geolocation.getCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      if (type === 'in') {
        const { error } = await supabase.from('attendance_logs').insert({
          user_id: user?.id,
          organization: activeOrg,
          department: activeDept,
          sub_department: activeSubDept,
          role: activeRole,
          punch_in_lat: lat,
          punch_in_lng: lng,
          date: new Date().toISOString().split('T')[0]
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from('attendance_logs')
          .update({
            punch_out_time: new Date().toISOString(),
            punch_out_lat: lat,
            punch_out_lng: lng
          })
          .eq('id', todayLog.id);
        if (error) throw error;
      }
      await fetchTodayLog();
    } catch (err) {
      setError('Could not save attendance. Ensure location services are enabled.');
    } finally {
      setLoading(false);
    }
  };

  const isPunchedIn = todayLog && !todayLog.punch_out_time;
  const isCompleted = todayLog && todayLog.punch_out_time;

  return (
    <div style={{
      background: 'var(--surface-bg)',
      border: '1px solid var(--border-light)',
      borderRadius: '20px',
      padding: '2.5rem 2rem',
      boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      height: '100%'
    }}>
      {/* Decorative Accent */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'var(--text-emerald)' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--text-heading)', margin: '0 0 0.25rem 0' }}>Daily Punch</h3>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{format(currentTime, 'EEEE, MMMM do')}</p>
        </div>
        <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--text-emerald)', fontFamily: 'monospace' }}>
          {format(currentTime, 'HH:mm:ss')}
        </div>
      </div>
      
      {error && <p style={{ color: '#ef4444', fontSize: '0.875rem', marginBottom: '1rem', background: '#fef2f2', padding: '0.5rem', borderRadius: '8px' }}>{error}</p>}

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {isCompleted ? (
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--accent-sage)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <Clock size={32} color="var(--text-emerald)" />
            </div>
            <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-heading)', fontSize: '1.1rem' }}>Shift Completed</h4>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', color: 'var(--text-main)', fontSize: '0.9rem' }}>
              <span>In: {format(new Date(todayLog.punch_in_time), 'hh:mm a')}</span>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span>Out: {format(new Date(todayLog.punch_out_time), 'hh:mm a')}</span>
            </div>
          </div>
        ) : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500', margin: 0 }}>
                {isPunchedIn ? 'You are currently punched in.' : 'You have not punched in yet.'}
              </p>
              {isPunchedIn && (
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Since {format(new Date(todayLog.punch_in_time), 'hh:mm a')}
                </p>
              )}
            </div>

            <button 
              onClick={() => !loading && handlePunch(isPunchedIn ? 'out' : 'in')}
              disabled={loading}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '14px',
                border: 'none',
                background: isPunchedIn ? '#F9FAFA' : 'var(--text-emerald)',
                color: isPunchedIn ? 'var(--text-emerald)' : 'white',
                border: isPunchedIn ? '2px solid var(--text-emerald)' : 'none',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                cursor: loading ? 'wait' : 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isPunchedIn ? 'none' : '0 8px 16px rgba(35, 127, 112, 0.2)'
              }}
            >
              {loading ? 'Processing...' : (isPunchedIn ? 'Punch Out' : 'Punch In Now')}
              {!loading && !isPunchedIn && <ArrowRight size={18} />}
            </button>
          </>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '2rem', justifyContent: 'center' }}>
        <MapPin size={14} />
        <span>Location recorded via GPS</span>
      </div>
    </div>
  );
}
