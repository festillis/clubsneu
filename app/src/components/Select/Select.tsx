import { Accessor, Component, JSX } from 'solid-js';
import { Box } from '@suid/material';
import { ExpandMore } from '@suid/icons-material';
import { Select as KSelect } from '@kobalte/core';
import './style.css';
import { ChecklistOption } from '../Checklist/types';

interface Props<T extends string> {
  value: Accessor<ChecklistOption<T>>;
  onChange: (value: ChecklistOption<T>) => void;
  options: ChecklistOption<T>[];
  placeholder?: JSX.Element;
}

const Select = <T extends string>({
  value,
  options,
  placeholder,
  onChange
}: Props<T>) => {
  return (
    <KSelect.Root
      value={value()}
      onChange={(value) => {
        if (!value) {
          return;
        }

        console.log({ value });
        onChange(value);
      }}
      options={options}
      optionValue="value"
      optionTextValue="label"
      placeholder={placeholder}
      itemComponent={(props) => (
        <KSelect.Item item={props.item} class="select__item">
          <KSelect.ItemLabel>{props.item.rawValue.label}</KSelect.ItemLabel>
        </KSelect.Item>
      )}>
      <KSelect.Trigger class="select__trigger" aria-label="Fruit">
        <KSelect.Value<ChecklistOption<T>> class="select__value">
          {(state) => state.selectedOption().label}
        </KSelect.Value>
        <KSelect.Icon>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            <ExpandMore />
          </Box>
        </KSelect.Icon>
      </KSelect.Trigger>
      <KSelect.Portal>
        <KSelect.Content class="select__content">
          <KSelect.Listbox class="select__listbox" />
        </KSelect.Content>
      </KSelect.Portal>
    </KSelect.Root>
  );
};

export default Select;
