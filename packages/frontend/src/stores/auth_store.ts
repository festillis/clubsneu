import {
  ActionCodeSettings,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { createSignal } from 'solid-js';
import { LocalStorageKeys } from '~/constants/local_storage_keys';
import { auth } from '~/firebase';
import { Safe } from '~/types/safe';

// TODO: Finish action code settings
const actionCodeSettings: ActionCodeSettings = {
  url: ''
};

export const [isAuthenticated, setIsAuthenticated] =
  createSignal<boolean>(false);

export const [token, setToken] = createSignal<string | null>(null);

export const [isEmailVerified, setIsEmailVerified] =
  createSignal<boolean>(false);

/**
 * Registers a user with email and password
 */
export const register = async (
  email: string,
  password: string
): Promise<Safe<boolean>> => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return {
      hasError: false,
      data: true
    };
  } catch (e) {
    return {
      hasError: true,
      errorText: (e as Error).message
    };
  }
};

/**
 * Signs in a user with email and password
 */
export const login = async (
  email: string,
  password: string
): Promise<Safe<boolean>> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return {
      hasError: false,
      data: true
    };
  } catch (e) {
    return {
      hasError: true,
      errorText: (e as Error).message
    };
  }
};

/**
 * Signs out a user
 */
export const logout = async () => {
  await auth.signOut();
};

/**
 * Sends an email verification to the user
 */
export const sendEmailVerification = async (
  email: string
): Promise<Safe<boolean>> => {
  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    localStorage.setItem(LocalStorageKeys.emailForSignIn, email);
    return {
      hasError: false,
      data: true
    };
  } catch (e) {
    return {
      hasError: true,
      errorText: (e as Error).message
    };
  }
};

/**
 * Listener for authentication state changes
 */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('User is signed in');
    setIsAuthenticated(true);
    setToken(await user.getIdToken());
    setIsEmailVerified(user.emailVerified);
  } else {
    console.log('User is signed out');
    setIsAuthenticated(false);
    setToken(null);
    setIsEmailVerified(false);
  }
});
