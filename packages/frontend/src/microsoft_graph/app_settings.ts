export interface AppSettings {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  authTenant: string;
  graphUserScopes: string[];
  redirectUri: string;
}

export const settings: AppSettings = {
  clientId: import.meta.env.VITE_MICROSOFT_CLIENT_ID,
  clientSecret: import.meta.env.VITE_MICROSOFT_CLIENT_SECRET_VALUE,
  tenantId: import.meta.env.VITE_MICROSOFT_TENANT_ID,
  authTenant: 'common',
  graphUserScopes: [
    'offline_access',
    'User.Read',
    'Mail.Read',
    'Calendars.Read'
  ],
  redirectUri: import.meta.env.VITE_BASE_URL
};
