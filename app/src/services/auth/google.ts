import { ApiClient } from '~/api_client';
import { envVars } from '~/constants';
import { GoogleCredentials, GoogleTokenInfo, GoogleUserInfo } from './types';

export const googleAuthScopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

export const getGoogleAuthLink = () => {
  const authLink = new URL('https://accounts.google.com/o/oauth2/v2/auth');
  authLink.searchParams.append('client_id', envVars.GOOGLE_OAUTH_CLIENT_ID);
  authLink.searchParams.append(
    'redirect_uri',
    `${envVars.BASE_URL}/api/auth/login_redirect/google`
  );
  authLink.searchParams.append('response_type', 'code');
  authLink.searchParams.append('scope', googleAuthScopes.join(' '));
  authLink.searchParams.append('access_type', 'offline');
  authLink.searchParams.append('prompt', 'consent');
  authLink.searchParams.append('include_granted_scopes', 'true');

  return authLink.toString();
};

export const getGoogleCredentialsWithAuthorizationCode = async (
  code: string
) => {
  const api = new ApiClient('https://oauth2.googleapis.com/token');

  return await api.req<GoogleCredentials>('POST', {
    params: {
      code,
      client_id: envVars.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: `${envVars.BASE_URL}/api/auth/login_redirect/google`,
      grant_type: 'authorization_code'
    }
  });
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const api = new ApiClient('https://www.googleapis.com/oauth2/v2/userinfo');

  return await api.req<GoogleUserInfo>('GET', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getNewGoogleCredentialsWithRefreshToken = async (
  refreshToken: string
) => {
  const api = new ApiClient('https://oauth2.googleapis.com/token');

  return await api.req<GoogleCredentials>('POST', {
    params: {
      client_id: envVars.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }
  });
};

export const isValidGoogleAccessToken = async (accessToken: string) => {
  const api = new ApiClient('https://www.googleapis.com/oauth2/v3/tokeninfo');
  const response = await api.req<GoogleTokenInfo>('POST', {
    params: {
      access_token: accessToken
    }
  });

  return !('error_description' in response);
};
