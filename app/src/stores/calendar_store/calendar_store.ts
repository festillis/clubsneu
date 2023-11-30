import { authService, calendarService } from '~/services';
import { Safe } from '~/types/safe';
import { toSafe } from '~/utils/safe';

const calendarId =
  'aab8e2278c912e76e6e7e7f2836021a9a838b75d39ceea69eee8ad9ee675c170@group.calendar.google.com';
const calendarId2 =
  'bc135269716e14780496789fcecc60b8bc8516bcf104c18238dc28090e8a0382@group.calendar.google.com';

export const getCalendarList = async (): Promise<
  Safe<calendarService.CalendarList>
> => {
  const accessToken = authService.getAccessToken();

  if (!accessToken) {
    return {
      hasError: true,
      errorText: 'Access token not found'
    };
  }

  return {
    hasError: false,
    data: await calendarService.getCalendarList(accessToken)
  };
};

export const getCalendarEvents = async (
  calendarId: string
): Promise<Safe<calendarService.CalendarEvents>> => {
  const accessToken = authService.getAccessToken();

  if (!accessToken) {
    return {
      hasError: true,
      errorText: 'Access token not found'
    };
  }

  return {
    hasError: false,
    data: await calendarService.getCalendar(calendarId)
  };
};
