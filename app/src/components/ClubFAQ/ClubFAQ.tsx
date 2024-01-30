import { Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';
import { colors } from '~/constants';

interface Props {}

const ClubFAQ: Component<Props> = () => {
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
      <Typography variant="h3">FAQ</Typography>
      <Typography variant="body1">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem
        suscipit iusto ullam magni. Reprehenderit, iure iusto minima quasi
        reiciendis, quis, corporis explicabo dolore itaque dolores aspernatur
        debitis ratione enim vel?
      </Typography>
    </Stack>
  );
};

export default ClubFAQ;
