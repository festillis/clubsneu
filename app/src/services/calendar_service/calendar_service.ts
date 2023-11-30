import { ApiClient } from '~/api_client';
import { CalendarEvents, CalendarList } from './types';
import { envVars } from '~/env';

const api = new ApiClient('https://www.googleapis.com/calendar/v3');

export const getCalendar = async (calendarId: string) => {
  return await api.req<CalendarEvents>('GET', {
    url: `/calendars/${calendarId}/events`,
    params: { key: envVars.GOOGLE_CLOUD_API_KEY }
  });
};

export const getCalendarList = async (accessToken: string) => {
  return await api.authReq<CalendarList>('GET', accessToken, {
    url: '/users/me/calendarList'
  });
};
