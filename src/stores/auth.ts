import {create} from 'zustand';

interface isLoginStore {
  isLogin: Boolean;
  setIsLogin: (isLogin: Boolean) => void;
}

export const useIsLoginStore = create<isLoginStore>(set => ({
  isLogin: true,
  setIsLogin: (isLogin: Boolean) => {
    set({
      isLogin,
    });
  },
}));
