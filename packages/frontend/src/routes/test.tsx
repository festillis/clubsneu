import { Component, createSignal } from 'solid-js';
import { APIClient } from '~/api_client';
import { TextField } from '@suid/material';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { auth } from '~/firebase';

interface Props {}

const Test: Component<Props> = () => {
  const [email, setEmail] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');

  const getTestMessage = async () => {
    const somePostEndpoint =
      APIClient.getInstance().auth.someAuthenticatedRoute;

    const res = await somePostEndpoint();
    alert(res.message);
  };

  const handleLogin = async () => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email(),
      password()
    );

    const token = await userCredentials.user.getIdToken();
    console.log(token);
    localStorage.setItem('token', token);
  };

  const handleRegister = async () => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email(),
      password()
    );

    console.log(userCredentials);

    const token = await userCredentials.user.getIdToken();
    console.log(token);
    localStorage.setItem('token', token);
  };

  return (
    <div class="flex flex-col">
      <div>
        <label for="username-input">Username</label>
        <TextField
          name="username"
          placeholder="Email"
          value={email()}
          onChange={(_, email) => setEmail(email)}
        />
      </div>
      <div>
        <label for="password-input">Password</label>
        <TextField
          name="password"
          type="password"
          placeholder="Password"
          value={password()}
          onChange={(_, pass) => setPassword(pass)}
        />
      </div>
      <button type="submit" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default Test;
