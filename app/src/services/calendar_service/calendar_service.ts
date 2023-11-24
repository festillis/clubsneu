import { ApiClient } from '~/api_client';
import { CalendarEvents } from './types';
import { envVars } from '~/env';
import { SessionStorageKeys } from '~/constants/session_storage_keys';

const CALENDAR_API_BASE_URL = 'https://www.googleapis.com/calendar/v3';

const getAccessToken = () => {
  return localStorage.getItem(SessionStorageKeys.accessToken);
};

const api = new ApiClient(CALENDAR_API_BASE_URL);

export const getCalendar = async (calendarId: string) => {
  return await api.req<CalendarEvents>('GET', {
    url: `/calendars/${calendarId}/events`,
    params: { key: envVars.GOOGLE_CLOUD_API_KEY }
  });
};

export const getCalendarList = async (accessToken: string) => {
  return await api.authReq('GET', accessToken, {
    url: '/users/me/calendarList'
  });
};
