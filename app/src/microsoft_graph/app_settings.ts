import { envVars } from '~/env';

export interface AppSettings {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  authTenant: string;
  graphUserScopes: string[];
  redirectUri: string;
}

export const settings: AppSettings = {
  clientId: envVars.MICROSOFT_CLIENT_ID,
  clientSecret: envVars.MICROSOFT_CLIENT_SECRET_VALUE,
  tenantId: envVars.MICROSOFT_TENANT_ID,
  authTenant: 'common',
  graphUserScopes: [
    'offline_access',
    'User.Read',
    'Mail.Read',
    'Calendars.Read'
  ],
  redirectUri: envVars.BASE_URL
};
