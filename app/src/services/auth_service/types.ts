import {
  User as fbUser,
  OAuthCredential as fbOAuthCredential
} from 'firebase/auth';

export interface AuthenticatedInfo {
  user: fbUser;
  accessToken: string;
}

export type AuthProvider = 'microsoft.com' | 'google.com';
