import {create} from 'zustand';

type AuthType = {
  status: 'email' | 'code';
  email: string;
  setStatus: (status: 'email' | 'code') => void;
  setEmail: (email: string) => void;
};

export const useAuth = create<AuthType>(set => ({
  status: 'email',
  email: '',
  setStatus: status => set({status}),
  setEmail: email => set({email}),
}));
