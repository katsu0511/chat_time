'use server';

import { Prisma } from '@/generated/prisma';
import prisma from './prisma';
import hashedPassword from './hashPassword';

export async function createUser(data: {name: string, userid: string, password: string}) {
  try {
    data.password = await hashedPassword(data.password);
    const user = await prisma.user.create({
      data,
      select: {
        id: true,
        userid: true,
        name: true
      }
    });
    return user;
  } catch (error) {
    if (error instanceof Error) {
      if (error.constructor.name === 'PrismaClientKnownRequestError' && (error as Prisma.PrismaClientKnownRequestError).code === 'P2002') {
        console.error('This user ID is already used: ', error.message);
        return `This user ID is already used.`;
      } else {
        console.error('General error: ', error);
        return `General error`;
      }
    } else {
      console.error('Unknown error: ', error);
      return `Unknown error`;
    }
  }
}

export async function addFriend(id: number, friend_id: number) {
  const friendStatus = await prisma.friend.findFirst({
    where: {
      OR: [
        { id: id, friend_id: friend_id },
        { id: friend_id, friend_id: id }
      ]
    }
  });

  if (friendStatus) return 0;

  const rows = await prisma.friend.createMany({
    data: [
      { id: id, friend_id: friend_id },
      { id: friend_id, friend_id: id }
    ],
    skipDuplicates: true
  });
  return rows.count;
}
