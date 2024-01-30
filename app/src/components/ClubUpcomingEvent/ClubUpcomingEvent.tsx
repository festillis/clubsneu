import { Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';
import PlaceIcon from '@suid/icons-material/Place';
import { colors } from '~/constants';

interface Props {}

const ClubUpcomingEvent: Component<Props> = () => {
  return (
    <Stack
      direction="column"
      sx={{
        gap: '1rem',
        borderRadius: '0.75rem',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        boxShadow: colors.BOX_SHADOW
      }}>
      <Typography variant="h3">Upcoming Event</Typography>
      <Stack
        direction="column"
        sx={{
          borderRadius: '0.75rem',
          boxShadow: colors.BOX_SHADOW,
          padding: '1rem',
          gap: '1.25rem'
        }}>
        <Typography variant="body2">Sandbox Hackathon</Typography>
        <Stack
          direction="row"
          sx={{
            gap: '0.5rem'
          }}>
          <PlaceIcon />
          <Typography variant="body1">Location</Typography>
        </Stack>
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between'
          }}>
          <Typography variant="caption">9:30 - 10:30pm</Typography>
          <Typography variant="caption">06/22</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ClubUpcomingEvent;
