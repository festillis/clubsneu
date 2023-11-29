import { Prisma } from '@prisma/client';
import { prisma } from '~/prisma';

const getClubById = async (id: string) => {
  const club = await prisma.club.findUnique({
    where: { id }
  });
  return club;
};

export const clubExists = async (id: string) => {
  const club = await getClubById(id);
  return !!club;
};

export const createClub = async (input: Prisma.ClubCreateInput) => {
  return await prisma.club.create({
    data: input
  });
};

export const deleteClub = async (id: string) => {
  return await prisma.club.delete({
    where: { id }
  });
};

export const addOwnerToClub = async (clubId: string, userId: string) => {
  return await prisma.club.update({
    where: { id: clubId },
    data: {
      owners: {
        connect: {
          id: userId
        }
      }
    }
  });
};
