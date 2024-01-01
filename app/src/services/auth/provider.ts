import { AuthProvider } from './types';

let provider: AuthProvider | null = null;

export const getProvider = () => provider;

export const setProvider = (newProvider: AuthProvider | null) => {
  provider = newProvider;
};
