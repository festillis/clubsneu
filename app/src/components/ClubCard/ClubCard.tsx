import { Box, Divider, Stack, Typography } from '@suid/material';
import { Component, JSX } from 'solid-js';
import TagChip from './TagChip';
import GroupsIcon from '@suid/icons-material/Groups';

interface Props {
  icon?: JSX.Element;
}

const ClubCard: Component<Props> = ({ icon }) => {
  return (
    <Stack
      direction="column"
      sx={{
        height: '18rem',
        minWidth: '28.5rem',
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
          {icon || <GroupsIcon />}
        </Box>
        <Typography fontWeight={600} fontSize="1.25rem">
          Sandbox at Northeastern
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="column"
        sx={{
          gap: '1.25rem',
          padding: '1.25rem',
          justifyContent: 'space-evenly'
        }}>
        <Typography>
          Northeastern's student-led software consultancy working closely with
          clients to help them best leverage computation.
        </Typography>
        <Stack
          direction="row"
          sx={{
            gap: '0.625rem',
            flexWrap: 'wrap'
            // border: 'thin solid red'
          }}>
          <TagChip label="Undergraduate" />
          <TagChip label="Khoury" />
          <TagChip label="Programming" />
          <TagChip label="Professional" />
          <TagChip label="Design" />
          <TagChip label="Product Development" />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default ClubCard;
