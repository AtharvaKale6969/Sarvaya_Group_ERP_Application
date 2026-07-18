import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { LogIn, Building2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate('/home');
    }
    setLoading(false);
  };

  return (
    <div className="login-bg" style={{ 
      display: 'flex', 
      height: '100vh', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: '1rem'
    }}>
      
      {/* Glassmorphism Card */}
      <div 
        className="animate-entrance"
        style={{ 
          background: 'var(--glass-bg)', 
          backdropFilter: 'blur(20px)', 
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid var(--glass-border)',
          borderRadius: '24px', 
          boxShadow: 'var(--glass-shadow)', 
          width: '100%', 
          maxWidth: '420px',
          padding: '2.5rem 2rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Decorative subtle shine */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)'
        }}/>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            background: 'white', 
            padding: '1rem', 
            borderRadius: '16px', 
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
            marginBottom: '1rem'
          }}>
            <Building2 size={32} color="var(--text-emerald)" strokeWidth={1.5} />
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: '600', margin: '0 0 0.5rem 0', color: 'var(--text-dark)' }}>
            Sarvaya ERP
          </h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.95rem' }}>
            Welcome back. Please enter your details.
          </p>
        </div>

        {error && (
          <div style={{ 
            color: '#ef4444', 
            background: '#fef2f2', 
            padding: '0.75rem', 
            borderRadius: '8px', 
            marginBottom: '1.5rem', 
            fontSize: '0.875rem',
            textAlign: 'center',
            border: '1px solid #fee2e2'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-dark)' }}>
              Email
            </label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                borderRadius: '12px', 
                border: '1px solid rgba(0,0,0,0.1)', 
                background: 'var(--input-bg)',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                fontSize: '1rem',
                color: 'var(--text-dark)',
                transition: 'all 0.2s ease'
              }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-dark)' }}>
              Password
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              style={{ 
                width: '100%', 
                padding: '0.75rem 1rem', 
                borderRadius: '12px', 
                border: '1px solid rgba(0,0,0,0.1)', 
                background: 'var(--input-bg)',
                boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.02)',
                fontSize: '1rem',
                color: 'var(--text-dark)',
                transition: 'all 0.2s ease'
              }}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              marginTop: '0.5rem',
              width: '100%', 
              padding: '0.875rem', 
              backgroundColor: 'var(--text-emerald)', 
              color: 'white', 
              border: 'none', 
              borderRadius: '12px',
              fontSize: '1rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 12px rgba(35, 127, 112, 0.3)',
              transition: 'transform 0.1s ease, box-shadow 0.2s ease',
              transform: loading ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            <LogIn size={20} />
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
