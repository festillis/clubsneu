import {
  ClientSecretCredential,
  DeviceCodeCredential,
  DeviceCodeInfo,
  DeviceCodePromptCallback
} from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import { AppSettings } from './app_settings';

// Create an instance of the TokenCredential class that is imported
const credential = new ClientSecretCredential(
  process.env.MICROSOFT_TENANT_ID,
  process.env.MICROSOFT_CLIENT_ID,
  process.env.MICROSOFT_CLIENT_SECRET_VALUE
);

// Set your scopes and options for TokenCredential.getToken (Check the ` interface GetTokenOptions` in (TokenCredential Implementation)[https://github.com/Azure/azure-sdk-for-js/blob/master/sdk/core/core-auth/src/tokenCredential.ts])

export const initializeGraphForUserAuth = async (
  settings: AppSettings,
  deviceCodePrompt: DeviceCodePromptCallback
) => {
  const deviceCodeCredential = new DeviceCodeCredential({
    clientId: settings.clientId,
    tenantId: settings.authTenant,
    userPromptCallback: (info: DeviceCodeInfo) => {
      console.log(info.message);
    }
  });
  const authProvider = new TokenCredentialAuthenticationProvider(
    deviceCodeCredential,
    {
      scopes: settings.graphUserScopes
    }
  );
  const client = Client.initWithMiddleware({
    debugLogging: true,
    authProvider
  });
  return client;
};
