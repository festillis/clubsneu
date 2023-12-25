import { APIEvent, json } from 'solid-start';
import { statusCodes } from '~/constants';
import { authService, userService } from '~/services';
import { requestUtils } from '~/utils';

export const POST = async ({ request }: APIEvent) => {
  try {
    const searchParams = requestUtils.getUrlSearchParams(request);
    const userId = searchParams.get('userId');
    const refreshToken = searchParams.get('refreshToken');

    if (!userId || !refreshToken) {
      return json(
        { error: 'Missing userId and/or refreshToken' },
        { status: statusCodes.BAD_REQUEST }
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
    return json(
      { error: error.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
