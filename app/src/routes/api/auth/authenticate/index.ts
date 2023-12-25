import { APIEvent } from 'solid-start';

export const POST = async ({ request }: APIEvent) => {
  /**
    Use the below endpoint to get user info such as name, email, photo etc.
    https://www.googleapis.com/oauth2/v3/userinfo?access_token=<access token>
  
    Example Success:
    {
      "sub": "108110214194035886033",
      "name": "Jason Cheung",
      "given_name": "Jason",
      "family_name": "Cheung",
      "picture": "https://lh3.googleusercontent.com/a/ACg8ocKyBZomsq2CyNQzhlSI0XO5F_4Hpx6cAzUSy0Q1-xhgi4M\u003ds96-c",
      "email": "jasoncheung0429@gmail.com",
      "email_verified": true,
      "locale": "en"
    }
    
    Example Error:
    {
      "error": "invalid_request",
      "error_description": "Invalid Credentials"
    }
    
    Use the below endpoint to get token info, such as expiry time, token scope etc.
    https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=<access token>
    
    Example Success:
    {
      "azp": "667088162445-d0qgih8ku6b0jfresiojeb0816tq0gvr.apps.googleusercontent.com",
      "aud": "667088162445-d0qgih8ku6b0jfresiojeb0816tq0gvr.apps.googleusercontent.com",
      "sub": "108110214194035886033",
      "scope": "https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile openid",
      "exp": "1703482396",
      "expires_in": "3428",
      "email": "jasoncheung0429@gmail.com",
      "email_verified": "true",
      "access_type": "offline"
    }

    Example Error:
    {
      "error_description": "Invalid Value"
    }
   */
};
