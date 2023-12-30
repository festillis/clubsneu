import { Box, Stack, Typography } from '@suid/material';
import { Accessor, Component, For } from 'solid-js';

const categories = [
  'Discover',
  'Social',
  'Professional',
  'Cultural',
  'Greek Life',
  'Service',
  'Sports'
];

interface Props {
  selected: Accessor<number>;
  onSelectedChange: (idx: number) => void;
}

const CategoryNavbar: Component<Props> = ({ selected, onSelectedChange }) => {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '0.625rem'
      }}>
      <For each={categories}>
        {(type, idx) => (
          <Box
            sx={{
              cursor: 'pointer',
              backgroundColor: selected() === idx() ? '#EDECEC' : 'transparent',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              border: selected() === idx() ? '1px solid #' : 'none'
            }}
            onClick={() => onSelectedChange(idx())}>
            <Typography
              fontSize="1.125rem"
              // fontWeight={selected() === idx() ? 600 : 500}
            >
              {type}
            </Typography>
          </Box>
        )}
      </For>
    </Stack>
  );
};

export default CategoryNavbar;
