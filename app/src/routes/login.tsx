import { Component, Match, Switch, createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import { useNavigate } from '@solidjs/router';
import { authService } from '~/services';

interface Params extends Record<string, string> {
  customToken: string;
}

interface Props {}

const LoginWithCustomToken: Component<Props> = () => {
  const [params, setSearchParams] = useSearchParams<Params>();
  const navigate = useNavigate();

  const [isSuccessfulLogin, setIsSuccessfulLogin] = createSignal(true);

  onMount(async () => {
    const customSignInToken = params.customToken;

    console.log('customSignInToken', customSignInToken);

    if (!customSignInToken) {
      setIsSuccessfulLogin(false);
      console.error('Log in failed. Missing custom token or access token');
      return;
    }

    // Clear search params
    setSearchParams({});

    // Use Firebase Client to log in with custom token
    // so we keep this as a component instead of an HTTP API endpoint
    await authService.login(customSignInToken);

    // Navigate to home page after logging in
    navigate('/');
  });

  return (
    <Switch>
      <Match when={isSuccessfulLogin()}>
        <div>
          <h1>Logging in...</h1>
        </div>
      </Match>
      <Match when={!isSuccessfulLogin()}>
        <div>
          <h1>Log in failed</h1>
        </div>
      </Match>
    </Switch>
  );
};

export default LoginWithCustomToken;
