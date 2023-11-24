import { api } from '~/api_client';

export const getGoogleAuthLink = async () => {
  const response = await api.req<string>('POST', { url: '/auth/link' });

  if (response.hasError) {
    console.error(`Error getting google auth link: ${response.errorText}`);
    return null;
  }

  return response.data;
};
