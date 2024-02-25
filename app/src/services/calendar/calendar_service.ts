import { ApiClient } from '~/api_client';
import { Calendar, CalendarList } from './types';
import { envVars } from '~/constants';

export const getCalendarEvents = async (
  calendarId: string,
  options?: {
    upcomingOnly?: boolean;
  }
) => {
  const calendarApi = new ApiClient('https://www.googleapis.com/calendar/v3');
  const optionalParams: Record<string, string> = {};

  if (options?.upcomingOnly) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to 00:00:00
    optionalParams['timeMin'] = today.toISOString();
  }

  const calendar = await calendarApi.req<Calendar>('GET', {
    url: `/calendars/${calendarId}/events`,
    params: {
      key: envVars.GOOGLE_CLOUD_API_KEY,
      ...optionalParams
    }
  });

  return calendar.items;
};

export const getCalendarListOfCurrentUser = async () => {
  const calendarApi = new ApiClient('https://www.googleapis.com/calendar/v3');

  return await calendarApi.authReq<CalendarList>('GET', {
    url: '/users/me/calendarList'
  });
};
