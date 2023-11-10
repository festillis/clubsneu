import { Client } from '@microsoft/microsoft-graph-client';
import { User } from '@microsoft/microsoft-graph-types';
import { createSignal } from 'solid-js';
import { settings } from '~/microsoft_graph/app_settings';
import {
  getUser,
  getCalendars as msGetCalendars,
  initializeClient as msInitializeClient
} from '~/microsoft_graph/client';

export const [authUser, setAuthUser] = createSignal<User | null>(null);
export const [graphClient, setGraphClient] = createSignal<Client | null>(null);

export const initializeClient = async () => {
  const client = msInitializeClient(settings);
  setGraphClient(client);

  const user = await getUser();
  setAuthUser(user);
};

export const getCalendars = async () => {
  return await msGetCalendars();
};
