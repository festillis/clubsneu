import { Routes } from '~/constants/routes';
import { useRouteData } from 'solid-start';

import {
  createServerAction$,
  createServerData$,
  redirect
} from 'solid-start/server';
import { getUser, logout } from '~/db/session';
import { onMount } from 'solid-js';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '~/firebase';

export function routeData() {
  return createServerData$(async (_, { request }) => {
    const user = await getUser(request);

    if (!user) {
      // throw redirect('/login');
      redirect(Routes.test);
    }

    return user;
  });
}

export default function Home() {
  const user = useRouteData<typeof routeData>();

  onMount(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        redirect(Routes.test);
      } else {
        console.log(user);
      }
    });
  });

  // const [, { Form }] = createServerAction$((f: FormData, { request }) =>
  //   logout(request)
  // );

  return (
    <main class="w-full p-4 space-y-2">
      <div>Hello</div>
      {/* <h1 class="font-bold text-3xl">Hello {user()?.username}</h1>
      <h3 class="font-bold text-xl">Message board</h3>
      <Form>
        <button name="logout" type="submit">
          Logout
        </button>
      </Form> */}
    </main>
  );
}
