import { FirebaseOptions } from 'firebase/app';

import { envVars } from '~/constants';

export const firebaseConfig: FirebaseOptions = {
  apiKey: envVars.FIREBASE_API_KEY,
  authDomain: envVars.FIREBASE_AUTH_DOMAIN,
  projectId: envVars.FIREBASE_PROJECT_ID,
  storageBucket: envVars.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envVars.FIREBASE_MESSAGING_SENDER_ID,
  appId: envVars.FIREBASE_APP_ID,
  measurementId: envVars.FIREBASE_MEASUREMENT_ID
};
