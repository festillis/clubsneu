import { getAuth } from 'firebase/auth';
import { clientApp } from './client_app';

export const clientAuth = getAuth(clientApp);
