import { Button, Stack, Typography } from '@suid/material';
import { Component, Show } from 'solid-js';
import {
  getGoogleAuthLink,
  getMicrosoftAuthLink,
  getAccessToken,
  logout
} from '~/services/auth_service';
import { isAuthenticated } from '~/stores/auth_store';

const Home: Component = () => {
  const onSignInWithGoogle = async () => {
    const authLink = await getGoogleAuthLink();
    window.location.replace(authLink);
  };

  const onSignInWithMicrosoft = async () => {
    const authLink = await getMicrosoftAuthLink();
    window.location.replace(authLink);
  };

  const onLogout = async () => {
    await logout();
  };

  const onTestShowACalendarEvent = async () => {
    const calendarId =
      'aab8e2278c912e76e6e7e7f2836021a9a838b75d39ceea69eee8ad9ee675c170@group.calendar.google.com';
    const calendarId2 =
      'bc135269716e14780496789fcecc60b8bc8516bcf104c18238dc28090e8a0382@group.calendar.google.com';
  };

  const onLogAccesstoken = () => {
    console.log(getAccessToken());
  };

  return (
    <main class="w-full p-4 space-y-2">
      <Stack spacing={2}>
        <Show when={isAuthenticated()}>
          <Typography>You are authenticated</Typography>
          <Button onClick={onLogout}>Logout</Button>
          <Button onClick={onLogAccesstoken}>Log Access Token</Button>
        </Show>
        <Show when={!isAuthenticated()}>
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
