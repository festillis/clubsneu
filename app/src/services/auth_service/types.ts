export type AuthProvider = 'google' | 'microsoft';

export interface GoogleCredentials {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface GoogleUserInfo {
  email: string;
  family_name: string;
  gender: string;
  given_name: string;
  hd: string;
  id: string;
  link: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

export interface MicrosoftCredentials {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
}

export interface MicrosoftUserInfo {
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: string;
  mail: string;
  mobilePhone: string;
  officeLocation: string;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}

export interface GoogleTokenInfoSuccess {
  azp: string;
  aud: string;
  sub: string;
  scope: string;
  exp: number;
  expires_in: number;
  email: string;
  email_verified: boolean;
  access_type: string;
}

export interface GoogleTokenInfoFailure {
  error_description: string;
}

export type GoogleTokenInfo = GoogleTokenInfoSuccess | GoogleTokenInfoFailure;
