import { ApiError } from '~/api_client/client/types';
import { NeedsAuth } from '~/types/needs_auth';
import { Safe } from '~/types/safe';

export const needsAuthWrapper = async <T>(
  handler: (...args: unknown[]) => Promise<Safe<T>>
): Promise<NeedsAuth<T>> => {
  const result = await handler();

  if (result.hasError) {
    if (result.errorText === ApiError.invalid_credentials) {
      return { needsAuth: true };
    }
    return {
      needsAuth: false,
      data: result
    };
  }

  return {
    needsAuth: false,
    data: result
  };
};
