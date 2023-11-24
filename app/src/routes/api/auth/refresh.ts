import { APIEvent, json } from 'solid-start';
import { ApiClient } from '~/api_client';
import { envVars } from '~/env';
import { updateTokens } from './login_redirect';

export const POST = async ({ params }: APIEvent) => {
  try {
    const userId = params.userId;
    const refreshToken = params.refreshToken;

    if (!userId || !refreshToken) {
      return json(
        { error: 'Missing userId and/or refreshToken' },
        { status: 400 }
      );
    }

    const tokenApi = new ApiClient('https://oauth2.googleapis.com/token');
    const tokenResponse = await tokenApi.req<{ access_token: string }>('POST', {
      params: {
        client_id: envVars.GOOGLE_OAUTH_CLIENT_ID,
        client_secret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
        refresh_token: refreshToken,
        grant_type: 'refresh_token'
      }
    });

    if (tokenResponse.hasError) {
      return json({ error: 'Could not refresh access token' }, { status: 500 });
    }

    const accessToken = tokenResponse.data.access_token;
    await updateTokens(userId, refreshToken, accessToken, false);

    return json({ accessToken });
  } catch (error: any) {
    console.error(error);
    return json({ error: error.message }, { status: 500 });
  }
};
