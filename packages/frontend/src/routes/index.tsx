import { Button } from '@suid/material';
import { Component, Show } from 'solid-js';
import { useNavigate } from 'solid-start';
import { Routes } from '~/constants/routes';
import { authStore, userStore } from '~/stores';
import { isAuthenticated } from '~/stores/auth_store';

const Home: Component = () => {
  const navigate = useNavigate();

  const onLogin = () => {
    navigate(Routes.login);
  };

  const onRegister = () => {
    navigate(Routes.register);
  };

  const onLogout = async () => {
    await authStore.logout();
  };

  const handleGetRandomMessage = async () => {
    const res = await userStore.getRandomMessage();

    if (res.hasError) {
      alert(`Something went wrong ${res.errorText}`);
      return;
    }

    alert(res.data.message);
  };

  return (
    <main class="w-full p-4 space-y-2">
      <div>Hello</div>
      <div>
        {isAuthenticated()
          ? 'You are authenticated'
          : 'You are not authenticated'}
      </div>
      <Show when={isAuthenticated()}>
        <Button onClick={onLogout}>Logout</Button>
        <Button onClick={handleGetRandomMessage}>Get random message</Button>
      </Show>
      <Show when={!isAuthenticated()}>
        <Button onClick={onLogin}>Login</Button>
        <Button onClick={onRegister}>Register</Button>
      </Show>
    </main>
  );
};

export default Home;
