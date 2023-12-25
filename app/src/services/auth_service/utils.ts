import { AuthProvider } from './types';
import { dateUtils } from '~/utils';

/**
 * @param expiresIn seconds until access token expires
 */
export const getAccessTokenExpiryDate = (expiresIn: number) => {
  // Refresh the access token 5 minutes before it expires
  const earlyRefreshSeconds = 60 * 5;
  return dateUtils.getDateFromNow({ seconds: expiresIn - earlyRefreshSeconds });
};

/**
 * Adds '.com' to provider
 */
export const getProviderId = (provider: AuthProvider) => {
  switch (provider) {
    case 'google':
      return 'google.com';
    case 'microsoft':
      return 'microsoft.com';
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};
