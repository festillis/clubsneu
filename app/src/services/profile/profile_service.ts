import { Prisma } from '@prisma/client';
import { prisma } from '~/prisma';

// Must run server-side
export const getProfileByUserId = async (userId: string) => {
  const profile = await prisma.profile.findUnique({
    where: { userId }
  });
  return profile;
};

// Must run server-side
export const createProfile = async (
  input: Prisma.ProfileUncheckedCreateInput
) => {
  const profile = await prisma.profile.create({
    data: input
  });
  return profile;
};

// Must run server-side
export const updateProfile = async (
  userId: string,
  input: Prisma.ProfileUncheckedUpdateInput
) => {
  const profile = await prisma.profile.update({
    where: { userId },
    data: input
  });
  return profile;
};

// Must run server-side
export const deleteAllProfiles = async () => {
  await prisma.profile.deleteMany();
};
