import { AuthProvider } from './types';
import { logout } from './logout';
import { setAccessToken } from './access_token';
import { authClient } from '~/clients';
import { toSafe } from '~/utils/safe';

let accessTokenExpiryTimeout: NodeJS.Timeout | null = null;

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
    console.log('Access token has expired. Need re-authentication');

    const newCredentials = await toSafe(() =>
      authClient.getNewCredentialsWithRefreshToken(
        userId,
        provider,
        refreshToken
      )
    );

    if (newCredentials.hasError) {
      console.error(newCredentials.errorText);
      await logout();
      return;
    }

    setAccessToken(newCredentials.data.accessToken);

    // Recursively call this function to monitor the expiration of the new access token
    startMonitoringAccessTokenSession(
      userId,
      provider,
      newCredentials.data.refreshToken,
      newCredentials.data.accessTokenExpiry
    );
  }, Math.max(timeUntilExpiryMs, 0));
};

export const stopMonitoringAccessTokenSession = () => {
  if (accessTokenExpiryTimeout) {
    clearTimeout(accessTokenExpiryTimeout);
  }

  accessTokenExpiryTimeout = null;
};
