import { Button, Stack, Typography } from '@suid/material';
import { Component, Show } from 'solid-js';
import { authStore } from '~/stores';

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

  const onTest = async () => {};

  return (
    <main class="w-full p-4 space-y-2">
      <Stack spacing={2}>
        <Show when={authStore.isAuthenticated()}>
          <Typography>You are authenticated</Typography>
          <Button onClick={onLogout}>Logout</Button>
          <Button onClick={onTest}>Test</Button>
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
