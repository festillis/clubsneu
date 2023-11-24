import { OAuthProvider } from 'firebase/auth';
import { envVars } from '~/env';
import { AuthProvider } from './types';

const microsoftProvider = new OAuthProvider('microsoft.com');
microsoftProvider.setCustomParameters({
  tenant: envVars.MICROSOFT_TENANT_ID,
  access_type: 'offline' // allows for refresh token to be obtained
});

const googleProvider = new OAuthProvider('google.com');
googleProvider.setCustomParameters({
  access_type: 'offline' // allows for refresh token to be obtained
});
googleProvider.addScope('https://www.googleapis.com/auth/calendar.readonly');

export const providers: Record<AuthProvider, OAuthProvider> = {
  'microsoft.com': microsoftProvider,
  'google.com': googleProvider
};
