import { getDateFromNow } from '~/utils/date';
import { AuthProvider } from './types';

export const getAccessTokenExpiryDate = (expiresIn: number) => {
  const earlyRefreshSeconds = 60 * 5;
  return getDateFromNow({ seconds: expiresIn - earlyRefreshSeconds });
};

/**
 * Remove '.com' from provider
 */
export const getProviderName = (provider: AuthProvider) => {
  switch (provider) {
    case 'google.com':
      return 'google';
    case 'microsoft.com':
      return 'microsoft';
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};
