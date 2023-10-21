import { APIClient } from '~/api_client';

export const getRandomMessage = async () => {
  return await APIClient.getInstance().auth.someAuthenticatedRoute();
};
