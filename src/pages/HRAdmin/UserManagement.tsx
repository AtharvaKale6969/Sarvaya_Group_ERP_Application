import React, { useState } from 'react';
import { Search, Edit, Shield, MoreVertical, X, Check, Building, Briefcase, Plus, Trash2 } from 'lucide-react';
import { ORGANIZATIONS } from '../../store/useContextStore';

export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const [users, setUsers] = useState([
    { 
      id: 'EMP001', 
      name: 'Admin User', 
      email: 'admin@test01.com', 
      access: [{ org: 'Saravya Group', dept: 'HQ / Operations', role: 'Admin' }, { org: 'Saravya Group', dept: 'HQ / Operations', role: 'HR' }], 
      status: 'Active' 
    },
    { 
      id: 'EMP014', 
      name: 'Pratik Wankhede', 
      email: 'pratik@plastroots.com', 
      access: [{ org: 'Plastroots Waste Management & Solutions Private Limited', dept: 'RMT', role: 'Lead' }, { org: 'Plastroots Foundation', dept: 'CSR', role: 'BDE' }], 
      status: 'Active' 
    },
    { 
      id: 'EMP003', 
      name: 'Nikhil Tumsare', 
      email: 'nikhil@plastroots.com', 
      access: [{ org: 'Plastroots Foundation', dept: 'CSR', role: 'BDE' }], 
      status: 'Active' 
    },
    { 
      id: 'EMP007', 
      name: 'Ankit Bhalerao', 
      email: 'ankit@shetahit.com', 
      access: [{ org: 'Shetahit Farm Solutions Private Limited', dept: 'FVF', role: 'Ops' }], 
      status: 'Active' 
    },
    { 
      id: 'PF003', 
      name: 'Himanshu Dhote', 
      email: 'himanshu@saravya.com', 
      access: [{ org: 'Saravya Group', dept: 'HQ / Operations', role: 'HR' }], 
      status: 'Active' 
    }
  ]);

  const [editingUser, setEditingUser] = useState<any>(null);
  
  // Dynamic Builder States
  const [grantedAccess, setGrantedAccess] = useState<{org: string, dept: string, role: string}[]>([]);
  const [builderOrg, setBuilderOrg] = useState(ORGANIZATIONS[0].name);
  const [builderDept, setBuilderDept] = useState(ORGANIZATIONS[0].departments[0].name);
  const [builderRole, setBuilderRole] = useState('Employee');
  const [isAddingAccess, setIsAddingAccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const availableRoles = ['Admin', 'HR', 'BDE', 'Ops', 'Lead', 'Employee'];

  const handleEditClick = (user: any) => {
    setEditingUser(user);
    setGrantedAccess([...user.access]);
    setErrorMsg(null);
  };

  const handleOrgChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const orgName = e.target.value;
    setBuilderOrg(orgName);
    const orgData = ORGANIZATIONS.find(o => o.name === orgName);
    if (orgData && orgData.departments.length > 0) {
      setBuilderDept(orgData.departments[0].name);
    }
  };

  const addAccess = () => {
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

  const handleSave = () => {
    if (grantedAccess.length === 0) {
      setErrorMsg('Please assign at least one valid access combination before saving.');
      return;
    }

    const updatedUser = {
      ...editingUser,
      access: grantedAccess
    };

    setUsers(users.map(u => u.id === editingUser.id ? updatedUser : u));
    setEditingUser(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
      
      {/* Header section */}
      <div className="header-responsive" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb' }}>
        <h2 style={{ fontSize: '1.125rem', fontWeight: '600', margin: 0, color: '#374151', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          User Management <span style={{ color: '#0ea5e9' }}>{users.length}</span>
        </h2>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
            <Search size={16} color="#9ca3af" style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '0.5rem 1rem 0.5rem 2.25rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none', width: '100%', minWidth: '250px' }}
            />
          </div>
        </div>
      </div>

      {/* Table section */}
      <div style={{ overflowX: 'auto', padding: '0 1.5rem 1.5rem 1.5rem' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
            <tr>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Employee ID</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>User Details</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Access Matrices</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(u => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
              <tr key={user.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#374151', fontWeight: '500' }}>{user.id}</td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: '2rem', height: '2rem', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9', fontWeight: '600' }}>
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontWeight: '500' }}>{user.name}</div>
                      <div style={{ color: '#6b7280', fontSize: '0.75rem' }}>{user.email}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#4b5563' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', maxWidth: '350px' }}>
                    {user.access.map((acc, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', overflow: 'hidden' }}>
                        <div style={{ padding: '0.25rem 0.5rem', backgroundColor: '#f1f5f9', borderRight: '1px solid #e2e8f0', fontSize: '0.7rem', fontWeight: '500', color: '#475569' }} title={acc.org}>
                          {acc.dept}
                        </div>
                        <div style={{ padding: '0.25rem 0.5rem', fontSize: '0.7rem', fontWeight: '600', color: '#0f172a' }}>
                          {acc.role}
                        </div>
                      </div>
                    ))}
                  </div>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem' }}>
                  <span style={{ backgroundColor: '#dcfce7', color: '#166534', padding: '0.25rem 0.5rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: '600' }}>
                    {user.status}
                  </span>
                </td>
                <td style={{ padding: '1rem', fontSize: '0.875rem', textAlign: 'right' }}>
                  <button onClick={() => handleEditClick(user)} style={{ background: '#f3f4f6', border: '1px solid #d1d5db', cursor: 'pointer', color: '#4b5563', padding: '0.25rem 0.75rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: '500', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Edit size={12} /> Edit Access
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>Edit User Access - {editingUser.name}</h3>
              <button onClick={() => setEditingUser(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}><X size={20} /></button>
            </div>
            
            
            {errorMsg && (
              <div style={{ margin: '0 1.5rem', padding: '0.75rem 1rem', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: '#dc2626', fontSize: '0.875rem', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', height: '20px', backgroundColor: '#fee2e2', borderRadius: '50%', color: '#ef4444', fontWeight: 'bold' }}>!</span>
                {errorMsg}
              </div>
            )}
            
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              
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
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
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

                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
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
            <div style={{ padding: '1.25rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#f9fafb', gap: '1rem' }}>
              <button onClick={() => setEditingUser(null)} style={{ padding: '0.625rem 1.5rem', backgroundColor: 'white', border: '1px solid #d1d5db', borderRadius: '6px', color: '#374151', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSave} style={{ padding: '0.625rem 1.5rem', backgroundColor: '#0ea5e9', border: 'none', borderRadius: '6px', color: 'white', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Check size={16} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
