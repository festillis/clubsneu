import { signOut } from 'firebase/auth';
import { clientAuth } from '~/firebase';

export const logout = async () => {
  await signOut(clientAuth);
};
