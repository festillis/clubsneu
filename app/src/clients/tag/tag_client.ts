import { Tag } from '@prisma/client';
import { api } from '~/api_client';

export const getTags = async () => {
  return await api.req<Tag[]>('GET', { url: '/tags' });
};
