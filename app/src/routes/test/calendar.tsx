import { Button, Stack } from '@suid/material';
import { Component, Show } from 'solid-js';
import { authStore } from '~/stores';
import { calendarStore } from '~/stores/calendar_store';

const TestCalendar: Component = () => {
  const onListUserCalendars = async () => {
    const calendars = await calendarStore.getCalendarList();
    console.log(calendars);
  };

  const onListCalendarEvents = async () => {
    const calendarId =
      'aab8e2278c912e76e6e7e7f2836021a9a838b75d39ceea69eee8ad9ee675c170@group.calendar.google.com';

    const events = await calendarStore.getCalendarEvents(calendarId);
    console.log(events);
  };

  return (
    <Stack>
      <Show
        when={authStore.isAuthenticated()}
        fallback={<div>User not authenticated</div>}>
        <Button onClick={onListUserCalendars}>List Calendars</Button>
        <Button onClick={onListCalendarEvents}>List Club Test Events</Button>
      </Show>
    </Stack>
  );
};

export default TestCalendar;
