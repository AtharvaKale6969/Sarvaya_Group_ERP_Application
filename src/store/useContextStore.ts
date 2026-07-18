import { create } from 'zustand';

export interface OrgHierarchy {
  name: string;
  departments: {
    name: string;
    subDepartments?: string[];
  }[];
}

export const ORGANIZATIONS: OrgHierarchy[] = [
  {
    name: 'Plastroots Waste Management & Solutions Private Limited',
    departments: [
      { name: 'RMT' },
      { name: 'Government Services' },
      { 
        name: 'Corporate Compliance',
        subDepartments: ['Carbon Advisory', 'ESG Consulting', 'EPR Compliance']
      }
    ]
  },
  {
    name: 'Plastroots Foundation',
    departments: [
      { name: 'CSR' },
      { name: 'IEC' },
      { name: 'RRC' }
    ]
  },
  {
    name: 'Shetahit Farm Solutions Private Limited',
    departments: [
      { name: 'FVF' },
      { name: 'MPD' }
    ]
  },
  {
    name: 'Geoclaim Energy Private Limited',
    departments: [
      { name: 'Biogas' },
      { name: 'Biomass' },
      { name: 'Shredding Unit' },
      { name: 'PMS' }
    ]
  },
  {
    name: 'Aayuneer Enterprises',
    departments: [
      { name: 'Flow Up' },
      { name: 'Zoo Platform' }
    ]
  },
  {
    name: 'Sarvaya Group',
    departments: [
      { name: 'HQ / Operations' }
    ]
  }
];

export const ROLES = ['BDE', 'Ops', 'Lead'];

interface ContextState {
  activeOrg: string;
  activeDept: string;
  activeSubDept: string | null;
  activeRole: string;
  
  setContext: (org: string, dept: string, subDept: string | null, role: string) => void;
  setActiveOrg: (org: string) => void;
  setActiveDept: (dept: string) => void;
  setActiveSubDept: (subDept: string | null) => void;
  setActiveRole: (role: string) => void;
}

export const useContextStore = create<ContextState>((set, get) => ({
  activeOrg: ORGANIZATIONS[0].name,
  activeDept: ORGANIZATIONS[0].departments[0].name,
  activeSubDept: null,
  activeRole: ROLES[0],

  setContext: (org, dept, subDept, role) => set({ activeOrg: org, activeDept: dept, activeSubDept: subDept, activeRole: role }),
  
  setActiveOrg: (org) => {
    const orgData = ORGANIZATIONS.find(o => o.name === org);
    if (orgData) {
      const firstDept = orgData.departments[0];
      set({ 
        activeOrg: org, 
        activeDept: firstDept.name, 
        activeSubDept: firstDept.subDepartments ? firstDept.subDepartments[0] : null 
      });
    }
  },
  
  setActiveDept: (dept) => {
    const { activeOrg } = get();
    const orgData = ORGANIZATIONS.find(o => o.name === activeOrg);
    if (orgData) {
      const deptData = orgData.departments.find(d => d.name === dept);
      set({ 
        activeDept: dept, 
        activeSubDept: deptData?.subDepartments ? deptData.subDepartments[0] : null 
      });
    }
  },

  setActiveSubDept: (subDept) => set({ activeSubDept: subDept }),
  
  setActiveRole: (role) => set({ activeRole: role }),
}));
