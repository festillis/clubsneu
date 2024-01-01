import { ApiClient } from '~/api_client';
import { CalendarEvents, CalendarList } from './types';
import { envVars } from '~/constants';

export const getCalendar = async (calendarId: string) => {
  const api = new ApiClient('https://www.googleapis.com/calendar/v3');

  return await api.req<CalendarEvents>('GET', {
    url: `/calendars/${calendarId}/events`,
    params: { key: envVars.GOOGLE_CLOUD_API_KEY }
  });
};

export const getCalendarList = async () => {
  const api = new ApiClient('https://www.googleapis.com/calendar/v3');

  return await api.authReq<CalendarList>('GET', {
    url: '/users/me/calendarList'
  });
};
