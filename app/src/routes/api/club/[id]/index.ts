import { APIEvent, json } from 'solid-start';
import { statusCodes } from '~/constants';
import { clubService } from '~/services';

export const GET = async ({ params }: APIEvent) => {
  const { id } = params;

  try {
    const club = await clubService.getClubById(id);
    return json(club);
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
