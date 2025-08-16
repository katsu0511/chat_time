import type { AuthOptions, User, Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getUserForLogin, getUser } from '@/lib/getter';
import { compare } from 'bcrypt';
import type { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        userId: { label: 'UserID', type: 'text', placeholder: 'User ID' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' }
      },
      async authorize(credentials: Record<'userId' | 'password', string> | undefined) {
        if (!credentials) return null;
        const user = await getUserForLogin(credentials.userId);
        if (!user) return null;
        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;
        return await getUser(credentials.userId, user.password);
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
