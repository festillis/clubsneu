import { User as fbUser, onAuthStateChanged } from 'firebase/auth';
import { createSignal } from 'solid-js';
import { auth } from '~/firebase';
import { authService } from '~/services';

export const [isAuthenticated, setIsAuthenticated] =
  createSignal<boolean>(false);

export const signInWithMicrosoft = async () => {
  return await authService.signInWithMicrosoft();
};

export const signInWithGoogle = async () => {
  return await authService.signInWithGoogle();
};

export const createUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await authService.createUserWithEmailAndPassword(email, password);
};

export const signInWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  return await authService.signInWithEmailAndPassword(email, password);
};

export const signOut = async () => {
  await authService.signOut();
};

export const sendEmailVerification = async (user: fbUser) => {
  return await authService.sendEmailVerification(user);
};

/**
 * Listener for authentication state changes
 */
onAuthStateChanged(auth, async (user) => {
  if (user) {
    console.log('User is signed in');
    setIsAuthenticated(true);
  } else {
    console.log('User is signed out');
    setIsAuthenticated(false);
  }
});
