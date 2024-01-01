import { Component, Show, createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';
import { authService } from '~/services';

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

    // Use Firebase Client to log in with custom token
    // so we keep this as a component instead of an HTTP API endpoint
    await authService.login(customSignInToken);

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
