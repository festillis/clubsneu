import { AuthProvider } from '~/services/auth_service';

export const getUrlSearchParams = (request: Request) => {
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  return searchParams;
};

export const getAccessToken = (request: Request) => {
  const accessToken = request.headers
    .get('Authorization')
    ?.replace('Bearer ', '');
  return accessToken;
};

export const getProvider = (request: Request) => {
  const provider = request.headers.get('X-provider');

  switch (provider) {
    case 'google':
    case 'microsoft':
      return provider as AuthProvider;
    default:
      return undefined;
  }
};
