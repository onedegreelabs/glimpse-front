import {create} from 'zustand';
// google sso
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
//

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
// google sso
const handler = NextAuth({  
	providers: [
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID || '', 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
	  }),
	],
});

export { handler as GET, handler as POST };
//