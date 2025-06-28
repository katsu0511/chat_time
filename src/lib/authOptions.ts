import CredentialsProvider from 'next-auth/providers/credentials';
import { getUser } from '@/lib/getter';
import type { Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userid: { label: 'UserID', type: 'text', placeholder: 'User ID' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials: Record<'userid' | 'password', string> | undefined) {
        if (!credentials) return null;
        return await getUser(credentials.userid, credentials.password);
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 7 * 24 * 60 * 60
  },
  session: {
    maxAge: 7 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60
  },
  callbacks: {
    async jwt({ token, user }: {token: JWT, user: User}) {
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }
      return token
    },
    async session({ session, token }: {session: Session, token: JWT}) {
      session.user.id = token.id as string
      return session
    },
  }
}
