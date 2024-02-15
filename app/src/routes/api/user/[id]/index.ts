import { APIEvent, json } from 'solid-start';
import { middleware } from '~/api_client';
import { statusCodes } from '~/constants';
import { userService } from '~/services';
import { requestUtils } from '~/utils';

export const GET = async ({ request, params }: APIEvent) => {
  const accessToken = requestUtils.getAccessToken(request);
  const provider = requestUtils.getProvider(request);
  const id = params['id'];

  if (
    !id ||
    !accessToken ||
    !provider ||
    !middleware.isAuthenticated(accessToken, provider)
  ) {
    return json(
      { error: 'Not authenticated' },
      { status: statusCodes.BAD_REQUEST }
    );
  }

  try {
    const dbUser = await userService.getUserById(id);

    if (!dbUser) {
      return json(
        {
          error: 'No user with the given id'
        },
        { status: statusCodes.INTERNAL_SERVER_ERROR }
      );
    }

    return json(dbUser);
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
