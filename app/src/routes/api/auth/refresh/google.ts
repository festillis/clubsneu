import { APIEvent, json } from 'solid-start';
import { authService, userService } from '~/services';

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
      await authService.getNewGoogleCredentialsWithRefreshToken(refreshToken);

    const newCredentials = {
      accessToken: access_token,
      refreshToken: refresh_token,
      accessTokenExpiry: authService.getAccessTokenExpiryDate(expires_in)
    };

    await userService.updateUser(userId, newCredentials);

    return json(newCredentials);
  } catch (error: any) {
    console.error(error);
    return json({ error: error.message }, { status: 500 });
  }
};
