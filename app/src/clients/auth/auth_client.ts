import { AuthProvider } from '~/services/auth';
import { NewCredentials } from './types';
import { api } from '~/api_client';

export const getNewCredentialsWithRefreshToken = async (
  userId: string,
  provider: AuthProvider,
  refreshToken: string
) => {
  return api.req<NewCredentials>('POST', {
    url: `/auth/refresh/${provider}`,
    params: {
      userId,
      refreshToken
    }
  });
};
