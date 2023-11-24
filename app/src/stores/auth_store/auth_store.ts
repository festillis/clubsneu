import { User } from '@prisma/client';
import { createSignal } from 'solid-js';
import server$ from 'solid-start/server';
import { ApiClient, api } from '~/api_client';
import { prisma } from '~/prisma';
import { authService } from '~/services';
import { toSafe } from '~/utils/safe';

// UI re-render not needed, so stored as a normal variable
export let accessToken: string | null = null;
let accessTokenExpiryTimeout: NodeJS.Timeout | null = null;

export const [isAuthenticated, setIsAuthenticated] = createSignal(false);
export const [needsReauth, setNeedsReauth] = createSignal(false);

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

export const signInWithMicrosoft = async () => {
  return await toSafe(() => authService.signIn('microsoft.com'));
};

export const signInWithGoogle = async () => {
  return await toSafe(() => authService.signIn('google.com'));
};

export const signOut = async () => {
  await authService.signOut();
};

const getDbRefreshToken = server$(async (id: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
      select: { refreshToken: true }
    });

    if (!result) {
      return null;
    }

    return result.refreshToken;
  } catch (e) {
    console.error(e);
    return null;
  }
});

export const startMonitoringAccessTokenSession = (
  userId: string,
  accessTokenExpiry: Date
) => {
  console.log(
    'Starting monitoring access token session',
    userId,
    accessTokenExpiry
  );
  const accessTokenExpiryMs = new Date(accessTokenExpiry).getTime();
  const nowMs = new Date().getTime();
  const timeUntilExpiryMs = accessTokenExpiryMs - nowMs;

  accessTokenExpiryTimeout = setTimeout(async () => {
    console.log('Access token has expired. Need re-authentication');
    const refreshToken = await getDbRefreshToken(userId);

    if (!refreshToken) {
      console.error('Could not retrieve refresh token in db');
      await signOut();
      return;
    }

    const newAccessTokenResult = await api.req<{ accessToken: string }>(
      'POST',
      {
        url: '/auth/refresh',
        params: {
          userId,
          refreshToken
        }
      }
    );

    if (newAccessTokenResult.hasError) {
      console.error('Could not refresh access token');
      await signOut();
      return;
    }

    const newAccessToken = newAccessTokenResult.data.accessToken;
    setAccessToken(newAccessToken);
  }, Math.max(timeUntilExpiryMs, 0));
};

export const stopMonitoringAccessTokenSession = () => {
  if (accessTokenExpiryTimeout) {
    clearTimeout(accessTokenExpiryTimeout);
  }

  accessTokenExpiryTimeout = null;
};
