export * from './client';
export * as middleware from './middleware';

import { envVars } from '~/constants';
import { ApiClient } from './client';

export const api = new ApiClient(`${envVars.BASE_URL}/api`);
