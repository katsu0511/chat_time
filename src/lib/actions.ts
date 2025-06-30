'use server';

import { Prisma } from '@/generated/prisma';
import prisma from './prisma';

export async function createUser(data: {name: string, userid: string, password: string}) {
  try {
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
