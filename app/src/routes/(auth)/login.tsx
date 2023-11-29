import { Component, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';
import { login } from '~/services/auth_service';

const Login: Component = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    const customSignInToken = params['custom_token'];
    if (!customSignInToken) {
      console.error('Log in failed. Missing custom token or access token');
      return;
    }

    // Clear the search params from URL
    setParams({});

    await login(customSignInToken);

    // Navigate to home page after logging in
    navigate('/');
  });

  // TODO: Add an improved loading screen UI
  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

export default Login;
