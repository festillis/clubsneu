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
export const getClubOwnerById = async (clubId: string, userId: string) => {
  const clubOwner = await prisma.clubOwner.findUnique({
    where: {
      userId_clubId: {
        userId,
        clubId
      }
    }
  });

  if (!clubOwner) {
    throw new Error(`Club owner with id ${userId} not found`);
  }

  return clubOwner;
};

// Must run server-side
export const getOwnerIdsForClub = async (clubId: string) => {
  const clubOwners = await prisma.clubOwner.findMany({
    where: { clubId },
    select: {
      userId: true
    }
  });

  return clubOwners.map((clubOwner) => clubOwner.userId);
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
export const addOwnerToClub = async (input: {
  userId: string;
  clubId: string;
  role: string;
}) => {
  return await prisma.clubOwner.create({
    data: input
  });
};

// Must run server-side
export const deleteOwnerFromClub = async (userId: string, clubId: string) => {
  return await prisma.clubOwner.delete({
    where: {
      userId_clubId: {
        userId,
        clubId
      }
    }
  });
};

// Must run server-side
export const deleteAllClubOwners = async () => {
  return await prisma.clubOwner.deleteMany();
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

  if (!clubWithTags) {
    throw new Error(`Club with id ${clubId} not found`);
  }

  return clubWithTags.tags;
};
