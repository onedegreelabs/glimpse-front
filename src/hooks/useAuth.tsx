import { create } from 'zustand';

type AuthType = {
  email: string;
  authType: string;
  code: string;
  setEmail: (email: string) => void;
  setAuthType: (authType: string) => void;
  setCode: (code: string) => void;
};

export const useAuth = create<AuthType>((set) => ({
  email: '',
  authType: 'in',
  code: '',
  setEmail: (email) => set({ email }),
  setAuthType: (authType) => set({ authType }),
  setCode: (code) => set({ code })
}));
