import { envVars } from '~/constants/env';
import { ApiClient } from './api_client';

export * from './api_client';

export const api = new ApiClient(`${envVars.BASE_URL}/api`);
