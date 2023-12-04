import { Box, Stack, Typography } from '@suid/material';
import { Accessor, Component, For } from 'solid-js';

interface Props {
  selected: Accessor<number>;
  onSelectedChange: (idx: number) => void;
}

const ClubTypesNavbar: Component<Props> = ({ selected, onSelectedChange }) => {
  const types = [
    'Discover',
    'Social',
    'Professional',
    'Cultural',
    'Greek Life',
    'Service',
    'Sports'
  ];

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.625rem'
      }}>
      <For each={types}>
        {(type, idx) => (
          <Box
            sx={{
              cursor: 'pointer',
              backgroundColor: selected() === idx() ? '#ffffff' : 'transparent',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem'
            }}
            onClick={() => onSelectedChange(idx())}>
            <Typography
              fontSize="1.125rem"
              fontWeight={selected() === idx() ? 700 : 500}>
              {type}
            </Typography>
          </Box>
        )}
      </For>
    </Stack>
  );
};

export default ClubTypesNavbar;
