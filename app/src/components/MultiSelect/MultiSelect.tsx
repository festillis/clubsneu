import { Accessor, Component, For, JSX, Setter } from 'solid-js';
import { As, Select } from '@kobalte/core';
import { Check, Close } from '@suid/icons-material';
import { Chip, IconButton, Stack } from '@suid/material';
import './style.css';

interface Props {
  selectedValues: Accessor<string[]>;
  setSelectedValues: Setter<string[]>;
  options: string[];
  placeholder?: JSX.Element;
}

const MultiSelect: Component<Props> = ({
  selectedValues,
  setSelectedValues,
  options,
  placeholder
}) => {
  return (
    <Select.Root<string>
      multiple
      value={selectedValues()}
      onChange={setSelectedValues}
      options={options}
      placeholder={placeholder}
      class="select__root"
      itemComponent={(props) => (
        <Select.Item item={props.item} class="select__item">
          <Select.ItemLabel>{props.item.rawValue}</Select.ItemLabel>
          <Select.ItemIndicator class="select__item-indicator">
            <Check />
          </Select.ItemIndicator>
        </Select.Item>
      )}>
      <Select.Trigger class="select__trigger" asChild>
        <As component="div">
          <Select.Value<string> class="select__value">
            {(state) => (
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                <Stack
                  direction="row"
                  sx={{
                    gap: '0.5rem',
                    flexWrap: 'wrap'
                  }}>
                  <For each={state.selectedOptions()}>
                    {(option) => (
                      <Chip
                        label={option}
                        onDelete={() => state.remove(option)}
                        onPointerDown={(e) => e.stopPropagation()}
                      />
                    )}
                  </For>
                </Stack>
                <IconButton
                  size="small"
                  sx={{
                    height: 'auto'
                  }}
                  onClick={state.clear}
                  onPointerDown={(e) => e.stopPropagation()}>
                  <Close fontSize="small" />
                </IconButton>
              </Stack>
            )}
          </Select.Value>
        </As>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content class="select__content">
          <Select.Listbox class="select__listbox" />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default MultiSelect;
