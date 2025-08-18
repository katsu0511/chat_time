import { Session, getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export const getAuthSession = (): Promise<Session | null> => {
  return getServerSession(authOptions);
}
