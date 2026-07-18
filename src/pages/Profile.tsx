import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/useAuthStore';
import { Calendar, Building, Mail, Phone, Edit3, Shield, Key, Smartphone, UploadCloud } from 'lucide-react';

export default function Profile() {
  const { user, roles } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profile, setProfile] = useState<any>({
    full_name: '',
    avatar_url: '',
    bio: '',
    phone_number: '',
    date_of_birth: ''
  });

  const primaryRole = roles.length > 0 ? roles[0] : null;

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user?.id)
      .single();
      
    if (data) {
      setProfile(data);
    }
  };

  const saveProfile = async () => {
    setLoading(true);
    await supabase.from('profiles').upsert({
      id: user?.id,
      ...profile,
      updated_at: new Date().toISOString()
    });
    setLoading(false);
    setIsEditing(false);
  };

  const defaultAvatar = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80";

  const cardStyle = {
    background: '#FFFFFF',
    borderRadius: '16px',
    border: '1px solid var(--border-light)',
    padding: '1.5rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.02)'
  };

  const labelStyle = {
    fontSize: '0.8rem',
    color: 'var(--text-muted)',
    fontWeight: '500',
    marginBottom: '0.25rem',
    display: 'block'
  };

  const inputStyle = {
    width: '100%',
    padding: '0.5rem',
    borderRadius: '8px',
    border: '1px solid var(--border-light)',
    fontSize: '0.9rem',
    color: 'var(--text-main)',
    background: 'var(--surface-bg)'
  };

  return (
    <div className="animate-entrance" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <header style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--text-heading)', margin: '0 0 0.25rem 0' }}>
          User Profile
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>
          View your general account information and personal details.
        </p>
      </header>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2.5rem',
        alignItems: 'stretch'
      }}>
        {/* Left Column: Portrait & Security Group */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: '1 1 300px', height: '100%' }}>
          <div style={{ 
            position: 'relative', 
            flex: 1,
            minHeight: '520px', 
            borderRadius: '24px', 
            overflow: 'hidden',
            boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
            backgroundColor: '#262D31'
          }}>
            <img 
            src={profile.avatar_url || defaultAvatar} 
            alt="Profile" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
          />
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)',
            padding: '2.5rem 1.5rem 1.5rem', color: 'white'
          }}>
            {isEditing ? (
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', display: 'block', marginBottom: '0.25rem' }}>Avatar Image URL</label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    value={profile.avatar_url || ''}
                    onChange={e => setProfile({...profile, avatar_url: e.target.value})}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: '6px', border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', fontSize: '0.8rem' }}
                    placeholder="https://..."
                  />
                </div>
              </div>
            ) : null}

            <h2 style={{ fontSize: '1.75rem', fontWeight: '700', margin: '0 0 0.25rem 0' }}>
              {profile.full_name || 'System Admin'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem', fontWeight: '500' }}>
              <Shield size={14} />
              {primaryRole?.name || 'E-Commerce Ops Manager'}
            </div>
          </div>
        </div>

          {/* Account Security (Moved here for mobile logic) */}
          <div className="mobile-only" style={cardStyle}>
            <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-heading)' }}>Account Security</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '1rem', background: 'var(--surface-bg)', borderRadius: '12px', border: '1px solid var(--border-light)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)' }}>
                  <Key size={16} /> Change Password
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated 2m ago</span>
              </div>

              <div style={{ 
                display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                padding: '1rem', background: 'var(--surface-bg)', borderRadius: '12px', border: '1px solid var(--border-light)' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)' }}>
                  <Smartphone size={16} /> Two-Factor Auth (2FA)
                </div>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-emerald)', fontWeight: '600' }}>Enabled</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Grid of Info Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Bio Card */}
          <div style={cardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-heading)' }}>Professional Biography</h3>
              <button 
                onClick={() => isEditing ? saveProfile() : setIsEditing(true)}
                disabled={loading}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.4rem', 
                  background: 'transparent', border: 'none', 
                  color: 'var(--text-emerald)', fontWeight: '600', fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                {isEditing ? <UploadCloud size={16} /> : <Edit3 size={16} />}
                {isEditing ? (loading ? 'Saving...' : 'Save All') : 'Edit Profile'}
              </button>
            </div>
            {isEditing ? (
              <textarea 
                rows={4}
                value={profile.bio || ''}
                onChange={e => setProfile({...profile, bio: e.target.value})}
                style={{...inputStyle, resize: 'vertical'}}
                placeholder="Write a short professional bio..."
              />
            ) : (
              <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6', margin: 0 }}>
                {profile.bio || 'As the E-Commerce Operations Manager, I oversee the seamless execution of daily platform activities, from inventory forecasting to order fulfillment. Passionate about scaling processes and building resilient supply chains that drive customer satisfaction and bottom-line growth.'}
              </p>
            )}
          </div>

          {/* Middle Row: Tenure & Dept */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            <div style={cardStyle}>
              <Calendar size={20} color="var(--text-emerald)" style={{ marginBottom: '1.5rem' }} />
              <span style={labelStyle}>Tenure</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-heading)', margin: '0.25rem 0' }}>2.5 Years</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Joined August 12, 2023</div>
            </div>

            <div style={cardStyle}>
              <Building size={20} color="#f59e0b" style={{ marginBottom: '1.5rem' }} />
              <span style={labelStyle}>Department</span>
              <div style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-heading)', margin: '0.25rem 0' }}>Logistics & Ops</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Headquarters</div>
            </div>
          </div>

          {/* Bottom Row: Personal & Security */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            
            {/* Personal Details */}
            <div style={{...cardStyle, display: 'flex', flexDirection: 'column'}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
                <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-heading)' }}>Personal Details</h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Mail size={18} color="var(--text-emerald)" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <span style={labelStyle}>Email Address</span>
                    <div style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.9rem' }}>{user?.email}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Phone size={18} color="var(--text-emerald)" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <span style={labelStyle}>Contact Number</span>
                    {isEditing ? (
                      <input type="text" value={profile.phone_number || ''} onChange={e => setProfile({...profile, phone_number: e.target.value})} style={inputStyle} />
                    ) : (
                      <div style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.9rem' }}>{profile.phone_number || '+91 98765 43210'}</div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <Calendar size={18} color="var(--text-emerald)" style={{ marginTop: '2px' }} />
                  <div style={{ flex: 1 }}>
                    <span style={labelStyle}>Date of Birth</span>
                    {isEditing ? (
                      <input type="date" value={profile.date_of_birth || ''} onChange={e => setProfile({...profile, date_of_birth: e.target.value})} style={inputStyle} />
                    ) : (
                      <div style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.9rem' }}>{profile.date_of_birth || 'May 15, 1992'}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Account Security (Restored for Desktop logic) */}
            <div className="desktop-only" style={cardStyle}>
              <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-heading)' }}>Account Security</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  padding: '1rem', background: 'var(--surface-bg)', borderRadius: '12px', border: '1px solid var(--border-light)' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)' }}>
                    <Key size={16} /> Change Password
                  </div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Updated 2m ago</span>
                </div>

                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                  padding: '1rem', background: 'var(--surface-bg)', borderRadius: '12px', border: '1px solid var(--border-light)' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: '600', color: 'var(--text-heading)' }}>
                    <Smartphone size={16} /> Two-Factor Auth (2FA)
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-emerald)', fontWeight: '600' }}>Enabled</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
