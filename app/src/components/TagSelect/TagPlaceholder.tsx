import { Search } from '@suid/icons-material';
import { Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';

const TagPlaceholder: Component = () => {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 1
      }}>
      <Search />
      <Typography>Search tags</Typography>
    </Stack>
  );
};

export default TagPlaceholder;
