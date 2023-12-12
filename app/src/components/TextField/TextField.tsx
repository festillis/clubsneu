import { InputAdornment, TextField as MUITextField } from '@suid/material';
import { Component, JSX } from 'solid-js';
import { SxProps } from '@suid/system';

interface Props {
  icon?: JSX.Element;
  placeholder?: string;
  sx?: SxProps;
}

const TextField: Component<Props> = ({ icon, placeholder, sx }) => {
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
          ...sx
        }
      }}
    />
  );
};

export default TextField;
