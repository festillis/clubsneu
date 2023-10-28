import { User } from '@prisma/client';
import prisma from '../../utils/prisma_client';
import { CreateUserInput } from './user.schema';

export const findUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({
    where: {
      id
    }
  });

  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }

  return user;
};

export const createUser = async (input: CreateUserInput): Promise<User> => {
  const user = await prisma.user.create({
    data: input
  });
  return user;
};
