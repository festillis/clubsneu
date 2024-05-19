import { Box, Divider, Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';
import { colors } from '~/constants';
import Collapsible from '../Collapsible';

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
      <Collapsible
        label="How much previous coding experience do you need to join?"
        content="Every level of experience is welcome in Sandbox. In our coding
            challenges, there will be different application tracks. Depending on
            your experience, you will be assigned to a track to give you the
            best opportunity to showcase your ability."
      />
      <Divider />
      <Collapsible
        label="How much previous coding experience do you need to join?"
        content="Every level of experience is welcome in Sandbox. In our coding
            challenges, there will be different application tracks. Depending on
            your experience, you will be assigned to a track to give you the
            best opportunity to showcase your ability."
      />
      <Divider />
      <Collapsible
        label="How much previous coding experience do you need to join?"
        content="Every level of experience is welcome in Sandbox. In our coding
            challenges, there will be different application tracks. Depending on
            your experience, you will be assigned to a track to give you the
            best opportunity to showcase your ability."
      />
    </Stack>
  );
};

export default ClubFAQ;
