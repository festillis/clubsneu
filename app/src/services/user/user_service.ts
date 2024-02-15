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
export const getAllUserIds = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true
    }
  });

  return users.map((user) => user.id);
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

// Must run server-side
export const deleteAllUsers = async () => {
  await prisma.user.deleteMany();
};

// Must run server-side
export const fixRoles = async () => {
  const execResults = await prisma.user.updateMany({
    where: {
      provider: 'google'
    },
    data: {
      role: 'exec'
    }
  });

  const memberResults = await prisma.user.updateMany({
    where: {
      provider: 'microsoft'
    },
    data: {
      role: 'member'
    }
  });

  return {
    members: memberResults.count,
    execs: execResults.count
  };
};
