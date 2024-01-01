import { cert } from 'firebase-admin/app';
import { APIEvent, json, redirect } from 'solid-start';
import { envVars } from '~/constants';
import {
  initializeApp as initializeAdminApp,
  getApps as getAdminApps,
  getApp as getAdminApp
} from 'firebase-admin/app';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { authService, userService } from '~/services';
import { statusCodes } from '~/constants';
import { requestUtils } from '~/utils';

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
    const searchParams = requestUtils.getUrlSearchParams(request);
    const authCode = searchParams.get('code');

    if (!authCode) {
      // TODO: redirect to login page with error message
      return json(
        { error: 'No authorization code provided. Invalid login process.' },
        { status: statusCodes.BAD_REQUEST }
      );
    }

    const { access_token, refresh_token, expires_in } =
      await authService.getMicrosoftCredentialsWithAuthorizationCode(authCode);

    const { displayName, mail } = await authService.getMicrosoftUserInfo(
      access_token
    );

    const authUser = await authService.getAuthUserByEmail(adminAuth, mail);
    if (!authUser) {
      console.log('Auth user does not exist. Creating new user...');
      const createdAuthUser = await authService.createNewAuthUser(
        adminAuth,
        mail,
        displayName,
        'microsoft'
      );

      await userService.createUser({
        id: createdAuthUser.uid,
        email: mail,
        name: displayName,
        accessToken: access_token,
        refreshToken: refresh_token,
        accessTokenExpiry: authService.getAccessTokenExpiryDate(expires_in),
        provider: 'microsoft',
        role: 'member'
      });

      const customToken = await authService.createFirebaseToken(
        adminAuth,
        createdAuthUser.uid
      );

      const redirectUrl = new URL(`${envVars.BASE_URL}/login`);
      redirectUrl.searchParams.append('custom_token', customToken);

      return redirect(redirectUrl.toString());
    }

    console.log('Auth user exists. Updating user...');
    const customToken = await authService.createFirebaseToken(
      adminAuth,
      authUser.uid
    );
    await userService.updateUser(authUser.uid, {
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry: authService.getAccessTokenExpiryDate(expires_in)
    });

    const redirectUrl = new URL(`${envVars.BASE_URL}/login`);
    redirectUrl.searchParams.append('custom_token', customToken);

    return redirect(redirectUrl.toString());
  } catch (e: any) {
    console.error(e);
    // TODO: redirect to login page with error message
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
