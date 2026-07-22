import React, { useState } from 'react';
import { Search, X, User, CheckCircle, Shield, Plus, Trash2, Check } from 'lucide-react';
import { ORGANIZATIONS } from '../../store/useContextStore';

export default function HRApproval() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState<any>(null);

  // Mock data representing submissions from HR Onboarding
  const [pendingRequests, setPendingRequests] = useState([
    {
      id: 'REQ001',
      firstName: 'Amit',
      lastName: 'Sharma',
      email: 'amit.sharma@example.com',
      phone: '+91 9876543210',
      designation: 'Operations Manager',
      empId: 'EMP043',
      doj: '2026-07-25',
      submittedBy: 'HR',
      submittedOn: '2026-07-22 10:30 AM',
      status: 'Pending Approval',
      // Initial HR selections
      org: 'Sarvaya Group',
      dept: 'HQ / Operations'
    },
    {
      id: 'REQ002',
      firstName: 'Priya',
      lastName: 'Patel',
      email: 'priya.p@example.com',
      phone: '+91 9988776655',
      designation: 'Executive Analyst',
      empId: 'EMP044',
      doj: '2026-08-01',
      submittedBy: 'HR',
      submittedOn: '2026-07-22 11:15 AM',
      status: 'Pending Approval',
      org: 'Plastroots Waste Management & Solutions Private Limited',
      dept: 'RMT'
    }
  ]);

  const [formData, setFormData] = useState<any>({});
  
  // Dynamic Builder States
  const [grantedAccess, setGrantedAccess] = useState<{org: string, dept: string, role: string}[]>([]);
  const [builderOrg, setBuilderOrg] = useState(ORGANIZATIONS[0].name);
  const [builderDept, setBuilderDept] = useState(ORGANIZATIONS[0].departments[0].name);
  const [builderRole, setBuilderRole] = useState('Employee');
  const [isAddingAccess, setIsAddingAccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const availableRoles = ['Admin', 'HR', 'BDE', 'Ops', 'Lead', 'Employee'];

  // Whenever the Org changes, auto-select the first department of that new org
  const handleOrgChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orgName = e.target.value;
    setBuilderOrg(orgName);
    const orgData = ORGANIZATIONS.find(o => o.name === orgName);
    if (orgData && orgData.departments.length > 0) {
      setBuilderDept(orgData.departments[0].name);
    }
  };

  const addAccess = () => {
    // Check if this exact combination already exists
    const exists = grantedAccess.some(a => a.org === builderOrg && a.dept === builderDept && a.role === builderRole);
    if (exists) {
      setErrorMsg('This exact access combination has already been granted.');
      return;
    }
    setErrorMsg(null);
    setGrantedAccess([...grantedAccess, { org: builderOrg, dept: builderDept, role: builderRole }]);
    setIsAddingAccess(false);
  };

  const removeAccess = (indexToRemove: number) => {
    setGrantedAccess(grantedAccess.filter((_, idx) => idx !== indexToRemove));
  };

  const openReviewModal = (req: any) => {
    setSelectedRequest(req);
    setFormData({ ...req });
    
    // Automatically grant them the default Employee role for the org/dept that HR initially submitted
    setGrantedAccess([{ org: req.org, dept: req.dept, role: 'Employee' }]);
    
    setBuilderOrg(req.org);
    setBuilderDept(req.dept);
    setBuilderRole('Employee');
    setErrorMsg(null);
    setIsSuccess(false);
  };

  const closeReviewModal = () => {
    setSelectedRequest(null);
  };

  const handleApprove = () => {
    if (grantedAccess.length === 0) {
      setErrorMsg('Please grant at least one role & department assignment before approving.');
      return;
    }

    // Approve and move out of pending
    setPendingRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    setIsSuccess(true);
  };

  const handleReject = () => {
    setPendingRequests(prev => prev.filter(r => r.id !== selectedRequest.id));
    
    closeReviewModal();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Pending HR Approvals <span style={{ color: '#0ea5e9' }}>{pendingRequests.length}</span>
        </h2>
        
        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search requests..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', width: '100%', minWidth: '250px' }}
          />
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Req ID</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Employee Name</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Initial Request</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Submitted On</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingRequests.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                  No pending onboarding requests found.
                </td>
              </tr>
            ) : pendingRequests.filter(r => r.firstName.toLowerCase().includes(searchTerm.toLowerCase()) || r.lastName.toLowerCase().includes(searchTerm.toLowerCase())).map((req) => (
              <tr key={req.id} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background-color 0.2s', cursor: 'pointer' }} onClick={() => openReviewModal(req)}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{req.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', fontWeight: '600' }}>
                      {req.firstName.charAt(0)}{req.lastName.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500' }}>{req.firstName} {req.lastName}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{req.empId}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  <div style={{ fontWeight: '500', color: '#374151', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }} title={req.org}>{req.org}</div>
                  <div style={{ fontSize: '0.75rem' }}>{req.dept}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  <div>{req.submittedOn}</div>
                  <div style={{ fontSize: '0.75rem', color: '#9ca3af' }}>by {req.submittedBy}</div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', textAlign: 'right' }}>
                  <button 
                    onClick={(e) => { e.stopPropagation(); openReviewModal(req); }}
                    style={{ backgroundColor: '#0ea5e9', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer' }}
                  >
                    Review & Approve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
</div>
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#111827' }}>Review Onboarding Request - {selectedRequest.id}</h3>
              <button onClick={closeReviewModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9ca3af' }}>
                <X size={20} />
              </button>
            </div>
            {isSuccess ? (
              <div style={{ padding: '4rem 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', textAlign: 'center', backgroundColor: '#ffffff', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '8px solid #dcfce7', animation: 'scaleIn 0.3s ease-out' }}>
                  <CheckCircle size={40} color="#22c55e" strokeWidth={2.5} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', margin: '0 0 0.5rem 0' }}>Approval Successful!</h3>
                  <p style={{ fontSize: '1rem', color: '#64748b', margin: 0, maxWidth: '350px', lineHeight: '1.5' }}>
                    <strong>{formData.firstName} {formData.lastName}</strong> has been successfully approved, assigned to {grantedAccess.length} role(s), and activated in the system.
                  </p>
                </div>
                <button 
                  onClick={closeReviewModal} 
                  style={{ marginTop: '1rem', padding: '0.75rem 2.5rem', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '8px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.2s', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                {errorMsg && (
              <div style={{ margin: '0 1.5rem', padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', backgroundColor: '#fee2e2', borderRadius: '50%', color: '#ef4444', fontWeight: 'bold' }}>!</span>
                {errorMsg}
              </div>
            )}
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
              {/* Basic Info */}
              <div>
                <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#4b5563', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Personal Information</h4>
                <div className="responsive-grid">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>First Name</label>
                    <input name="firstName" value={formData.firstName} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Last Name</label>
                    <input name="lastName" value={formData.lastName} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Email</label>
                    <input name="email" value={formData.email} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Phone</label>
                    <input name="phone" value={formData.phone} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Designation</label>
                    <input name="designation" value={formData.designation} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#4b5563' }}>Employee ID</label>
                    <input name="empId" value={formData.empId} onChange={handleChange} style={{ padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px' }} />
                  </div>
                </div>
              </div>

              {/* Dynamic Access Builder */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', width: '100%', boxSizing: 'border-box' }}>
                <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.125rem', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Shield size={20} /> System Access Builder
                </h4>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', color: '#475569' }}>
                  Assign specific roles tied directly to individual departments. You can grant multiple access levels across different organizations.
                </p>

                {/* Granted Access List */}
                {grantedAccess.length === 0 ? (
                  <div style={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f1f5f9', borderRadius: '8px', color: '#64748b', fontSize: '0.875rem', border: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                    No access granted yet. Click below to add an assignment.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                    {grantedAccess.map((access, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748b', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }} title={access.org}>{access.org}</span>
                          <span style={{ fontSize: '1rem', fontWeight: '600', color: '#0f172a', wordBreak: 'break-word' }}>{access.dept}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.25rem' }}>
                            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Assigned Role</span>
                            <span style={{ fontSize: '0.875rem', fontWeight: '600', backgroundColor: '#f0fdf4', color: '#166534', padding: '0.25rem 0.75rem', borderRadius: '9999px', border: '1px solid #bbf7d0' }}>
                              {access.role}
                            </span>
                          </div>
                          <button 
                            onClick={() => removeAccess(idx)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.5rem', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background-color 0.2s' }}
                            title="Remove Access"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add New Assignment Form or Button */}
                {!isAddingAccess ? (
                  <button 
                    onClick={() => { setIsAddingAccess(true); setErrorMsg(null); }}
                    style={{ width: '100%', padding: '0.875rem', backgroundColor: 'white', border: '1px dashed #94a3b8', borderRadius: '8px', color: '#0ea5e9', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', transition: 'all 0.2s' }}
                  >
                    <Plus size={18} /> Add Another Assignment
                  </button>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#f1f5f9', padding: '1.5rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                    <h5 style={{ margin: 0, fontSize: '0.875rem', color: '#334155', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Assignment Entry</h5>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>1. Select Organization</label>
                      <select 
                        value={builderOrg}
                        onChange={handleOrgChange}
                        style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white', width: '100%', boxSizing: 'border-box', maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                      >
                        {ORGANIZATIONS.map(org => (
                          <option key={org.name} value={org.name}>{org.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>2. Select Department</label>
                      <select 
                        value={builderDept}
                        onChange={(e) => setBuilderDept(e.target.value)}
                        style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white', width: '100%', boxSizing: 'border-box', maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                      >
                        {ORGANIZATIONS.find(o => o.name === builderOrg)?.departments.map(dept => (
                          <option key={dept.name} value={dept.name}>{dept.name}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.75rem', fontWeight: '600', color: '#475569', textTransform: 'uppercase' }}>3. Select Role</label>
                      <select 
                        value={builderRole}
                        onChange={(e) => setBuilderRole(e.target.value)}
                        style={{ padding: '0.75rem', border: '1px solid #cbd5e1', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', backgroundColor: 'white', color: '#0f172a', fontWeight: '500', width: '100%', boxSizing: 'border-box', maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                      >
                        {availableRoles.map(role => (
                          <option key={role} value={role}>{role}</option>
                        ))}
                      </select>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                      <button 
                        onClick={() => setIsAddingAccess(false)}
                        style={{ flex: 1, padding: '0.75rem', backgroundColor: 'white', border: '1px solid #cbd5e1', borderRadius: '6px', color: '#475569', fontWeight: '600', cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={addAccess}
                        style={{ flex: 1, padding: '0.75rem', backgroundColor: '#0ea5e9', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        <Check size={16} /> Confirm Assignment
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', backgroundColor: '#f9fafb' }}>
              <button onClick={handleReject} style={{ backgroundColor: 'white', color: '#ef4444', border: '1px solid #fca5a5', padding: '0.5rem 1.25rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                Reject
              </button>
              <div className="responsive-cards">
                <button onClick={closeReviewModal} style={{ backgroundColor: 'white', color: '#374151', border: '1px solid #d1d5db', padding: '0.5rem 1.25rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                  Cancel
                </button>
                <button onClick={handleApprove} style={{ backgroundColor: '#22c55e', color: 'white', border: 'none', padding: '0.5rem 1.25rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle size={16} /> Approve & Activate
                </button>
              </div>
            </div>
              </>
            )
          }
          </div>
        </div>
      )}
    </div>
  );
}
