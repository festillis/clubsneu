import { Chip } from '@suid/material';
import { Component } from 'solid-js';

interface Props {
  label: string;
}

const TagChip: Component<Props> = ({ label }) => {
  return (
    <Chip
      label={label}
      size="small"
      sx={{
        padding: '0.5rem',
        color: '#746F6F',
        fontSize: '0.8rem',
        fontWeight: 600
      }}
    />
  );
};

export default TagChip;
