import { initializeApp, getApps, getApp } from 'firebase/app';
import { firebaseConfig } from './config';

// Prevents the app from being initialized multiple times in hot-reloading
export const clientApp = !getApps().length
  ? initializeApp(firebaseConfig, 'client')
  : getApp('client');
