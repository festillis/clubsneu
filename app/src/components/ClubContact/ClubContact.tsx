import { Box, Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';

import EmailOutlinedIcon from '@suid/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@suid/icons-material/LanguageOutlined';
import {
  AiOutlineLinkedin,
  AiOutlineInstagram,
  AiOutlineGithub
} from 'solid-icons/ai';
import { FaBrandsMeta } from 'solid-icons/fa';
import { colors } from '~/constants';

interface Props {}

const ClubContact: Component<Props> = () => {
  return (
    <Stack
      direction="column"
      sx={{
        gap: '1rem',
        borderRadius: '0.75rem',
        backgroundColor: '#FFFFFF',
        padding: '2rem',
        boxShadow: colors.BOX_SHADOW
      }}>
      <Typography variant="h3">Contact</Typography>
      <Stack
        direction="row"
        sx={{
          gap: '1rem',
          alignItems: 'center'
        }}>
        <EmailOutlinedIcon />
        <Typography>Email</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: '1rem',
          alignItems: 'center'
        }}>
        <LanguageOutlinedIcon />
        <Typography>Website</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: '1rem',
          alignItems: 'center'
        }}>
        <AiOutlineLinkedin size="1.5rem" />
        <Typography>LinkedIn</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: '1rem',
          alignItems: 'center'
        }}>
        <AiOutlineInstagram size="1.5rem" />
        <Typography>Instagram</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: '1rem',
          alignItems: 'center'
        }}>
        <FaBrandsMeta size="1.5rem" />
        <Typography>Meta</Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          gap: '1rem',
          alignItems: 'center'
        }}>
        <AiOutlineGithub size="1.5rem" />
        <Typography>GitHub</Typography>
      </Stack>
    </Stack>
  );
};

export default ClubContact;
