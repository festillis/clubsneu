import {
  User as fbUser,
  signOut as fbSignOut,
  sendEmailVerification as fbSendEmailVerification,
  UserCredential as fbUserCredential,
  signInWithEmailAndPassword as fbSignInWithEmailAndPassword,
  signInWithPopup,
  OAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword as fbCreateUserWithEmailAndPassword
} from 'firebase/auth';
import { envVars } from '~/env';
import { auth } from '~/firebase';
import { Safe } from '~/types/safe';

const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  tenant: envVars.MICROSOFT_TENANT_ID
});

const googleProvider = new GoogleAuthProvider();

export const signInWithMicrosoft = async (): Promise<string> => {
  console.log('Signing in with Microsoft');
  const result = await signInWithPopup(auth, microsoftProvider);
  const user = result.user;
  console.log(user);
  return user.uid;
};

export const signInWithGoogle = async (): Promise<string> => {
  console.log('Signing in with Google');
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  console.log(user);
  return user.uid;
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
