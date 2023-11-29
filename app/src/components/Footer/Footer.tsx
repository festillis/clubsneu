import { Stack, Typography } from '@suid/material';
import { Component } from 'solid-js';

const Footer: Component = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Stack
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        backgroundColor: '#ffffff',
        border: '2px solid #f5f5f5',
        width: '100%',
        height: '17.5rem',
        padding: '2rem'
      }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: '100%'
        }}>
        <Stack direction="column" justifyContent="space-between" height="100%">
          <Stack direction="column">
            <Typography fontSize="2.25rem" fontWeight={500}>
              ClubsNEU
            </Typography>
            <Typography
              fontSize="1.125rem"
              fontWeight={400}
              sx={{
                maxWidth: '300px'
              }}>
              ClubsNEU is a all-in-one club app for Northeastern students by
              Northeastern students
            </Typography>
          </Stack>
          <Typography
            fontSize="1.125rem"
            color="text.secondary"
            fontWeight={500}>
            © {currentYear} ClubsNEU. All rights reserved.
          </Typography>
        </Stack>
        <Stack direction="column" justifyContent="space-between" height="100%">
          <Stack direction="column">
            <Typography fontSize="1.125rem" fontWeight={700}>
              Resources
            </Typography>
            <Typography fontSize="1.125rem" fontWeight={400}>
              FAQ
            </Typography>
          </Stack>
          <Typography color="text.secondary" fontWeight={500}>
            designed and developed with ❤
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
