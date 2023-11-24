import { onAuthStateChanged, signOut } from 'firebase/auth';
import { clientAuth } from '~/firebase';
import {
  setAccessToken,
  setIsAuthenticated,
  startMonitoringAccessTokenSession,
  stopMonitoringAccessTokenSession
} from './auth_store';
import server$ from 'solid-start/server';
import { prisma } from '~/prisma';

const getDbAccessTokenInfo = server$(async (id: string) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id },
      select: { accessToken: true, accessTokenExpiry: true }
    });

    if (!result) {
      return null;
    }

    return {
      accessToken: result.accessToken,
      accessTokenExpiry: result.accessTokenExpiry
    };
  } catch (e) {
    console.error(e);
    return null;
  }
});

onAuthStateChanged(clientAuth, async (user) => {
  if (user) {
    const dbAccessTokenInfoResult = await getDbAccessTokenInfo(user.uid);
    if (!dbAccessTokenInfoResult) {
      console.error('Could not retrieve access token info in db');
      await signOut(clientAuth);
      return;
    }

    const { accessToken, accessTokenExpiry } = dbAccessTokenInfoResult;

    startMonitoringAccessTokenSession(user.uid, accessTokenExpiry);
    setAccessToken(accessToken);
    setIsAuthenticated(true);

    console.log('User is signed in');
    console.log(user);
  } else {
    setAccessToken(null);
    stopMonitoringAccessTokenSession();
    setIsAuthenticated(false);

    console.log('No user signed in');
  }
});
