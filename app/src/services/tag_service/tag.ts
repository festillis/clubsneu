import { Prisma } from '@prisma/client';
import { prisma } from '~/prisma';

// Must run server-side
export const createTag = (input: Prisma.TagCreateInput) => {
  return prisma.tag.create({
    data: input
  });
};

// Must run server-side
export const deleteTag = (id: string) => {
  return prisma.tag.delete({
    where: { id }
  });
};
