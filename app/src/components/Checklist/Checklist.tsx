import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography
} from '@suid/material';
import { Accessor, For } from 'solid-js';
import { ChecklistOption } from './types';

interface Props<T extends string = string> {
  selectedValues: Accessor<T[]>;
  options: ChecklistOption<T>[];
  onChange: (value: T, checked: boolean) => void;
}

const Checklist = <T extends string>({
  selectedValues,
  options,
  onChange
}: Props<T>) => {
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
        <For each={options}>
          {({ label, value }) => (
            <FormControlLabel
              control={
                <Checkbox
                  value={value}
                  checked={selectedValues().includes(value)}
                  onChange={(_, checked) => onChange(value, checked)}
                />
              }
              label={<Typography variant="body1">{label}</Typography>}
              sx={{
                width: 'max-content'
              }}
            />
          )}
        </For>
      </FormGroup>
    </Stack>
  );
};

export default Checklist;
