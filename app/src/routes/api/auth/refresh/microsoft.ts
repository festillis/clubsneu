import { APIEvent, json } from 'solid-start';
import {
  getAccessTokenExpiryDate,
  getNewMicrosoftCredentialsWithRefreshToken
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
      await getNewMicrosoftCredentialsWithRefreshToken(refreshToken);

    const newCredentials = {
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry: getAccessTokenExpiryDate(expires_in)
    };

    await updateUser(userId, newCredentials);

    return json(newCredentials);
  } catch (e: any) {
    console.error(e);
    return json({ error: e.message }, { status: 500 });
  }
};
