import {loginWithGoogle} from '@/network/api';
import _ from 'lodash';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  callbacks: {
    async session({session}) {
      return session;
    },

    async signIn({account}) {
      const googleToken = _.get(account, 'id_token') || '';
      console.log('googleToken');
      console.log(googleToken);

      const response = await loginWithGoogle(googleToken);
      console.log('response');
      console.log(response);

      const token = _.get(response, 'data') || {};

      const accessToken = _.get(token, 'accessToken');
      const refreshToken = _.get(token, 'refreshToken');
      return `/loading?at=${accessToken}&rt=${refreshToken}`;
    },
  },
});
