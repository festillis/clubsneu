import { Button, Stack, Typography } from '@suid/material';
import { Component, Show } from 'solid-js';
import { authStore } from '~/stores';

const SignIn: Component = () => {
  const signInWithGoogle = () => {
    authStore.signInWithGoogle();
  };

  return (
    <Stack>
      <Show
        when={authStore.isAuthenticated()}
        fallback={
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
        }>
        <Typography>Already signed in</Typography>
      </Show>
    </Stack>
  );
};

export default SignIn;
