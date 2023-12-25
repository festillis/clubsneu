import { Component, Show, createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';
import { authService } from '~/services';
import { AuthProvider } from '~/services/auth_service';

const Login: Component = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  const [failedLogin, setFailedLogin] = createSignal(false);

  onMount(async () => {
    const customSignInToken = params['custom_token'];
    const accessToken = params['access_token'];
    const provider = params['provider'];

    if (!customSignInToken || !accessToken) {
      setFailedLogin(true);
      console.error('Log in failed. Missing custom token or access token');
      return;
    }

    // Clear the search params from URL
    setParams({});

    // Set access token and provider BEFORE logging in with Firebase Client
    authService.setAccessToken(accessToken);
    authService.setProvider(provider as AuthProvider);

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
