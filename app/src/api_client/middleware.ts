import { authService } from '~/services';
import { AuthProvider } from '~/services/auth';

export const isAuthenticated = async (
  accessToken: string,
  provider: AuthProvider
) => {
  switch (provider) {
    case 'google':
      return await authService.isValidGoogleAccessToken(accessToken);
    case 'microsoft':
      return await authService.isValidMicrosoftAccessToken(accessToken);
    default:
      throw new Error('Invalid provider');
  }
};
