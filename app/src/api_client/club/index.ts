import { Club, Tag } from '@prisma/client';
import { api } from '../client';

export const getAllClubIds = async () => {
  return await api.req<string[]>('GET', { url: '/clubs/list' });
};

export const getClubById = async (clubId: string) => {
  console.log('clubId', clubId);
  return api.req<Club>('GET', { url: `/club/${clubId}` });
};

export const getTagsForClub = async (clubId: string) => {
  return api.req<Tag[]>('GET', { url: `/club/${clubId}/tags` });
};
