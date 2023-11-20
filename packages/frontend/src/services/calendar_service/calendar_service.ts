import { APIClient } from '~/api_client';
import { CalendarEvents } from './types';
import { envVars } from '~/env';
import { SessionStorageKeys } from '~/constants/session_storage_keys';

const CALENDAR_API_BASE_URL = 'https://www.googleapis.com/calendar/v3';

const getAccessToken = () => {
  return localStorage.getItem(SessionStorageKeys.accessToken);
};

const api = new APIClient(CALENDAR_API_BASE_URL, getAccessToken);

export const getCalendar = async (calendarId: string) => {
  return await api.req<CalendarEvents>(
    'GET',
    `/calendars/${calendarId}/events`,
    {
      params: { key: envVars.GOOGLE_CLOUD_API_KEY }
    }
  );
};

export const getCalendarList = async () => {
  return await api.authReq('GET', '/users/me/calendarList');
};
