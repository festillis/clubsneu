import { Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';

interface Props {}

const ErrorPage: Component<Props> = () => {
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Typography>Something went wrong</Typography>
    </Stack>
  );
};

export default ErrorPage;
