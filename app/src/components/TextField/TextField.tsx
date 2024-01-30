import { InputAdornment, TextField as MUITextField } from '@suid/material';
import { Accessor, Component, JSX } from 'solid-js';
import { SxProps } from '@suid/system';
import { colors } from '~/constants';

interface Props {
  value: Accessor<string>;
  onChange: (value: string) => void;
  icon?: JSX.Element;
  placeholder?: string;
  sx?: SxProps;
}

const TextField: Component<Props> = ({
  value,
  icon,
  placeholder,
  onChange,
  sx
}) => {
  return (
    // <input
    //   placeholder={placeholder}
    //   style={{
    //     ...style,
    //     border: 'none',
    //     width: '18.75rem',
    //     height: '2.6875rem',
    //     'background-color': '#FAF9F9',
    //     'border-radius': '0.75rem',
    //     'padding-left': '1rem',
    //     'padding-right': '1rem'
    //   }}></input>

    <MUITextField
      value={value()}
      onChange={(_, text) => onChange(text)}
      placeholder={placeholder}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">{icon}</InputAdornment>
        ),
        sx: {
          '& .MuiOutlinedInput-notchedOutline': {
            border: 'none' // Remove the border
          },
          borderRadius: '0.75rem',
          height: '2.6875rem',
          boxShadow: colors.BOX_SHADOW,
          ...sx
        }
      }}
    />
  );
};

export default TextField;
