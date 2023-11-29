import { Prisma } from '@prisma/client';
import { prisma } from '~/prisma';

// Must run server-side
const getClubById = async (id: string) => {
  const club = await prisma.club.findUnique({
    where: { id }
  });
  return club;
};

// Must run server-side
export const clubExists = async (id: string) => {
  const club = await getClubById(id);
  return !!club;
};

// Must run server-side
export const createClub = async (input: Prisma.ClubCreateInput) => {
  return await prisma.club.create({
    data: input
  });
};

// Must run server-side
export const deleteClub = async (id: string) => {
  return await prisma.club.delete({
    where: { id }
  });
};

// Must run server-side
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

// Must run server-side
export const updateClubCalendarUrl = async (
  clubId: string,
  calendarUrl: string
) => {
  return await prisma.club.update({
    where: { id: clubId },
    data: {
      calendarUrl
    }
  });
};
