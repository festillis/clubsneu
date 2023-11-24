import { calendarService } from '~/services';
import { accessToken } from '../auth_store';

export const getCalendar = async (calendarId: string) => {
  return await calendarService.getCalendar(calendarId);
};

export const getCalendarList = async () => {
  if (!accessToken) {
    throw new Error('Access token not found');
  }

  return await calendarService.getCalendarList(accessToken);
};
