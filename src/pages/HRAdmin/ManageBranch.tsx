import { useState } from 'react';
import { ChevronDown, ChevronsUpDown, MoreVertical, X, Upload, User, Map, Smartphone, Monitor } from 'lucide-react';

export default function ManageBranch() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<any>(null);
  
  // States for viewing employees and profile
  const [viewingEmployees, setViewingEmployees] = useState<any>(null);
  const [viewingProfile, setViewingProfile] = useState<any>(null);

  // Mock branches (Organizations)
  const branches = [
    { id: 1, name: 'Plastroots Waste Management & Solutions Private Limited', radius: '-', employees: 25, createdOn: '29-10-2025' },
    { id: 2, name: 'Plastroots Foundation', radius: '-', employees: 12, createdOn: '29-10-2025' },
    { id: 3, name: 'Shetahit Farm Solutions Private Limited', radius: '-', employees: 18, createdOn: '29-10-2025' },
    { id: 4, name: 'Geoclaim Energy Private Limited', radius: '-', employees: 30, createdOn: '29-10-2025' },
    { id: 5, name: 'Aayuneer Enterprises', radius: '-', employees: 8, createdOn: '29-10-2025' },
    { id: 6, name: 'Saravya Group', radius: '-', employees: 45, createdOn: '29-10-2025' },
  ];

  const handleEditClick = (branch: any) => {
    setSelectedBranch(branch);
    setIsDrawerOpen(true);
  };

  return (
    <div style={{ padding: '1.5rem', backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', backgroundColor: 'white', padding: '1rem', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <h1 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ChevronDown size={20} style={{ transform: 'rotate(90deg)', color: '#6b7280' }} /> Manage Branch
        </h1>
        <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
          <span style={{ fontWeight: '600', color: '#111827' }}>Note:</span> To create a new branch contact Payroll Support Team
        </div>
      </div>

      {/* Table Container */}
      <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ backgroundColor: '#eff6ff', borderBottom: '1px solid #e5e7eb' }}>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Location Name <ChevronsUpDown size={14} color="#9ca3af" /></div>
                </th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Allowed Radius (Meter) <ChevronsUpDown size={14} color="#9ca3af" /></div>
                </th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Assigned Employees <ChevronsUpDown size={14} color="#9ca3af" /></div>
                </th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.25rem' }}>Created On <ChevronsUpDown size={14} color="#9ca3af" /></div>
                </th>
                <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#374151', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.map((branch, idx) => (
                <tr key={branch.id} style={{ borderBottom: idx === branches.length - 1 ? 'none' : '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#111827' }}>{branch.name}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{branch.radius}</td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span 
                      style={{ color: '#0ea5e9', cursor: 'pointer' }}
                      onClick={() => setViewingEmployees(branch)}
                    >
                      {branch.employees}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>{branch.createdOn}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button 
                      onClick={() => handleEditClick(branch)}
                      style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '0.25rem', cursor: 'pointer', color: '#6b7280', display: 'inline-flex' }}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
