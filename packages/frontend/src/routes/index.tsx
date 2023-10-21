import { Button } from '@suid/material';
import { Component, Show } from 'solid-js';
import { authStore, userStore } from '~/stores';
import { isAuthenticated } from '~/stores/auth_store';

const Home: Component = () => {
  const handleLogin = async () => {
    await authStore.login('clubsneu@gmail.com', 'clubsneu');
  };

  const handleLogout = async () => {
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
        <Button onClick={handleLogout}>Logout</Button>
      </Show>
      <Show when={!isAuthenticated()}>
        <Button onClick={handleLogin}>Login</Button>
      </Show>
      <Button onClick={handleGetRandomMessage}>Get random message</Button>
    </main>
  );
};

export default Home;
