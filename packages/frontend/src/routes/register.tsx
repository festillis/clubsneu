import { Button, Stack, TextField } from '@suid/material';
import { Component, createSignal } from 'solid-js';
import { redirect, useNavigate } from 'solid-start';
import { Routes } from '~/constants/routes';
import { authStore } from '~/stores';
import { isAuthenticated } from '~/stores/auth_store';

const Register: Component = () => {
  const navigate = useNavigate();

  const [email, setEmail] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');

  const onRegister = async () => {
    const res = await authStore.register(email(), password());

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
      <Button onClick={onRegister}>Register</Button>
    </Stack>
  );
};

export default Register;
