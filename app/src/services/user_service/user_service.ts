import { prisma } from '~/prisma';
import { Prisma } from '@prisma/client';
import { envVars } from '~/env';
import { ApiClient } from '~/api_client';

export const userExists = async (id: string, accessToken: string) => {};

export const findUserById = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id }
  });
  return user;
};

export const createUser = async (input: Prisma.UserCreateInput) => {
  const user = await prisma.user.create({
    data: input
  });
  return user;
};

export const updateUser = async (id: string, input: Prisma.UserUpdateInput) => {
  const user = await prisma.user.update({
    where: { id },
    data: input
  });
  return user;
};
