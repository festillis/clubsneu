import { onAuthStateChanged } from 'firebase/auth';
import { clientAuth } from '~/firebase';
import { setIsAuthenticated } from './auth_store';
import server$ from 'solid-start/server';
import {
  setAccessToken,
  startMonitoringAccessTokenSession,
  stopMonitoringAccessTokenSession
} from '~/services/auth_service/monitor';
import { AuthProvider } from '~/services/auth_service';
import { logout } from '~/services/auth_service/logout';
import { getUserById } from '~/services/user_service';

const serverGetUserCredentials = server$(async (id: string) => {
  const user = await getUserById(id);

  if (!user) {
    throw new Error('User not found');
  }

  return {
    accessToken: user.accessToken,
    refreshToken: user.refreshToken,
    accessTokenExpiry: user.accessTokenExpiry,
    provider: user.provider
  };
});

onAuthStateChanged(clientAuth, async (user) => {
  if (user) {
    try {
      const { accessToken, refreshToken, accessTokenExpiry, provider } =
        await serverGetUserCredentials(user.uid);

      console.log({
        accessToken,
        refreshToken,
        accessTokenExpiry,
        provider
      });

      startMonitoringAccessTokenSession(
        user.uid,
        provider as AuthProvider,
        refreshToken,
        accessTokenExpiry
      );

      setAccessToken(accessToken);
      setIsAuthenticated(true);

      console.log('User is signed in');
      console.log(user);
    } catch (e) {
      console.error(e);
      await logout();
      return;
    }
  } else {
    setAccessToken(null);
    stopMonitoringAccessTokenSession();
    setIsAuthenticated(false);

    console.log('No user signed in');
  }
});
