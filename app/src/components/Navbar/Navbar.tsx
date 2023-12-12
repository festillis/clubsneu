import { Stack, Typography } from '@suid/material';
import TextField from '~/components/TextField';
import { Component } from 'solid-js';
import SearchIcon from '@suid/icons-material/Search';
import Button from '../Button';

const Navbar: Component = () => {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '1rem',
        height: '4rem',
        borderBottom: '2px solid #F5F5F5'
      }}>
      <Stack direction="row">
        <Typography fontSize="2rem">Clubs</Typography>
        <Typography fontSize="2rem" color="#E72330">
          NEU
        </Typography>
      </Stack>
      <Stack
        direction="row"
        sx={{
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}>
        <TextField
          placeholder="Search for clubs"
          icon={<SearchIcon />}
          sx={{
            width: '18.75rem',
            backgroundColor: '#FAF9F9'
          }}
        />
        <Button
          style={{
            color: '#ffffff',
            'background-color': '#E72330'
          }}>
          Login
        </Button>
      </Stack>
    </Stack>
  );
};

export default Navbar;
