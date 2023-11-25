import { cert } from 'firebase-admin/app';
import { APIEvent, json, redirect } from 'solid-start';
import { envVars } from '~/env';
import {
  initializeApp as initializeAdminApp,
  getApps as getAdminApps,
  getApp as getAdminApp
} from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import {
  getAuthUserByEmail,
  createNewAuthUser,
  createFirebaseToken
} from '~/services/auth_service/admin';
import {
  getAccessTokenExpiryDate,
  getMicrosoftCredentialsWithAuthorizationCode,
  getMicrosoftUserInfo
} from '~/services/auth_service';
import { createUser, updateUser } from '~/services/user_service';

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

export const GET = async ({ request }: APIEvent) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const authCode = searchParams.get('code');

    if (!authCode) {
      // TODO: redirect to login page with error message
      return json(
        { error: 'No authorization code provided. Invalid login process.' },
        { status: 400 }
      );
    }

    const { access_token, refresh_token, expires_in } =
      await getMicrosoftCredentialsWithAuthorizationCode(authCode);

    const { displayName, mail } = await getMicrosoftUserInfo(access_token);

    const authUser = await getAuthUserByEmail(adminAuth, mail);
    if (!authUser) {
      console.log('Auth user does not exist. Creating new user...');
      const createdAuthUser = await createNewAuthUser(
        adminAuth,
        mail,
        displayName,
        'microsoft.com'
      );

      await createUser({
        id: createdAuthUser.uid,
        email: mail,
        name: displayName,
        accessToken: access_token,
        refreshToken: refresh_token,
        accessTokenExpiry: getAccessTokenExpiryDate(expires_in),
        provider: 'microsoft.com'
      });

      const customToken = await createFirebaseToken(
        adminAuth,
        createdAuthUser.uid
      );

      return redirect(`${envVars.BASE_URL}/login?custom_token=${customToken}`);
    }

    console.log('Auth user exists. Updating user...');
    const customToken = await createFirebaseToken(adminAuth, authUser.uid);
    await updateUser(authUser.uid, {
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry: getAccessTokenExpiryDate(expires_in)
    });
    return redirect(`${envVars.BASE_URL}/login?custom_token=${customToken}`);
  } catch (e: any) {
    console.error(e);
    // TODO: redirect to login page with error message
    return json({ error: e.message }, { status: 500 });
  }
};
