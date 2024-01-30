import { Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';

interface Props {}

const LoadingPage: Component<Props> = () => {
  return (
    <Stack
      sx={{
        width: '100vw',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
      <Typography>Loading...</Typography>
    </Stack>
  );
};

export default LoadingPage;
