import { Stack, Box, Skeleton, Divider } from '@suid/material';
import { Component } from 'solid-js';
import GroupsIcon from '@suid/icons-material/Groups';

const LINE_HEIGHT = 25;
const CHIP_HEIGHT = 30;

interface Props {}

const ClubCardSkeleton: Component<Props> = () => {
  return (
    <Stack
      direction="column"
      sx={{
        height: '18rem',
        // minWidth: '28.5rem',
        width: '28.5rem',
        borderRadius: '0.75rem',
        backgroundColor: '#FFFFFF',
        boxShadow: '0px 8px 14px 0px rgba(160, 150, 150, 0.10)'
      }}>
      <Stack
        direction="row"
        sx={{
          gap: '1rem',
          padding: '1.25rem',
          alignItems: 'center'
        }}>
        <Box
          width="2.5rem"
          height="2.5rem"
          sx={{
            backgroundColor: '#FAF9F9',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <GroupsIcon />
        </Box>
        <Skeleton width={200} height={LINE_HEIGHT} />
      </Stack>
      <Divider />
      <Stack
        direction="column"
        sx={{
          gap: '1.25rem',
          padding: '1.25rem',
          justifyContent: 'space-evenly'
        }}>
        <Stack direction="column" spacing={1}>
          <Stack direction="row" spacing={1}>
            <Skeleton width={130} height={LINE_HEIGHT} />
            <Skeleton width={110} height={LINE_HEIGHT} />
            <Skeleton width={90} height={LINE_HEIGHT} />
          </Stack>
          <Stack direction="row" spacing={1}>
            <Skeleton width={130} height={LINE_HEIGHT} />
            <Skeleton width={110} height={LINE_HEIGHT} />
            <Skeleton width={90} height={LINE_HEIGHT} />
          </Stack>
        </Stack>
        <Stack
          direction="row"
          sx={{
            gap: '0.625rem',
            flexWrap: 'wrap'
          }}>
          <Skeleton
            width={70}
            height={CHIP_HEIGHT}
            sx={{
              borderRadius: '0.75rem'
            }}
          />
          <Skeleton
            width={120}
            height={CHIP_HEIGHT}
            sx={{
              borderRadius: '0.75rem'
            }}
          />
          <Skeleton
            width={90}
            height={CHIP_HEIGHT}
            sx={{
              borderRadius: '0.75rem'
            }}
          />
          <Skeleton
            width={100}
            height={CHIP_HEIGHT}
            sx={{
              borderRadius: '0.75rem'
            }}
          />
          <Skeleton
            width={60}
            height={CHIP_HEIGHT}
            sx={{
              borderRadius: '0.75rem'
            }}
          />
          <Skeleton
            width={60}
            height={CHIP_HEIGHT}
            sx={{
              borderRadius: '0.75rem'
            }}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ClubCardSkeleton;
