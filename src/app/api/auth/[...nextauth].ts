import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({token, account}) {
      if (account) {
        token.idToken = account.id_token;
      }
      return token;
    },
    async session({session, token}) {
      if (token.idToken) {
        session.idToken = token.idToken as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
});

export {handler as GET, handler as POST};
