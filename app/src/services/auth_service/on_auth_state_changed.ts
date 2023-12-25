import { onAuthStateChanged } from 'firebase/auth';
import { clientAuth } from '~/firebase';
import { logout } from '~/services/auth_service/logout';
import { onCleanup } from 'solid-js';
import {
  startMonitoringAccessTokenSession,
  stopMonitoringAccessTokenSession
} from './monitor';
import { getAccessToken, setAccessToken } from './access_token';
import { authStore } from '~/stores';
import { AuthProvider } from './types';
import { flags } from '~/constants';
import { setProvider } from './provider';
import { userClient } from '~/api_client';

const authChangedUnsubscribe = onAuthStateChanged(clientAuth, async (user) => {
  if (flags.DISABLE_AUTH) {
    console.log('Auth disabled');
    return;
  }

  // Access token should be populated from `routes/login.tsx`
  const accessToken = getAccessToken();
  console.log('Access token', accessToken);

  if (user && accessToken) {
    const dbUser = await userClient.getUserById(user.uid);

    if (dbUser.hasError) {
      console.error(dbUser.errorText);
      await logout();
      return;
    }

    startMonitoringAccessTokenSession(
      dbUser.data.accessToken,
      dbUser.data.provider as AuthProvider,
      dbUser.data.refreshToken,
      dbUser.data.accessTokenExpiry
    );
    setAccessToken(accessToken);
    authStore.setIsAuthenticated(true);

    console.log(`User is signed in as ${dbUser.data.email}`);
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
