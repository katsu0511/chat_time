import prisma from './prisma';
import type { User } from 'next-auth';

export async function getUser(userid: string, password: string): Promise<User | null> {
  const userInfo = await prisma.user.findUnique({
    where: {
      userid: userid,
      password: password
    }
  });

  if (!userInfo) return null;

  return {
    id: userInfo.id as unknown as string,
    userid: userInfo.userid,
    name: userInfo.name
  }
}
