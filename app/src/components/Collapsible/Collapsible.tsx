import { Component } from 'solid-js';
import { Collapsible as KCollapsible } from '@kobalte/core';
import { KeyboardArrowDown } from '@suid/icons-material';
import './style.css';
import { Box, Stack, Typography } from '@suid/material';

interface Props {
  label: string;
  content: string;
}

const Collapsible: Component<Props> = ({ label, content }) => {
  return (
    <KCollapsible.Root class="collapsible">
      <KCollapsible.Trigger class="collapsible__trigger">
        <Stack
          direction="row"
          sx={{
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography variant="h4">{label}</Typography>
          <KeyboardArrowDown class="collapsible__trigger-icon" />
        </Stack>

        {/* <ChevronDownIcon class="collapsible__trigger-icon" /> */}
      </KCollapsible.Trigger>
      <KCollapsible.Content class="collapsible__content">
        <Box
          sx={{
            backgroundColor: '#F5F5F5',
            borderRadius: '0.75rem',
            padding: '1rem',
            marginTop: '1rem'
          }}>
          <Typography variant="body1">{content}</Typography>
        </Box>
      </KCollapsible.Content>
    </KCollapsible.Root>
  );
};

export default Collapsible;
