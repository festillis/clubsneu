import {
  User as fbUser,
  OAuthCredential as fbOAuthCredential
} from 'firebase/auth';

export interface AuthenticatedInfo {
  user: fbUser;
  credentials: fbOAuthCredential;
}

export enum AuthProviders {
  microsoft = 'microsoft.com',
  google = 'google.com'
}
