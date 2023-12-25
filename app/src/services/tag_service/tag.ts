import { Prisma } from '@prisma/client';
import { prisma } from '~/prisma';

// Must run server-side
export const createTag = async (input: Prisma.TagCreateInput) => {
  return await prisma.tag.create({
    data: input
  });
};

// Must run server-side
export const deleteTag = async (id: string) => {
  return await prisma.tag.delete({
    where: { id }
  });
};

// Must run server-side
export const getTags = async () => {
  return await prisma.tag.findMany();
};
