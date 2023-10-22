import { Stack, TextField, Button } from '@suid/material';
import { Component, createSignal } from 'solid-js';
import { useNavigate } from 'solid-start';
import { Routes } from '~/constants/routes';
import { authStore } from '~/stores';

const Login: Component = () => {
  const navigate = useNavigate();

  const [email, setEmail] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');

  const onLogin = async () => {
    const res = await authStore.login(email(), password());

    if (res.hasError) {
      alert(`Something went wrong ${res.errorText}`);
      return;
    }

    navigate(Routes.home);
  };

  return (
    <Stack>
      <TextField
        placeholder="Northeastern Email"
        value={email()}
        onChange={(_, value) => setEmail(value)}
      />
      <TextField
        placeholder="Password"
        value={password()}
        onChange={(_, value) => setPassword(value)}
      />
      <Button onClick={onLogin}>Login</Button>
    </Stack>
  );
};

export default Login;
