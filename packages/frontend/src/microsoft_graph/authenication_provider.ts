import {
  PublicClientApplication,
  BrowserCacheLocation
} from '@azure/msal-browser';
import { AuthenticationProvider } from '@microsoft/microsoft-graph-client';
import { AppSettings } from './app_settings';

export class ClubsNEUAuthenticationProvider implements AuthenticationProvider {
  private readonly settings: AppSettings;

  constructor(settings: AppSettings) {
    this.settings = settings;
  }

  public async getAccessToken(): Promise<string> {
    const msalInstance = new PublicClientApplication({
      auth: {
        clientId: this.settings.clientId
      },
      cache: {
        cacheLocation: BrowserCacheLocation.SessionStorage
      }
    });

    await msalInstance.initialize();

    const authResult = await msalInstance.loginPopup({
      scopes: this.settings.graphUserScopes,
      redirectUri: this.settings.redirectUri
    });

    if (!authResult.account) {
      throw new Error('Authentication failed');
    }

    return authResult.accessToken;
  }
}
