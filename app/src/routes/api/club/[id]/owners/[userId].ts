import { APIEvent, json } from 'solid-start';
import { statusCodes } from '~/constants';
import { clubService } from '~/services';

export const GET = async ({ params }: APIEvent) => {
  const { id: clubId, userId } = params;

  try {
    const clubOwner = await clubService.getClubOwnerById(clubId, userId);
    return json(clubOwner);
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
