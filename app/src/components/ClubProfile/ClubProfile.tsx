import { Stack, Box, Typography } from '@suid/material';
import { Component, Show } from 'solid-js';
import { colors } from '~/constants';
import Button from '~/components/Button';
import GroupsIcon from '@suid/icons-material/Groups';
import MoreHorizIcon from '@suid/icons-material/MoreHoriz';

interface Props {
  logoUrl?: string | null;
  name: string;
}

const ClubProfile: Component<Props> = ({ name, logoUrl }) => {
  return (
    <Stack
      direction="column"
      sx={{
        position: 'relative',
        borderRadius: '0.75rem',
        boxShadow: colors.BOX_SHADOW
      }}>
      {/* Club Logo */}
      <Box
        sx={{
          position: 'absolute',
          top: '7.63rem',
          left: '3rem',
          zIndex: 1,
          borderRadius: '0.75rem',
          height: '10rem',
          width: '10rem',
          border: '1rem solid #FFFFFF',
          backgroundColor: '#FAF9F9',
          boxShadow: colors.BOX_SHADOW
        }}>
        <Show
          when={logoUrl}
          fallback={
            <GroupsIcon
              sx={{
                transform: 'scale(0.75)',
                borderRadius: '0.75rem',
                height: '100%',
                width: '100%'
              }}
            />
          }>
          <img
            src={logoUrl!}
            style={{
              'border-radius': '0.75rem',
              height: '100%',
              width: '100%'
            }}
          />
        </Show>
      </Box>
      {/* Club Banner */}
      <Box
        sx={{
          position: 'relative',
          backgroundColor: 'gray',
          height: '13.25rem',
          borderRadius: '0.75rem 0.75rem 0 0'
        }}
      />
      {/* Club Name + Action Button */}
      <Box
        sx={{
          padding: '1.75rem 1.75rem 1.75rem 16rem',
          height: '10rem',
          backgroundColor: '#FFFFFF',
          borderRadius: '0 0 0.75rem 0.75rem'
        }}>
        <Stack direction="column" sx={{ gap: '1rem' }}>
          <Typography variant="h2">{name}</Typography>
          <Stack direction="row" sx={{ gap: '0.75rem' }}>
            <Button>Join Waitlist</Button>
            <Box
              sx={{
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: '0.5rem',
                borderRadius: '0.75rem',
                boxShadow: colors.BOX_SHADOW
              }}>
              <MoreHorizIcon />
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
};

export default ClubProfile;
