import { envVars } from '~/env';
import { google } from 'googleapis';

export const googleOAuth2Client = new google.auth.OAuth2({
  clientId: envVars.GOOGLE_OAUTH_CLIENT_ID,
  clientSecret: envVars.GOOGLE_OAUTH_CLIENT_SECRET,
  redirectUri: `${envVars.BASE_URL}/api/auth/login_redirect`
});
