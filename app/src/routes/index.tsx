import { Button, Stack, Typography } from '@suid/material';
import { Component, Show } from 'solid-js';
import { authController } from '~/controllers';
import { authStore, calendarStore } from '~/stores';

const Home: Component = () => {
  const onSignInWithGoogle = async () => {
    const authLink = await authController.getGoogleAuthLink();

    if (!authLink) {
      return;
    }

    window.location.replace(authLink);
  };

  const onLogout = async () => {
    await authStore.signOut();
  };

  const onTestShowUserCalendars = async () => {
    const calendars = await calendarStore.getCalendarList();

    if (calendars.hasError) {
      console.error(calendars.errorText);
      return;
    }

    console.log(calendars.data);
  };

  const onTestShowACalendarEvent = async () => {
    const calendarId =
      'aab8e2278c912e76e6e7e7f2836021a9a838b75d39ceea69eee8ad9ee675c170@group.calendar.google.com';
    const calendarId2 =
      'bc135269716e14780496789fcecc60b8bc8516bcf104c18238dc28090e8a0382@group.calendar.google.com';
    const calendar = await calendarStore.getCalendar(calendarId2);

    if (calendar.hasError) {
      console.error(calendar.errorText);
      return;
    }

    const events = calendar.data.items;
    console.log(events);
  };

  return (
    <main class="w-full p-4 space-y-2">
      <Stack spacing={2}>
        <Show when={authStore.isAuthenticated()}>
          <Typography>You are authenticated</Typography>
          <Button onClick={onLogout}>Logout</Button>
          <Button onClick={onTestShowACalendarEvent}>Log An Event</Button>
          <Button onClick={onTestShowUserCalendars}>Log User Calendars</Button>
        </Show>
        <Show when={!authStore.isAuthenticated()}>
          <Typography>You are not authenticated</Typography>
          {/* <Button onClick={onSignInWithMicrosoft}>
            Sign in with Microsoft
          </Button> */}
          <Button onClick={onSignInWithGoogle}>Sign in with Google</Button>
        </Show>
      </Stack>
    </main>
  );
};

export default Home;
