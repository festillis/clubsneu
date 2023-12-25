import { Safe } from '~/types/safe';
import { User } from '@prisma/client';
import { api } from '../client';
import { toSafe } from '~/utils/safe';

export const getUserById = async (id: string): Promise<Safe<User>> => {
  return await toSafe(() =>
    api.authReq<User>('GET', {
      url: `/user/${id}`
    })
  );
};
