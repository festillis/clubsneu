import { FirebaseOptions, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { envVars } from '~/env';

export const firebaseConfig: FirebaseOptions = {
  apiKey: envVars.FIREBASE_API_KEY,
  authDomain: envVars.FIREBASE_AUTH_DOMAIN,
  projectId: envVars.FIREBASE_PROJECT_ID,
  storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.FIREBASE_APP_ID,
  measurementId: envVars.FIREBASE_MEASUREMENT_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const functions = getFunctions(app);
