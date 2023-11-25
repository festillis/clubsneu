import { Component, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';
import { login } from '~/services/auth_service';

const Login: Component = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    console.log('params', { ...params });

    const customSignInToken = params['custom_token'];
    if (!customSignInToken) {
      console.error('Log in failed. Missing custom token or access token');
      return;
    }

    await login(customSignInToken);

    // Navigate to home page after logging in
    navigate('/');
  });

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

export default Login;
