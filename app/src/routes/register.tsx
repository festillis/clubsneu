import { Button, Stack, TextField } from '@suid/material';
import { Component, createSignal } from 'solid-js';
import { useNavigate } from 'solid-start';
import { Routes } from '~/constants/routes';
import { authStore } from '~/stores';

const Register: Component = () => {
  const navigate = useNavigate();

  const [email, setEmail] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');

  const onRegister = async () => {
    const registerResponse = await authStore.register(email(), password());

    if (registerResponse.hasError) {
      console.error(registerResponse.errorText);
      alert(
        `Something went wrong with registration ${registerResponse.errorText}`
      );
      return;
    }

    const verificationResponse = await authStore.sendEmailVerification(
      registerResponse.data.user
    );

    if (verificationResponse.hasError) {
      console.error(verificationResponse.errorText);
      alert(
        `Something went wrong with verification ${verificationResponse.errorText}`
      );
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
