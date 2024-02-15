import { Box, Skeleton, Stack } from '@suid/material';
import { Component } from 'solid-js';
import GroupsIcon from '@suid/icons-material/Groups';
import { colors } from '~/constants';
import { theme } from '~/theme';

interface Props {}

const ClubEboardCardSkeleton: Component<Props> = () => {
  return (
    <Stack
      direction="column"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        padding: '1rem',
        width: '15rem',
        borderRadius: '0.75rem',
        boxShadow: colors.BOX_SHADOW
      }}>
      <Box
        sx={{
          borderRadius: '100%',
          height: '6rem',
          width: '6rem',
          backgroundColor: '#FAF9F9'
        }}>
        <GroupsIcon
          sx={{
            color: '#00000095',
            transform: 'scale(0.75)',
            height: '100%',
            width: '100%'
          }}
        />
      </Box>
      <Stack
        direction="column"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem'
        }}>
        <Stack direction="row" sx={{ gap: '0.5rem' }}>
          <Skeleton
            variant="text"
            width="5rem"
            height={theme.typography.body2.fontSize as string}
          />
          <Skeleton
            variant="text"
            width="4rem"
            height={theme.typography.body2.fontSize as string}
          />
        </Stack>
        <Stack direction="row" sx={{ gap: '0.5rem' }}>
          <Skeleton
            variant="text"
            width="6rem"
            height={theme.typography.caption.fontSize as string}
          />
          <Skeleton
            variant="text"
            width="6rem"
            height={theme.typography.caption.fontSize as string}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ClubEboardCardSkeleton;
