import { Profile } from '@prisma/client';
import { api } from '~/api_client';

export const getProfileByUserId = async (id: string): Promise<Profile> => {
  return await api.req<Profile>('GET', {
    url: `/user/${id}/profile`
  });
};
