import { Component, Show, createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';
import { login } from '~/services/auth_service';

const Login: Component = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [failedLogin, setFailedLogin] = createSignal(false);

  onMount(async () => {
    const customSignInToken = params['custom_token'];
    if (!customSignInToken) {
      setFailedLogin(true);
      console.error('Log in failed. Missing custom token or access token');
      return;
    }

    // Clear the search params from URL
    setParams({});

    await login(customSignInToken);

    // Navigate to home page after logging in
    navigate('/');
  });

  return (
    <Show
      when={failedLogin()}
      fallback={
        <div>
          <h1>Logging in...</h1>
        </div>
      }>
      <div>
        <h1>Log in failed</h1>
      </div>
    </Show>
  );
};

export default Login;
