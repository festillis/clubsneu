import { json } from 'solid-start';
import { statusCodes } from '~/constants';
import { envVars } from '~/constants/env';
import { loadData } from '~/dataloader';

export const GET = async () => {
  if (envVars.NODE_ENV !== 'development') {
    return json(
      { error: 'This endpoint is only available in development mode.' },
      { status: statusCodes.BAD_REQUEST }
    );
  }

  try {
    await loadData();
  } catch (e: any) {
    console.error(e);
    return json(
      { error: e.message },
      { status: statusCodes.INTERNAL_SERVER_ERROR }
    );
  }

  return json('Finished loading data');
};
