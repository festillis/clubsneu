import { AuthProvider } from '~/services/auth_service';
import { api } from '../client';
import { toSafe } from '~/utils/safe';
import { NewCredentials } from './types';

export const getNewCredentialsWithRefreshToken = async (
  userId: string,
  provider: AuthProvider,
  refreshToken: string
) => {
  return toSafe(() =>
    api.req<NewCredentials>('POST', {
      url: `/auth/refresh/${provider}`,
      params: {
        userId,
        refreshToken
      }
    })
  );
};
