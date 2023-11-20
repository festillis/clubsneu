import { User as fbUser, onAuthStateChanged } from 'firebase/auth';
import { createSignal } from 'solid-js';
import { SessionStorageKeys } from '~/constants/session_storage_keys';
import { auth } from '~/firebase';
import { authService } from '~/services';
import {
  AuthProviders,
  AuthenticatedInfo
} from '~/services/auth_service/types';
import { Safe } from '~/types/safe';

export const [isAuthenticated, setIsAuthenticated] =
  createSignal<boolean>(false);

const setSessionAccessTokenIfValid = (result: Safe<AuthenticatedInfo>) => {
  if (!result.hasError && result.data.credentials.accessToken) {
    const accessToken = result.data?.credentials.accessToken;
    console.log('Setting access token in local storage', accessToken);
    localStorage.setItem(SessionStorageKeys.accessToken, accessToken);
  }
};

const clearSessionAccessToken = () => {
  localStorage.removeItem(SessionStorageKeys.accessToken);
};

export const reauthenticate = async () => {
  const result = await authService.reauthenticate();
  setSessionAccessTokenIfValid(result);
  return result;
};

export const signInWithMicrosoft = async () => {
  const result = await authService.signIn(AuthProviders.microsoft);
  setSessionAccessTokenIfValid(result);
  return result;
};

export const signInWithGoogle = async () => {
  const result = await authService.signIn(AuthProviders.google);
  return result;
};

export const signOut = async () => {
  await authService.signOut();
  clearSessionAccessToken();
};

export const sendEmailVerification = async (user: fbUser) => {
  return await authService.sendEmailVerification(user);
};

/**
 * Listener for authentication state changes
 */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log(`User is signed in as ${user.email}`);
    setIsAuthenticated(true);
  } else {
    console.log('User is signed out');
    setIsAuthenticated(false);
  }
});
