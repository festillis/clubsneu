import {
  User as fbUser,
  signOut as fbSignOut,
  sendEmailVerification as fbSendEmailVerification,
  UserCredential as fbUserCredential,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword,
  signInWithRedirect,
  getRedirectResult,
  reauthenticateWithRedirect
} from 'firebase/auth';
import { envVars } from '~/env';
import { auth } from '~/firebase';
import { Safe } from '~/types/safe';
import { AuthProviders, AuthenticatedInfo } from './types';
import { SessionStorageKeys } from '~/constants/session_storage_keys';

const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  tenant: envVars.MICROSOFT_TENANT_ID
});

const googleProvider = new OAuthProvider('google.com');
googleProvider.addScope('https://www.googleapis.com/auth/calendar.readonly');

const providers: Record<AuthProviders, OAuthProvider> = {
  [AuthProviders.microsoft]: microsoftProvider,
  [AuthProviders.google]: googleProvider
};

export const signIn = async (
  authProvider: AuthProviders
): Promise<Safe<AuthenticatedInfo>> => {
  console.log(`Signing in with ${authProvider}`);
  try {
    await signInWithRedirect(auth, providers[authProvider]);
    const result = await getRedirectResult(auth);

    if (!result) {
      return {
        hasError: true,
        errorText: 'Sign in process cancelled'
      };
    }

    const user = result.user;
    const credentials = OAuthProvider.credentialFromResult(result);

    if (!credentials) {
      return {
        hasError: true,
        errorText: 'No credentials found'
      };
    }

    if (!credentials.accessToken) {
      return {
        hasError: true,
        errorText: 'No access token found'
      };
    }

    return {
      hasError: false,
      data: { user, credentials }
    };
  } catch (e) {
    return {
      hasError: true,
      errorText: (e as Error).message
    };
  }
};

export const reauthenticate = async (): Promise<Safe<AuthenticatedInfo>> => {
  const user = auth.currentUser;

  if (!user) {
    return {
      hasError: true,
      errorText: 'No user was logged in'
    };
  }

  const provider = user.providerData[0].providerId;
  if (!Object.values(AuthProviders).includes(provider as AuthProviders)) {
    return {
      hasError: true,
      errorText: 'User was not logged in with a supported provider'
    };
  }

  await reauthenticateWithRedirect(user, providers[provider as AuthProviders]);

  const result = await getRedirectResult(auth);

  if (!result) {
    return {
      hasError: true,
      errorText: 'Reauthentication process cancelled'
    };
  }

  const credentials = OAuthProvider.credentialFromResult(result);

  if (!credentials) {
    return {
      hasError: true,
      errorText: 'No credentials found'
    };
  }

  if (!credentials.accessToken) {
    return {
      hasError: true,
      errorText: 'No access token found'
    };
  }

  return {
    hasError: false,
    data: { user, credentials }
  };
};

export const signOut = async () => {
  console.log('Signing out user');
  await fbSignOut(auth);
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Safe<fbUserCredential>> => {
  try {
    console.log(`Registering user with email ${email}`);

    const userCredential = await fbCreateUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(`Registered user with email ${email}`);
    return {
      hasError: false,
      data: userCredential
    };
  } catch (e) {
    console.error(`Error registering user with email ${email}`);

    return {
      hasError: true,
      errorText: (e as Error).message
    };
  }
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<Safe<fbUserCredential>> => {
  try {
    console.log(`Logging in user with email ${email}`);

    const userCredential = await fbSignInWithEmailAndPassword(
      auth,
      email,
      password
    );

    console.log(`Logged in user with email ${email}`);

    return {
      hasError: false,
      data: userCredential
    };
  } catch (e) {
    console.error(`Error logging in user with email ${email}`);

    return {
      hasError: true,
      errorText: (e as Error).message
    };
  }
};

export const sendEmailVerification = async (
  user: fbUser
): Promise<Safe<boolean>> => {
  try {
    console.log(`Sending email verification to user ${user.email}`);

    await fbSendEmailVerification(user);

    console.log(`Sent email verification to user ${user.email}`);

    return {
      hasError: false,
      data: true
    };
  } catch (e) {
    console.error(`Error sending email verification to user ${user.email}`);

    return {
      hasError: true,
      errorText: (e as Error).message
    };
  }
};
