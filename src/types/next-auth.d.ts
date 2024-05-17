import NextAuth, {DefaultSession} from 'next-auth';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    idToken?: string;
  }

  interface JWT {
    idToken?: string;
  }
}