</div>
        </div>

        {/* Pagination */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', borderTop: '1px solid #e5e7eb' }}>
          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Showing 1 to {branches.length} of {branches.length} Results
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.25rem 0.5rem' }}>
              <select 
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                style={{ border: 'none', background: 'transparent', fontSize: '0.875rem', color: '#374151', outline: 'none' }}
              >
                <option value={10}>10 / Page</option>
                <option value={20}>20 / Page</option>
                <option value={50}>50 / Page</option>
              </select>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
              <button style={{ padding: '0.375rem 0.75rem', border: '1px solid #d1d5db', backgroundColor: 'white', color: '#9ca3af', borderRadius: '6px', fontSize: '0.875rem', cursor: 'not-allowed' }}>Previous</button>
              <button style={{ padding: '0.375rem 0.75rem', border: 'none', backgroundColor: '#0ea5e9', color: 'white', borderRadius: '6px', fontSize: '0.875rem', cursor: 'pointer' }}>1</button>
              <button style={{ padding: '0.375rem 0.75rem', border: '1px solid #d1d5db', backgroundColor: 'white', color: '#9ca3af', borderRadius: '6px', fontSize: '0.875rem', cursor: 'not-allowed' }}>Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Modify Branch Drawer Overlay */}
      {isDrawerOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          {/* Drawer Panel */}
          <div style={{ width: '450px', backgroundColor: 'white', height: '100%', maxHeight: '100%', display: 'flex', flexDirection: 'column', boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', animation: 'slideIn 0.3s ease-out' }}>
            {/* Drawer Header */}
            <div style={{ padding: '1.25rem', borderBottom: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#f9fafb' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>Modify Branch</h2>
              <button onClick={() => setIsDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}>
                <X size={20} />
              </button>
            </div>

            {/* Drawer Body - Scrollable */}
            <div style={{ padding: '1.5rem', flex: 1, overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#374151', margin: 0 }}>Branch Details</h3>
              
              {/* Logo Upload */}
              <div style={{ border: '1px dashed #d1d5db', borderRadius: '8px', padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: '#f9fafb' }}>
                <div style={{ width: '60px', height: '60px', border: '1px dashed #d1d5db', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#6b7280', backgroundColor: 'white' }}>
                  <Upload size={16} />
                  <span style={{ fontSize: '0.625rem', marginTop: '0.25rem' }}>Logo</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', flex: 1, lineHeight: '1.4' }}>
                  Drag and drop your logo's PNG, JPG, or SVG files here (max 20 MB), or. <span style={{ color: '#0ea5e9', cursor: 'pointer' }}>Browse to replace</span>
                </div>
              </div>

              {/* Form Fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Location Name <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" defaultValue={selectedBranch?.name} style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>GSTIN</label>
                <input type="text" placeholder="e.g. 27AANCP0816H1ZC" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Mobile number</label>
                <input type="text" placeholder="Please Enter Mobile Number" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Address</label>
                <input type="text" placeholder="e.g. 101, Pramila Apartments..." style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Landmark</label>
                <input type="text" placeholder="Please Enter Landmark" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
              </div>

              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Pin Code</label>
                  <input type="text" placeholder="e.g. 440025" style={{ padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>City</label>
                  <div style={{ position: 'relative' }}>
                    <select style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', appearance: 'none', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      <option>Nagpur</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>State</label>
                  <div style={{ position: 'relative' }}>
                    <select style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', appearance: 'none', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      <option>Maharashtra</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Country</label>
                  <div style={{ position: 'relative' }}>
                    <select style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', appearance: 'none', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                      <option>India</option>
                    </select>
                    <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Industry Type</label>
                <div style={{ position: 'relative' }}>
                  <select style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', appearance: 'none', outline: 'none', backgroundColor: 'white' , maxWidth: '100%', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <option>Please select industry type</option>
                  </select>
                  <ChevronDown size={14} style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280', pointerEvents: 'none' }} />
                </div>
              </div>

              <div style={{ borderTop: '1px solid #e5e7eb', margin: '0.5rem -1.5rem', width: 'calc(100% + 3rem)' }}></div>
              
              <h3 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#111827', margin: '0 0 0.5rem 0' }}>Geo Fencing Details</h3>
              
              <div className="responsive-grid">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Latitude <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" placeholder="Please Enter Latitude" style={{ width: '100%', boxSizing: 'border-box', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Longitude <span style={{ color: '#ef4444' }}>*</span></label>
                  <input type="text" placeholder="Please Enter Longitude" style={{ width: '100%', boxSizing: 'border-box', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label style={{ fontSize: '0.75rem', fontWeight: '500', color: '#374151' }}>Allowed Radius (max 200 meter) <span style={{ color: '#ef4444' }}>*</span></label>
                <input type="text" placeholder="Please Enter Allowed Radius" style={{ width: '100%', boxSizing: 'border-box', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.875rem', outline: 'none' }} />
                <span style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>This will be used to limit the attendance area from mobile app</span>
              </div>

              <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden', marginTop: '0.5rem', marginBottom: '1rem' }}>
                <div style={{ backgroundColor: '#e0f2fe', padding: '0.875rem 1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>
                  <Map size={18} color="#0ea5e9" />
                  <span style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0f172a' }}>How to Find Latitude and Longitude of a location</span>
                </div>
                <div style={{ backgroundColor: 'white', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#334155' }}>Choose any of Options below</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#0f172a', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                      <Smartphone size={16} /> Android/iPhone
                    </button>
                    <button style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: 'white', color: '#0f172a', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                      <Monitor size={16} /> Laptop/PC
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Footer */}
            <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid #e5e7eb', display: 'flex', justifyContent: 'flex-end', backgroundColor: '#eff6ff' }}>
              <button style={{ padding: '0.5rem 1.25rem', backgroundColor: '#93c5fd', color: 'white', border: 'none', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', cursor: 'not-allowed' }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Drawer for Employee List */}
      {viewingEmployees && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', justifyContent: 'flex-end' }}>
          
          {/* Drawer Panel */}
          <div style={{ 
            width: '100%', maxWidth: '600px', backgroundColor: 'white', height: '100%', maxHeight: '100%',
            boxShadow: '-4px 0 15px rgba(0,0,0,0.1)', display: 'flex', flexDirection: 'column',
            animation: 'slideIn 0.3s ease-out forwards'
          }}>
            
            {/* Header */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', backgroundColor: '#f0f9ff', borderBottom: '1px solid #e0f2fe' }}>
              <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: '#0369a1' }}>
                {viewingEmployees.name} - Employees
              </h3>
              <button 
                onClick={() => setViewingEmployees(null)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', padding: '0.25rem' }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              
              <div>
                <span style={{ border: '1px solid #d1d5db', borderRadius: '6px', padding: '0.375rem 0.75rem', fontSize: '0.875rem', fontWeight: '500', color: '#374151', display: 'inline-block' }}>
                  Active: {viewingEmployees.employees}
                </span>
              </div>

              <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
                <div className="table-responsive-wrapper" style={{ overflowX: 'auto', width: '100%' }}>
<table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                    <tr>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Employee ID</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Employee Name</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Employee Tag</th>
                      <th style={{ padding: '0.75rem 1rem', fontSize: '0.75rem', fontWeight: '600', color: '#4b5563', whiteSpace: 'nowrap' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewingEmployees.employees === 0 ? (
                      <tr>
                        <td colSpan={4} style={{ padding: '2rem 1rem', textAlign: 'center', color: '#6b7280', fontSize: '0.875rem' }}>
                          No employees found in this branch.
                        </td>
                      </tr>
                    ) : (
                      Array.from({ length: viewingEmployees.employees }).map((_, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#374151' }}>
                            EMP{String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', color: '#111827', fontWeight: '500' }}>
                            {['Atharva Kale', 'Himanshu Dhote', 'Vedant Lonare', 'Pratik Wankhede'][idx % 4]}
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.375rem' }}>
                              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }}></div>
                              <span style={{ color: '#10b981', fontWeight: '500' }}>Active</span>
                            </div>
                          </td>
                          <td style={{ padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                            <span 
                              onClick={() => setViewingProfile({
                                id: `EMP${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`,
                                name: ['Atharva Kale', 'Himanshu Dhote', 'Vedant Lonare', 'Pratik Wankhede'][idx % 4],
                                dept: viewingEmployees.name,
                                role: 'Team Member',
                                status: 'Active',
                                date: '01 Jan 2026'
                              })}
                              style={{ color: '#0ea5e9', textDecoration: 'underline', textUnderlineOffset: '2px', cursor: 'pointer' }}
                            >
                              View Profile
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
</div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* View Profile Modal */}
      {viewingProfile && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100 }}>
          <div style={{ backgroundColor: 'white', borderRadius: '8px', width: '100%', maxWidth: '400px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setViewingProfile(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#e0f2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0ea5e9' }}>
                <User size={40} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '600', color: '#111827' }}>{viewingProfile.name}</h3>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>{viewingProfile.id}</p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', textAlign: 'left', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '8px' }}>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Branch</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{viewingProfile.dept}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Designation</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{viewingProfile.role}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Status</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: viewingProfile.status === 'Active' ? '#10b981' : '#ef4444' }}>{viewingProfile.status}</p>
              </div>
              <div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: '#6b7280' }}>Date of Joining</p>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>{viewingProfile.date}</p>
              </div>
            </div>

            <button onClick={() => setViewingProfile(null)} style={{ padding: '0.5rem 1rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', color: '#374151', cursor: 'pointer', fontWeight: '500', fontSize: '0.875rem' }}>Close</button>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
