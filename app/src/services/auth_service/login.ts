import { signInWithCustomToken } from 'firebase/auth';
import { clientAuth } from '~/firebase';

export const login = async (customToken: string) => {
  await signInWithCustomToken(clientAuth, customToken);
};
