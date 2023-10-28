import { PublicClientApplication } from '@azure/msal-browser';
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';
import { AppSettings, settings } from './app_settings';

export class ClubsNEUAuthenticationProvider implements AuthenticationProvider {
  private settings: AppSettings;

  constructor(settings: AppSettings) {
    this.settings = settings;
  }

  public async getAccessToken(): Promise<string> {
    const msalInstance = new PublicClientApplication({
      auth: {
        clientId: settings.clientId
      }
    });

    await msalInstance.initialize();

    const authResult = await msalInstance.loginPopup({
      scopes: settings.graphUserScopes,
      redirectUri: settings.redirectUri
    });

    if (!authResult.account) {
      throw new Error('Authentication failed');
    }

    return authResult.accessToken;
  }
}
