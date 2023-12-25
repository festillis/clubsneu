import { Component, JSX } from 'solid-js';

interface Props {
  children?: JSX.Element;
  onClick?: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
  style?: JSX.CSSProperties;
}

const Button: Component<Props> = ({ children, style, onClick }) => {
  return (
    <button
      onClick={onClick}
      style={{
        cursor: 'pointer',
        'border-radius': '0.75rem',
        outline: 'none',
        border: 'none',
        padding: '0 1rem',
        // width: '5.125rem',
        height: '2.6875rem',
        'font-size': '1.25rem',
        'font-weight': 500,
        ...style
      }}>
      {children}
    </button>
  );
};

export default Button;
