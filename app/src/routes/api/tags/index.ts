import { json } from 'solid-start';
import { statusCodes } from '~/constants';
import { tagService } from '~/services';

export const GET = async () => {
  try {
    const tags = await tagService.getTags();
    return json(tags);
  } catch (e: any) {
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
