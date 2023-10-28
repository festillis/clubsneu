import { Client } from '@microsoft/microsoft-graph-client';
import { AppSettings } from './app_settings';
import { User } from '@microsoft/microsoft-graph-types';
import { ClubsNEUAuthenticationProvider } from './authenication_provider';

let client: Client | undefined;

export const initializeClient = async (settings: AppSettings) => {
  if (!client) {
    client = Client.initWithMiddleware({
      authProvider: new ClubsNEUAuthenticationProvider(settings)
    });
  }
};

export const getUserAsync = async (): Promise<User> => {
  if (!client) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return (
    client
      .api('/me/events')
      // .select(['displayName', 'mail', 'userPrincipalName'])
      .get()
  );
};
