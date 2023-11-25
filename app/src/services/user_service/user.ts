import { prisma } from '~/prisma';
import { Prisma } from '@prisma/client';

// Must run server-side
export const userExists = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });

  return !!user;
};

// Must run server-side
export const getUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  return user;
};

// Must run server-side
export const createUser = async (input: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data: input
  });
  return user;
};

// Must run server-side
export const updateUser = async (id: string, input: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { id },
    data: input
  });
  return user;
};
