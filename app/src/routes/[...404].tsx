import { Component } from 'solid-js';
import { Stack, Typography } from '@suid/material';

interface Props {}

const NotFoundPage: Component<Props> = () => {
  return (
    <Stack>
      <Typography>404 Page Not Found</Typography>
    </Stack>
  );
};

export default NotFoundPage;
