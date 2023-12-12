import { Checkbox, FormControlLabel, FormGroup, Stack } from '@suid/material';
import { Accessor, Component, For } from 'solid-js';

export interface ChecklistOption {
  label: string;
  value: string;
  checked: boolean;
}

interface Props {
  options: Accessor<ChecklistOption[]>;
  onChange: (value: string, checked: boolean) => void;
}

const Checklist: Component<Props> = ({ options, onChange }) => {
  return (
    <Stack
      direction="column"
      sx={{
        padding: '1.5rem 1.25rem',
        gap: '1.5rem',
        borderRadius: '0.75rem',
        border: '1px solid #E3E3E3'
      }}>
      <FormGroup>
        <For each={options()}>
          {({ label, value, checked }) => (
            <FormControlLabel
              control={
                <Checkbox
                  value={value}
                  checked={checked}
                  onChange={(_, checked) => onChange(value, checked)}
                />
              }
              label={label}
            />
          )}
        </For>
      </FormGroup>
    </Stack>
  );
};

export default Checklist;
