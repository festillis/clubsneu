import { ApiClient } from '~/api_client';
import { envVars } from '~/env';

export const googleAuthScopes = [
  'https://www.googleapis.com/auth/calendar.readonly',
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile'
];

export const getGoogleAuthLink = async () => {
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
  const response = await api.req<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  }>('POST', {
    params: {
      code,
      client_id: envVars.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
      redirect_uri: `${envVars.BASE_URL}/api/auth/login_redirect/google`,
      grant_type: 'authorization_code'
    }
  });

  if (response.hasError) {
    throw new Error('Could not get credentials');
  }

  return response.data;
};

export const getGoogleUserInfo = async (accessToken: string) => {
  const api = new ApiClient('https://www.googleapis.com/oauth2/v2/userinfo');
  const response = await api.req<{
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
  }>('GET', {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  });

  if (response.hasError) {
    throw new Error('Could not get user info');
  }

  return response.data;
};

export const getNewGoogleCredentialsWithRefreshToken = async (
  refreshToken: string
) => {
  const api = new ApiClient('https://oauth2.googleapis.com/token');
  const response = await api.req<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  }>('POST', {
    params: {
      client_id: envVars.GOOGLE_OAUTH_CLIENT_ID,
      client_secret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
      refresh_token: refreshToken,
      grant_type: 'refresh_token'
    }
  });

  if (response.hasError) {
    throw new Error('Could not refresh access token');
  }

  return response.data;
};
