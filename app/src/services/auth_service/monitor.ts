import { api } from '~/api_client';
import { AuthProvider } from './types';
import { getProviderName } from './utils';
import { logout } from './logout';

// UI re-render not needed, so stored as a normal variable
let accessToken: string | null = null;
let accessTokenExpiryTimeout: NodeJS.Timeout | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const startMonitoringAccessTokenSession = (
  userId: string,
  provider: AuthProvider,
  refreshToken: string,
  accessTokenExpiry: Date
) => {
  console.log('Starting monitoring access token session');

  const accessTokenExpiryMs = new Date(accessTokenExpiry).getTime();
  const nowMs = new Date().getTime();
  const timeUntilExpiryMs = accessTokenExpiryMs - nowMs;

  accessTokenExpiryTimeout = setTimeout(async () => {
    try {
      console.log('Access token has expired. Need re-authentication');

      const newCredentialsResponse = await api.req<{
        accessToken: string;
        refreshToken: string;
        accessTokenExpiry: Date;
      }>('POST', {
        url: `/auth/refresh/${getProviderName(provider)}`,
        params: {
          userId,
          refreshToken
        }
      });

      console.log('newCredentialsResponse', newCredentialsResponse);

      if (newCredentialsResponse.hasError) {
        console.error('Could not refresh access token');
        throw new Error(newCredentialsResponse.errorText);
      }

      const {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        accessTokenExpiry: newAccessTokenExpiry
      } = newCredentialsResponse.data;

      setAccessToken(newAccessToken);

      // Recursively call this function to monitor the expiration of the new access token
      startMonitoringAccessTokenSession(
        userId,
        provider,
        newRefreshToken,
        newAccessTokenExpiry
      );
    } catch (e) {
      console.error(e);
      await logout();
      return;
    }
  }, Math.max(timeUntilExpiryMs, 0));
};

export const stopMonitoringAccessTokenSession = () => {
  if (accessTokenExpiryTimeout) {
    clearTimeout(accessTokenExpiryTimeout);
  }

  accessTokenExpiryTimeout = null;
};
