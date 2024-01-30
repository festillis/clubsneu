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
          <Stack
            direction="column"
            sx={{
              gap: '1rem'
            }}>
            <Typography variant="h1">ClubsNEU</Typography>
            <Typography
              variant="body1"
              sx={{
                maxWidth: '300px'
              }}>
              ClubsNEU is a all-in-one club app for Northeastern students by
              Northeastern students
            </Typography>
            <Typography variant="body1" color="text.secondary">
              © {currentYear} ClubsNEU. All rights reserved.
            </Typography>
          </Stack>
        </Stack>
        <Stack direction="column" justifyContent="space-between" height="100%">
          <Stack direction="column">
            <Typography variant="h2">Resources</Typography>
            <Typography variant="body1">FAQ</Typography>
          </Stack>
          <Typography variant="body1" color="text.secondary">
            designed and developed with ❤
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Footer;
