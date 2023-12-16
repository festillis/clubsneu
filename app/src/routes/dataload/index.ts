import { json } from 'solid-start';
import { envVars } from '~/constants/env';
import { loadData } from '~/dataloader';

export const GET = async () => {
  if (envVars.NODE_ENV !== 'development') {
    return json(
      { error: 'This endpoint is only available in development mode.' },
      { status: 400 }
    );
  }

  try {
    await loadData();
  } catch (e: any) {
    console.error(e);
    return json({ error: e.message }, { status: 500 });
  }

  return json('Finished loading data');
};
