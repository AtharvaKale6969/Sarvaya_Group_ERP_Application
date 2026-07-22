import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Briefcase, FileText, CheckCircle2, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    org: 'Plastroots Waste Management & Solutions Private Limited',
    dept: 'RMT',
    designation: '',
    doj: '',
    empId: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep(2);
  const handlePrev = () => setStep(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  if (isSuccess) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '600px', backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e5e7eb', padding: '3rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={48} color="#d97706" />
        </div>
        <h2 style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>Onboarding Request Submitted!</h2>
        <p style={{ fontSize: '1rem', color: '#6b7280', textAlign: 'center', maxWidth: '500px', marginBottom: '2.5rem' }}>
          {formData.firstName} {formData.lastName} ({formData.empId}) has been successfully submitted and is currently <strong>Pending Admin Approval</strong>. Once the Admin approves and assigns a role, they will be available in the master database for shift and payroll assignment.
        </p>

        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'center' }}>
          <button 
            onClick={() => {
              setFormData({ firstName: '', lastName: '', email: '', phone: '', address: '', dob: '', org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'RMT', designation: '', doj: '', empId: '' });
              setStep(1);
              setIsSuccess(false);
            }}
            style={{ backgroundColor: '#0ea5e9', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '6px', border: 'none', fontWeight: '600', fontSize: '0.875rem', cursor: 'pointer' }}
          >
            Submit Another Onboarding Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' }}>Employee Onboarding</h2>
        <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: 0 }}>Create a new master record for an employee. Once completed, you can assign them to specific modules.</p>
      </div>

      {/* Progress Steps */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', color: step >= 1 ? '#0ea5e9' : '#9ca3af' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: step >= 1 ? '#e0f2fe' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '0.875rem' }}>1</div>
          <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Personal Details</span>
        </div>
        <div style={{ flex: 1, height: '2px', backgroundColor: step >= 2 ? '#0ea5e9' : '#e5e7eb' }}></div>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', color: step >= 2 ? '#0ea5e9' : '#9ca3af' }}>
          <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: step >= 2 ? '#e0f2fe' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600', fontSize: '0.875rem' }}>2</div>
          <span style={{ fontWeight: '500', fontSize: '0.875rem' }}>Employment Details</span>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', padding: '2rem' }}>
        
        {step === 1 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeIn 0.3s ease-in-out' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} color="#0ea5e9" /> Personal Information
            </h3>
            
            <div className="responsive-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>First Name *</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="e.g. John" style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.2s' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Last Name *</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="e.g. Doe" style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            </div>

            <div className="responsive-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Email Address *</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john.doe@example.com" style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Phone Number *</label>
                <div style={{ position: 'relative' }}>
                  <Phone size={16} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            <div className="responsive-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Current Address</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={16} color="#9ca3af" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="City, State" style={{ width: '100%', padding: '0.625rem 1rem 0.625rem 2.5rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="button" onClick={handleNext} disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone} style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.625rem 1.5rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) ? 'not-allowed' : 'pointer', opacity: (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) ? 0.6 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Next <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', animation: 'fadeIn 0.3s ease-in-out' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Briefcase size={18} color="#0ea5e9" /> Employment Information
            </h3>

            <div className="responsive-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Organization *</label>
                <select required name="org" value={formData.org} onChange={handleChange} style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white', appearance: 'auto' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <option value="Plastroots Waste Management & Solutions Private Limited">Plastroots Waste Management & Solutions Private Limited</option>
                  <option value="Plastroots Foundation">Plastroots Foundation</option>
                  <option value="Shetahit Farm Solutions Private Limited">Shetahit Farm Solutions Private Limited</option>
                  <option value="Geoclaim Energy Private Limited">Geoclaim Energy Private Limited</option>
                  <option value="Aayuneer Enterprises">Aayuneer Enterprises</option>
                  <option value="Saravya Group">Saravya Group</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Department *</label>
                <select required name="dept" value={formData.dept} onChange={handleChange} style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white', appearance: 'auto' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  {formData.org.includes('Plastroots Waste') && <><option>RMT</option><option>Government Services</option><option>Corporate Compliance</option></>}
                  {formData.org.includes('Foundation') && <><option>CSR</option><option>IEC</option><option>RRC</option></>}
                  {formData.org.includes('Shetahit') && <><option>FVF</option><option>MPD</option></>}
                  {formData.org.includes('Geoclaim') && <><option>Biogas</option><option>Biomass</option><option>Shredding Unit</option><option>PMS</option></>}
                  {formData.org.includes('Aayuneer') && <><option>Flow Up</option><option>Zoo Platform</option></>}
                  {formData.org.includes('Saravya') && <><option>HQ / Operations</option></>}
                </select>
              </div>
            </div>

            <div className="responsive-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Designation *</label>
                <input required type="text" name="designation" value={formData.designation} onChange={handleChange} placeholder="e.g. Executive Analyst" style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Employee ID (Auto/Manual) *</label>
                <input required type="text" name="empId" value={formData.empId} onChange={handleChange} placeholder="e.g. EMP042" style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>
            </div>

            <div className="responsive-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}>Date of Joining *</label>
                <input required type="date" name="doj" value={formData.doj} onChange={handleChange} style={{ padding: '0.625rem 1rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', fontFamily: 'inherit' }} />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px solid #e5e7eb' }}>
              <button type="button" onClick={handlePrev} style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.625rem 1.5rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                Back
              </button>
              <button type="submit" disabled={isSubmitting || !formData.designation || !formData.empId || !formData.doj} style={{ backgroundColor: '#10b981', color: 'white', border: 'none', padding: '0.625rem 2rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: (isSubmitting || !formData.designation || !formData.empId || !formData.doj) ? 'not-allowed' : 'pointer', opacity: (isSubmitting || !formData.designation || !formData.empId || !formData.doj) ? 0.7 : 1 }}>
                {isSubmitting ? 'Onboarding...' : 'Onboard Employee'}
              </button>
            </div>
          </div>
        )}

      </form>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
