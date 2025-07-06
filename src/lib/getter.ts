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

export async function getUserForLogin(userid: string) {
  const userInfo = await prisma.user.findUnique({
    where: {
      userid: userid
    }
  });
  return userInfo;
}

export async function getUsers(name: string): Promise<User[]> {
  const userInfos = await prisma.user.findMany({
    where: {
      OR: [
        { name: { contains: name } },
        { userid: { contains: name } }
      ]
    }
  });

  const users: User[] = userInfos.map(value => ({
    id: value.id as unknown as string,
    userid: value.userid,
    name: value.name
  }));

  return users;
}
