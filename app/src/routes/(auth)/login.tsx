import { Component, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { signInWithCustomToken } from 'firebase/auth';
import { clientAuth } from '~/firebase';
import { useNavigate } from '@solidjs/router';

const Login: Component = () => {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();

  onMount(async () => {
    console.log({ ...params });

    const customSignInToken = params['custom_token'];
    if (!customSignInToken) {
      console.error('Log in failed. Missing custom token or access token');
      return;
    }

    await signInWithCustomToken(clientAuth, customSignInToken);
    navigate('/');
  });

  return (
    <div>
      <h1>Logging in...</h1>
    </div>
  );
};

export default Login;
