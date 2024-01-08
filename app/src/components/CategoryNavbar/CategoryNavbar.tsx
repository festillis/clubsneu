import { Box, Stack, Typography } from '@suid/material';
import { Accessor, Component, For } from 'solid-js';
import { categories } from './categories';

interface Props {
  selected: Accessor<string>;
  onSelectedChange: (tagName: string) => void;
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
        {(tagName) => (
          <Box
            sx={{
              cursor: 'pointer',
              backgroundColor:
                selected() === tagName ? '#EDECEC' : 'transparent',
              padding: '0.5rem 1rem',
              borderRadius: '0.75rem',
              border: selected() === tagName ? '1px solid #' : 'none'
            }}
            onClick={() => onSelectedChange(tagName)}>
            <Typography fontSize="1.125rem">{tagName}</Typography>
          </Box>
        )}
      </For>
    </Stack>
  );
};

export default CategoryNavbar;
