import { useAuthStore } from '../store/useAuthStore';
import AttendanceWidget from '../components/AttendanceWidget';
import MiniCalendar from '../components/MiniCalendar';

export default function Home() {
  const { user, roles } = useAuthStore();
  const primaryRole = roles.length > 0 ? roles[0] : null;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="animate-entrance">
      <header style={{ marginBottom: '3rem' }}>
        <h1 style={{ 
          fontSize: '2.25rem', 
          fontWeight: '700', 
          margin: '0 0 0.5rem 0', 
          color: 'var(--text-heading)',
          letterSpacing: '-0.02em'
        }}>
          {getGreeting()}, {user?.email?.split('@')[0]}
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem', fontWeight: '400' }}>
          {primaryRole ? `Logged in as ${primaryRole.name}` : 'No roles assigned yet.'}
        </p>
      </header>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '2.5rem' 
      }}>
        <AttendanceWidget />
        <MiniCalendar />
      </div>
    </div>
  );
}
