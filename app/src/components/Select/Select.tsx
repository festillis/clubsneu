import { Accessor, Component, JSX } from 'solid-js';
import { Box } from '@suid/material';
import { ExpandMore } from '@suid/icons-material';
import { Select as KSelect } from '@kobalte/core';
import './style.css';

interface Props {
  value: Accessor<string>;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: JSX.Element;
}

const Select: Component<Props> = ({
  value,
  options,
  placeholder,
  onChange
}) => {
  return (
    <KSelect.Root
      value={value()}
      onChange={onChange}
      options={options}
      placeholder={placeholder}
      itemComponent={(props) => (
        <KSelect.Item item={props.item} class="select__item">
          <KSelect.ItemLabel>{props.item.rawValue}</KSelect.ItemLabel>
        </KSelect.Item>
      )}>
      <KSelect.Trigger class="select__trigger" aria-label="Fruit">
        <KSelect.Value<string> class="select__value">
          {(state) => state.selectedOption()}
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
