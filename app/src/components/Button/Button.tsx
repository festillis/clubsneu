import { Button as MuiButton } from '@suid/material';
import { Component, JSX } from 'solid-js';
import { colors } from '~/constants';

interface Props {
  children?: JSX.Element;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  style?: JSX.CSSProperties;
}

const Button: Component<Props> = ({ children, style, onClick }) => {
  return (
    <MuiButton
      onClick={onClick}
      disableElevation
      sx={{
        cursor: 'pointer',
        textTransform: 'none',
        borderRadius: '0.75rem',
        outline: 'none',
        px: '1rem',
        backgroundColor: colors.RED,
        fontSize: '1rem',
        fontWeight: 500,
        color: '#FFFFFF',
        boxShadow: colors.BOX_SHADOW,
        '&:hover': {
          backgroundColor: colors.RED
        },
        ...style
      }}>
      {children}
    </MuiButton>
  );
};

export default Button;
