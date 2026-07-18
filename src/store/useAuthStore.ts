import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'

interface Role {
  id: string
  name: string
  organization_id: string | null
  department_id: string | null
}

interface AuthState {
  user: User | null
  roles: Role[]
  loading: boolean
  setUser: (user: User | null) => void
  fetchUserRoles: () => Promise<void>
  signOut: () => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  roles: [],
  loading: true,
  setUser: (user) => set({ user }),
  fetchUserRoles: async () => {
    const { user } = get();
    if (!user) {
      set({ roles: [], loading: false });
      return;
    }
    
    // Fetch mapping from user_roles and join with roles
    const { data, error } = await supabase
      .from('user_roles')
      .select(`
        role_id,
        organization_id,
        department_id,
        roles ( name )
      `)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error fetching roles:', error);
      set({ roles: [], loading: false });
      return;
    }

    const mappedRoles = data.map((ur: any) => ({
      id: ur.role_id,
      name: ur.roles?.name || 'Unknown',
      organization_id: ur.organization_id,
      department_id: ur.department_id
    }));

    set({ roles: mappedRoles, loading: false });
  },
  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, roles: [] });
  }
}))
