import { Accessor, Component } from 'solid-js';
import { Select as MUISelect, MenuItem } from '@suid/material';
import ExpandMoreIcon from '@suid/icons-material/ExpandMore';

export interface SelectOption {
  label: string;
  value: string;
}

interface Props {
  value: Accessor<string>;
  options: SelectOption[];
  placeholder?: string;
  onChange: (value: string) => void;
}

const Select: Component<Props> = ({
  value,
  options,
  placeholder,
  onChange
}) => {
  return (
    <MUISelect
      placeholder={placeholder}
      IconComponent={() => <ExpandMoreIcon />}
      value={value()}
      sx={{
        boxShadow: 'none',
        '.MuiOutlinedInput-notchedOutline': { border: 0 },
        '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
          border: 0
        },
        '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
          {
            border: 0
          },
        border: '1px solid #E3E3E3',
        height: '2.6875rem',
        borderRadius: '0.75rem'
      }}>
      {options.map(({ label, value }) => (
        <MenuItem value={value} onClick={() => onChange(value)}>
          {label}
        </MenuItem>
      ))}
    </MUISelect>
  );
};

export default Select;
