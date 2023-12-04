import { ApiClient } from '~/api_client';
import { envVars } from '~/constants/env';

export const microsoftAuthScopes = [
  'openid',
  'profile',
  'offline_access',
  'User.Read'
];

export const getMicrosoftAuthLink = () => {
  const authLink = new URL(
    `https://login.microsoftonline.com/${envVars.MICROSOFT_TENANT_ID}/oauth2/v2.0/authorize`
  );

  authLink.searchParams.append('client_id', envVars.MICROSOFT_CLIENT_ID);
  authLink.searchParams.append('response_type', 'code');
  authLink.searchParams.append(
    'redirect_uri',
    `${envVars.BASE_URL}/api/auth/login_redirect/microsoft`
  );
  authLink.searchParams.append('response_mode', 'query');
  authLink.searchParams.append('scope', microsoftAuthScopes.join(' '));
  authLink.searchParams.append('sso_reload', 'true');

  return authLink.toString();
};

export const getMicrosoftCredentialsWithAuthorizationCode = async (
  code: string
) => {
  const api = new ApiClient(
    `https://login.microsoftonline.com/${envVars.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`
  );

  return await api.req<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    scope: string;
  }>('POST', {
    headers: {
      // Must be sent in x-www-form-urlencoded body format
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      // Must be sent in body instead of params
      client_id: envVars.MICROSOFT_CLIENT_ID,
      scope: microsoftAuthScopes.join(' '),
      redirect_uri: `${envVars.BASE_URL}/api/auth/login_redirect/microsoft`,
      code,
      grant_type: 'authorization_code',
      client_secret: envVars.MICROSOFT_CLIENT_SECRET_VALUE
    }
  });
};

export const getMicrosoftUserInfo = async (accessToken: string) => {
  const api = new ApiClient('https://graph.microsoft.com/v1.0/me');

  return await api.req<{
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
  }>('GET', {
    headers: {
      // Must be sent in x-www-form-urlencoded body format
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${accessToken}`
    }
  });
};

export const getNewMicrosoftCredentialsWithRefreshToken = async (
  refreshToken: string
) => {
  const api = new ApiClient(
    `https://login.microsoftonline.com/${envVars.MICROSOFT_TENANT_ID}/oauth2/v2.0/token`
  );

  return await api.req<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>('POST', {
    headers: {
      // Must be sent in x-www-form-urlencoded body format
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: {
      client_id: envVars.MICROSOFT_CLIENT_ID,
      refresh_token: refreshToken,
      scope: microsoftAuthScopes.join(' '),
      grant_type: 'refresh_token',
      client_secret: envVars.MICROSOFT_CLIENT_SECRET_VALUE
    }
  });
};
