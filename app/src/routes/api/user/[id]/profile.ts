import { APIEvent, json } from 'solid-start';
import { statusCodes } from '~/constants';
import { profileService } from '~/services';

export const GET = async ({ params }: APIEvent) => {
  const id = params['id'];

  try {
    const profile = await profileService.getProfileByUserId(id);

    if (!profile) {
      return json(
        {
          error: 'No profile belonging to a user with the given id'
        },
        { status: statusCodes.INTERNAL_SERVER_ERROR }
      );
    }

    return json(profile);
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
