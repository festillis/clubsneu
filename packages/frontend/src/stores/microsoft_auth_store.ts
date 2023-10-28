import { settings } from '~/microsoft_graph/app_settings';
import {
  getUserAsync,
  initializeClient as msInitializeClient
} from '~/microsoft_graph/client';

export const initializeClient = async () => {
  await msInitializeClient(settings);
};

export const greetUser = async () => {
  const user = await getUserAsync();
  console.log(user);
};
