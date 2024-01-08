import type { Auth } from 'firebase-admin/auth';
import { authUtils } from '~/utils';
import { AuthProvider } from './types';

// Must run server-side
export const getAuthUserByEmail = async (adminAuth: Auth, email: string) => {
  try {
    return await adminAuth.getUserByEmail(email);
  } catch (error: any) {
    if (error.code === 'auth/user-not-found') {
      return null;
    }

    throw error;
  }
};

// Must run server-side
export const createNewAuthUser = async (
  adminAuth: Auth,
  email: string,
  name: string,
  provider: AuthProvider
) => {
  return await adminAuth.createUser({
    email,
    displayName: name,
    emailVerified: true,
    providerToLink: {
      providerId: authUtils.getProviderId(provider)
    }
  });
};

// Must run server-side
export const createFirebaseToken = async (adminAuth: Auth, userId: string) => {
  return await adminAuth.createCustomToken(userId);
};
