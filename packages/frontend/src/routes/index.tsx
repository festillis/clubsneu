import { Button, Stack, Typography } from '@suid/material';
import { Component, Show } from 'solid-js';
import { APIErrors as APIErrors } from '~/api_client/types';
import { SessionStorageKeys } from '~/constants/session_storage_keys';
import { authStore, calendarStore } from '~/stores';

const Home: Component = () => {
  const onSignInWithMicrosoft = async () => {
    await authStore.signInWithMicrosoft();
  };

  const onSignInWithGoogle = async () => {
    await authStore.signInWithGoogle();
  };

  const onLogout = async () => {
    await authStore.signOut();
  };

  const onTestCalendarEvents = async () => {
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

  const onTestCalendarList = async () => {
    console.log('before', localStorage);

    const result = await calendarStore.getCalendarList();
    console.log('result', result);

    if (result.hasError) {
      if (result.errorText === APIErrors.token_not_found) {
        console.log('reauthenticating...');
        await authStore.reauthenticate();
        console.log('after', localStorage);
      }
      console.log(result);
      return;
    }

    const calendars = result.data;
    console.log(calendars);
  };

  return (
    <main class="w-full p-4 space-y-2">
      <Stack spacing={2}>
        <Show when={authStore.isAuthenticated()}>
          <Typography>You are authenticated</Typography>
          <Button onClick={onLogout}>Logout</Button>
          <Button onClick={onTestCalendarList}>Test</Button>
        </Show>
        <Show when={!authStore.isAuthenticated()}>
          <Typography>You are not authenticated</Typography>
          <Button onClick={onSignInWithMicrosoft}>
            Sign in with Microsoft
          </Button>
          <Button onClick={onSignInWithGoogle}>Sign in with Google</Button>
        </Show>
      </Stack>
    </main>
  );
};

export default Home;
