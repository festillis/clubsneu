import { APIEvent, json, redirect } from 'solid-start';
import { prisma } from '~/prisma';
import { getDateFromNow } from '~/utils/date';
import { google } from 'googleapis';
import { envVars } from '~/env';
import {
  cert,
  initializeApp as initializeAdminApp,
  getApps as getAdminApps,
  getApp as getAdminApp
} from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { googleOAuth2Client } from '~/oauth2/google';

// Must initialize Firebase Admin SDK server-side
const firebaseAdminConfig = {
  credential: cert({
    projectId: envVars.FIREBASE_PROJECT_ID,
    clientEmail: envVars.FIREBASE_ADMIN_CLIENT_EMAIL,
    privateKey: envVars.VITE_FIREBASE_ADMIN_PRIVATE_KEY
  })
};

const adminApp = !getAdminApps().length
  ? initializeAdminApp(firebaseAdminConfig, 'admin')
  : getAdminApp('admin');

const adminAuth = getAdminAuth(adminApp);

const getAuthUserByEmail = async (email: string) => {
  try {
    return await adminAuth.getUserByEmail(email);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return null;
    }

    throw error;
  }
};

const createNewAuthUser = async (email: string, name: string) => {
  return await adminAuth.createUser({
    email,
    displayName: name,
    emailVerified: true,
    providerToLink: {
      providerId: 'google.com'
    }
  });
};

const createNewDbUser = async (
  id: string,
  email: string,
  name: string,
  accessToken: string,
  refreshToken: string
) => {
  return await prisma.user.create({
    data: {
      id,
      email,
      name,
      accessToken,
      refreshToken,
      accessTokenExpiry: getDateFromNow({ minutes: 55 })
    }
  });
};

export const updateTokens = async (
  userId: string,
  refreshToken: string,
  accessToken: string,
  updateRefresh = true
) => {
  if (updateRefresh) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken,
        accessToken,
        accessTokenExpiry: getDateFromNow({ minutes: 55 })
      }
    });
  }

  return await prisma.user.update({
    where: { id: userId },
    data: {
      accessToken,
      accessTokenExpiry: getDateFromNow({ minutes: 55 })
    }
  });
};

const createFirebaseToken = async (userId: string) => {
  return await adminAuth.createCustomToken(userId);
};

export const GET = async ({ request }: APIEvent) => {
  try {
    const url = new URL(request.url);
    const authCode = url.searchParams.get('code');

    if (!authCode) {
      return json(
        { error: 'No authorization code provided. Invalid login process.' },
        { status: 400 }
      );
    }

    const { tokens } = await googleOAuth2Client.getToken(authCode);
    const { refresh_token, access_token } = tokens;
    if (!refresh_token || !access_token) {
      return json(
        { error: 'No refresh token and/or access token provided' },
        { status: 400 }
      );
    }

    googleOAuth2Client.setCredentials(tokens);
    console.log({
      refresh_token,
      access_token
    });

    const oauth2 = google.oauth2({
      auth: googleOAuth2Client,
      version: 'v2'
    });
    const userInfo = await oauth2.userinfo.get();

    console.log(userInfo);

    const { email, name } = userInfo.data;
    if (!email || !name) {
      return json({ error: 'Missing email and/or name' }, { status: 400 });
    }

    const authUser = await getAuthUserByEmail(email);
    if (!authUser) {
      console.log('Auth user does not exist. Creating new user...');
      const createdAuthUser = await createNewAuthUser(email, name);
      await createNewDbUser(
        createdAuthUser.uid,
        email,
        name,
        access_token,
        refresh_token
      );
      const customToken = await createFirebaseToken(createdAuthUser.uid);
      return redirect(`${envVars.BASE_URL}/login?custom_token=${customToken}`);
    }

    console.log('Auth user exists. Updating user...');
    const customToken = await createFirebaseToken(authUser.uid);
    await updateTokens(authUser.uid, refresh_token, access_token);
    return redirect(`${envVars.BASE_URL}/login?custom_token=${customToken}`);
  } catch (error) {
    console.error(error);
    return json({ error: (error as Error).message }, { status: 500 });
  }
};
