import { APIEvent, json } from 'solid-start';
import { statusCodes } from '~/constants';
import { envVars } from '~/constants';
import {
  clubService,
  profileService,
  tagService,
  userService
} from '~/services';

export const DELETE = async ({ params }: APIEvent) => {
  if (envVars.NODE_ENV !== 'development') {
    return json(
      { error: 'This endpoint is only available in development mode.' },
      { status: statusCodes.FORBIDDEN }
    );
  }

  const { table } = params;

  try {
    switch (table) {
      case 'tag':
        await tagService.deleteAllTags();
        return json('Cleared all tags');
      case 'club':
        await clubService.deleteAllClubs();
        return json('Cleared all clubs');
      case 'user':
        await userService.deleteAllUsers();
        return json('Cleared all users');
      case 'profile':
        await profileService.deleteAllProfiles();
        return json('Cleared all profiles');
      case 'all':
        await tagService.deleteAllTags();
        await clubService.deleteAllClubs();
        await profileService.deleteAllProfiles();
        await userService.deleteAllUsers();
        return json('Cleared all tables');
      default:
        return json(
          { error: 'Invalid table name' },
          { status: statusCodes.BAD_REQUEST }
        );
    }
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
