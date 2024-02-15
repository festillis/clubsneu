import { Club, ClubOwner, Tag } from '@prisma/client';
import { api } from '~/api_client';
import { SortBy } from '~/components/Sidebar/types';
import { ClubFilters } from './types';

export const getAllClubIds = async () => {
  return await api.req<string[]>('GET', { url: '/clubs/list' });
};

export const getClubById = async (clubId: string) => {
  return api.req<Club | null>('GET', { url: `/club/${clubId}` });
};

export const getClubIdsByFilter = async (
  filters: ClubFilters,
  orderBy: SortBy
) => {
  return api.req<string[]>('GET', {
    url: `/clubs/list`,
    params: {
      filters: JSON.stringify(filters),
      orderBy
    }
  });
};

export const getTagsForClub = async (clubId: string) => {
  return api.req<Tag[]>('GET', { url: `/club/${clubId}/tags` });
};

export const getOwnerIdsForClub = async (clubId: string) => {
  return api.req<string[]>('GET', { url: `/club/${clubId}/owners/list` });
};

export const getClubOwnerById = async (clubId: string, userId: string) => {
  return api.req<ClubOwner>('GET', { url: `/club/${clubId}/owners/${userId}` });
};
