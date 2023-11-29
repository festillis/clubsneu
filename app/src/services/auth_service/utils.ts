import { getDateFromNow } from '~/utils/date';
import { AuthProvider } from './types';

export const getAccessTokenExpiryDate = (expiresIn: number) => {
  // Refresh the access token 5 minutes before it expires
  const earlyRefreshSeconds = 60 * 5;
  return getDateFromNow({ seconds: expiresIn - earlyRefreshSeconds });
};

// /**
//  * Remove '.com' from provider
//  */
// export const getProviderName = (provider: AuthProvider) => {
//   switch (provider) {
//     case 'google.com':
//       return 'google';
//     case 'microsoft.com':
//       return 'microsoft';
//     default:
//       throw new Error(`Unknown provider: ${provider}`);
//   }
// };

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
