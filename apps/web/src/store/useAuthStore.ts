// File: apps/web/src/store/useAuthStore.ts

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isAuthenticated: boolean;
  
  // Actions
  setToken: (token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isAuthenticated: false,

      setToken: (token) => 
        set({ accessToken: token, isAuthenticated: true }),
      
      logout: () => 
        set({ accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'lamman-auth-storage', // Key di LocalStorage
    }
  )
);