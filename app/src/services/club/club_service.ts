import { Prisma } from '@prisma/client';
import { prisma } from '~/prisma';

// Must run server-side
export const getClubById = async (id: string) => {
  const club = await prisma.club.findUnique({
    where: { id }
  });
  return club;
};

// Must run server-side
export const getClubWithTagsById = async (id: string) => {
  const club = await prisma.club.findUnique({
    where: { id },
    include: {
      tags: true
    }
  });
  return club;
};

// Must run server-side
export const getClubIdsByFilter = async (
  filter: Prisma.ClubWhereInput,
  orderBy: Prisma.ClubOrderByWithRelationInput
) => {
  const clubs = await prisma.club.findMany({
    where: filter,
    orderBy,
    select: {
      id: true
    }
  });

  return clubs.map((club) => club.id);
};

// Must run server-side
export const getClubs = async () => {
  return await prisma.club.findMany();
};

// Must run server-side
export const getAllClubIds = async () => {
  const response = await prisma.club.findMany({
    select: {
      id: true
    }
  });

  return response.map((club) => club.id);
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
export const deleteAllClubs = async () => {
  return await prisma.club.deleteMany();
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
export const addTagToClub = async (clubId: string, tagId: string) => {
  return await prisma.club.update({
    where: { id: clubId },
    data: {
      tags: {
        connect: {
          id: tagId
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

// Must run server-side
export const getTagsForClub = async (clubId: string) => {
  const clubWithTags = await prisma.club.findUnique({
    where: { id: clubId },
    select: {
      tags: true
    }
  });

  // console.log('getTagsForClub', clubId, clubWithTags);

  if (!clubWithTags) {
    throw new Error(`Club with id ${clubId} not found`);
  }

  return clubWithTags.tags;
};
