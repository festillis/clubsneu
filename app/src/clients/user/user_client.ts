import { User } from '@prisma/client';
import { api } from '~/api_client';

export const getUserById = async (id: string): Promise<User> => {
  return await api.authReq<User>('GET', {
    url: `/user/${id}`
  });
};
