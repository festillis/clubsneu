import { json } from 'solid-start';
import { statusCodes } from '~/constants';
import { clubService } from '~/services';

export const GET = async () => {
  try {
    const clubIds = await clubService.getClubIds();
    return json(clubIds);
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
