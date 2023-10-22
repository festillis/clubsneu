export interface AppSettings {
  clientId: string;
  clientSecret: string;
  tenantId: string;
  authTenant: string;
  graphUserScopes: string[];
}

export const settings: AppSettings = {
  clientId: process.env.MICROSOFT_CLIENT_ID,
  clientSecret: process.env.MICROSOFT_CLIENT_SECRET_VALUE,
  tenantId: process.env.MICROSOFT_TENANT_ID,
  authTenant: 'common',
  graphUserScopes: ['User.Read', 'Mail.Read', 'Calendars.Read']
};
