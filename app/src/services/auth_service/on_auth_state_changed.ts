import { onAuthStateChanged } from 'firebase/auth';
import { clientAuth } from '~/firebase';
import { logout } from '~/services/auth_service/logout';
import { onCleanup } from 'solid-js';
import {
  startMonitoringAccessTokenSession,
  stopMonitoringAccessTokenSession
} from './monitor';
import { setAccessToken } from './access_token';
import { authStore } from '~/stores';
import { AuthProvider } from './types';
import { flags } from '~/constants';
import { setProvider } from './provider';
import server$ from 'solid-start/server';
import { userService } from '..';

const serverGetUserById = server$(async (id: string) =>
  userService.getUserById(id)
);

const authChangedUnsubscribe = onAuthStateChanged(clientAuth, async (user) => {
  if (flags.DISABLE_AUTH) {
    console.log('Auth disabled');
    return;
  }

  if (user) {
    // Force fetch user info
    const dbUser = await serverGetUserById(user.uid);

    if (!dbUser) {
      console.error('User not found. Logging out...');
      await logout();
      return;
    }

    startMonitoringAccessTokenSession(
      dbUser.accessToken,
      dbUser.provider as AuthProvider,
      dbUser.refreshToken,
      dbUser.accessTokenExpiry
    );
    setAccessToken(dbUser.accessToken);
    setProvider(dbUser.provider as AuthProvider);
    authStore.setIsAuthenticated(true);

    console.log(`User is signed in as ${dbUser.email}`);
  } else {
    setAccessToken(null);
    setProvider(null);
    stopMonitoringAccessTokenSession();
    authStore.setIsAuthenticated(false);

    console.log('No user signed in');
  }
});

onCleanup(() => {
  authChangedUnsubscribe();
});
