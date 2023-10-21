import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { createSignal } from 'solid-js';
import { auth } from '~/firebase';

export const [isAuthenticated, setIsAuthenticated] =
  createSignal<boolean>(false);

export const [token, setToken] = createSignal<string | null>(null);

export const [isEmailVerified, setIsEmailVerified] =
  createSignal<boolean>(false);

/**
 * Registers a user with email and password
 */
export const register = async (email: string, password: string) => {
  await createUserWithEmailAndPassword(auth, email, password);
};

/**
 * Signs in a user with email and password
 */
export const login = async (email: string, password: string) => {
  await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Signs out a user
 */
export const logout = async () => {
  await auth.signOut();
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
