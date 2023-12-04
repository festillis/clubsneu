import {
  FirebaseOptions,
  initializeApp as initializeClientApp,
  getApps as getClientApps,
  getApp as getClientApp
} from 'firebase/app';
import { getAuth as getClientAuth } from 'firebase/auth';
import { envVars } from '~/constants/env';

const firebaseConfig: FirebaseOptions = {
  apiKey: envVars.FIREBASE_API_KEY,
  authDomain: envVars.FIREBASE_AUTH_DOMAIN,
  projectId: envVars.FIREBASE_PROJECT_ID,
  storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.FIREBASE_APP_ID,
  measurementId: envVars.FIREBASE_MEASUREMENT_ID
};

// Prevents the app from being initialized multiple times in hot-reloading
const clientApp = !getClientApps().length
  ? initializeClientApp(firebaseConfig, 'client')
  : getClientApp('client');

export const clientAuth = getClientAuth(clientApp);
