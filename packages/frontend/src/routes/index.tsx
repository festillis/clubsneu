import { Button, Stack } from '@suid/material';
import { Show, Component, createSignal } from 'solid-js';
import { useNavigate } from 'solid-start';
import { Routes } from '~/constants/routes';
import { authStore, microsoftAuthStore } from '~/stores';

const Login: Component = () => {
  const onLogin = async () => {
    microsoftAuthStore.initializeClient();
    // await microsoftAuthStore.greetUser();

    // const res = await authStore.login(email(), password());
    // if (res.hasError) {
    //   alert(`Something went wrong ${res.errorText}`);
    //   return;
    // }
    // navigate(Routes.home);
  };

  const logUser = async () => {
    const calendars = await microsoftAuthStore.getCalendars();
    console.log(calendars);
  };

  return (
    // <Stack>
    //   <TextField
    //     placeholder="Northeastern Email"
    //     value={email()}
    //     onChange={(_, value) => setEmail(value)}
    //   />
    //   <TextField
    //     placeholder="Password"
    //     value={password()}
    //     onChange={(_, value) => setPassword(value)}
    //   />
    //   <Button onClick={onLogin}>Login</Button>
    // </Stack>
    <Stack direction="column" spacing={5}>
      <Show when={!microsoftAuthStore.authUser()}>
        <Button onClick={onLogin} variant="contained">
          Login
        </Button>
      </Show>
      <Show when={microsoftAuthStore.authUser()}>
        <Button onClick={logUser} variant="contained">
          Log User
        </Button>
      </Show>
    </Stack>
  );
};

export default Login;
