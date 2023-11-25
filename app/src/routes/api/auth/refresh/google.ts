import { get } from 'http';
import { APIEvent, json } from 'solid-start';
import { ApiClient } from '~/api_client';
import { envVars } from '~/env';
import {
  getAccessTokenExpiryDate,
  getNewGoogleCredentialsWithRefreshToken
} from '~/services/auth_service';
import { updateUser } from '~/services/user_service';

export const POST = async ({ request }: APIEvent) => {
  try {
    const url = new URL(request.url);
    const searchParams = url.searchParams;
    const userId = searchParams.get('userId');
    const refreshToken = searchParams.get('refreshToken');

    if (!userId || !refreshToken) {
      return json(
        { error: 'Missing userId and/or refreshToken' },
        { status: 400 }
      );
    }

    const { access_token, refresh_token, expires_in } =
      await getNewGoogleCredentialsWithRefreshToken(refreshToken);

    const newCredentials = {
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry: getAccessTokenExpiryDate(expires_in)
    };

    await updateUser(userId, newCredentials);

    return json(newCredentials);
  } catch (error: any) {
    console.error(error);
    return json({ error: error.message }, { status: 500 });
  }
};
