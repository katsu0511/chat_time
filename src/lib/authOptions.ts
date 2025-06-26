import CredentialsProvider from 'next-auth/providers/credentials';
import { randomUUID, randomBytes } from 'crypto';
import type { User } from 'next-auth';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(
        credentials: Record<'email' | 'password', string> | undefined,
        req: unknown
      ) {

        if (!credentials) return null;
        console.log(req);

        const user: User = {
          id: '1',
          name: 'Katsuya',
          email: 'katsuya@yahoo.com',
        }

        const { email, password } = credentials;

        if (email === 'katsuya@yahoo.com' && password === 'password') {
          return user
        }

        return null
      },
    }),
  ],

  callbacks: {
  },

  secret: process.env.NEXTAUTH_SECRET,

  jwt: {
    maxAge: 3 * 24 * 60 * 60,
  },

  session: {
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
    generateSessionToken: () => {
      return randomUUID?.() ?? randomBytes(32).toString('hex');
    }
  }
}
