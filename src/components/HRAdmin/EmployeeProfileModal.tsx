import React, { useState } from 'react';
import { 
  X, User, MapPin, Phone, Mail, Briefcase, Calendar, 
  CheckCircle, FileText, Download, Building, CreditCard, ChevronRight, Award
} from 'lucide-react';

interface EmployeeProfileModalProps {
  profile: {
    id: string;
    name: string;
    dept: string;
    role: string;
    status: string;
    date: string;
  };
  onClose: () => void;
}

export default function EmployeeProfileModal({ profile, onClose }: EmployeeProfileModalProps) {
  const [activeTab, setActiveTab] = useState('Overview');

  if (!profile) return null;

  const tabs = ['Overview', 'Personal Info', 'Job Details', 'Onboarding & Docs', 'Payroll'];

  // Mock extended data
  const extendedData = {
    email: `${profile.name.toLowerCase().replace(' ', '.')}@sarvaya.com`,
    phone: '+91 98765 43210',
    manager: 'John Doe',
    location: 'Nagpur Head Office',
    dob: '15 Aug 1995',
    bloodGroup: 'O+',
    address: '101, Pramila Apartments, Nagpur, Maharashtra',
    emergencyContact: 'Jane Doe (+91 98765 00000)',
    shift: 'General Shift (10:00 AM - 07:00 PM)',
    employeeType: 'Full-Time',
    pfNumber: 'MH/NAG/0001234/000/0000123',
    uan: '100XXXXXXXXX',
    pan: 'ABCDE1234F',
    bank: 'HDFC Bank (**** 1234)',
    onboardingSteps: [
      { name: 'Offer Letter Signed', status: 'Completed', date: '25 Dec 2025' },
      { name: 'Background Verification', status: 'Completed', date: '28 Dec 2025' },
      { name: 'IT Assets Assigned', status: 'Completed', date: '30 Dec 2025' },
      { name: 'Induction Training', status: 'Completed', date: '01 Jan 2026' }
    ],
    documents: [
      { name: 'Aadhar Card', type: 'KYC', size: '1.2 MB' },
      { name: 'PAN Card', type: 'KYC', size: '800 KB' },
      { name: 'Educational Certificates', type: 'Education', size: '3.5 MB' },
      { name: 'Previous Experience Letter', type: 'Experience', size: '1.1 MB' }
    ]
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      
      {/* Modal Container */}
      <div style={{ 
        backgroundColor: 'white', borderRadius: '16px', width: '100%', maxWidth: '900px', 
        height: '90vh', display: 'flex', flexDirection: 'column', overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', animation: 'fadeIn 0.2s ease-out'
      }}>
        
        {/* Header Section */}
        <div style={{ padding: '2rem', backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', display: 'flex', gap: '1.5rem', position: 'relative' }}>
          <button 
            onClick={onClose}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'white', border: '1px solid #e2e8f0', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
          >
            <X size={20} />
          </button>
          
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0284c7', flexShrink: 0, border: '4px solid white', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <User size={50} />
          </div>
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <h2 style={{ margin: 0, fontSize: '1.75rem', fontWeight: '700', color: '#0f172a' }}>{profile.name}</h2>
              <span style={{ padding: '0.25rem 0.75rem', backgroundColor: profile.status === 'Active' ? '#dcfce7' : '#fee2e2', color: profile.status === 'Active' ? '#166534' : '#991b1b', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                {profile.status}
              </span>
              <span style={{ padding: '0.25rem 0.75rem', backgroundColor: '#e0e7ff', color: '#3730a3', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '600' }}>
                Onboarded
              </span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: '#475569', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Award size={16} color="#94a3b8" />
                <span style={{ fontWeight: '500' }}>{profile.id}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Briefcase size={16} color="#94a3b8" />
                <span>{profile.role}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                <Building size={16} color="#94a3b8" />
                <span>{profile.dept}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div style={{ display: 'flex', borderBottom: '1px solid #e2e8f0', backgroundColor: 'white', padding: '0 1.5rem' }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 1.25rem',
                backgroundColor: 'transparent',
                border: 'none',
                borderBottom: `2px solid ${activeTab === tab ? '#0ea5e9' : 'transparent'}`,
                color: activeTab === tab ? '#0ea5e9' : '#64748b',
                fontWeight: activeTab === tab ? '600' : '500',
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Scrollable Content Area */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', backgroundColor: '#f8fafc' }}>
          
          {/* OVERVIEW TAB */}
          {activeTab === 'Overview' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                
                {/* Contact Card */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#0f172a' }}>Contact Information</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <Mail size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Email Address</p>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.email}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <Phone size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Phone Number</p>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.phone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Work Details Card */}
                <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', fontWeight: '600', color: '#0f172a' }}>Work Details</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <MapPin size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Work Location</p>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.location}</p>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                        <User size={16} />
                      </div>
                      <div>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Reporting Manager</p>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.manager}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ONBOARDING & DOCS TAB */}
          {activeTab === 'Onboarding & Docs' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              
              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Onboarding Progress</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {extendedData.onboardingSteps.map((step, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <div style={{ color: '#10b981' }}>
                        <CheckCircle size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>{step.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Completed on {step.date}</p>
                      </div>
                      <div style={{ padding: '0.25rem 0.75rem', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600' }}>
                        {step.status}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '1.5rem', border: '1px solid #e2e8f0' }}>
                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>Uploaded Documents</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
                  {extendedData.documents.map((doc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <div style={{ padding: '0.75rem', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#0ea5e9' }}>
                        <FileText size={24} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#1e293b' }}>{doc.name}</p>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>{doc.type} • {doc.size}</p>
                      </div>
                      <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '0.5rem' }}>
                        <Download size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* OTHER TABS PLACEHOLDER (Job, Personal, Payroll) */}
          {['Personal Info', 'Job Details', 'Payroll'].includes(activeTab) && (
            <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: '#f1f5f9', borderRadius: '50%', color: '#94a3b8', marginBottom: '1rem' }}>
                <FileText size={32} />
              </div>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.125rem', fontWeight: '600', color: '#0f172a' }}>{activeTab} Details</h3>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem', maxWidth: '400px', marginInline: 'auto' }}>
                This section contains the comprehensive {activeTab.toLowerCase()} data for the employee collected during onboarding.
              </p>
              
              <div style={{ marginTop: '2rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', maxWidth: '600px', marginInline: 'auto' }}>
                {activeTab === 'Personal Info' && (
                  <>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Date of Birth</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.dob}</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Blood Group</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.bloodGroup}</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px', gridColumn: 'span 2' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Permanent Address</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.address}</p>
                    </div>
                  </>
                )}
                {activeTab === 'Job Details' && (
                  <>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Date of Joining</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{profile.date}</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Shift</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.shift}</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Employee Type</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.employeeType}</p>
                    </div>
                  </>
                )}
                {activeTab === 'Payroll' && (
                  <>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>Bank Account</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.bank}</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>PAN Number</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.pan}</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>UAN</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.uan}</p>
                    </div>
                    <div style={{ padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>PF Number</p>
                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', fontWeight: '500', color: '#1e293b' }}>{extendedData.pfNumber}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
        </div>
      </div>
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
