import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification as fbSendEmailVerification,
  signInWithEmailAndPassword,
  User,
  UserCredential
} from 'firebase/auth';
import { createSignal } from 'solid-js';
import { auth } from '~/firebase';
import { Safe } from '~/types/safe';

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
): Promise<Safe<UserCredential>> => {
  try {
    console.log(`Registering user with email ${email}`);

    const userCredential = await createUserWithEmailAndPassword(
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

/**
 * Signs in a user with email and password
 */
export const login = async (
  email: string,
  password: string
): Promise<Safe<UserCredential>> => {
  try {
    console.log(`Logging in user with email ${email}`);

    const userCredential = await signInWithEmailAndPassword(
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

/**
 * Signs out a user
 */
export const logout = async () => {
  console.log('Logging out user');

  await auth.signOut();
};

/**
 * Sends an email verification to the user
 */
export const sendEmailVerification = async (
  user: User
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

/**
 * Listener for authentication state changes
 */
// onAuthStateChanged(auth, async (user) => {
//   if (user) {
//     console.log('User is signed in');
//     setIsAuthenticated(true);
//     setToken(await user.getIdToken());
//     setIsEmailVerified(user.emailVerified);
//   } else {
//     console.log('User is signed out');
//     setIsAuthenticated(false);
//     setToken(null);
//     setIsEmailVerified(false);
//   }
// });
