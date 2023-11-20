import { calendarService } from '~/services';

export const getCalendar = async (calendarId: string) => {
  return await calendarService.getCalendar(calendarId);
};

export const getCalendarList = async () => {
  return await calendarService.getCalendarList();
};
