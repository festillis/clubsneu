import { Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';
import { colors } from '~/constants';

interface Props {
  description: string;
}

const ClubDescription: Component<Props> = ({ description }) => {
  return (
    <Stack
      direction="column"
      sx={{
        padding: '2rem',
        borderRadius: '0.75rem',
        backgroundColor: '#FFFFFF',
        boxShadow: colors.BOX_SHADOW,
        gap: '1rem'
      }}>
      <Typography variant="h3">Description</Typography>
      <Typography variant="body1">{description}</Typography>
    </Stack>
  );
};

export default ClubDescription;
