import { Stack, Typography } from '@suid/material';
import { Component, JSX } from 'solid-js';
import { colors } from '~/constants';

interface Props {
  icon: JSX.Element;
  label: string;
  href: string;
}

const ContactRow: Component<Props> = ({ icon, label, href }) => {
  return (
    <a
      href={href}
      target="_blank"
      style={{
        'text-decoration': 'none',
        color: 'inherit'
      }}>
      <Stack
        direction="row"
        sx={{
          cursor: 'pointer',
          gap: '1rem',
          alignItems: 'center'
          // borderRadius: '0.75rem',
          // boxShadow: colors.BOX_SHADOW,
          // padding: '1rem'
        }}>
        {icon}
        <Typography>{label}</Typography>
      </Stack>
    </a>
  );
};

export default ContactRow;
