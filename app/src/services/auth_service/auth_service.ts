import {
  signOut as fbSignOut,
  OAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  UserCredential,
  OAuthCredential
} from 'firebase/auth';
import { clientAuth } from '~/firebase';
import { AuthProvider } from './types';
import { providers } from './providers';

export const signIn = async (authProvider: AuthProvider) => {
  await signInWithRedirect(clientAuth, providers[authProvider]);
};

export const getRedirectResultWithCredential = async () => {
  const result = await getRedirectResult(clientAuth);

  if (!result) {
    throw new Error('Sign in failed');
  }

  const credentials = OAuthProvider.credentialFromResult(result);

  if (!credentials) {
    throw new Error('No credentials found');
  }

  return credentials;
};

export const credentialFromResult = (
  result: UserCredential
): OAuthCredential => {
  const credentials = OAuthProvider.credentialFromResult(result);

  if (!credentials) {
    throw new Error('No credentials found');
  }

  return credentials;
};

export const signOut = async () => {
  await fbSignOut(clientAuth);
};

const validateGoogleAccessToken = async (accessToken: string) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`
  );

  return await response.json();

  // return response.status === 200;
};

const validateMicrosoftAccessToken = async (accessToken: string) => {
  const response = await fetch(`https://graph.microsoft.com/v1.0/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  return response.status === 200;
};

export const validateAccessToken = async (
  accessToken: string,
  provider: AuthProvider
) => {
  switch (provider) {
    case 'google.com':
      return validateGoogleAccessToken(accessToken);
    case 'microsoft.com':
      return validateMicrosoftAccessToken(accessToken);
    default:
      throw new Error('Unknown provider');
  }
};
