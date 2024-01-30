import { Stack, Typography } from '@suid/material';
import TextField from '~/components/TextField';
import { Accessor, Component, Show } from 'solid-js';
import SearchIcon from '@suid/icons-material/Search';
import Button from '../Button';
import { authService } from '~/services';
import { authStore } from '~/stores';
import { useNavigate } from '@solidjs/router';
import { colors } from '~/constants';

interface Props {
  searchValue: Accessor<string>;
  onSearchChange: (value: string) => void;
}

const Navbar: Component<Props> = ({ searchValue, onSearchChange }) => {
  const navigate = useNavigate();

  const onNavigateToHome = () => {
    navigate('/');
  };

  const onSignInWithGoogle = () => {
    const authLink = authService.getGoogleAuthLink();
    window.location.replace(authLink);
  };

  const onSignInWithMicrosoft = () => {
    const authLink = authService.getMicrosoftAuthLink();
    window.location.replace(authLink);
  };

  const onLogout = async () => {
    await authService.logout();
  };

  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        px: '1rem',
        height: '4rem',
        borderBottom: '2px solid #F5F5F5',
        backgroundColor: '#FFFFFF'
      }}>
      <Stack
        direction="row"
        onClick={onNavigateToHome}
        sx={{ cursor: 'pointer' }}>
        <Typography variant="h1">Clubs</Typography>
        <Typography variant="h1" color={colors.RED}>
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
          value={searchValue}
          onChange={onSearchChange}
          placeholder="Search for clubs"
          icon={<SearchIcon />}
          sx={{
            width: '18.75rem',
            backgroundColor: '#FAF9F9'
          }}
        />
        <Show
          when={authStore.isAuthenticated()}
          fallback={
            <Stack direction="row" spacing={2}>
              <Button
                style={{
                  color: '#ffffff',
                  'background-color': colors.RED
                }}
                onClick={onSignInWithGoogle}>
                Club Exec
              </Button>
              <Button
                style={{
                  color: '#ffffff',
                  'background-color': colors.RED
                }}
                onClick={onSignInWithMicrosoft}>
                Member
              </Button>
            </Stack>
          }>
          <Button
            style={{
              color: '#ffffff',
              'background-color': colors.RED
            }}
            onClick={onLogout}>
            Logout
          </Button>
        </Show>
      </Stack>
    </Stack>
  );
};

export default Navbar;
