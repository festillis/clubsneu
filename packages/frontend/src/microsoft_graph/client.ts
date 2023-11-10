import { Client } from '@microsoft/microsoft-graph-client';
import { AppSettings } from './app_settings';
import { ClubsNEUAuthenticationProvider } from './authenication_provider';
import { graphClient } from '~/stores/microsoft_auth_store';

export const initializeClient = (settings: AppSettings) => {
  return Client.initWithMiddleware({
    authProvider: new ClubsNEUAuthenticationProvider(settings)
  });
};

export const getUser = async () => {
  const client = graphClient();

  if (!client) {
    throw new Error('Graph has not been initialized for user auth');
  }

  return client.api('/me').get();
};

export const getCalendars = async () => {
  const client = graphClient();

  if (!client) {
    throw new Error('Graph has not been initialized for user auth');
  }

  /**
   * 
   * {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#users('bcfc20e5-419a-416b-9a50-77f466743de0')/calendars",
    "value": [
        {
            "id": "AQMkADIzYzAyYmMwLTFjNjMtNGIzOS1iZmM0LTI4Yzc5NDFlYjQxZgBGAAAD5EuVq2C0HEOupoecZOXNDQcAHre65McoHE20ZhYXHi-FoQAAAgEGAAAAHre65McoHE20ZhYXHi-FoQAAAkqtAAAA",
            "name": "Calendar",
            "color": "auto",
            "hexColor": "",
            "isDefaultCalendar": true,
            "changeKey": "Hre65McoHE20ZhYXHi/FoQAAAAAOJw==",
            "canShare": true,
            "canViewPrivateItems": true,
            "canEdit": true,
            "allowedOnlineMeetingProviders": [
                "teamsForBusiness"
            ],
            "defaultOnlineMeetingProvider": "unknown",
            "isTallyingResponses": true,
            "isRemovable": false,
            "owner": {
                "name": "Jason Cheung",
                "address": "cheung.jaso@northeastern.edu"
            }
        },
        {
            "id": "AAMkADIzYzAyYmMwLTFjNjMtNGIzOS1iZmM0LTI4Yzc5NDFlYjQxZgBGAAAAAADkS5WrYLQcQ66mh5xk5c0NBwAet7rkxygcTbRmFhceL8WhAAAAAAEGAAAet7rkxygcTbRmFhceL8WhAAAknKL9AAA=",
            "name": "United States holidays",
            "color": "auto",
            "hexColor": "",
            "isDefaultCalendar": false,
            "changeKey": "Hre65McoHE20ZhYXHi/FoQAAJJcaTA==",
            "canShare": false,
            "canViewPrivateItems": true,
            "canEdit": false,
            "allowedOnlineMeetingProviders": [],
            "defaultOnlineMeetingProvider": "unknown",
            "isTallyingResponses": false,
            "isRemovable": true,
            "owner": {
                "name": "Jason Cheung",
                "address": "cheung.jaso@northeastern.edu"
            }
        },
        {
            "id": "AAMkADIzYzAyYmMwLTFjNjMtNGIzOS1iZmM0LTI4Yzc5NDFlYjQxZgBGAAAAAADkS5WrYLQcQ66mh5xk5c0NBwAet7rkxygcTbRmFhceL8WhAAAAAAEGAAAet7rkxygcTbRmFhceL8WhAAAknKL-AAA=",
            "name": "Birthdays",
            "color": "auto",
            "hexColor": "",
            "isDefaultCalendar": false,
            "changeKey": "Hre65McoHE20ZhYXHi/FoQAAJJcalA==",
            "canShare": false,
            "canViewPrivateItems": true,
            "canEdit": false,
            "allowedOnlineMeetingProviders": [],
            "defaultOnlineMeetingProvider": "unknown",
            "isTallyingResponses": false,
            "isRemovable": true,
            "owner": {
                "name": "Jason Cheung",
                "address": "cheung.jaso@northeastern.edu"
            }
        },
        {
            "id": "AQMkADIzYzAyYmMwLTFjNjMtNGIzOS1iZmM0LTI4Yzc5NDFlYjQxZgBGAAAD5EuVq2C0HEOupoecZOXNDQcAHre65McoHE20ZhYXHi-FoQAAAgEGAAAAHre65McoHE20ZhYXHi-FoQACjN5T3gAAAA==",
            "name": "Test Calendar",
            "color": "auto",
            "hexColor": "",
            "isDefaultCalendar": false,
            "changeKey": "Hre65McoHE20ZhYXHi/FoQACi2dR/Q==",
            "canShare": true,
            "canViewPrivateItems": true,
            "canEdit": true,
            "allowedOnlineMeetingProviders": [
                "teamsForBusiness"
            ],
            "defaultOnlineMeetingProvider": "unknown",
            "isTallyingResponses": false,
            "isRemovable": true,
            "owner": {
                "name": "Jason Cheung",
                "address": "cheung.jaso@northeastern.edu"
            }
        }
    ]
}
   */

  return client.api('/me/calendars').get();
};
